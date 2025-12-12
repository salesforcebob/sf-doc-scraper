# Customize an Agent That Doesn't Use Agent Script

> **Warning:**
> 
> This section describes the process of customizing agents that were created without using Agent Script as their blueprint. We generally don't recommend that you use this workflow anymore to create an agent. Instead, we recommend that you author agents that use the Agent Script language, which is the next-gen way of creating agents. To customize the agent, you then simply modify its Agent Script file. See [Author an Agent with Agentforce DX](/docs/einstein/genai/guide/agent-dx-nga-author-agent.html) and [Code Your Agent Using Its Script File](/docs/einstein/genai/guide/agent-dx-nga-script.html).

After you create a basic agent, customize it so that it does what you want. As always, you can use low-code builders or pro-code developer tools to develop the different parts of the agent.

## Determine What Customization You Need and Which Tool To Use

The main way you customize an agent is to add more topics and actions. Sometimes you can use an existing topic or action from your development org’s reference library. But at other times, to meet your specific business needs, you must create a custom topic or action.

This table lists the various customizations you can make to your agent, the best tool to use, and where to get more information.

| Customization Task | Best Tool | Related Documentation |
| :-- | :-- | :-- |
| Add a standard action from the reference library to an existing topic. | Use Agentforce Builder. | 
-   [Add an Action to a Topic](https://help.salesforce.com/s/articleView?id=ai.copilot_actions_add.htm&type=5)
-   [Standard Agent Action Reference](https://help.salesforce.com/s/articleView?id=ai.copilot_actions_ref.htm&type=5)

 |
| Create a custom action based on an Apex class, and then add it to an existing topic. | To help you code the Apex class, use VS Code with Agentforce Vibes Extension. To add it to a topic, use Agentforce Builder. | 

-   [Build Custom Actions using Apex REST](/docs/einstein/genai/guide/agent-apex.html).
-   [Apex Development with VS Code Salesforce Extensions](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/apex-overview.html)
-   [Agentforce Vibes Extension](https://developer.salesforce.com/docs/platform/einstein-for-devs/guide/einstein-overview.html)
-   [Create a Custom Action for Agents](https://help.salesforce.com/s/articleView?id=ai.copilot_actions_custom_create_scratch.htm&type=5)
-   [Add an Action to a Topic](https://help.salesforce.com/s/articleView?id=ai.copilot_actions_add.htm&type=5)

 |
| Create a custom action based on an autolaunched flow, and then add it to an existing topic. | To create the flow, use Flow Builder. To add it to a topic, use Agentforce Builder. | 

-   [About Flows and Flow Builder](https://help.salesforce.com/s/articleView?id=platform.automate_flow_about.htm&type=5)
-   [Create a Custom Action for Agents](https://help.salesforce.com/s/articleView?id=ai.copilot_actions_custom_create_scratch.htm&type=5)
-   [Add an Action to a Topic](https://help.salesforce.com/s/articleView?id=ai.copilot_actions_add.htm&type=5)

 |
| Create a custom action based on a prompt template, and then add it to an existing topic. | To create the prompt template, use Prompt Builder. To add it to a topic, use Agentforce Builder. | 

-   [Prompt Builder](https://help.salesforce.com/s/articleView?id=ai.prompt_builder_about.htm&type=5)
-   [Create a Custom Action for Agents](https://help.salesforce.com/s/articleView?id=ai.copilot_actions_custom_create_scratch.htm&type=5)
-   [Add an Action to a Topic](https://help.salesforce.com/s/articleView?id=ai.copilot_actions_add.htm&type=5)

 |
| Create a custom action based on an external service and then add it to an existing topic. | To create the external service, use Setup in your org. To add it to a topic, use Agentforce Builder. | 

-   [Use Agentforce to Invoke External Service Actions](https://help.salesforce.com/s/articleView?id=platform.external_services_custom_agent_actions.htm&type=5)
-   [Create a Custom Action for Agents](https://help.salesforce.com/s/articleView?id=ai.copilot_actions_custom_create_scratch.htm&type=5)
-   [Add an Action to a Topic](https://help.salesforce.com/s/articleView?id=ai.copilot_actions_add.htm&type=5)

 |
| Add a topic from the asset library to your agent. | Use Agentforce Builder. | 

-   [Add a Topic from the Asset Library](https://help.salesforce.com/s/articleView?id=ai.copilot_topics_add_standard.htm&type=5)
-   [Standard Agent Topic Reference](https://help.salesforce.com/s/articleView?id=ai.copilot_topics_ref.htm&type=5)

 |
| Create a custom topic and add it to your agent. | Use Agentforce Builder. | 

-   [Create a Custom Topic](https://help.salesforce.com/s/articleView?id=ai.copilot_topics_add_custom.htm&type=5)

 |
| Update the agent settings, such as system messages, language settings, and agent versions. | 

-   (low-code) Use Agentforce Builder.
-   (pro-code) To edit the agent's metadata directly in your local Salesforce DX project, use VS Code.

 | 

-   [Set Up Your Agent (Agentforce Builder)](https://help.salesforce.com/s/articleView?id=ai.agent_parent_setup.htm&type=5)
-   [Agent Metadata: A Shallow Dive](/docs/einstein/genai/guide/agent-dx-metadata.html)

 |