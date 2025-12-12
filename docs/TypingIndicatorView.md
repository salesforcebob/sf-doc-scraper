# TypingIndicatorView

## Overview

A SwiftUI view that displays animated typing indicators for participants in a conversation. Provides visual feedback when participants are actively typing, enhancing the conversational experience with real-time activity indicators.

## Declaration

```swift
@MainActor
struct TypingIndicatorView: View
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| body | some View | Inherited from View.body |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| init | init(typingIndicators: \[String : TypingIndicatorMessage\], themeManager: AgentforceThemeManager, showParticipantNames: Bool = true) | Creates a typing indicator view with the specified configuration |

## Usage Examples

```swift
// Basic typing indicator
TypingIndicatorView(
    typingIndicators: activeTypingIndicators,
    animationStyle: .dots
)

// Customized styling
TypingIndicatorView(
    typingIndicators: activeTypingIndicators,
    animationStyle: .pulse,
    showParticipantNames: true,
    backgroundColor: .gray.opacity(0.1)
)
```