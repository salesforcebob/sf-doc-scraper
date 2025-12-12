# Branding and Theming

The Agentforce Android SDK provides comprehensive theming capabilities for customizing the visual appearance of all UI components.

## Theme System

The Agentforce Android SDK includes a sophisticated theming system built on top of Salesforce's design system. The theming system provides:

-   **Color Theming**: Complete color palette customization with semantic tokens
-   **Light/Dark Mode Support**: Automatic switching and explicit mode setting
-   **System Integration**: Adapts to Android system theme preferences
-   **Reactive Updates**: Composable state management for real-time theme changes

### Key Components

-   **AgentforceThemeManager**: Central theme management interface
-   **AgentforceColors**: Class for color palettes with semantic color tokens
-   **AgentforceDarkColors**: Dark mode color variants
-   **AgentforceThemeCreator**: Factory for creating theme objects
-   **DefaultAgentforceTheme**: Default theme object with Agentforce colors

## Color Tokens

The theming system provides comprehensive color tokens organized by purpose.

![Agentforce Mobile SDK Branding](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/agent-sdk/agentforce-mobile-sdk-ui.png)

### Surface Colors

-   `surface1`: Primary view background
-   `surface2`: Secondary view background
-   `surfaceContainer1`: Default container background (cards, modals)
-   `surfaceContainer2`: Darker container background
-   `surfaceContainer3`: Darkest container background

### Text and Icon Colors

-   `onSurface1`: Lightest text/icon fill (body text, labels)
-   `onSurface2`: Darker text/icon fill (headings, input fields)
-   `onSurface3`: Additional text/icon variant

### Accent Colors

-   `accent1`: Button icons and interactive elements
-   `accent2`: Links, hover states, primary actions
-   `accent3`: Selected states
-   `accentContainer1`: Branded button backgrounds
-   `onAccent1`: Text/icons on accent containers

### Feedback Colors

-   `error1`: Error text and icons
-   `errorContainer1`: Error alert backgrounds
-   `onError1`: Text on error containers
-   `borderError1`: Error button borders
-   `successContainer1`: Success alert backgrounds
-   `onSuccess1`: Success text and icons
-   `borderSuccess1`: Success button borders

### State Colors

-   `disabledContainer1`: Disabled white component backgrounds
-   `disabledContainer2`: Disabled dark component backgrounds
-   `onDisabled1`: Text on light disabled containers
-   `onDisabled2`: Text on dark disabled containers

### Brand Colors

-   `brandBase50`: Primary brand color
-   `errorBase50`: Error brand color
-   `feedbackWarning1`: Warning text color
-   `feedbackWarningContainer1`: Warning container background
-   `info1`: Information text color
-   `infoContainer1`: Information container background

## Implementation

The following sections show how to implement theming in your Android application.

### Default Theme Setup

```kotlin
import com.salesforce.android.agentforcesdkimpl.AgentforceThemeCreator
import com.salesforce.android.agentforcesdkimpl.DefaultAgentforceTheme

// Get default theme
val defaultTheme = AgentforceThemeCreator.getDefaultTheme()

// Use in configuration
val configuration = AgentforceConfiguration.builder(authCredentialProvider)
    .setSalesforceDomain("https://your-domain.my.salesforce.com")
    .setAgentId("YOUR_AGENT_ID")
    .setTheme(defaultTheme)
    .build()
```

### Customize Colors Using Copy Function

```kotlin
class YourApp : Application() {
    override fun onCreate() {
        super.onCreate()

        // Copy and modify default colors
        val myLightColors = AgentforceColors.copy(
            accent1 = Color(0xFF1E88E5),
            accent2 = Color(0xFF1976D2),
            accentContainer1 = Color(0xFFBBDEFB),
            surface1 = Color(0xFFFAFAFA)
        )

        val myDarkColors = AgentforceDarkColors.copy(
            accent1 = Color(0xFF64B5F6),
            accent2 = Color(0xFF42A5F5),
            accentContainer1 = Color(0xFF0D47A1),
            surface1 = Color(0xFF121212)
        )

        // Create theme manager with custom colors
        val themeManager = createCustomAgentforceThemeManager(
            lightColors = myLightColors,
            darkColors = myDarkColors,
            themeMode = AgentforceThemeMode.SYSTEM
        )

        AgentforcePlugin.initialize(
            context = this,
            themeManager = themeManager
        )
    }
}
```

### Complete Brand Customization

