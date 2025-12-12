# iOS Architecture & Integration

Core architecture and integration components for iOS development with the Agentforce Mobile SDK.

## Available Components

Implement these core protocols for integration and customization:

-   **[AgentConversation](/docs/einstein/genai/references/agentforce-mobile-sdk/agent-conversation-ios.html)** - Core conversation interface for message handling and state management
-   **[AgentforceDataProviding](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-data-providing-ios.html)** - Data access abstraction for Salesforce integration

## Architecture Overview

The iOS SDK follows protocol-oriented design patterns with dependency injection through provider protocols. It leverages SwiftUI for modern declarative UI development and integrates seamlessly with the SalesforceMobileSDK ecosystem.