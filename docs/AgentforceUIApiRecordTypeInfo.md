# AgentforceUIApiRecordTypeInfo

## Overview

A data structure that represents record type information from the UI API in Agentforce conversations. It provides metadata about record types including availability, mapping, and identification information.

## Declaration

```swift
struct AgentforceUIAPIRecordTypeInfo
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `available` | `Bool` | Whether the record type is available |
| `defaultRecordTypeMapping` | `Bool` | Whether this is the default record type mapping |
| `master` | `Bool` | Whether this is the master record type |
| `name` | `String` | The name of the record type |
| `recordTypeId` | `String?` | The unique identifier of the record type |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `init(available:defaultRecordTypeMapping:master:name:recordTypeId:)` | `init(available: Bool, defaultRecordTypeMapping: Bool, master: Bool, name: String, recordTypeId: String? = nil)` | Creates a new record type info with metadata |
| `init(from:)` | `init(from decoder: Decoder) throws` | Creates a new instance from a decoder (inherited from Decodable) |