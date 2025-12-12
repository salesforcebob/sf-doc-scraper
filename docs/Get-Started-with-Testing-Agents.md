# Get Started with Testing Agents

You can use several methods to test your agents. Choose the approach that best fits your workflow and technical requirements.

| Feature Name | Access Method | Test Definition Format | [Custom Evaluations Support](/docs/einstein/genai/guide/testing-api-custom-evaluation-criteria.html) | Description |
| --- | --- | --- | --- | --- |
| [**Testing Center**](https://help.salesforce.com/s/articleView?id=ai.agent_testing_center.htm) | UI | CSV | No | User interface in Salesforce org for creating and running tests. |
| [**Agentforce DX**](/docs/einstein/genai/guide/agent-dx-test.html) | Command Line | YAML | Yes | Salesforce CLI extension that provides agent testing capabilities. |
| [**Testing API**](/docs/einstein/genai/guide/testing-api-build-tests.html) | Code | XML | Yes | Direct API access using [Metadata API](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_types_list) and [Connect API](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/intro_what_is_chatter_connect.htm). |

This page provides guidance for developers using the Testing API or the Agentforce DX CLI. To learn about the Testing Center, see [Agentforce Testing Center](https://help.salesforce.com/s/articleView?id=ai.agent_testing_center.htm) in Salesforce Help.

## Prerequisites

To test agents, you must have Agentforce enabled with at least one agent active. See [Set up Agents](https://help.salesforce.com/s/articleView?id=sf.copilot_setup.htm) in Salesforce Help.

> **Note:**
> 
> Agent testing is available only in sandboxes. Note that running tests consumes requests and credits and can modify data.

## Testing API Workflow

This diagram shows the high-level workflow for creating, deploying, and running tests:

![API Flow](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/testing-api-workflow-steps.svg)

Each step in the workflow can be completed using multiple methods:

-   **Create Tests**: Build tests programmatically using Metadata API or Agentforce DX.
    -   For Metadata API, see [Build Tests in Metadata API](/docs/einstein/genai/guide/testing-api-build-tests.html).
    -   For Agentforce DX, see [Generate a Test Spec in Agentforce DX](/docs/einstein/genai/guide/agent-dx-test-spec.html).
-   **Deploy Tests**: Deploy tests using Metadata API or Agentforce DX.
    -   For Metadata API, see [Build Tests in Metadata API](/docs/einstein/genai/guide/testing-api-build-tests.html).
    -   For Agentforce DX, see [Create an Agent Test with Agentforce DX](/docs/einstein/genai/guide/agent-dx-test-create.html).
    -   For a walkthrough on deploying tests via the CLI (using both Testing API and Agentforce DX), see [Deploy and Run Tests in the Command Line](/docs/einstein/genai/guide/testing-api-cli.html).
-   **Run Tests**: Execute tests using Connect API or Agentforce DX.
    -   For Connect API, see [Run Tests in Connect API](/docs/einstein/genai/guide/testing-api-connect.html).
    -   For Agentforce DX, see [Run Agent Tests with Agentforce DX](/docs/einstein/genai/guide/agent-dx-test-run.html).
    -   For a walkthrough on running tests via the CLI (using both Testing API and Agentforce DX), see [Deploy and Run Tests in the Command Line](/docs/einstein/genai/guide/testing-api-cli.html).

## See Also

-   [Build Tests in Metadata API](/docs/einstein/genai/guide/testing-api-build-tests.html)
-   [Run Tests in Connect API](/docs/einstein/genai/guide/testing-api-connect.html)
-   [Test an Agent with Agentforce DX](/docs/einstein/genai/guide/agent-dx-test.html)
-   [Deploy and Run Tests in the Command Line](/docs/einstein/genai/guide/testing-api-cli.html)
-   _Salesforce Help_: [Agentforce Testing Center](https://help.salesforce.com/s/articleView?id=ai.agent_testing_center.htm)