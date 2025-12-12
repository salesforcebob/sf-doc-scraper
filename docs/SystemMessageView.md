# SystemMessageView

## Overview

A SwiftUI view for displaying system status messages in conversations. Provides a visually distinct way to show system-generated messages, notifications, and status updates that are separate from regular conversation messages.

## Declaration

```swift
@MainActor
struct SystemMessageView: View
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| body | some View | Inherited from View.body |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| init | init(message: SystemStatusMessage, style: SystemMessageStyle = .subtle, showTimestamp: Bool = false, isDismissible: Bool = false, onDismiss: ((String) -> Void)? = nil) | Creates a system message view with the specified configuration |

## Usage Examples

```swift
// Basic system message
SystemMessageView(
    message: systemStatusMessage,
    style: .subtle,
    showTimestamp: false
)

// Prominent message with timestamp
SystemMessageView(
    message: criticalSystemMessage,
    style: .badge,
    showTimestamp: true,
    onDismiss: { messageId in
        // Handle message dismissal
    }
)
```