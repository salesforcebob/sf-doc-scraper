# AgentforceComponent

`@Serializable data class AgentforceComponent`

Base component model for rendering dynamic UI elements in the Agentforce Android SDK.

## Signature

```kotlin
@Serializable
data class AgentforceComponent(
    val definition: String,
    val name: String? = null,
    val properties: Map = emptyMap(),
    val regions: AgentforceDataRegions
)
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| definition | String | Component type identifier (e.g., "copilot/list") |
| name | String? | Optional component instance name |
| properties | `@Serializable(with = AgentforceViewPropertiesSerializer::class) Map<String, Any>` | Component-specific configuration properties with custom serialization |
| regions | AgentforceDataRegions | Data regions containing nested components and content |

## Constructor

| Constructor | Parameters |
| --- | --- |
| `AgentforceComponent(definition, name, properties, regions)` | `definition: String`, `name: String? = null`, `properties: Map<String, Any> = emptyMap()`, `regions: AgentforceDataRegions` |

## Extension Functions

| Function | Signature | Description |
| --- | --- | --- |
| `getIntProperty` | `fun AgentforceComponent.getIntProperty(key: String, default: Int): Int` | Get integer property with default value |
| `getListProperty` | `fun AgentforceComponent.getListProperty(key: String, default: List<String>): List<String>` | Get list property with default value |
| `getMapProperty` | `fun AgentforceComponent.getMapProperty(key: String, default: Map<String, Any>): Map<String, Any>` | Get map property with default value |
| `getStringProperty` | `fun AgentforceComponent.getStringProperty(key: String, default: String): String` | Get string property with default value |

## Related Documentation

-   [AgentforceClient](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-client-android.html) - Client interface
-   [AgentforceAPI](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-api-android.html) - Backend component data source