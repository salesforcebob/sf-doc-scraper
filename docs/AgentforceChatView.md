# AgentforceChatView

## Overview

Type alias providing a more intuitive name for the main chat interface component. `AgentforceChatView` is the primary SwiftUI view for displaying and interacting with Agentforce conversations. It provides a complete chat interface including message history, input controls, voice interaction, and rich content rendering capabilities.

## Declaration

```swift
typealias AgentforceChatView = ConversationUIContainer
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `body` | `some View` | The main view content of the chat interface |
| `alternateTitle` | `String?` | Optional custom title to display in the conversation header |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `updateSession(session:)` | `func updateSession(session: AgentConversation) throws` | Updates the conversation session with a new session instance |
| `sendUtterance(_:)` ⚠️ | `func sendUtterance(_ utterance: String)` ⚠️ | **Deprecated:** Messages should be sent using [AgentforceConversation.sendUtterance](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-ios.html#sendutterance) |
| `resetChat()` ⚠️ | `func resetChat()` ⚠️ | **Deprecated:** The chat should be cleared using [AgentforceConversation.reset](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-ios.html#reset) |
| View Implementations | `View-Implementations` | Default SwiftUI view implementations |