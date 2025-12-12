# Agentforce Mobile SDK Reference Overview

Technical reference for the Agentforce Mobile SDK APIs and components across iOS and Android platforms.

## Platform Support

| Platform | UI Framework | Min Version | Distribution |
| --- | --- | --- | --- |
| iOS | SwiftUI | iOS 17+ | CocoaPods |
| Android | Jetpack Compose | API 29+ | AAR |

## Core Components

The Agentforce Mobile SDK includes the following core components across both platforms:

### Primary Classes

| Class | iOS | Android | Description |
| --- | --- | --- | --- |
| [AgentforceClient](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-client-ios.html) | ✅ | ✅ | SDK entry point and orchestrator |
| [AgentforceConversation](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-ios.html) | ✅ | ✅ | Conversation session management |

### UI Components

#### iOS Components

| Component | Description |
| --- | --- |
| [AgentforceChatView](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-chat-view-ios.html) | Full conversational interface |
| [AgentforceCard](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-card-ios.html) | Compact conversation summary |
| [AgentforceLauncher](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-launcher-ios.html) | Floating launcher interface |
| [ConversationUIContainer](/docs/einstein/genai/references/agentforce-mobile-sdk/conversation-ui-container-ios.html) | Container view for embedding conversation UI |

#### Android Components

| Component | Description |
| --- | --- |
| [AgentforceComponent](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-component-android.html) | Base UI component system |
| [ChatResponseButton](/docs/einstein/genai/references/agentforce-mobile-sdk/chat-response-button-android.html) | Interactive response elements |
| [RecordSelector](/docs/einstein/genai/references/agentforce-mobile-sdk/record-selector-android.html) | Salesforce record selection |

### Services & Protocols

#### iOS Protocols

| Protocol | Description |
| --- | --- |
| [AgentConversation](/docs/einstein/genai/references/agentforce-mobile-sdk/agent-conversation-ios.html) | Core conversation interface |
| [AgentforceDataProviding](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-data-providing-ios.html) | Data access abstraction |

#### Android Services

| Service | Description |
| --- | --- |
| [AgentforceAPI](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-api-android.html) | Network service layer |
| [AgentforceService](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-service-android.html) | Backend integration interface |
| [BotsAPI](/docs/einstein/genai/references/agentforce-mobile-sdk/bots-api-android.html) | Conversation API client |

### Enumerations

| Enumeration | iOS | Android | Description |
| --- | --- | --- | --- |
| [AgentforceConversationState](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-state-ios.html) | ✅ | ✅ | Conversation lifecycle states |
| [AgentforceAccessMode](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-access-mode-ios.html) | ✅ | ✅ | Permission and context modes |

### Error Handling

| Component | iOS | Android | Description |
| --- | --- | --- | --- |
| [AgentforceSDKError](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-sdk-error-ios.html) | ✅ | ✅ | SDK error taxonomy |
| [AgentforceDataProviderErrors](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-data-provider-errors-ios.html) | ✅ | ❌ | Data provider errors (iOS only) |

## Platform-Specific Development

### iOS Development

-   [iOS Architecture Integration](/docs/einstein/genai/references/agentforce-mobile-sdk/architecture-integration-ios.html)
-   [iOS UI Components](/docs/einstein/genai/references/agentforce-mobile-sdk/ui-components-ios.html)
-   [iOS Development](/docs/einstein/genai/references/agentforce-mobile-sdk/development-ios.html)
-   [iOS Typography](/docs/einstein/genai/references/agentforce-mobile-sdk/typography-and-fonts-ios.html)

### Android Development

-   [Android Architecture Integration](/docs/einstein/genai/references/agentforce-mobile-sdk/architecture-integration-android.html)
-   [Android UI Components](/docs/einstein/genai/references/agentforce-mobile-sdk/ui-components-android.html)
-   [Android Development](/docs/einstein/genai/references/agentforce-mobile-sdk/development-android.html)
-   [Android Typography](/docs/einstein/genai/references/agentforce-mobile-sdk/typography-and-fonts-android.html)

## Related Documentation

-   [Agentforce Mobile SDK Developer Guide](/docs/einstein/genai/guide/agentforce/agent-sdk/) - Implementation guides and patterns
-   [iOS Integration Guidelines](/docs/einstein/genai/guide/agentforce/agent-sdk/agent-sdk-ios.html) - iOS platform setup
-   [Android Integration Guidelines](/docs/einstein/genai/guide/agentforce/agent-sdk/agent-sdk-android.html) - Android platform setup