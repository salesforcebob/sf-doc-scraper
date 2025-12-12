#!/usr/bin/env node

/**
 * MCP Server for Salesforce Developer Documentation Scraping
 *
 * Exposes a tool to scrape Salesforce developer docs and return markdown content.
 * This can be used by Cursor or other MCP clients to fetch documentation on-demand.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import puppeteer, { Browser, Page } from 'puppeteer';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

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

// Browser instance (lazy initialized)
let browser: Browser | null = null;

/**
 * Get or create a browser instance
 */
async function getBrowser(): Promise<Browser> {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  return browser;
}

interface ExtractResult {
  title: string;
  html: string;
  pageType: string;
  error?: string;
}

interface ContentResult {
  title: string;
  markdown: string;
  pageType: string;
  error?: string;
}

/**
 * Extract content from a Salesforce docs URL
 *
 * Handles two page structures:
 * 1. GUIDE PAGES (/guide/*): doc-content-layout with shadow DOM slot
 * 2. REFERENCE PAGES (/references/*): doc-amf-reference with .markdown-content
 */
async function extractContent(url: string): Promise<ContentResult> {
  const browserInstance = await getBrowser();
  const page: Page = await browserInstance.newPage();

  try {
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

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

          if (tagName === 'h1') {
            title = el.textContent?.trim() || title;
            fullHTML += el.outerHTML;
          } else {
            fullHTML += extractReadableHTML(el);
          }
        }

        return { title, html: fullHTML };
      }

      // Try REFERENCE PAGE structure first
      const docRef = document.querySelector('doc-amf-reference');
      if (docRef) {
        const markdownContent = docRef.querySelector('.markdown-content');
        if (markdownContent) {
          return { ...processChildren(markdownContent), pageType: 'reference' };
        }
      }

      // Try GUIDE PAGE structure
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

            return { title, html: fullHTML, pageType: 'guide' };
          }
        }
      }

      // Fallback: try to find any h1 and main content
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
        pageType: 'unknown',
        error: 'Could not find content structure',
      };
    });

    // Convert HTML to Markdown
    const markdown = turndownService.turndown(result.html);

    return {
      title: result.title,
      markdown: markdown,
      pageType: result.pageType || 'unknown',
      error: result.error,
    };
  } finally {
    await page.close();
  }
}

// Create the MCP server
const server = new Server(
  {
    name: 'sf-docs-scraper',
    version: '1.0.1',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'scrape_sf_docs',
        description:
          'Scrape a Salesforce developer documentation page and return the content as markdown. Works with both guide pages (/guide/*) and reference pages (/references/*).',
        inputSchema: {
          type: 'object' as const,
          properties: {
            url: {
              type: 'string',
              description:
                'The full URL of the Salesforce documentation page to scrape (e.g., https://developer.salesforce.com/docs/einstein/genai/guide/get-started.html)',
            },
          },
          required: ['url'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'scrape_sf_docs') {
    const url = (args as { url?: string })?.url;

    if (!url || typeof url !== 'string') {
      return {
        content: [
          {
            type: 'text' as const,
            text: 'Error: url parameter is required and must be a string',
          },
        ],
        isError: true,
      };
    }

    // Validate URL is a Salesforce docs URL
    if (!url.includes('developer.salesforce.com/docs')) {
      return {
        content: [
          {
            type: 'text' as const,
            text: 'Error: URL must be a Salesforce developer documentation page (developer.salesforce.com/docs)',
          },
        ],
        isError: true,
      };
    }

    try {
      const result = await extractContent(url);

      if (result.error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Warning: ${result.error}\n\n# ${result.title}\n\n${result.markdown}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: `# ${result.title}\n\n**Page Type:** ${result.pageType}\n\n---\n\n${result.markdown}`,
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: 'text' as const,
            text: `Error scraping ${url}: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }

  return {
    content: [
      {
        type: 'text' as const,
        text: `Unknown tool: ${name}`,
      },
    ],
    isError: true,
  };
});

// Cleanup on exit
process.on('SIGINT', async () => {
  if (browser) {
    await browser.close();
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  if (browser) {
    await browser.close();
  }
  process.exit(0);
});

// Start the server
async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('SF Docs MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

