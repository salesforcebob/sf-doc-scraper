# DefaultAgentforceTheme

`object DefaultAgentforceTheme : BaseUiTheme`

Default AgentforceTheme that serves as the base theme for Agentforce components. This theme can be used directly by the SDK or as a starting point for host apps to create customized themes.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `colors` | `Colors` | Default light mode colors |
| `darkColors` | `Colors` | Default dark mode colors |
| `dimensions` | `Dimensions` | Default dimensions |
| `shadows` | `Shadows` | Default shadows |
| `shapes` | `Shapes` | Default shapes |
| `typography` | `Typography` | Default typography |

## Functions

The following functions are available on DefaultAgentforceTheme:

### copy

```kotlin
fun copy(
    colors: Colors = this.colors,
    darkColors: Colors = this.darkColors,
    shapes: Shapes = this.shapes,
    dimensions: Dimensions = this.dimensions,
    typography: Typography = this.typography,
    shadows: Shadows = this.shadows
): BaseUiTheme
```

Creates a copy of this theme with optional parameter overrides. This allows host apps to customize specific aspects of the theme without having to recreate the entire theme from scratch.

## Usage

```kotlin
val customTheme = DefaultAgentforceTheme.copy(
    colors = DefaultAgentforceTheme.colors.copy(
        accentContainer1 = Color.Blue
    )
)
```

## Related Documentation

-   [Colors](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-colors-android.html)
-   [Typography](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-typography-android.html)