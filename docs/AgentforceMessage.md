# AgentforceMessage

`@Serializable data class AgentforceMessage`

Data class representing a message in the Agentforce SDK with serialization support.

## Constructors

| Constructor | Signature |
| --- | --- |
| `AgentforceMessage` | `constructor(id: String, message: String? = null, text: String? = null, type: String, messageType: String? = null, feedbackId: String? = null, widget: String? = null, result: List<ResourceTypeMessage>? = null, confirm: List<ResourceTypeMessage>? = null, collect: List<CollectMessage>? = null, choices: List<ChoicesMessage>? = null, failureCode: String? = null, errors: List<String>? = null, isContentSafe: Boolean? = true, citedReferences: List<CitedReferences>? = null, lightningType: String? = null, isPartial: Boolean = false, value: String? = null, offset: Int = 0, timeStamp: Long = Date().time, language: String? = null, reason: String = "")` |

## Properties

| Property | Signature |
| --- | --- |
| `choices` | `val choices: List<ChoicesMessage>? = null` |
| `citedReferences` | `val citedReferences: List<CitedReferences>? = null` |
| `collect` | `val collect: List<CollectMessage>? = null` |
| `confirm` | `val confirm: List<ResourceTypeMessage>? = null` |
| `errors` | `val errors: List<String>? = null` |
| `failureCode` | `val failureCode: String? = null` |
| `feedbackId` | `val feedbackId: String? = null` |
| `id` | `val id: String` |
| `isContentSafe` | `val isContentSafe: Boolean? = true` |
| `isPartial` | `@Transient val isPartial: Boolean = false` |
| `language` | `val language: String? = null` |
| `lightningType` | `val lightningType: String? = null` |
| `message` | `var message: String?` |
| `messageType` | `val messageType: String? = null` |
| `offset` | `val offset: Int = 0` |
| `reason` | `val reason: String` |
| `result` | `val result: List<ResourceTypeMessage>? = null` |
| `text` | `val text: String? = null` |
| `timeStamp` | `val timeStamp: Long` |
| `type` | `val type: String` |
| `value` | `val value: String? = null` |
| `widget` | `val widget: String? = null` |

## Functions

| Function | Signature |
| --- | --- |
| `getComponents` | `fun getComponents(): List<AgentforceMessageValue>?` |
| `getMessageType` | `fun getMessageType(): MessageType?` |

## Related Documentation

-   [AgentforceAttachment](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-attachment-android.html)
-   [AgentforceConversation](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-android.html)