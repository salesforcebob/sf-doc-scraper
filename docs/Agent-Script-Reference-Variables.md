# Agent Script Reference: Variables

Variables let agents deterministically remember information across conversation turns, track progress, and maintain context throughout the session. You define all variables in the `variables` block, and all topics in the agent can access the variables.

A variable can be a regular variable or a linked variable:

-   **[regular variable](#regular-variables):** You can initialize a variable with a default value, and the agent can change the variable's value.
-   **[linked variable](#linked-variables):** The value of a linked variable is tied to an output such as an action's output. Linked variables can't have a default value.

## Variable Names

Variable names must follow Salesforce developer name standards:

-   Begin with a letter, not an underscore.
-   Contain only alphanumeric characters and underscores.
-   Can't end with underscore.
-   Can't contain consecutive underscores (\_\_).
-   Maximum length of 80 characters.

We recommend you use camel\_case for variable names.

## Referencing Variables

To reference a variable from the script, use `@variables.<variable_name>`. To reference a variable from within reasoning instructions, use `{!@variables.<variable_name>}`.

## Regular Variables

Regular variables have these properties:

-   Can be defined as `mutable` to allow the agent to change the variable's value. To ensure a variable's value is never changed, define the variable without `mutable`.
-   Can be defined with a `description`. If you want the LLM to use reasoning to set the variable's value, include a description. See [Let the LLM set variables with user-entered information (slot filling)](#let-the-llm-set-variables-with-user-entered-information-slot-filling).

```agentscript
variables:
    isPremiumUser: mutable boolean = False
        description: "Indicates whether the user is a premium user."
```

Regular variables can have these types:

| Type | Notes | Example |
| :-- | :-- | :-- |
| `string` | Any alphanumeric string without special characters. | `name: mutable string = "John Doe2"` |
| `number` | Use for both integers and decimals. For example, 42 or 3.14 . Compiles to IEEE 754 double-precision floating point. | `age: mutable number = 25`, `price: mutable number = 99.99` |
| `boolean` | Allowed values are `True` or `False`. The value is case-sensitive, so capitalize the first letter. | `is_active: mutable boolean = True` |
| `object` | Value is a complex JSON object the form `{"key": "value"}.` | `order_line: mutable object = {"SKU": "abc12344409","count": 42}` |
| `date` | Any valid date format. | `start_date: mutable date = 2025-01-15` |
| `id` | A Salesforce record ID. | `"0015000000XyZ12"` |
| `list [type]` | A list of values of the specified type. All primitive types are supported. | `flags: mutable list[boolean] = [True, False, True]`, `scores: list[number] = [95, 87.5, 92]` |

## Linked Variables

A linked variable's value is tied to a source, such as an action's output. A linked variable doesn't have a default value and can't be set by the agent.

```agentscript
variables:
    session_id: linked string
        description: "The session ID, linked to the current session"
        source: @session.sessionID
```

Linked variables can have these types:

-   `string`
-   `number`
-   `boolean`
-   `date`
-   `id`

## Examples of Using Variables

Common use cases for variables are to share information between topics (storing state) and allowing the LLM to set variables with user-entered values.

### Share Information Between Topics

You can use variables to share information, or state, between topics. For example, to share the current temperature between all topics in an agent, run the `Get_Current_Weather_Data` action and store the value of the temperature output in the global temperature variable.

```agentscript
reasoning:
    instructions: ->
        # always get the current weather data
        run @actions.Get_Current_Weather_Data
            with city=@variables.user_city
            # set the variable "temperature" with the
            # current temperature so that other topic has that info
            set @variables.temperature = @outputs.temperature_celsius
```

### Let the LLM Set Variables with User-Entered Information (Slot Filling)

Use `...` to indicate that the LLM should use reasoning to set a variable's value. For example, the LLM can ask the user for their first and last name, then use the `capture_user_info` tool to set those values in the variables `first_name` and `last_name`. Using reasoning to set a variable's value is called slot filling.

```agentscript
reasoning:
    instructions: -> Ask the user for their name and then store the value using capture_user_info.
    actions:
        capture_user_info: @utils.setVariables
            with first_name = ...
            with last_name = ...
            description: "Set the user's name as variables"
```

## Related Topics

-   [Flow of Control](/docs/einstein/genai/guide/ascript-flow.html)
-   [Utils](/docs/einstein/genai/guide/ascript-ref-utils.html)