# AgentforceThemeCreator

`object AgentforceThemeCreator`

Factory class for creating and customizing Agentforce themes (BaseUiTheme). This provides a public API for host apps to access default themes and create customized variations.

## Functions

### getDefaultTheme()

```kotlin
fun getDefaultTheme(): BaseUiTheme
```

Gets the default Agentforce theme. This theme provides a complete set of design tokens based on Agentforce Default design system.

**Return**: The default AgentforceTheme

### createCustomTheme(colors, darkColors, shapes, dimensions, typography, shadows)

```kotlin
fun createCustomTheme(
    colors: Colors? = null,
    darkColors: Colors? = null,
    shapes: Shapes? = null,
    dimensions: Dimensions? = null,
    typography: Typography? = null,
    shadows: Shadows? = null
): BaseUiTheme
```

Creates a customized theme based on the default theme. This allows host apps to modify specific aspects without recreating the entire theme.

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `colors` | `Colors?` | Custom colors (optional) |
| `darkColors` | `Colors?` | Custom dark mode colors (optional) |
| `shapes` | `Shapes?` | Custom shapes (optional) |
| `dimensions` | `Dimensions?` | Custom dimensions (optional) |
| `typography` | `Typography?` | Custom typography (optional) |
| `shadows` | `Shadows?` | Custom shadows (optional) |

**Return**: A new BaseUiTheme with the specified customizations

## Related Documentation

-   [AgentforceColors](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-colors-android.html)
-   [Typography](/docs/einstein/genai/references/agentforce-mobile-sdk/typography-android.html)
-   [AgentforceTypography](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-typography-android.html)