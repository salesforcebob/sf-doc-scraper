# Get Started with Agent Script (Beta)

Get to know the language for building agents in Agentforce Builder. Use Agent Script to build predictable, context-aware agent workflows that don't rely solely on interpretation by an LLM.

![Agent Script UI](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/agent-script/agent-script-view.png)

## What's Agent Script?

Agent Script is the language for building agents in Agentforce Builder. Script combines the flexibility of natural language instructions for handling conversational tasks with the reliability of programmatic expressions for handling business rules. In script, you use expressions to define if/else conditions, transitions, and other logic; set, modify, and compare variables; and select topics and actions. You can build predictable, context-aware agent workflows that don’t rely solely on interpretation by an LLM. For example, you can use script to control when your agent transitions from one topic to another or when actions are run in a particular sequence (sometimes called action chaining).

Agentforce Builder gives you several ways to write Agent Script.

-   You can chat with Agentforce and explain what you want your agent to be able to do (for example, "If the order total is over $100, then offer free shipping."). Agentforce converts your request into topics, actions, instructions, and other expressions.
-   In Canvas view, Agent Script is summarized into easily understandable blocks, which you can expand to view the underlying script. You can edit your agent with the help of quick action shortcuts. Type `/` to add expressions for common patterns (for example, if/else conditionals) and `@` to add resources (topics, actions, and variables).
-   Advanced users can switch to Script view to write and edit script directly, with developer-friendly aids like syntax highlighting, autocompletion, and validation.

Developers can also use Agentforce DX to generate or retrieve a script file into their local Salesforce DX project and then work with it in Visual Studio Code. The Agentforce DX VS Code Extension fully supports the Agent Script language with standard code editing features. See [Agentforce DX](/docs/einstein/genai/guide/agent-dx.html) for more details.

## What Can You Do with Agent Script?

Agent Script preserves the conversational skills and complex reasoning ability derived from natural language prompts, and it adds the determinism of programmatic instructions. For example, in Agent Script, you can define:

-   Specific areas where an LLM is free to make reasoning decisions. See [Reasoning Instructions](/docs/einstein/genai/guide/ascript-ref-instructions.html).
-   Specific areas where the agent must execute deterministically. See [Reasoning Instructions](/docs/einstein/genai/guide/ascript-ref-instructions.html).
-   Variables to reliably store information about the agent's current state, rather than relying on LLM context memory. See [Variables](/docs/einstein/genai/guide/ascript-ref-variables.html).
-   Conditional expressions to determine the agent's execution path or LLM's utterances. For example, you can instruct the agent to speak differently to the customer based on the value of the `is_member` variable. Or you can deterministically specify which action to run based on the value of the `appointment_type` variable. See [Conditional Expressions](/docs/einstein/genai/guide/ascript-ref-expressions.html).
-   Conditions under which the agent transitions to a new topic. You can deterministically transition to a new topic. Or you can expose a topic transition to the LLM as a tool, allowing the LLM to decide when and whether to switch topics. See [Tools](/docs/einstein/genai/guide/ascript-ref-tools.html) and [Utils](/docs/einstein/genai/guide/ascript-ref-utils.html).

## Example Agent Script

Here’s a simple example of what Agent Script looks like.

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

## Next Steps

To learn how to build agents in Canvas view or by chatting with Agentforce, see [Build Enterprise-Ready Agents with the New Agentforce Builder](https://help.salesforce.com/s/articleView?id=ai.agent_builder_intro.htm) in Salesforce Help.

To learn more about Agent Script, review these topics.

-   [Language Characteristics](/docs/einstein/genai/guide/ascript-lang.html)
-   [Agent Script Blocks](/docs/einstein/genai/guide/ascript-blocks.html)
-   [Flow of Control](/docs/einstein/genai/guide/ascript-flow.html)
-   [Agent Script Examples](/docs/einstein/genai/guide/ascript-example.html)
-   [Manage Agent Script Agents](/docs/einstein/genai/guide/ascript-manage.html)
-   [Agent Script Reference](/docs/einstein/genai/guide/ascript-reference.html)