# Get Started with Agentforce Agents

Bring the power of conversational AI to your business with Agentforce agents. Build a trusted and customizable AI assistant that empowers your users to get more done in Salesforce. Accelerate your Agentforce integration with our APIs and other developer resources.

## Developer Solutions

We provide developer solutions for your agents and for the actions used by your agents.

### Agent Features

| Feature or API | Description | Build Agents | Test Agents | Use Agents |
| --- | --- | --- | --- | --- |
| [Agent Script](/docs/einstein/genai/guide/agent-script.html) | Scripting language for building agents with natural language and programmatic control | Yes |  |  |
| [Agentforce DX](/docs/einstein/genai/guide/agent-dx.html) | Pro-code tools for Salesforce CLI and VS Code | Yes | Yes | Yes (\*) |
| [Agentforce Python SDK](https://github.com/salesforce/agent-sdk/tree/main) | Programmatic agent creation and management | Yes |  |  |
| [Testing API](/docs/einstein/genai/guide/testing-api-get-started.html) | Programmatic test automation |  | Yes |  |
| [Agent API](/docs/einstein/genai/guide/agent-api-get-started.html) | Chat with agents via REST API |  |  | Yes |
| [Agentforce Mobile SDK](/docs/einstein/genai/guide/agent-sdk.html) | Integrate Agentforce into your mobile app |  |  | Yes |
| [Enhanced Chat v2](/docs/einstein/genai/guide/get-started-enhanced-chat.html) | Create customer-facing web chat experiences in Service Cloud |  |  | Yes |

(\*) The `agent preview` Salesforce CLI command, which you can use to interact with an active agent, is meant for testing purposes only.

### Action Features

| Feature or API | Description | Create Actions | Enhance Actions |
| --- | --- | --- | --- |
| [Apex REST Actions](/docs/einstein/genai/guide/agent-apex.html) | Create actions from Apex REST classes | Yes |  |
| [AuraEnabled Actions](/docs/einstein/genai/guide/agent-auraenabled.html) | Create actions from Apex controller methods | Yes |  |
| [Named Query Actions](/docs/einstein/genai/guide/agent-namedquery.html) | Create custom SOQL queries and expose them as actions | Yes |  |
| [Apex Invocable Method Actions](/docs/einstein/genai/guide/agent-invocablemethod.html) | Create custom actions using Apex InvocableMethod | Yes |  |
| [Lightning Types](/docs/einstein/genai/guide/lightning-types-get-started.html) | Improve UI for complex inputs and outputs |  | Yes |
| [Global Copy](/docs/einstein/genai/guide/global-copy.html) | Enhance copy functionality in custom components |  | Yes |
| [Apex Citations](/docs/einstein/genai/guide/citations.html) | Extend custom actions with citations |  | Yes |

## Build Agents

Build agents programmatically using Agentforce developer tools. For information about the underlying agent metadata structure, see [Agentforce Metadata Types](/docs/einstein/genai/references/agents-metadata-tooling/agents-metadata.html).

### Build Agents Using Agent Script

Agent Script is the language for building agents in Agentforce Builder. Script combines the flexibility of natural language instructions for handling conversational tasks with the reliability of programmatic expressions for handling business rules. In script, you use expressions to define if/else conditions, transitions, and other logic; set, modify, and compare variables; and select topics and actions. You can build predictable, context-aware agent workflows that don’t rely on interpretation by an LLM.

-   [Get Started with Agent Script](/docs/einstein/genai/guide/agent-script.html)

### Build Agents Using Agentforce DX

Use pro-code tools such as Salesforce CLI and VS Code to create and manage agents.

-   [Build Agents with Agentforce DX](/docs/einstein/genai/guide/agent-dx.html)

### Build Agents with Agentforce Python SDK

The Agentforce Python SDK provides a programmatic way to create, manage, and deploy AI agents in Salesforce.

-   [Agentforce Python SDK Reference](https://github.com/salesforce/agent-sdk/tree/main)

## Test Agents

Use Testing API, Agentforce DX, or the Testing Center to test your Agentforce agents.

| Feature Name | Access Method | Test Definition Format | [Custom Evaluations Support](/docs/einstein/genai/guide/testing-api-custom-evaluation-criteria.html) | Description |
| --- | --- | --- | --- | --- |
| [**Testing Center**](https://help.salesforce.com/s/articleView?id=ai.agent_testing_center.htm) | UI | CSV | No | Generate and run tests through the Salesforce UI. |
| [**Agentforce DX**](/docs/einstein/genai/guide/agent-dx-test.html) | Command Line | YAML | Yes | Salesforce CLI extension that can author, deploy, and run agent test specifications. |
| [**Testing API**](/docs/einstein/genai/guide/testing-api-build-tests.html) | Code | XML | Yes | Direct API access using [Metadata API](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_types_list) and [Connect API](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/intro_what_is_chatter_connect.htm). |

## Chat with Agents

Chat with AI agents programmatically and deploy customer-facing use cases.

### Chat with Agents Using Agent API

Use the Agent API to communicate with AI agents directly from an API. Start sessions, send messages to the AI agent, receive messages, and end sessions with the API.

-   [Get Started with Agent API](/docs/einstein/genai/guide/agent-api-get-started.html)

You can also access an invocable action to chat with an agent. See [Calling an Agent from a Flow or Apex Class](https://help.salesforce.com/s/articleView?id=ai.agent_custom_invocable_action_flow_apex.htm) in Salesforce Help.

### Chat with Agents Using Enhanced Chat

For Service Cloud use cases, you can connect and deploy Service agents to external chat channels. Enhanced Chat v2 provides Javascript web APIs to pass context events. See [Get Started With Enhanced Chat v2](/docs/einstein/genai/guide/get-started-enhanced-chat.html).

## Integrate Agents into Mobile Apps

The Agentforce Mobile SDK empowers you to integrate Salesforce's feature-rich, trusted AI platform directly into your native iOS and Android mobile applications. By leveraging the Agentforce Mobile SDK, you can deliver cutting-edge, intelligent, and conversational AI experiences to your mobile users, enhancing engagement and providing seamless access to information and actions.

-   [Get Started with Agentforce Mobile SDK](/docs/einstein/genai/guide/agent-sdk-overview.html)

## Create Actions

Create agent actions with these pro-code solutions. For general information about actions, see [Agent Actions](https://help.salesforce.com/s/articleView?id=ai.copilot_actions.htm) in Salesforce Help.

### Create Agent Actions From Apex REST Classes

Use generative AI to quickly create an OpenAPI document for your Apex REST class and activate the API for use in Agentforce. Deploy the class, the OpenAPI document, and associated metadata to your org's API catalog. Then use Agentforce Builder to create an agent action based on the methods in the class.

-   [Build Custom Agent Actions using Apex REST (Beta)](/docs/einstein/genai/guide/agent-apex.html)

### Create Agent Actions from Apex Controller Methods

Quickly create an OpenAPI document for your AuraEnabled Apex class and activate the API for use in Agentforce. Deploy the class, the OpenAPI document, and associated metadata to your org's catalog. Then use Agentforce Builder to create an agent action based on the controller methods in the class.

-   [Build Custom Agent Actions from Apex Controller Methods](/docs/einstein/genai/guide/agent-auraenabled.html)

### Create Agent Actions from Named Queries

Create custom SOQL queries (named queries) in Setup, and then expose them as agent actions in Agent Creator.

-   **[Create Actions from Named Queries (Beta)](/docs/einstein/genai/guide/agent-namedquery.html)**

### Create Custom Actions Using Apex Invocable Method

Create custom actions for your agents using Apex classes with the `@InvocableMethod` annotation. This approach allows you to extend agent capabilities by integrating your custom Apex logic directly into Agentforce.

-   [Create Custom Actions Using Apex Invocable Method](/docs/einstein/genai/guide/agent-invocablemethod.html)

## Enhance Actions

Enhance your actions with these solutions.

### Enhance the Agent Action UI with Lightning Types

Improve the user interface of custom actions for agents in Lightning Experience. Custom Lightning types are particularly effective for handling complex inputs and outputs.

-   [Get Started with Lightning Types](/docs/einstein/genai/guide/lightning-types-get-started.html)

### Enhance Copy Functionality in Action Responses

Provide a consistent way for users to copy information from UI components in Agentforce responses, enhancing usability and saving time.

-   [Provide Global Copy to Action Responses](/docs/einstein/genai/guide/global-copy.html)

### Customize Agent Responses with Inline Citations

Extend custom actions with citations Apex classes. Create inline citations with custom labels for knowledge articles, data from PDF files, and external URLs.

-   [Get Started with Citations in Apex](/docs/einstein/genai/guide/citations.html)

## See Also

-   _Salesforce Help_: [Agentforce Agents](https://help.salesforce.com/s/articleView?id=ai.copilot_intro.htm)
-   _Salesforce Help_: [Agent Actions](https://help.salesforce.com/s/articleView?id=ai.copilot_actions.htm)
-   _Trailhead_: [Agents and Agentforce Basics](https://trailhead.salesforce.com/content/learn/modules/einstein-copilot-basics)