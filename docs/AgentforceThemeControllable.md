# AgentforceThemeControllable

## Overview

Protocol defining theme controllability requirements for dynamic color scheme management. This protocol enables theme managers to communicate their color scheme override behavior to the SDK's UI components, ensuring proper visual rendering and theme consistency across all interface elements.

## Declaration

```swift
protocol AgentforceThemeControllable
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `overrideColorSchemeWithSystem` | `Bool` | Indicates whether the theme manager allows system-based color scheme overrides. |