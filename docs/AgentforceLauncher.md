# AgentforceLauncher

`struct AgentforceLauncher`

A SwiftUI view that provides a floating launcher interface for accessing the Agentforce conversation UI.

## Overview

The `AgentforceLauncher` serves as the primary entry point for users to interact with the Agentforce AI assistant. It displays as a persistent, floating interface element that shows conversation status and provides multiple ways to initiate or continue conversations.

## Declaration

```swift
@MainActor struct AgentforceLauncher
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| body | some View | The launcher's UI implementation |
| openTranscribing | (() -> Void)? | Callback to open the conversation with voice input active |
| openWithKeyboardClosed | (((() -> Void)?) -> Void)? | Callback to open the conversation without keyboard, optionally running completion |
| openWithKeyboardOpen | (() -> Void)? | Callback to open the conversation with keyboard input ready |

## Example Usage

```swift
// Create launcher with conversation view model
let launcher = AgentforceLauncher(
    viewModel: conversationViewModel,
    launchChatView: {
        presentConversationUI()
    }
)

// Embed in your app's main view
ZStack {
    MainAppContent()
    VStack {
        Spacer()
        HStack {
            Spacer()
            launcher
                .padding()
        }
    }
}
```