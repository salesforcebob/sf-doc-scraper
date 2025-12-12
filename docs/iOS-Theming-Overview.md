# iOS Theming Overview

The Agentforce iOS SDK provides a comprehensive theming system that enables complete visual customization of the conversational AI interface. The theming system is built around a flexible, protocol-based architecture that supports dynamic theming, system integration, and custom brand implementations.

## Theming Architecture

The theming system is built on a protocol-based architecture that provides maximum flexibility and customization:

### Core Theming Classes

-   **[AgentforceThemeManager](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-manager-ios.html)** - Primary theme management interface combining theming capabilities with state observation
-   **[AgentforceDefaultThemeManager](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-default-theme-manager-ios.html)** - Default implementation with standard Salesforce theming
-   **[AgentforceThemeMode](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-mode-ios.html)** - Theme mode configuration for light, dark, and system modes
-   **[AgentforceColors](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-colors-ios.html)** - Comprehensive color system with semantic color tokens

## Color System Architecture

The color system is built around semantic color tokens that provide consistent theming across all components:

### Color Categories

#### Surface Colors

-   **`surface1`** / **`surface2`**: Primary view background colors
-   **`surfaceContainer1`** / **`surfaceContainer2`** / **`surfaceContainer3`**: Component container backgrounds
-   **`disabledContainer1`** / **`disabledContainer2`**: Disabled component backgrounds

#### Text Colors

-   **`onSurface1`** / **`onSurface2`** / **`onSurface3`**: Text colors for different emphasis levels
-   **`onDisabled1`** / **`onDisabled2`**: Text colors for disabled states

#### Accent Colors

-   **`accent1`** / **`accent2`** / **`accent3`** / **`accent4`** / **`accent5`**: Interactive element colors
-   **`accentContainer1`**: Branded component container backgrounds
-   **`onAccent1`**: Text colors for accent containers

#### Feedback Colors

-   **`error1`** / **`errorBase50`** / **`errorContainer1`** / **`onError1`**: Error state colors
-   **`successContainer1`** / **`onSuccess1`**: Success state colors
-   **`feedbackWarning1`** / **`feedbackWarningContainer1`**: Warning state colors
-   **`info1`** / **`infoContainer1`**: Information state colors

#### Border Colors

-   **`border1`** / **`border2`**: Decorative and functional border colors
-   **`borderDisabled1`** / **`borderError1`** / **`borderSuccess1`**: State-specific border colors
-   **`borderInverse2`**: Dark background border colors

#### Brand Colors

-   **`brandBase50`**: Primary brand color for consistent branding

## Theme Mode System

The SDK supports multiple theme modes for different use cases:

### Light Mode

-   **Optimized for**: Light backgrounds and bright environments
-   **Color Contrast**: High contrast for readability
-   **Brand Integration**: Consistent with light-themed applications

### Dark Mode

-   **Optimized for**: Dark backgrounds and low-light environments
-   **Eye Comfort**: Reduced eye strain in dark environments
-   **Modern Aesthetics**: Contemporary dark theme design

### System Mode

-   **Automatic Adaptation**: Follows iOS system appearance preferences
-   **User Preference**: Respects user's system-wide theme choice
-   **Dynamic Switching**: Real-time theme changes based on system settings

## Implementation Patterns

### Basic Theme Setup

Configure the default theme manager with your preferred theme mode for immediate theming support.

### Custom Theme Implementation

Implement custom theme managers that provide brand-specific colors and theming capabilities.

### Dynamic Theme Switching

Create theme controllers that enable real-time theme switching between light, dark, and system modes.

## Advanced Theming Features

### Reactive Updates

-   **Observable State**: Real-time theme updates across all components
-   **Automatic Propagation**: Theme changes automatically update all UI elements
-   **Performance Optimized**: Efficient theme change handling without performance impact

### System Integration

-   **iOS Appearance**: Full integration with iOS appearance system
-   **Accessibility**: Support for accessibility preferences and high contrast modes
-   **Dynamic Type**: Integration with iOS Dynamic Type for text scaling

### Custom Branding

-   **Brand Colors**: Easy integration of custom brand colors
-   **Logo Integration**: Support for custom logos and branding elements
-   **Consistent Theming**: Unified theming across all SDK components

## Theming Benefits

-   **Brand Consistency**: Maintain consistent branding across all conversational AI interfaces
-   **User Experience**: Provide familiar and comfortable visual experiences
-   **Accessibility**: Support for accessibility requirements and preferences
-   **Flexibility**: Easy customization for different use cases and requirements
-   **Performance**: Optimized theming system with minimal performance impact

## Best Practices

-   **Use Semantic Colors**: Leverage semantic color tokens for consistent theming
-   **Test All Modes**: Verify theming across light, dark, and system modes
-   **Accessibility**: Ensure proper contrast ratios and accessibility compliance
-   **Brand Integration**: Maintain brand consistency while respecting user preferences
-   **Performance**: Use efficient theme switching to avoid UI lag

## Next Steps

-   **UI Components**: See [iOS UI Components](/docs/einstein/genai/references/agentforce-mobile-sdk/ui-components-ios.html) for component theming
-   **Configuration**: See [AgentforceConfiguration](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-configuration-ios.html) for theme setup
-   **Integration**: See [iOS Development](/docs/einstein/genai/references/agentforce-mobile-sdk/development-ios.html) for architecture patterns