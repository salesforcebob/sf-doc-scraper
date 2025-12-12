# Android Error Handling Overview

Error handling classes and patterns for the Agentforce Android SDK.

## Error Classes

-   **[AgentforceSDKError](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-sdk-error-android.html)** - SDK error types and exceptions

## Error Types

The Android SDK provides specific error types for different failure scenarios:

-   **NoAgentConfigured** - When no agent is properly configured
-   **UnableToStartASession** - When session initialization fails

## Usage Patterns

Error handling in the Android SDK follows standard Java exception patterns:

```kotlin
try {
    val client = AgentforceClient()
    // SDK operations
} catch (error: AgentforceSDKError) {
    when (error) {
        is AgentforceSDKError.NoAgentConfigured -> {
            // Handle configuration error
        }
        is AgentforceSDKError.UnableToStartASession -> {
            // Handle session error
        }
    }
}
```

## Related Documentation

-   [AgentforceClient](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-client-android.html) - Main client class that may throw errors
-   [AgentforceConversation](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-android.html) - Conversation management with error handling