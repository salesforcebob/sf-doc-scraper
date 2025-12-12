# Android Theming Overview

Theming system and visual customization for the Agentforce Android SDK.

## Theming Classes

-   **[AgentforceThemeManager](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-manager-android.html)** - Central theme management
-   **[AgentforceColors](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-colors-android.html)** - Color system and customization
-   **[AgentforceSpacing](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-spacing-android.html)** - Spacing system and layout

## Theme System

### Color System

-   **Primary Colors**: Brand colors and primary UI elements
-   **Secondary Colors**: Accent colors and secondary elements
-   **Semantic Colors**: Success, warning, error, and info colors
-   **Surface Colors**: Background and surface element colors

### Typography

-   **Font Families**: Custom font support and system fonts
-   **Font Scales**: Responsive typography scaling
-   **Text Styles**: Headings, body text, and label styles

### Spacing

-   **Consistent Spacing**: Standardized spacing values
-   **Responsive Design**: Adaptive spacing for different screen sizes
-   **Layout System**: Grid and component spacing

## Customization

### Theme Application

```kotlin
val themeManager = AgentforceThemeManager(context)
themeManager.setColors(customColors)
themeManager.setTypography(customTypography)
themeManager.setSpacing(customSpacing)
```

### Dynamic Theming

-   **Light/Dark Mode**: Automatic theme switching
-   **Brand Colors**: Custom brand color integration
-   **Accessibility**: High contrast and accessibility support

## Next Steps

-   **UI Components**: See [Android UI Components](/docs/einstein/genai/references/agentforce-mobile-sdk/ui-components-android.html) for component theming
-   **Configuration**: See [Configuration Overview](/docs/einstein/genai/references/agentforce-mobile-sdk/configuration-overview-android.html) for setup
-   **Integration**: See [Android Development](/docs/einstein/genai/references/agentforce-mobile-sdk/development-android.html) for architecture patterns