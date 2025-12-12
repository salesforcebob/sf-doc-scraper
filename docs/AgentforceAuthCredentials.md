# AgentforceAuthCredentials

`sealed class AgentforceAuthCredentials`

## Signature

```kotlin
sealed class AgentforceAuthCredentials
```

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `getHeaders` | `fun getHeaders(): Map<String, String>?` | Returns the headers for the current user |

## Nested Types

### OAuth

```kotlin
data class OAuth(
    val authToken: String,
    val orgId: String,
    val userId: String
) : AgentforceAuthCredentials()
```

### OrgJWT

```kotlin
data class OrgJWT(
    val orgJWT: String
) : AgentforceAuthCredentials()
```

### Guest

```kotlin
data class Guest(
    val url: String
) : AgentforceAuthCredentials()
```

## Related Documentation

-   [AgentforceAuthCredentialProvider](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-auth-credential-provider-android.html)
-   [AgentforceConfiguration](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-configuration-android.html)