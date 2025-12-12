# Connect to a Published Agent

After you've published and activated your agent, you can connect and chat with it as if you were one of your customers. It's another type of test. For example, you can check if the agent correctly uses a specific topic when asked a question. And then check if it invokes the appropriate action associated with that topic. You use natural language in these conversations, simulating how your customers interact with the agent after it's deployed.

There are two ways to connect to a published agent:

-   [Use the integrated Agent Preview pane.](/docs/einstein/genai/guide/agent-dx-preview.html#use-vs-code-agent-to-connect-to-a-published-agent)
-   [Run the `agent preview` Salesforce CLI command.](/docs/einstein/genai/guide/agent-dx-preview.html#use-a-cli-command-to-connect-to-a-published-agent-beta)

## Prerequisites to Connecting to a Published Agent

Before you can connect to a published agent with either a CLI command or in the VS Code Agent Preview pane, you must complete these steps.

1.  In the development org that contains the published agent you want to connect to, create a connected app as described in [Create a Connected App](/docs/einstein/genai/guide/agent-api-get-started.html#create-a-connected-app). As you go through that task, also complete these additional steps:
    
    1.  When specifying the connected app's Callback URL, also add this second callback URL on a new line: `http://localhost:1717/OauthRedirect`.
        
    2.  When adding the scopes to the connected app, also add `Manage user data via Web browsers (web)`.
        
    
    This screenshot highlights the additional required connected app settings:
    
    ![App Manager in the Setup UI showing additional required connected app settings.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-preview-connected-app.png)
    
2.  Add the connected app to your agent as described in [Add Connected App to Agent](/docs/einstein/genai/guide/agent-api-get-started.html#add-connected-app-to-agent).
    
3.  Copy your new connected app's consumer key (sometimes called _client id_) as described in [Obtain Credentials](/docs/einstein/genai/guide/agent-api-get-started.html#obtain-credentials).
    
4.  In VS Code's integrated terminal, run the `org login web` CLI command to authorize the development org that contains the agent you want to connect to.
    
    If you're already working with the development org on your computer, you probably already completed this step. For the purposes of this document, assume the username you used to log in to the org is `jdoe@example.com`.
    
5.  Link the new connected app (that you previously created) to your authenticated user by running the `org login web` CLI command again, but with flags that specify the required information to create the link. For example:
    
    Here's what these flags mean:
    
    -   The `--client-app` flag gives the link to the connected app a name; you can specify any string you want. You use this name later when you actually connect to the agent.
    -   The `--username` flag specifies the authenticated user for the org, or the one you authorized with the first `org login web` command.
    -   The `--client-id` flag specifies the connected app's consumer key that you copied in a previous step.
    -   The `--scopes` flag specifies the OAuth scopes that the `agent preview` command requires; these are the short names for the scopes that you already configured for the new connected app.
    
    1.  Press Enter to skip sharing the client secret.
    2.  In the browser that opens, log in to your development org using your org's username (such as `jdoe@example.com`).
    3.  Click **Allow**. When you see the Authentication Successful message, you can close the browser window.

## Use VS Code Agent To Connect to a Published Agent

Connect to your published agent using the integrated Agent Preview pane. To connect to a published agent, it must be active.

1.  Complete the [prerequisites](/docs/einstein/genai/guide/agent-dx-preview.html#prerequisites-to-connecting-to-a-published-agent) in the org that contains your agent.
2.  In VS Code, in the Activity Bar, click the **Agentforce DX** icon. The Agent Preview pane opens. ![VS Code showing the Agent Preview pane. The Agentforce DX icon in Activity bar and the Select Agent and chat box are all highlighted.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-agent-preview.png)
3.  In the **Select an agent..** drop-down, select the agent you want to converse with. Only active agents are listed.
4.  If you want to use the Apex Reply Debugger to debug issues with Apex classes, enable **Debug Mode**.
5.  In the chat window, start chatting with your agent by entering a statement, question, or command.
6.  To invoke the Apex Reply Debugger, set a breakpoint in the Apex class you want to debug. Then start chatting again. As soon as an agent action invokes that Apex class, the Apex Replay Debugger automatically starts, and you can debug as usual. See [Apex Replay Debugger](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/replay-debugger.html) for details.

## Use a CLI Command to Connect to a Published Agent (Beta)

> **Note:**
> 
> This feature is a pilot or beta service that is subject to the Beta Services Terms at [Agreements - Salesforce.com](https://www.salesforce.com/company/legal/agreements/) or a written Unified Pilot Agreement if executed by Customer, and applicable terms in the [Product Terms Directory](https://ptd.salesforce.com/?_ga=2.247987783.1372150065.1709219475-629000709.1639001992). Use of this pilot or beta service is at the Customer's sole discretion."

Connect to your published agent by running the `agent preview` Salesforce CLI command in VS Code. To connect to a published agent, it must be active.

1.  Complete the [prerequisites](/docs/einstein/genai/guide/agent-dx-preview.html#prerequisites-to-connecting-to-a-published-agent) in the org that contains your agent.
    
2.  In VS Code's integrated terminal, run the `agent preview` CLI command. Use the `--client-app` flag to specify the name of the link that you previously created to the connected app; in our example we called the link `agent-app`. Use the `--target-org` flag to specify the username or alias of your development org as usual.
    
    For example, to connect to an agent in the org with alias `my-org` and link to the new connected app using the name `agent-app`, run this command:
    
    The command first displays a list of active agents in the org; use the arrow keys to choose the one you want to connect to and press Return. The command then asks if you want to save the agent's responses and a transcript of the conversation, and in which directory to save them. You can also specify a directory when you run the command with the `--output-dir` flag. Specify the `--apex-debug` flag to optionally generate Apex debug log files in the output directory:
    
    To find the name of the link to your connected app to pass to the `--client-app` flag, run `org display` on your development org and see the Client Apps entry.
    
3.  At the `Start typing...` prompt, enter a statement, question, or command, then press Return. Your utterance displays on the right along with a timestamp. The agent then responds on the left.
    
4.  To exit the conversation, hit ESC or Control+C.
    

If you specified the `--apex-debug` flag, and a conversation message executes Apex code, then an Apex debug log file is written in the specified output directory. See [Debug Apex Code](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/apex-debugging.html) in the _Salesforce Extensions for Visual Studio Code_ guide for information about using these debug log files with the Apex Replay Debugger.

You can optionally use the `--api-name` flag if you know the API name of an active agent; the CLI command doesn't then ask you to choose an agent to connect to. Find your agent's API name in its Agent Details page of your org's Agentforce Builder UI in Setup.

![Agent Details page in org's Setup showing the API name of an agent.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-agent-api-name.png)

### Examine the Conversation Transcript and API Response

If you opt to save a record of a conversation with an agent, the `agent preview` command creates a directory with a timestamped name in the specified output directory in your DX project. It then creates these files.

-   `transcript.json`: A record of the conversation between you and the agent. Each message in the conversation has three properties: the role (either you the `user` or the API name of the agent), the content (either your utterance or the agent's response), and a timestamp. For example:
    
-   `response.json`: The full list of API messages from the agent in response to your utterances. Each message contains additional details, such as the type of response, its internal ID, and more. Here's the full API response from preceding conversation message example:
    
    The `agent preview` command uses the Agent API internally. For more details about the API responses, see the [documentation](/docs/einstein/genai/guide/agent-api.html) and [reference](/docs/einstein/genai/references/agent-api?meta=Summary). For example, the [InformMessage](/docs/einstein/genai/references/agent-api?meta=type%3AInformMessage) reference page provides more information about some of the JSON properties in the `response.json` file.