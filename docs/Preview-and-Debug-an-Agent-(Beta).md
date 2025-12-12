# Preview and Debug an Agent (Beta)

As you code your agent's Agent Script file, it's helpful to periodically converse with it to see how it responds to your statements, questions, and commands (_utterances_). These conversation previews serve as interactive tests to make sure the agent behaves as expected. When you preview an agent conversation, you get the behind-the-scenes details of how your agent is working, so it’s easier to identify unexpected behavior and improve your agent. View interaction details for current and past messages, which give you a high-level overview of your agent’s reasoning, accompanied by AI-generated explanations.

For example, you can check if the agent correctly uses a specific topic when asked a question. And then check if it invokes the appropriate action associated with that topic. You use natural language in these conversations, mimicking how your customers interact with the agent after you publish and activate it.

You can use these two modes when previewing an agent from its Agent Script file:

-   **Simulated mode** - This mode uses only the Agent Script file to converse, and it simulates (or mocks) all the actions so there’s no risk to the data in your org. This mode is particularly useful if the Apex classes, flows, or prompt templates that implement the actions aren't yet available. The LLM uses the information that you've added about the topics in the Agent Script file to simulate what the action does or how it responds.
-   **Live mode** - Uses the actual Apex classes, flows, prompt templates, and users in your development org to get the most accurate view of your agent’s performance. Because this is a live preview, if you've changed the Apex classes, flows, or prompt templates in your local DX project, then you must deploy them to your development org for the live preview to use them. Otherwise, the live preview uses what it finds in the org. You must also set the `default_agent_user` property in the Agent Script file to an actual user in your org. You can use the Apex Replay Debugger to debug your Apex classes when using live mode.

As you converse, you can view the exact JSON messages that are sent back and forth between the preview and the org. This information helps you understand exactly how your agent processes each conversation. The messages provide a detailed, step-by-step view of the agent's decision-making process, including:

-   How the agent interprets user utterances.
-   Which actions the agent selects and why.
-   API calls and data transformations.
-   Response generation and output formatting.

Use this tracer functionality to troubleshoot unexpected behavior, optimize agent performance, and gain insights into your agent's reasoning.

> **Warning:**
> 
> Agent preview using either VS Code or a CLI command doesn't provide strict adherence to connection endpoint configuration. Agent preview also doesn't support escalation. To test escalation, first publish your agent and then test it using the desired connection endpoint, such as a Web Page, SMS, and so on.

## Preview in VS Code

Use the integrated Agent Preview pane in VS code to have a conversation preview with your agent.

1.  In VS Code, in the Activity bar, open the Agentforce DX preview panel by clicking the **Agentforce DX** icon (![Agentforce DX icon.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-agentforce-dx-icon.png)) in the Activity Bar.
    
2.  From the **Select agent...** drop-down list, select an agent under the **Agent Script** heading.
    
    The list of agents you can preview is split into two sections: agents that have a local Agent Script file inside of an authoring bundle (heading is `Agent Script`) and agents that are published in the org (heading is `Published`). To connect to published agents, you must set up additional security. See [Connect to a Published Agent](/docs/einstein/genai/guide/agent-dx-preview.html).
    
3.  In the drop-down, select whether you want to run a **Simulation** or **Live Test**. After you pick one, the blue button changes in response, so you then click either **Start Simulation** or **Start Live Test** to actually start the preview.
    
    ![VS Code showing preview panel with Agentforce DX icon, simulated vs live mode drop down, and chat window.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-preview-nga-1.png)
    
    If you have an Agent Script file open in the editor, you can also right-click it and select **AFDX: Preview this Agent** to go directly to the correct preview pane.
    
    VS Code validates and compiles the Agent Script file, then activates the chat window at the bottom of the panel.
    
4.  In the chat window, start chatting with your agent by entering a statement, question, or command. The agent responds, using the Agent Script file as its blueprint for what to say or do.
    
