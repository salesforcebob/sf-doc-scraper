# MCP Solutions for Developers

Salesforce offers [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) solutions that developers can use to access Salesforce features and services through AI applications.

## Background

Building custom integrations between AI applications and enterprise platforms typically requires significant development effort for each use case. [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) eliminates this complexity by providing an open standard that lets AI applications securely interact with external systems and services through pre-built connections. Instead of building custom integrations, developers can use these ready-made MCP servers to instantly connect their AI applications to Salesforce, Heroku, and MuleSoft features and services.

Here's how you interact with MCP-enabled AI solutions:

1.  From your AI application, ask questions or request actions related to the connected service
2.  The AI application connects to the appropriate MCP server
3.  The MCP server securely processes the request on the target platform
4.  Data or action results return to the AI application
5.  The AI application displays information or confirms completed actions

This approach transforms development by providing immediate access to enterprise data and services without the need to learn platform-specific APIs, CLIs, or authentication flows. To learn more, review this Salesforce developers blog post: [Introducing MCP Support Across Salesforce](https://developer.salesforce.com/blogs/2025/06/introducing-mcp-support-across-salesforce).

Although MCP solutions are applicable to many types of AI users, this page contains information about how developers can take advantage of MCP solutions at Salesforce.

## Salesforce Solutions

The following Salesforce MCP solutions are available for developers.

| Platform | MCP Solution | Description | Sample Prompt |
| :-- | :-- | :-- | :-- |
| Heroku | [Heroku MCP Server](https://github.com/heroku/heroku-mcp-server) | Facilitates seamless interaction between LLMs and the Heroku Platform. | _List all my Heroku apps associated with the AwesomeSauce team_  
  
_Deploy the HerokuRules project_ |
| MuleSoft | [Anypoint Connector for MCP](https://docs.mulesoft.com/mcp-connector/latest/) | Connects LLM applications with your APIs using MCP Connector. | _Get a list of all approved vendors, including their product categories_  
  
_Create a purchase order for 100 units of widgets_ |
| MuleSoft | [MuleSoft MCP Server](https://docs.mulesoft.com/mulesoft-mcp-server/) | Facilitates interaction between LLMs and the MuleSoft Anypoint Platform. | _Create a Mule project that creates an order in NetSuite every time an opportunity in Salesforce is updated to stage Closed Won._  
  
_Deploy Mule application in current project with high security, high availability, and performance optimized settings_ |
| Salesforce | [Salesforce DX MCP Server](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_mcp.htm) (Beta) | Use natural language to issue complex commands to your Salesforce orgs without writing code or queries. | _Query my DreamHouse org and show me info about my properties_  
  
_Run agent tests in my org_ |
| Salesforce | [Agentforce Vibes Extension](https://developer.salesforce.com/docs/platform/einstein-for-devs/guide/devagent-overview.html) MCP Client | Use the Salesforce DX MCP Server (Beta) from inside the Agentforce Vibes MCP client. | _Query my DreamHouse org and show me info about my properties_  
  
_Run agent tests in my org_ |
| Salesforce | [Salesforce Hosted MCP Servers](https://help.salesforce.com/s/articleView?id=platform.hosted_mcp_servers.htm&type=5) (Beta) | Enable AI assistants to securely access your Salesforce data and help with daily business tasks. | _Look at the Account object in my Salesforce org and tell me which fields are required to create an Account_  
  
_Get all accounts from my Salesforce org that have annual revenue over 1 billion dollars_ |

## See Also

-   _Salesforce Developers Blog_: [Introducing MCP Support Across Salesforce](https://developer.salesforce.com/blogs/2025/06/introducing-mcp-support-across-salesforce)
-   _YouTube_: [Agentforce AMA: Supercharge Development with MCP](https://www.youtube.com/watch?v=tOTC-2ygJBM)