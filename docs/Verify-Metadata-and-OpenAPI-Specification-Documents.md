# Verify Metadata and OpenAPI Specification Documents

Use the sample files and table to confirm that the generated OpenAPI document is semantically identical to the REST class it was generated from.

-   Use the OpenAPI Specification Objects and Fields table to verify that all listed fields are valid.
-   Confirm whether the path needs a parameter defined `/a/b/c/{id}`. `HttpGet` and `HttpDelete` typically use an Id that is taken from the URI.
-   Confirm that the generated methods are listed under the correct path.
-   If the path defines a replaceable parameter, `/a/b/c/{id}`, confirm that the parameter is listed in the parameters section with the correct setting for the in property.
-   If the Apex REST class fetches values from query parameters, confirm that these parameters are listed in the parameters section with correct value in the in parameter.
-   Confirm that parameters that are required have the required parameter property set to true.
-   Confirm that all parameter types are correct.
-   If an Apex REST method depends on fetching values from the request body, confirm that the shape of the request body is correct.
-   Confirm that the generated YAML includes responses in the 200-299 range.
-   Confirm that the response body properly reflects the shape of the return type from the Apex REST class.

## Sample of Generated Metadata XML and YAML

```YAML
openapi: 3.0.0
info:
  title: CaseManager
  version: '1.0.0'
  description: Apex Rest API  to manage case objects
servers:
  - url: /services/apexrest
    description: Apex rest
paths:
  /apex-rest-examples/v1/Cases/{caseId}:
    get:
      summary: Get a case
      description: Gets a case based on the provided case ID.
      operationId: getCaseById
      parameters:
        - name: caseId
          in: path
          required: true
          description: The ID of the case to retrieve.
          schema:
            type: string
      responses:
        '200':
          description: The case with the provided ID.
          content:
            application/json:
              schema:
                type: object
                properties:
                  Id:
                    type: string
                    description: The unique identifier of the case
                  CaseNumber:
                    type: string
                    description: Auto-generated case number
                  Subject:
                    type: string
                    description: The subject of the case
                  Status:
                    type: string
                    description: The status of the case
                  Origin:
                    type: string
                    description: The origin of the case
                  Priority:
                    type: string
                    description: The priority of the case
    delete:
      summary: Delete a case
      description: Deletes a case based on the provided case ID.
      operationId: deleteCase
      parameters:
        - name: caseId
          in: path
          required: true
          description: The ID of the case to delete.
          schema:
            type: string
      responses:
        '200':
          description: Case deleted successfully
    patch:
      summary: Update case fields
      description: Updates the fields of a case based on the provided JSON string.
      operationId: updateCaseFields
      parameters:
        - name: caseId
          in: path
          required: true
          description: The ID of the case to update.
          schema:
            type: string
      requestBody:
        description: The JSON string containing the fields to update.
        required: true
        content:
          application/json:
            schema:
              type: object
      responses:
        '200':
          description: The ID of the updated case.
          content:
            text/plain:
              schema:
                type: string
  /apex-rest-examples/v1/Cases/:
    post:
      summary: Create a new case
      description: Creates a new case with the provided information.
      operationId: createCase
      requestBody:
        description: The properties of the case to create.
        content:
          application/json:
            schema:
              type: object
              properties:
                subject:
                  type: string
                  description: The subject of the case
                status:
                  type: string
                  description: The status of the case
                origin:
                  type: string
                  description: The origin of the case
                priority:
                  type: string
                  description: The priority of the case
      responses:
        '200':
          description: The ID of the newly created case.
          content:
            text/plain:
              schema:
                type: string
    put:
      summary: Upsert a case
      description: Creates or updates a case based on the provided information.
      operationId: upsertCase
      requestBody:
        description: The properties of the case to upsert.
        content:
          application/json:
            schema:
              type: object
              properties:
                id:
                  type: string
                  description: The unique identifier of the case
                subject:
                  type: string
                  description: The subject of the case
                status:
                  type: string
                  description: The status of the case
                origin:
                  type: string
                  description: The origin of the case
                priority:
                  type: string
                  description: The priority of the case
      responses:
        '200':
          description: The ID of the upserted case.
          content:
            text/plain:
              schema:
                type: string
```
```xml


  This is the ideal OpenAPI v3 specification for CaseManager.cls.
  CaseManager
  OpenApi3
  yaml
  casemanager_openapi
  Complete
  3
  
    getCaseById
    true
  
  
    createCase
    true
  
  
    deleteCase
    true
  
  
    upsertCase
    true
  
  
    updateCaseFields
    true
  
  CaseManager
  Custom
  null

```

