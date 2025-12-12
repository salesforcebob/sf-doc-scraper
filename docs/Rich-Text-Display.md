# Rich Text Display

Android Compose components for rich text rendering in Agentforce conversations.

## SalesforceRichText

`@Composable fun SalesforceRichText`

Shows a static label with the styled text from the provided HTML string.

### Signature

```kotlin
@Composable
fun SalesforceRichText(
    modifier: Modifier = Modifier,
    text: String,
    customMovementMethod: MovementMethod = LinkMovementMethod.getInstance()
)
```

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| modifier | Modifier | Modifier to be applied to the component |
| text | String | HTML string to display |
| customMovementMethod | MovementMethod | Movement method for text interaction |

## AgentforceRichText

`@Composable fun AgentforceRichText`

Displays rich text content. Intended to be displayed in the content area of the chat response.

### Signatures

```kotlin
@Composable
fun AgentforceRichText(
    view: AgentforceComponent
)

@Composable
fun AgentforceRichText(
    text: String,
    isContentSafe: Boolean? = true,
    padding: Dp = dimensionResource(id = R.dimen.slds_spacing_small),
    locator: String = "copilot_richtext_content",
    isPartialMessage: Boolean = false
)
```

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| view | AgentforceComponent | Component view to display |
| text | String | Text content to display |
| isContentSafe | Boolean? | Whether the content is safe to display (default: true) |
| padding | Dp | Padding around the content |
| locator | String | Locator identifier for testing (default: "copilot\_richtext\_content") |
| isPartialMessage | Boolean | Whether this is a partial message (default: false) |

## AgentforceMarkdownRichText

`@Composable fun AgentforceMarkdownRichText`

Markdown UI for view provider mapped to ES type.

### Signatures

```kotlin
@Composable
fun AgentforceMarkdownRichText(
    view: AgentforceComponent
)

@Composable
fun AgentforceMarkdownRichText(
    text: String,
    isContentSafe: Boolean? = true,
    padding: Dp = dimensionResource(id = R.dimen.slds_spacing_small),
    maxLines: Int = Int.MAX_VALUE,
    locator: String = "copilot_markdown_content",
    isPartialMessage: Boolean = false
)
```

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| view | AgentforceComponent | Component view to display |
| text | String | Markdown text content to display |
| isContentSafe | Boolean? | Whether the content is safe to display (default: true) |
| padding | Dp | Padding around the content |
| maxLines | Int | Maximum number of lines to display (default: Int.MAX\_VALUE) |
| locator | String | Locator identifier for testing (default: "copilot\_markdown\_content") |
| isPartialMessage | Boolean | Whether this is a partial message (default: false) |

## Related Documentation

-   [AgentforceThemeManager](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-manager-android.html)
-   [AgentforceColors](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-colors-android.html)
-   [AgentforceTypography](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-typography-android.html)