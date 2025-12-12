# AgentforceAPI

`class AgentforceAPI`

Network service layer providing comprehensive API access to Agentforce backend services and conversation management.

## Constructor

```kotlin
class AgentforceAPI(
    network: Network,
    domain: String? = null,
    sse: AgentforceServerSentEvents,
    credentialProvider: AgentforceAuthCredentialProvider,
    instrumentationHandler: AgentforceInstrumentationHandler? = null,
    configurationLocale: Locale? = null,
    agentforceLogger: Logger? = null,
    agentId: String? = null,
    ioDispatcher: CoroutineDispatcher = Dispatchers.IO
)
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| network | Network | Network interface for HTTP operations |
| domain | String? | Optional Salesforce domain override |
| sse | AgentforceServerSentEvents | Server-Sent Events implementation |
| credentialProvider | AgentforceAuthCredentialProvider | Authentication credential management |
| instrumentationHandler | AgentforceInstrumentationHandler? | Analytics and performance monitoring |
| configurationLocale | Locale? | Localization configuration |
| agentforceLogger | Logger? | Logging interface implementation |
| agentId | String? | Default agent identifier |
| ioDispatcher | CoroutineDispatcher | Coroutine dispatcher for background operations |

## Overview

`AgentforceAPI` serves as the primary interface for network communication with Agentforce backend services. It handles authentication, request/response processing, real-time event streaming, and error management in a coroutine-friendly architecture.

## Core Capabilities

Essential capabilities of the AgentforceAPI for network communication and conversation management.

### Conversation Management

-   Start and manage agent conversation sessions
-   Send user messages and receive agent responses
-   Handle conversation state transitions
-   Support for conversation persistence and restoration

### Real-Time Communication

-   Server-Sent Events (SSE) for live message streaming
-   Connection management and automatic reconnection
-   Event filtering and processing
-   WebSocket fallback support

### Authentication Integration

-   OAuth 2.0 token management
-   Automatic token refresh
-   Org JWT support for service accounts
-   Secure credential storage and retrieval

## Usage Patterns

Common patterns for initializing and using the AgentforceAPI.

### Basic API Setup

```kotlin
val networkProvider = MyNetworkImplementation()
val credentialProvider = MyCredentialProvider()
val sseService = AgentforceServerSentEvents()
val logger = MyLoggerImplementation()

val agentforceAPI = AgentforceAPI(
    network = networkProvider,
    domain = "https://my-org.salesforce.com",
    sse = sseService,
    credentialProvider = credentialProvider,
    agentforceLogger = logger,
    agentId = "default-agent-id"
)
```

### Starting a Conversation

```kotlin
class ConversationRepository(private val api: AgentforceAPI) {

