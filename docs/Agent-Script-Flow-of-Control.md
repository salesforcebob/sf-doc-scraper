# Agent Script Flow of Control

Understanding the order of execution and flow of control helps you to design better agents. Agentforce has these main execution paths:

1.  First request to an agent
2.  Processing a topic
3.  Transitioning between topics

## First Request to an Agent

All requests, including the first request, begin at the `start_agent` topic. You typically use the `start_agent` topic to set the initial value of variables, and to perform topic classification. Topic classification tells the LLM which topic to choose based on the current context.

See [Start Agent Block](/docs/einstein/genai/guide/ascript-blocks.html#start-agent-block).

## Processing a Topic

Agentforce uses a topic's text instructions, variables, `if`/`else` conditions, and other programmatic instructions to create an LLM prompt. The reasoning instructions are processed sequentially, in top-to-bottom order. While the reasoning instructions can contain programmatic logic and text instructions, the LLM only starts reasoning after it has received the resolved prompt, not while Agentforce is still parsing.

If reasoning instructions contain a transition command, Agentforce immediately transitions to the specified topic, preserving any existing prompts that it resolved before the transition occurred. Agentforce doesn't parse any instructions in the original topic that occur after the transition.

See [Reasoning Instructions](/docs/einstein/genai/guide/ascript-ref-instructions.html).

### Example: How Agentforce Creates a Prompt from a Topic

Agentforce processes a topic to create a prompt, which it then sends to the LLM.

Consider this topic's reasoning instructions.

```agentscript
reasoning:
    instructions:->
        run @actions.get_delivery_date
            with order_ID=@variables.order_ID
            set @variables.updated_delivery_date=@outputs.delivery_date

        | Tell the user that the expected delivery date for order number {!@variables.order_ID} is {!@variables.updated_delivery_date}

        run @actions.check_if_late
            with order_ID=@variables.order_ID
            with delivery_date=@variables.updated_delivery_date
            set @variables.is_late = @outputs.is_late

        if @variables.is_late == "True":
            | Apologize to the customer for the delay in receiving their order.
```

Suppose that:

-   the order ID is `1234`
-   the current delivery date is `February 10, 2026`
-   the package is late

Here's the prompt that Agentforce creates after processing the reasoning instructions:

```agentscript
Tell the user that the expected delivery date for order number 1234 is February 10, 2026.
Apologize to the customer for the delay in receiving their order.
```

#### How Agentforce Constructs the Prompt

To construct the prompt, Agentforce parses the reasoning instructions line by line, following these steps:

1.  Initialize the prompt to empty.
2.  Run the action `get_delivery_date`.
3.  Set the variable `updated_delivery_date` to the value of `outputs.delivery_date`, which was returned by the action.
4.  Concatenate this string to the prompt: `Tell the user that the expected delivery date for order number 1234 is February 10, 2026.`
5.  Run action `check_if_late`.
6.  Set the variable `is_late` to the value of `outputs.is_late`, which was returned by the action.
7.  Check whether the value of if `@variables.is_late` == `"True"`.
8.  Concatenate this string to the prompt: `Apologize to the customer for the delay in receiving their order.`
9.  Send the prompt to the LLM and return the LLM's response to the customer.

## Transitioning Between Topics

You can transition between topics from a reasoning action, reasoning instructions, or before and after reasoning blocks. A transition (using [@utils.transition to](/docs/einstein/genai/guide/ascript-ref-utils.html#utilstransition-to)) is one-way and control doesn't return to the previous topic. Agentforce keeps any prompt instructions that it resolved from the previous topic, up to the transition. Then, Agentforce reads the second topic from top to bottom. The final prompt contains any instructions from the first topic, followed by instructions from the second topic.

After the second topic completes, Agentforce waits for the next customer utterance, at which point it returns to the `start_agent` topic.

In this example, we've defined a reasoning action called `go_to_account_help` that transitions to the topic `account_help`.

```agentscript
reasoning:
    actions:
        go_to_account_help: @utils.transition to @topic.account_help
            description: "When a user needs help with account access"
```

For more about transitions and topics, see [Referencing a Topic as a Tool](/docs/einstein/genai/guide/ascript-ref-tools.html#referencing-a-topic-as-a-tool) and the reference documentation for [@utils.transition to](/docs/einstein/genai/guide/ascript-ref-utils.html#utilstransition-to).