```kotlin
// Create completely custom colors
val customLightColors = AgentforceColors(
    // Surface colors
    surface1 = Color(0xFFFFFFFF),
    surface2 = Color(0xFFF5F5F5),
    surfaceContainer1 = Color(0xFFFFFFFF),
    surfaceContainer2 = Color(0xFFEEEEEE),
    surfaceContainer3 = Color(0xFFE0E0E0),

    // Text colors
    onSurface1 = Color(0xFF212121),
    onSurface2 = Color(0xFF424242),
    onSurface3 = Color(0xFF757575),

    // Accent colors
    accent1 = Color(0xFF2196F3),
    accent2 = Color(0xFF1976D2),
    accent3 = Color(0xFF0D47A1),
    accentContainer1 = Color(0xFFE3F2FD),
    onAccent1 = Color(0xFFFFFFFF),

    // Feedback colors
    error1 = Color(0xFFD32F2F),
    errorContainer1 = Color(0xFFFFEBEE),
    onError1 = Color(0xFFFFFFFF),
    borderError1 = Color(0xFFD32F2F),
    successContainer1 = Color(0xFFE8F5E8),
    onSuccess1 = Color(0xFF2E7D32),
    borderSuccess1 = Color(0xFF4CAF50),

    // State colors
    disabledContainer1 = Color(0xFFF5F5F5),
    disabledContainer2 = Color(0xFF424242),
    onDisabled1 = Color(0xFF9E9E9E),
    onDisabled2 = Color(0xFF616161),

    // Brand colors
    brandBase50 = Color(0xFF2196F3),
    errorBase50 = Color(0xFFD32F2F),
    feedbackWarning1 = Color(0xFFFF9800),
    feedbackWarningContainer1 = Color(0xFFFFF3E0),
    info1 = Color(0xFF2196F3),
    infoContainer1 = Color(0xFFE3F2FD)
)

val customDarkColors = AgentforceDarkColors(
    // Dark mode variants
    surface1 = Color(0xFF121212),
    surface2 = Color(0xFF1E1E1E),
    surfaceContainer1 = Color(0xFF2C2C2C),
    surfaceContainer2 = Color(0xFF3C3C3C),
    surfaceContainer3 = Color(0xFF4C4C4C),

    onSurface1 = Color(0xFFE0E0E0),
    onSurface2 = Color(0xFFB0B0B0),
    onSurface3 = Color(0xFF808080),

    accent1 = Color(0xFF64B5F6),
    accent2 = Color(0xFF42A5F5),
    accent3 = Color(0xFF1E88E5),
    accentContainer1 = Color(0xFF0D47A1),
    onAccent1 = Color(0xFF000000),

    // ... other dark colors
)

// Create custom theme
val customTheme = AgentforceThemeCreator.createCustomTheme(
    colors = customLightColors,
    darkColors = customDarkColors
)
```

### Feature Flag-Based Theming

```kotlin
class ThemingFeatureFlag {
    companion object {
        fun isCustomThemingEnabled(): Boolean {
            // Check your feature flag system
            return FeatureFlagManager.isEnabled("custom_theming")
        }
    }
}

// Conditional theme setup
val theme = if (ThemingFeatureFlag.isCustomThemingEnabled()) {
    AgentforceThemeCreator.createCustomTheme(
        colors = myLightColors,
        darkColors = myDarkColors
    )
} else {
    AgentforceThemeCreator.getDefaultTheme()
}
```

## Limitations

**Important**: Currently, only color theming is supported. Fonts, dimensions, and shapes are not yet implemented in the theming system.

## Best Practices

The following best practices ensure effective theming implementation.

1.  **Use Semantic Colors**: Always use semantic color tokens rather than hardcoded colors
2.  **Test Both Modes**: Ensure your custom colors work well in both light and dark modes
3.  **System Integration**: Use `AgentforceThemeMode.SYSTEM` to respect user preferences
4.  **Copy Function**: Use the `copy()` function to modify existing colors rather than creating from scratch
5.  **Accessibility**: Ensure sufficient color contrast for accessibility compliance
6.  **Feature Flags**: Use feature flags to gradually roll out custom theming

## Next Steps

-   **UI Components**: See [Android UI Components](/docs/einstein/genai/references/agentforce-mobile-sdk/ui-components-android.html) for component theming
-   **Configuration**: See [AgentforceConfiguration](/docs/einstein/genai/references/agentforce-mobile-sdk/configuration-overview-android.html) for setup