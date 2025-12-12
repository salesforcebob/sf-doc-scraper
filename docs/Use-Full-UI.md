# Use Full UI

This guide shows you how to use the prebuilt UI components to quickly integrate Agentforce chat functionality into your Android app.

## AgentforceLauncherContainer

Use the `AgentforceLauncherContainer` Composable in your screen. It displays a Floating Action Button (FAB) that, when tapped, presents the full chat container.

```kotlin
import androidx.compose.runtime.Composable
import com.salesforce.android.agentforcesdk.ui.AgentforceLauncherContainer
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun MyScreen(viewModel: MyViewModel = viewModel()) {
    // ... Your existing screen content (e.g., inside a Scaffold)

    // Add the Agentforce Launcher
    AgentforceLauncherContainer(client = viewModel.agentforceClient)
}
```

## AgentforceConversationContainer

To display the chat UI, you can use the `AgentforceConversationContainer` Composable. This Composable provides the complete chat interface that you can integrate into your app.

First, create an `AgentforceConversation` object:

```kotlin
// Create the conversation object
val conversation = AgentforceConversation(
    configuration = configuration,
    conversationService = agentforceClient.conversationService
)
```

Then use the `AgentforceConversationContainer` Composable:

```kotlin
import androidx.compose.runtime.Composable
import com.salesforce.android.agentforcesdkimpl.AgentforceConversation

@Composable
fun MyChatScreen(conversation: AgentforceConversation, agentforceClient: AgentforceClient) {
    agentforceClient.AgentforceConversationContainer(
        conversation = conversation,
        onClose = {
            // Handle chat view close
        }
    )
}
```

The `AgentforceConversationContainer` Composable takes the following parameters:

-   `conversation`: The `AgentforceConversation` object that you created
-   `onClose`: A lambda that will be called when the user closes the chat view

## Handle UI Events

**\[INFORMATION NEEDED: How do UI events work in the Android SDK?\]**

Based on the iOS implementation, there should be equivalent delegate patterns or callback mechanisms for:

-   Modifying messages before sending
-   Handling sent messages
-   Managing agent switches
-   Error handling

**\[INFORMATION NEEDED: What other UI containers/presentation modes are available?\]**

-   Are there different UI presentation modes?
-   What launcher customization options exist?
-   How do different UI containers work?
-   What customization options are available for the prebuilt UI?

## Next Steps

-   **Headless**: See [Build a Headless Experience](/docs/einstein/genai/guide/agent-sdk-android-headless.html) for custom UI
-   **Customization**: See [Branding and Theming](/docs/einstein/genai/guide/agent-sdk-android-branding-theming.html) for visual customization