# AgentforceRecordRepresentation

`struct AgentforceRecordRepresentation`

Represents a Salesforce record with its data, metadata, and display configuration.

## Overview

This structure encapsulates a complete Salesforce record including its field values, display configuration, theme information, and field mapping capabilities. It provides the foundation for displaying record information in various UI contexts throughout the Agentforce SDK.

## Declaration

```swift
struct AgentforceRecordRepresentation
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| recordId | String | The unique 15 or 18-character Salesforce record ID |
| objectType | String | The API name of the Salesforce object type |
| iconUrl | String? | Optional URL for the record's icon image |
| iconColor | String? | Optional color for visual styling of the record |
| displayFields | \[AgentforceListDisplayColumn\] | Configuration for how fields should be displayed in list/table views |
| fields | \[String: Any\] | Complete field data for the record |
| fieldmap | \[String: String\]? | Optional mapping between display names and API field names |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| init | `init(recordId:objectType:iconUrl:iconColor:displayFields:fields:fieldmap:)` | Creates a new record representation |
| getValueForFieldAPI | `func getValueForFieldAPI(_ String) -> Any?` | Retrieves a field value using the Salesforce API field name with relationship traversal support |
| getValueForMappedField | `func getValueForMappedField(_ String) -> Any?` | Retrieves a field value using a mapped field name |

## Example Usage

```swift
// Access field values directly
let accountName = record.getValueForFieldAPI("Name") as? String
let ownerName = record.getValueForFieldAPI("Owner.Name") as? String

// Use mapped field names
let displayName = record.getValueForMappedField("displayName") as? String

// Integrate with UI components
RecordCardView(record: record)
RecordListView(records: [record])
```