## OpenAPI Specification Objects and Fields

This table lists objects and fields in the OpenAPI specification that require specific values or actions to make the specification valid for use with Apex classes that you expose as agent actions. Make sure the OpenAPI specification you generate for these Apex classes is in agreement with the descriptions in this table.

| Field | Description |
| :-- | :-- |
| **OpenAPI Object** |  |
| `openapi` | Set the OpenAPI Specification version 3.0.0. |
| `servers` | Set the API server definition for the API to a single ‘/services/apexrest’ URL. |
| `paths` | Set the relative paths to the individual endpoints and their operations to exactly match the path defined in the `@RestResource` annotation’s `urlMapping` parameter. |
| `security` | Apex REST supports these authentication mechanisms: - **Type**: `OAuth2` - **Type**: `HTTP`, **Scheme**:`Bearer` |
| **Path Item Object** |  |
| `description` | Provide a detailed description of the path. Supports Markdown syntax. |
| `servers` | Don't include this field. |
| `options` | Don't include this field. |
| `head` | Don't include this field. |
| `trace` | Don't include this field. |
| **Operations Object** |  |
| `description` | Provide a detailed description of the operation. Supports Markdown syntax. |
| `operationId` | Provide a unique identifier for the operation. Useful for referencing the operation programmatically. |
| `parameters` | Provide a list of unique parameter objects applicable for this operation, as needed. These parameters override matching parameters in the `Path Item` Object. |
| `requestBody` | Provide a request body describing the input data for this, if needed. |
| `responses` | Provide a responses object specifying the possible responses for the operation, if needed. |
| `callbacks` | Don't include this field. |
| `deprecated` | Don't include this field. |
| `security` | Don't include this field. |
| `servers` | Don't include this field. |
| **Request Body Object** |  |
| `description` | Provide a brief description of the request body. Can be used for documentation purposes. |
| `content` | Use only `application/json` for media type. This field is a map of media types and their corresponding schema for the request body. |
| **Parameters Object** |  |
| `in` | Provide `query`, `header`, and `path` parameter locations. Don’t provide `cookie`. |
| `description` | Provide a brief description of the parameter's purpose. |
| `deprecated` | Don't include this field. |
| `explode` | Don’t include this field. |
| `allowReserved` | Don’t include this field. |
| `example` | This field isn’t required, but we recommend that you include it. |
| `examples` | This field isn’t required, but we recommend that you include it. |
| `content` | Use only `application/json` for media type. This field is a map of media types and their corresponding schema for the parameter. |
| **Response Object** |  |
| `description` | Provide a short description of the response. `CommonMark` syntax can be used for rich text representation. |
| `headers` | Don’t include this field. Headers aren't allowed in responses. |
| `content` | Use only `application/json` if the response has `type: object`, or `text/plain` if the response has `type: string`. This field is a map defining the response body. |
| **Media Type Object** |  |
| `Encoding` | Don’t include this field. |
| **Header Object** | Don’t use these headers: `cookie, set-cookie, set-cookie2, content-length, Authorization`. Don’t use allowed headers in response objects. |
| `description` | Provide a brief description of the header's purpose. |
| `deprecated` | Don't include this field. |
| `explode` | Don’t include this field. |
| `allowReserved` | Don’t include this field. |
| `example` | This field isn’t required, but we recommend that you include it. |
| `examples` | This field isn’t required, but we recommend that you include it. |
| `content` | Use only `application/json` for media type. This field is a map of media types and their corresponding schema for the header. |
| **Callback Object** | Don’t use this object. |
| **Schema Object** | Include a `properties` object with the input properties that should be present. Don’t use `not` blocks. |

## Configure Extensions

