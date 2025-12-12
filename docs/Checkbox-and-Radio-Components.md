# Checkbox and Radio Components

Android Compose components for selection and input in Agentforce conversations.

## SalesforceCheckBox

`@Composable fun SalesforceCheckBox`

Base class for Checkbox. Shows checkbox with label

```kotlin
@Composable
fun SalesforceCheckBox(
    modifier: Modifier = Modifier,
    label: String = "",
    onCheckedChange: (Boolean) -> Unit
)
```

## RadioButton

`@Composable fun RadioButton`

A unified radio button component that can be used across different implementations

```kotlin
@Composable
fun RadioButton(
    selected: Boolean,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    onClick: () -> Unit,
    selectedColor: Color = LocalAgentforceTheme.current.colors().accent1,
    unselectedColor: Color = LocalAgentforceTheme.current.colors().surfaceContainer3,
    offsetX: Dp = DEFAULT_RADIO_ICON_OFFSET_X,
    offsetY: Dp = DEFAULT_RADIO_ICON_OFFSET_Y,
    rowPadding: Dp = DEFAULT_ROW_PADDING,
    contentStartPadding: Dp = DEFAULT_CONTENT_START_PADDING,
    itemContent: @Composable ColumnScope.() -> Unit
)
```

## SimpleRadioButton

`@Composable fun SimpleRadioButton`

A simplified radio button with just text content

```kotlin
@Composable
fun SimpleRadioButton(
    modifier: Modifier = Modifier,
    state: RadioButtonItemState,
    selected: Boolean,
    enabled: Boolean = true,
    onClick: () -> Unit,
    selectedColor: Color = LocalAgentforceTheme.current.colors().accent1,
    unselectedColor: Color = LocalAgentforceTheme.current.colors().surfaceContainer3,
    fontWeight: FontWeight = FontWeight.Normal,
    textColor: Color = if (enabled) {
        LocalAgentforceTheme.current.colors().onSurface1
    } else {
        LocalAgentforceTheme.current.colors().surfaceContainer3
    },
    offsetX: Dp = DEFAULT_RADIO_ICON_OFFSET_X,
    offsetY: Dp = DEFAULT_RADIO_ICON_OFFSET_Y,
    rowPadding: Dp = DEFAULT_ROW_PADDING,
    contentStartPadding: Dp = DEFAULT_CONTENT_START_PADDING
)
```

## Related Documentation

-   [AgentforceThemeManager](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-manager-android.html)
-   [AgentforceColors](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-colors-android.html)
-   [AgentforceConversation](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-android.html)