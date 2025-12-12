# ServiceAgentConfiguration

`class ServiceAgentConfiguration`

## Signature

```kotlin
class ServiceAgentConfiguration
```

Configuration class for service agent settings.

## Types

### Builder

```kotlin
class Builder(
    esDeveloperName: String,
    organizationId: String,
    serviceApiURL: String
)
```

### Companion

```kotlin
object Companion
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| esDeveloperName | String | Embedded Service developer name |
| organizationId | String | Organization identifier |
| serviceApiURL | String | Service API endpoint URL |
| serviceUISettings | ServiceUISettings | Service UI settings |

## Builder Functions

| Function | Signature | Description |
| --- | --- | --- |
| build | `fun build(): ServiceAgentConfiguration` | Creates a ServiceAgentConfiguration instance |
| setServiceUISettings | `fun setServiceUISettings(settings: ServiceUISettings): Builder` | Sets the service UI settings |

## Related Documentation

-   [AgentforceMode](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-mode-android.html)
-   [AgentforceConfiguration](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-configuration-android.html)