# Integrate Agentforce SDK

To use the SDK, be sure to import the Agentforce SDK packages.

```kotlin
import com.salesforce.android.agentforceservice.*
```

## Implement Core Service Interfaces

The Agentforce Mobile SDK is designed for flexibility and delegates several core responsibilities to the host application. You must create concrete implementations for the following interfaces:

-   **AgentforceAuthCredentialProvider**: Supplies the SDK with the authentication token (e.g., OAuth 2.0 access token) required to communicate securely with Salesforce APIs.
-   **AgentforceInstrumentation**: A handler for the SDK to emit instrumentation and telemetry data into your app's analytics system.

For authentication, create a credential provider using one of the supported authentication methods.

```kotlin
class MyAppCredentialProvider : AgentforceAuthCredentialProvider {
   override fun getAuthCredentials(): AgentforceAuthCredentials {
       return AgentforceAuthCredentials.OAuth(
           authToken = "YOUR_AUTH_TOKEN",
           orgId = "YOUR_ORG_ID",
           userId = "YOUR_USER_ID"
       )
   }
}
```
```kotlin
class MyAppCredentialProvider : AgentforceAuthCredentialProvider {
   override fun getAuthCredentials(): AgentforceAuthCredentials {
       return AgentforceAuthCredentials.OrgJWT(orgJWT = "YOUR_ORG_JWT")
   }
}
```
```kotlin
class MyAppCredentialProvider : AgentforceAuthCredentialProvider {
   override fun getAuthCredentials(): AgentforceAuthCredentials {
       return AgentforceAuthCredentials.Guest(url = "YOUR_GUEST_URL")
   }
}
```

Related links:

-   _Salesforce Mobile SDK Developer Guide_: [OAuth 2.0 Authentication Flow](https://developer.salesforce.com/docs/platform/mobile-sdk/guide/oauth-intro-flow.html)
-   _Salesforce Help_: [JWT-Based Access Tokens](https://help.salesforce.com/s/articleView?id=xcloud.jwt_access_tokens.htm&type=5)

## Configure Agent

In order to use the Agentforce SDK you must first identify the agent type you are targeting: Employee Agent or Service Agent. A single app may target each, but requires configuration and instantiation of separate Agentforce clients. To learn more, see [Create an Agent from a Template](https://help.salesforce.com/s/articleView?id=ai.agent_setup_type.htm) in Salesforce Help.

> **Tip:**
> 
> For guidance on gathering information for the agent configuration object, see [Agent Type Setup](/docs/einstein/genai/guide/agent-sdk-before-you-begin.html#agent-type) in Before You Begin.

The following snippets illustrate how to configure your agent for each agent type.

```kotlin
// Configure an Employee agent
val config = AgentforceConfiguration.builder(myAuthCredentialProvider)
    .setSalesforceDomain("https://your-domain.my.salesforce.com")
    .setAgentId("YOUR_AGENT_ID")
    .setNetwork(myNetworkProvider)
    .setLogger(myLogger)
    .setNavigation(myNavigation)
    .build()

// Set mode for Employee agent
val agentforceMode = AgentforceMode.FullConfig(config)

// Create client
agentforceClient?.init(
    agentforceMode = agentforceMode,
    application = this.application
)
```
```kotlin
// Configure a Service agent
val agentforceMode = AgentforceMode.ServiceAgent(
    serviceAgentConfiguration = ServiceAgentConfiguration.builder(
        serviceApiURL = "https://your-service-api-url.com",
        organizationId = "YOUR_ORG_ID",
        esDeveloperName = "YOUR_CHAT_DEVELOPER_NAME"
    ).build()
)

// Create client
agentforceClient?.init(
    authCredentialProvider = configuration.authCredentialProvider,
    agentforceMode = agentforceMode,
    application = this.application
)
```
```kotlin
val config = AgentforceConfiguration.builder(
   authCredentialProvider =
       object : AgentforceAuthCredentialProvider {
           override fun getAuthCredentials(): AgentforceAuthCredentials {
               return AgentforceAuthCredentials.OAuth(
                   authToken = "YOUR_AUTH_TOKEN",
                   orgId = "YOUR_ORG_ID",
                   userId = "YOUR_USER_ID"
               )
           }
       }
).setApplication(application)
   .setSalesforceDomain("https://your-domain.my.salesforce.com")
   .setNetwork(myNetworkProvider)
   .setLogger(myLogger)
   .setNavigation(myNavigation)
   .setDataProvider(myDataProvider)
   .setFeatureFlagSettings(
       AgentforceFeatureFlagSettings.builder().build()
   )
   .setCameraUriProvider(myCameraUriProvider)
   .setVoiceManaging(myAgentforceVoiceManaging)
   .setInstrumentationHandler(myAgentforceInstrumentationHandler)
   .setUser(myUser)
   .setPermission(myPermission)
   .setThemeManager(myAgentforceThemeManager)
   .setViewProvider(myAgentforceViewProvider)
   .build()

val agentforceMode = AgentforceMode.FullConfig(config)
agentforceClient?.init(authCredentialProvider = config.authCredentialProvider, agentforceMode = agentforceMode, application = application)
```

Create and retain an instance of `AgentforceClient`. It's best to hold this in a lifecycle-aware component, like a `ViewModel`, to ensure the conversation state persists across configuration changes.

## Start a Conversation

Once you've initialized the `AgentforceClient`, you can start a conversation with an agent using the `startAgentforceConversation` method.

```kotlin
// Start the conversation
agentforceClient.startAgentforceConversation()

// Get the conversation session
val session = agentforceClient.fetchAgentforceSession(YOUR_AGENT_ID)
```

This method returns an `AgentforceConversation` object, which represents a single conversation with an agent.

## Next Steps

-   **Prebuilt UI**: See [Use Prebuilt UI](/docs/einstein/genai/guide/agent-sdk-android-prebuilt-ui.html) for ready-to-use chat interface
-   **Headless**: See [Build a Headless Experience](/docs/einstein/genai/guide/agent-sdk-android-headless.html) for custom UI implementation
-   **Customization**: See [Branding and Theming](/docs/einstein/genai/guide/agent-sdk-android-branding-theming.html) for visual customization