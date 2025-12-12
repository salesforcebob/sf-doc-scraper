# Models API Developer Guide

The Models API provides Apex classes and REST endpoints that connect your application to large language models (LLMs) from Salesforce partners, including Anthropic, Google, and OpenAI. You can use any Salesforce-enabled model that can be configured in [Einstein Studio](https://help.salesforce.com/s/articleView?id=data.c360_a_ai_use_ai_models.htm). To customize model hyperparameters, create a custom-configured model in Einstein Studio and then use that configured model with the Models API.

> **Note:**
> 
> All Models API requests are subject to Salesforce’s usage and billing rates for Einstein Requests. See [Einstein Usage](https://help.salesforce.com/s/articleView?id=sf.generative_ai_usage.htm) and the [Rate Card for Einstein Requests](https://www.salesforce.com/products/einstein/skus/).

For a list of API names and other details about specific models, see [Supported Models](/docs/einstein/genai/guide/supported-models.html).

All calls to the Models API go through the [Einstein Trust Layer](/docs/einstein/genai/guide/trust.html).

> **Note:**
> 
> Both first-generation (1GP) and second-generation (2GP) managed packages can use the Models API. See [First-Generation Managed Packaging Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.pkg1_dev.meta/pkg1_dev/sharing_apps.htm) and [Second-Generation Managed Packaging Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.pkg2_dev.meta/pkg2_dev/sfdx_dev_dev2gp.htm).

## Key Capabilities

The capabilities of the Models API are expressed as Apex methods or REST endpoints, depending on which version of the API you choose.

### Generate Chat

The Models API can generate a message for a chat conversation. The chat capability allows you to prompt the model with a list of messages rather than just one prompt (providing only one message is fine too). Each message in the list represents a part of a conversation history. You must specify a role for each message: one of `user`, `system`, or `assistant`. The role helps the model understand the conversation and know how to respond. After you pass in this information, the API responds with generated text.

### Generate Embeddings

An embedding is a numerical representation of a chunk of content. Sometimes an embedding is called an embedding vector. To measure the semantic similarity between two chunks of content, you can use mathematical operations on their embedding vectors, such as cosine similarity, Euclidean distance, or dot product. Embeddings are commonly used for retrieval-augmented generation (RAG) and semantic search features.

### Generate Text

The Models API can generate text from a single prompt instead of a whole chat conversation. The generate text capability is useful for simple, non-conversational tasks and for testing the capabilities of a model.

### Submit Feedback

You can provide feedback on any generated text created by the Models API. You can use this data, which is stored in Data 360, to review the quality of the responses and then update your requests or your model configurations. See [Einstein Audit and Feedback Data](https://help.salesforce.com/s/articleView?id=sf.generative_ai_feedback.htm) in _Salesforce Help_.

## Next Steps

To learn how to use the Models API to unlock these capabilities, see our Apex and REST access guides. The Apex classes are great for developing solutions directly in your org. You can also use the Apex classes to build out Lightning web components. The REST API can be used from your existing implementation wherever it resides.

-   [Access Models API with Apex](/docs/einstein/genai/guide/access-models-api-with-apex.html)
-   [Access Models API with REST](/docs/einstein/genai/guide/access-models-api-with-rest.html)
-   [Postman collection for Models REST API](https://www.postman.com/salesforce-developers/workspace/salesforce-developers/collection/12721794-582bb775-b99d-46d8-88cf-df0d3a341040)
-   [Build Lightning Web Components and Flows with Models API](/docs/einstein/genai/guide/models-api-build-lwc-flow.html)
-   _Trailhead_: [Get Started with the Models API](https://trailhead.salesforce.com/content/learn/modules/get-started-with-einstein-models-api)