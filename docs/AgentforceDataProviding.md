# AgentforceDataProviding

## Overview

Protocol for providing data access functionality to the Agentforce SDK. This protocol serves as the bridge between the Agentforce SDK and your application's data layer, typically connecting to Salesforce APIs. Implementations should provide access to Salesforce records, object metadata, and query capabilities while respecting security, caching, and performance requirements.

## Declaration

```swift
protocol AgentforceDataProviding
```

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `objectInfo(for:cachePolicy:transactionId:)` | `func objectInfo(for: String, cachePolicy: AgentforceCachePolicy, transactionId: String?) async throws -> AgentforceObjectRepresentation` | Retrieves metadata information for a Salesforce object type |
| `objectInfos(forObjectTypes:cachePolicy:transactionId:)` | `func objectInfos(forObjectTypes: [String], cachePolicy: AgentforceCachePolicy, transactionId: String?) async throws -> [AgentforceUIAPIObjectInfo]` | Retrieves metadata information for multiple Salesforce object types |
| `query(for:cachePolicy:transactionId:)` | `func query(for: AgentforceQueryData, cachePolicy: AgentforceCachePolicy, transactionId: String?) async throws -> [String: Any]` | Executes a query and returns matching records |
| `record(for:recordId:fields:cachePolicy:transactionId:)` | `func record(for: String, recordId: String, fields: [String], cachePolicy: AgentforceCachePolicy, transactionId: String?) async throws -> AgentforceRecordRepresentation` | Retrieves a single record with specified fields |
| `record(forLayoutType:recordId:modes:cachePolicy:transactionId:)` | `func record(forLayoutType: String, recordId: String, modes: [AgentforceAccessMode], cachePolicy: AgentforceCachePolicy, transactionId: String?) async throws -> AgentforceRecordRepresentation` | Retrieves a single record using layout-based field selection |
| `records(forLayoutType:recordIds:modes:cachePolicy:transactionId:)` | `func records(forLayoutType: String, recordIds: [String], modes: [AgentforceAccessMode]?, cachePolicy: AgentforceCachePolicy, transactionId: String?) async throws -> [AgentforceUIAPIRecord]` | Retrieves multiple records using layout-based field selection |
| `records(forObjectType:recordIds:fields:cachePolicy:transactionId:)` | `func records(forObjectType: String, recordIds: [String], fields: [String], cachePolicy: AgentforceCachePolicy, transactionId: String?) async throws -> [AgentforceUIAPIRecord]` | Retrieves multiple records with specified fields in a batch operation |