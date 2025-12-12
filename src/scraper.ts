import puppeteer, { Browser, Page } from 'puppeteer';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Turndown for better markdown output
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

// Use GFM plugin for tables, strikethrough, etc.
turndownService.use(gfm);

// Add custom rules for better code block handling
turndownService.addRule('codeBlocks', {
  filter: ['pre'],
  replacement: function (_content: string, node: Node) {
    const element = node as HTMLPreElement;
    const code = element.querySelector('code');
    const language = code?.className?.match(/language-(\w+)/)?.[1] || '';
    const codeContent = code?.textContent || element.textContent || '';
    return `\n\`\`\`${language}\n${codeContent}\n\`\`\`\n`;
  },
});

/**
 * Sanitize a string for use as a filename
 */
function sanitizeFilename(text: string): string {
  return text
    .trim()
    .replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .substring(0, 100); // Limit length
}

interface ExtractResult {
  title: string;
  html: string;
  pageType?: string;
  error?: string;
}

interface ContentResult {
  title: string;
  markdown: string;
}

interface ProcessResult {
  url: string;
  success: boolean;
  title?: string;
  filename?: string;
  error?: string;
}

/**
 * Extract content from a single URL
 *
 * Salesforce docs have two different page structures:
 *
 * 1. GUIDE PAGES (/guide/*):
 *    - Use doc-content-layout element directly
 *    - Content is in shadow DOM slot at .content-body slot
 *    - Need to get assigned elements from the slot
 *
 * 2. REFERENCE PAGES (/references/*):
 *    - Use doc-amf-reference element
 *    - Contains doc-content-layout in its shadow DOM
 *    - Content is in div.markdown-content in light DOM
 */
