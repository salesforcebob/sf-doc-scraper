# Requirements for the iOS SDK

The Agentforce SDK requires **iOS 17.0** or higher, **Xcode** version **16.0** or higher and **Swift** version **5.0** or higher.

## Development Environment

To develop using the Agentforce SDK, you'll need:

-   **iOS**: Version 17.0 or later
-   **Xcode**: Version 16.0 or later
-   **Swift**: Version 5.0 or later
-   **CocoaPods**: Version 1.10.1 or higher (if using CocoaPods)

## Required Permissions

Several features of the SDK require you to add values to your project's Info property list (`Info.plist`).

### Camera and Photos

Add descriptions for why the app wants to access the device's camera and photo library. This functionality is necessary when a customer attempts to send an image attachment to a rep.

Add string values for `Privacy - Camera Usage Description` and `Privacy - Photo Library Usage Description`.

```xml
NSCameraUsageDescription
Used when sending an image to a rep.
NSPhotoLibraryUsageDescription
Used when sending an image to a rep.
```

### Access to Files

Allow the app to access files on the device so that a customer can share a file with the rep.

Set `Supports opening documents in place` and `Application supports iTunes file sharing` to `YES`.

```xml
LSSupportsOpeningDocumentsInPlace

UIFileSharingEnabled

```

### Access to Microphone and Speech Recognition

Allow the app access to the microphone so that a customer may provide voice input, for voice transcription to an agent or rep.

Add descriptions for `Privacy - Speech Recognition Usage Description` and `Privacy - Microphone Usage Description`.

```xml
NSSpeechRecognitionUsageDescription
You can use voice input to interact with an agent.
NSMicrophoneUsageDescription
Audio is recorded to transcribe text for voice input; it's deleted after transcription.
```

## Next Steps

-   **Installation**: See [Install the SDK](/docs/einstein/genai/guide/agent-sdk-ios-install.html) for dependency setup
-   **Integration**: See [Integration Guide](/docs/einstein/genai/guide/agent-sdk-ios-integration.html) for implementation