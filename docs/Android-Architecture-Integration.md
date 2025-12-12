# Android Architecture Integration

Technical reference for Android platform integration patterns and requirements.

## System Requirements

| Requirement | Version |
| --- | --- |
| Android API | 29+ (Android 10) |
| Kotlin | 1.9.22+ |
| Android Studio | Meerkat+ |
| Compose BOM | 2023.10.01+ |

## Architecture Patterns

| Pattern | Description |
| --- | --- |
| Service-Oriented Architecture | Clean separation of concerns with network and data layers |
| Coroutines Support | Async operations with proper lifecycle management |
| Jetpack Compose UI | Modern declarative UI components with Material Design |
| Material Design Integration | Consistent theming and styling with Android design system |

## Core Integration Points

Essential API signatures and patterns for Android integration.

### API Initialization

```kotlin
AgentforceAPI(
    network: NetworkProvider,
    credentialProvider: CredentialProvider
)
```

### Conversation Creation

```kotlin
AgentforceConversation(
    agentId: String,
    configuration: AgentforceConfiguration
)
```

### Compose UI Integration

```kotlin
@Composable
fun AgentforceChatView(
    conversation: AgentforceConversation,
    modifier: Modifier = Modifier
)
```

## Component Reference

Complete reference of Android components and services.

### UI Components

| Component | Type | Description |
| --- | --- | --- |
| [AgentforceComponent](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-component-android.html) | Composable | Base component system for UI rendering |
| [ChatResponseButton](/docs/einstein/genai/references/agentforce-mobile-sdk/chat-response-button-android.html) | Composable | Interactive response buttons |
| [RecordSelector](/docs/einstein/genai/references/agentforce-mobile-sdk/record-selector-android.html) | Composable | Salesforce record selection interface |

### Core Services

| Service | Purpose |
| --- | --- |
| [AgentforceAPI](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-api-android.html) | Network service layer for API communication |
| [AgentforceService](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-service-android.html) | Backend integration and business logic |
| [BotsAPI](/docs/einstein/genai/references/agentforce-mobile-sdk/bots-api-android.html) | Conversation API client for agent interactions |

## Related Documentation

-   [UI Components Implementation Guide](/docs/einstein/genai/guide/agentforce/agent-sdk/agent-sdk-ui-components.html) - Usage patterns and examples
-   [Android Integration Guidelines](/docs/einstein/genai/guide/agentforce/agent-sdk/agent-sdk-android.html) - Complete setup instructions
-   [Architecture Guide](/docs/einstein/genai/guide/agentforce/agent-sdk/agent-sdk-architecture.html) - Design patterns and concepts