async function extractContent(page: Page, url: string): Promise<ContentResult> {
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

  // Wait for either page type to load
  await Promise.race([
    page.waitForSelector('doc-content-layout', { timeout: 30000 }).catch(() => null),
    page.waitForSelector('doc-amf-reference', { timeout: 30000 }).catch(() => null),
  ]);

  // Give extra time for shadow DOM content to render
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Extract the content from the page
  const result: ExtractResult = await page.evaluate(() => {
    /**
     * Extract readable HTML from an element,
     * piercing shadow DOMs and resolving custom elements
     */
    function extractReadableHTML(element: Element): string {
      if (!element) return '';

      const tagName = element.tagName?.toLowerCase();

      // Handle doc-heading elements (nested shadow DOM for headings)
      if (tagName === 'doc-heading') {
        const headingEl = element.shadowRoot?.querySelector('h2, h3, h4');
        const headingContent = element.shadowRoot?.querySelector('doc-heading-content');
        const titleSpan = (headingContent as Element | null)?.shadowRoot?.querySelector('.title');
        // Also check the header attribute as fallback
        const headingText =
          titleSpan?.textContent?.trim() || element.getAttribute('header') || '';
        const level = headingEl?.tagName?.toLowerCase() || 'h2';
        return `<${level}>${headingText}</${level}>`;
      }

      // Handle doc-content-callout elements (tips, notes, etc.)
      if (tagName === 'doc-content-callout') {
        const shadowDiv = element.shadowRoot?.querySelector('.dx-callout');
        const isTip = shadowDiv?.classList?.contains('dx-callout-tip');
        const isWarning = shadowDiv?.classList?.contains('dx-callout-warning');

        let calloutType = 'Note';
        if (isTip) calloutType = 'Tip';
        if (isWarning) calloutType = 'Warning';

        const slottedContent = element.innerHTML;
        return `<blockquote><strong>${calloutType}:</strong> ${slottedContent}</blockquote>`;
      }

      // Handle dx-code-block elements (code snippets in reference pages)
      if (tagName === 'dx-code-block') {
        const language = element.getAttribute('language') || '';
        const code = element.getAttribute('code-block') || element.textContent || '';
        // Decode HTML entities in code
        const decodedCode = code
          .replace(/&quot;/g, '"')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&');
        return `<pre><code class="language-${language}">${decodedCode}</code></pre>`;
      }

      // Handle div.custom-code-block wrapper (contains dx-code-block)
      if (tagName === 'div' && element.classList?.contains('custom-code-block')) {
        const codeBlock = element.querySelector('dx-code-block');
        if (codeBlock) {
          return extractReadableHTML(codeBlock);
        }
      }

      // For regular elements, return their HTML as-is
      return element.outerHTML;
    }

    /**
     * Process all children of a container, extracting readable HTML
     */
    function processChildren(container: Element): { title: string; html: string } {
      let fullHTML = '';
      let title = 'Untitled';

      for (const el of Array.from(container.children)) {
        const tagName = el.tagName?.toLowerCase();

        // Capture the h1 for the title
        if (tagName === 'h1') {
          title = el.textContent?.trim() || title;
          fullHTML += el.outerHTML;
        } else {
          fullHTML += extractReadableHTML(el);
        }
      }

      return { title, html: fullHTML };
    }

    // =========================================
    // Try REFERENCE PAGE structure first
    // (doc-amf-reference with div.markdown-content)
    // =========================================
    const docRef = document.querySelector('doc-amf-reference');
    if (docRef) {
      const markdownContent = docRef.querySelector('.markdown-content');
      if (markdownContent) {
        return processChildren(markdownContent);
      }

      // Try AMF API REFERENCE structure (OpenAPI/RAML-based API docs)
      // These use deeply nested shadow DOMs: doc-amf-reference → doc-amf-topic → api-summary
      if (docRef.shadowRoot) {
        const amfTopic = docRef.shadowRoot.querySelector('doc-amf-topic');
        if (amfTopic?.shadowRoot) {
          const apiSummary = amfTopic.shadowRoot.querySelector('api-summary');
          if (apiSummary?.shadowRoot) {
            // Extract the actual content, skipping CSS
            const fullText = apiSummary.shadowRoot.textContent || '';
            const startIndex = fullText.indexOf('API title:');

            if (startIndex !== -1) {
              const contentText = fullText.substring(startIndex);

              // Parse the structured content into HTML
              const lines = contentText.split('\n').map((l) => l.trim()).filter(Boolean);
              let html = '';
              let title = 'Untitled';
              let currentSection = '';

              for (const line of lines) {
                if (line.startsWith('API title:')) {
                  continue; // Skip label
                } else if (line.startsWith('Version:')) {
                  continue; // Skip label
                } else if (line.startsWith('Supported protocols')) {
                  currentSection = 'protocols';
                  html += '<h3>Supported Protocols</h3>';
                } else if (line === 'API Overview') {
                  currentSection = 'overview';
                  html += '<h2>API Overview</h2>';
                } else if (!title || title === 'Untitled') {
                  // First non-label line is likely the title
                  if (!line.includes(':') && line.length < 100) {
                    title = line;
                    html += `<h1>${line}</h1>`;
                  }
                } else if (line.match(/^v\d+/)) {
                  // Version number
                  html += `<p><strong>Version:</strong> ${line}</p>`;
                } else if (currentSection === 'protocols') {
                  html += `<p>${line}</p>`;
                  currentSection = '';
                } else if (currentSection === 'overview' || line.length > 20) {
                  // Regular content paragraph
                  html += `<p>${line}</p>`;
                }
              }

              // Also try to extract the base URL from the page
              const urlArea = apiSummary.shadowRoot.querySelector('.url-area');
              if (urlArea) {
                const urlValue = urlArea.querySelector('.url-value');
                if (urlValue?.textContent) {
                  html += `<h3>Base URL</h3><pre><code>${urlValue.textContent.trim()}</code></pre>`;
                }
              }

              return { title, html, pageType: 'api-reference' };
            }
          }

          // Also check for api-documentation or endpoint pages
          const apiDocs = amfTopic.shadowRoot.querySelector('api-documentation');
          if (apiDocs?.shadowRoot) {
            const docContent = apiDocs.shadowRoot.textContent || '';
            return {
              title: 'API Documentation',
              html: `<pre>${docContent}</pre>`,
              pageType: 'api-documentation',
            };
          }
        }
      }
    }

    // =========================================
    // Try GUIDE PAGE structure
    // (doc-content-layout with .content-body slot)
    // =========================================
    const docLayout = document.querySelector('doc-content-layout');
    if (docLayout?.shadowRoot) {
      const slot = docLayout.shadowRoot.querySelector('.content-body slot') as HTMLSlotElement | null;
      if (slot) {
        const assignedElements = slot.assignedElements();
        if (assignedElements.length > 0) {
          let fullHTML = '';
          let title = 'Untitled';

          for (const el of assignedElements) {
            const tagName = el.tagName?.toLowerCase();
            if (tagName === 'h1') {
              title = el.textContent?.trim() || title;
              fullHTML += el.outerHTML;
            } else {
              fullHTML += extractReadableHTML(el);
            }
          }

          return { title, html: fullHTML };
        }
      }
    }

    // =========================================
    // Fallback: try to find any h1 and main content
    // =========================================
    const h1 = document.querySelector('h1');
    const main = document.querySelector('main');

    if (main) {
      return {
        title: h1?.textContent?.trim() || 'Untitled',
        html: main.innerHTML,
        pageType: 'fallback',
      };
    }

    return {
      title: 'Untitled',
      html: '',
      error: 'Could not find content structure',
    };
  });

  if (result.error) {
    console.log(`Warning: ${result.error}`);
  }

  // Convert HTML to Markdown
  const markdown = turndownService.turndown(result.html);

  return {
    title: result.title,
    markdown: markdown,
  };
}

