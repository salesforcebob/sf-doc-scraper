# Configure Extensions

These boolean fields extend the OpenAPI specification. Use these fields to define agent actions that are automatically created and made available in agents. For MuleSoft for Agentforce: Topic Center extensions, see [Configure Topics](https://docs.mulesoft.com/anypoint-code-builder/ai-enabling-api-project-topic-center#configure-topics).

| Extension | Description |
| :-- | :-- |
| `x-sfdc/agent/action/publishAsAgentAction` | Required. Set this attribute to true to enable the operation as an action. |
| `x-sfdc/privacy/isPii` | Optional. If `publishAsAgentAction` is enabled, set this attribute to true to enable PII service for queries sent under that operation. |
| `x-sfdc/agent/action/isUserInput` | Required if `publishAsAgentAction` is enabled. Set this attribute to true to surface the field to the user for further input. |
| `x-sfdc/agent/action/isDisplayable` | Required if `publishAsAgentAction` is enabled. Set this attribute to true for the field to be displayable to the user. |

The metadata must be defined inside a schema. For example:

```text
...
components:
  schemas:
    Pet:
      x-sfdc:
        agent:
          action:
            isDisplayable:
              true
...
```