# Agentforce Metadata Types

Manage actions and customize the planner service using the [Metadata API](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_intro.htm).

![Agent metadata hierarchy](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/bot-agent-metadata.png)

## Metadata Types

-   [AiAuthoringBundle](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_aiauthoringbundle.htm): Represents an AI authoring bundle, which is a container for AI-related authoring content. For example, an AI authoring bundle for an Agentforce agent contains an [Agent Script](/docs/einstein/genai/guide/agent-script.html) file and the associated metadata content.
    -   `target`: To commit an agent version, the `target` field must specify the `developerName` for the [Bot](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_bot.htm) and [BotVersion](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_botversion.htm) components, separated by a period: `{Bot}.{BotVersion}`. For example, `Agentforce_Service_Agent.v2`. These two components tie the AI authoring bundle to a specific agent and a specific agent version.
-   [Bot](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_bot.htm): The top-level representation of an [Einstein Bot](https://help.salesforce.com/s/articleView?id=service.bots_service_whats_a_bot.htm&type=5) or an [Agentforce Agent](https://help.salesforce.com/s/articleView?id=ai.copilot_overview.htm&type=5).
    -   `localMlDomain.name`: Agent name.
    -   `type`: Agent type.
    -   `description`: Agent description.
    -   [`ConversationContextVariable`](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_bot.htm#ConversationContextVariable): A context variable local to the current bot or agent version.
-   [BotVersion](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_botversion.htm): A BotVersion represents the configuration for a specific bot or agent version. A single Einstein Bot or Agentforce Agent can have many versions, but only one version can be active.
    -   [ConversationVariable](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_botversion.htm#ConversationVariable): A container that stores a specific piece of data collected from the customer. You can use variables within actions as both inputs and outputs.
-   [GenAiFunction](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_genaifunction.htm): Represents an action that can be added to agents. Action input and output variables are located in `schema.json` for each action's input and output folders, or in `schema.json` in the `localActions` folder of `genAIPlannerBundle`.
-   [GenAiPlannerBundle](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_genaiplannerbundle.htm) represents a planner for an agent or agent template. It’s a container for all the topics and actions used to interact with a large language model (LLM). An agent has a single GenAiPlannerBundle component. A `GenAIPlannerBundle` file contains the Agentforce Builder Agent-Topic Map for a specific agent.
    -   `GenAiPluginInstructionDef`: Topic instructions.
-   [GenAiPlugin](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_genaiplugin.htm): Represents an agent topic, which is a category of actions related to a particular job to be done by the agent. An agent can have multiple GenAiPlugin components.
    -   `developerName`: Topic API name.

## See Also

-   [Agentforce DX](/docs/einstein/genai/guide/agent-dx.html) for instructions on how to manage agents using pro-code tools.