/**
 * Create a configured browser page
 */
async function createPage(browser: Browser): Promise<Page> {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );
  return page;
}

/**
 * Process a single URL with a given page
 */
async function processUrl(
  page: Page,
  url: string,
  outputDir: string
): Promise<ProcessResult> {
  try {
    const { title, markdown } = await extractContent(page, url);

    const filename = `${sanitizeFilename(title)}.md`;
    const filepath = path.join(outputDir, filename);

    await fs.writeFile(filepath, markdown, 'utf-8');

    console.log(`✓ Saved: ${filename}`);
    return { url, title, filename, success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`✗ Failed: ${url.split('/').pop()} - ${errorMessage}`);
    return { url, success: false, error: errorMessage };
  }
}

/**
 * Process a list of URLs and save markdown files
 * Uses parallel processing with configurable concurrency
 */
async function processUrls(
  urls: string[],
  outputDir: string,
  concurrency: number = 10
): Promise<ProcessResult[]> {
  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  console.log(`Starting scraper for ${urls.length} URL(s)...`);
  console.log(`Concurrency: ${concurrency} parallel pages`);
  console.log(`Output directory: ${outputDir}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  // Create a pool of pages
  const pages = await Promise.all(
    Array.from({ length: concurrency }, () => createPage(browser))
  );

  console.log(`Created ${pages.length} browser pages\n`);

  const results: ProcessResult[] = [];
  let urlIndex = 0;

  // Worker function that processes URLs from the queue
  async function worker(page: Page, workerId: number): Promise<void> {
    while (urlIndex < urls.length) {
      const currentIndex = urlIndex++;
      const url = urls[currentIndex];

      const progress = `[${currentIndex + 1}/${urls.length}]`;
      console.log(`${progress} Worker ${workerId}: Processing ${url.split('/').pop() || url}`);

      const result = await processUrl(page, url, outputDir);
      results.push(result);
    }
  }

  // Start all workers
  await Promise.all(pages.map((page, index) => worker(page, index + 1)));

  // Close all pages and browser
  await Promise.all(pages.map((page) => page.close()));
  await browser.close();

  // Print summary
  console.log('\n--- Summary ---');
  const successful = results.filter((r) => r.success).length;
  console.log(`Processed: ${results.length} URLs`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${results.length - successful}`);

  if (results.some((r) => !r.success)) {
    console.log('\nFailed URLs:');
    results
      .filter((r) => !r.success)
      .forEach((r) => {
        console.log(`  - ${r.url}: ${r.error}`);
      });
  }

  return results;
}

// ============================================
// Main execution
// ============================================

