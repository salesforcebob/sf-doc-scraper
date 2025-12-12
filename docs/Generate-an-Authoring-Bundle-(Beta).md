# Generate an Authoring Bundle (Beta)

An important step in authoring an agent from scratch in your DX project is to generate its authoring bundle. An authoring bundle defines the blueprint for an agent. Specifically, authoring bundles are metadata types (named `AiAuthoringBundle`) that contain the agent's Agent Script file. The Agent Script file has the extension `.agent` and is written using the [Agent Script language](/docs/einstein/genai/guide/agent-script.html). See [Authoring Bundle Metadata](/docs/einstein/genai/guide/agent-dx-metadata.html#authoring-bundle-metadata) for more details about this metadata type.

While not necessary, we recommend that you first generate an agent spec YAML file before you generate an authoring bundle. See [Generate an Agent Spec File](/docs/einstein/genai/guide/agent-dx-generate-agent-spec.html).

After you finish generating the authoring bundle, the new `*.agent` file contains basic Agent Script code to get you started. Some of the code is based on the agent spec YAML file.

## Use VS Code to Generate an Authoring Bundle

1.  In VS Code, open your Salesforce DX project and be sure you've authorized your development org.
    
2.  From the Command Palette, run the **AFDX: Generate Authoring Bundle** command.
    
    You can also run this command by right-clicking the `aiAuthoringBundles` directory in your package directory, if it already exists in your DX project.
    
3.  Enter the name (label) of your new authoring bundle.
    
    The authoring bundle's API name is derived from the label. For example, if you enter `My Bundle`, then its API name is `My_Bundle`.
    
4.  Select an agent spec YAML file from the provided list. It's assumed that the agent spec files live in the `specs` directory of your DX project.
    

The authoring bundle is generated in the `aiAuthoringBundles/<API-name>` directory of your package directory, such as `force-app/main/default/aiAuthoringBundles/My_Bundle`. The directory contains the `My_Bundle.agent` and `My_Bundle.bundle-meta.xml` files.

## Use a CLI Command to Generate an Authoring Bundle

1.  Open a terminal (macOS/Linux) or command prompt (Windows) and change to your Salesforce DX project. Be sure you've authorized your development org.
    
    You can also run CLI commands from VS Code's integrated terminal.
    
2.  Run this command:
    
    The command prompts you to choose an agent spec YAML from a list it found in the `specs` directory. It then prompts for the name (label) and API name for the new authoring bundle. You can also specify these values with the `--spec`, `--name`, and `--api-name` flags.
    
    If you haven't set a default org in your project, use the `--target-org` flag to specify the org's username or alias.
    

The authoring bundle is generated in the `aiAuthoringBundles/<API-name>` directory of your package directory, such as `force-app/main/default/aiAuthoringBundles/My_Bundle`. The directory contains the `My_Bundle.agent` and `My_Bundle.bundle-meta.xml` files.

## Next Step

-   [Code Your Agent Using Its Script File](/docs/einstein/genai/guide/agent-dx-nga-script.html)

## See Also

-   [Set Up Your Development Environment for Agentforce DX](/docs/einstein/genai/guide/agent-dx-set-up-env.html)
-   [Generate an Agent Spec File](/docs/einstein/genai/guide/agent-dx-generate-agent-spec.html)
-   [Agent Metadata: A Shallow Dive](/docs/einstein/genai/guide/agent-dx-metadata.html)
-   [_Salesforce CLI Command Reference_: agent Commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_agent_commands_unified.htm)