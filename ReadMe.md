# SF Docs MCP Server

[![npm version](https://img.shields.io/npm/v/@salesforcebob/sf-docs-mcp-server.svg)](https://www.npmjs.com/package/@salesforcebob/sf-docs-mcp-server)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP Server](https://img.shields.io/badge/MCP-Server-blue.svg)](https://modelcontextprotocol.io/)

An MCP (Model Context Protocol) server for scraping Salesforce developer documentation and converting it to Markdown. Integrates with Cursor, Claude Desktop, and other MCP-compatible AI assistants. Deploy locally or to Heroku with one click.

---

## What You Get

- 🔍 **Smart page analysis** - Automatically detects optimal extraction strategy for any Salesforce doc page
- 🕸️ **Shadow DOM traversal** - Handles React components and deeply nested shadow DOMs
- 📄 **Multiple page types** - Supports guide, reference, API reference, type definitions, and landing pages
- 🎯 **Dynamic selectors** - Fall back to custom selectors when automatic extraction fails
- 📝 **Clean Markdown output** - Converts HTML to GFM-compatible Markdown with tables
- 🚀 **Heroku ready** - One-click deploy for remote/hosted access

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Install](#install)
- [Run via npx](#run-via-npx)
- [Using with Cursor](#using-with-cursor)
- [Using with Claude Desktop](#using-with-claude-desktop)
- [Running Remotely (Heroku)](#running-remotely-heroku)
- [Available Tools](#available-tools)
- [Things You Can Ask](#things-you-can-ask)
- [How It Works](#how-it-works)
- [Agent Usage Guide](#agent-usage-guide)
- [Batch Scraping](#batch-scraping-optional)
- [Troubleshooting](#troubleshooting)
- [Dependencies](#dependencies)
- [Disclaimer](#disclaimer)
- [License](#license)

---

## Prerequisites

- Node.js >= 18.0.0
- Chrome/Chromium (installed automatically by Puppeteer)

## Install

```bash
npm install -g @salesforcebob/sf-docs-mcp-server
```

Or use directly with npx (no installation required):

```bash
npx @salesforcebob/sf-docs-mcp-server
```

## Run via npx

```bash
npx @salesforcebob/sf-docs-mcp-server
```

This starts an MCP stdio server. Use it with MCP-compatible clients like Cursor or Claude Desktop.

---

## Using with Cursor

1. Open Cursor settings → MCP/Servers
2. Add a new stdio server:

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

Or add to your Cursor MCP configuration file (`~/.cursor/mcp.json`).

3. Save and reload tools. You should see:
   - `scrape_sf_docs`
   - `analyze_page_structure`

## Using with Claude Desktop

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

---

## Running Remotely (Heroku)

This server includes an Express HTTP transport for remote deployment.

### One-Click Deploy to Heroku

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/salesforcebob/sf-doc-scraper)

After clicking Deploy:
1. Choose an app name
2. Deploy the app
3. Verify endpoints:
   - `GET /health` → `{ ok: true }`
   - `GET /docs` → Documentation JSON
   - `POST /mcp` → MCP HTTP endpoint

### Local HTTP (for testing)

```bash
npm run serve
# or
npx @salesforcebob/sf-docs-mcp-server serve
```

Endpoints:
- `GET http://localhost:3000/health` → Health check
- `GET http://localhost:3000/docs` → Documentation
- `POST http://localhost:3000/mcp` → MCP HTTP endpoint

### Using with HTTP-capable MCP Clients

Point your client at `<your-app-url>/mcp` as the MCP HTTP endpoint.

---

## Available Tools

### `scrape_sf_docs`

Scrape a Salesforce documentation page and return the content as Markdown.

**Input:**
- `url` (string, required): The Salesforce documentation URL to scrape
- `selector` (string, optional): CSS selector for content container (light DOM only)
- `shadowPath` (string[], optional): Array of selectors to traverse shadow DOM boundaries

**Examples:**

```json
// Basic usage (automatic detection)
{
  "url": "https://developer.salesforce.com/docs/einstein/genai/guide/get-started.html"
}

// With shadow path for nested shadow DOM
{
  "url": "https://developer.salesforce.com/docs/commerce/einstein-api/references/einstein-profile-connector?meta=type:ClientIdParam",
  "shadowPath": ["doc-amf-reference", "doc-amf-topic", "api-type-documentation"]
}
```

### `analyze_page_structure`

Analyze the DOM structure of a Salesforce documentation page to determine the best extraction approach. **Use this first when the default scraper fails or returns empty content.**

**Input:**
- `url` (string, required): The Salesforce documentation URL to analyze

**Output:**
- Detected page type
- List of custom elements found
- Elements with shadow DOM
- Content containers with suggested selectors/shadow paths
- Suggested extraction approach
- DOM tree snapshot for debugging

---

## Things You Can Ask

Here are examples of what you can ask your AI assistant:

- "Get the Agentforce getting started documentation"
- "Scrape the Models API reference page"
- "Extract the GraphQL Send Query endpoint documentation"
- "Analyze the page structure of this Commerce Cloud API page"
- "Get all the type definitions from the Einstein Profile Connector API"
- "Show me the Agent Script language reference"

**Quick JSON examples:**

Scrape a guide page:
```json
{
  "tool": "scrape_sf_docs",
  "input": {
    "url": "https://developer.salesforce.com/docs/einstein/genai/guide/agent-script.html"
  }
}
```

Analyze a failing page:
```json
{
  "tool": "analyze_page_structure",
  "input": {
    "url": "https://developer.salesforce.com/docs/commerce/einstein-api/references/einstein-profile-connector?meta=type:CookieIdParam"
  }
}
```

---

## How It Works

The Salesforce developer docs use a React-based architecture with nested shadow DOM components. This server handles multiple page structures:

### Supported Page Types

| Type | URL Pattern | Description |
|------|-------------|-------------|
| `guide` | `/guide/*` | Guide/tutorial pages |
| `reference` | `/references/*` with markdown | Reference pages with markdown content |
| `api-reference` | `/references/*?meta=Summary` | API summary pages |
| `api-type` | `/references/*?meta=type:*` | Type definition pages |
| `api-method` | `/references/*?meta=*` | Method/endpoint pages |
| `overview` | Landing pages | Overview/landing pages |

### Custom Elements Handled

- `doc-heading` - Headings with nested shadow DOM
- `doc-content-callout` - Tips, notes, warnings
- `dx-code-block` - Code snippets with syntax highlighting
- `api-summary` - API overview pages
- `api-type-documentation` - Type definition pages
- `api-method-documentation` - Method/endpoint pages
- `dx-group-text` - Landing page content

---

## Agent Usage Guide

For detailed instructions on how AI agents should use these tools, see [AGENT_GUIDE.md](./AGENT_GUIDE.md).

---

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

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Empty content with `pageType: "fallback"` | Use `analyze_page_structure` to find the right extraction method |
| Shadow path not working | Check the DOM snapshot for the correct element names |
| Content looks incomplete | Try a different `shadowPath` or `selector` |
| "Could not find element" error | The shadow path is incorrect - re-analyze the page |
| Puppeteer/Chrome issues | Ensure Chrome is installed or set `PUPPETEER_EXECUTABLE_PATH` |

---

## Dependencies

- [Puppeteer](https://pptr.dev/) - Headless browser automation
- [Turndown](https://github.com/mixmark-io/turndown) - HTML to Markdown conversion
- [turndown-plugin-gfm](https://github.com/mixmark-io/turndown-plugin-gfm) - GFM table support
- [Express](https://expressjs.com/) - HTTP server for remote deployment
- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) - MCP server implementation

---

## Disclaimer

- This repository and MCP server are provided "as is" without warranties or guarantees of any kind, express or implied, including but not limited to functionality, security, merchantability, or fitness for a particular purpose.
- **Use at your own risk.** Review the source, perform a security assessment, and harden before any production deployment.
- Do not expose the HTTP endpoints publicly without proper authentication/authorization, rate limiting, logging, and monitoring.
- This tool scrapes publicly available Salesforce documentation. Ensure your usage complies with Salesforce's terms of service.
- You are solely responsible for the protection of your data and compliance with your organization's security policies.

---

## License

MIT
