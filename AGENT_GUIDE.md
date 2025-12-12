# SF Docs MCP Server - Agent Usage Guide

This guide provides rules and best practices for AI agents using the SF Docs MCP Server tools to extract Salesforce documentation.

## Overview

The SF Docs MCP Server provides two tools:

| Tool | Purpose |
|------|---------|
| `analyze_page_structure` | Inspect a page's DOM structure to find the right extraction approach |
| `scrape_sf_docs` | Extract content as Markdown using default or custom selectors |

## Decision Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  User requests SF docs                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│         Call scrape_sf_docs with just the URL               │
│              (try default extraction first)                  │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
    ┌─────────────────┐             ┌─────────────────┐
    │  Content found  │             │ Empty/fallback  │
    │   (success!)    │             │    response     │
    └─────────────────┘             └─────────────────┘
                                              │
                                              ▼
                              ┌─────────────────────────────────┐
                              │  Call analyze_page_structure    │
                              │     to inspect the page         │
                              └─────────────────────────────────┘
                                              │
                                              ▼
                              ┌─────────────────────────────────┐
                              │  Review suggested approach:     │
                              │  - shadowPath for nested DOM    │
                              │  - selector for light DOM       │
                              └─────────────────────────────────┘
                                              │
                                              ▼
                              ┌─────────────────────────────────┐
                              │   Call scrape_sf_docs with      │
                              │   the suggested parameters      │
                              └─────────────────────────────────┘
```

## Rules

### Rule 1: Try Default Extraction First

Always attempt `scrape_sf_docs` with just the URL before using analysis or custom selectors.

```json
// ✅ DO: Start with default extraction
{
  "url": "https://developer.salesforce.com/docs/einstein/genai/guide/get-started.html"
}
```

**Why:** Most Salesforce doc pages (guide pages, standard reference pages) work with the built-in extraction logic. Only escalate to analysis if the response is empty or shows `pageType: "fallback"`.

### Rule 2: Analyze When Default Fails

If `scrape_sf_docs` returns:
- Empty markdown content
- `pageType: "fallback"` or `pageType: "unknown"`
- An error about content structure

Then call `analyze_page_structure` to understand the page's DOM:

```json
{
  "url": "https://developer.salesforce.com/docs/commerce/einstein-api/references/einstein-profile-connector?meta=type:ClientIdParam"
}
```

### Rule 3: Use the Suggested Approach

The analysis output includes a `Suggested Approach` section. Follow its recommendations:

**If method is `default`:**
- The page should work with default extraction
- If it's still failing, check if the page requires JavaScript interaction or login

**If method is `shadowPath`:**
- Use the provided `shadowPath` array in your next `scrape_sf_docs` call

```json
{
  "url": "...",
  "shadowPath": ["doc-amf-reference", "doc-amf-topic", "api-type-document"]
}
```

**If method is `selector`:**
- Use the provided `selector` string

```json
{
  "url": "...",
  "selector": ".markdown-content"
}
```

### Rule 4: Understand Page Types

Recognize these Salesforce documentation page types:

| Page Type | URL Pattern | Structure |
|-----------|-------------|-----------|
| `guide` | `/guide/*` | Shadow DOM slot pattern |
| `reference` | `/references/*` with `.markdown-content` | Light DOM |
| `api-reference` | `/references/*?meta=Summary` | Nested shadow DOM → api-summary |
| `api-type` | `/references/*?meta=type:*` | Nested shadow DOM → api-type-documentation |
| `api-method` | `/references/*?meta=*` (methods) | Nested shadow DOM → api-method-documentation |
| `api-documentation` | `/references/*?meta=*` (endpoints) | Nested shadow DOM → api-documentation |
| `overview` | Landing pages | dx-group-text, dx-features-list |

### Rule 5: Shadow Path Traversal

When using `shadowPath`, understand that:

1. Each element in the array represents a step into a shadow root
2. The tool finds each element and enters its `shadowRoot`
3. Order matters - follow the nesting hierarchy

**Common shadow paths for API reference pages:**

```json
// API Summary pages
["doc-amf-reference", "doc-amf-topic", "api-summary"]

// Type definition pages (e.g., ClientIdParam, CookieIdParam)
["doc-amf-reference", "doc-amf-topic", "api-type-documentation"]

// Method/endpoint pages (e.g., GraphQL Send Query)
["doc-amf-reference", "doc-amf-topic", "api-method-documentation"]

// General API documentation
["doc-amf-reference", "doc-amf-topic", "api-documentation"]
```

### Rule 6: Validate URL Domain

Only use these tools with valid Salesforce documentation URLs:
- `developer.salesforce.com/docs/*`
- `help.salesforce.com/*`

Other URLs will be rejected.

### Rule 7: Handle Errors Gracefully

If extraction fails even with custom selectors:

1. **Check the DOM snapshot** from `analyze_page_structure` for clues
2. **Try a different shadowPath** based on the custom elements found
3. **Report the issue** - the page may use an unsupported structure

### Rule 8: Batch Operations

When scraping multiple related pages (e.g., all types in an API):

1. Analyze one page first to determine the pattern
2. Use the same `shadowPath` for similar pages
3. The page structure is typically consistent within the same API reference

## Examples

### Example 1: Standard Guide Page

```
User: "Get me the docs for Agentforce getting started"

Agent:
1. Call scrape_sf_docs({ url: "https://developer.salesforce.com/docs/einstein/genai/guide/get-started.html" })
2. ✅ Returns content with pageType: "guide"
3. Present the markdown to the user
```

### Example 2: API Type Page (Complex)

```
User: "Get the ClientIdParam type documentation from Einstein Profile Connector"

Agent:
1. Call scrape_sf_docs({ url: "...?meta=type:ClientIdParam" })
2. ⚠️ Returns empty with pageType: "fallback"
3. Call analyze_page_structure({ url: "...?meta=type:ClientIdParam" })
4. Review output:
   - pageType: "api-type"
   - suggestedApproach: { method: "shadowPath", shadowPath: ["doc-amf-reference", "doc-amf-topic", "api-type-document"] }
5. Call scrape_sf_docs({ 
     url: "...?meta=type:ClientIdParam",
     shadowPath: ["doc-amf-reference", "doc-amf-topic", "api-type-documentation"]
   })
6. ✅ Returns content with pageType: "shadow-path"
7. Present the markdown to the user
```

### Example 3: Multiple Related Pages

```
User: "Get all the type definitions from the Einstein Profile Connector API"

Agent:
1. First, analyze one type page to get the pattern
2. Use the same shadowPath for all type pages:
   - ClientIdParam
   - ClientIpParam
   - CookieIdParam
   - etc.
3. Batch the scrape calls with the known shadowPath
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Empty content with `pageType: "fallback"` | Use `analyze_page_structure` to find the right extraction method |
| Shadow path not working | Check the DOM snapshot for the correct element names |
| Content looks incomplete | Try a different `shadowPath` or `selector` |
| "Could not find element" error | The shadow path is incorrect - re-analyze the page |
| Page requires login | These tools don't handle authentication - inform the user |

## Quick Reference

```javascript
// Default extraction
scrape_sf_docs({ url: "..." })

// With shadow path
scrape_sf_docs({ 
  url: "...",
  shadowPath: ["doc-amf-reference", "doc-amf-topic", "api-type-document"]
})

// With selector
scrape_sf_docs({
  url: "...",
  selector: ".markdown-content"
})

// Analyze page structure
analyze_page_structure({ url: "..." })
```

