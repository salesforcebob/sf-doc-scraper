# Agent Script Blocks

A script consists of blocks where each block contains a set of properties. These properties can describe data or procedures. Agent Script contains several different block types.

![Agent Script Blocks](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/agent-script/agent-script-blocks.svg)

This section gives you a high-level understanding of each block type.

## System Block

The system block contains general instructions for the agent. This information includes a list of messages that the agent should use during specific scenarios. `welcome` and `error` are required messages.

```agentscript
system:
    instructions:|
        You are an AI agent. Have a friendly conversation with the user.

    messages:
        welcome: "Welcome, friend!"
        error: "Whoops!"
```

## Config Block

The config block contains basic configuration information such as the agent label, the developer name, and the default agent user.

```agentscript
config:
    developer_name: "Demo_Agent_1"
    default_agent_user: "digitalagent.demo@salesforce.com"
    agent_label: "Demo Agent"
    description: "This is my demo agent"
```

## Variables Block

The variables block contains the list of global variables that the agent and script can use. See [Variables](/docs/einstein/genai/guide/ascript-ref-variables.html).

```agentscript
variables:
    string_var: mutable string = "hello world"
    hotel_info: mutable string = "Dreamforce Hotel"
```

You reference variables throughout the script by using the syntax `@variables.<variable_name>`.

## Language Block

The language block defines which languages the agent supports.

```agentscript
language:
    default_locale: "en_US"
    additional_locales: ""
    all_additional_locales: False
```

## Connection Block

You can use the connection block to describe how this agent interacts with outside connections. For instance, this code snippet shows how the agent interacts with [Enhanced Chat](https://help.salesforce.com/s/articleView?id=service.miaw_intro_landing.htm).

```agentscript
connection messaging:
    escalation_message: "One moment while I connect you to the next available service representative."
    outbound_route_type: "OmniChannelFlow"
    outbound_route_name: "agent_support_flow"
    adaptive_response_allowed: True
```

You can use the connection block alongside the [@utils.escalate](/docs/einstein/genai/guide/ascript-ref-utils.html#utilsescalate) command.

## Topic Blocks

The topic block allows you to specify the instructions, logic, and actions for an agent topic. A topic block contains a description, a list of actions, and the reasoning instructions.

```agentscript
topic Order_Management:
    description: "Handles order lookup, order updates, and summaries including status, date, location, items, and driver."

    reasoning:
        instructions: ->
            if @variables.order_summary == "":
                run @actions.lookup_current_order
                with member_email=@variables.member_email
                set @variables.order_summary=@outputs.order_summary

            | Refer to the user by name {!@variables.member_name}.
              Show their current order summary: {!@variables.order_summary} when conversation starts or if requested.
              If they want past order info, ask for Order ID and use {!@actions.lookup_order}.

        actions:
            lookup_order: @actions.lookup_order
                with query = ...
                set @variables.order_summary=@outputs.order_summary
                set @variables.order_id=@outputs.order_id

            lookup_current_order: @actions.lookup_current_order
                with member_email=@variables.member_email
                set @variables.order_summary=@outputs.order_summary
                set @variables.order_id=@outputs.order_id

    actions:
        lookup_order:
            description: "Retrieve order details."
            inputs:
                query: string
            outputs:
                order_summary: string
                order_id: string
            target: "flow://SvcCopilotTmpl__GetOrdersByContact"


        lookup_current_order:
            description: "Retrieve current order details."
            inputs:
                member_email: string
            outputs:
                order_summary: string
                order_id: string
            target: "flow://SvcCopilotTmpl__GetOrderByOrderNumber"
```

These properties make up a topic block:

-   **topic name**: This value is the name of the topic that should accurately describe the scope and purpose of this topic in a few words. Because this value can’t have spaces, use `snake_case` to name the topic.
-   **description**: This property contains the description for this topic. This value should help the agent determine when to use this topic based on the user’s intent.
-   **reasoning**: This section contains information sent to the reasoning engine. Its primary properties are instructions and actions.
    -   **reasoning.instructions**: This property contains guidance for the reasoning engine after it has decided that this topic is relevant to the user's request. The reasoning instructions can be a combination of logic instructions and prompt-based instructions. See [Reasoning Instructions](/docs/einstein/genai/guide/ascript-ref-instructions.html).
    -   **reasoning.actions**: The list of tools that are applicable for the reasoning engine to use. This list can point to agent actions listed in the higher-level actions section, as well as other functionality available to the reasoning engine (such as transitioning to another topic, or setting a variable's value). See [Tools (Reasoning Actions)](/docs/einstein/genai/guide/ascript-ref-tools.html).
-   **actions**: This section defines the agent actions available from this topic. It contains a description of the action, the list of inputs and outputs, and the target location where this action resides. If you want to allow the reasoning engine to use one of these agent actions, you must also point to this action from the `reasoning.actions` section. See [Actions](/docs/einstein/genai/guide/ascript-ref-actions.html).

## Start Agent Block

The start agent block is a topic that uses the `start_agent` prefix instead of the `topic` prefix. With every customer utterance, the agent begins execution at this block. The `start_agent` topic is used to initiate the conversation, and typically determines when to switch to the agent's other topics (topic classification).

```agentscript
start_agent topic_selector:
    description: "Welcome the user and determine the appropriate topic based on user input"

    reasoning:
        instructions: |
            You are a topic selector for this assistant. Welcome the guest
            and analyze their input to determine the most appropriate topic to handle their request.

        actions:
            go_to_account: @utils.transition to @topic.account_help
                description: "When user needs help with account access, passwords, login errors, or authentication issues"
```