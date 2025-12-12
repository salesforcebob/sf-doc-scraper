# ConversationUIContainer

## Overview

The main conversation interface container for the Agentforce SDK. A SwiftUI view that provides a complete conversational AI interface with message display, user input, voice interaction, and multi-modal content.

## Declaration

```swift
@MainActor struct ConversationUIContainer
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `body` | `some View` | The main view content (inherited from View) |
| `alternateTitle` | `String?` | Optional custom title to display in the conversation header |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `updateSession(session:)` | `func updateSession(session: AgentConversation) throws` | Updates the conversation session with a new session instance |
| `sendUtterance(_:)` ⚠️ | `func sendUtterance(_ utterance: String)` ⚠️ | **Deprecated:** Messages should be sent using [AgentforceConversation.sendUtterance](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-ios.html#sendutterance) |
| `resetChat()` ⚠️ | `func resetChat()` ⚠️ | **Deprecated:** The chat should be cleared using [AgentforceConversation.reset](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-ios.html#reset) |
| _Inherited from View_ | _All View protocol methods_ | Inherits all standard SwiftUI View methods and modifiers. See [View (_Apple Developer_)](https://developer.apple.com/documentation/swiftui/view) |

## Integration Patterns

### Modal Presentation

```swift
.sheet(isPresented: $showConversation) {
    ConversationUIContainer(
        viewModel: conversationViewModel,
        flagProvider: featureFlags,
        onClose: { showConversation = false }
    )
}
```

### Navigation Integration

```swift
NavigationView {
    ConversationUIContainer(
        viewModel: conversationViewModel,
        flagProvider: featureFlags,
        onClose: { navigationController.popViewController() }
    )
}
```

### Full-Screen Presentation

```swift
.fullScreenCover(isPresented: $showFullScreen) {
    ConversationUIContainer(
        viewModel: conversationViewModel,
        flagProvider: featureFlags,
        onClose: { showFullScreen = false }
    )
}
```