# iOS Quick Start Guide

Get up and running quickly with the Agentforce Mobile SDK for iOS using these instructions.

## 1\. Install Dependencies

Add the Agentforce SDK to your project using CocoaPods.

```ruby
# Add to the top of your podfile
source 'https://github.com/forcedotcom/SalesforceMobileSDK-iOS-Specs.git'
source 'https://github.com/livekit/podspecs.git'
source 'https://cdn.cocoapods.org/'

# Add to your target
target 'MyApp' do
  pod 'AgentforceSDK'
  pod 'Messaging-InApp-Core', '1.9.3-Experimental'
  pod 'LiveKitClient' # Required to ensure Cocoapods looks in the correct source location
end

# Add to the bottom of your podfile where you set up your post installer
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
    end
  end
end
```

To learn more, see [Install the iOS SDK](/docs/einstein/genai/guide/agent-sdk-ios-install.html).

## 2\. Add Required Permissions

See [iOS Requirements](/docs/einstein/genai/guide/agent-sdk-ios-requirements.html).

## 3\. Implement Credential Provider

To use the SDK, be sure to import the Agentforce SDK package.

```swift
import AgentforceSDK
```

Create a credential provider using one of the supported authentication methods.

```swift
class MyAppCredentialProvider: AgentforceAuthCredentialProviding {
    public func getAuthCredentials() -> AgentforceAuthCredential {
        return .OAuth(
            authToken: "YOUR_AUTH_TOKEN",
            orgId: "YOUR_ORG_ID",
            userId: "YOUR_USER_ID"
        )
    }
}
```
```swift
class MyAppCredentialProvider: AgentforceAuthCredentialProviding {
    public func getAuthCredentials() -> AgentforceAuthCredential {
        return .OrgJWT(orgJWT: "YOUR_ORG_JWT")
    }
}
```
```swift
class MyAppCredentialProvider: AgentforceAuthCredentialProviding {
    public func getAuthCredentials() -> AgentforceAuthCredential {
        return .Guest("")
    }
}
```

To learn more, see [Integrate Agentforce SDK](/docs/einstein/genai/guide/agent-sdk-ios-integration.html).

## 4\. Configure Chat

Configure your chat object for Employee agent or Service agent.

> **Tip:**
> 
> For guidance on gathering information for the agent configuration object, see [Agent Type Setup](/docs/einstein/genai/guide/agent-sdk-before-you-begin.html#agent-type) in Before You Begin.

```swift
let user = User(userId: "YOUR_USER_ID", org: Org(id: "YOUR_ORG_ID"), displayName: "User Display Name")

// Configure an Employee agent
let config = EmployeeAgentConfiguration(
    user: user,
    forceConfigEndpoint: "https://your-domain.my.salesforce.com"
)

// Create client
let client = AgentforceClient(
   credentialProvider: credentialProvider,
   mode: .employeeAgent(config)
)
```
```swift
// Set up Service UI settings
let serviceUISettings = ServiceUISettings(
    downloadTranscript: false, // Whether to show the download transcript option
    endConversation: true      // Whether to show the end conversation option
)

// Configure a Service agent
let config = ServiceAgentConfiguration(
    esDeveloperName: "YOUR_CHAT_DEVELOPER_NAME",
    organizationId: "YOUR_ORG_ID",
    serviceApiURL: "https://your-service-api-url.com",
    serviceUISettings: serviceUISettings
)

// Create client
let serviceClient = AgentforceClient(
    credentialProvider: credentialProvider,
    mode: .serviceAgent(config)
)
```

To learn more, see [Integrate Agentforce SDK](/docs/einstein/genai/guide/agent-sdk-ios-integration.html).

## 5\. Start and Present Chat

Start the chat conversation and present the chat UI.

```swift
let employeeConversation = agentforceClient.startAgentforceConversation(
    forAgentId: "YOUR_AGENT_ID"
)
let chatView = try client.createAgentforceChatView(
    conversation: employeeConversation,
    delegate: nil,
    onContainerClose: { /* handle close */ }
)
```
```swift
let serviceConversation = agentforceClient.startAgentforceConversation(
    forESDeveloperName: "YOUR_CHAT_DEVELOPER_NAME"
)
let chatView = try client.createAgentforceChatView(
    conversation: serviceConversation,
    delegate: nil,
    onContainerClose: { /* handle close */ }
)
```

To learn more, see [Integrate Agentforce SDK](/docs/einstein/genai/guide/agent-sdk-ios-integration.html). For guidance on getting values for the `createAgentforceChatView` method, see [Agent Type Setup](/docs/einstein/genai/guide/agent-sdk-before-you-begin.html#agent-type).

## Next Steps

-   **Customization**: See [Branding and Theming](/docs/einstein/genai/guide/agent-sdk-ios-branding-theming.html) for visual customization
-   **Full Integration**: See [Integration Guide](/docs/einstein/genai/guide/agent-sdk-ios-integration-overview.html) for complete implementation