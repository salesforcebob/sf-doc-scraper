# Synchronize Your Development Org with Your DX Project

Whether you use pro-code or low-code tools to modify your agent, you always want to keep your development org and your Salesforce DX project synchronized. Agents are made of metadata, just like any other Salesforce customization, so you use the standard Salesforce DX CLI commands to retrieve, deploy, and delete agents.

For example, if your development org is enabled for source tracking, and you change an agent in your org, use these standard CLI commands to first check for changes and then retrieve them to your DX project.

```bash
sf project retrieve preview --target-org my-dev-org
sf project retrieve start --target-org my-dev-org
```

If your development org isn’t enabled for source tracking, you must specify the specific metadata component that you want to retrieve; for example, to retrieve all Apex classes:

```bash
sf project retrieve start --metadata ApexClass --target-org my-dev-org
```

Deploying is similar, except you use the `project deploy` commands:

```bash
sf project deploy preview --target-org my-dev-org
sf project deploy start --target-org my-dev-org
```

In VS Code, use the **SFDX: Deploy This Source to Org** or **SFDX: Retrieve This Source from Org** commands.

Agents, however, are a little more complex than standard metadata types because they're made up of _multiple_ types linked together, as described in [Agent Metadata: A Shallow Dive](/docs/einstein/genai/guide/agent-dx-metadata.html). To make it easier to deploy, retrieve, and delete agents when your org doesn’t use source tracking, use the “pseudo” metadata type called `Agent`. `Agent` isn’t a real metadata type; it’s just a shorthand way to tell the relevant CLI commands to work on all the metadata components that make up the agent. The syntax is `Agent:Agent_API_Name`.

Agents that use Agent Script as their underlying blueprint use the `AiAuthoringBundle` metadata type to store their Agent Script file.

## Retrieve Agent Metadata Components

Let’s start with retrieving. Imagine you used Agentforce Builder in your development org to modify the properties of an existing agent whose API name is `Resort_Manager`. Your org doesn’t use source tracking. Now you want to retrieve those changes back to your DX project. Use the `project retrieve start` CLI command and specify the `Agent` pseudo metadata type with the `--metadata` flag. Run this command from the VS Code integrated terminal or by using a terminal (macOS, Linux) or command prompt (Windows) from your DX project:

```bash
sf project retrieve start --metadata Agent:Resort_Manager --target-org my-dev-org
```

In addition to the agent metadata (`Bot`, `BotVersion`, and `GenAIXXX`), the command also retrieves Apex classes and flows that implement any of the agent actions.

This command retrieves the `Resort_Manager` authoring bundle:

```bash
sf project retrieve start --metadata AiAuthoringBundle:Resort_Manager --target-org my-dev-org
```

## Deploy Agent Metadata Components

To deploy local metadata associated with the same agent back to the org, run this command:

```bash
sf project deploy start --metadata Agent:Resort_Manager --target-org my-dev-org
```

The command deploys the agent metadata (`Bot`, `BotVersion`, and `GenAiXXX`), but not the Apex classes or flows that implement the agent actions.

This command deploys the `Resort_Manager` authoring bundle:

```bash
sf project deploy start --metadata AiAuthoringBundle:Resort_Manager --target-org my-dev-org
```

## Delete Agent Metadata Components

Next let’s look at deleting. If you tried to create an agent and it was only partly created in the development org, use the `delete` command to clean up everything, both in your org and in your DX project. You can also use this command to delete an inactive agent in your org.

```bash
sf project delete source --metadata Agent:Resort_Manager --target-org my-dev-org
```

The command prompts you before it deletes anything. If you confirm, it then deletes only the agent metadata (`Bot`, `BotVersion`, and `GenAiXXX`); it doesn't delete any Apex classes or flows that implement the agent actions.

This command deletes the `Resort_Manager` authoring bundle:

```bash
sf project delete source --metadata AiAuthoringBundle:Resort_Manager --target-org my-dev-org
```

## See Also

-   [_Salesforce CLI Command Reference_: project Commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_project_commands_unified.htm)
-   [Agent Metadata](/docs/einstein/genai/guide/agent-dx-metadata.html)