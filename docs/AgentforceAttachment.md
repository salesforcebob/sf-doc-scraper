# AgentforceAttachment

`interface AgentforceAttachment`

Agentforce Attachment data classes

## Signature

```kotlin
interface AgentforceAttachment
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `attachmentData` | `AgentforceAttachment.AttachmentData` | Attachment data containing source URI and ID |
| `mimeType` | `String?` | MIME type of the attachment |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `attachmentType` | `fun attachmentType(): AgentforceAttachment.AgentforceAttachmentType` | Returns the type of attachment |

## Nested Types

### AttachmentData

```kotlin
data class AttachmentData(
    val sourceUri: Uri? = null,
    val sourceId: String? = null
)
```

### AgentforceAttachmentType

```kotlin
enum class AgentforceAttachmentType : Enum
```

**Entries:**

-   `Image`
-   `PDF`
-   `SalesforceFile`

## Implementations

| Class | Description |
| --- | --- |
| `Image` | Image attachment implementation |
| `PDF` | PDF attachment implementation |
| `SalesforceFile` | Salesforce file attachment implementation |

## Related Documentation

-   [AgentforceMessage](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-message-android.html)
-   [AgentforceConversation](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-android.html)