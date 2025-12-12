# Agent Script Reference: Before and After Reasoning

`before_reasoning` and `after_reasoning` are optional blocks inside a topic. They can contain logic, actions, transitions, or other directives that run either before or after the topic runs.

When calling [transitions](/docs/einstein/genai/guide/ascript-flow.html#transitioning-between-topics) in before or after reasoning, use `transition to` rather than `@utils.transition to`. For example:

```agentscript
after_reasoning:->
    if @variables.case_type != "":
        transition to @topic.case_creation
```

> **Note:**
> 
> The `before_reasoning` and `after_reasoning` blocks don't support the `|` (pipe) command.

## Before Reasoning

A topic's `before_reasoning` block runs before the topic's reasoning block starts, on every request. Typical use cases are to set customer-entered information into variables, transition to a different topic under certain conditions, or run an action.

> **Note:**
> 
> You can use `before_reasoning`, or you can add the same logic to the beginning of a topic's instructions.

For example, this `before_reasoning` block sets the appointment duration based on the urgency level.

```agentscript
before_reasoning:->
    if @variables.urgency_level == "urgent":
        set @variables.estimated_duration = 15
    if @variables.urgency_level == "routine":
        set @variables.estimated_duration = 30
```

## After Reasoning

A topic's `after_reasoning` block runs when the reasoning block completes, on every request. Typical use cases are to set customer-entered information into variables, transition to a different topic, or run an action.

> **Note:**
> 
> If a topic [transitions](/docs/einstein/genai/guide/ascript-ref-utils.html#utilstransition-to) to a new topic partway through execution, the original topic's `after_reasoning` block isn't run.

## Related Topics

-   [Reasoning Instructions](/docs/einstein/genai/guide/ascript-ref-instructions.html)