5.  If you're using live mode, you can also use the Apex Reply Debugger to debug issues with Apex classes. Enable Debug Mode by clicking **Start Debug Mode**.
    
    ![VS Code showing Start Debug Mode icon highlighted.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-preview-nga-debug.png)
    
    To invoke the Apex Reply Debugger, set a breakpoint in the Apex class you want to debug. Then start chatting again. As soon as an agent action invokes that Apex class, the Apex Replay Debugger automatically starts, and you can debug as usual. See [Apex Replay Debugger](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/replay-debugger.html) for details.
    
6.  To see the actual JSON messages that were sent back and forth between VS Code and your org during your chat session, select the **Agent Tracer** tab.
    
    The drop-down contains a list of all the messages for the current session. For each message, the corresponding JSON is broken up into sections that you can click on, or you can click on **View raw JSON** at the bottom of the panel to open the entire JSON file in the editor.
    
7.  To download a Markdown file that contains the entire conversation, click the **Download Conversation** icon at the top.
    
8.  If you edit the Agent Script file during preview, you must validate the file and then restart the simulated or live preview to test the changes.
    

## Preview Using a CLI Command

Start a preview conversation with your agent from its Agent Script file by running the `agent preview` Salesforce CLI command in VS Code.

1.  In VS Code's integrated terminal or a separate terminal or command prompt, run the `agent preview` CLI command. By default, the preview runs in simulated (mocked) mode.
    
    The command displays a list of agents, use the arrow keys to select the one you want to preview. The list shows whether the agent has a local Agent Script file (`Agent Script`) or whether it's a published agent (`Published`). To connect to published agents, you must set up additional security. See [Connect to a Published Agent](/docs/einstein/genai/guide/agent-dx-preview.html).
    
    To preview the agent in live mode, specify the `--use-live-actions` flag. You can also specify a directory in which to save the response and transcipt files with the `--output-dir` flag. Specify the `--apex-debug` flag to optionally generate Apex debug log files in the output directory. For example:
    
    You can optionally use the `--authoring-bundle` flag if you know the API name of the authoring bundle that contains the Agent Script file.
    
2.  At the `Start typing...` prompt, enter a statement, question, or command, then press Return. Your utterance displays on the right along with a timestamp. The agent then responds on the left.
    
    It takes a few moments for the CLI command to compile the script file and start the session. You can start typing when you see **New session started** with the name of your authoring bundle and a session ID.
    
3.  To exit the conversation, press ESC or Control+C. Before exiting, the command asks if you want to save the response and transcript files, and where to save them.
    

If you specified the `--apex-debug` flag, and a conversation message executes Apex code, then an Apex debug log file is written in the specified output directory. See [Debug Apex Code](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/apex-debugging.html) in the _Salesforce Extensions for Visual Studio Code_ guide for information about using these debug log files with the Apex Replay Debugger.

### Examine the Conversation Transcript and API Response

When using the `agent preview` CLI command, if you opt to save a record of a conversation with an agent, the command creates a directory with a timestamped name in the specified output directory in your DX project. It then creates these files.

-   `transcript.json`: A record of the conversation between you and the agent. Each message in the conversation has three properties: the role (either you the `user` or the API name of the agent), the content (either your utterance or the agent's response), and a timestamp. For example:
    
-   `responses.json`: The full list of API messages from the agent in response to your utterances. Each message contains additional details, such as the type of response, its internal ID, and more. Here's the full API response from the preceding conversation message example:
    
    The `agent preview` command uses the Agent API internally. For more details about the API responses, see the [documentation](/docs/einstein/genai/guide/agent-api.html) and [reference](/docs/einstein/genai/references/agent-api?meta=Summary). For example, the [InformMessage](/docs/einstein/genai/references/agent-api?meta=type%3AInformMessage) reference page provides more information about some of the JSON properties in the `response.json` file.
    

## Next Step

-   [Publish an Authoring Bundle to Your Org](/docs/einstein/genai/guide/agent-dx-nga-publish.html)