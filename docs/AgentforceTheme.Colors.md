# AgentforceTheme.Colors

## Overview

Color palette protocol for Agentforce SDK theming. This protocol defines the comprehensive color system used throughout the Agentforce SDK, providing semantic color tokens for consistent theming across all UI components.

## Declaration

```swift
protocol Colors
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `accent1` | `Color` | Fill color for text and icons on buttons and interactive elements |
| `accent2` | `Color` | Fill color for text and icons on buttons and interactive elements |
| `accent3` | `Color` | Fill color for text and icons on buttons and interactive elements |
| `accent4` | `Color` | Agentforce Specific tokens |
| `accent5` | `Color` | Agentforce Specific tokens |
| `accentContainer1` | `Color` | Fill color for branded component containers |
| `border1` | `Color` | Border color for components that are decorative or divider lines between content |
| `border2` | `Color` | Border color for components that are functional or interactive |
| `borderDisabled1` | `Color` | Border color for disabled containers |
| `borderError1` | `Color` | Border color for error containers |
| `borderInverse2` | `Color` | Border color for components that are functional or interactive on a dark background |
| `borderSuccess1` | `Color` | Border color for success containers |
| `brandBase50` | `Color` | Primary brand color |
| `disabledContainer1` | `Color` | Background of disabled component containers for white components |
| `disabledContainer2` | `Color` | Background of disabled component containers for dark components |
| `error1` | `Color` | Fill color for text and icons displaying an error |
| `errorBase50` | `Color` | Error brand color |
| `errorContainer1` | `Color` | Background of error component containers |
| `feedbackWarning1` | `Color` | Warning text color |
| `feedbackWarningContainer1` | `Color` | Warning container background |
| `info1` | `Color` | Information text color |
| `infoContainer1` | `Color` | Information container background |
| `onAccent1` | `Color` | Text and icon fill color displayed in accent containers |
| `onDisabled1` | `Color` | Fill color for text and icons displayed on top of disabledContainer1 |
| `onDisabled2` | `Color` | Fill color for text and icons displayed on top of disabledContainer2 |
| `onError1` | `Color` | Fill color for text and icons displayed on top of an error container |
| `onSuccess1` | `Color` | Fill color for text and icons displayed on top of a success container |
| `onSurface1` | `Color` | Lightest text or icon fill |
| `onSurface2` | `Color` | Darker text or icon fill |
| `onSurface3` | `Color` | Additional text or icon variant |
| `successContainer1` | `Color` | Background of success component containers |
| `surface1` | `Color` | View background color |
| `surface2` | `Color` | View background color |
| `surfaceContainer1` | `Color` | Default background color for component containers |
| `surfaceContainer2` | `Color` | Darker background color for component containers |
| `surfaceContainer3` | `Color` | Darkest background color for component containers |
| `backgroundColor` ⚠️ | `Color` | **Deprecated:** This property will be retired in a future release. Switch to a styling hook or use your own custom color. |
| `foregroundColor` ⚠️ | `Color` | **Deprecated:** This property will be retired in a future release. Switch to a styling hook or use your own custom color. |