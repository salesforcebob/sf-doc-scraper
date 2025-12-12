# AgentforceThemeMode

## Overview

Theme mode configuration options that control how the Agentforce SDK adapts to light and dark appearance preferences. These modes provide flexibility for host applications to align the SDK's visual appearance with their own theming strategy while respecting user preferences and system settings.

## Declaration

```swift
enum AgentforceThemeMode
```

## Cases

| Case | Description |
| --- | --- |
| `light` | Forces light mode appearance regardless of system preferences. |
| `dark` | Forces dark mode appearance regardless of system preferences. |
| `system` | Automatically adapts to system-wide appearance preferences. |