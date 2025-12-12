# Get Started with the Agent API

Bring the power of generative AI to your business with Agentforce. Build intelligent, trusted, and customizable AI agents and empower your users to get more done with Salesforce. Use the Agent API to communicate with AI agents directly from a REST API. Start sessions, send messages to the AI agent, receive messages, and end sessions using the API.

To access the Agent API, you must set up a connected app that supports the client credential flow. These instructions show you how to get your environment set up for use with the API and demonstrate how to make your first call to the API.

![API Flow](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/api-onboarding-steps-simpler.svg)

## Prerequisites

You must have Agentforce enabled with at least one agent activated. See [Set Up Agents](https://help.salesforce.com/s/articleView?id=sf.copilot_setup.htm) in Salesforce Help.

> **Note:**
> 
> Agent API isn’t supported for agents of type “Agentforce (Default)”.

## Video Tutorial

This video shows you how to set up your org to use the Agent API. It contains a simplified version of the steps below, along with guidance on using the [Postman collection](https://www.postman.com/salesforce-developers/salesforce-developers/collection/gwv9bjy/agent-api).

Get Started with the Agent API

![undefined](https://play.vidyard.com/gT17Ey9JoSfYhhVgR3guaC.jpg)

## Create a Connected App

To use the Agent API, you must create a Connected App. We suggest you set up the app to support the client credentials flow, although you can use any flow that provides a [JWT-based access token](https://help.salesforce.com/s/articleView?id=xcloud.jwt_access_tokens.htm). Use the connected app to create a token. To learn more about connected apps, see [Create a Connected App](https://help.salesforce.com/s/articleView?id=sf.connected_app_create.htm) in Salesforce Help along with these specific topics.

-   [Configure a Connected App to Issue JWT-Based Access Tokens](https://help.salesforce.com/s/articleView?id=xcloud.jwt_connectedapp_enable.htm)
-   [Configure a Connected App for the Client Credentials Flow](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_client_credentials_setup.htm)

These instructions are for a sample connected app implementation that supports Agent API communication.

> **Note:**
> 
> Starting with Summer ’25, you can no longer create connected apps from **App Manager** in Setup. To create a connected app, go to **Settings** under **External Client Apps** in Setup. Agent API doesn't currently support external client apps (ECAs)—it only supports connected apps.

1.  Open your org and go to Setup.
2.  From Setup, select **Settings** under **Apps > External Client Apps**.
3.  Turn on **Allow creation of connected apps**.
4.  Click the **New Connected App** button.
5.  For **Connected App Name**, specify an app name.
6.  For **Contact Email**, specify your admin email address.
7.  In the API section, check **Enable OAuth Settings**. This action displays additional OAuth-related settings.
8.  For **Callback URL**, specify `https://login.salesforce.com`.
9.  From **Selected OAuth Scopes**, add these scopes to the connected app.
    -   **Access chatbot services (chatbot\_api)**
    -   **Access the Salesforce API Platform (sfap\_api)**
    -   **Manage user data via APIs (api)**
    -   **Perform requests at any time (refresh\_token, offline\_access)**
10.  Deselect:
     -   **Require Proof Key for Code Exchange (PKCE) Extension for Support Authorization Flows**
     -   **Require Secret for Web Server Flow**
     -   **Require Secret for Refresh Token Flow**
11.  Select:
     -   **Enable Client Credentials Flow**
     -   **Issue JSON Web Token (JWT)-based access tokens for named users**
12.  Review this screenshot to verify that you selected the correct settings. ![API Flow](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/agent-api-connected-app.png)
13.  From the bottom of the page, save the app, and then click **Continue**.
14.  After saving the app, you see the **Manage Connected Apps** page. Click **Manage**. (To view this same screen later, select **Manage Connected Apps** from Setup.)
15.  Click **Edit Policies**.
16.  In the OAuth Policies section, from the Permitted Users dropdown, select the appropriate permitted users. See [Manage OAuth Access Policies for a Connected App](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_manage_oauth.htm) in Salesforce Help.
17.  In the **Client Credentials Flow** section, set **Run As** to a user that has at least [API Only access](https://help.salesforce.com/s/articleView?id=platform.integration_user.htm).
18.  From the **JWT-Based Access Token Settings for Named Users** section, keep **Issue JSON Web Token (JWT)-based access tokens** checked and leave the **Token Timeout** value at 30 minutes.
19.  Save the app.
20.  _This step is only applicable if you selected "Admin approved users are pre-authorized" from the OAuth Policies section above._ Scroll down the page to the Profiles section, click **Manage Profiles**, and select the profiles needed to access this connected app. See [Manage Other Access Settings for a Connected App](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_manage_additional_settings.htm) in Salesforce Help.

## Add Connected App to Agent

Before calling the API, add your connected app to your agent.

1.  From Setup, select **Agentforce Agents**. Click the name of your agent.
2.  If you've opted-in to the [updated connection experience](https://help.salesforce.com/s/articleView?id=ai.agent_response_enable.htm), follow these instructions:
    1.  From the agent details page, click **Open in Builder**.
    2.  In Agentforce Builder, click the **Connections** tab. On the panel, if you see an option to turn on the updated connections experience, click **Turn It On**.
    3.  Select the **Messaging** connection.
    4.  Scroll down to the External Apps section and click **Add External App**. ![Enhanced connections](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/agent-api-connections-1b.png)
    5.  Add a new **API** connection, choose your connected app, and then save.  
        ![External app connection](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/agent-api-connections-2b.png)
3.  If you haven't opted-in to the [updated connection experience](https://help.salesforce.com/s/articleView?id=ai.agent_response_enable.htm), follow these instructions:
    1.  From the agent details page, select the **Connections** tab.
    2.  Click **Add** from the **Connections** section.
    3.  Add a new **API** connection, choose your connected app, and then save.

## Obtain Credentials

To create a token, you need the consumer key and consumer secret from your connected app.

1.  From Setup, select **App Manager**.
2.  Find your connected app, click the dropdown arrow on the right, and then click **View.**
3.  Click **Manage Consumer Details**.
4.  Copy **Consumer Key** and **Consumer Secret**.

## Create a Token

All calls to the Agent API require a token. Create a token by using the consumer key, consumer secret, and your domain name.

```bash
curl https://{MY_DOMAIN_URL}/services/oauth2/token \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'client_id={CONSUMER_KEY}' \
--data-urlencode 'client_secret={CONSUMER_SECRET}'
```

-   `MY_DOMAIN_URL`: You can get the domain from Setup. Search for **My Domain**. Copy the value shown in the **Current My Domain URL** field.
-   `CONSUMER_KEY`, `CONSUMER_SECRET`: You can get the consumer key and secret by following the instructions in [Obtain Credentials](#obtain-credentials).

The previous command returns a JSON payload similar to this response.

```json
{
  "access_token": "eyJ0bmsiOiJjb3JlL3Byb2QvM…(shortened)",
  "signature": "HBb7Zf4aaOUlI1V…(shortened)",
  "token_format": "jwt",
  "scope": "sfap_api chatbot_api api",
  "instance_url": "https://sample-org-eaa32a127e4a6b.my.salesforce.com",
  "id": "https://login.salesforce.com/id/00DW…Wpg5MAC/005W…nF9IAI",
  "token_type": "Bearer",
  "issued_at": "1736530186928",
  "api_instance_url": "https://api.salesforce.com"
}
```

Copy the access token specified in the `access_token` property. This token is required when making requests to the API.

## Call the API

After you set up your connected app and created a token, you’re ready to call the API. Before making the call, gather this information.

-   `AGENT_ID`: The ID of the agent that you want to interact with. You can find this ID in the URL of the Agent Overview Page. When you select the agent from Setup, use the 18-character ID at the end of the URL. For example, when viewing this URL, `https://mydomain.test1.my.pc-rnd.salesforce-setup.com/lightning/setup/EinsteinCopilot/0XxSB000000IPCr0AO/edit`, the agent ID is `0XxSB000000IPCr0AO`.
-   `ACCESS_TOKEN`: The token that you created in [Create a Token](#create-a-token).
-   `RANDOM_UUID`: A random UUID value that you provide to represent the session key. You can use this parameter to trace the conversation in your agent’s event logs.
-   `MY_DOMAIN_URL`: From Setup, search for **My Domain**. Copy the value shown in the **Current My Domain URL** field.

> **Note:**
> 
> Be sure to use your **My Domain** URL (for example, `some_domain.my.salesforce.com`) and not simply the domain name displayed in your browser (`some_domain.lightning.force.com`).

This curl command creates a new agent session with the Agent API.

```bash
curl --location -X POST https://api.salesforce.com/einstein/ai-agent/v1/agents/{AGENT_ID}/sessions \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--data '{
 "externalSessionKey": "{RANDOM_UUID}",
 "instanceConfig": {
   "endpoint": "https://{MY_DOMAIN_URL}"
 },
 "streamingCapabilities": {
   "chunkTypes": ["Text"]
 },
 "bypassUser": true
}'
```

> **Note:**
> 
> The `bypassUser` parameter indicates whether to use the agent-assigned user instead of the logged in user. If set to `true`, the API uses the user associated with the agent. If set to `false`, the API uses the user associated with the token. For this client credentials flow scenario, we set the value to `true`. However, you may need to change this value depending on your use case.

When this call succeeds, you receive a response with a session ID and additional info.

```json
{
  "sessionId": "8e715939-a121-40ec-80e3-a8d1ac89da33",
  "_links": {
    "self": null,
    "messages": {
      "href": "https://api.salesforce.com/einstein/ai-agent/v1/sessions/8e715939-a121-40ec-80e3-a8d1ac89da33/messages/stream"
    },
    "session": {
      "href": "https://api.salesforce.com/einstein/ai-agent/v1/agents/0XxQZ0000000Ty50AE/sessions"
    },
    "end": {
      "href": "https://api.salesforce.com/einstein/ai-agent/v1/sessions/8e715939-a121-40ec-80e3-a8d1ac89da33"
    }
  },
  "messages": [
    {
      "type": "Inform",
      "id": "8e7cafae-0eb5-44b1-9195-21f1cd6e1f4b",
      "feedbackId": "",
      "planId": "",
      "isContentSafe": true,
      "message": "Hi, I'm an AI service assistant. How can I help you?",
      "result": [],
      "citedReferences": []
    }
  ]
}
```

Congratulations, you’ve successfully started using the Agent API! To continue using the API, see [Agent API Examples](/docs/einstein/genai/guide/agent-api-examples.html) and the [Agent API Postman Collection](https://www.postman.com/salesforce-developers/salesforce-developers/collection/gwv9bjy/agent-api).

## See Also

-   [Agent API Session Lifecycle](/docs/einstein/genai/guide/agent-api-lifecycle.html)
-   [Agent API Examples](/docs/einstein/genai/guide/agent-api-examples.html)
-   [Agent API Postman Collection](https://www.postman.com/salesforce-developers/salesforce-developers/collection/gwv9bjy/agent-api)
-   [Agent API Considerations](/docs/einstein/genai/guide/agent-api-considerations.html)
-   [Agent API Troubleshooting](/docs/einstein/genai/guide/agent-api-troubleshooting.html)
-   [Agent API Reference](/docs/einstein/genai/references/agent-api?meta=summary)