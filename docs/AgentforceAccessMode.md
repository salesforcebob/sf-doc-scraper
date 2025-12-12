# AgentforceAccessMode

`enum class AgentforceAccessMode`

Access modes that define the level of permissions and UI context for record operations on Android.

## Overview

Access modes that define the level of permissions and UI context for record operations. These modes work in conjunction with Salesforce field-level security and object permissions to provide appropriate access levels for different user scenarios.

## Declaration

```kotlin
enum class AgentforceAccessMode
```

## Properties

| Property | Type | Description |
| --- | --- | --- |
| VIEW | enum | Read-only access mode |
| EDIT | enum | Full edit access mode |
| CREATE | enum | Creation mode for new records |
| REFERENCE | enum | Reference mode for displaying related record information |

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| N/A | N/A | Enumeration cases only |

## Usage Examples

### Basic Usage

```kotlin
// Example usage in data access
val accessMode: AgentforceAccessMode = AgentforceAccessMode.VIEW

// Switch based on user permissions
when (accessMode) {
    AgentforceAccessMode.VIEW -> {
        // Show read-only interface
    }
    AgentforceAccessMode.EDIT -> {
        // Show editable interface
    }
    AgentforceAccessMode.CREATE -> {
        // Show creation interface
    }
    AgentforceAccessMode.REFERENCE -> {
        // Show reference information
    }
}
```

### Security Considerations

Access modes work in conjunction with Salesforce field-level security and object permissions:

-   Mode permissions are enforced at the SDK level
-   Salesforce permissions still apply
-   Access mode cannot grant permissions not available to the user
-   Use appropriate modes based on user capabilities and intent

## Related Components

-   [AgentforceConversation](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-android.html) - Conversation management
-   [AgentforceService](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-service-android.html) - Backend integration