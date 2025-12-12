#!/usr/bin/env node

/**
 * MCP Server for Salesforce Developer Documentation Scraping
 *
 * Exposes tools to analyze and scrape Salesforce developer docs.
 * This can be used by Cursor or other MCP clients to fetch documentation on-demand.
 *
 * Tools:
 * - analyze_page_structure: Analyze a page's DOM structure to find content selectors
 * - scrape_sf_docs: Scrape content using default or custom selectors
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import puppeteer, { Browser, Page } from 'puppeteer';
import express, { Request, Response } from 'express';
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

interface PageAnalysis {
  url: string;
  pageType: string;
  customElements: string[];
  shadowDomElements: string[];
  contentContainers: ContentContainer[];
  suggestedApproach: SuggestedApproach;
  domSnapshot: string;
}

interface ContentContainer {
  selector: string;
  shadowPath?: string[];
  description: string;
  hasContent: boolean;
  contentPreview?: string;
}

interface SuggestedApproach {
  method: 'default' | 'selector' | 'shadowPath';
  selector?: string;
  shadowPath?: string[];
  explanation: string;
}

/**
 * Analyze a page's DOM structure to help determine the best extraction approach
 */
async function analyzePageStructure(url: string): Promise<PageAnalysis> {
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

    // Wait for page to load
    await Promise.race([
      page.waitForSelector('doc-content-layout', { timeout: 30000 }).catch(() => null),
      page.waitForSelector('doc-amf-reference', { timeout: 30000 }).catch(() => null),
    ]);

    // Give extra time for shadow DOM content to render
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Analyze the page structure
    const analysis = await page.evaluate(() => {
      const result: {
        customElements: string[];
        shadowDomElements: string[];
        contentContainers: Array<{
          selector: string;
          shadowPath?: string[];
          description: string;
          hasContent: boolean;
          contentPreview?: string;
        }>;
        pageType: string;
        domSnapshot: string;
      } = {
        customElements: [],
        shadowDomElements: [],
        contentContainers: [],
        pageType: 'unknown',
        domSnapshot: '',
      };

      // Find all custom elements (hyphenated tag names)
      const allElements = document.querySelectorAll('*');
      const customElementSet = new Set<string>();
      const shadowDomSet = new Set<string>();

      allElements.forEach((el) => {
        const tagName = el.tagName.toLowerCase();
        if (tagName.includes('-')) {
          customElementSet.add(tagName);
          if (el.shadowRoot) {
            shadowDomSet.add(tagName);
          }
        }
      });

      result.customElements = Array.from(customElementSet);
      result.shadowDomElements = Array.from(shadowDomSet);

      // Helper to get text preview
      function getPreview(text: string | null | undefined): string {
        if (!text) return '';
        return text.trim().substring(0, 150).replace(/\s+/g, ' ') + '...';
      }

      // Helper to build DOM tree snapshot
      function buildDomTree(element: Element, depth: number = 0, maxDepth: number = 4): string {
        if (depth > maxDepth) return '';

        const tagName = element.tagName.toLowerCase();
        const indent = '  '.repeat(depth);
        const classes = element.className && typeof element.className === 'string'
          ? `.${element.className.split(' ').filter(Boolean).join('.')}`
          : '';
        const id = element.id ? `#${element.id}` : '';
        const hasShadow = element.shadowRoot ? ' [shadow-root]' : '';

        let tree = `${indent}${tagName}${id}${classes}${hasShadow}\n`;

        // If element has shadow root, traverse into it
        if (element.shadowRoot) {
          tree += `${indent}  └─ shadow-root:\n`;
          Array.from(element.shadowRoot.children).forEach((child) => {
            tree += buildDomTree(child as Element, depth + 2, maxDepth);
          });
        }

        // Traverse regular children (limit for readability)
        const children = Array.from(element.children).slice(0, 10);
        children.forEach((child) => {
          tree += buildDomTree(child as Element, depth + 1, maxDepth);
        });

        return tree;
      }

      // Check for different page types and content containers

      // 1. Guide page structure
      const docLayout = document.querySelector('doc-content-layout');
      if (docLayout?.shadowRoot) {
        const slot = docLayout.shadowRoot.querySelector('.content-body slot') as HTMLSlotElement | null;
        if (slot) {
          const assignedElements = slot.assignedElements();
          if (assignedElements.length > 0) {
            result.pageType = 'guide';
            result.contentContainers.push({
              selector: 'doc-content-layout',
              shadowPath: ['doc-content-layout'],
              description: 'Guide page with slot-based content',
              hasContent: true,
              contentPreview: getPreview(assignedElements[0]?.textContent),
            });
          }
        }
      }

      // 2. Reference page with markdown content
      const docRef = document.querySelector('doc-amf-reference');
      if (docRef) {
        const markdownContent = docRef.querySelector('.markdown-content');
        if (markdownContent) {
          result.pageType = 'reference';
          result.contentContainers.push({
            selector: 'doc-amf-reference .markdown-content',
            description: 'Reference page with markdown content',
            hasContent: true,
            contentPreview: getPreview(markdownContent.textContent),
          });
        }

        // 3. API Reference with deeply nested shadow DOM
        if (docRef.shadowRoot) {
          const amfTopic = docRef.shadowRoot.querySelector('doc-amf-topic');
          if (amfTopic?.shadowRoot) {
            // Check for api-summary (Summary pages)
            const apiSummary = amfTopic.shadowRoot.querySelector('api-summary');
            if (apiSummary?.shadowRoot) {
              result.pageType = 'api-summary';
              result.contentContainers.push({
                selector: 'api-summary',
                shadowPath: ['doc-amf-reference', 'doc-amf-topic', 'api-summary'],
                description: 'API Summary page with nested shadow DOM',
                hasContent: true,
                contentPreview: getPreview(apiSummary.shadowRoot.textContent),
              });
            }

            // Check for api-type-documentation (Type definition pages like ClientIdParam, CookieIdParam)
            const apiTypeDocs = amfTopic.shadowRoot.querySelector('api-type-documentation');
            if (apiTypeDocs?.shadowRoot) {
              result.pageType = 'api-type';
              const titleDiv = apiTypeDocs.shadowRoot.querySelector('.title');
              const arcMarked = apiTypeDocs.shadowRoot.querySelector('arc-marked');
              const preview = titleDiv?.textContent?.trim() + ': ' + (arcMarked?.textContent?.trim()?.substring(0, 100) || '');
              result.contentContainers.push({
                selector: 'api-type-documentation',
                shadowPath: ['doc-amf-reference', 'doc-amf-topic', 'api-type-documentation'],
                description: 'API Type definition page',
                hasContent: true,
                contentPreview: preview,
              });
            }

            // Check for api-method-documentation (Method/Endpoint pages like Send Query)
            const apiMethodDoc = amfTopic.shadowRoot.querySelector('api-method-documentation');
            if (apiMethodDoc?.shadowRoot) {
              result.pageType = 'api-method';
              const titleArea = apiMethodDoc.shadowRoot.querySelector('.title-area');
              const arcMarked = apiMethodDoc.shadowRoot.querySelector('arc-marked');
              const preview = (titleArea?.textContent?.trim() || '') + ': ' + (arcMarked?.textContent?.trim()?.substring(0, 100) || '');
              result.contentContainers.push({
                selector: 'api-method-documentation',
                shadowPath: ['doc-amf-reference', 'doc-amf-topic', 'api-method-documentation'],
                description: 'API Method/Endpoint documentation page',
                hasContent: true,
                contentPreview: preview,
              });
            }

            // Check for api-documentation (Endpoint pages - older style)
            const apiDocs = amfTopic.shadowRoot.querySelector('api-documentation');
            if (apiDocs?.shadowRoot) {
              result.pageType = 'api-documentation';
              result.contentContainers.push({
                selector: 'api-documentation',
                shadowPath: ['doc-amf-reference', 'doc-amf-topic', 'api-documentation'],
                description: 'API Documentation/Endpoint page',
                hasContent: true,
                contentPreview: getPreview(apiDocs.shadowRoot.textContent),
              });
            }

            // Check for api-operation-document (Method pages)
            const apiOpDoc = amfTopic.shadowRoot.querySelector('api-operation-document');
            if (apiOpDoc?.shadowRoot) {
              result.pageType = 'api-operation';
              result.contentContainers.push({
                selector: 'api-operation-document',
                shadowPath: ['doc-amf-reference', 'doc-amf-topic', 'api-operation-document'],
                description: 'API Operation/Method page',
                hasContent: true,
                contentPreview: getPreview(apiOpDoc.shadowRoot.textContent),
              });
            }
          }
        }
      }

      // 4. Check for OVERVIEW page structure (landing pages)
      const groupText = document.querySelector('dx-group-text');
      if (groupText?.shadowRoot) {
        result.pageType = 'overview';
        const titleEl = groupText.shadowRoot.querySelector('.title');
        const bodyEl = groupText.shadowRoot.querySelector('.body');
        const preview = (titleEl?.textContent?.trim() || '') + ': ' + (bodyEl?.textContent?.trim()?.substring(0, 100) || '');
        result.contentContainers.push({
          selector: 'dx-group-text',
          description: 'Overview/landing page with title and description',
          hasContent: true,
          contentPreview: preview,
        });
      }

      // 5. Fallback - check for main content area
      const main = document.querySelector('main');
      if (main) {
        result.contentContainers.push({
          selector: 'main',
          description: 'Main content area (fallback)',
          hasContent: main.innerHTML.trim().length > 0,
          contentPreview: getPreview(main.textContent),
        });
      }

      // Build DOM snapshot starting from body
      const body = document.body;
      if (body) {
        result.domSnapshot = buildDomTree(body, 0, 5);
      }

      return result;
    });

    // Determine suggested approach
    let suggestedApproach: SuggestedApproach;

    if (analysis.pageType === 'guide' || analysis.pageType === 'reference') {
      suggestedApproach = {
        method: 'default',
        explanation: `This is a ${analysis.pageType} page that works with default extraction logic.`,
      };
    } else if (analysis.contentContainers.length > 0 && analysis.contentContainers[0].shadowPath) {
      const container = analysis.contentContainers[0];
      suggestedApproach = {
        method: 'shadowPath',
        shadowPath: container.shadowPath,
        selector: container.selector,
        explanation: `This ${analysis.pageType} page requires shadow DOM traversal. Use shadowPath: ${JSON.stringify(container.shadowPath)}`,
      };
    } else if (analysis.contentContainers.length > 0) {
      suggestedApproach = {
        method: 'selector',
        selector: analysis.contentContainers[0].selector,
        explanation: `Use selector: "${analysis.contentContainers[0].selector}" to extract content.`,
      };
    } else {
      suggestedApproach = {
        method: 'default',
        explanation: 'Could not determine content structure. Try default extraction or inspect the DOM snapshot.',
      };
    }

    return {
      url,
      pageType: analysis.pageType,
      customElements: analysis.customElements,
      shadowDomElements: analysis.shadowDomElements,
      contentContainers: analysis.contentContainers,
      suggestedApproach,
      domSnapshot: analysis.domSnapshot,
    };
  } finally {
    await page.close();
  }
}

