# AgentforcePageContext

`struct AgentforcePageContext`

Represents the current page context within a Salesforce application.

## Overview

This structure encapsulates information about the user's current location and context within the application, enabling the Agentforce SDK to provide contextually relevant responses and suggestions.

## Declaration

```swift
struct AgentforcePageContext
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| actionName | String? | The current action being performed on the page |
| appName | String? | The name of the current Salesforce application |
| objectApiName | String | The API name of the current Salesforce object |
| pageName | String? | The name of the current page, if applicable |
| pageType | String? | The type of page currently being displayed |
| recordId | String? | The unique identifier of the current record, if viewing a specific record |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| init | `init(appName:objectApiName:attributes:)` | Creates a new page context with the specified app and object information |

## Example Usage

```swift
// Object home page context
let objectContext = AgentforcePageContext(
    appName: "Sales Cloud",
    objectApiName: "Account"
)

// Record page context
let recordContext = AgentforcePageContext(
    appName: "Sales Cloud",
    objectApiName: "Account",
    attributes: [
        "recordId": "0018c00003K5dXbAAJ",
        "actionName": "view"
    ]
)
```