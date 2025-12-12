# Before You Begin with the Agentforce Mobile SDK

Before you start using the SDK, learn about choosing an agent type, the latest features, supported languages, and required third-party dependencies.

## Agent Type

To integrate the Agentforce Mobile SDK, you must decide which type of agent to target. The SDK supports three agent configuration modes.

### Decide on Agent Configuration Mode

-   **Employee Agent** is for internal employee-facing agents deployed within your Salesforce org.
    -   **Use Cases**: Internal support, employee productivity, company-specific knowledge
    -   **Choose When**: Building internal applications, agents deployed within your org, need access to internal Salesforce data
-   **Service Agent** is for customer-facing service agents deployed via Enhanced Chat.
    -   **Use Cases**: Customer support, public-facing chatbots, external customer service
    -   **Choose When**: Building customer-facing applications, using Enhanced Chat, need public-facing chatbot capabilities
-   **Full Config** is for advanced scenarios where you need complete control over the AgentforceConfiguration.
    -   **Use Cases**: Custom integrations, advanced configuration scenarios, when you need to provide a complete configuration object
    -   **Choose When**: Building custom integrations, need full control over configuration parameters, want control over the network stack, working with non-standard agent setups

> **Tip:**
> 
> **Need help deciding?** For detailed guidance on agent types and setup, see [Create an Agent from a Template](https://help.salesforce.com/s/articleView?id=ai.agent_setup_type.htm) in Salesforce Help.

### Configure for Employee Agent

To set up an Agentforce Employee Agent, see [Create an Agent from an Agentforce Employee Agent Template](https://help.salesforce.com/s/articleView?id=ai.agent_employee_agent_setup.htm).

In order to use the SDK with an Employee agent, you'll need the following pieces of information:

-   **Agent ID**: The unique ID for the agent. You can find the agent ID in the URL of the Agent Details page. When you select your agent from Setup, use the 18-character ID at the end of the URL. For example, when viewing this URL, [https://mydomain.salesforce.com/lightning/setup/EinsteinCopilot/0XxSB000000IPCr0AO/edit](https://mydomain.salesforce.com/lightning/setup/EinsteinCopilot/0XxSB000000IPCr0AO/edit), the agent ID is 0XxSB000000IPCr0AO.
    -   For iOS, use this value when calling the `startAgentforceConversation` method.
    -   For Android, use this value for the `setAgentId` method in your `AgentforceConfiguration` builder.
-   **User ID**: The ID of the user interacting with the agent. See [Find the Salesforce ID for a User](https://help.salesforce.com/s/articleView?id=000381643&type=1).
    -   For iOS, use this value for the `user` argument in your `EmployeeAgentConfiguration` object.
-   **My Domain URL**: Your My Domain URL. You can get the domain from Setup. Search for **My Domain**. Copy the value shown in the **Current My Domain URL** field.
    -   For iOS, use this value for the `forceConfigEndpoint` argument in your `EmployeeAgentConfiguration` object.
    -   For Android, use this value for the `setSalesforceDomain` method in your `AgentforceConfiguration` builder.

### Configure for Service Agent

To set up an Agentforce Service Agent, see [Create an Agent from an Agentforce Service Agent Template](https://help.salesforce.com/s/articleView?id=ai.service_agent_setup.htm&type=5) .

You also must ensure that you've set up Enhanced Chat in Service Cloud. Here's a summary of the basic setup steps. To learn more, see [Add Flexibility and Power with Enhanced Chat](https://help.salesforce.com/s/articleView?id=service.miaw_intro_landing.htm) in Salesforce Help.

1.  From Setup, in the Quick Find box, enter `Messaging Settings`, and then select **Messaging Settings**.
    
2.  Click **New Channel**.
    
3.  In the Add a Messaging Channel modal, click **Start**.
    
4.  Select Enhanced Chat as your channel type, and click **Next**.
    
5.  In the Name Your Channel window, define your channel settings:
    
    -   Channel Name: Enter a name for your channel. Make it different from other channels you may create.
    -   Developer Name: This should auto-populate based on the Channel Name that you entered. We recommend using the auto-populated name.
    -   Deployment Type: Select **Mobile**.
    -   Domain: Enter the domain URL for the site where you want Enhanced Chat to be available. For example: yourcompany.com.
6.  Click **Next**.
    
7.  In the Channel Routing window, select **Agentforce Service Agent** as the Routing Type. In the Agentforce Service Agent field, search for and select the Service agent that you previously created. In the Fallback Queue field, select a queue that a session can route to if no agent is available.
    
8.  Accept the Terms and Conditions if they appear.
    
9.  Click **Save**.
    

In order to use the SDK with a Service agent, you'll need the following pieces of information:

-   **Developer Name**: Your Enhanced Chat developer name. You can find the developer name on the Embedded Service Deployments page from within the downloadable **Mobile Configuration** JSON file. See [Configure an Enhanced In-App Chat Deployment](https://help.salesforce.com/s/articleView?id=service.miaw_deployment_mobile.htm).
    
    -   For iOS, use this value for the `esDeveloperName` argument in your `ServiceAgentConfiguration` object and when calling the `startAgentforceConversation` method.
    -   For Android, use this value for the `esDeveloperName` argument in your `ServiceAgentConfiguration` object.
-   **Service API URL**: The service API URL. You can find this URL on the Embedded Service Deployments page from within the downloadable **Mobile Configuration** JSON file. See [Configure an Enhanced In-App Chat Deployment](https://help.salesforce.com/s/articleView?id=service.miaw_deployment_mobile.htm).
    
    -   For iOS and Android, use this value for the `serviceApiURL` argument in your `ServiceAgentConfiguration` object.
-   **Org ID**: Your organization ID. You can find the org ID from the **Company Information** page in Setup. See [Find your Salesforce Organization ID](https://help.salesforce.com/s/articleView?id=000385215&type=1).
    
    -   For iOS and Android, use this value for the `organizationId` argument in your `ServiceAgentConfiguration` object.

### Full Configuration Mode

To use the full configuration mode, review the `AgentforceConfiguration` struct for [iOS](/docs/einstein/genai/references/agentforce-mobile-sdk/configuration-overview-ios.html) and [Android](/docs/einstein/genai/references/agentforce-mobile-sdk/configuration-overview-android.html).

## Shared App Data

-   The iOS SDK stores information in the app's keychain data. If you explicitly delete this content, the SDK won't be able to access essential information and may fail to work properly.
-   The Android SDK stores information in the app's shared preferences and key store. If you explicitly delete this content, the SDK won't be able to access essential information and may fail to work properly.

## Language Support

The Agentforce Mobile SDK is localized to the following languages:

-   Arabic (ar)
-   Chinese (Simplified) (zh-CN)
-   Chinese (Traditional) (zh-TW)
-   Czech (cs)
-   Danish (da)
-   Dutch (nl)
-   English (en)
-   Finnish (fi)
-   French (fr)
-   German (de)
-   Greek (el)
-   Hebrew (he)
-   Hungarian (hu)
-   Indonesian (id)
-   Italian (it)
-   Japanese (ja)
-   Korean (ko)
-   Norwegian Bokmål (no)
-   Polish (pl)
-   Portuguese (pt)
-   Romanian (ro)
-   Russian (ru)
-   Spanish (es)
-   Swedish (sv)
-   Thai (th)
-   Turkish (tr)
-   Ukrainian (uk)
-   Vietnamese (vi)

## Third-Party Dependencies

For detailed dependency lists, see:

-   [iOS Installation Guide](/docs/einstein/genai/guide/agent-sdk-ios-install.html)
-   [Android Installation Guide](/docs/einstein/genai/guide/agent-sdk-android-install.html)

## Next Steps

-   **Choose Platform**: Start with [iOS Quick Start](/docs/einstein/genai/guide/agent-sdk-ios-quick-start.html) or [Android Quick Start](/docs/einstein/genai/guide/agent-sdk-android-quick-start.html)
-   **Learn More**: See [Overview](/docs/einstein/genai/guide/agent-sdk-overview.html) for key concepts