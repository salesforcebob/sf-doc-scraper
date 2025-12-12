# AgentforceUIAPIFields

## Overview

A data structure that represents field information from the UI API in Agentforce conversations. It provides comprehensive field metadata including data types, validation rules, display properties, and relationship information for rendering form fields and data displays in conversation interfaces.

## Declaration

```swift
struct AgentforceUIAPIFields
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `apiName` | `String` | The API name of the field |
| `calculated` | `Bool` | Whether the field is calculated |
| `compound` | `Bool` | Whether the field is compound |
| `compoundComponentName` | `String?` | Name of the compound component |
| `compoundFieldName` | `String?` | Name of the compound field |
| `controllerName` | `String?` | Name of the field controller |
| `controllingFields` | `[String]?` | Fields that control this field |
| `createable` | `Bool?` | Whether the field can be created |
| `custom` | `Bool` | Whether the field is custom |
| `dataType` | `String` | The data type of the field |
| `externalId` | `Bool?` | Whether the field is an external ID |
| `extraTypeInfo` | `String?` | Additional type information |
| `filterable` | `Bool` | Whether the field is filterable |
| `filteredLookupInfo` | `AgentforceUIAPIFilteredLookupInfo?` | Filtered lookup information |
| `highScaleNumber` | `Bool` | Whether the field is a high scale number |
| `htmlFormatted` | `Bool` | Whether the field is HTML formatted |
| `inlineHelpText` | `String?` | Inline help text for the field |
| `label` | `String` | Display label for the field |
| `length` | `Int` | Length of the field |
| `maskType` | `String?` | Mask type for the field |
| `nameField` | `Bool` | Whether the field is a name field |
| `polymorphicForeignKey` | `Bool` | Whether the field is a polymorphic foreign key |
| `precision` | `Int` | Precision of the field |
| `reference` | `Bool` | Whether the field is a reference |
| `referenceTargetField` | `String?` | Target field for references |
| `referenceToInfos` | `[AgentforceUIAPIReferenceToInfo]?` | Reference information |
| `relationshipName` | `String?` | Name of the relationship |
| `required` | `Bool` | Whether the field is required |
| `searchPrefilterable` | `Bool` | Whether the field is search prefilterable |
| `scale` | `Int` | Scale of the field |
| `sortable` | `Bool` | Whether the field is sortable |
| `unique` | `Bool` | Whether the field is unique |
| `updateable` | `Bool` | Whether the field is updateable |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `init` | `init(apiName:calculated:compound:compoundComponentName:compoundFieldName:controllerName:controllingFields:createable:custom:dataType:externalId:extraTypeInfo:filterable:filteredLookupInfo:highScaleNumber:htmlFormatted:inlineHelpText:label:length:maskType:nameField:polymorphicForeignKey:precision:reference:referenceTargetField:referenceToInfos:relationshipName:required:searchPrefilterable:scale:sortable:unique:updateable:)` | Initializes a new field with all properties |
| `init(from:)` | `init(from: Decoder) throws` | Initializes from a decoder for JSON deserialization |