// List of URLs to scrape - add more URLs here
const urls: string[] = [
  'https://developer.salesforce.com/docs/einstein/genai',
  'https://developer.salesforce.com/docs/einstein/genai/overview',
  'https://developer.salesforce.com/docs/einstein/genai/guide',
  'https://developer.salesforce.com/docs/einstein/genai/guide/get-started.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/org-setup.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/scratch-org.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/trust.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-script.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-lang.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-blocks.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-flow.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-example.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-manage.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-reference.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-ref-actions.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-ref-before-after-reasoning.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-ref-expressions.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-ref-instructions.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-ref-operators.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-ref-tools.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-ref-utils.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/ascript-ref-variables.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/get-started-agents.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-set-up-env.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-nga-author-agent.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-generate-agent-spec.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-nga-authbundle.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-nga-script.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-nga-preview.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-nga-publish.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-synch.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-metadata.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-create-agent.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-create-agent-spec.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-modify.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-test.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-test-spec.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-test-customize.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-test-create.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-test-run.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-preview.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-manage.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-dx-reference.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-python.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-api.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-api-get-started.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-api-lifecycle.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-api-examples.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-api-variables.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-api-considerations.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-api-troubleshooting.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/testing-api.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/testing-api-get-started.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/testing-api-considerations.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/testing-api-build-tests.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/testing-api-custom-evaluation-criteria.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/testing-api-connect.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/testing-api-cli.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/testing-api-use-results.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-overview.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-before-you-begin.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-ios-quick-start.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-android-quick-start.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-ios-integration-overview.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-ios-requirements.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-ios-install.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-ios-integration.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-ios-prebuilt-ui.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-ios-headless.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-ios-branding-theming.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-android-integration-overview.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-android-requirements.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-android-install.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-android-integration.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-android-prebuilt-ui.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-android-headless.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-android-branding-theming.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-sdk-release-notes.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/get-started-enhanced-chat.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/enhanced-chat-inline-mode.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/get-started-actions.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-apex.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-apex-prerequisites.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-apex-generate-spec.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-apex-verify-spec.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-apex-limits.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-auraenabled.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-auraenabled-prerequisites.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-auraenabled-generate-spec.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-auraenabled-extensions.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-auraenabled-limits.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-namedquery.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/agent-invocablemethod.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/lightning-types.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/lightning-types-get-started.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/lightning-types-standard.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/lightning-types-custom.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/lightning-types-custom-schema.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/lightning-types-custom-editor.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/lightning-types-custom-renderer.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/lightning-types-setup.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/lightning-types-examples.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/lightning-types-example-full-editor-renderer.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/lightning-types-example-collection-renderer.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/lightning-types-references.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/global-copy.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/citations.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/models-get-started.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/supported-models.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/models-salesforce-owned.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/models-api.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/access-models-api-with-apex.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/access-models-api-with-rest.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/models-api-build-lwc-flow.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/models-api-rate-limits.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/models-api-names.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/models-api-feedback.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/models-api-languages-and-locales.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/models-api-data-masking.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/models-api-toxicity-scoring.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/get-started-einstein-studio.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/get-started-prompt-builder.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/prompt-template-batch-job.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/mcp.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/vs-code-extension.html',
  'https://developer.salesforce.com/docs/einstein/genai/references',
  'https://developer.salesforce.com/docs/einstein/genai/references/about',
  'https://developer.salesforce.com/docs/einstein/genai/references/about/about-genai-api.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agent-api',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-dx',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-dx/agentforce-dx-reference.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-mobile-sdk-overview.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/development-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/core-classes-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-client-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-access-mode-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-state-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/configuration-overview-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-configuration-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/employee-agent-configuration-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/service-agent-configuration-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-feature-flag-settings-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-page-context-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-page-context-providing-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/authentication-overview-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/data-models-overview-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-object-representation-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-record-representation-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-ui-api-record-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-ui-api-record-collection-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-ui-api-fields-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-ui-api-field-values-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-ui-api-object-info-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-ui-api-record-type-info-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/participant-action-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/participant-interaction-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/escalation-action-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/ui-components-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-chat-view-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-card-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-launcher-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-carousel-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-voice-view-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/conversation-ui-container-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/system-message-view-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/system-message-style-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/typing-indicator-view-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/typing-indicator-animation-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/participant-status-view-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/escalation-status-view-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/pulsing-aura-view-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/theming-overview-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-manager-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-default-theme-manager-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-mode-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-colors-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-design-system-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-representation-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-controllable-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/analytics-overview-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-instrumentation-handler-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-instrumentation-event-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-instrumentation-marker-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/architecture-integration-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agent-conversation-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-data-providing-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/speech-recognizer-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/typography-and-fonts-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/error-handling-overview-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-sdk-error-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-data-provider-errors-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/component-documentation-overview-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/image-components-ios.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/development-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/core-classes-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-client-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-access-mode-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-state-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/configuration-overview-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-mode-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-configuration-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/employee-agent-configuration-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/service-agent-configuration-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-context-manager-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/authentication-overview-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-auth-credential-provider-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-auth-credentials-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/data-models-overview-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-message-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-attachment-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/ui-components-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-component-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/chat-response-button-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/record-selector-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/text-input-components-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/checkbox-radio-components-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/rich-text-display-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/image-components-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/theming-overview-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-manager-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-creator-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/default-agentforce-theme-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-colors-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/typography-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-typography-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/salesforce-text-font-scale-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-spacing-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/spacing-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/spacing-styles-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/analytics-overview-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-instrumentation-handler-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-instrumentation-event-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/architecture-integration-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-api-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-service-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/bots-api-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/typography-and-fonts-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/error-handling-overview-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-sdk-error-android.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agent-script',
  'https://developer.salesforce.com/docs/einstein/genai/references/agent-script/agent-script-reference.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/lightning-types',
  'https://developer.salesforce.com/docs/einstein/genai/references/lightning-types/lightning-types-reference.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/models-apex-api',
  'https://developer.salesforce.com/docs/einstein/genai/references/models-apex-api/models-apex-reference.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/models-api',
  'https://developer.salesforce.com/docs/einstein/genai/references/testing-api',
  'https://developer.salesforce.com/docs/einstein/genai/references/testing-api/testing-reference-summary.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/testing-api/testing-connect-reference.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/testing-api/testing-metadata-reference.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/citations',
  'https://developer.salesforce.com/docs/einstein/genai/references/citations/citations-reference.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agents-metadata-tooling',
  'https://developer.salesforce.com/docs/einstein/genai/references/agents-metadata-tooling/agents-metadata.html',
  'https://developer.salesforce.com/docs/einstein/genai/references/agents-metadata-tooling/agents-tooling.html',
];

// Output directory
const docsDir = path.join(__dirname, '..', 'docs');

// Run the scraper
processUrls(urls, docsDir)
  .then(() => {
    console.log('\nScraping complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

