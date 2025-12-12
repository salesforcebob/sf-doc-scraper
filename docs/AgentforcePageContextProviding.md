# AgentforcePageContextProviding

`protocol AgentforcePageContextProviding`

Protocol for providing page context information to the Agentforce SDK.

## Overview

This protocol enables the SDK to understand the current application context, including which Salesforce object, record, or page the user is viewing. This context information is crucial for providing relevant AI responses, suggesting appropriate actions, and maintaining conversation relevance.

## Declaration

```swift
protocol AgentforcePageContextProviding
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| pageContext | AgentforcePageContext? | The current page context information |

## Example Implementation

```swift
class NavigationContextProvider: AgentforcePageContextProviding {
    var pageContext: AgentforcePageContext? {
        // Return context based on current navigation state
        guard let currentObject = navigationManager.currentObject else { return nil }
        return AgentforcePageContext(
            appName: "Sales Cloud",
            objectApiName: currentObject.apiName,
            attributes: [
                "recordId": navigationManager.currentRecordId,
                "pageType": navigationManager.currentPageType
            ]
        )
    }
}
```