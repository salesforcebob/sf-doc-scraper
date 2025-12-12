# Code Your Agent Using Its Script File (Beta)

Once you have the agent's authoring bundle in your DX project, either by generating it from scratch or retrieving it from your org, you customize the agent by coding its Agent Script file, which is the agent's blueprint. You can code the file directly in the VS Code editor, or use the Agentforce Vibes Extension to vibe code it. Vibe coding refers to using natural language prompts and letting Agentforce Vibes generate the actual code for you.

## Brief Overview of Agent Script

Agent Script is the language for building Agentforce agents. It combines the flexibility of natural language instructions with the reliability of programmatic expressions for handling business rules. Agent Script provides all the advantages of access to a large language model (LLM), while also giving you ways to add more deterministic behaviors to your agent. In Agent Script, you use expressions to define if-then-else conditions, transitions, and other logic; set, modify, and compare variables; and select topics and actions. You can build predictable, context-aware agent workflows that don’t rely on interpretation by an LLM.

The Agent Script Language Server VS Code extension adds support for Agent Script, just like other Salesforce VS Code extensions provide language support for Apex, Lightning Web Components (LWC), and so on. As a result, when you open an Agent Script file in the VS Code editor, you see the pretty colored syntax highlighting, visual cues (such as red squiggles) for syntax errors, internal validation, and so on. The Outline view in VS Code is also populated by a symbol tree based on the contents of the Agent Script file.

See [Agent Script](/docs/einstein/genai/guide/agent-script.html) for more information about the language itself.

Here's an example of a simple Agent Script file.

```agentscript
system:
    instructions: "You are a friendly and empathetic agent that helps customers with their questions."
    messages:
        error: "Sorry, something went wrong."
        welcome: "Hello! How are you feeling today?"

variables:
    isPremiumUser: mutable boolean = False
        description: "Indicates whether the user is a premium user."


config:
    agent_name: "HelloWorldBot"
    default_agent_user: "hello@world.com"
    user_locale: "en_US"

start_agent hello_world:
    description: "Respond to the user."
    reasoning:
        instructions: ->
            if @variables.isPremiumUser:
                | ask the user if they want to redeem their Premium points
            else:
                | ask the user if they want to upgrade to Premium service
```

## Let's Code!

Enough with all these words, let's get coding already. Here's the high-level developer workflow:

1.  In VS Code, open the agent's Agent Script file in the editor.
    
    Agent Script files are located in the `aiAuthoringBundles/<bundle-API-name>` directory of your DX project's package directory. For example, if your authoring bundle's API name is `Local_Info_Agent_NGA` and you use the default package directory, open `force-app/main/default/aiAuthoringBundles/Local_Info_Agent_NGA/Local_Info_Agent_NGA.agent`.
    
