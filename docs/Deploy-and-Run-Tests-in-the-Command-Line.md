# Deploy and Run Tests in the Command Line

This topic outlines how to use the Testing API directly in the command line with the [Agentforce Vibes Extension](https://developer.salesforce.com/docs/platform/einstein-for-devs/guide/einstein-overview.html) and [Agentforce DX](/docs/einstein/genai/guide/agent-dx.html) extensions.

## Prerequisites

See the [Testing API workflow diagram](/docs/einstein/genai/guide/testing-api-get-started.html#testing-api-workflow) for basic overview of how you can use the Testing API.

For guidance on creating a project or authorizing your org in VS Code, see [Create Project](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/create-project.html).

Complete the required setup steps for the Testing API:

-   Create an [External Client App](/docs/einstein/genai/guide/testing-api-connect.html#create-a-salesforce-app).
-   Turn on Agents, and have at least one active Agent. The API name for Agentforce (Default) is `Copilot_for_Salesforce`.

## Deploy Test Case Metadata

> **Note:**
> 
> For sample aiEvaluationDefinition XML, see [Build Tests in Metadata API](/docs/einstein/genai/guide/testing-api-build-tests.html).

To deploy the test definition to your org in the CLI, use the `project deploy start` command. For more information, see [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_project_commands_unified.htm#cli_reference_project_deploy_start_unified).

```text
sf project deploy start
```

You can also deploy your test case with the [Command Palette](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/vscode-commands.html?q=command%20palette) using `SFDX: Deploy This Source to Org`.

## Run Tests With Agentforce DX

You can run tests in the command line with Agentforce DX using the `agent test run` command. To run tests with Agentforce DX, you'll need the API name of the agent you want to test as well as your development org.

```text
sf agent test run --api-name Resort_Manager_Test --target-org my-dev-org
```

For more information on running tests via the CLI, see [Run Agent Tests with Agentforce DX](/docs/einstein/genai/guide/agent-dx-test-run.html).

## View Test Results

You can call Connect API endpoints via Agentforce DX with the `api request rest` command.

```text
sf api request rest services/data/v63.0/einstein/ai-evaluations/runs/4KBSM00000000Xt4AI/results
```

Replace the runId in the example command to call the Get Test Results endpoint.