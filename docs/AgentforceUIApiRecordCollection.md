# AgentforceUIApiRecordCollection

## Overview

A data structure that represents a collection of UI API records in Agentforce conversations. It provides pagination support and metadata for managing multiple records from the UI API.

## Declaration

```swift
struct AgentforceUIAPIRecordCollection
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `count` | `Int` | The total number of records in the collection |
| `currentPageToken` | `String` | Token for the current page |
| `currentPageUrl` | `String` | URL for the current page |
| `nextPageToken` | `String?` | Token for the next page, if available |
| `nextPageUrl` | `String?` | URL for the next page, if available |
| `previousPageToken` | `String?` | Token for the previous page, if available |
| `previousPageUrl` | `String?` | URL for the previous page, if available |
| `records` | `[AgentforceRecordRepresentation]` | Array of record representations |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `init(count:currentPageToken:currentPageUrl:nextPageToken:nextPageUrl:previousPageToken:previousPageUrl:records:)` | `init(count: Int, currentPageToken: String, currentPageUrl: String, nextPageToken: String? = nil, nextPageUrl: String? = nil, previousPageToken: String? = nil, previousPageUrl: String? = nil, records: [AgentforceRecordRepresentation])` | Creates a new record collection with pagination metadata and records |
| `init(from:)` | `init(from decoder: Decoder) throws` | Creates a new instance from a decoder (inherited from Decodable) |