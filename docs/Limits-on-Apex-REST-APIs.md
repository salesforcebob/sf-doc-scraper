# Limits on Apex REST APIs

API Catalog limits apply to the use of Apex REST APIs in agents. See [View Apex APIs in API Catalog](https://help.salesforce.com/s/articleView?id=platform.api_catalog_view_apex_apis.htm&type=5).

If you reach the limit for the number of active operations or objects, disable unneeded operations in the ESR metadata or delete unneeded Apex REST API catalog registrations. For example, in this metadata file the `upsertCase` operation is disabled by setting its `active` element to `false`.

```xml


 This is the ideal OpenAPI v3 specification for CaseManager.cls.
 CaseManager
 OpenApi3
 yaml
 casemanager_openapi
 3
 
   getCaseById
   true
 
 
   createCase
   true
 
 
   deleteCase
   true
 
 
   upsertCase
   false
 
 
   updateCaseFields
   true
 
 CaseManager
 ApexRest
 MyNamedCredential

```

Before deleting an Apex REST API catalog registration, remove any agent action that references Apex REST actions defined by its API catalog registration.

The CLI command below creates or adds to the destructive change descriptor destructiveChangesPost.xml to delete the External Service Registration CaseManager from the API catalog in the org.

```text
sf project generate manifest --metadata ExternalServiceRegistration:CaseManager -type post
```

The project deploy start command deploys the destructive change manifest to the org and deletes the listed components.

```text
sf project deploy start --post-destructive-changes path/to/destructiveChangesPost.xml --purge-on-delete
```