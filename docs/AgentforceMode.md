# AgentforceMode

`sealed class AgentforceMode`

Configuration options for AgentforceClient initialization.

## Types

### EmployeeAgent

```kotlin
data class EmployeeAgent(
    val employeeAgentConfiguration: EmployeeAgentConfiguration,
    val agentforceConfiguration: AgentforceConfiguration? = null
) : AgentforceMode
```

### ServiceAgent

```kotlin
data class ServiceAgent(
    val serviceAgentConfiguration: ServiceAgentConfiguration,
    val agentforceConfiguration: AgentforceConfiguration? = null
) : AgentforceMode
```

### FullConfig

```kotlin
data class FullConfig(
    val agentforceConfiguration: AgentforceConfiguration
) : AgentforceMode
```

## Related Documentation

-   [EmployeeAgentConfiguration](/docs/einstein/genai/references/agentforce-mobile-sdk/employee-agent-configuration-android.html)
-   [ServiceAgentConfiguration](/docs/einstein/genai/references/agentforce-mobile-sdk/service-agent-configuration-android.html)
-   [AgentforceConfiguration](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-configuration-android.html)
-   [AgentforceClient](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-client-android.html)