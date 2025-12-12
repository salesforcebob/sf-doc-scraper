# Limits on AuraEnabled Apex Classes in Agents

API Catalog limits apply to the use of AuraEnabled Apex classes in agents. See [View Apex APIs in API Catalog](https://help.salesforce.com/s/articleView?id=platform.api_catalog_bring_apex_apis_into.htm&type=5).

If you reach the limit for the number of active operations or objects, disable unneeded operations in the ESR metadata or delete unneeded AuraEnabled Apex classes catalog registrations. For example, in this metadata file the `updateAccountName` operation is disabled by setting its `active` element to `false`.

```xml


    Collection of requested @AuraEnabled Apex method APIs
    AccountController
    OpenApi3
    yaml
    accountcontroller_openapi
    Complete
    3
    
        createAccount
        true
    
    
        deleteAccount
        true
    
    
        getAccountName
        true
    
    
        updateAccountName
        false
    
    AccountController
    AuraEnabled
    null

```

Before deleting an AuraEnabled API catalog registration, remove any agent action that references AuraEnabled actions defined by that registration.

This CLI command creates or adds to the destructive change descriptor `destructiveChange.xml` to delete the External Service Registration AccountController from the API catalog in the org.

```text
sf project generate manifest --metadata ExternalServiceRegistration:AccountController --type post
```

The `project deploy start` command deploys the destructive change manifest to the org and deletes the listed components.

```text
sf project deploy start --manifest /path/to/package.xml --post-destructive-changes /path/to/destructiveChangesPost.xml --purge-on-delete
```