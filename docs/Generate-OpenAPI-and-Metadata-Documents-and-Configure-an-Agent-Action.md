# Generate OpenAPI and Metadata Documents and Configure an Agent Action

Follow these steps to create your first OpenAPI document. Use the sample Apex REST class and the generated files that we’re providing to quickly learn about the workflow. If you prefer, you can use one of the Apex REST classes you retrieved.

## Generate the Files

1.  In VS Code or Agentforce Vibes IDE, open the Command Palette (⇧⌘P) and run the command **SFDX: Create Project** command to create a new Salesforce project.
2.  Run **SFDX: Set a Default Org** to select the org to which you want to deploy the new OAS.
3.  If you aren’t using a class you retrieved, run **SFDX: Create Apex Class** to create a new Apex class. For example, create a class called `CaseManager`.
4.  Write your Apex class using [Apex REST annotations](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_rest_annotations_list.htm). For example, you can copy this code and paste it into the `CaseManager.cls` file that you just created.

```apex
@RestResource(urlMapping='/apex-rest-examples/v1/Cases/*')
global with sharing class CaseManager {
    @HttpGet
    global static Case getCaseById() {
        RestRequest request = RestContext.request;
        // grab the caseId from the end of the URL
        String caseId = request.requestURI.substring(
          request.requestURI.lastIndexOf('/')+1);
        Case result =  [SELECT CaseNumber,Subject,Status,Origin,Priority
                        FROM Case
                        WHERE Id = :caseId];
        return result;
    }

    @HttpPost
    global static ID createCase(String subject, String status,
        String origin, String priority) {
        Case thisCase = new Case(
            Subject=subject,
            Status=status,
            Origin=origin,
            Priority=priority);
        insert thisCase;
        return thisCase.Id;
    }

    @HttpDelete
    global static void deleteCase() {
        RestRequest request = RestContext.request;
        String caseId = request.requestURI.substring(
            request.requestURI.lastIndexOf('/')+1);
        Case thisCase = [SELECT Id FROM Case WHERE Id = :caseId];
        delete thisCase;
    }

    @HttpPut
    global static ID upsertCase(String subject, String status,
        String origin, String priority, String id) {
        Case thisCase = new Case(
                Id=id,
                Subject=subject,
                Status=status,
                Origin=origin,
                Priority=priority);
        // Match case by Id, if present.
        // Otherwise, create new case.
        upsert thisCase;
        // Return the case ID.
        return thisCase.Id;
    }

    @HttpPatch
    global static ID updateCaseFields() {
        RestRequest request = RestContext.request;
        String caseId = request.requestURI.substring(
            request.requestURI.lastIndexOf('/')+1);
        Case thisCase = [SELECT Id FROM Case WHERE Id = :caseId];
        // Deserialize the JSON string into name-value pairs
        Map params = (Map)JSON.deserializeUntyped(request.requestbody.tostring());
        // Iterate through each parameter field and value
        for(String fieldName : params.keySet()) {
            // Set the field and value on the Case sObject
            thisCase.put(fieldName, params.get(fieldName));
        }
        update thisCase;
        return thisCase.Id;
    }
}
```

5.  Run **SFDX: Refresh SObjects Definitions** to bring org metadata in the form of object definitions into your project. Select All SObjects.
6.  Run **SFDX: Create OpenAPI Document from this Class (Beta)** from the command palette or the context menu.
7.  Enter the folder where you want to store the generated files or accept the default `externalServiceRegistration` folder.  
    The command generates the files `<ApexClass>.yaml`, and `<ApexClass>.externalServiceRegistration-meta.xml`.
    
    The description that appears in your org's API catalog comes from the top-level description mapping in the YAML file, not the `<description>` element of the XML file.
    
8.  To verify the validity of the generated YAML and XML files, see [Verify Metadata and OpenAPI Documents](/docs/einstein/genai/guide/agent-apex-verify-spec.html). Also, check the Problems in the Panel bar for error messages and warnings and fix the generated files as needed.
9.  Run **SFDX: Validate OpenAPI Document (Beta)** on the corrected YAML file to ensure all the errors and warnings are gone.
    
    If the MuleSoft for Agentforce Extension Pack (beta) is installed, then **SFDX: Validate OpenAPI Document (Beta)** isn’t available. Use the governance rules in the MuleSoft for Agentforce Extension Pack (beta) to validate your OpenAPI document. For details, see [Verify Metadata and OpenAPI Specification Documents](/docs/einstein/genai/guide/agent-apex-verify-spec.html).
    
10.  Run the **SFDX: Deploy This Source to Org** command to deploy the `CaseManager.cls` class , or the class you’re working with, to your org.
11.  Next deploy the generated XML file to the org. Note that the command to deploy isn't ‌available on the YAML file.

### Regenerate OpenAPI Documents

You can regenerate an OpenAPI document if you modify the Apex class associated with it:

1.  Make the changes to the Apex class associated with the OpenAPI document.
2.  Run the **SFDX: Create OpenAPI Document from this Class (Beta)** command.
3.  Select **Overwrite** or **Manually merge with existing ESR** the popup window. **Overwrite** directly overwrite the existing OpenAPI document (This action is irreversible). The **Manually Merge with Existing ESR** option opens a diff window comparing the original and new OpenAPI documents. The new files are generated with the naming format: `<ApexClass>_<timestamp>.externalServiceRegistration-meta.xml` and `<ApexClass>_<timestamp>.yaml`.These files are located in the `esr_files_for_merge` folder in the root directory of your Salesforce project.
4.  Check the Problems tab for any errors or warnings in the new OpenAPI document (identified by the timestamp) and manually merge the changes from the newly generated OpenAPI document into the original document.
5.  Run the **SFDX: Validate OpenAPI Document (Beta)** command on the merged or overwritten OpenAPI document.
6.  Deploy the validated OpenAPI document to your Salesforce org.

> **Note:**
> 
> You may encounter API Catalog limits when deploying. See [Limits](/docs/einstein/genai/guide/agent-apex-limits.html).

## Confirm the Availability of the Agent Action

Once deployed, your API and its operations are available in your org's API catalog.

1.  From Setup, in the Quick Find box, enter API Catalog and select it. See [View Apex APIs in API Catalog (Beta)](https://help.salesforce.com/s/articleView?id=platform.api_catalog_view_apex_apis.htm&type=5).
2.  Click the Apex(Beta) tab. The deployed API is listed. ![Apex tab in API catalog](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/api-catalog-apex.png)
3.  The API and its operations are now available as an Apex Reference Action type that can be used to [Create a Custom Agent Action](https://help.salesforce.com/s/articleView?id=ai.copilot_actions_custom_create_scratch.htm&type=5). ![Create agent action in agentforce builder](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/agent-builder-action-apex.png)