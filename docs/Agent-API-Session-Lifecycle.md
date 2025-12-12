# Agent API Session Lifecycle

To communicate with an agent through the Agent API, you must [create a session](/docs/einstein/genai/guide/agent-api-examples.html#start-session). Then you [send messages](/docs/einstein/genai/guide/agent-api-examples.html#send-synchronous-messages) to the agent by using the ID associated with that session. The agent keep tracks of the context throughout the session. When you’re finished working with the agent, [end the session](/docs/einstein/genai/guide/agent-api-examples.html#end-session).

![API Flow](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/agent-api-lifecycle.svg)

The Agent API provides endpoints for each stage in this lifecycle, along with an endpoint to submit feedback on a response.

## Synchronous and Streaming Messages

Sending and receiving messages can be performed synchronously or with the streaming endpoint. The [synchronous endpoint](/docs/einstein/genai/guide/agent-api-examples.html#send-synchronous-messages) is best for simple use cases where you want the entire response in one shot. The [streaming endpoint](/docs/einstein/genai/guide/agent-api-examples.html#send-streaming-messages) is best if you intend to show the response to the user as the chunks of content arrive, like in a real-time chat conversation.

## See Also

-   [Get Started with Agent API](/docs/einstein/genai/guide/agent-api-get-started.html)
-   [Agent API Examples](/docs/einstein/genai/guide/agent-api-examples.html)
-   [Agent API Postman Collection](https://www.postman.com/salesforce-developers/salesforce-developers/collection/gwv9bjy/agent-api)
-   [Agent API Reference](/docs/einstein/genai/references/agent-api?meta=summary)