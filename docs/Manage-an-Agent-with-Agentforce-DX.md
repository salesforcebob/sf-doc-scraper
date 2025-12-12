# Manage an Agent with Agentforce DX

You can activate or deactivate an agent right from VS Code or with a CLI command. For more complicated agent management, you can easily open the agent in the Agentforce Builder UI and manage it from there.

## Activate or Deactivate an Agent

Activating an agent makes it immediately available to your users. To make changes to an agent, such as adding or removing topics or actions, deactivate it. Some of the Agentforce DX features, such as the `agent preview` CLI command or VS Code Agent Preview panel, require active agents.

### Use VS Code Commands

1.  In VS Code, open your Salesforce DX project.
    
2.  In Explorer, navigate in your package directory to one of the metadata component files that makes up your agent:
    
    -   Bot (file extension `.bot-meta.xml` in the `bots` directory)
    -   BotVersion (file extension `.botVersion-meta.xml` in the `bots` directory)
3.  Right-click the metadata component file and select **AFDX: Activate Agent** or **AFDX: Deactivate Agent**. ![VS Code genAiPlannerBundle MD file open and commands to activate or deactivate the agent from a right-click.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-activate-agent-2.png)
    

### Use CLI Commands

1.  Open a terminal (macOS, Linux) or command prompt (Windows). Or use the integrated terminal in VS Code.
    
2.  Run the `agent activate` command to activate an agent in your org; specify the `--target-org` flag if you haven't set the org as your default. For example:
    
    The command displays the agents that are currently inactive. Use the arrow keys to select the agent you want to activate, then press Return. If you know the API name of your agent, you can use the `--api-name` flag to immediately activate it without being prompted.
    
3.  Run the `agent deactivate` command in a similar way to deactivate active agents.
    

## Open an Agent in Agentforce Builder

Sometimes you want to see an agent in the org's Agentforce Builder UI so you can use an in-org feature. It's easy to open your agent in a browser directly in the Agentforce Builder UI from either VS Code or with a CLI command.

### Use VS Code Commands

1.  In VS Code, open your Salesforce DX project.
    
2.  In Explorer, navigate in your package directory to one of the metadata component files that makes up your agent:
    
    -   Bot (file extension `.bot-meta.xml` in the `bots` directory)
    -   BotVersion (file extension `.botVersion-meta.xml` in the `bots` directory)
    -   GenAiPlannerBundle (file extension `.genAiPlannerBundle` in the `genAiPlannerBundles` directory)
3.  Right-click the metadata component file and select **AFDX: Open Agent in Default Org**. See [Activate or Deactivate and Agent](/docs/einstein/genai/guide/agent-dx-manage.html#activate-or-deactivate-an-agent) for a screenshot.
    
    The Agentforce Builder UI opens for your agent.
    

### Use CLI Commands

You must know the API name of your agent before you can open it in Agentforce Builder with a CLI command.

1.  If necessary, find your agent's API name:
    
    -   If your agent uses an Agent Script file as its blueprint, then the agent's API name is the `developer_name` property in the file's `config` block.
        
    -   If your agent doesn't use Agent Script, then find its API name in the Agent Details page of your org's Agentforce Studio UI in Setup.
        
        ![Agent Details page in org's Setup showing the API name of an agent.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-agent-api-name.png)
        
2.  Open a terminal (macOS, Linux) or command prompt (Windows). Or use the integrated terminal in VS Code.
    
3.  Run the `org open agent` CLI command, specifying the required `--api-name` flag. Also specify `--target-org` if you haven't set your org as a default. For example:
    
    Use the `--private` flag to open your agent in incognito mode. The agent uses your default browser, but you can change that with the `--browser` flag.