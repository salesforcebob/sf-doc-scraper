# Create an Agent Without Using Agent Script

> **Warning:**
> 
> This section describes the process of creating agents _directly_ from an agent spec YAML file, rather than creating agents that use Agent Script as their blueprint. We generally don't recommend that you use this workflow anymore to create an agent. Instead, we recommend that you author agents that use the Agent Script language, which is the next-gen way of creating agents. See [Author an Agent with Agentforce DX](/docs/einstein/genai/guide/agent-dx-nga-author-agent.html).

Creating an agent directly with Agentforce DX is a two step-process; each step uses a Salesforce CLI command:

1.  `agent generate agent-spec`: [Generate an agent spec file](/docs/einstein/genai/guide/agent-dx-generate-agent-spec.html) in your Salesforce DX project. An agent spec is a YAML file that contains information about the agent.
2.  `agent create`: [Create the agent](/docs/einstein/genai/guide/agent-dx-create-agent-spec.html) in your development org, such as your sandbox. The create command takes the agent spec file as input. The command syncs the metadata back to your DX project.

After running these two commands, the resulting agent is quite basic; it’s more a _scaffold_ of an agent rather than a finished one. As with all software development, you then go through an iterative process to create a complete agent that you can activate for your users. Agentforce DX gets you started on this journey.

## See Also

-   [_Trailhead_: Agentforce Basics](https://trailhead.salesforce.com/content/learn/modules/einstein-copilot-basics)
-   [_Salesforce CLI Command Reference_: agent Commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_agent_commands_unified.htm)
-   [_Salesforce Help_: Design and Implement Agents](https://help.salesforce.com/s/articleView?id=sf.copilot_intro.htm&type=5)