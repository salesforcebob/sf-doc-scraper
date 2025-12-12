# Send Agent Variables with the Agent API

When [starting a session](/docs/einstein/genai/guide/agent-api-examples.html#start-session) or [sending messages](/docs/einstein/genai/guide/agent-api-examples.html#send-synchronous-messages) to the agent, you can pass in context variables and custom variables. The agent can use these variables during subsequent turns in the conversation. In addition to pre-defined context variables, you can pass additional information to the agent using custom variables. For example, you can pass an email as a variable and then ask the agent to fetch the call records for that email.

You can control whether variables are accessible to the API through Agentforce Builder or the Metadata API.

To learn more about variables, see [Agent Variables](https://help.salesforce.com/s/articleView?id=ai.agent_variables.htm) in Salesforce Help.

## Variables Example in Agent API

The following example contains variable data that can be used in an [Agent API](/docs/einstein/genai/guide/agent-api-get-started.html) request. This example includes a context variable (`$Context.EndUserLanguage`) and custom variables (`team_descriptor`, `troubleshootingSteps`).

```json
{
  "externalSessionKey": "{RANDOM_UUID}",
  "instanceConfig": {
    "endpoint": "https://{MY_DOMAIN_URL}"
  },
  "streamingCapabilities": {
    "chunkTypes": ["Text"]
  },
  "bypassUser": true,
  "variables": [
    {
      "name": "$Context.EndUserLanguage",
      "type": "Text",
      "value": "en_US"
    },
    {
      "name": "team_descriptor",
      "type": "Text",
      "value": "The Greatest Team"
    }
    {
      "name": "troubleshootingSteps",
      "type": "Text",
      "value": "Complete this list of troubleshooting steps: 1. Confirm that you've entered your username and password correctly. 2. Do all those other important troubleshooting steps."
    }
  ]
}
```

> **Note:**
> 
> Many variables are read-only and can only be set during the [start session](/docs/einstein/genai/guide/agent-api-examples.html#start-session) call. By default, context variables (which have the `$Context` prefix) aren't editable after the session has started, except for the `$Context.EndUserLanguage` variable. You can only modify editable variables during a send message call. When specifying variables that are derived from custom fields, omit the `__c` suffix. For instance, `Conversation_Key__c` becomes `$Context.Conversation_Key`.

## Variables in Agentforce Builder

When creating agent variables in Agentforce Builder, verify that **Allow value to be set by API** is checked.

![Edit Variables](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/agent-api-edit-variable.png)

## Variables in Metadata API

Variables can be configured using the [Metadata API](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_intro.htm) through [ConversationVariable](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_botversion.htm#ConversationVariable) (in [BotVersion](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_botversion.htm) and [BotTemplate](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_bottemplate.htm)) and [ConversationContextVariable](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_bot.htm#ConversationContextVariable) (in [Bot](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_bot.htm) and [BotTemplate](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_bottemplate.htm)). These metadata types can be useful if you want to affect how variables are accessed and used.

The following tables contains the key fields associated with agent variables in [ConversationVariable](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_botversion.htm#ConversationVariable) and [ConversationContextVariable](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_bot.htm#ConversationContextVariable).

| Field Name | Description |
| --- | --- |
| `dataType` | The data type of the variable (Text, Number, Boolean, Object, Date, DateTime, Currency, Id). |
| `description` | A description of this variable. This value is used by the Agentforce planner service. |
| `developerName` | The unique name of the variable. It must begin with a letter, not include spaces, not end with an underscore, and not contain two consecutive underscores. |
| `includeInPrompt` | Indicates whether the variable is included in the prompt sent to the Agentforce model. |
| `label` | A human-readable label that identifies the variable throughout the Salesforce user interface. |
| `visibility` | Determines which components can set this variable. If the visibility is `internal`, the variable can only be set by an action output in Salesforce. If the visibility is `external`, the variable can be set by an action output as well as an API, such as Agent API. (This field is only applicable to [ConversationVariable](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_botversion.htm#ConversationVariable).) |

To review _all_ the fields associated with these Metadata types, see [ConversationVariable](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_botversion.htm#ConversationVariable) and [ConversationContextVariable](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_bot.htm#ConversationContextVariable) in the Metadata API Developer Guide.

## See Also

-   _Salesforce Help_: [Agent Variables](https://help.salesforce.com/s/articleView?id=ai.agent_variables.htm)
-   _Agent API Developer Guide_: [Get Started with Agent API](/docs/einstein/genai/guide/agent-api-get-started.html)
-   _Agent API Developer Guide_: [Agent API Examples](/docs/einstein/genai/guide/agent-api-examples.html)
-   _Agent API Reference Guide_: [Variables Object](/docs/einstein/genai/references/agent-api?meta=type%3AVariables)
-   _Metadata API Reference Guide_: [ConversationVariable](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_botversion.htm#ConversationVariable) and [ConversationContextVariable](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_bot.htm#ConversationContextVariable)