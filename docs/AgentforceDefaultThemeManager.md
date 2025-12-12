# AgentforceDefaultThemeManager

## Overview

Default implementation of the Agentforce theme management system with built-in Salesforce design tokens. `AgentforceDefaultThemeManager` provides a complete theming solution that handles light/dark mode switching, dynamic font sizing, and comprehensive visual customization using Salesforce's Cosmos design system. It serves as both a production-ready theme manager and a reference implementation for custom theme development.

## Declaration

```swift
class AgentforceDefaultThemeManager
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `colorScheme` | `ColorScheme` | Current color scheme applied to UI components |
| `colors` | `AgentforceTheme.Colors` | Active color palette automatically selected based on current color scheme |
| `dimensions` | `AgentforceTheme.Dimensions` | Spacing, sizing, and layout measurements from Salesforce Cosmos design system |
| `dynamicFonts` | `Bool` | Controls whether fonts use dynamic sizing based on accessibility preferences |
| `fonts` | `AgentforceTheme.Fonts` | Active font system automatically selected based on dynamic font preferences |
| `overrideColorSchemeWithSystem` | `Bool` | Determines whether UI components should respect system-wide color scheme preferences |
| `shapes` | `AgentforceTheme.Shapes` | Border radius, corner styles, and geometric properties from Salesforce Cosmos design system |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `init(themeMode:dynamicFonts:)` | `init(themeMode: AgentforceThemeMode, dynamicFonts: Bool)` | Creates a new theme manager with specified appearance and accessibility preferences |

## Usage Patterns

### Basic Configuration

```swift
let themeManager = AgentforceDefaultThemeManager(
    themeMode: .system,
    dynamicFonts: true
)
```

### Custom Theme Mode

```swift
let darkThemeManager = AgentforceDefaultThemeManager(
    themeMode: .dark,
    dynamicFonts: false
)
```