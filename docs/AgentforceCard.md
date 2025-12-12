# AgentforceCard

## Overview

A SwiftUI view that displays Agentforce conversation content in a compact, card-style interface. The `AgentforceCard` provides a condensed view of AI conversation content, designed for integration into dashboards, summary screens, or any interface where space is constrained. It intelligently manages content display with expandable/collapsible functionality for longer responses.

## Declaration

```swift
@MainActor
struct AgentforceCard
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `body` | `some View` | The main view content of the card |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| View Implementations | `View-Implementations` | Default SwiftUI view implementations |

## Example Usage

```swift
// Basic integration in a dashboard
VStack {
    HeaderView()
    AgentforceCard(
        viewModel: conversationViewModel,
        launchChatView: {
            presentFullConversation()
        }
    )
    OtherDashboardContent()
}

// In a scrollable interface
ScrollView {
    LazyVStack {
        ForEach(cardData) { data in
            AgentforceCard(
                viewModel: data.viewModel,
                launchChatView: {
                    navigateToConversation(data.id)
                }
            )
        }
    }
}
```