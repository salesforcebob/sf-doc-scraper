# Android Quick Start Guide

Get up and running quickly with the Agentforce Mobile SDK for Android using these instructions.

## 1\. Add Dependencies

Add the Agentforce SDK to your project.

```kotlin
// settings.gradle.kts
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://jitpack.io") }
        maven { url = uri("https://opensource.salesforce.com/AgentforceMobileSDK-Android/agentforce-sdk-repository") }
        maven { url = uri("https://s3.amazonaws.com/salesforce-async-messaging-experimental/public/android") }
    }
}

// build.gradle.kts
plugins {
   id("com.android.application")
   id("kotlin-android")
   id("kotlin-kapt")
   id("kotlinx-serialization")
   id("org.jetbrains.kotlin.plugin.compose")
}

// app/build.gradle.kts
dependencies {

    // Agentforce SDK Dependencies
    api("com.salesforce.android.agentforcesdk:agentforce-sdk:14.0.0")

    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:1.1.5")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")
}
```

To learn more, see [Install the Android SDK](/docs/einstein/genai/guide/agent-sdk-android-install.html).

## 2\. Add Required Permissions

See [Android Requirements](/docs/einstein/genai/guide/agent-sdk-android-requirements.html).

## 3\. Implement Credential Provider

To use the SDK, be sure to import the Agentforce SDK packages.

```swift
import com.salesforce.android.agentforceservice.*
```

Create a credential provider using one of the supported authentication methods.

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

To learn more, see [Integrate Agentforce SDK](/docs/einstein/genai/guide/agent-sdk-android-integration.html).

## 4\. Configure Chat

Configure your chat object for Employee agent or Service agent.

> **Tip:**
> 
> For guidance on gathering information for the agent configuration object, see [Agent Type Setup](/docs/einstein/genai/guide/agent-sdk-before-you-begin.html#agent-type) in Before You Begin.

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

To learn more, see [Integrate Agentforce SDK](/docs/einstein/genai/guide/agent-sdk-android-integration.html).

## 5\. Start and Present Chat

Start the chat conversation.

```kotlin
// Start conversation and present UI
client.startAgentforceConversation()
```

And add the UI component.

```kotlin
@Composable
fun MyScreen() {
    // Add the Agentforce Launcher (FAB)
    AgentforceLauncherContainer(client = agentforceClient)
}
```

To learn more, see [Integrate Agentforce SDK](/docs/einstein/genai/guide/agent-sdk-android-integration.html).

## Next Steps

-   **Customization**: See [Branding and Theming](/docs/einstein/genai/guide/agent-sdk-android-branding-theming.html) for visual customization
-   **Full Integration**: See [Integration Guide](/docs/einstein/genai/guide/agent-sdk-android-integration-overview.html) for complete implementation