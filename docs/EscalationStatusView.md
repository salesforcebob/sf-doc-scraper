# EscalationStatusView

## Overview

A SwiftUI view for displaying escalation status and queue information. Provides visual feedback about the current state of human agent escalation, including queue position, wait times, and agent assignment status.

## Declaration

```swift
@MainActor struct EscalationStatusView
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `body` | `some View` | The main view content (inherited from View) |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `init(escalation:showQueueDetails:isCompact:onAction:)` | `init(escalation: EscalationStatusMessage, showQueueDetails: Bool = true, isCompact: Bool = false, onAction: ((EscalationAction) -> Void)? = nil)` | Creates an escalation status view with the specified configuration |
| _Inherited from View_ | _All View protocol methods_ | Inherits all standard SwiftUI View methods and modifiers. See [View (_Apple Developer_)](https://developer.apple.com/documentation/swiftui/view) |

## Usage Examples

### Basic Escalation Status

```swift
EscalationStatusView(
    escalation: escalationMessage,
    showQueueDetails: true
)
```

### Compact Status Indicator

```swift
EscalationStatusView(
    escalation: escalationMessage,
    showQueueDetails: false,
    isCompact: true
)
```