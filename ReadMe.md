# SF Dev Scraper

A Puppeteer-based scraper for extracting Salesforce developer documentation and converting it to Markdown. Available as both a batch scraping tool and an MCP server for AI agent integration.

## Features

- Extracts content from Salesforce developer docs (handles React/shadow DOM components)
- Supports both guide pages (`/guide/*`) and reference pages (`/references/*`)
- Converts HTML to clean Markdown using Turndown with GFM table support
- Automatically names output files based on the page's h1 heading
- Parallel processing for batch scraping (10 concurrent pages)
- **MCP Server** for integration with Cursor and other AI assistants

## Installation

```bash
npm install
```

## Usage

### Batch Scraping

Edit the `urls` array in `scraper.js` to include the pages you want to scrape:

```javascript
const urls = [
  'https://developer.salesforce.com/docs/einstein/genai/guide/get-started.html',
  'https://developer.salesforce.com/docs/einstein/genai/guide/get-started-agents.html',
  // Add more URLs here
];
```

Then run the scraper:

```bash
npm run scrape
```

Markdown files are saved to the `docs/` directory, named after the h1 heading on each page.

### MCP Server (for Cursor/AI Agents)

The MCP server exposes a `scrape_sf_docs` tool that can be used by AI assistants to fetch documentation on-demand.

#### Setup in Cursor

Add to your Cursor MCP configuration (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "sf-docs-scraper": {
      "command": "node",
      "args": ["/Users/robert.ullery/Workspace/SFDevScraper/mcp-server.js"]
    }
  }
}
```

#### Tool: `scrape_sf_docs`

**Input:**
- `url` (string, required): The Salesforce documentation URL to scrape

**Output:**
- Title, page type, and full markdown content

**Example:**
```
scrape_sf_docs({
  url: "https://developer.salesforce.com/docs/einstein/genai/guide/get-started.html"
})
```

## How It Works

The Salesforce developer docs use a React-based architecture with nested shadow DOM components. This scraper handles two page structures:

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

## Dependencies

- [Puppeteer](https://pptr.dev/) - Headless browser automation
- [Turndown](https://github.com/mixmark-io/turndown) - HTML to Markdown conversion
- [turndown-plugin-gfm](https://github.com/mixmark-io/turndown-plugin-gfm) - GFM table support
- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) - MCP server implementation

