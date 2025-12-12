# AgentforceThemeRepresentation

## Overview

Represents visual theme information for Salesforce objects. This structure provides the visual styling information needed to consistently display objects throughout the Agentforce UI. It includes icon resources, color schemes, and fallback options for when primary resources are unavailable.

## Declaration

```swift
struct AgentforceThemeRepresentation
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `iconUrl` | `String?` | The URL for the object's icon image. |
| `iconColor` | `String` | The color associated with the object. |
| `fallbackImage` | `UIImage?` | A fallback image to use when the icon URL is unavailable. |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `init(iconUrl:iconColor:fallbackImage:)` | `init(iconUrl: String?, iconColor: String, fallbackImage: UIImage?)` | Creates a new theme representation. |

## Example Usage

```swift
// Standard object theme
let accountTheme = AgentforceThemeRepresentation(
    iconUrl: "https://salesforce.com/icons/standard/account.svg",
    iconColor: "#1B96FF"
)

// Custom object with fallback
let customTheme = AgentforceThemeRepresentation(
    iconUrl: nil, // Custom objects may not have icon URLs
    iconColor: "#FF6B35",
    fallbackImage: UIImage(named: "custom-object-icon")
)
```