# ParticipantStatusView

## Overview

A SwiftUI view for displaying participant status indicators in conversations. Provides visual feedback about conversation participants, including join/leave notifications, online status, and role identification.

## Declaration

```swift
@MainActor struct ParticipantStatusView
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `body` | `some View` | Inherited from View.body |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `init` | `init(participant:action:showAnimation:isCompact:showRole:showTimestamp:themeManager:onInteraction:)` | Creates a participant status view with the specified configuration |

## Initializer Parameters

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `participant` | `ParticipantMessage` | \- | The participant information to display |
| `action` | `ParticipantAction` | `.status` | The action being displayed |
| `showAnimation` | `Bool` | `false` | Whether to show entry/exit animations |
| `isCompact` | `Bool` | `false` | Whether to use compact presentation |
| `showRole` | `Bool` | `true` | Whether to show role information |
| `showTimestamp` | `Bool` | `false` | Whether to show timestamp |
| `themeManager` | `AgentforceThemeManager` | \- | Theme management interface |
| `onInteraction` | `((ParticipantInteraction) -> Void)?` | `nil` | Optional callback for participant interactions |

## Usage Examples

```swift
// Join notification
ParticipantStatusView(
    participant: joinedParticipant,
    action: .joined,
    showAnimation: true
)

// Compact status indicator
ParticipantStatusView(
    participant: activeParticipant,
    action: .status,
    isCompact: true,
    showRole: true
)
```