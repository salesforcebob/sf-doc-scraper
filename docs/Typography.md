# Typography

`open class Typography`

Base class for typography used in a theme. See [https://salesforce.quip.com/Hh0oAuV9LVzZ](https://salesforce.quip.com/Hh0oAuV9LVzZ) for full list of styling hooks.

## Signature

```kotlin
open class Typography(
    val bodyFontScaleNeg1Regular: TextStyle,
    val bodyFontScaleBaseSemibold: TextStyle,
    val bodyFontScaleBaseRegular: TextStyle,
    val bodyFontScale1Semibold: TextStyle,
    val bodyFontScale1Regular: TextStyle,
    val bodyFontScale2Semibold: TextStyle,
    val bodyFontScale2Regular: TextStyle,
    val titlesFontScale3Semibold: TextStyle,
    val titlesFontScale3Regular: TextStyle,
    val titlesFontScale4Semibold: TextStyle,
    val titlesFontScale4Regular: TextStyle,
    val titlesFontScale5Regular: TextStyle
)
```

## Constructor

| Constructor | Parameters |
| --- | --- |
| `Typography(...)` | All TextStyle parameters for body and title font scales |

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `bodyFontScale1Regular` | `TextStyle` | Body text style at scale 1, regular weight |
| `bodyFontScale1Semibold` | `TextStyle` | Body text style at scale 1, semibold weight |
| `bodyFontScale2Regular` | `TextStyle` | Body text style at scale 2, regular weight |
| `bodyFontScale2Semibold` | `TextStyle` | Body text style at scale 2, semibold weight |
| `bodyFontScaleBaseRegular` | `TextStyle` | Base body text style, regular weight |
| `bodyFontScaleBaseSemibold` | `TextStyle` | Base body text style, semibold weight |
| `bodyFontScaleNeg1Regular` | `TextStyle` | Body text style at negative scale 1, regular weight |
| `titlesFontScale3Regular` | `TextStyle` | Title text style at scale 3, regular weight |
| `titlesFontScale3Semibold` | `TextStyle` | Title text style at scale 3, semibold weight |
| `titlesFontScale4Regular` | `TextStyle` | Title text style at scale 4, regular weight |
| `titlesFontScale4Semibold` | `TextStyle` | Title text style at scale 4, semibold weight |
| `titlesFontScale5Regular` | `TextStyle` | Title text style at scale 5, regular weight |

## Inheritors

-   `AgentforceTypography` - Default implementation of Typography interface

## Related Documentation

-   [AgentforceTypography](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-typography-android.html) - Default typography implementation
-   [SalesforceTextFontScale](/docs/einstein/genai/references/agentforce-mobile-sdk/salesforce-text-font-scale-android.html) - Font scaling composable
-   [AgentforceThemeManager](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-manager-android.html) - Theme management with typography support