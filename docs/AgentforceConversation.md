# AgentforceConversation

`class AgentforceConversation`

Concrete implementation of the AgentConversation protocol providing full conversation management capabilities.

## Overview

`AgentforceConversation` orchestrates all aspects of a conversation session including service communication, state management, message processing, and context handling. This class serves as the primary interface between application code and the underlying Agentforce service infrastructure.

## Declaration

```swift
class AgentforceConversation
```

## Topics

This section provides detailed information about the AgentConversation class properties and methods.

### Instance Properties

| Property | Type | Description |
| --- | --- | --- |
| `agentId` | `String?` | The identifier of the agent handling this conversation. Set during conversation initialization and may be updated if agent switching occurs during the conversation. |
| `conversationId` | `UUID` | Unique identifier for this conversation instance. Generated when the conversation is created and provides a stable identifier for tracking, analytics, and debugging purposes. |
| `conversationState` | `Published<AgentforceConversationState>.Publisher` | Publisher providing real-time conversation state updates. |
| `deliveryStatusEvents` | `AnyPublisher<MessageDeliveryStatusEvent, Never>` | Publisher for delivery status events. |
| `hasEnded` | `Bool` | Indicates whether the conversation has been explicitly ended by the user. When true, the conversation has been ended and should show the ended message. Set to true when endConversation() is called, false when sendUtterance() resumes conversation. |
| `isHumanAgentMode` | `Bool` | Indicates whether the conversation is with a human agent. When true, allows multiple consecutive user messages without waiting for responses. |
| `messages` | `Published<[AgentforceMessage]>.Publisher` | Publisher providing access to the complete conversation message history. Emits updates whenever new messages are added or existing messages are modified. |
| `sessionId` | `String?` | The unique session identifier for this conversation. |
| `statusEvents` | `AnyPublisher<AgentforceEvent, Never>` | Publisher for status events (typing indicators, etc.). |
| `systemEvents` | `AnyPublisher<AgentforceEvent, Never>` | Publisher for system events (participant changes, escalations, etc.). |

### Instance Methods

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| `closeConversation()` | None | `async throws` | Closes the current conversation session and clears the session ID to prevent resumption. |
| `downloadTranscript()` | None | `async throws -> TranscriptResponse` | Downloads a PDF transcript of the current conversation. |
| `endConversation()` | None | `async throws` | Ends the current conversation session. |
| `recommendedUtterances()` | None | `async throws -> [String]` | Manually retrieve recommended utterances (fetches fresh data). |
| `reset()` | None | `async throws` | Removes all messages from the conversation. |
| `sendUtterance(utterance:attachment:)` | `utterance: String, attachment: AgentforceAttachment?` | `async` | Sends a user message to the agent with optional file attachments. Initiates a complete message exchange cycle, sending the user's input to the Agentforce service and preparing to receive agent responses. |
| `setAdditionalContext(context:)` | `context: [AgentforceVariable]` | `async throws` | Updates the conversation context with additional variables that inform agent responses. Context variables provide essential information that helps agents understand the current situation and provide more relevant, accurate responses. |
| `updateRecommendedUtterances(recommendations:)` | `recommendations: [String]` | None | Updates the conversation with recommended utterances for quick user interaction. |

## Architecture Overview

The conversation implementation follows a layered architecture:

-   **Public API Layer**: Implements the `AgentConversation` protocol for application interaction
-   **State Management Layer**: Tracks conversation state and publishes updates
-   **Service Communication Layer**: Handles network communication with Agentforce services
-   **Message Processing Layer**: Processes incoming responses and manages conversation history
-   **Context Management Layer**: Maintains conversation context and user information

## Thread Safety

The conversation implementation is designed for thread safety:

-   Public methods can be safely called from any thread
-   Internal state updates are properly synchronized
-   Publishers emit updates from appropriate threading contexts
-   Asynchronous operations are properly managed to prevent race conditions