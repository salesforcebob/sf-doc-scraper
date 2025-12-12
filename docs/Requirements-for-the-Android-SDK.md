# Requirements for the Android SDK

This guide outlines the system requirements and development environment setup needed to use the Agentforce Mobile SDK for Android.

## Development Environment

To develop using the Agentforce SDK, you'll need:

-   **Android Studio**: Android Studio Meerkat 2024.3.1 or newer
-   **Android Gradle Plugin**: Version 8.9.1
-   **Kotlin**: Version 1.9.22 or higher
-   **Minimum SDK Version**: API level 29 (Android 10) or higher
-   **Jetpack Compose**: The SDK's UI components are built with Compose. Your project must be configured to use it.

## Required Permissions

Several features of the SDK require user permissions.

-   Camera access for image attachments
-   Microphone access for voice input
-   Storage access for file sharing

Update your `AndroidManifest.xml` with the following perms and providers.

Also, add file paths to `res/xml`.

`@xml/file_paths`

`@xml/pdf_file_paths`

## Project Configuration

### Gradle Configuration

```kotlin
android {
    compileSdk 35

    defaultConfig {
        minSdk 29
        targetSdk 34
    }

    compileOptions {
 isCoreLibraryDesugaringEnabled = true
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }


    kotlinOptions {
        jvmTarget = "17"
    }

    buildFeatures {
        compose = true
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.8"
    }
}
```

## Next Steps

-   **Installation**: See [Install the SDK](/docs/einstein/genai/guide/agent-sdk-android-install.html) for dependency setup
-   **Integration**: See [Integration Guide](/docs/einstein/genai/guide/agent-sdk-android-integration.html) for implementation