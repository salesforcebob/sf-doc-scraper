# Android Data Models Overview

Data structures and models for the Agentforce Android SDK.

## Data Model Classes

-   **[AgentforceMessage](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-message-android.html)** - Message structure and handling
-   **[AgentforceAttachment](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-attachment-android.html)** - File attachment support

## Message Types

### Text Messages

-   **Content**: Message text content and formatting
-   **Metadata**: Timestamps, sender information, and message state
-   **Formatting**: Rich text support and markdown rendering

### Attachment Messages

-   **File Types**: Support for images, documents, and media files
-   **Upload**: File upload and processing
-   **Display**: Attachment rendering in UI components

## Data Flow

### Message Creation

1.  **User Input**: Capture user input through UI components
2.  **Message Construction**: Create AgentforceMessage objects
3.  **Validation**: Validate message content and attachments
4.  **Transmission**: Send messages through the SDK

### Message Processing

1.  **Reception**: Receive messages from the agent
2.  **Parsing**: Parse message content and attachments
3.  **Rendering**: Display messages in UI components
4.  **State Management**: Update conversation state

## Next Steps

-   **UI Components**: See [Android UI Components](/docs/einstein/genai/references/agentforce-mobile-sdk/ui-components-android.html) for message display
-   **Configuration**: See [Configuration Overview](/docs/einstein/genai/references/agentforce-mobile-sdk/configuration-overview-android.html) for setup
-   **Integration**: See [Android Development](/docs/einstein/genai/references/agentforce-mobile-sdk/development-android.html) for architecture patterns