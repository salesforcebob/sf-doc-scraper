# Typography and Fonts

Comprehensive typography system for Android Agentforce components with multiple scales, weights, and semantic usage patterns.

## Typography Classes

The Android Agentforce SDK provides a complete typography system with the following classes:

### Base Typography Class

-   **[Typography](/docs/einstein/genai/references/agentforce-mobile-sdk/typography-android.html)** - Base class for typography used in themes with 12 TextStyle properties for body and title font scales

### Typography Implementation

-   **[AgentforceTypography](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-typography-android.html)** - Default typography implementation object that extends the Typography base class

### Font Scaling

-   **[SalesforceTextFontScale](/docs/einstein/genai/references/agentforce-mobile-sdk/salesforce-text-font-scale-android.html)** - Composable function for Salesforce text font scaling

## Typography System Overview

The typography system provides multiple font scales and weights for creating clear information hierarchy:

### Body Text Styles

-   `bodyFontScaleNeg1Regular` - Smaller body text, regular weight
-   `bodyFontScaleBaseRegular` - Standard body text, regular weight
-   `bodyFontScaleBaseSemibold` - Standard body text, semibold weight
-   `bodyFontScale1Regular` - Larger body text, regular weight
-   `bodyFontScale1Semibold` - Larger body text, semibold weight
-   `bodyFontScale2Regular` - Even larger body text, regular weight
-   `bodyFontScale2Semibold` - Even larger body text, semibold weight

### Title Text Styles

-   `titlesFontScale3Regular` - Medium titles, regular weight
-   `titlesFontScale3Semibold` - Medium titles, semibold weight
-   `titlesFontScale4Regular` - Large titles, regular weight
-   `titlesFontScale4Semibold` - Large titles, semibold weight
-   `titlesFontScale5Regular` - Extra large titles, regular weight

## Related Documentation

-   [AgentforceThemeManager](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-manager-android.html) - Theme management with typography support
-   [AgentforceColors](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-colors-android.html) - Color theming system
-   [AgentforceSpacing](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-spacing-android.html) - Spacing system