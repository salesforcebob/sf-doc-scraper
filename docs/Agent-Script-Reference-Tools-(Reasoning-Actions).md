# Agent Script Reference: Tools (Reasoning Actions)

Tools are executable functions that the LLM can choose to call, based on the tool's description and the current context. You define tools in the topic's `reasoning.actions` block. Tools can be [actions](/docs/einstein/genai/guide/ascript-ref-actions.html) or other [utilities](/docs/einstein/genai/guide/ascript-ref-utils.html).

Tools must wrap an action or a utils function, and use `with` or `to` to bind parameters. You can use the `available when` parameter to deterministically specify when the tool is available.

```agentscript
reasoning:
    instructions: ->
        | Welcome!  ....
    actions:
        lookup_customer: @actions.Get_Customer_Info
            with email=@variables.customer_email
            ....

        # This tool writes the customer-provided information
        # into the specified variables. The LLM can choose when to use it.
        capture_order_info: @utils.setVariables
            description: "Capture order search information from customer"
            with order_number=@variables.order_number
            with customer_email=@variables.customer_email
            available when @variables.customer_verified == True

        # This tool transitions to a topic that
        # displays detailed information about the order
        show_order_details: @utils.transition to @topic.order_details
            description: "Show detailed order information"
```

## Referencing a Topic as a Tool

In reasoning actions, you can reference a topic directly with `@topic.<topic_name>` or through a declarative transition ([`@utils.transition to`](/docs/einstein/genai/guide/ascript-ref-utils.html#utilstransition-to)). Use a direct `@topic.<topic_name>` reference to delegate to a topic, similar to an action or tool call. After the referenced topic is run, the flow returns to the original topic. This behavior is different from a declarative transition (`@utils.transition to`) in that transitions are one way, whereas a direct topic reference returns to the original caller. If a referenced topic includes a declarative transition, the flow follows that path until it ends, and then returns to the original topic.

In this code sample, you can see both methods of calling another topic.

```agentscript
reasoning:
    actions:

        # Transitions to the other topic and does not return
        show_order_details: @utils.transition to @topic.order_details
            description: "Show detailed order information"

        # Runs the other topic as a tool, synthesizes the result, then can run more tools
        consult_specialist: @topic.specialist_topic
            description: "Consult specialist for complex questions"
            available when @variables.needs_expert_help == True
```

## Related Topics

-   [Flow of Control](/docs/einstein/genai/guide/ascript-flow.html)
-   [Actions](/docs/einstein/genai/guide/ascript-ref-actions.html)
-   [Utils](/docs/einstein/genai/guide/ascript-ref-utils.html)