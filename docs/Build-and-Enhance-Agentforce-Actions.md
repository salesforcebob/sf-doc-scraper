# Build and Enhance Agentforce Actions

Actions are the building blocks that enable your Agentforce agents to perform tasks and interact with data. You can create custom actions to extend your agent's capabilities and enhance the user experience with rich interfaces and detailed responses.

Use these developer tools and techniques to build and enhance actions for your Agentforce agents:

## Create Actions

-   **[Create Actions with Apex REST Agent Actions (Beta)](/docs/einstein/genai/guide/agent-apex.html)** - Use generative AI to quickly create an OpenAPI document for your Apex REST class and activate the API for use in Agentforce. Deploy the class, the OpenAPI document, and associated metadata to your org's API catalog. Then use Agentforce Builder to create an agent action based on the methods in the class.
-   **[Create Actions from Apex Controller Methods (Beta)](/docs/einstein/genai/guide/agent-auraenabled.html)** - Use generative AI to quickly create an OpenAPI document for your Apex controller methods and activate the API for use in Agentforce. Deploy the class, the OpenAPI document, and associated metadata to your org’s API catalog. Then create an agent action in Agentforce Builder in your org that’s based on methods in the class.
-   **[Create Actions from Named Queries (Beta)](/docs/einstein/genai/guide/agent-namedquery.html)** - Create custom SOQL queries (named queries) in Setup, and then expose them as agent actions in Agent Creator.
-   **[Create Custom Actions Using Apex Invocable Method](/docs/einstein/genai/guide/agent-invocablemethod.html)** - Create custom actions for your agents using Apex classes with the `@InvocableMethod` annotation. This approach allows you to extend agent capabilities by integrating your custom Apex logic directly into Agentforce.

## Enhance Actions

-   **[Enhance the Agent UI with Custom LWCs and Lightning Types](/docs/einstein/genai/guide/lightning-types.html)** - Improve the user interface of custom actions for agents in Lightning Experience. Custom Lightning types are particularly effective for handling complex inputs and outputs.
-   **[Provide Global Copy to Action Responses](/docs/einstein/genai/guide/global-copy.html)** - Provide a consistent way for users to copy information from UI components in Agentforce responses, enhancing usability and saving time.
-   **[Cite Agent Responses with Apex](/docs/einstein/genai/guide/citations.html)** - Extend custom actions with citations Apex classes. Create inline citations with custom labels for knowledge articles, data from PDF files, and external URLs.

## See Also

-   _Salesforce Help_: [Agent Actions](https://help.salesforce.com/s/articleView?id=ai.copilot_actions.htm)