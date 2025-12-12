# Agent Script Language Characteristics

Agent Script is a language designed by Salesforce specifically to build Agentforce agents. This page covers some key characteristics of the language before digging into the specifics.

## Compiled

Agent Script is a compiled language. When you save a version of the agent, the script compiles into lower-level metadata that is used by the reasoning engine.

## Declarative, with Procedural Components

Agent Script has elements of both declarative and procedural languages so that you can build an agent that is both predictable and easy to maintain.

-   A declarative language is a language where you directly _declare_ what you want rather than having to worry about the exact flow step by step. This type of programming language gives you the power to define and customize your agent, but without having to worry about the detailed flow. The basic [Agent Script Blocks](/docs/einstein/genai/guide/ascript-blocks.html) resemble a declarative language.
-   A procedural language is a language where you specify how to execute commands in a specific order. We use elements from procedural languages so that you can specify instructions in logical steps. The logic in [reasoning instructions](/docs/einstein/genai/guide/ascript-ref-instructions.html) resemble a procedural language.

## Human-Readable

Agent Script is designed to be human-readable so that even non-developers can get a basic understanding of how the agent works.

## Property-Based

Agent Script is made up of a collection of properties. Each property is shown as `key: value`. Some properties are multiple lines and some properties contain sub-properties, but the `key` is always before the colon (:) and the `value` is always after the colon.

```agentscript
description: "Get account info"
```

The top-level properties are called blocks. For instance, we call this section the config block.

```agentscript
config:
    developer_name: "Demo_Agent_1"
    default_agent_user: "digitalagent.demo@salesforce.com"
    agent_label: "Demo Agent"
    description: "This is my demo agent"
```

## Indentation and Formatting

Agent Script is whitespace-sensitive, similar to languages like Python or YAML, meaning that indentation is used to indicate structure and relationships between properties. To indicate that a value belongs to the previous line’s property, indent with at least 2 spaces or 1 tab. However, you must choose one indentation method and use it consistently throughout the entire script. All lines at the same nesting level must use the same indentation, and mixing spaces and tabs will cause parsing errors.

```agentscript
inputs:
    input_1: string
    input_2: string
```

To specify logic instructions, use the arrow symbol ( `->` ) followed by indented instructions.

```agentscript
instructions: ->
    if @variables.ready_to_book:
        run @actions.get_account_info
            with account_id=@variables.account_id
            set @variables.hotel_code=@outputs.hotel_code
```

To specify multiline strings, use the pipe symbol ( `|` ).

```agentscript
instructions:|
    Welcome to our service!
    Please provide details about your request.
    I'll help you with whatever you need.
```

The pipe symbol can also be used to switch to a prompt from logic-based instructions.

```agentscript
instructions: ->
    if @variables.isPremiumUser:
       | Ask the user if they want to redeem their Premium points
```

See [Reasoning Instructions](/docs/einstein/genai/guide/ascript-ref-instructions.html) in the Agent Script Reference.

## Accessing Resources

You can access resources, such as actions, topics, and variables, using the `@` symbol.

-   `@actions.<action_name>`: References an action.
-   `@topic.<topic_name>`: References a topic.
-   `@variables.<variable_name>`: References a variable.
-   `@outputs.<output_name>`: References an action output.

To run an action, use the `run` command. Use the `with` command to provide inputs and use the `set` command to store outputs.

```agentscript
run @actions.show_great_example
   with QuestionRecordId=@variables.my_great_question
   set @variables.my_great_answer = @outputs.AnswerDescription
```

See [Actions](/docs/einstein/genai/guide/ascript-ref-actions.html) in the Agent Script Reference.

When referencing a variable from within reasoning instructions, you must specify the variable within brackets: `{!@variables.<variable_name>}`. For example:

```agentscript
Ask the user this question: {!@variables.my_question}
```

See [Variables](/docs/einstein/genai/guide/ascript-ref-variables.html) in the Agent Script Reference.

You can specify a topic as a tool available to the LLM. For more information, see [Tools (Reasoning Actions)](/docs/einstein/genai/guide/ascript-ref-tools.html).

## Using Expressions

Agent Script uses familiar flow control syntax, such as `if` and `else`. It also uses basic mathematical expressions (`+`, `-`) and comparison expressions (`==`, `!=`, `>`, `<`). You can check for empty values using `is None` and `is not None`.

```agentscript
if @variables.count >= 10:
    run @actions.count_achieved_announcement
else:
    run @actions.count_missed_announcement
```

See [Conditional Expressions](/docs/einstein/genai/guide/ascript-ref-expressions.html) and [Supported Operators](/docs/einstein/genai/guide/ascript-ref-operators.html) in the Agent Script Reference.

## Comments to Help the Humans

You can specify comments in Agent Script with the pound (`#`) symbol followed by the comment. The script ignores any content on the line after the pound symbol. Use this mechanism to document the script within the script.

```agentscript
# This is an agent sample script that demonstrates deterministic behavior
```