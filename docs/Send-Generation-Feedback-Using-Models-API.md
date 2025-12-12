# Send Generation Feedback Using Models API

Send feedback about a generative AI provider’s response using the Feedback REST endpoint or Apex class. For example, you can send feedback about a generated email containing misinformation about a product.

## How It Works

When you send a request with a prompt, the response can return one or more generation objects, each with a unique ID. Use this identifier (or your own unique identifier value) to provide feedback to the feedback REST endpoint or the feedback Apex class. This feedback can include additional details about explicit feedback or telemetry data. Feedback data is stored in Data 360.

Each feedback call requires at least two IDs: one that identifies this unique piece of feedback (`id`) and one that identifies the target of this feedback (`generationId`). You can provide information about the feedback sentiment (`feedback`), free-form feedback text (`feedbackText`), and any other use-case-specific data (`appFeedback`). The Models API doesn’t do any semantic validation on this information and is only meant for you to identify and filter the feedback in the datastore. The Models API doesn't limit the size of `feedbackText` in a request. However, the data is truncated to 1024 characters when it's stored in Data 360.

See [Einstein Audit and Feedback Data](https://help.salesforce.com/s/articleView?id=sf.generative_ai_feedback.htm) in Salesforce Help.

## REST Example

In this example, the client sends feedback when the user specified a thumbs down for an incomplete response. The sample code shows the request body when making an HTTP POST request to the `/feedback` endpoint.

```json
{
  "id": "78w60870345-2335840385-4857348-803483",
  "generationId": "89t608-46756v66y-23r4wqxe43-096mi",
  "feedback": "BAD",
  "feedbackText": "The suggested summary was confusing and incomplete",
  "source": "HUMAN"
}
```

See [Submit Feedback REST Endpoint](/docs/einstein/genai/references/models-api?meta=submitFeedback).

## Apex Example

In this Apex example, the client sends feedback when the user is satisfied with the response.

```apex
// Create feedback request
aiplatform.ModelsAPI.submitFeedback_Request request = new aiplatform.ModelsAPI.submitFeedback_Request();

// Provide feedback information in body
aiplatform.ModelsAPI_FeedbackRequest feedbackRequest = new aiplatform.ModelsAPI_FeedbackRequest();
feedbackRequest.id = '78w60870345-2335840385-4857348-803483';
feedbackRequest.generationId = '89t608-46756v66y-23r4wqxe43-096mi';
feedbackRequest.feedback = 'GOOD';
feedbackRequest.feedbackText = 'The generation was helpful and did not require any changes';
feedbackRequest.source = 'HUMAN';
request.body = feedbackRequest;

// Submit feedback
try {
    aiplatform.ModelsAPI modelsAPI = new aiplatform.ModelsAPI();
    aiplatform.ModelsAPI.submitFeedback_Response response = modelsAPI.submitFeedback(request);
    System.debug('Models API response: ' + response.Code202.message);

// Handle error
} catch(aiplatform.ModelsAPI.submitFeedback_ResponseException e) {
    System.debug('Response code: ' + e.responseCode);
    System.debug('The following exception occurred: ' + e);
}
```

## See Also

-   _Models API Developer Guide_: [Access Models API with REST](/docs/einstein/genai/guide/access-models-api-with-rest.html)
-   _Models API Developer Guide_: [Access Models API with Apex](/docs/einstein/genai/guide/access-models-api-with-apex.html)
-   _Models API Reference_: [Submit Feedback REST Endpoint](/docs/einstein/genai/references/models-api?meta=submitFeedback)
-   _Models API Reference_: [submitFeedback Apex method](/docs/einstein/genai/references/models-apex-api/models-apex-reference.html#submitfeedback)
-   _Salesforce Help_: [Einstein Audit and Feedback Data](https://help.salesforce.com/s/articleView?id=sf.generative_ai_feedback.htm)