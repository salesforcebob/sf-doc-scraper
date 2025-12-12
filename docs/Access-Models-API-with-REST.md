# Access Models API with REST

The Models REST API is a REST API that connects your application to large language models (LLMs). Start by creating a Salesforce app and generating a JSON Web Token (JWT) that you can use to access this API.

![API Flow](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/api-onboarding-steps.svg)

> **Note:**
> 
> All Models API requests are subject to Salesforce’s usage and billing rates for Einstein Requests. See [Einstein Usage](https://help.salesforce.com/s/articleView?id=sf.generative_ai_usage.htm) and the [Rate Card for Einstein Requests](https://www.salesforce.com/products/einstein/skus/).

## Postman Collection

The quickest way to get started with the Models REST API is with our [Postman collection](https://www.postman.com/salesforce-developers/workspace/salesforce-developers/collection/12721794-582bb775-b99d-46d8-88cf-df0d3a341040).

## Video Tutorial

This video shows you how to set up your org to use the REST API. It contains a simplified version of the steps below.

Access the Models REST API

![undefined](https://play.vidyard.com/CuJRahNcxoVFTA6bwRdhXW.jpg)

## Step 1. Create a Salesforce App

To securely communicate with Salesforce using the Models REST API, you must create an [External Client App](https://help.salesforce.com/s/articleView?id=sf.external_client_apps.htm) or a [Connected App](https://help.salesforce.com/s/articleView?id=sf.connected_app_overview.htm). Both app types allow external services to integrate with Salesforce APIs using well-known authorization protocols, such as OAuth. External Client Apps (ECAs) are the new generation of Salesforce apps, and we suggest that you use an ECA for this purpose. However, these basic guidelines apply to both app types.

Create an external client app with OAuth and JWT enabled. Use these instructions to get set up: [Create a Local External Client App](https://help.salesforce.com/s/articleView?id=sf.create_a_local_external_client_app.htm).

When creating the app, include these settings.

1.  Use these OAuth scopes.
    
    -   **Manage user data via APIs (api):** Gives you access to user data.
    -   **Perform requests at any time (refresh\_token, offline\_access):** Permits you to get an OAuth access token.
    -   **Access the Salesforce API Platform (sfap\_api):** Enables access to the Salesforce REST API platform.
    
    ![OAuth settings scope](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/oauth-settings-1.png)
    
2.  Select these additional OAuth settings.
    
    -   **Enable Client Credentials Flow:** Allows your app to exchange its client credentials for an access token.
    -   **Issue JWT Web Token (JWT)-based access tokens for named users:** Allows app to issue tokens for named users.
    
    ![OAuth settings checkboxes](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/oauth-settings-2.png)
    
3.  After creating the app, ensure that the API caller has the correct client credentials and that the client can issue JWT-based access tokens.
    
    -   Click the **Policies** tab for the app, and then click **Edit**.
    -   Select the **Enable Client Credentials Flow** checkbox.
    -   Specify the client user in the **Run As** field.
    -   Select the **Issue JSON Web Token (JWT)-based access tokens** checkbox. By default, this token expires in 30 minutes. You can change this value to less than 30 minutes.
    
    ![OAuth user settings](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/oauth-settings-3.png)
    

## Step 2. Generate a JWT

A JSON Web Token (JWT) is required for authorization.

1.  From Setup, in the Quick Find box, enter `External Client Apps`, and then select **External Client Apps Manager**.
    
2.  Select your app, and click the **Settings** tab.
    
3.  Expand the **OAuth Settings** section.
    
4.  Click the **Consumer Key and Secret** button, and copy your key and secret. You need these values to mint this token.
    
    Store your consumer secret in a secure location.
    
5.  From Setup, in the Quick Find box, enter `My Domain`, and then select **My Domain**.
    
6.  Copy the value shown in the **Current My Domain URL** field.
    
7.  Request a JWT from Salesforce using a POST request, specifying the values for your domain, consumer key, and consumer secret. For example:
    
    If you receive an `invalid_grant` error with the description, `request not supported on this domain`, verify that the domain is the domain specified when you view **My Domain** in Setup.
    
8.  Use the `access_token` value in this response for the `Authorization` header in your API requests. For example:
    

## Step 3. Use Models REST API

When you have a valid token, you can call any of the Models REST API endpoints.

### Pick a Capability

The Models REST API provides four different endpoints for four different capabilities.

| Capability | Endpoint Path | Description |
| --- | --- | --- |
| Generate Chat | [`/models/{modelName}/chat-generations`](/docs/einstein/genai/references/models-api?meta=generateChat) | Generate a response based on a list of messages representing a chat conversation. |
| Generate Embeddings | [`/models/{modelName}/embeddings`](/docs/einstein/genai/references/models-api?meta=generateEmbeddings) | Create an embedding vector representing the input text. |
| Generate Text | [`/models/{modelName}/generations`](/docs/einstein/genai/references/models-api?meta=generateText) | Generate a response based on the prompt provided. |
| Submit Feedback | [`/feedback`](/docs/einstein/genai/references/models-api?meta=submitFeedback) | Submit feedback for generated text. |

### Choose a Model

Choose a model to use when you call the generations or embeddings endpoints. Each endpoint, other than the feedback endpoint, requires the API name of the model as part of the path. For instance, if you want to use the OpenAI GPT-4o mini model for a generation request, specify the API name `sfdc_ai__DefaultOpenAIGPT4OmniMini` by making a request to this endpoint.

```bash
https://api.salesforce.com/einstein/platform/v1/models/sfdc_ai__DefaultOpenAIGPT4OmniMini/generations
```

The Models API supports models from various Salesforce-enabled providers. See [Supported Models](/docs/einstein/genai/guide/supported-models.html).

### Provide Headers

These headers are relevant for API requests.

| Header | Description | Example |
| --- | --- | --- |
| `Authorization` | Required. Authorization method for this request. This header must contain your JWT. | `Bearer {token}` |
| `Content-Type` | Required. Specify the `application/json` content type. | `application/json` |
| `x-sfdc-app-context` | Required. This value is reserved for future use. For now, specify `EinsteinGPT`. | `EinsteinGPT` |
| `x-client-feature-id` | Required. This value is reserved for future use. For now, specify `ai-platform-models-connected-app`. | `ai-platform-models-connected-app` |

### Make a Request

Make a POST request to one of [the Models REST API endpoints](/docs/einstein/genai/references/models-api?meta=summary). This example demonstrates a call to the `generations` endpoint.

```bash
curl --location 'https://api.salesforce.com/einstein/platform/v1/models/sfdc_ai__DefaultOpenAIGPT4OmniMini/generations' \
--header 'Authorization: Bearer ••••••' \
--header 'Content-Type: application/json' \
--header 'x-sfdc-app-context: EinsteinGPT' \
--header 'x-client-feature-id: ai-platform-models-connected-app' \
--data '{
    "prompt": "James Lee is a financial advisor, living in San Diego. His phone number is 867-5309. Generate a story about his work and life."
}'
```

> **Tip:**
> 
> If you receive a `401` or `404` response code, verify that your Salesforce app includes all the required scopes and settings. See [Create a Salesforce App](#step-1-create-a-salesforce-app). Also, verify that you're using the complete `access_token` value that you generated earlier. See [Generate a JWT](#step-2-generate-a-jwt).

And here’s a sample response.

```json
{
  "id": "chatcmpl-9AMuFltdq7M5ntZVvQcAkgyWhfoas",
  "generation": {
    "id": "333127bd-2d5d-41e8-9781-59a1a18ed69f",
    "generatedText": "Once upon a time in sunny San Diego, there lived a diligent and experienced financial advisor named James Lee. With a passion for numbers and a knack for helping others achieve their financial goals, James had built a reputation as a trusted advisor in the community.\n\nJames had always been fascinated by the world of finance. From a young age, he would spend hours poring over financial newspapers and studying the stock market. As he grew older, his passion only intensified, leading him to pursue a degree in finance from a prestigious university...",
    "contentQuality": {
      "scanToxicity": {
        "isDetected": false,
        "categories": [
          {
            "categoryName": "identity",
            "score": 2.0e-5,
          },
          {
            "categoryName": "hate",
            "score": 0.0,
          },
          {
            "categoryName": "profanity",
            "score": 3.0e-5,
          },
          {
            "categoryName": "violence",
            "score": 2.0e-5,
          },
          {
            "categoryName": "sexual",
            "score": 1.5e-4,
          },
          {
            "categoryName": "physical",
            "score": 0.0,
          }
        ]
      }
    },
    "parameters": {
      "finish_reason": "stop",
      "index": 0,
      "logprobs": null
    }
  },
  "moreGenerations": null,
  "prompt": null,
  "parameters": {
    "created": 1712258359,
    "usage": {
      "completion_tokens": 607,
      "prompt_tokens": 39,
      "total_tokens": 646
    },
    "model": "gpt-35-turbo",
    "system_fingerprint": null,
    "object": "chat.completion"
  }
}
```

## Next Steps

After you successfully call the API, refer to these topics to optimize your implementation.

-   [Supported Models](/docs/einstein/genai/guide/supported-models.html)
-   [Rate Limits for Models API](/docs/einstein/genai/guide/models-api-rate-limits.html)
-   [Specify Languages and Locales with Models API](/docs/einstein/genai/guide/models-api-languages-and-locales.html)
-   [Toxicity Scoring with Models API](/docs/einstein/genai/guide/models-api-toxicity-scoring.html)
-   [Data Masking with Models API](/docs/einstein/genai/guide/models-api-data-masking.html)
-   [Get Generation Feedback Using Models API](/docs/einstein/genai/guide/models-api-feedback.html)
-   [Access Models API with Apex](/docs/einstein/genai/guide/access-models-api-with-apex.html)
-   [Build Lightning Web Components and Flows with Models API](/docs/einstein/genai/guide/models-api-build-lwc-flow.html)
-   [Models REST API Reference](/docs/einstein/genai/references/models-api?meta=summary)

## See Also

-   _Salesforce Help_: [About Einstein Generative AI](https://help.salesforce.com/s/articleView?id=sf.generative_ai_about.htm)
-   _Salesforce Help_: [External Client Apps](https://help.salesforce.com/s/articleView?id=sf.external_client_apps.htm)
-   _Salesforce Help_: [Connected Apps](https://help.salesforce.com/s/articleView?id=sf.connected_app_overview.htm)