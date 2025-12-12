# Agent Metadata: A Shallow Dive

Knowing the basic metadata types associated with agents is helpful as you develop them.

## Authoring Bundle Metadata

An authoring bundle contains the blueprint of an agent. An authoring bundle is represented by the `AiAuthoringBundle` metadata type and is stored in the `aiAuthoringBundles/<bundle-api-name>` directory of your DX project's package directory, such as `force-app/main/default/aiAuthoringBundles/My_Bundle`.

The `AiAuthoringBundle` metadata type consists of two parts:

-   `<bundle-api-name>.bundle-meta.xml`: Standard Metadata API XML file.
-   `<bundle-api-name>.agent` : File that uses the [Agent Script language](/docs/einstein/genai/guide/agent-script.html) to define the predictable, context-aware workflows for your agent. Agent Script is the language underlying the new generation of Agentforce agents.

If you're familiar with Apex and how it's represented by metadata, you might notice that `AiAuthoringBundle` is similar in structure to `ApexClass`. Apex classes are represented by these two files:

-   `<apex-class-name>.cls-meta.xml`: Standard Metadata API XML file.
-   `<apex-class-name>.cls`: File that contains the Apex class code.

See [AiAuthoringBundle](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_aiauthoringbundle.htm) for details about this metadata type.

## Agent Metadata

When you finish coding your authoring bundle and you think it's ready to go, you publish it to your org, which creates the actual agent. Agents are made of metadata, just like any other Salesforce customization. But a single agent is a collection of multiple metadata components linked together. This simple graphic shows the major metadata types:

![Agent metadata hierarchy](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/bot-agent-metadata.png)

-   [Bot](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_bot.htm): A Bot is the top-level representation of an [Einstein Bot](https://help.salesforce.com/s/articleView?id=service.bots_service_whats_a_bot.htm&type=5), or _chatbot_, which is a basic computer program that conducts a conversation via auditory or textual methods.
    
-   [BotVersion](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_botversion.htm): A BotVersion represents the configuration for a specific Einstein Bot version. A single Einstein Bot can have many versions, but only one version can be active.
    
-   [GenAiPlannerBundle](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_genaiplannerbundle.htm) is a reasoning engine for agents. It uses a large language model (LLM) and a reasoning strategy to break down a task into smaller parts, find the best actions for each part, and use them. An agent has a single GenAiPlannerBundle component.
    
    Bot and BotVersion components together define simple chatbots. But when you add a GenAiPlannerBundle, the chatbot becomes an agent!
    
-   [GenAiPlugin](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_genaiplugin.htm): Represents an agent topic, which is a category of actions related to a particular job to be done by the agent. An agent can have multiple GenAiPlugin components.
    
-   [GenAiFunction](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_genaifunction.htm): Represents an agent action. An agent can have multiple GenAiFunction components.
    

There are other GenAi metadata types that can be associated with your agent, such as [GenAiPromptTemplate](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_genaiprompttemplate.htm), which represents a prompt template. This guide doesn’t dive deeply into all the metadata. It only provides a simple overview to get you started.

In your DX project, agent metadata is stored in a package directory just like other Salesforce metadata. In this screenshot of VS Code, the DX project is called `agentforcedx` and the agent metadata is stored in the default `force-app` package directory.

![VS Code showing agent metadata in "force-app" package directory in the left explorer panel and an open GenAiPlannerBundle XML file in the right editor panel. ](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-agent-md-vscode-2.png)

## See Also

-   [_Metadata API Developer Guide_](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_intro.htm)
-   [Get Started with Agent Script](/docs/einstein/genai/guide/agent-script.html)
-   [Generate an Authoring Bundle](/docs/einstein/genai/guide/agent-dx-nga-authbundle.html)