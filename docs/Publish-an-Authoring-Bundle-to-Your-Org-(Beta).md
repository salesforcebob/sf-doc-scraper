# Publish an Authoring Bundle to Your Org (Beta)

Publishing an authoring bundle refers to using the Agent Script file to generate Bot and GenAi\* metadata, either the initial version of that metadata or new versions, which in turn results in either a new agent or a new version of an existing agent. You can then test this published agent, and later deploy it to your production org so you can activate it and make it available to your users. Publishing an agent is the pro-code equivalent of using the **Commit Version** button in your org's Agentforce Builder UI.

Let's drill down into what exactly happens when you publish an authoring bundle.

-   The Agent Script file is first validated to ensure that it successfully compiles. If there are compilation errors, you must fix the Agent Script file before you can continue.
-   When the Agent Script file successfully compiles, it's published to your org, which in turn creates the new [associated metadata](/docs/einstein/genai/guide/agent-dx-metadata.html) (`Bot`, `BotVersion`, and `GenAiXX`), or new versions of the metadata if the agent already exists in the org.
-   The new or changed agent metadata is retrieved back to your DX project.
-   The `<target>` element in the local authoring bundle's `*.bundle-meta.xml` metadata file is populated with information about the agent metadata (`Bot` and `BotVersion`)–this is how an authoring bundle maps to its agent. Then the authoring bundle metadata component (`AiAuthoringBundle`) is deployed to your org.

The publish also creates a new version of the authoring bundle in your org. But it doesn't retrieve it back to your DX project. If you want all versions of your authoring bundle in your DX project, you must explicitly retrieve them as described below. After retrieving versioned authoring bundles, you can easily identify them because they have a version number appended to their directory (`My_Bundle_1`) in your package directory, and their `*-bundle-meta.xml` file contain the `<target>` element. Unversioned bundles are considered _draft_; you can publish only draft authoring bundles. You get an error if you try to publish a non-draft (versioned) authoring bundle.

## Use VS Code to Publish an Authoring Bundle

1.  In VS Code, open your Salesforce DX project and be sure you've authorized your development org.
    
2.  If you made any local changes in your Salesforce DX project to Apex classes or flows that implement your agent actions, then deploy them to your org using the **SFDX: Deploy This Source to Org** command.
    
3.  Open the agent's `*.agent` file, which is located in the `aiAuthoringBundles/<API-name>` directory of your package directory, such as `force-app/main/default/aiAuthoringBundles/My_Bundle/My_Bundle.agent`.
    
4.  Right-click inside the `*.agent` file and run the **AFDX: Publish this Agent** command.
    
    You can also run this command from the Command Palette or from the file explorer by right-clicking the `*.agent` file in your agent's authoring bundle.
    
    If the publish succeeds, you get a success message and your DX project and development org are synced with all the new or updated agent metadata. You can also now see your agent, or a new version of your agent, in the Agentforce Builder UI in your org.
    
5.  If you want your DX project to contain all versions of an authoring bundle, retrieve them using a wildcard (`*`). For example, to retrieve all versions of the `My_Bundle` authoring bundle, run this command in the VS Code integrated terminal:
    

## Use a CLI Command to Publish an Authoring Bundle

1.  Open a terminal (macOS/Linux) or command prompt (Windows) and change to your Salesforce DX project. Be sure you've authorized your development org.
    
    You can also run CLI commands from VS Code's integrated terminal.
    
2.  If you made any local changes in your Salesforce DX project to Apex classes or flows that implement your agent actions, then deploy them to your org using the `project deploy start` command. For example, to deploy Apex classes, use this command:
    
3.  Run this command:
    
    The command displays a list of authoring bundle API names it found in the DX project and prompts you to choose the one you want to publish.
    
    If you haven't set a default org in your project, use the `--target-org` flag to specify the org's username or alias.
    
    If the publish succeeds, you get a success message and your DX project and development org are synced with all the new or updated agent metadata. You can also now see your agent, or a new version of your agent, in the Agentforce Builder UI in your org.
    
4.  If you want your DX project to contain all versions of an authoring bundle, retrieve them using a wildcard (`*`). For example, to retrieve all versions of the `My_Bundle` authoring bundle, run this command:
    

## Next Steps

-   [Connect to a Published Agent](/docs/einstein/genai/guide/agent-dx-preview.html)
-   [Test an Agent with Agentforce DX](/docs/einstein/genai/guide/agent-dx-test.html)
-   [Manage an Agent with Agentforce DX](/docs/einstein/genai/guide/agent-dx-manage.html)

## See Also

-   [Agent Metadata: A Shallow Dive](/docs/einstein/genai/guide/agent-dx-metadata.html)
-   [_Salesforce CLI Command Reference_: agent Commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_agent_commands_unified.htm)
-   [_Salesforce CLI Command Reference_: project Commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_project_commands_unified.htm)