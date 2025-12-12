# AgentforceThemeManager

`interface AgentforceThemeManager`

Enhanced interface for managing Agentforce themes with direct access to theme properties. This allows usage like ThemeManager.colors(), ThemeManager.typography(), etc.

## Functions

### colors()

```kotlin
@Composable
abstract fun colors(): Colors
```

Gets the colors based on the theme configuration. Use this in @Composable functions.

### colors(isDarkMode)

```kotlin
abstract fun colors(isDarkMode: Boolean): Colors
```

Gets the colors for a specific theme mode (non-composable). Use this in non-composable functions where you know the desired theme.

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `isDarkMode` | `Boolean` | Whether to use dark theme colors |

### dimensions()

```kotlin
abstract fun dimensions(): Dimensions
```

Gets the dimensions configuration.

### getTheme()

```kotlin
@Composable
abstract fun getTheme(): AgentforceTheme
```

Gets the complete theme object for use with UiTheme composable.

### getTheme(isDarkMode)

```kotlin
abstract fun getTheme(isDarkMode: Boolean): AgentforceTheme
```

Gets the complete theme object for non-composable functions.

**Parameters**:

| Parameter | Type | Description |
| --- | --- | --- |
| `isDarkMode` | `Boolean` | Whether to use dark theme colors |

### shadows()

```kotlin
abstract fun shadows(): Shadows
```

Gets the shadows configuration.

### shapes()

```kotlin
abstract fun shapes(): Shapes
```

Gets the shapes configuration.

### typography()

```kotlin
abstract fun typography(): Typography
```

Gets the typography configuration.

## Related Documentation

-   [DefaultAgentforceTheme](/docs/einstein/genai/references/agentforce-mobile-sdk/default-agentforce-theme-android.html)
-   [AgentforceColors](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-colors-android.html)
-   [Typography](/docs/einstein/genai/references/agentforce-mobile-sdk/typography-android.html)
-   [AgentforceTypography](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-typography-android.html)