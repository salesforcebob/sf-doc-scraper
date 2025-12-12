# Agent API Examples

This section provides examples using the Agent API endpoints. To onboard, see [Get Started with Agent API](/docs/einstein/genai/guide/agent-api-get-started.html).

## Postman Collection

The quickest way to get started with the Agent API is with our [Postman collection](https://www.postman.com/salesforce-developers/salesforce-developers/collection/gwv9bjy/agent-api). You can also review our [video tutorial](https://salesforce.vidyard.com/watch/gT17Ey9JoSfYhhVgR3guaC?) on Agent API setup and using the Postman collection.

## Start Session

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
> The `bypassUser` parameter indicates whether to use the agent-assigned user instead of the logged in user. If set to `true`, the API uses the user associated with the agent. If set to `false`, the API uses the user associated with the token.

To make this request, these values are required.

-   `AGENT_ID`: The ID of the agent that you want to interact with. You can find this ID in the URL of the Agent Overview Page. When you select the agent from Setup, use the 18-character ID at the end of the URL. For example, when viewing this URL, `https://mydomain.test1.my.pc-rnd.salesforce-setup.com/lightning/setup/EinsteinCopilot/0XxSB000000IPCr0AO/edit`, the agent ID is `0XxSB000000IPCr0AO`.
-   `RANDOM_UUID`: A random UUID value that you provide to represent the session key. You can use this parameter to trace the conversation in your agent’s event logs.
-   `ACCESS_TOKEN`: The token that you created in [Create a Token](/docs/einstein/genai/guide/agent-api-get-started.html#create-a-token).
-   `MY_DOMAIN_URL`: From Setup, search for **My Domain**. Copy the value shown in the **Current My Domain URL** field.
-   Specify `application/json` in the `Content-Type` header to indicate JSON content in the request.

This example shows a start session response. The response returns the session ID (`sessionId`) value, which is required when sending messages to an agent.

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

For API reference info, see [Start Session](/docs/einstein/genai/references/agent-api?meta=startSession).

## Send Synchronous Messages

When you send a message by using the synchronous endpoint, the server sends back the response synchronously in one response. To use the streaming endpoint, see [Send Streaming Messages](#send-streaming-messages).

Before sending messages, you must start a session. See [Start Session](#start-session).

This curl command sends a message to the synchronous endpoint.

```bash
curl --location 'https://api.salesforce.com/einstein/ai-agent/v1/sessions/{SESSION_ID}/messages' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--data '{
  "message": {
    "sequenceId": {SEQUENCE_ID},
    "type": "Text",
    "text": "Show me the cases associated with Lauren Bailey."
  }
}'
```

To make this request, these values are required.

-   `SESSION_ID`: The session ID found in the response payload when you created a session.
-   `ACCESS_TOKEN`: The token that you created in [Create a Token](/docs/einstein/genai/guide/agent-api-get-started.html#create-a-token).
-   `SEQUENCE_ID`: A number that you provide to represent the sequence ID. Increase this number for each subsequent message in this session.
-   Specify `application/json` in the `Content-Type` header to indicate JSON content in the request.

This example shows a potential response to a synchronous send message request.

```json
{
    "messages": [
        {
            "type": "Inform",
            "id": "ceb6b5de-6063-4e39-bc02-91e9bf7da867",
            "metrics": {},
            "feedbackId": "0bc8720e-e010-4129-87bb-70caaa885ee4",
            "planId": "0bc8720e-e010-4129-87bb-70caaa885ee4",
            "isContentSafe": true,
            "message": "Here are two cases related to Lauren Bailey:\n\n1. Case Number: 00001116\n   - Subject: I have a question about my bill\n   - Description: When I received my most recent bill, I noticed there was a charge I didn't recognize. Can you look over my orders and help me understand what this might have been? Thank you!\n   - Status: New\n   - Created Date: 2025-04-05\n2. Case Number: 00001106\n   - Subject: I have a product suggestion.\n   - Description: I've been using your products for a long time, and I have a suggestion that I think would make them even better. What's the best way to share this with you?\n   - Status: Closed\n   - Created Date: 2025-04-05\n   - Closed Date: 2022-10-13.",
            "result": [],
            "citedReferences": []
        }
    ],
    "_links": {
        …(shortened)
    }
}
```

For API reference info, see [Send Synchronous Messages](/docs/einstein/genai/references/agent-api?meta=sendMessage).

## Send Streaming Messages

When you send a message using the streaming endpoint, the server sends back information using the server-sent event (SSE) protocol. To use the synchronous endpoint, see [Send Synchronous Messages](#send-synchronous-messages).

Before sending messages, you must start a session. See [Start Session](#start-session).

This curl command sends a message to the streaming endpoint.

```bash
curl --location 'https://api.salesforce.com/einstein/ai-agent/v1/sessions/{SESSION_ID}/messages/stream' \
--header 'Accept: text/event-stream' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--data '{
  "message": {
    "sequenceId": {SEQUENCE_ID},
    "type": "Text",
    "text": "Show me the cases associated with Lauren Bailey."
  }
}'
```

To make this request, these values are required.

-   `SESSION_ID`: The session ID found in the response payload when you created a session.
-   `ACCESS_TOKEN`: The token that you created in [Create a Token](/docs/einstein/genai/guide/agent-api-get-started.html#create-a-token).
-   `SEQUENCE_ID`: A number that you provide to represent the sequence ID. Increase this number for each subsequent message in this session.
-   Specify `application/json` in the `Content-Type` header to indicate JSON content in the request.
-   Specify `text/event-stream` in the `Accept` header so that the response contains the message stream.

When you make a streaming request, messages return in the event stream.

This example shows a [`ProgressIndicator`](/docs/einstein/genai/references/agent-api?meta=type%3AProgressIndicatorMessage) event, which indicates that a response is in progress.

```json
{
  "timestamp": 1736902938827,
  "originEventId": "1736902935340-REQ",
  "traceId": "2fdb1d5e7eb48d35b9d1ba402eeb4b69",
  "offset": 0,
  "message": {
    "type": "ProgressIndicator",
    "id": "c4410599-8c0a-412d-910f-a60e4159d807",
    "indicatorType": "ACTION",
    "message": "Working on it"
}
```

The message streams in text chunk increments. This example shows a [`TextChunk`](/docs/einstein/genai/references/agent-api?meta=type%3ATextChunkMessage) event.

```json
{
  "timestamp": 1736902952425,
  "originEventId": "1736902935340-REQ",
  "traceId": "2fdb1d5e7eb48d35b9d1ba402eeb4b69",
  "offset": 1,
  "message": {
    "type": "TextChunk",
    "id": "6fc64974-9c20-484e-8b8c-105e460d4a00",
    "offset": 1,
    "message": "Here",
    "formatType": "Text"
  }
}
```

The API returns the complete message in an [`Inform`](/docs/einstein/genai/references/agent-api?meta=type%3AInformMessage) event.

```json
{
    "messages": [
        {
            "type": "Inform",
            "id": "f0313bcb-65a2-4abb-9d84-b872247b1420",
            "metrics": {},
            "feedbackId": "ab403163-b87f-4e4b-9fa6-18670a2be655",
            "planId": "ab403163-b87f-4e4b-9fa6-18670a2be655",
            "isContentSafe": true,
            "message": "Here are two cases related to Lauren Bailey:\n\n1. Case Number: 00001116\n   - Subject: I have a question about my bill\n   - Description: When I received my most recent bill, I noticed there was a charge I didn't recognize. Can you look over my orders and help me understand what this might have been? Thank you!\n   - Status: New\n   - Created Date: 2025-04-05\n2. Case Number: 00001106\n   - Subject: I have a product suggestion.\n   - Description: I've been using your products for a long time, and I have a suggestion that I think would make them even better. What's the best way to share this with you?\n   - Status: Closed\n   - Created Date: 2025-04-05\n   - Closed Date: 2022-10-13",
            "result": [],
            "citedReferences": []
        }
    ],
    "_links": {
        "self": null,
        "messages": {
            "href": "https://api.salesforce.com/einstein/ai-agent/v1/sessions/499713a4-b441-4234-bafd-392ee08dbd01/messages"
        },
        "messagesStream": {
            "href": "https://api.salesforce.com/einstein/ai-agent/v1/sessions/499713a4-b441-4234-bafd-392ee08dbd01/messages/stream"
        },
        "session": {
            "href": "https://api.salesforce.com/einstein/ai-agent/v1/agents/0XxQZ0000000Ty50AE/sessions"
        },
        "end": {
            "href": "https://api.salesforce.com/einstein/ai-agent/v1/sessions/499713a4-b441-4234-bafd-392ee08dbd01"
        }
    }
}
```

The API returns an [`EndOfTurn`](/docs/einstein/genai/references/agent-api?meta=type%3AEndOfTurnMessage) event when the response is complete.

```json
{
  "timestamp": 1736902953027,
  "originEventId": "1736902935340-REQ",
  "traceId": "2fdb1d5e7eb48d35b9d1ba402eeb4b69",
  "offset": 0,
  "message": {
    "type": "EndOfTurn",
    "id": "2a2be92b-f479-481a-9f22-1e5bf39e038e"
  }
}
```

> **Tip:**
> 
> If you receive a [ValidationFailureChunk](/docs/einstein/genai/references/agent-api?meta=type%3AValidationFailureChunkMessage) streaming event, there was a failure validating the agent's response. Remove all previously rendered chunks and display only the new streamed content.

For API reference info, see [Send Streaming Messages](/docs/einstein/genai/references/agent-api?meta=sendMessageStream).

## Send Agent Variables

For an example using agent variables, see [Send Agent Variables with the Agent API](/docs/einstein/genai/guide/agent-api-variables.html).

## Handle Citations

Some message responses include cited sources. Cited sources surface in the `citedReferences` array of an `Inform` response message. Citations can either appear as sources at the bottom of the response, or inline citations (using the `inlineMetadata` object) that are associated with a specific location in the response.

```json
{
    "timestamp": 1745599724677,
    "originEventId": "1745599714159-REQ",
    "traceId": "310046aaded69001de5dbddaec4f8a75",
    "offset": 0,
    "message": {
        "type": "Inform",
        "id": "484c59e5-9c24-4735-ba55-0707a071a9e7",
        "feedbackId": "a9695531-091b-42de-8b4d-61f3aaadd42e",
        "planId": "a9695531-091b-42de-8b4d-61f3aaadd42e",
        "isContentSafe": true,
        "message": "The 2024 Acura ZDX is Acura's first-ever all-electric vehicle, featuring:\n\n- Maximum Range: 313 miles\n- Starting Price: $65,850\n- Interior: Premium and spacious\n- Charging: Compatible with Tesla's Supercharger network\n- Trim Levels: Two available trims\n- Platform: Shares a platform with the Cadillac Lyriq and is built in the same Tennessee factory\n- Sales: Conducted exclusively online\n- Pricing:\n   - ZDX A-Spec: $65,850\n   - ZDX A-Spec with all-wheel drive: $69,850\n   - ZDX Type S: $74,850\n- Tax Credit: Eligible for a federal tax credit of up to $7,500\n\nIf you have any more questions or need further details, feel free to ask!",
        "result": [],
        "citedReferences": [
            {
                "type": "link",
                "value": "https://myorgdomain.salesforce.com/ka0RZ000002DzSmYAK",
                "recordId": "ka0RZ000002DzSmYAK",
                "label": null,
                "inlineMetadata": [
                    {
                        "claim": "The 2024 Acura ZDX is Acura's first-ever all-electric vehicle, featuring:\n\n- Maximum Range: 313 miles\n- Starting Price: $65,850\n- Interior: Premium and spacious\n- Charging: Compatible with Tesla's Supercharger network\n- Trim Levels:",
                        "location": 236
                    }
                ]
            },
            {
                "type": "link",
                "value": "https://myorgdoamin.salesforce.com/ka0RZ000002E0INYA0",
                "recordId": "ka0RZ000002E0INYA0",
                "label": null,
                "inlineMetadata": [
                    {
                        "claim": "Two available trims\n- Platform: Shares a platform with the Cadillac Lyriq and is built in the same Tennessee factory\n- Sales: Conducted exclusively online\n- Pricing:\n   - ZDX A-Spec: $65,850\n   - ZDX A-Spec with all-wheel drive: $69,850\n   - ZDX Type S: $74,850\n- Tax Credit: Eligible for a federal tax credit of up to $7,500",
                        "location": 562
                    }
                ]
            }
        ]
    }
}
```

For API reference info, see [InformMessage](/docs/einstein/genai/references/agent-api?meta=type%3AInformMessage) and [CitedReference](/docs/einstein/genai/references/agent-api?meta=type%3ACitedReference).

## End Session

This curl command sends an end session request.

```bash
curl --location --request DELETE 'https://api.salesforce.com/einstein/ai-agent/v1/sessions/{SESSION_ID}' \
--header 'x-session-end-reason: UserRequest' \
--header 'Authorization: Bearer {ACCESS_TOKEN}'
```

To make this request, these values are required.

-   `SESSION_ID`: The session ID found in the response payload when you created a session.
-   `ACCESS_TOKEN`: The token that you created in [Create a Token](/docs/einstein/genai/guide/agent-api-get-started.html#create-a-token).

This example shows a response to an end message request.

```json
{
  "messages": [
    {
      "type": "SessionEnded",
      "id": "c5692ca0-ee1b-414a-9d96-4e7862456500",
      "reason": "ClientRequest",
      "feedbackId": ""
    }
  ],
  "_links": {
    "self": null,
    "messages": {
      "href": "https://api.salesforce.com/einstein/ai-agent/v1/sessions/8d705938-a121-40ec-80e3-a8d1ac89da33/messages/stream"
    },
    "session": {
      "href": "https://api.salesforce.com/einstein/ai-agent/v1/agents/0XxQZ0000000Ty50AE/sessions"
    },
    "end": {
      "href": "https://api.salesforce.com/einstein/ai-agent/v1/sessions/8d705938-a121-40ec-80e3-a8d1ac89da33"
    }
  }
}
```

For API reference info, see [End Session](/docs/einstein/genai/references/agent-api?meta=endSession).

## Submit Feedback

You can also submit feedback to the org based on the agent’s responses. This feedback is stored in Data 360. To learn more, see [Generative AI Audit and Feedback Data](https://help.salesforce.com/s/articleView?id=sf.generative_ai_feedback_about.htm).

```bash
curl -v --location 'https://api.salesforce.com/einstein/ai-agent/v1/sessions/{SESSION_ID}/feedback' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {ACCESS_TOKEN}' \
--data '{
  "feedbackId": "9247bbd8-5ed9-11ee-8c99-0242ac120002",
  "feedback": "GOOD",
  "text": "Email looks great"
}'
```

To make this request, these values are required.

-   `SESSION_ID`: The session ID found in the response payload when you created a session.
-   `ACCESS_TOKEN`: The token that you created in [Create a Token](/docs/einstein/genai/guide/agent-api-get-started.html#create-a-token).
-   Specify `application/json` in the `Content-Type` header to indicate JSON content in the request.

If the feedback was received, you get an HTTP 201 response.

For API reference info, see [Submit Feedback](/docs/einstein/genai/references/agent-api?meta=submitFeedback).

## See Also

-   [Get Started with Agent API](/docs/einstein/genai/guide/agent-api-get-started.html)
-   [Send Agent Variables with the Agent API](/docs/einstein/genai/guide/agent-api-variables.html)
-   [Agent API Video Tutorial](https://salesforce.vidyard.com/watch/gT17Ey9JoSfYhhVgR3guaC?)
-   [Agent API Postman Collection](https://www.postman.com/salesforce-developers/salesforce-developers/collection/gwv9bjy/agent-api)
-   [Send Agent Variables with the Agent API](/docs/einstein/genai/guide/agent-api-variables.html)
-   [Agent API Session Lifecycle](/docs/einstein/genai/guide/agent-api-lifecycle.html)
-   [Agent API Considerations](/docs/einstein/genai/guide/agent-api-considerations.html)
-   [Agent API Troubleshooting](/docs/einstein/genai/guide/agent-api-troubleshooting.html)
-   [Agent API Reference](/docs/einstein/genai/references/agent-api?meta=summary)
-   _Developer Relations YouTube Video_: [Integrate Agentforce with Microsoft Teams](https://www.youtube.com/watch?v=cbIOq_rQang)