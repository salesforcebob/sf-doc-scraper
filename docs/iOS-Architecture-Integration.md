# iOS Architecture Integration

Technical reference for iOS platform integration patterns and requirements.

## System Requirements

| Requirement | Version |
| --- | --- |
| iOS | 17.0+ |
| Xcode | 16.0+ |
| Swift | 5.0+ |
| Dependencies | SalesforceMobileSDK |

## Core Integration Points

Essential API signatures and patterns for iOS integration.

### Client Initialization

```swift
AgentforceClient(
    credentialProvider: AgentforceAuthCredentialProviding,
    agentforceConfiguration: AgentforceConfiguration
)
```

### Conversation Management

```swift
client.startAgentforceConversation(
    forAgentId: String,
    sessionId: String?
) -> AgentConversation
```

### UI Component Creation

```swift
client.createAgentforceChatView(
    conversation: AgentConversation,
    delegate: AgentforceUIDelegate?,
    onContainerClose: () -> Void
) -> AgentforceChatView
```

## Component Reference

Complete reference of iOS components and protocols.

### UI Components

| Component | Type | Description |
| --- | --- | --- |
| [AgentforceChatView](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-chat-view-ios.html) | SwiftUI View | Full conversational interface |
| [AgentforceCard](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-card-ios.html) | SwiftUI View | Compact conversation summary |
| [AgentforceLauncher](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-launcher-ios.html) | SwiftUI View | Floating launcher interface |
| [ConversationUIContainer](/docs/einstein/genai/references/agentforce-mobile-sdk/conversation-ui-container-ios.html) | SwiftUI View | Container for embedding conversation UI |

### Core Protocols

| Protocol | Purpose |
| --- | --- |
| [AgentConversation](/docs/einstein/genai/references/agentforce-mobile-sdk/agent-conversation-ios.html) | Conversation interface and state management |
| [AgentforceDataProviding](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-data-providing-ios.html) | Data access abstraction |
| [Typography & Fonts](/docs/einstein/genai/references/agentforce-mobile-sdk/typography-and-fonts-ios.html) | Typography customization (only supported theming) |

## Related Documentation

-   [UI Components Implementation Guide](/docs/einstein/genai/guide/agentforce/agent-sdk/agent-sdk-ui-components.html) - Usage patterns and examples
-   [iOS Integration Guidelines](/docs/einstein/genai/guide/agentforce/agent-sdk/agent-sdk-ios.html) - Complete setup instructions
-   [Architecture Guide](/docs/einstein/genai/guide/agentforce/agent-sdk/agent-sdk-architecture.html) - Design patterns and concepts