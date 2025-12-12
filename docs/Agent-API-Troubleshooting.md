# Agent API Troubleshooting

Review these troubleshooting tips if you run into issues when calling the API.

## HTTP 400 Response: Bad Request

If you receive an HTTP 400 response, there's a problem with your request.

-   **Message field in response contains "{VALUE} is not a valid agent ID"**. Verify that your agent ID is correct in your API request. See [Call the API](/docs/einstein/genai/guide/agent-api-get-started.html#call-the-api).

## HTTP 401 Response: Unauthorized

If you recieve an HTTP 401 response, there's typically an authorization issue.

-   **Message field in response contains "Connected app is not attached to Agent"**. Verify that you [added the connected app to your agent's connections](/docs/einstein/genai/guide/agent-api-get-started.html#add-connected-app-to-agent).
-   For other issues, review [Get Started with Agent API](/docs/einstein/genai/guide/agent-api-get-started.html).

## HTTP 404 Response: Not Found

If you receive an HTTP 404 response, verify that you're using the correct token and that you're using the correct endpoint. Review [Get Started with Agent API](/docs/einstein/genai/guide/agent-api-get-started.html).

## HTTP 500 Response: Internal Server Error

If you receive an HTTP 500 response, verify that you've followed the setup instructions correctly.

-   **Message field in response contains "Unsupported Media Type"**. Use the correct `Content-Type` value in the header: `Content-Type: application/json`.
-   **Error field in response contains "EngineConfigLookupException"**. When specifying your domain in the [start session endpoint](/docs/einstein/genai/guide/agent-api-examples.html#start-session), make sure that you're using the My Domain endpoint for your org. From Setup, search for **My Domain**. Copy the value shown in the **Current My Domain URL** field.
-   **Error field in response contains "HttpServerErrorException"**. Verify that you are using the correct agent ID in the endpoint. You can find this ID in the URL of the Agent Overview Page. When you select the agent from Setup, use the 18-character ID at the end of the URL. For example, when viewing this URL, `https://mydomain.test1.my.pc-rnd.salesforce-setup.com/lightning/setup/EinsteinCopilot/0XxSB000000IPCr0AO/edit`, the agent ID is `0XxSB000000IPCr0AO`.
-   For other issues, review [Get Started with Agent API](/docs/einstein/genai/guide/agent-api-get-started.html).

## See Also

-   [Get Started with Agent API](/docs/einstein/genai/guide/agent-api-get-started.html)
-   [Agent API Examples](/docs/einstein/genai/guide/agent-api-examples.html)
-   [Agent API Considerations](/docs/einstein/genai/guide/agent-api-considerations.html)
-   [Agent API Reference](/docs/einstein/genai/references/agent-api?meta=summary)