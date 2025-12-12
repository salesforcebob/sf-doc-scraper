# RecordSelectorGroup

`@Composable fun RecordSelectorGroup`

Base component for Record Selector as part of a Copilot Chat Response

## Function

```kotlin
@Composable
fun RecordSelectorGroup(
    records: List,
    enabled: Boolean,
    selectedRecordId: String,
    updateSelectedRecord: (String) -> Unit
)
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `records` | `List<RecordSelectorItemData>` | records to show for selection |
| `enabled` | `Boolean` | if true, this will be enabled |
| `selectedRecordId` | `String` | Currently selected record id |
| `updateSelectedRecord` | `(String) -> Unit` | Callback invoked when a record is selected |

## RecordSelectorItemData

`data class RecordSelectorItemData : RadioButtonItemState`

### Constructor

```kotlin
constructor(
    id: String,
    objectLabel: String? = null,
    titleText: String? = null,
    objectIconUrl: String? = null,
    objectThemeColor: String = "#FF0176D3"
)
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| `id` | `String` | Record identifier |
| `objectIconUrl` | `String?` | URL for object icon |
| `objectLabel` | `String?` | Object type label |
| `objectThemeColor` | `String` | Theme color for object |
| `title` | `String` | Title (from RadioButtonItemState) |
| `titleText` | `String?` | Display title text |

## Related Documentation

-   [CheckboxRadioComponents](/docs/einstein/genai/references/agentforce-mobile-sdk/checkbox-radio-components-android.html)
-   [AgentforceComponent](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-component-android.html)
-   [ChatResponseButton](/docs/einstein/genai/references/agentforce-mobile-sdk/chat-response-button-android.html)