    suspend fun startConversation(
        agentId: String,
        sessionId: String? = null
    ): Result {
        return try {
            val response = api.createConversation(
                agentId = agentId,
                sessionId = sessionId
            )
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
```

### Sending Messages

```kotlin
suspend fun sendMessage(
    conversationId: String,
    message: String,
    metadata: Map = emptyMap()
): Result {
    return try {
        val messageRequest = MessageRequest(
            text = message,
            conversationId = conversationId,
            metadata = metadata
        )

        val response = api.sendMessage(messageRequest)
        Result.success(response)
    } catch (e: Exception) {
        Result.failure(e)
    }
}
```

### Real-Time Event Streaming

```kotlin
class ConversationEventHandler(private val api: AgentforceAPI) {

    fun observeConversationEvents(conversationId: String): Flow {
        return api.subscribeToConversationEvents(conversationId)
            .catch { exception ->
                // Handle connection errors
                handleStreamingError(exception)
            }
            .filterIsInstance()
    }

    private suspend fun handleStreamingError(exception: Throwable) {
        when (exception) {
            is NetworkException -> {
                // Attempt reconnection
                retryConnection()
            }
            is AuthenticationException -> {
                // Refresh credentials
                refreshAuthentication()
            }
        }
    }
}
```

## Error Handling

Comprehensive error handling patterns for network and API failures.

### Network Error Management

```kotlin
class ApiErrorHandler {

    suspend fun  safeApiCall(
        apiCall: suspend () -> T
    ): Result {
        return try {
            Result.success(apiCall())
        } catch (e: HttpException) {
            when (e.code()) {
                401 -> Result.failure(AuthenticationException("Token expired"))
                403 -> Result.failure(AuthorizationException("Insufficient permissions"))
                429 -> Result.failure(RateLimitException("Too many requests"))
                else -> Result.failure(NetworkException("API call failed: ${e.message}"))
            }
        } catch (e: IOException) {
            Result.failure(NetworkException("Network connection failed"))
        }
    }
}
```

### Retry Logic

```kotlin
class RetryableApiClient(private val api: AgentforceAPI) {

    suspend fun  executeWithRetry(
        maxRetries: Int = 3,
        backoffMs: Long = 1000,
        operation: suspend () -> T
    ): T {
        repeat(maxRetries) { attempt ->
            try {
                return operation()
            } catch (e: Exception) {
                if (attempt == maxRetries - 1) throw e

                val delayMs = backoffMs * (2.0.pow(attempt.toDouble())).toLong()
                delay(delayMs)
            }
        }
        throw IllegalStateException("Retry logic failed")
    }
}
```

## Authentication Integration

Integration patterns for authentication and credential management.

### Credential Provider Implementation

```kotlin
class MyCredentialProvider : AgentforceAuthCredentialProvider {

    override suspend fun getAuthCredential(): AgentforceAuthCredential {
        return when (val authType = determineAuthType()) {
            AuthType.OAUTH -> {
                AgentforceAuthCredential.OAuth(
                    authToken = getOAuthToken(),
                    orgId = getOrgId(),
                    userId = getUserId()
                )
            }
            AuthType.ORG_JWT -> {
                AgentforceAuthCredential.OrgJWT(
                    orgJWT = getOrgJWT()
                )
            }
        }
    }

    override suspend fun refreshCredential(): AgentforceAuthCredential {
        // Handle token refresh logic
        return getAuthCredential()
    }
}
```

### Token Management

```kotlin
class TokenManager(private val api: AgentforceAPI) {

    private var currentToken: String? = null
    private var tokenExpiry: Long = 0

    suspend fun getValidToken(): String {
        if (isTokenExpired()) {
            refreshToken()
        }
        return currentToken ?: throw AuthenticationException("No valid token")
    }

    private fun isTokenExpired(): Boolean {
        return System.currentTimeMillis() >= tokenExpiry
    }

    private suspend fun refreshToken() {
        val credential = api.credentialProvider.refreshCredential()
        currentToken = credential.token
        tokenExpiry = System.currentTimeMillis() + TOKEN_REFRESH_BUFFER
    }
}
```

## Server-Sent Events

Real-time event streaming capabilities for live conversation updates.

### Event Stream Management

```kotlin
class ConversationEventStream(private val api: AgentforceAPI) {

    fun observeEvents(conversationId: String): Flow {
        return api.sse.connect(
            endpoint = "/conversations/$conversationId/events",
            headers = mapOf(
                "Authorization" to "Bearer ${api.getAuthToken()}",
                "Accept" to "text/event-stream"
            )
        ).map { sseEvent ->
            parseAgentforceEvent(sseEvent)
        }
    }

    private fun parseAgentforceEvent(sseEvent: SSEEvent): AgentforceEvent {
        return when (sseEvent.type) {
            "message" -> AgentforceMessageEvent.fromJson(sseEvent.data)
            "typing" -> AgentforceTypingEvent.fromJson(sseEvent.data)
            "error" -> AgentforceErrorEvent.fromJson(sseEvent.data)
            else -> AgentforceUnknownEvent(sseEvent.data)
        }
    }
}
```

## Instrumentation and Logging

Monitoring and logging capabilities for API performance and debugging.

### Performance Monitoring

```kotlin
class ApiInstrumentation : AgentforceInstrumentationHandler {

    override fun onRequestStarted(request: ApiRequest) {
        recordEvent("api_request_started") {
            put("endpoint", request.endpoint)
            put("method", request.method)
            put("timestamp", System.currentTimeMillis())
        }
    }

    override fun onRequestCompleted(
        request: ApiRequest,
        response: ApiResponse,
        durationMs: Long
    ) {
        recordEvent("api_request_completed") {
            put("endpoint", request.endpoint)
            put("status_code", response.statusCode)
            put("duration_ms", durationMs)
            put("success", response.isSuccessful)
        }
    }

    override fun onRequestFailed(request: ApiRequest, error: Throwable) {
        recordEvent("api_request_failed") {
            put("endpoint", request.endpoint)
            put("error_type", error::class.simpleName)
            put("error_message", error.message)
        }
    }
}
```

## Dependency Integration

Integration patterns for external dependencies and service providers.

### Network Provider Interface

```kotlin
interface Network {
    suspend fun execute(request: NetworkRequest): NetworkResponse
    suspend fun executeStream(request: StreamRequest): Flow
}

class MyNetworkProvider : Network {
    private val httpClient = OkHttpClient.Builder()
        .addInterceptor(AuthenticationInterceptor())
        .addInterceptor(LoggingInterceptor())
        .build()

    override suspend fun execute(request: NetworkRequest): NetworkResponse {
        // Implement HTTP request execution
        return executeHttpRequest(request)
    }

    override suspend fun executeStream(request: StreamRequest): Flow {
        // Implement SSE streaming
        return executeSSERequest(request)
    }
}
```

## Configuration Options

Advanced configuration options for API customization and localization.

For detailed configuration examples including locale and dispatcher configuration, see the [Android SDK Developer Guide](/docs/einstein/genai/guide/agentforce/agent-sdk/agent-sdk-android.html#advanced-configuration-patterns).

## See Also

-   [AgentforceService](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-service-android.html) - High-level service interface
-   [BotsAPI](/docs/einstein/genai/references/agentforce-mobile-sdk/bots-api-android.html) - Specialized conversation API client
-   [AgentforceComponent](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-component-android.html) - UI component system integration