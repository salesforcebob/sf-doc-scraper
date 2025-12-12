# Build a Headless Experience

This approach is for developers who want to build a completely custom UI or run agent interactions in the background. The `AgentforceService` handles the communication and state, emitting events via Kotlin Flows that your app uses to update its own UI or trigger logic.

## Instantiate AgentforceService

Use the `AgentforceServiceProvider` to create an `AgentforceService` instance for a specific agent.

```kotlin
import com.salesforce.android.agentforceservice.AgentforceServiceProvider
import com.salesforce.android.agentforceservice.AgentforceService

// Create the service provider with required dependencies
val serviceProvider = AgentforceServiceProvider(
    configurationLocale = Locale.getDefault(),
    domain = "https://your-domain.my.salesforce.com",
    network = MyAppNetwork(okHttpClient),
    credentialProvider = MyAppCredentialProvider(userSession),
    instrumentationHandler = myInstrumentationHandler, // Optional
    logger = myLogger // Optional
)

// Get the service for your specific agent
val agentId = "YOUR_AGENT_ID"
val agentforceService: AgentforceService = serviceProvider.getAgentforceService(agentId)
```

## Send Messages

To send a message to the agent programmatically, you can use a method like `sendUtterance` on your `AgentforceConversation` object:

```kotlin
// Example: Sending a message with an optional attachment
conversation.sendUtterance(
    utterance = "Hello, world!",
    attachment = null // or provide an AgentforceAttachment object
)
```

## Receive Messages

To receive messages from the agent, you can use the `conversationManager` property on the `AgentforceConversation` object:

```kotlin
// Example: Using conversationManager to send and receive messages
val responseChannel = conversation.conversationManager.sendMessage(
    inputRepresentation = ConversationInputRepresentation("Hello, world!"),
    agentforceAttachment = null, // Optional attachment
    file = null // Optional file
)
```

## Session Management

**\[INFORMATION NEEDED: How does session management work in the headless Android SDK?\]**

Based on the preserved content in temp-content.md, there are extensive examples of:

-   Session lifecycle management
-   Streaming response handling
-   Event processing
-   Error handling

These examples should be reviewed and incorporated from the temp-content.md file.

**\[INFORMATION NEEDED: What additional headless capabilities exist?\]**

-   What other methods are available on AgentforceService?
-   How do you handle different message types?
-   What about conversation state management?
-   How do you handle errors in headless mode?
-   What about conversation lifecycle management?

## Next Steps

-   **Customization**: See [Branding and Theming](/docs/einstein/genai/guide/agent-sdk-android-branding-theming.html) for visual customization