2.  Code the script file using the Agent Script language. See [Agent Script Tips](#agent-script-tips) for some information to get you started.
    
3.  If you want to vibe code:
    
    1.  Open the Agentforce Vibes panel by clicking the _Agentforce Vibes_ icon (![Agentforce Vibes icon.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-agentforce-vibes-icon.png)) in the Activity Bar.
    2.  Enter a prompt in the Agentforce Vibes window. Agentforce Vibes prompts for confirmation when it wants to modify the file, don't worry. See [Sample Vibe Coding Prompt](/docs/einstein/genai/guide/agent-dx-nga-script.html#sample-vibe-coding-prompts).
4.  Periodically [validate the Agent Script file](#validate-the-agent-script-file) to ensure that it compiles.
    
5.  Periodically [preview the agent from its Agent Script file](/docs/einstein/genai/guide/agent-dx-nga-preview.html) to see how it's working.
    

This screenshot shows VS Code ready to code an Agent Script file called `Local_Info_Agent_NGA.agent`; the highlighted parts are described after the screenshot. The custom layout of the VS Code panels is similar to how the Agentforce Builder UI in your org looks.

![VS Code showing open DX project on the left, an open Agent Script file in the middle editor, and Agentforce Vibes on the right with a vibe coding prompt ready to go. .](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-nga-vibe-coding-1.png)

-   `(1)` shows the `agentforcedx` DX project open in the VS Code's file explorer.
-   `(2)` shows the location of the `Local_Info_Agent_NGA` authoring bundle in the DX project package directory. The authoring bundle includes the `Local_Info_Agent_NGA.agent` Agent Script file.
-   `(3)` shows that the Outline view displays a symbol tree of the Agent Script file, with blocks such as `system`, `config`, `variables`, `topic_selector`, and so on.
-   `(4)` shows the open `Local_Info_Agent_NGA.agent` Agent Script file, with colored syntax highlighting.
-   `(5)` shows Agentforce Vibes.
-   `(6)` shows a vibe coding prompt in the chat window, ready to be executed.

## Agent Script Tips

You should already have some basic information in your Agent Script file, either because you generated its authoring bundle from an agent spec YAML file or you retrieved an authoring bundle from your org. This section doesn't provide comprehensive information about how to code your script file, but it provides some tips to get you going. See the [Agent Script](/docs/einstein/genai/guide/agent-script.html) documentation for more information and examples.

-   Learn about the characteristics of the Agent Script language itself, such as how to access resources, the language format and indentation, using expressions, and so on.
    
-   Familiarize yourself with the blocks that make up an Agent Script file. For example, the `system` block contains general agent instructions, the `config` block contains basic agent configuration, and the `topic` block contains all the information associated with topics, such as instructions, logic, and actions.
    
-   Start with basic agent design, such as defining the required topics and the associated actions.
    
    Don't worry if you haven't yet created the Apex classes, flows, and prompt templates that implement the actions. Simply reference them in your script file for now, as if they actually exist. When you later preview this agent, you can use simulated mode to mock the actions. If you do have existing Apex classes, etc, that you want to use to implement actions, then go ahead and use them in the Agent Script file.
    
-   Determine when you want to allow the LLM to make its own reasoning decision and when you want the agent to execute deterministically.
    
-   Design the flow of control, such as what happens when the user makes its first request to the agent, what additional topics might be required, and how to transition between topics.
    
-   Check out [this collection of easy-to-digest Agent Script examples](https://github.com/trailheadapps/agent-script-recipes). Each recipe demonstrates how to build a specific agent behaviour in the fewest lines of script possible while following best practices. From `Hello World` interactions to sophisticated agent transitions, there's a recipe for that!
    

## Sample Vibe Coding Prompts

Here are some prompts to get you started if you decide to use Agentforce Vibes to vibe code your Agent Script file.

-   _Change the display name to Local Info Agent._
-   _Add a new topic for updating the customer information if it's changed. Use an existing flow for the action, if you find one that's suitable. Otherwise, create a new flow._
-   _Add an action to the identify\_customer topic for identifying a customer based on their cell phone._
-   _Review all the agent instructions and improve them for focus and conciseness._

## Validate the Agent Script File

Validating the Agent Script file ensures that it compiles successfully so that you can publish it to your org, and eventually activate it so your users can start using it.

### Use VS Code to Validate

1.  In VS Code, open the agent's Agent Script file, which is located in the `aiAuthoringBundles/<API-name>` directory of your package directory. For example, if your agent's API name is `Local_Info_Agent` and you use the default package directory in your DX project, open `force-app/main/default/aiAuthoringBundles/Local_Info_Agent/Local_Info_Agent.agent`.
    
2.  Right-click the file in the editor and choose **AFDX: Validate This Agent**. You can also right-click from the script file in the explorer panel or choose the command from the Command Palette.
    
3.  A progress bar in the lower right corner notifies you of the status of the validation.
    
    If the validation fails, see the **Problems** tab for the list of syntax errors, a brief description of the error, and the location in the Agent Script file where the error occurred. This simple example shows that there's a typo for the description of the `start_agent` block.
    
    ![VS Code showing Agent SCript file with a type and the validation errors in the Problems tab.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-script-validation-1.png)
    
    Fix the errors and then retry the validation.
    

### Use a CLI Command to Validate

1.  From VS Code's integrated terminal, run this command from your DX project:
    
    The command searches the DX project for authoring bundles and provides a list of their API names that you can choose from. You can also specify the Agent Script file you want to validate by passing its API name to the `--api-name` flag.
    
2.  The command output displays whether the validation failed or succeeded.
    
    If the validation fails, the output displays the list of syntax errors, a brief description of the error, and the location in the Agent Script file where the error occurred. Fix the errors and then retry the validation.
    

## Next Steps

-   [Preview and Debug an Agent](/docs/einstein/genai/guide/agent-dx-nga-preview.html)
-   [Publish an Authoring Bundle to Your Org](/docs/einstein/genai/guide/agent-dx-nga-publish.html)

## See Also

-   [Get Started with Agent Script](/docs/einstein/genai/guide/agent-script.html)
-   [Agent Script Recipes](https://github.com/trailheadapps/agent-script-recipes)
-   [Agentforce Vibes Extension](https://developer.salesforce.com/docs/platform/einstein-for-devs/guide/einstein-overview.html)