# AgentforceConfiguration

`class AgentforceConfiguration`

Configuration for Agentforce SDK.

## Signature

```kotlin
class AgentforceConfiguration
```

## Types

### Builder

```kotlin
class Builder(authCredentialProvider: AgentforceAuthCredentialProvider)
```

Builder for AgentforceConfiguration.

### Companion

```kotlin
object Companion
```

Builder for AgentforceConfiguration.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `agentId` | `String?` | Unique identifier for the agent |
| `application` | `Application?` | Android application context |
| `authCredentialProvider` | `AgentforceAuthCredentialProvider` | Provides authentication tokens |
| `cameraUriProvider` | `AgentforceCameraUriProvider?` | Provides URIs for camera captures |
| `connectionInfo` | `AgentforceConnectionInfo?` | Connection details for the SDK |
| `dataProvider` | `DataProvider?` | Custom data provider for content |
| `delegate` | `AgentforceUIDelegate?` | Custom UI delegate for advanced customization |
| `featureFlagSettings` | `AgentforceFeatureFlagSettings?` | Feature flag settings for the SDK |
| `instrumentationHandler` | `AgentforceInstrumentationHandler?` | Handles analytics and instrumentation events |
| `isVoiceModeEnabled` | `Boolean` | Whether voice mode is enabled |
| `logger` | `Logger?` | Custom logger for SDK events |
| `navigation` | `Navigation?` | Custom navigation handler |
| `network` | `Network?` | Custom network implementation |
| `onboardingManager` | `AgentforceOnboardingManager?` | Manages onboarding flow |
| `permission` | `Permissions?` | Permission management interface |
| `readbackManaging` | `AgentforceReadbackManaging?` | Manages readback functionality |
| `salesforceDomain` | `String?` | Salesforce instance domain |
| `serviceApiURL` | `String?` | Service API URL |
| `themeManager` | `AgentforceThemeManager` | Theme management for UI components |
| `user` | `User?` | User information interface |
| `viewProvider` | `AgentforceViewProvider?` | Provides custom views for UI components |
| `voiceManaging` | `AgentforceVoiceManaging?` | Manages voice functionality |

## Builder Functions

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| `build()` | None | `AgentforceConfiguration` | Builds the configuration |
| `setAgentId(id: String?)` | `id: String?` | `Builder` | Sets the agent ID |
| `setApplication(application: Application?)` | `application: Application?` | `Builder` | Sets the application context |
| `setCameraUriProvider(cameraUriProvider: AgentforceCameraUriProvider?)` | `cameraUriProvider: AgentforceCameraUriProvider?` | `Builder` | Sets the camera URI provider |
| `setConnectionInfo(connectionInfo: AgentforceConnectionInfo?)` | `connectionInfo: AgentforceConnectionInfo?` | `Builder` | Sets connection information |
| `setDataProvider(dataProvider: DataProvider?)` | `dataProvider: DataProvider?` | `Builder` | Sets the data provider |
| `setDelegate(delegate: AgentforceUIDelegate?)` | `delegate: AgentforceUIDelegate?` | `Builder` | Sets the UI delegate |
| `setFeatureFlagSettings(flags: AgentforceFeatureFlagSettings)` | `flags: AgentforceFeatureFlagSettings` | `Builder` | Sets feature flag settings |
| `setInstrumentationHandler(handler: AgentforceInstrumentationHandler?)` | `handler: AgentforceInstrumentationHandler?` | `Builder` | Sets the instrumentation handler |
| `setLogger(logger: Logger?)` | `logger: Logger?` | `Builder` | Sets the logger |
| `setNavigation(navigation: Navigation?)` | `navigation: Navigation?` | `Builder` | Sets the navigation handler |
| `setNetwork(network: Network?)` | `network: Network?` | `Builder` | Sets the network implementation |
| `setOnboardingManager(onboardingManager: AgentforceOnboardingManager?)` | `onboardingManager: AgentforceOnboardingManager?` | `Builder` | Sets the onboarding manager |
| `setPermission(permission: Permissions?)` | `permission: Permissions?` | `Builder` | Sets the permission interface |
| `setReadbackManaging(readbackManaging: AgentforceReadbackManaging?)` | `readbackManaging: AgentforceReadbackManaging?` | `Builder` | Sets the readback manager |
| `setSalesforceDomain(domain: String?)` | `domain: String?` | `Builder` | Sets the Salesforce domain |
| `setServiceApiURL(serviceApiURL: String?)` | `serviceApiURL: String?` | `Builder` | Sets the service API URL |
| `setThemeManager(themeManager: AgentforceThemeManager?)` | `themeManager: AgentforceThemeManager?` | `Builder` | Sets the theme manager |
| `setUser(user: User?)` | `user: User?` | `Builder` | Sets the user interface |
| `setViewProvider(provider: AgentforceViewProvider?)` | `provider: AgentforceViewProvider?` | `Builder` | Sets the view provider |
| `setVoiceManaging(voiceManaging: AgentforceVoiceManaging?)` | `voiceManaging: AgentforceVoiceManaging?` | `Builder` | Sets the voice manager |
| `setVoiceModeEnabled(enabled: Boolean)` | `enabled: Boolean` | `Builder` | Sets voice mode enabled state |

## Companion Functions

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| `builder(authCredentialProvider: AgentforceAuthCredentialProvider)` | `authCredentialProvider: AgentforceAuthCredentialProvider` | `AgentforceConfiguration.Builder` | Creates a new builder instance |
| `createFromEmployeeAgentConfiguration(authCredentialProvider: AgentforceAuthCredentialProvider, employeeAgentConfiguration: EmployeeAgentConfiguration, application: Application, baseFeatureFlags: AgentforceFeatureFlagSettings? = null)` | `authCredentialProvider: AgentforceAuthCredentialProvider`, `employeeAgentConfiguration: EmployeeAgentConfiguration`, `application: Application`, `baseFeatureFlags: AgentforceFeatureFlagSettings? = null` | `AgentforceConfiguration.Builder` | Creates builder from employee agent configuration |
| `createFromServiceAgentConfiguration(authCredentialProvider: AgentforceAuthCredentialProvider? = null, serviceAgentConfiguration: ServiceAgentConfiguration, application: Application, baseFeatureFlags: AgentforceFeatureFlagSettings? = null)` | `authCredentialProvider: AgentforceAuthCredentialProvider? = null`, `serviceAgentConfiguration: ServiceAgentConfiguration`, `application: Application`, `baseFeatureFlags: AgentforceFeatureFlagSettings? = null` | `AgentforceConfiguration.Builder` | Creates builder from service agent configuration |

## Related Documentation

-   [AgentforceMode](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-mode-android.html)
-   [EmployeeAgentConfiguration](/docs/einstein/genai/references/agentforce-mobile-sdk/employee-agent-configuration-android.html)
-   [ServiceAgentConfiguration](/docs/einstein/genai/references/agentforce-mobile-sdk/service-agent-configuration-android.html)
-   [AgentforceClient](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-client-android.html)