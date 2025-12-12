# Create Actions from Named Query API (Beta)

> **Note:**
> 
> Named Query API is a beta service that is subject to the Beta Services Terms at [Agreements - Salesforce.com](https://www.salesforce.com/company/legal/agreements/) or a written Unified Pilot Agreement if executed by Customer, and applicable terms in the [Product Terms Directory](https://ptd.salesforce.com/?_ga=2.247987783.1372150065.1709219475-629000709.1639001992). Use of this beta service is at the Customer's sole discretion.

| USER PERMISSIONS NEEDED |  |
| --- | --- |
| To work with Named Query API: | **Allows users to create, read, update and delete Named Query API records** |
| To use an agent with actions based on Named Query APIs: | Either **View Developer Name** or **View Setup and Configuration** |

With Named Query API (beta), you can create custom SOQL queries (Named Query APIs) in Setup, then expose them as agent actions in Agent Creator and invoke them as REST APIs.

## Enable Named Query API

Before you can use Named Query API, you have to enable it by following these steps.

1.  From Setup, in the Quick Find box, enter `User Interface` and then select **User Interface**.
2.  On the User Interface page, select **Enable Named Query API (Beta)**.

> **Tip:**
> 
> After you enable Named Query API for your org, if you don't see the Named Query API page in Setup, use the browser **Reload** button to refresh the page. If the **New Named Query API** button is greyed-out, clear your browser history and cache, then refresh the page.

## Create Named Query APIs

Decide what data you want to expose using Named Query API, then create Named Query APIs to return that data. You can create Named Query APIs in Setup or in Visual Studio Code (VS Code).

### Create Named Query APIs in Setup

1.  From Setup, in the Quick Find box, enter `Named Query API`, and then select **Named Query API**.
2.  Click **New Named Query** to open the Named Query API creator modal.
3.  In the **Label** field, give your Named Query API a descriptive name.
4.  Accept the suggested API name or enter a different API name.
    
    The API name must begin with a letter. It also must contain only alpha-numeric characters.
    
5.  Enter the API version. For example, `65.0`.
6.  Enter a SOQL query that’s valid in Named Query API. You can define filter conditions for the query by specifying parameters in a WHERE clause. For example, `name = :name`. If you want to control the amount of returned data, [include a LIMIT clause](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_limit.htm).
7.  Give your Named Query API a description that explains what it does. Provide enough detail for the agent to understand when it’s optimal to select this action. ![Screenshot of the New Named Query modal.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/agent-namedquery-create.png)
8.  Click **Next** to validate your SOQL.
9.  If the Named Query API creator throws an error, correct your SOQL and click **Next** again.
10.  Enter a description for any parameters that you created. Provide enough detail for the agent to understand how to provide the parameter with a valid value. ![Screenshot of the parameter description field in the New Named Query modal.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/agent-namedquery-param.png)
11.  Click **Save**.

### Create Named Query APIs in VS Code

1.  In your `appName/main/default` directory, create a new folder for Named Query APIs.
2.  In the new folder, create a file with metadata for your named query.
3.  Name the file using the format `<NamedQueryAPIName>.apiNamedQuery-meta.xml`, and then save the file.
    
    The API name must begin with a letter. It also must contain only alpha-numeric characters.
    
4.  Deploy the metadata file to your target org. The following options are supported deployment methods.
5.  Use the Salesforce CLI `deploy` command. For example: `sf project deploy start -o <TargetOrg>`, where `<TargetOrg>` is the username or alias of the target org.
6.  Inside your metadata file, right click to open a list of SFDX commands. Select **SFDX: Deploy This Source to Org**.

Here's an example of a valid `apiNamedQuery-meta.xml` file. Your file must include the following elements:

-   Label (`<masterLabel>`)
-   Description (`<description>`)
-   SOQL statement for the Named Query API (`<body2>`)

```xml


  
    Name of this account
    ApiNamedQueryParameterLabel
    name
  
  64.0
  SELECT Id, Name, NumberOfEmployees FROM Account WHERE Name = :name
   Get id, name, and annual revenue from Account entity filtered by name
  Get Account Details

```

The `ApiNamedQuery` and `ApiNamedQueryParameter` objects are supported for use with the Metadata API (Retrieve and Deploy).

### Supported SOQL Syntax

Named Query API execution logic supports the use of parameters only within these SOQL Language features:

-   WHERE clause:
    -   Simple expressions
        -   `name = :name`
    -   Logical operators and parentheses
        -   `AND`, `OR`, `NOT`
-   LIMIT clause
    -   If the LIMIT clause in the top-level query has a colon parameter, it must be named `maxrecords`. For example: `SELECT Name FROM Account LIMIT :maxrecords`

Parameters are **not** supported within the following features. These features can be used in a Named Query API as long as they do not contain a parameter reference.

-   WHERE clause:
    -   Calculated expression
        -   `totalRevenue - totalExpenses > :totalIncome`
    -   DISTANCE expression
        -   `DISTANCE(Location__c, GEOLOCATION(37.775,-122.418), 'mi') < :dist`
    -   INCLUDES expression
        -   `MSP1__c INCLUDES ('AAA;BBB','CCC')`
    -   IN expression
    -   IN colon expression
-   SELECT DISTANCE(...) expression
-   OFFSET clause
-   WITH clause

## View Named Query APIs in API Catalog

After you create a Named Query API, it's automatically displayed in **Setup** > [**API Catalog**](https://help.salesforce.com/s/articleView?id=platform.api_catalog_view_apis.htm&type=5). However, you have to manually activate Named Query API in the API Catalog before you can use it in creating Agent Actions. You don't have to activate it for use as a REST API.

## Modify Named Query APIs

In the beta version of this feature, you can edit existing Named Query APIs in the **Named query API** page in Setup.

To delete an existing Named Query API, in Setup, in the Quick Find box, enter `Named Query API`, and then select **Named Query API**. Select **Delete** next to the Named Query API you want to remove.

However, you can't delete a Named Query API if it's already activated for agent action use in the API Catalog. You must deactivate it in the API Catalog before you can delete it.

## Use Named Query APIs as Agent Actions

To access a Named Query API in Agent Creator, follow these steps.

1.  From Setup, in the Quick Find box, enter `assets`, and then select **Agentforce Assets**.
2.  Click **Actions** in the Agentforce Asset Library.
3.  Click **New Agent Action**.
4.  Select **API** from Reference Action Type.
5.  Select **Salesforce Named Query API (Beta)** from Reference Action Category.
6.  Select an action from Reference Action.

![Screenshot of the Create an Agent Action modal.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/agent-namedquery-agent.png)

> **Note:**
> 
> Users executing named queries must have read access to the data being queried.

## Use Named Query APIs as REST APIs

When you create a Named Query API, it’s also available as a REST API call. The name of a Named Query API defines the endpoint, while parameters appear as URI query parameters. For more information about using a Named Query API as a REST API call, see _Rest API Developer Guide_: [Named Query API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_named_query.htm).

If your org has the REST API OpenAPI Beta feature enabled, you can download an OpenAPI specification describing the REST API for any Named Query API endpoint that you've created. See the [OpenAPI Beta documentation](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/openapi_beta.htm) for details.