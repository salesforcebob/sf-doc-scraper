# AgentforceService

`interface AgentforceService`

High-level service interface providing comprehensive Agentforce backend integration and conversation orchestration for Android applications.

## Signature

```kotlin
interface AgentforceService
```

## Description

Interface for managing Agentforce conversations, voice interactions, and file uploads.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| agentId | String | Agent identifier for conversations |

## Functions

| Function | Signature | Description |
| --- | --- | --- |
| cancelCurrentStreaming | `open fun cancelCurrentStreaming()` | Cancel current streaming operation |
| endAgentforceVoice | `open suspend fun endAgentforceVoice(sessionId: String)` | End realtime voice conversation for the given session. This method disconnects the LiveKit room and cleans up resources |
| muteMicrophone | `open suspend fun muteMicrophone(sessionId: String, mute: Boolean)` | Mute or unmute the microphone for the current voice session. This method controls the LiveKit room microphone state |
| sendMessageAndStartStreaming | `open suspend fun sendMessageAndStartStreaming(sessionId: String, inputRepresentation: StreamingRequest): ReceiveChannel<AgentforceResponse>` | Send message and start streaming response |
| setAgentforceVoiceDelegate | `open fun setAgentforceVoiceDelegate(delegate: AgentforceVoiceDelegate?)` | Set the delegate for voice callbacks |
| startAgentforceVoice | `open suspend fun startAgentforceVoice(sessionId: String)` | Start realtime voice conversation for the given session. This method handles the join API call and LiveKit room connection internally |
| startSession | `open suspend fun startSession(streamingCapabilities: StreamingCapabilities? = null): StartSessionResponse` | Start a new conversation session |
| submitFeedback | `open suspend fun submitFeedback(feedbackInput: CopilotFeedbackInput): Boolean` | Submit feedback for the conversation |
| uploadFiles | `open suspend fun uploadFiles(sessionId: String?, file: File?, fileName: String, mimeType: String?): MutableList<UploadResponse>?` | Upload files for the conversation |

## Implementation

The primary implementation is provided by `AgentforceServiceImpl`:

```kotlin
class AgentforceServiceImpl(
    val network: Network,
    val domain: String? = null,
    val sse: AgentforceServerSentEvents,
    credentialProvider: AgentforceAuthCredentialProvider,
    agentforceLogger: Logger?,
    agentforceInstrumentationHandler: AgentforceInstrumentationHandler?,
    configurationLocale: Locale?,
    var agentforceConnectionInfo: AgentforceConnectionInfo?,
    var agentId: String,
    context: Context? = null,
    orgId: String? = null
) : AgentforceService
```

## Constructor Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| network | Network | Network interface for API communication |
| domain | String? | Salesforce org domain override |
| sse | AgentforceServerSentEvents | Real-time event streaming service |
| credentialProvider | AgentforceAuthCredentialProvider | Authentication credential management |
| agentforceLogger | Logger? | Logging interface implementation |
| agentforceInstrumentationHandler | AgentforceInstrumentationHandler? | Analytics and monitoring integration |
| configurationLocale | Locale? | Internationalization configuration |
| agentforceConnectionInfo | AgentforceConnectionInfo? | Connection metadata and session information |
| agentId | String | Default agent identifier for conversations |
| context | Context? | Android application context |
| orgId | String? | Organization identifier |

## Inheritors

-   `AgentforceServiceImpl` - Primary implementation
-   `MIAWCoreSDKService` - Core SDK service implementation
-   `MIAWAPIAgentforceService` - MIAW API service implementation

## Related Documentation

-   [AgentforceClient](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-client-android.html) - Client interface
-   [AgentforceConfiguration](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-configuration-android.html) - Configuration management
-   [AgentforceAuthCredentialProvider](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-auth-credential-provider-android.html) - Authentication management