These boolean fields extend the OpenAPI specification. Use these fields to define agent actions that are automatically created and made available in agents. For MuleSoft for Agentforce: Topic Center extensions, see [Configure Topics](https://docs.mulesoft.com/anypoint-code-builder/ai-enabling-api-project-topic-center#configure-topics).

| Extension | Description |
| :-- | :-- |
| `x-sfdc/agent/action/publishAsAgentAction` | Required. Set this attribute to true to enable the operation as an action. |
| `x-sfdc/privacy/isPii` | Optional. If `publishAsAgentAction` is enabled, set this attribute to true to enable PII service for queries sent under that operation |
| `x-sfdc/agent/action/isUserInput` | Required if `publishAsAgentAction` is enabled. Set this attribute to true to surface the field to the user for further input. |
| `x-sfdc/agent/action/isDisplayable` | Required if `publishAsAgentAction` is enabled. Set this attribute to true for the field to be displayable to the user. |

The metadata must be defined inside a schema. For example:

```text
...
components:
  schemas:
    Pet:
      x-sfdc:
        agent:
            action:
                isDisplayable: true
...
```

Don’t add agent metadata in a schema that’s defined using `$ref`.

## External Service Registration Metadata for Apex REST API Catalog

[ExternalServiceRegistration metadata](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_externalserviceregistration.htm) deploys the OpenAPI document for your Apex REST class. The ExternalServiceRegistration fields are characteristic of an Apex REST service in the API catalog. The table below shows how these fields must be set:

| Field Name | Field Type | Description |
| :-- | :-- | :-- |
| `namedCredential` | string | The field value is always null. The Apex REST service is deployed to your org. |
| `registrationProvider` | string | The name of the Apex REST class implementing the REST service. |
| `registrationProviderType` | enum string | Indicates the type of the API specification registration. New enumeration value: ApexRest - The API spec is implemented by an Apex REST class in your org. |
| `schema` | string | The content of the OpenAPI 3.0 schema in YAML format. This field is empty if your SFDX project source behavior has been configured to decompose the ExternalServiceRegistration metadata. |
| `schemaType` | string | OpenApi3 |

> **Note:**
> 
> ESR of provider type ApexRest aren't visible in the [External Service Setup](https://help.salesforce.com/s/articleView?id=platform.external_services_schema.htm&type=5). From Setup, in the Quick Find box, enter API Catalog and select it. See [View Apex APIs in API Catalog (Beta)](https://help.salesforce.com/s/articleView?id=platform.api_catalog_view_apex_apis.htm&type=5).

> **Note:**
> 
> Deploying the ExternalServiceRegistration with registration provider type ApexRest doesn't co-deploy the Apex REST class implementing the service automatically. You must deploy the Apex REST class as part of your project or on its own.

## Validate and Test API Documents

In the MuleSoft for Agentforce Extension Pack (beta), the MuleSoft for Agentforce API Design Extension provides the ability to check that your document is semantically and syntactically correct in Code Builder. The MuleSoft for Agentforce Extension Pack (beta) contains these extensions:

-   MuleSoft for Agentforce API Design Extension
-   MuleSoft for Agentforce Dependencies Extension
-   MuleSoft for Agentforce Platform Extension

## Leverage Rulesets

The Salesforce API Topic and Action Enablement and Salesforce Apex REST Best Practices governance rulesets are included in the MuleSoft for Agentforce Extension Pack (beta). Use the governance rules in the extension pack to ensure that your document is ready for agent actions and has the required metadata to generate agent actions. Use these commands.

-   **MuleSoft: Run Governance Validation with all Rulesets and Rules**
-   **MuleSoft: Rerun non-confirmation validations on Governance Rules** runs rules that have previously failed.

For details, see [Validating API Specifications Against Governance Rulesets](https://docs.mulesoft.com/anypoint-code-builder/des-govern-api) and [Enabling an API Project for Topics and Agent Actions](https://docs.mulesoft.com/anypoint-code-builder/ai-enabling-api-project-topic-center).

## Use API Console

In the API Console, you can check endpoints and test your document by providing a deployed instance of your Apex REST implementation or by mocking up request data. For details, see [Review Your Spec in the API Console](https://docs.mulesoft.com/anypoint-code-builder/des-create-api-specs#review-spec-console) and [Test Your Spec Using the API Mocking Service](https://docs.mulesoft.com/anypoint-code-builder/des-create-api-specs#test-spec).