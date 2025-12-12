# Create a Non-Agent Script Agent From a Spec

> **Warning:**
> 
> This section describes the process of creating agents _directly_ from an agent spec YAML file, rather than creating agents that use Agent Script as their blueprint. We generally don't recommend that you use this workflow anymore to create an agent. Instead, we recommend that you author agents that use the Agent Script language, which is the next-gen way of creating agents. See [Author an Agent with Agentforce DX](/docs/einstein/genai/guide/agent-dx-nga-author-agent.html).

After you have an agent spec file that you like, it’s time to create the agent in your development org, such as your sandbox. Let’s say you want to create an agent with the name (label) **Resort Manager** and you previously generated its agent spec file using its default filename (`specs/agentSpec.yaml`).

## Preview the Agent Without Updating Your Development Org

Before actually updating your development org, let’s first preview what the agent will look like when created in the org. From VS Code’s integrated terminal, run this command:

```bash
sf agent create --spec specs/agentSpec.yaml --name "Resort Manager" --preview --target-org 
```

If you’ve set a default org in your DX project, such as your sandbox, you don’t need to specify `--target-org`. You can also run this command from your DX project using a terminal (macOS, Linux) or command prompt (Windows).

The command prompts you for the API name of the agent; we recommend you accept the default.

The command generates a JSON file with name `Resort_Manager_Preview_<timestamp>.json`. The JSON file describes the agent that the LLM will create, including suggested actions for each topic, instructions, and sample utterances.

If it all looks good to you, it’s time to create the agent in your org.

## Create the Agent in Your Development Org

From VS Code’s integrated terminal, run the same command you ran to preview the agent creation, but this time remove the `--preview` flag:

```bash
sf agent create --spec specs/agentSpec.yaml --name "Resort Manager" --target-org 
```

As before, the command prompts you for the new agent’s API name (in this case `Resort_Manager`); we recommend you accept the default.

The command then displays the steps that it performs, such as parsing the agent spec file, creating the agent in the development org, and retrieving the metadata that was created in the org back to the local DX project. Here’s partial sample output from the command:

```bash
 ────────── Creating Resort Manager Agent ──────────

 ✔ Parsing Agent spec 36ms
 ✔ Creating Agent in org 17.55s
 ✔ Retrieving Agent metadata 3ms

 Elapsed Time: 17.81s

Successfully created Resort Manager in epic.4bec8e502a0c@fakeorg.out.
```

Your development org has now been updated with the **Resort Manager** agent and your local DX project has been synchronized with all its associated metadata. Run this CLI command to open the new agent in your org’s Agentforce Builder UI:

```bash
sf org open agent --api-name Resort_Manager
```

The `--api-name` flag of `org open agent` uses the API name of an agent; to find an agent's API name, go to Setup in your org and navigate to the agent's details page.

Now that you’ve created a basic agent, it’s time to customize it and implement the details of what it can do.

## See Also

-   [_Salesforce CLI Command Reference_: agent Commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_agent_commands_unified.htm)
-   [_Salesforce Extensions for Visual Studio Code_](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide)