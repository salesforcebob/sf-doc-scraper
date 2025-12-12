# Install the Android SDK

Follow these steps to add the required dependencies to your Android project.

## Add the Maven Repository

Configure your top-level `settings.gradle.kts` file as shown:

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
```

## Add SDK Dependencies

In your app-level `build.gradle.kts` file, add the dependencies for the integration path you choose. The `agentforcesdk` artifact is for the Full UI experience, while `agentforce-service` is for the Headless approach.

```kotlin
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

After adding the dependencies, sync your project with the Gradle files.

## Next Steps

-   **Integration**: See [Integration Guide](/docs/einstein/genai/guide/agent-sdk-android-integration.html) for implementation
-   **Requirements**: Review [Requirements](/docs/einstein/genai/guide/agent-sdk-android-requirements.html) if you encounter issues