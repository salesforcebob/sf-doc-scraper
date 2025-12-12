# AgentforceUIApiRecord

## Overview

A data structure that represents UI API record information in Agentforce conversations. It provides comprehensive record metadata including fields, relationships, and system information for displaying records in conversation interfaces.

## Declaration

```swift
struct AgentforceUIAPIRecord
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `apiName` | `String` | The API name of the record |
| `childRelationships` | `[String : AgentforceUIAPIRecordCollection]` | Dictionary of child relationship names to record collections |
| `eTag` | `String` | Entity tag for the record |
| `fields` | `[String : AgentforceUIAPIFieldValues]` | Dictionary of field names to field values |
| `id` | `String` | The unique identifier of the record |
| `lastModifiedById` | `String?` | ID of the user who last modified the record |
| `lastModifiedDate` | `String?` | Date when the record was last modified |
| `recordTypeId` | `String?` | ID of the record type |
| `recordTypeInfo` | `AgentforceUIAPIRecordTypeInfo?` | Information about the record type |
| `systemModstamp` | `String?` | System modification timestamp |
| `weakEtag` | `Int64` | Weak entity tag for the record |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `init(apiName:childRelationships:eTag:weakEtag:fields:id:lastModifiedById:lastModifiedDate:recordTypeId:recordTypeInfo:systemModstamp:)` | `init(apiName: String, childRelationships: [String : AgentforceUIAPIRecordCollection], eTag: String, weakEtag: Int64, fields: [String : AgentforceUIAPIFieldValues], id: String, lastModifiedById: String?, lastModifiedDate: String?, recordTypeId: String?, recordTypeInfo: AgentforceUIAPIRecordTypeInfo?, systemModstamp: String?)` | Creates a new record with all metadata and field information |
| `init(from:)` | `init(from decoder: Decoder) throws` | Creates a new instance from a decoder (inherited from Decodable) |