/**
 * Extract content from a Salesforce docs URL
 *
 * Supports three modes:
 * 1. Default: Uses built-in logic to detect and extract from known page structures
 * 2. Selector: Uses a CSS selector to find content in the light DOM
 * 3. ShadowPath: Traverses through shadow DOM boundaries to find content
 */
async function extractContent(
  url: string,
  options?: {
    selector?: string;
    shadowPath?: string[];
  }
): Promise<ContentResult> {
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

    // Extract using custom selector/shadowPath if provided
    if (options?.shadowPath && options.shadowPath.length > 0) {
      const result = await extractWithShadowPath(page, options.shadowPath, options.selector);
      return result;
    }

    if (options?.selector) {
      const result = await extractWithSelector(page, options.selector);
      return result;
    }

    // Default extraction logic
    const result = await extractDefault(page);
    return result;
  } finally {
    await page.close();
  }
}

/**
 * Extract content by traversing shadow DOM boundaries
 */
async function extractWithShadowPath(
  page: Page,
  shadowPath: string[],
  finalSelector?: string
): Promise<ContentResult> {
  const result: ExtractResult = await page.evaluate(
    (path: string[], selector: string | undefined) => {
      let current: Element | ShadowRoot | null = document.body;

      // Traverse through shadow DOM boundaries
      for (const step of path) {
        if (!current) break;

        // Find the element (could be in light DOM or shadow root)
        const element: Element | null =
          current instanceof ShadowRoot
            ? current.querySelector(step)
            : (current as Element).querySelector(step);

        if (!element) {
          return {
            title: 'Untitled',
            html: '',
            pageType: 'shadow-path',
            error: `Could not find element "${step}" in shadow path`,
          };
        }

        // Move into shadow root if available
        if (element.shadowRoot) {
          current = element.shadowRoot;
        } else {
          current = element;
        }
      }

      if (!current) {
        return {
          title: 'Untitled',
          html: '',
          pageType: 'shadow-path',
          error: 'Shadow path traversal failed',
        };
      }

      // Apply final selector if provided
      let contentElement: Element | null = null;
      if (selector) {
        contentElement =
          current instanceof ShadowRoot
            ? current.querySelector(selector)
            : (current as Element).querySelector(selector);
      } else {
        // Use the current element/shadowRoot content
        contentElement =
          current instanceof ShadowRoot
            ? (current.host as Element)
            : (current as Element);
      }

      if (!contentElement && current instanceof ShadowRoot) {
        // Get all content from shadow root
        const html = Array.from(current.children)
          .map((child) => child.outerHTML)
          .join('\n');

        // Try to find a title
        const h1 = current.querySelector('h1, h2, .title, [class*="title"]');
        const title = h1?.textContent?.trim() || 'Untitled';

        return { title, html, pageType: 'shadow-path' };
      }

      if (!contentElement) {
        return {
          title: 'Untitled',
          html: '',
          pageType: 'shadow-path',
          error: 'Could not find content element',
        };
      }

      // Extract content
      const html = contentElement.innerHTML || contentElement.outerHTML;
      const h1 = contentElement.querySelector('h1') || document.querySelector('h1');
      const title = h1?.textContent?.trim() || 'Untitled';

      return { title, html, pageType: 'shadow-path' };
    },
    shadowPath,
    finalSelector
  );

  // Convert HTML to Markdown
  const markdown = turndownService.turndown(result.html);

  return {
    title: result.title,
    markdown,
    pageType: result.pageType,
    error: result.error,
  };
}

