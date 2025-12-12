# SF Docs MCP Server

An MCP (Model Context Protocol) server for scraping Salesforce developer documentation and converting it to Markdown. Integrates with Cursor, Claude Desktop, and other MCP-compatible AI assistants.

## Installation

```bash
npm install -g @salesforcebob/sf-docs-mcp-server
```

Or use directly with npx:

```bash
npx @salesforcebob/sf-docs-mcp-server
```

## Features

- Scrapes Salesforce developer docs (handles React/shadow DOM components)
- Supports guide pages (`/guide/*`), reference pages (`/references/*`), and API reference pages
- **Analyzes page structure** to determine optimal extraction strategy
- **Dynamic selector support** for handling edge cases and complex page structures
- **Shadow DOM traversal** for deeply nested content
- Converts HTML to clean Markdown with GFM table support
- Runs as an MCP server for AI assistant integration

## MCP Configuration

### Cursor

Add to your Cursor MCP configuration (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "sf-docs": {
      "command": "npx",
      "args": ["-y", "@salesforcebob/sf-docs-mcp-server"]
    }
  }
}
```

Or if installed globally:

```json
{
  "mcpServers": {
    "sf-docs": {
      "command": "sf-docs-mcp"
    }
  }
}
```

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "sf-docs": {
      "command": "npx",
      "args": ["-y", "@salesforcebob/sf-docs-mcp-server"]
    }
  }
}
```

## Available Tools

### `analyze_page_structure`

Analyze the DOM structure of a Salesforce documentation page to determine the best extraction approach. **Use this first when the default scraper fails or returns empty content.**

**Input:**
- `url` (string, required): The Salesforce documentation URL to analyze

**Example:**
```json
{
  "url": "https://developer.salesforce.com/docs/commerce/einstein-api/references/einstein-profile-connector?meta=type:ClientIdParam"
}
```

**Output:**
- Detected page type
- List of custom elements found
- Elements with shadow DOM
- Content containers with suggested selectors/shadow paths
- Suggested extraction approach
- DOM tree snapshot for debugging

### `scrape_sf_docs`

Scrape a Salesforce documentation page and return the content as Markdown. Supports three extraction modes: default (automatic), selector-based, and shadow path traversal.

**Input:**
- `url` (string, required): The Salesforce documentation URL to scrape
- `selector` (string, optional): CSS selector for content container (light DOM only)
- `shadowPath` (string[], optional): Array of selectors to traverse shadow DOM boundaries

**Examples:**

Basic usage (automatic detection):
```json
{
  "url": "https://developer.salesforce.com/docs/einstein/genai/guide/get-started.html"
}
```

With selector for light DOM content:
```json
{
  "url": "https://developer.salesforce.com/docs/...",
  "selector": ".markdown-content"
}
```

With shadow path for nested shadow DOM:
```json
{
  "url": "https://developer.salesforce.com/docs/commerce/einstein-api/references/einstein-profile-connector?meta=type:ClientIdParam",
  "shadowPath": ["doc-amf-reference", "doc-amf-topic", "api-type-documentation"]
}
```

**Output:**
- Title of the page
- Page type (guide, reference, api-reference, api-type, shadow-path, selector, or fallback)
- Full markdown content

## How It Works

The Salesforce developer docs use a React-based architecture with nested shadow DOM components. This server handles multiple page structures:

### Guide Pages (`/guide/*`)
1. Finds `doc-content-layout` custom element
2. Accesses its shadow DOM to find the `.content-body slot`
3. Extracts slotted content from light DOM

### Reference Pages (`/references/*`)
1. Finds `doc-amf-reference` custom element
2. Extracts content from `div.markdown-content` in light DOM

### API Reference Pages (OpenAPI/RAML-based)
1. Traverses deeply nested shadow DOM:
   - `doc-amf-reference` → `doc-amf-topic` → `api-summary` | `api-type-document` | `api-documentation`
2. Extracts and parses structured content from shadow roots

### Custom Elements Handled
- `doc-heading` - Headings with nested shadow DOM
- `doc-content-callout` - Tips, notes, warnings
- `dx-code-block` - Code snippets with syntax highlighting
- `api-summary` - API overview pages
- `api-type-document` - Type definition pages
- `api-documentation` - Endpoint documentation pages

## Agent Usage Guide

For detailed instructions on how AI agents should use these tools, see [AGENT_GUIDE.md](./AGENT_GUIDE.md).

## Batch Scraping (Optional)

For batch scraping multiple pages at once, you can use the included scraper script:

```javascript
// Edit the urls array in scraper.js
const urls = [
  'https://developer.salesforce.com/docs/einstein/genai/guide/get-started.html',
  // Add more URLs here
];
```

Then run:
```bash
npm run scrape
```

## Requirements

- Node.js >= 18.0.0
- Chrome/Chromium (installed automatically by Puppeteer)

## Dependencies

- [Puppeteer](https://pptr.dev/) - Headless browser automation
- [Turndown](https://github.com/mixmark-io/turndown) - HTML to Markdown conversion
- [turndown-plugin-gfm](https://github.com/mixmark-io/turndown-plugin-gfm) - GFM table support
- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) - MCP server implementation

## License

MIT
