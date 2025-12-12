# BotsAPI

`class BotsAPI`

Accesses the Bots API by sending user input and parsing the response.

## Signature

```kotlin
class BotsAPI(
    application: Application? = null,
    network: Network,
    logger: Logger? = null,
    instrumentationHandler: AgentforceInstrumentationHandler?
)
```

## Constructor

| Parameter | Type | Description |
| --- | --- | --- |
| application | Application? | Android application instance for context |
| network | Network | Network interface for API communication |
| logger | Logger? | Logging interface implementation |
| instrumentationHandler | AgentforceInstrumentationHandler? | Analytics and performance monitoring |

## Properties

| Property | Type | Description |
| --- | --- | --- |
| BOT\_ID | String | Bot identifier constant |
| SESSION\_ID | String | Session identifier constant |

## Functions

### buildNetworkRequest

```kotlin
@VisibleForTesting
fun buildNetworkRequest(
    conversationRepresentation: ConversationInputRepresentation,
    queryParams: Map = emptyMap()
): NetworkRequest
```

### getAgents

```kotlin
suspend fun getAgents(mockSettings: MutableStateFlow): AgentforceIdResponse
```

Retrieve the Bot id

### getFollowUpActions

```kotlin
suspend fun getFollowUpActions(
    followUpActionsListInputRepresentation: FollowUpActionsListInputRepresentation,
    mockSettings: MutableStateFlow? = null
): FollowUpActionsListRepresentation
```

### getRecommendedUtterances

```kotlin
suspend fun getRecommendedUtterances(
    sessionId: String? = null,
    mockSettings: MutableStateFlow? = null
): RecommendedUtterancesRepresentation
```

Get recommended utterances

### handleDecodeFailure

```kotlin
@VisibleForTesting
fun handleDecodeFailure(ex: Exception, message: String): Error
```

### handleNoDataFailure

```kotlin
@VisibleForTesting
fun handleNoDataFailure(message: String): Error
```

### logO11yFetchAgents

```kotlin
@VisibleForTesting
fun logO11yFetchAgents(startTime: Long, error: Throwable? = null)
```

Log O11Y\_FETCH\_AGENTS\_MARKER perf o11y.

### logO11yPlannerBot

```kotlin
@VisibleForTesting
fun logO11yPlannerBot(startTime: Long?, error: Throwable? = null)
```

### setAdditionalContext

```kotlin
suspend fun setAdditionalContext(
    botId: String,
    sessionId: String?,
    inputRepresentation: ConversationInputRepresentation
): Result
```

Sends additional context to the Bots API

**Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| botId | String | ID of the bot to request a response from |
| sessionId | String? | ID of the session that is being referenced by the input |
| inputRepresentation | ConversationInputRepresentation | ConversationInputRepresentation payload |

## Nested Types

### Companion

```kotlin
object Companion
```

Contains constants for BOT\_ID and SESSION\_ID.

## Related Documentation

-   [AgentforceAPI](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-api-android.html) - General API interface for Agentforce services
-   [AgentforceService](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-service-android.html) - High-level service integration
-   [AgentforceComponent](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-component-android.html) - UI component rendering system