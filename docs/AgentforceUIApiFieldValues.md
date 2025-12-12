# AgentforceUIApiFieldValues

## Overview

A data structure that represents field values from the UI API in Agentforce conversations. It provides a structured way to represent field values with both display and raw value information.

## Declaration

```swift
struct AgentforceUIAPIFieldValues
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `displayValue` | `String?` | The formatted display value for the field |
| `value` | `Any?` | The raw value of the field |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `init(displayValue:value:)` | `init(displayValue: String? = nil, value: Any? = nil)` | Creates a new instance with optional display and raw values |