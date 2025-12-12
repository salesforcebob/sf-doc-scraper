# AgentforceClient

```kotlin
class AgentforceClient : AgentforceConversationManaging
```

Implementation of AgentforceClient. This will allow to start the Agentforce conversations and presents window.

## Constructors

-   `AgentforceClient()`

## Properties

| Property | Type | Mutability | Description |
| --- | --- | --- | --- |
| agentforceInstrumentationHandler | AgentforceInstrumentationHandler? | var | Analytics and performance monitoring handler |
| contextManager | AgentforceContextManager? | var | Context manager instance |
| conversationService | ConversationService | lateinit var | Conversation service instance |
| onboardingManager | AgentforceOnboardingManager | lateinit var | Onboarding manager instance |
| pageContext | StateFlow | val | Page context state flow |

## Functions

| Function | Signature | Description |
| --- | --- | --- |
| AgentforceCardContainer | `@Composable open override fun AgentforceCardContainer(Modifier, AgentforceConversation, AgentforceComponent): Unit` |  |
| AgentforceConversationContainer | `@Composable open override fun AgentforceConversationContainer(AgentforceConversation, Function0<Unit>): Unit` | Draws the Agentforce conversation container with a top bar |
| AgentforceConversationContainer | `@Composable open override fun AgentforceConversationContainer(AgentforceConversation, Boolean, Function0<Unit>): Unit` | Draws the Agentforce conversation container |
| AgentforceLauncherContainer | `@Composable open override fun AgentforceLauncherContainer(AgentforceConversation, Function0<Unit>): Unit` |  |
| AgentforceVoiceContainer | `@Composable fun AgentforceVoiceContainer(AgentforceConversation, Function0<Unit>): Unit` | Voice UI Container - A separate entry point for voice interaction |
| createAgentforceResponseCardManager | `open override fun createAgentforceResponseCardManager(AgentforceConversation, String?): AgentforceResponseCardManager` | Creates a multiturn card manager for the specified conversation |
| findAgentforceConversation | `fun findAgentforceConversation(String, String?): AgentforceConversation?` |  |
| getCurrentContextManager | `fun getCurrentContextManager(): AgentforceContextManager?` | Returns the current context manager instance |
| init | `fun init(CoroutineScope?, AgentforceAuthCredentialProvider?, AgentforceMode, Application): Unit` | Initialize the session by providing the required parameters |
| startAgentforceConversation | `open override fun startAgentforceConversation(String?, String?): AgentforceConversation` | Start a conversation with the Agentforce assistant |
| updatePageContext | `fun updatePageContext(AgentforcePageContext): Unit` |  |

## Inherited Functions

-   clone, equals, finalize, getClass, hashCode, notify, notifyAll, toString, wait, wait, wait