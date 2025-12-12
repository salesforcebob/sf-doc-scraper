# AgentforceObjectRepresentation

`struct AgentforceObjectRepresentation`

Represents metadata and structure information for Salesforce objects within the Agentforce SDK.

## Overview

This structure provides comprehensive information about Salesforce object types, including their labels, field definitions, theme information, and relationship data. It serves as the foundation for displaying object-related UI components and understanding data structure.

## Declaration

```swift
struct AgentforceObjectRepresentation
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| objectType | String | The API name of the Salesforce object |
| label | String | The singular, human-readable label for the object |
| labelPlural | String | The plural, human-readable label for the object |
| fields | \[String: Field\]? | A dictionary of field definitions keyed by field API name |
| nameFields | \[String\]? | An array of field API names that comprise the object's display name |
| theme | AgentforceThemeRepresentation | Visual theme information for the object |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| init | `init(objectType:label:labelPlural:fields:nameFields:theme:)` | Creates a new object representation |

## Example Usage

```swift
// Create object representation for Account
let accountObject = AgentforceObjectRepresentation(
    objectType: "Account",
    label: "Account",
    labelPlural: "Accounts",
    fields: accountFields,
    nameFields: ["Name"],
    theme: AgentforceThemeRepresentation(
        iconUrl: "https://example.com/account-icon.png",
        iconColor: "#1B96FF"
    )
)

// Use in UI components
ObjectSelectorView(objects: [accountObject, contactObject])
```