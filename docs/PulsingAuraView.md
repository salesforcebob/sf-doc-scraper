# PulsingAuraView

## Overview

A SwiftUI view that displays pulsing aura animations in Agentforce conversations. Provides visual feedback through pulsing animations, typically used to indicate active processing, connection status, or attention-grabbing moments in the conversation flow.

## Declaration

```swift
@MainActor struct PulsingAuraView
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `body` | `some View` | Inherited from View.body |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `init` | `init(background:circleContent:imageName:auraColors:auraPulseSize:audioProvider:audioSensitivity:)` | Creates a pulsing aura view with the specified configuration |

## Initializer Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `background` | `Color` | `.black` | Background color of the aura |
| `circleContent` | `Color` | `.black` | Color of the circle content |
| `imageName` | `String?` | `nil` | Optional image name to display |
| `auraColors` | `[Color]` | `[.orange, .yellow, .red.opacity(0.8), .orange.opacity(0.6)]` | Array of colors for the aura effect |
| `auraPulseSize` | `CGFloat` | `1.5` | Size multiplier for the pulse effect |
| `audioProvider` | `any AudioDataProvider` | \- | Audio data provider for reactive animations |
| `audioSensitivity` | `CGFloat` | `2.0` | Sensitivity level for audio-reactive animations |