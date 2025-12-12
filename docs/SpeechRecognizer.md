# SpeechRecognizer

## Overview

A helper for transcribing speech to text using SFSpeechRecognizer and AVAudioEngine.

## Declaration

```swift
actor SpeechRecognizer
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `delegate` | `AgentforceSpeechTranscriberDelegate?` | The delegate that receives real-time updates during speech recognition |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| `startTranscribing` | `startTranscribing(completion: @escaping (Error?) -> Void)` | Starts the speech recognition session and begins listening for audio input |
| `stopTranscribing` | `stopTranscribing()` | Stops the current speech recognition session |