# SF Docs MCP Server

An MCP (Model Context Protocol) server for scraping Salesforce developer documentation and converting it to Markdown. Integrates with Cursor, Claude Desktop, and other MCP-compatible AI assistants.

## Installation

```bash
npm install -g sf-docs-mcp-server
```

Or use directly with npx:

```bash
npx sf-docs-mcp-server
```

## Features

- Scrapes Salesforce developer docs (handles React/shadow DOM components)
- Supports both guide pages (`/guide/*`) and reference pages (`/references/*`)
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
      "args": ["-y", "sf-docs-mcp-server"]
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
      "args": ["-y", "sf-docs-mcp-server"]
    }
  }
}
```

## Available Tools

### `scrape_sf_docs`

Scrape a Salesforce documentation page and return the content as Markdown.

**Input:**
- `url` (string, required): The Salesforce documentation URL to scrape

**Example:**
```
scrape_sf_docs({
  url: "https://developer.salesforce.com/docs/einstein/genai/guide/get-started.html"
})
```

**Output:**
- Title of the page
- Page type (guide, reference, or fallback)
- Full markdown content

## How It Works

The Salesforce developer docs use a React-based architecture with nested shadow DOM components. This server handles two page structures:

### Guide Pages (`/guide/*`)
1. Finds `doc-content-layout` custom element
2. Accesses its shadow DOM to find the `.content-body slot`
3. Extracts slotted content from light DOM

### Reference Pages (`/references/*`)
1. Finds `doc-amf-reference` custom element
2. Extracts content from `div.markdown-content` in light DOM

### Custom Elements Handled
- `doc-heading` - Headings with nested shadow DOM
- `doc-content-callout` - Tips, notes, warnings
- `dx-code-block` - Code snippets with syntax highlighting

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