/**
 * Extract content using a CSS selector (light DOM only)
 */
async function extractWithSelector(page: Page, selector: string): Promise<ContentResult> {
  const result: ExtractResult = await page.evaluate((sel: string) => {
    const element = document.querySelector(sel);

    if (!element) {
      return {
        title: 'Untitled',
        html: '',
        pageType: 'selector',
        error: `Could not find element with selector "${sel}"`,
      };
    }

    const html = element.innerHTML;
    const h1 = element.querySelector('h1') || document.querySelector('h1');
    const title = h1?.textContent?.trim() || 'Untitled';

    return { title, html, pageType: 'selector' };
  }, selector);

  const markdown = turndownService.turndown(result.html);

  return {
    title: result.title,
    markdown,
    pageType: result.pageType,
    error: result.error,
  };
}

/**
 * Default extraction logic for known Salesforce doc page structures
 */
async function extractDefault(page: Page): Promise<ContentResult> {
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

    // Try REFERENCE PAGE structure first (markdown-based references)
    const docRef = document.querySelector('doc-amf-reference');
    if (docRef) {
      const markdownContent = docRef.querySelector('.markdown-content');
      if (markdownContent) {
        return { ...processChildren(markdownContent), pageType: 'reference' };
      }

      // Try AMF API REFERENCE structure (OpenAPI/RAML-based API docs)
      if (docRef.shadowRoot) {
        const amfTopic = docRef.shadowRoot.querySelector('doc-amf-topic');
        if (amfTopic?.shadowRoot) {
          // Check for api-summary
          const apiSummary = amfTopic.shadowRoot.querySelector('api-summary');
          if (apiSummary?.shadowRoot) {
            const fullText = apiSummary.shadowRoot.textContent || '';
            const startIndex = fullText.indexOf('API title:');

            if (startIndex !== -1) {
              const contentText = fullText.substring(startIndex);

              const lines = contentText
                .split('\n')
                .map((l) => l.trim())
                .filter(Boolean);
              let html = '';
              let title = 'Untitled';
              let currentSection = '';

              for (const line of lines) {
                if (line.startsWith('API title:')) {
                  continue;
                } else if (line.startsWith('Version:')) {
                  continue;
                } else if (line.startsWith('Supported protocols')) {
                  currentSection = 'protocols';
                  html += '<h3>Supported Protocols</h3>';
                } else if (line === 'API Overview') {
                  currentSection = 'overview';
                  html += '<h2>API Overview</h2>';
                } else if (!title || title === 'Untitled') {
                  if (!line.includes(':') && line.length < 100) {
                    title = line;
                    html += `<h1>${line}</h1>`;
                  }
                } else if (line.match(/^v\d+/)) {
                  html += `<p><strong>Version:</strong> ${line}</p>`;
                } else if (currentSection === 'protocols') {
                  html += `<p>${line}</p>`;
                  currentSection = '';
                } else if (currentSection === 'overview' || line.length > 20) {
                  html += `<p>${line}</p>`;
                }
              }

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

          // Check for api-type-documentation (Type definition pages like ClientIdParam, CookieIdParam)
          // Structure: api-type-documentation (shadow) → .title, arc-marked, api-type-document
          const apiTypeDocs = amfTopic.shadowRoot.querySelector('api-type-documentation');
          if (apiTypeDocs?.shadowRoot) {
            const shadowContent = apiTypeDocs.shadowRoot;

            // Extract title from .title div
            const titleDiv = shadowContent.querySelector('.title');
            const title = titleDiv?.textContent?.trim() || 'Type Definition';

            // Extract description from arc-marked (contains slotted HTML content)
            const arcMarked = shadowContent.querySelector('arc-marked');
            let description = '';
            if (arcMarked) {
              // The actual content is in the light DOM (slotted)
              description = arcMarked.innerHTML || '';
            }

            // Build the HTML output
            let html = `<h1>${title}</h1>`;
            if (description) {
              html += `<div class="description">${description}</div>`;
            }
            html += `<p><strong>Type:</strong> string</p>`;

            return { title, html, pageType: 'api-type' };
          }

          // Fallback: Check for api-type-document directly (older structure)
          const apiTypeDoc = amfTopic.shadowRoot.querySelector('api-type-document');
          if (apiTypeDoc?.shadowRoot) {
            const shadowContent = apiTypeDoc.shadowRoot;
            const textContent = shadowContent.textContent || '';
            const lines = textContent
              .split('\n')
              .filter((line) => !line.includes('{') && !line.includes('}'))
              .filter((line) => line.trim().length > 0);

            const html = lines.map((line) => `<p>${line.trim()}</p>`).join('\n');
            const title = lines[0]?.trim() || 'Type Definition';

            return { title, html, pageType: 'api-type' };
          }

          // Check for api-method-documentation (Method/Endpoint pages like Send Query)
          // Structure: api-method-documentation (shadow) → .title-area, api-url, arc-marked, sections
          const apiMethodDoc = amfTopic.shadowRoot.querySelector('api-method-documentation');
          if (apiMethodDoc?.shadowRoot) {
            const shadowContent = apiMethodDoc.shadowRoot;

            // Get title from .title-area
            const titleArea = shadowContent.querySelector('.title-area');
            const title = titleArea?.textContent?.trim() || 'API Method';

            // Get description from arc-marked (contains slotted HTML)
            const arcMarked = shadowContent.querySelector('arc-marked');
            let description = '';
            if (arcMarked) {
              description = arcMarked.innerHTML || '';
            }

            // Build HTML output
            let html = `<h1>${title}</h1>`;
            if (description) {
              html += `<div class="description">${description}</div>`;
            }

            // Add section headers for Request and Response
            const requestSection = shadowContent.querySelector('.request-documentation');
            if (requestSection) {
              html += '<h2>Request</h2>';
              // Get parameters if available
              const paramsDoc = requestSection.querySelector('api-parameters-document');
              if (paramsDoc) {
                const paramsSlot = paramsDoc.innerHTML;
                if (paramsSlot) html += paramsSlot;
              }
              const bodyDoc = requestSection.querySelector('api-body-document');
              if (bodyDoc) {
                const bodySlot = bodyDoc.innerHTML;
                if (bodySlot) html += bodySlot;
              }
            }

            const responseSection = shadowContent.querySelector('.response-documentation');
            if (responseSection) {
              html += '<h2>Responses</h2>';
              const responsesDoc = responseSection.querySelector('api-responses-document');
              if (responsesDoc) {
                const responsesSlot = responsesDoc.innerHTML;
                if (responsesSlot) html += responsesSlot;
              }
            }

            return { title, html, pageType: 'api-method' };
          }

          // Check for api-documentation
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

    // Try OVERVIEW PAGE structure (landing pages with dx-group-text, dx-features-list)
    const groupText = document.querySelector('dx-group-text');
    if (groupText?.shadowRoot) {
      const shadowContent = groupText.shadowRoot;
      const titleEl = shadowContent.querySelector('.title');
      const bodyEl = shadowContent.querySelector('.body');

      const title = titleEl?.textContent?.trim() || 'Overview';
      let html = `<h1>${title}</h1>`;

      if (bodyEl) {
        html += `<p>${bodyEl.textContent?.trim()}</p>`;
      }

      // Get features list if present
      const featuresList = document.querySelector('dx-features-list');
      if (featuresList?.shadowRoot) {
        const features = featuresList.shadowRoot.querySelectorAll('li.option');
        if (features.length > 0) {
          html += '<h2>Features</h2><ul>';
          features.forEach((feature) => {
            const featureTitle = feature.querySelector('.dx-text-display-8')?.textContent?.trim();
            const featureDesc = feature.querySelector('.dx-text-body-2')?.textContent?.trim();
            if (featureTitle) {
              html += `<li><strong>${featureTitle}</strong>: ${featureDesc || ''}</li>`;
            }
          });
          html += '</ul>';
        }
      }

      return { title, html, pageType: 'overview' };
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
    markdown,
    pageType: result.pageType || 'unknown',
    error: result.error,
  };
}

// Create the MCP server
const server = new Server(
  {
    name: 'sf-docs-scraper',
    version: '1.3.1',
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
        name: 'analyze_page_structure',
        description:
          'Analyze the DOM structure of a Salesforce documentation page. Returns information about custom elements, shadow DOM boundaries, content containers, and suggested extraction approaches. Use this first when the default scraper fails to extract content.',
        inputSchema: {
          type: 'object' as const,
          properties: {
            url: {
              type: 'string',
              description:
                'The full URL of the Salesforce documentation page to analyze',
            },
          },
          required: ['url'],
        },
      },
      {
        name: 'scrape_sf_docs',
        description:
          'Scrape a Salesforce developer documentation page and return the content as markdown. Works with guide pages (/guide/*), reference pages (/references/*), and API reference pages. Supports custom selectors and shadow DOM traversal for complex page structures.',
        inputSchema: {
          type: 'object' as const,
          properties: {
            url: {
              type: 'string',
              description:
                'The full URL of the Salesforce documentation page to scrape',
            },
            selector: {
              type: 'string',
              description:
                'Optional CSS selector for the content container (light DOM only). Use when default extraction fails.',
            },
            shadowPath: {
              type: 'array',
              items: { type: 'string' },
              description:
                'Optional array of element selectors to traverse through shadow DOM boundaries. Example: ["doc-amf-reference", "doc-amf-topic", "api-type-document"]. Each step enters the shadow root of the matched element.',
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

  if (name === 'analyze_page_structure') {
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

    if (!url.includes('developer.salesforce.com/docs') && !url.includes('help.salesforce.com')) {
      return {
        content: [
          {
            type: 'text' as const,
            text: 'Error: URL must be a Salesforce documentation page (developer.salesforce.com/docs or help.salesforce.com)',
          },
        ],
        isError: true,
      };
    }

    try {
      const analysis = await analyzePageStructure(url);

      const output = `# Page Structure Analysis

**URL:** ${analysis.url}
**Detected Page Type:** ${analysis.pageType}

## Custom Elements Found
${analysis.customElements.length > 0 ? analysis.customElements.map((e) => `- \`${e}\``).join('\n') : 'None'}

## Elements with Shadow DOM
${analysis.shadowDomElements.length > 0 ? analysis.shadowDomElements.map((e) => `- \`${e}\``).join('\n') : 'None'}

## Content Containers
${
  analysis.contentContainers.length > 0
    ? analysis.contentContainers
        .map(
          (c) => `### ${c.selector}
- **Description:** ${c.description}
- **Has Content:** ${c.hasContent}
${c.shadowPath ? `- **Shadow Path:** \`${JSON.stringify(c.shadowPath)}\`` : ''}
${c.contentPreview ? `- **Preview:** ${c.contentPreview}` : ''}`
        )
        .join('\n\n')
    : 'No content containers found'
}

## Suggested Approach
**Method:** ${analysis.suggestedApproach.method}
${analysis.suggestedApproach.selector ? `**Selector:** \`${analysis.suggestedApproach.selector}\`` : ''}
${analysis.suggestedApproach.shadowPath ? `**Shadow Path:** \`${JSON.stringify(analysis.suggestedApproach.shadowPath)}\`` : ''}
**Explanation:** ${analysis.suggestedApproach.explanation}

## DOM Snapshot
\`\`\`
${analysis.domSnapshot}
\`\`\`
`;

      return {
        content: [
          {
            type: 'text' as const,
            text: output,
          },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: 'text' as const,
            text: `Error analyzing ${url}: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }

  if (name === 'scrape_sf_docs') {
    const { url, selector, shadowPath } = args as {
      url?: string;
      selector?: string;
      shadowPath?: string[];
    };

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

    if (!url.includes('developer.salesforce.com/docs') && !url.includes('help.salesforce.com')) {
      return {
        content: [
          {
            type: 'text' as const,
            text: 'Error: URL must be a Salesforce documentation page (developer.salesforce.com/docs or help.salesforce.com)',
          },
        ],
        isError: true,
      };
    }

    try {
      const result = await extractContent(url, { selector, shadowPath });

      if (result.error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Warning: ${result.error}\n\n# ${result.title}\n\n**Page Type:** ${result.pageType}\n\n---\n\n${result.markdown}`,
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

/**
 * Get documentation for the MCP server
 */
function getDocumentation(): string {
  return `# SF Docs MCP Server

An MCP server for scraping Salesforce developer documentation and converting to Markdown.

## Available Tools

### scrape_sf_docs
Scrape a Salesforce documentation page and return content as Markdown.

**Parameters:**
- url (required): The Salesforce documentation URL to scrape
- selector (optional): CSS selector for content container
- shadowPath (optional): Array of selectors to traverse shadow DOM

### analyze_page_structure
Analyze a page's DOM structure to find the best extraction approach.

**Parameters:**
- url (required): The Salesforce documentation URL to analyze

## Supported Page Types
- guide: Guide pages (/guide/*)
- reference: Reference pages with markdown content
- api-reference: API summary pages
- api-type: Type definition pages
- api-method: Method/endpoint pages
- overview: Landing/overview pages

## Usage
Use scrape_sf_docs with just the URL for automatic extraction.
If extraction fails, use analyze_page_structure first to determine the correct selector or shadowPath.

## More Information
https://github.com/salesforcebob/sf-doc-scraper
`;
}

/**
 * Start the server in stdio mode (default)
 */
async function startStdioServer(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('SF Docs MCP Server running on stdio');
}

/**
 * Start the server in HTTP mode (for Heroku/remote deployment)
 */
async function startHttpServer(): Promise<void> {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ ok: true, version: '1.3.1', name: 'sf-docs-mcp-server' });
  });

  // Documentation endpoint
  app.get('/docs', (_req: Request, res: Response) => {
    res.json({ documentation: getDocumentation() });
  });

  // MCP HTTP endpoint
  app.post('/mcp', async (req: Request, res: Response) => {
    try {
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => `session-${Date.now()}`,
      });

      // Connect the transport to the server
      await server.connect(transport);

      // Handle the request
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('MCP request error:', errorMessage);
      res.status(500).json({ error: errorMessage });
    }
  });

  // Start listening
  app.listen(PORT, () => {
    console.log(`SF Docs MCP Server running on HTTP port ${PORT}`);
    console.log(`Health: http://localhost:${PORT}/health`);
    console.log(`Docs: http://localhost:${PORT}/docs`);
    console.log(`MCP: http://localhost:${PORT}/mcp`);
  });
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const mode = args[0];

  if (mode === 'serve' || mode === 'web') {
    await startHttpServer();
  } else {
    await startStdioServer();
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
