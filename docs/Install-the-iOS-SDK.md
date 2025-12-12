# Install the iOS SDK

To get started, install the SDK and then update some of the properties in your project.

## Install the Frameworks

You can install the SDK using CocoaPods, or you can download and install the frameworks manually.

### Install with CocoaPods

If you haven't already done so, install the [CocoaPods](https://cocoapods.org/about) gem, and initialize the CocoaPods main repository.

```ruby
sudo gem install cocoapods
pod setup
```

If you already have CocoaPods installed, update your pods to the latest version.

```ruby
pod update
```

To create a Podfile, change to the root directory of your application project. Then create or edit the file named Podfile.

Add the following lines to your project's Podfile. The Agentforce SDK podspec will pull in additional dependencies as needed.

At the top of your `Podfile`, add the Salesforce Mobile iOS Spec Repo above the CocoaPods trunk repo. Make sure to add the CocoaPods CDN if you use any other CocoaPods dependencies.

```ruby
source 'https://github.com/forcedotcom/SalesforceMobileSDK-iOS-Specs.git'
source 'https://github.com/livekit/podspecs.git'
source 'https://cdn.cocoapods.org/'
```

Then, in your target, add:

```ruby
pod 'AgentforceSDK'
pod 'Messaging-InApp-Core', '1.9.3-Experimental'
pod 'LiveKitClient' # Required to ensure CocoaPods looks in the correct source location
```

At the bottom of your podfile where you set up your post installer, configure it as shown:

```ruby
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
    end
  end
end
```

After adding the pods, run `pod install` from your project's root directory. If CocoaPods is unable to locate the specs, try `pod install --repo-update`.

## Dependencies

The AgentforceSDK includes the following key dependencies:

-   [AgentforceMobileService-iOS](https://github.com/forcedotcom/AgentforceMobileService-iOS): The API layer for Agentforce.
-   [SalesforceNetwork](https://github.com/forcedotcom/SalesforceMobileInterfaces-iOS): An interface for consuming applications to provide a networking layer to Agentforce Mobile SDK.
-   [SalesforceNavigation](https://github.com/forcedotcom/SalesforceMobileInterfaces-iOS): An interface for consuming applications to handle navigation events occurring within Agentforce Mobile SDK views.
-   [SalesforceUser](https://github.com/forcedotcom/SalesforceMobileInterfaces-iOS): A designated way to provide user information to Agentforce Mobile SDK.
-   [SalesforceLogging](https://github.com/forcedotcom/SalesforceMobileInterfaces-iOS): An interface for consuming applications to handle logging from within Agentforce Mobile SDK.
-   [Swift-Markdown-UI](https://github.com/gonzalezreal/swift-markdown-ui): A rendering library for GitHub Flavored Markdown.

## Next Steps

-   **Integration**: See [Integration Guide](/docs/einstein/genai/guide/agent-sdk-ios-integration.html) for implementation
-   **Requirements**: Review [Requirements](/docs/einstein/genai/guide/agent-sdk-ios-requirements.html) if you encounter issues