# Get Started with Models and Prompts

The Einstein platform provides you with powerful tools to configure and use large language models (LLMs). Quickly get started with generative AI features by using Salesforce-managed models, which are enabled by default to speed up the configuration process. The Models API allows you to access different models from your apps. Use Prompt Builder to create and manage prompt templates.

| Feature or API | Description | Manage Prompts | Configure Models | Use Models | Build Custom Solutions |
| --- | --- | --- | --- | --- | --- |
| [Prompt Builder](/docs/einstein/genai/guide/get-started-prompt-builder.html) | Create and manage prompt templates using Salesforce data | Yes |  |  |  |
| [Einstein Studio](/docs/einstein/genai/guide/get-started-einstein-studio.html) | Configure and test AI models |  | Yes |  |  |
| [BYOLLM](/docs/einstein/genai/guide/supported-models.html#bring-your-own-llm) | Connect external OpenAI, Azure, Vertex, or Bedrock models to Einstein Studio |  | Yes |  | Yes |
| [LLM Open Connector](https://github.com/salesforce/einstein-platform?tab=readme-ov-file#llm-open-connector) | Host and connect _any_ custom-built models to Einstein Studio |  | Yes |  | Yes |
| [Models API](/docs/einstein/genai/guide/models-api.html) | Generate text, conversations, and embeddings via Apex and REST; access any Einstein Studio LLM |  |  | Yes | Yes |

## Configure Your Models

With Einstein Studio, configure Salesforce-managed models and test prompts in a playground environment before using a model in production.

You can also bring your own large language model (BYOLLM) from an LLM provider using your own account. The model is saved to the Model Library in Einstein Studio as a foundation model that you can configure.

To connect _any_ language model (including custom-built models) to Einstein Studio's BYOLLM feature, you can use the LLM Open Connector API specification.

-   [Get Started with Einstein Studio](/docs/einstein/genai/guide/get-started-einstein-studio.html)
-   [Salesforce-Managed Models](/docs/einstein/genai/guide/supported-models.html#salesforce-managed-models)
-   [Bring Your Own LLM](/docs/einstein/genai/guide/supported-models.html#bring-your-own-llm)
-   _Salesforce Help_: [Add a Foundation Model](https://help.salesforce.com/s/articleView?id=sf.c360_a_ai_foundation_models_create.htm)
-   _GitHub_: [LLM Open Connector](https://github.com/salesforce/einstein-platform?tab=readme-ov-file#llm-open-connector)

## Use Models API

Use the Models API to generate text, conversations, or embedding vectors. The Models API provides Apex classes and REST endpoints that connect your application to LLMs from Salesforce partners, including Anthropic, Google, and OpenAI.

-   [Models API Developer Guide](/docs/einstein/genai/guide/models-api.html)
-   [Access Models API with Apex](/docs/einstein/genai/guide/access-models-api-with-apex.html)
-   [Access Models API with REST](/docs/einstein/genai/guide/access-models-api-with-rest.html)
-   [Build Lightning Web Components and Flows with Models API](/docs/einstein/genai/guide/models-api-build-lwc-flow.html)

## Design and Run Prompt Templates

Simplify daily tasks by integrating prompt templates, powered by generative AI, into workflows. Create, test, revise, customize, and manage prompt templates that incorporate your CRM data from merge fields that reference record fields, flows, related lists, and Apex. Prompt Builder helps you to make effective prompts that safely connect you and your data with LLMs.

-   [Get Started with Prompt Builder](/docs/einstein/genai/guide/get-started-prompt-builder.html)

## See Also

-   _Salesforce Help_: [Einstein Generative AI](https://help.salesforce.com/s/articleView?id=ai.generative_ai.htm)
-   _Salesforce Help_: [Generative AI Billable Usage Types](https://help.salesforce.com/s/articleView?id=sf.generative_ai_usage.htm)