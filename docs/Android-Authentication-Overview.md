# Android Authentication Overview

Authentication interfaces and credential management for the Agentforce Android SDK.

## Authentication Classes

-   **[AgentforceAuthCredentialProvider](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-auth-credential-provider-android.html)** - Credential provider interface
-   **[AgentforceAuthCredentials](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-auth-credentials-android.html)** - Authentication credentials structure

## Authentication Types

### OAuth Authentication

-   **Access Token**: OAuth 2.0 access token for API authentication
-   **Refresh Token**: Token for refreshing expired access tokens
-   **Expiration**: Token expiration time and refresh logic

### Org JWT Authentication

-   **JWT Token**: JSON Web Token for organization authentication
-   **Claims**: User and organization claims within the JWT
-   **Validation**: Token validation and security checks

## Implementation Patterns

### Credential Provider

```kotlin
class MyCredentialProvider : AgentforceAuthCredentialProvider {
    override fun getCredentials(): AgentforceAuthCredentials {
        // Return current authentication credentials
    }
}
```

### Credential Management

-   **Token Refresh**: Automatic token refresh when expired
-   **Security**: Secure storage and transmission of credentials
-   **Validation**: Credential validation before API calls

## Next Steps

-   **Configuration**: See [Configuration Overview](/docs/einstein/genai/references/agentforce-mobile-sdk/configuration-overview-android.html) for setup
-   **Data Models**: See [Data Models Overview](/docs/einstein/genai/references/agentforce-mobile-sdk/data-models-overview-android.html) for message handling
-   **Integration**: See [Android Development](/docs/einstein/genai/references/agentforce-mobile-sdk/development-android.html) for architecture patterns