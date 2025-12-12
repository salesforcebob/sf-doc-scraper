# Author an Agent with Agentforce DX (Beta)

Authoring an agent refers to generating and coding its Agent Script file and then publishing it to your development org. You then test the agent in different environments to make sure it works as you expect, and eventually deploy it to your production org and activate it so your customers can use it.

But what's Agent Script, you might ask? It's the foundation of the next generation of Agentforce agents. Agent Script is a language that combines the flexibility of using natural language to vibe code, with the reliability of programmatic expressions for handling business rules. Agent Script gives you all the advantages of access to a large language model (LLM), while also providing ways to add more deterministic behaviors to your agent.

As with most things Salesforce, an agent's Agent Script file is part of a metadata component called `AiAuthoringBundle`, or simply _authoring bundle_. You can generate the authoring bundle from scratch in your Salesforce DX project. Or you can first create an agent in your org using Agentforce Builder and then retrieve the authoring bundle to your DX project. Inside the authoring bundle is a file with extension `.agent`; this is the Agent Script file which fully describes the agent and serves as its blueprint. Both workflows are described in this topic, with links to other topics that contain details about each step.

> **Tip:**
> 
> Have you set up your environment, in particular [created a Salesforce DX project](/docs/einstein/genai/guide/agent-dx-set-up-env.html#create-a-salesforce-dx-project) and [authorized your development org](/docs/einstein/genai/guide/agent-dx-set-up-env.html#authorize-your-sandbox-or-developer-edition-org), as required for authoring an agent? See [Set Up Your Development Environment](/docs/einstein/genai/guide/agent-dx-set-up-env.html) for more setup topics.

## Workflow For Authoring a New Agent

This graphic shows the high-level workflow for authoring a new agent from scratch in your Salesforce DX project and then publishing it to your org.

![Graphic showing workflow for authoring a new agent.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-nga-create-workflow.png)

Here's more information about each workflow step.

1.  Create an agent spec YAML file by running the `agent generate agent-spec` CLI command in your Salesforce DX project. The agent spec is a simple YAML file that captures the basic essence of what an agent can do.
    
    See [Generate an Agent Spec File](/docs/einstein/genai/guide/agent-dx-generate-agent-spec.html).
    
2.  Generate an authoring bundle based on the agent spec file. You can use VS Code or the `agent generate authoring-bundle` CLI command to generate the authoring bundle.
    
    See [Generate an Authoring Bundle](/docs/einstein/genai/guide/agent-dx-nga-authbundle.html).
    
    You can also immediately [create an agent](/docs/einstein/genai/guide/agent-dx-create-agent.html) without using Agent Script as its blueprint; this step is marked with **(A)** in the workflow above. However, we recommend that you don't follow that path, because Agent Script-based agents are more flexible and easier to modify and maintain. This is why the workflow graphic shows the step with a dotted line.
    
3.  In VS Code, code the functionality of your agent by updating its Agent Script file, either directly in the editor or using Agentforce Vibes. Agentforce DX fully supports the Agent Script language with standard code editing features such as syntax highlighting, linting, internal validation, and so on. As you code, validate the Agent Script file to ensure it compiles.
    
    See [Code Your Agent Using Its Script File](/docs/einstein/genai/guide/agent-dx-nga-script.html).
    
4.  As you code your Agent Script file, periodically preview how the resulting agent behaves and how it responds to your utterances. If you haven't yet implemented the agent actions, then the responses are simulated (mocked). This interactive testing helps you iterate over the development process. You can also use the Apex Replay Debugger while you preview.
    
    See [Preview and Debug an Agent](/docs/einstein/genai/guide/agent-dx-nga-preview.html).
    
5.  After you're satisfied with how the agent works, publish the authoring bundle to your org. This step automatically creates the underlying agent metadata and syncs the metadata between your DX project and your org. The agent is then ready to test.
    
    See [Publish an Authoring Bundle to Your Org](/docs/einstein/genai/guide/agent-dx-nga-publish.html).
    

## Workflow For Retrieving and Modifying an Existing Agent

This graphic shows the high-level workflow if you first create an agent in your org using Agentforce Builder, and then want to continue developing it in your Salesforce DX project.

![Graphic showing workflow for authoring an existing agent.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-nga-retrieve-workflow.png)

Here's more information about each workflow step.

1.  Create your agent in Agentforce Builder. Be sure you use the [new builder that creates an Agent Script file](https://help.salesforce.com/s/articleView?id=ai.agent_builder_intro.htm&type=5) for the agent, and not the Legacy Agentforce Builder.
    
    See [Create an Agent](https://help.salesforce.com/s/articleView?id=ai.agent_setup_create.htm&type=5).
    
2.  Using the VS Code integrated terminal, retrieve all authoring bundles to your Salesforce DX project by running this CLI command from your DX project:
    
    The authoring bundles are retrieved to the `aiAuthoringbundles` directory in your DX project package directory. If you know the API name of a specific authoring bundle, you can retrieve it and all its version by specifying `--metadata "AiAuthoringBundle:Local_Info_Agent*"`.
    
    See [Agent Metadata: A Shallow Dive](/docs/einstein/genai/guide/agent-dx-metadata.html) and [Synchronize Your Development Org with Your DX Project](/docs/einstein/genai/guide/agent-dx-synch.html).
    
3.  In VS Code, code the functionality of your agent by updating its Agent Script file, either directly in the editor or using Agentforce Vibes. Agentforce DX fully supports the Agent Script language with standard code editing features such as syntax highlighting, linting, internal validation, and so on. As you code, validate the Agent Script file to ensure it compiles.
    
    See [Code Your Agent Using Its Script File](/docs/einstein/genai/guide/agent-dx-nga-script.html).
    
4.  As you code your Agent Script file, periodically preview how the resulting agent behaves and how it responds to your utterances. If you haven't yet implemented the agent actions, then the responses are simulated (mocked). This interactive testing helps you iterate over the development process. You can also use the Apex Replay Debugger while you preview.
    
    See [Preview and Debug an Agent](/docs/einstein/genai/guide/agent-dx-nga-preview.html).
    
5.  After you're satisfied with how the agent works, publish the authoring bundle to your org. This step automatically creates the underlying agent metadata and syncs the metadata between your DX project and your org. The agent is then ready to test.
    
    See [Publish an Authoring Bundle to Your Org](/docs/einstein/genai/guide/agent-dx-nga-publish.html).
    

## See Also

-   [_Salesforce Help_: Design and Implement Agents](https://help.salesforce.com/s/articleView?id=ai.copilot_intro.htm&type=5)
-   [_Salesforce Help_: Build Enterprise-Ready Agents with Agentforce Builder](https://help.salesforce.com/s/articleView?id=ai.agent_builder_intro.htm&type=5)
-   [_Trailhead_: Agentforce Basics](https://trailhead.salesforce.com/content/learn/modules/einstein-copilot-basics)