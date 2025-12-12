# ChatResponseButton

`@Composable fun ChatResponseButton`

Displays the Button in Chat Response component.

## Signature

```kotlin
@Composable
fun ChatResponseButton(
    modifier: Modifier = Modifier,
    label: String,
    checkedLabel: String? = null,
    enabled: Boolean = true,
    checked: Boolean = false,
    primaryAction: Boolean = false,
    background: Long? = LocalAgentforceTheme.current.colors().surface1.value.toLong(),
    textColor: Long? = LocalAgentforceTheme.current.colors().accent1.value.toLong(),
    onClick: () -> Unit = {}
)
```

## Related Documentation

-   [AgentforceComponent](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-component-android.html) - Base component system
-   [AgentforceTheme](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-manager-android.html) - Theme management
-   [AgentforceAPI](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-api-android.html) - Backend response handling