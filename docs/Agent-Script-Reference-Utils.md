# Agent Script Reference: Utils

Utils are utility functions that can be used as tools, for example transition to topics, run actions, or instruct the LLM to set variable values based on a customer's utterance.

## utils.transition to

Tells the agent to move to a different topic.

Transitions are one-way; there's no return of control to the calling topic. `transition to` executes immediately when encountered. The execution of the current directive block is halted, and control is passed to the new topic.

You can signal a hand off immediately after an action completes by including transition logic in the `actions:` block. However, this may not occur until all actions are run.

```agentscript
# during reasoning

reasoning:
    actions:
        go_to_identity: @utils.transition to @topic.Identity
            description: "verifies user identity"
            available when @variables.verified == False
        go_to_order: @utils.transition to @topic.Order_Management
            description: "Handles order lookup, refunds, order updates, and summarizes status, order date, current location, delivery address, items, and driver name."
            available when @variables.verified == True
        go_to_faq: @utils.transition to @topic.General_FAQ
            description: "Handles FAQ lookup and provides answers to common questions."
            available when @variables.verified == True
```

This code sample provides multiple transitions for order management, user verification, and answering common questions. Because these particular transitions are specified from within the reasoning actions, they can be executed by the reasoning engine when applicable. See [Tools (Reasoning Actions)](/docs/einstein/genai/guide/ascript-ref-tools.html).

You can also transition to a topic from your reasoning instructions. This sample transitions based on a variable state.

```agentscript
if @variables.approval_required:
    @utils.transition to @topic.approval_workflow
```

When the specified topic has completed, the flow of control doesn't return to the original topic, so you must explicitly create a transition back to the original topic if that's what you want. When transitioning back to a topic, the flow starts at the beginning of the topic, not where it last left off.

```agentscript
# in topic A, specify that the flow of control jumps to topic_b

search_another: @utils.transition to @topic.topic_b
    description: "Search for another order"

# in topic B, specify that the flow of control goes (back) to topic_a

back_to_order: @utils.transition to @topic.topic_a
    description: "Return to order details"
```

See [Referencing a Topic as a Tool](/docs/einstein/genai/guide/ascript-ref-tools.html#referencing-a-topic-as-a-tool).

## utils.setVariables

Tells the agent to define a variable based on the natural language description. The `…` token instructs the LLM to set the value of the variable.

The `description` instructs the LLM on how to set the value of the variable.

```agentscript
reasoning:
    actions:
        set_first_name_variable: @utils.setVariables
            with first_name = ...
            description: "Get the user's first name"
```

## utils.escalate

Tells the agent to escalate to a human service rep. To use `utils.escalate`, you need an active Omni-Channel connection. This must be defined in a `connection messaging` block with `outbound_route_type` and `outbound_route_name` values. See [Agent Script Connection Block](/docs/einstein/genai/guide/ascript-blocks.html#connection-block) and [Transfer Conversations from an Agent with an Omni-Channel Flow](https://help.salesforce.com/s/articleView?id=ai.service_agent_escalation.htm). The escalate utility function can be used instead of an escalation topic.

```agentscript
topic my_topic_name:
    reasoning:
        instructions:
            | call the action {!@actions.escalate_to_human} if the user wants to speak with a human rep
        actions:
            escalate_to_human: @utils.escalate
                description: "Call this when you need to escalate to a human rep"
                available when @variables.in_business_hours
```

> **Note:**
> 
> `escalate` is a reserved keyword and can't be used for topic or action names.

## Related Topics

-   [Flow of Control](/docs/einstein/genai/guide/ascript-flow.html)
-   [Tools (Reasoning Actions)](/docs/einstein/genai/guide/ascript-ref-tools.html)
-   [Variables](/docs/einstein/genai/guide/ascript-ref-variables.html)