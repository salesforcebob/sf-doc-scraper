# Agent Script Reference: Actions

An action defines an executable task that an agent can perform, such as making a Flow or Apex call, or transitioning to a new topic. You define actions in a topic's `actions` block, and then use the action in the topic's `reasoning` block. Actions are only available to the topic in which they're defined.

You can call actions deterministically. Or, you can expose actions as tools that the LLM can choose to use, based on the current context. See [Using Actions](#using-actions).

## Action Example

In this example, the `Get_Tracking_Updates` action takes the tracking number as input and calls the GetTrackingUpdates Flow, then returns the current location and latest delivery date.

```agentscript
actions:
    Get_Tracking_Updates:
        description: "Gets real-time tracking updates from shipping carrier"
        label: "Get Tracking Updates"
        require_user_confirmation: False
        include_in_progress_indicator: True
        inputs:
            tracking_number: string
                label: "Tracking Number"
                description: "Shipping tracking number"
                is_required: True
        outputs:
            location: string
                label: "Current Location"
                filter_from_agent: True
            updated_delivery_date: string
                label: "Updated Delivery Date"
                filter_from_agent: True
        target: "flow://GetTrackingUpdates"
```

## Action Properties

An action definition contains these properties. For an example of an action, see [Action Example](#action-example).

| Property | Description |
| :-- | :-- |
| [action name](#action-name) | Required string. The action's name. |
| [available when](#available-when) | Optional conditional expression. Conditions that must exist for the LLM to use the action. |
| description | Optional string. Description of the action's behavior and purpose. The LLM uses this description to help it decide when to call the action. |
| [inputs](#inputs) | Optional object. Defines the action's input parameters, if any. |
| include\_in\_progress\_indicator | Optional boolean (`True`/`False`). Indicates whether the agent shows progress indicator when running the action. |
| [target](#target) | Required string. Reference to an executable (apex, flow, or prompt). |
| label | Optional string. The action's name to display to the customer. Auto-generated if not specified. By default, Agentforce creates the label from the action's name, where `my_action` becomes "My Action". |
| [outputs](#outputs) | Optional object. Defines the action's output parameters, if any. |
| require\_user\_confirmation | Optional boolean. Indicates whether the customer must confirm before the agent runs the action. |

### action name

The action's identifier, which you use to run the action. Action names must follow Salesforce developer name standards:

-   Begin with a letter, not an underscore.
-   Contain only alphanumeric characters and underscores.
-   Can't end with underscore.
-   Can't contain consecutive underscores (\_\_).
-   Maximum length of 80 characters.
-   `snake_case` is recommended.

### available when

Defines the conditions that must exist for the LLM to use the action, or for the action to run. For example:

```agentscript
reasoning:
   actions:
      cancel_booking: @actions.cancel_booking
         available when @variables.booking_status == "active"
         with booking_id=@variables.current_booking_id

      admin_override: @actions.admin_override
         available when @variables.user_role == "admin"
```

### inputs

Defines the action's input parameters, their [type](#parameter-types), and whether the input is required. For example:

```agentscript
inputs:
    email: string
        label: "Email Address"
        description: "Customer's email address"
        is_required: True
```

#### Parameter Types

You can use these types for input and output parameters:

-   `string` - text values
-   `number` - numeric values (floating point)
-   `integer` - integer values
-   `long` - long integer values
-   `boolean` - True/False values
-   `object` - complex objects
-   `date` - date values (YYYY-MM-DD)
-   `datetime` - dateTime values
-   `time` - time values
-   `currency` - currency values
-   `id` - Salesforce ID values
-   list\[`<type>`\] - a list of values of the same type. You can use any supported type in this list. For example, `list[string]` or `list[number]`.

### target

A reference to an executable. Use the format `{TARGET_TYPE}://{DEVELOPER_NAME}`. An action can have these targets:

-   `apex` (Apex)
-   `flow` (Flow)
-   `prompt` (Prompt Template)

For example:

```agentscript
flow://AssignSalesRep
```
```agentscript
prompt://check_bookings
```

### outputs

Defines the action's output parameters and the parameters' properties. By default, the agent remembers the action's output information for the entire session. The agent can make choices based on the information, and use the information to answer customer questions. For example, if a `get_product_care` action returns information about how to maintain a product, the agent remembers that information for the entire session, and can use the information to answer questions.

Output parameters can be of [these types](#parameter-types).

> **Note:**
> 
> To hide output information from the agent, set the output parameter's `filter_from_agent` property to `True`.

Supported properties for output parameters are:

| Property | Description |
| :-- | :-- |
| `description` | Optional. String. Description of the output parameter. By default, Agentforce generates this property from the parameter name. For example, the parameter `error_code` becomes `Error Code`. |
| `developer_name` | Required. String. Value that can override the parameter's developer name. |
| `label` | Optional. String. Human-readable label for the output parameter's value. By default, Agentforce autogenerates the label from the output parameter's name. For example, `error_code` becomes `Error Code`. |
| `complex_data_type_name` | Required if the parameter is a complex data type. String. Indicates the type returned by the target. For example, suppose that an action has a flow target and an output parameter called `customer_info`. If the flow returns information of type `lightning__recordInfoType`, the action's `customer_info` parameter must have the type `object` and the property `complex_data_type_name: lightning__recordInfoType`. |
| `filter_from_agent` | Optional. Boolean. If `True`, the output is excluded from the agent's context. If `False`, the output is included in the agent's context. Default value is `False`. |

For example:

```agentscript
outputs:
    customer_found: boolean
        label: "Customer Found"
        filter_from_agent: True
```

## Using Actions

Agent Script provides several methods for running an action in a topic, with each method providing a different level of determinism.

### List a Tool in the Topic's reasoning.actions Block

You can define an action as a tool in the reasoning actions block, enabling the LLM to choose when and whether to run the tool. See [Tools (Reasoning Actions)](/docs/einstein/genai/guide/ascript-ref-tools.html).

```agentscript
reasoning:
    actions:
        load_order_details: @actions.Get_Order_Details
            with order_number=@variables.order_number
            with customer_id=@variables.customer_id
```

### Call the Action in the Reasoning Instruction Logic

Use `run @actions.<action_name>` to call the action in the reasoning instruction logic (after `->`). Agentforce runs the reasoning instruction logic on every request that uses this topic.

```agentscript
reasoning:
    instructions: ->
        run @actions.check_business_hours
        set @variables.is_business_hours=@outputs.is_business_hours
        set @variables.next_open_time=@outputs.next_open_time
```

### Reference the Action Directly in the Reasoning Instruction Prompt

Use `{!@actions.<action_name>}` to reference the action in the reasoning instruction prompt (after |). The LLM can choose whether to run the action, based on the current context and the specified requirements. This method of specifying actions isn't deterministic.

```agentscript
reasoning:
    instructions: ->
        | If not within business hours, create a support case by using {!@actions.create_case}. Share the Case Number and when to expect follow-up ({!@variables.next_open_time}).
```

## Related Topics

-   [Flow of Control](/docs/einstein/genai/guide/ascript-flow.html)
-   [Reasoning Instructions](/docs/einstein/genai/guide/ascript-ref-instructions.html)
-   [Tools (Reasoning Actions)](/docs/einstein/genai/guide/ascript-ref-tools.html)