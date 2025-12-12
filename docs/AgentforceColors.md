# AgentforceColors

`object AgentforceColors : Colors`

Agentforce-specific color palette for light mode. These colors are specifically designed for AI conversation interfaces and follow the SharedUI Colors structure.

## Signature

```kotlin
object AgentforceColors : Colors
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `accent1` | `Color` | Fill color for text and icons on buttons and interactive element |
| `accent2` | `Color` | Fill color for text and icons on buttons and interactive element |
| `accent3` | `Color` | Darker fill color for text and icons on buttons, interactive elements |
| `accent4` | `Color` | Accent color variant |
| `accent5` | `Color` | Accent color variant |
| `accentContainer1` | `Color` | Branded component containers e.g. the Brand button |
| `accentContainer2` | `Color` | Branded component containers or hover states e.g. the Brand button |
| `border1` | `Color` | Borders for components that are decorative or divider lines between content |
| `border2` | `Color` | Borders for components that are functional or interactive |
| `borderAccent1` | `Color` | Border color for branded containers |
| `borderAccent2` | `Color` | Border color for branded containers such as Outline Buttons |
| `borderDisabled1` | `Color` | Border color for disabled containers |
| `borderError1` | `Color` | Border color for error containers e.g. Destructive Buttons |
| `borderSuccess1` | `Color` | Border color for success containers e.g. Success buttons |
| `brandBase90` | `Color` | A color with no semantic assignment, but may be used for elements throughout the UI |
| `cloudBlue60` | `Color` | A color with no semantic assignment, but may be used for decorative elements throughout the UI |
| `disabled1` | `Color` | Fill color for text and icons for disabled components or content |
| `disabledContainer1` | `Color` | Disabled component containers (background) for white components |
| `disabledContainer2` | `Color` | Disabled component containers (background) for dark components |
| `error1` | `Color` | Fill color for text and icons displaying an error |
| `errorContainer1` | `Color` | Error component containers (background) e.g. error Toast or Alerts |
| `errorContainer2` | `Color` | Error component containers (background) on hover e.g. Destructive Buttons |
| `information1` | `Color` | Fill color for text and icons displaying information |
| `informationContainer1` | `Color` | Information component containers (background) e.g. information Toast or Alerts |
| `onAccent1` | `Color` | Text and icon fill color displayed on accent containers |
| `onDisabled1` | `Color` | Fill color for text and icons displayed on top of disabled-container-1 |
| `onDisabled2` | `Color` | Fill color for text and icons displayed on top of disabled-container-2 |
| `onError1` | `Color` | Fill color for text and icons displayed on top of an error container |
| `onSuccess1` | `Color` | Fill color for text and icons displayed on top of a success container |
| `onSurface1` | `Color` | Lightest text and icon fill. Used for: Body text, placeholder text, field labels, sub headings, taglines |
| `onSurface2` | `Color` | Darker text and icons fill. Used for: Secondary and tertiary headings, dark body copy, filled in input fields |
| `onSurface3` | `Color` | Darkest text and icon fill. Used for: titles for pages or components |
| `onSurfaceInverse1` | `Color` | Lightest text and Icon fill on dark backgrounds (50 - 10) |
| `onWarning1` | `Color` | Fill color for text and icons displayed on top of a warning container |
| `success1` | `Color` | Fill color for text and icons displaying success |
| `successContainer1` | `Color` | Success component containers (background) e.g. success Toast or Alerts |
| `successContainer2` | `Color` | Success component containers (background) on hover e.g. Success buttons |
| `surface1` | `Color` | Entire page background |
| `surface2` | `Color` | Entire page background |
| `surfaceContainer1` | `Color` | Default color for component containers (backgrounds) i.e. cards, modals |
| `surfaceContainer2` | `Color` | Darker component container or background fill |
| `surfaceContainer3` | `Color` | Darkest component container or background fill |
| `surfaceContainerInverse1` | `Color` | Inverse component containers (backgrounds) |
| `warning1` | `Color` | Fill color for text and icons displaying a warning |
| `warningContainer1` | `Color` | Warning component containers (background) e.g. warning Toast or Alerts |

## Functions

| Function | Signature | Description |
| --- | --- | --- |
| `copy` | `fun copy(surface1: Color = this.surface1, surface2: Color = this.surface2, surfaceContainer1: Color = this.surfaceContainer1, surfaceContainer2: Color = this.surfaceContainer2, surfaceContainer3: Color = this.surfaceContainer3, surfaceContainerInverse1: Color = this.surfaceContainerInverse1, onSurface1: Color = this.onSurface1, onSurface2: Color = this.onSurface2, onSurface3: Color = this.onSurface3, onSurfaceInverse1: Color = this.onSurfaceInverse1, border1: Color = this.border1, border2: Color = this.border2, accent2: Color = this.accent2, accent1: Color = this.accent1, accent3: Color = this.accent3, accent4: Color = this.accent4, accent5: Color = this.accent5, accentContainer1: Color = this.accentContainer1, accentContainer2: Color = this.accentContainer2, onAccent1: Color = this.onAccent1, borderAccent1: Color = this.borderAccent1, borderAccent2: Color = this.borderAccent2, error1: Color = this.error1, errorContainer1: Color = this.errorContainer1, errorContainer2: Color = this.errorContainer2, onError1: Color = this.onError1, borderError1: Color = this.borderError1, success1: Color = this.success1, successContainer1: Color = this.successContainer1, successContainer2: Color = this.successContainer2, onSuccess1: Color = this.onSuccess1, borderSuccess1: Color = this.borderSuccess1, disabled1: Color = this.disabled1, disabledContainer1: Color = this.disabledContainer1, disabledContainer2: Color = this.disabledContainer2, onDisabled1: Color = this.onDisabled1, onDisabled2: Color = this.onDisabled2, borderDisabled1: Color = this.borderDisabled1, warning1: Color = this.warning1, warningContainer1: Color = this.warningContainer1, information1: Color = this.information1, informationContainer1: Color = this.informationContainer1, onWarning1: Color = this.onWarning1, brandBase90: Color = this.brandBase90, cloudBlue60: Color = this.cloudBlue60): Colors` | Creates a copy of this Colors object with optionally modified properties |

## Related Documentation

-   [AgentforceThemeManager](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-manager-android.html)
-   [AgentforceTypography](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-typography-android.html)
-   [AgentforceSpacing](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-spacing-android.html)