# AgentforceInstrumentationEvent

`interface AgentforceInstrumentationEvent`

Base interface for all instrumentation events in the Agentforce SDK.

## Properties

| Property | Signature | Description |
| --- | --- | --- |
| `eventInfo` | `abstract val eventInfo: EventInfo` | Event information and metadata |

## Nested Types

The following types implement `AgentforceInstrumentationEvent`:

| Type | Signature |
| --- | --- |
| `AgentforceBootstrapEvent` | `data class AgentforceBootstrapEvent(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceCardLoadEvent` | `data class AgentforceCardLoadEvent(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceEngagementEvent` | `data class AgentforceEngagementEvent(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceErrorReceived` | `data class AgentforceErrorReceived(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceESTypeDecompose` | `data class AgentforceESTypeDecompose(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceFetchAgents` | `data class AgentforceFetchAgents(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceFetchObjectInfo` | `data class AgentforceFetchObjectInfo(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceFetchRecords` | `data class AgentforceFetchRecords(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceInput` | `data class AgentforceInput(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceInteractionEvent` | `data class AgentforceInteractionEvent(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceListViewLoad` | `data class AgentforceListViewLoad(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceMultiAgentEvent` | `data class AgentforceMultiAgentEvent(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceMultiModalEvent` | `data class AgentforceMultiModalEvent(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforcePlannerBotResponse` | `data class AgentforcePlannerBotResponse(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceResetChat` | `data class AgentforceResetChat(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceResponseReceived` | `data class AgentforceResponseReceived(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceSwitchAgentEvent` | `data class AgentforceSwitchAgentEvent(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceTypeError` | `data class AgentforceTypeError(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentforceValidationFailureEvent` | `data class AgentforceValidationFailureEvent(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `AgentVoiceResponseTime` | `data class AgentVoiceResponseTime(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |
| `TimeToStartVoiceChatRoom` | `data class TimeToStartVoiceChatRoom(val eventInfo: EventInfo) : AgentforceInstrumentationEvent` |

## Related Documentation

-   [AgentforceMessage](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-message-android.html)
-   [AgentforceInstrumentationHandler](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-instrumentation-handler-android.html)
-   [AgentforceConversation](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-android.html)
-   [AgentforceClient](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-client-android.html)