# Create an Agent Test from the Spec File

After you have a test spec file that you like, it’s time to create the test in your development org.

## Preview the Agent Test Without Updating Your Development Org

Before updating your development org with the new agent test, let’s first preview what it looks like when deployed to your org by generating a local AiEvaluationDefinition metadata XML file.

From the VS Code integrated terminal, run this command:

```bash
sf agent test create --preview --target-org {dev-org-username-or-alias}
```

Replace this value:

-   `{dev-org-username-or-alias}` : Username or alias of your org.

If you’ve set a default org in your DX project, such as your sandbox, don’t specify `--target-org`. You can also run this command from your DX project by using a terminal (macOS, Linux) or command prompt (Windows).

The `agent test create --preview` command prompts you to enter an API name for the new test. Be sure that you specify a name that doesn’t exist in your org. You’re then prompted to select the agent spec file from the ones available in your DX project.

When the command finishes, it makes a preview metadata XML file in the current directory for the new AiEvaluationDefinition component. This component represents an agent test in your org. The file is called `{Test_Api_name}-preview-{timestamp}.xml`. If the file looks good to you, it’s time to create the agent test in your org.

## Create Agent Tests In Your Development Org

Run the `agent test create` command you used to preview the test, but don’t specify `--preview`.

```bash
sf agent test create --target-org {dev-org-username-or-alias}
```

Replace this value:

-   `{dev-org-username-or-alias}` : Username or alias of your org.

As with previewing, the command prompts you for the API name of your new test and the test spec file that you want to use. If you prefer, you can also pass these values by using the `--spec` and `--api-name` flags.

The command then displays the execution stages, such as creating local metadata and deploying to the development org. After the command finishes executing, your org is updated with the new agent test. Your local DX project is also synchronized with the associated metadata file (AiEvaluationDefinition) in the package directory.

To view the deployed test in the Testing Center UI of your development org, open the UI in a browser.

```bash
sf org open --path /lightning/setup/TestingCenter/home --target-org {dev-org-username-or-alias}
```

## See Also

-   [_Salesforce CLI Command Reference_: agent Commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_agent_commands_unified.htm)
-   [_Salesforce Extensions for Visual Studio Code_](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide)
-   [_Salesforce Help_: Agentforce Testing Center](https://help.salesforce.com/s/articleView?id=ai.agent_testing_center.htm&type=5)