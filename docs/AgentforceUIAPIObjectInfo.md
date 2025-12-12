# AgentforceUIAPIObjectInfo

## Overview

A data structure that represents object information from the UI API in Agentforce conversations. It provides comprehensive object metadata including field definitions, relationship information, layout capabilities, and display properties for rendering object information in conversation interfaces.

## Declaration

```swift
struct AgentforceUIAPIObjectInfo
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `apiName` | `String` | The API name of the object |
| `associateEntityType` | `String?` | Associated entity type |
| `associateParentEntity` | `String?` | Associated parent entity |
| `childRelationships` | `[AgentforceUIAPIChildRelationship]` | Child relationships |
| `compactLayoutable` | `Bool?` | Whether the object supports compact layout |
| `createable` | `Bool?` | Whether the object can be created |
| `custom` | `Bool` | Whether the object is custom |
| `defaultRecordTypeId` | `String?` | Default record type ID |
| `deletable` | `Bool` | Whether the object can be deleted |
| `fields` | `[String: AgentforceUIAPIFields]` | Field definitions |
| `keyPrefix` | `String?` | Key prefix for the object |
| `label` | `String` | Display label for the object |
| `labelPlural` | `String` | Plural display label |
| `layoutable` | `Bool` | Whether the object supports layout |
| `mruEnabled` | `Bool` | Whether most recently used is enabled |
| `nameFields` | `[String]` | Name fields for the object |
| `queryable` | `Bool` | Whether the object is queryable |
| `recordTypeInfos` | `[String: AgentforceUIAPIRecordTypeInfo]` | Record type information |
| `searchable` | `Bool` | Whether the object is searchable |
| `searchLayoutable` | `Bool?` | Whether the object supports search layout |
| `themeInfo` | `AgentforceUIAPIThemeInfo?` | Theme information |
| `updateable` | `Bool` | Whether the object can be updated |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `init` | `init(apiName:associateEntityType:associateParentEntity:childRelationships:compactLayoutable:createable:custom:defaultRecordTypeId:deletable:fields:keyPrefix:label:labelPlural:layoutable:mruEnabled:nameFields:queryable:recordTypeInfos:searchable:searchLayoutable:themeInfo:updateable:)` | Initializes a new object info with all properties |
| `init(from:)` | `init(from: Decoder) throws` | Initializes from a decoder for JSON deserialization |