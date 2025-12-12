# AgentforceContextManager

`class AgentforceContextManager(agentforcePageContext: AgentforcePageContext? = null) : AgentforceContextManaging`

Manages conversation context and page context for Agentforce conversations.

## Signature

```kotlin
class AgentforceContextManager(
    var agentforcePageContext: AgentforcePageContext? = null
) : AgentforceContextManaging
```

## Constructors

| Constructor | Description |
| --- | --- |
| `constructor(agentforcePageContext: AgentforcePageContext? = null)` |  |

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `agentforcePageContext` | `var AgentforcePageContext?` | Current page context variable |

## Functions

| Method | Return Type | Description |
| --- | --- | --- |
| `currentContext()` | `MutableMap<String, CopilotContextVariable>` |  |
| `resetPageContext()` | `Unit` |  |
| `setAdditionalContextVariables(CopilotAdditionalContext context)` | `Unit` |  |
| `updatePageContext(AgentforcePageContext context)` | `Unit` | Set current page context variable Use resetPageContext if you wish to make the page context null |

## Nested Types

### Companion

```kotlin
object Companion
```

#### Companion Methods

| Method | Return Type | Description |
| --- | --- | --- |
| `validateTypes(CopilotAdditionalContext context)` | `List<CopilotContextVariable>` |  |

## Related Documentation

-   [AgentforceClient](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-client-android.html)
-   [AgentforceConversation](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-android.html)