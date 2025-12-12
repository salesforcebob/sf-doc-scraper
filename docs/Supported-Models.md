# Supported Models

Understand supported large language models (LLMs) from multiple providers for embedded features, such as Prompt Builder, and Models API. Identify the Salesforce-managed models that are available out of the box. Learn how you can bring your own model (BYOLLM) by using Einstein Studio.

## Agentforce Models

To change the model option for Agentforce, go to the Agentforce Agents page in Setup. The reasoning engine and agent actions use the selected option to determine model usage. The Salesforce Default model option for Agentforce is a managed mix of trusted models (currently including GPT-4o) optimized by Salesforce for accuracy, trust, and performance. The AWS-Hosted option uses Anthropic Claude Sonnet 4 on Amazon Bedrock. See [Select Agentforce Model Option](https://help.salesforce.com/s/articleView?id=ai.agent_setup_select_model_provider.htm&type=5) in Salesforce Help.

Custom actions that execute prompt templates or Apex or call the Models API can use any Salesforce-managed or BYO model.

## Salesforce-Managed Models

This table lists the API names for all the standard configuration models in Einstein Studio. In addition to these models, you can use the API name from any custom model configuration in Einstein Studio.

To see details, such as model version and supported regions, see [Large Language Model Support](https://help.salesforce.com/s/articleView?id=sf.generative_ai_large_language_model_support.htm&type=5) in Salesforce Help.

| Model | API Name | Notes |
| --- | --- | --- |
| Amazon Nova Lite on Amazon Bedrock | `sfdc_ai__DefaultBedrockAmazonNovaLite` | \* Salesforce Trust Boundary |
| Amazon Nova Pro on Amazon Bedrock | `sfdc_ai__DefaultBedrockAmazonNovaPro` | \* Salesforce Trust Boundary |
| Anthropic Claude 3 Haiku on Amazon Bedrock | `sfdc_ai__DefaultBedrockAnthropicClaude3Haiku` | \* Salesforce Trust Boundary |
| Anthropic Claude Haiku 4.5 on Amazon Bedrock (Beta) | `sfdc_ai__DefaultBedrockAnthropicClaude45Haiku` | \* Salesforce Trust Boundary |
| Anthropic Claude 3.7 Sonnet on Amazon Bedrock | `sfdc_ai__DefaultBedrockAnthropicClaude37Sonnet` | \* Salesforce Trust Boundary |
| Anthropic Claude Sonnet 4 on Amazon Bedrock | `sfdc_ai__DefaultBedrockAnthropicClaude4Sonnet` | \* Salesforce Trust Boundary |
| Anthropic Claude Sonnet 4.5 on Amazon Bedrock (Beta) | `sfdc_ai__DefaultBedrockAnthropicClaude45Sonnet` | \* Salesforce Trust Boundary |
| Azure OpenAI Ada 002 | `sfdc_ai__DefaultAzureOpenAITextEmbeddingAda_002` | Embeddings model available in Models API only |
| OpenAI Ada 002 | `sfdc_ai__DefaultOpenAITextEmbeddingAda_002` | Embeddings model available in Models API only |
| OpenAI / Azure OpenAI GPT 4 Omni (GPT-4o) | `sfdc_ai__DefaultGPT4Omni` | [Geo-aware](#geo-aware-models) |
| OpenAI / Azure OpenAI GPT 4 Omni Mini (GPT-4o mini) | `sfdc_ai__DefaultGPT4OmniMini` | [Geo-aware](#geo-aware-models) |
| OpenAI GPT 4 Omni Mini (GPT-4o mini) | `sfdc_ai__DefaultOpenAIGPT4OmniMini` |  |
| OpenAI / Azure OpenAI GPT 4.1 | `sfdc_ai__DefaultGPT41` | [Geo-aware](#geo-aware-models) |
| OpenAI / Azure OpenAI GPT 4.1 Mini | `sfdc_ai__DefaultGPT41Mini` | [Geo-aware](#geo-aware-models) |
| OpenAI / Azure OpenAI GPT 5 | `sfdc_ai__DefaultGPT5` | [Geo-aware](#geo-aware-models) |
| OpenAI / Azure OpenAI GPT 5 Mini | `sfdc_ai__DefaultGPT5Mini` | [Geo-aware](#geo-aware-models) |
| OpenAI / Azure OpenAI GPT 5.1 (Beta) | `sfdc_ai__DefaultGPT51` | [Geo-aware](#geo-aware-models) |
| OpenAI / Azure OpenAI O3 (Beta) | `sfdc_ai__DefaultO3` | [Geo-aware](#geo-aware-models) |
| OpenAI / Azure OpenAI O4 Mini (Beta) | `sfdc_ai__DefaultO4Mini` | [Geo-aware](#geo-aware-models) |
| Vertex AI (Google) Gemini 2.0 Flash | `sfdc_ai__DefaultVertexAIGemini20Flash001` |  |
| Vertex AI (Google) Gemini 2.0 Flash Lite | `sfdc_ai__DefaultVertexAIGemini20FlashLite001` |  |
| Vertex AI (Google) Gemini 2.5 Flash | `sfdc_ai__DefaultVertexAIGemini25Flash001` |  |
| Vertex AI (Google) Gemini 2.5 Flash Lite | `sfdc_ai__DefaultVertexAIGemini25FlashLite001` |  |
| Vertex AI (Google) Gemini 2.5 Pro | `sfdc_ai__DefaultVertexAIGeminiPro25` |  |

\* **Salesforce Trust Boundary**: Anthropic and Amazon models are operated on Amazon Bedrock infrastructure entirely within the Salesforce Trust Boundary. In contrast, other models are operated by Salesforce partners, either inside a shared trust zone or through the LLM provider directly using Einstein Studio’s [bring your own LLM](#bring-your-own-llm) (BYOLLM) feature.

### Beta Models

Beta models are production models from model providers that Salesforce is beta testing. Beta models typically have lower rate limits and may not be available in all regions. A beta model has (Beta) appended to its name. If beta models aren't turned on, they appear as (Disabled) in Einstein Studio.

> **Note:**
> 
> This feature is a pilot or beta service that is subject to the Beta Services Terms at [Agreements - Salesforce.com](https://www.salesforce.com/company/legal/agreements/) or a written Unified Pilot Agreement if executed by Customer, and applicable terms in the [Product Terms Directory](https://ptd.salesforce.com/?_ga=2.247987783.1372150065.1709219475-629000709.1639001992). Use of this pilot or beta service is at the Customer's sole discretion.

We recommend that you enable beta models in sandbox or development orgs only.

To turn on beta generative AI models and use them, see [Large Language Model Support](https://help.salesforce.com/s/articleView?id=sf.generative_ai_large_language_model_support.htm&type=5) in Salesforce Help.

## Bring Your Own LLM

> **Tip:**
> 
> When you bring your own LLM, you consume 30% fewer Einstein Requests compared to other models. For details, see [Einstein Usage](https://help.salesforce.com/s/articleView?id=sf.generative_ai_usage.htm).

The Models API supports [Einstein Studio’s](https://help.salesforce.com/s/articleView?id=data.c360_a_ai_use_ai_models.htm) bring your own LLM (BYOLLM) feature, which currently supports Amazon Bedrock, Azure OpenAI, OpenAI, and Vertex AI from Google as foundation model providers. With BYOLLM, you can add a foundation model from a supported provider, configure your own instance of the model, and connect to the model using your own credentials. Although inference is handled by the LLM provider, the request is still routed through the Models API and Trust Layer features are fully supported.

Using a BYOLLM model with the Models API is the same as any other model. Look up the **API Name** of the configured model in Einstein Studio and use it as the `{modelName}` in the REST endpoint path or as the `modelName` property of the Apex request object.

To see the list of foundation models that you can add in Einstein Studio with BYOLLM, see [Large Language Model Support](https://help.salesforce.com/s/articleView?id=sf.generative_ai_large_language_model_support.htm&type=5) in Salesforce Help.

To learn more about BYOLLM, see [Bring Your Own Large Language Model in Einstein 1 Studio](https://developer.salesforce.com/blogs/2024/03/bring-your-own-large-language-model-in-einstein-1-studio) on the Salesforce Developers Blog.

### LLM Open Connector

The Bring Your Own Large Language Model (BYOLLM) Open Connector is designed to provide powerful AI solutions to customers, independent software vendors (ISVs), and internal Salesforce teams. With this connector, you can connect the Einstein AI Platform to any language model, including custom-built models.

The BYOLLM Open Connector is a commitment to community-driven growth and innovation. By allowing users to integrate any LLM—from those models hosted on major cloud platforms to those models developed in-house—we're opening up a world of possibilities for enhanced, bespoke AI applications. This capability not only caters to the needs of large enterprises looking to leverage specific models like IBM Granite or Databricks DBRX, but also supports smaller teams eager to experiment with open-source models. With features designed to ensure ease of use, such as a streamlined UX in Einstein Studio and API specifications closely based on the OpenAI API, this connector empowers our users to enhance their AI-driven applications while maintaining high standards of security and compatibility.

See the [Einstein AI Platform GitHub repository](https://github.com/salesforce/einstein-platform) for API specifications and example code for the LLM Open Connector.

## Model Criteria

To choose the right model for your application, consider these criteria.

**Capabilities**: What can the model do? Advanced models can perform a wider variety of tasks (usually at the expense of higher costs and slower speeds—or both). The ability to follow complex instructions is a key indicator of model capabilities.

**Cost**: How much does the model cost to use? For details on usage and billing, see [Einstein Usage](https://help.salesforce.com/s/articleView?id=sf.generative_ai_usage.htm).

**Quality**: How well does the model respond? The quality of model responses can be hard to measure quantitatively, but a good place to start is the [LMSYS Chatbot Arena](https://chat.lmsys.org/).

**Speed**: How long does it take the model to complete a task? Includes measures of latency and throughput.

### Benchmarks and Evaluations

For benchmarks and evaluations of LLMs and embedding models, see these resources.

-   [Artificial Analysis](https://artificialanalysis.ai/): Aggregated data on LLM performance.
-   [LLM Benchmark for CRM](https://www.salesforceairesearch.com/crm-benchmark): Evaluation of LLMs for Sales and Service use cases. Provided by Salesforce AI Research.
-   [LMSYS Chatbot Arena](https://chat.lmsys.org/): Human scoring of LLMs. Anyone can participate!
-   [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard): Benchmarks for embedding models from Huggingface.
-   [SEAL Leaderboard](https://scale.com/leaderboard): Evaluations of LLMs using private datasets from Scale AI.

### Context Window

The context window determines how many input and output tokens the model can process in a single request. The context window includes system messages, prompts, and responses.

All models are currently limited to a context size of 65,536 tokens when data masking is turned on in the Einstein Trust Layer. To turn off data masking and use the full context window, see [Set Up Einstein Trust Layer](https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_setup.htm) in Salesforce Help.

For more information about the context window for individual models, see the model provider site.

-   [Amazon Bedrock: Anthropic Claude](https://aws.amazon.com/bedrock/claude/)
-   [Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models?tabs=python-secure%2Cglobal-standard%2Cstandard-chat-completions)
-   [OpenAI](https://platform.openai.com/docs/models/overview)
-   [Vertex AI (Google)](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models)

## Geo-aware Models

A geo-aware model minimizes latency by automatically routing your LLM request to a nearby data center based on where Data 360 is provisioned for your org.

Proximity to the nearest LLM server is determined by the region in which your Einstein generative AI platform instance is located. If you enabled the Einstein generative AI platform on or after June 13, 2024, then your Einstein generative AI platform region is the same as your Data 360 region ([IP Addresses Used by Data 360 Services](https://help.salesforce.com/s/articleView?id=000396455&language=en_US&type=1)). Otherwise, contact your Salesforce account executive to learn where it’s provisioned.

To learn more about geo-aware routing, see [Geo-Aware LLM Request Routing](https://help.salesforce.com/s/articleView?id=sf.generative_ai_platform_geo_aware_routing.htm&type=5) in Salesforce Help.

## Model Announcements

Announcements for new models and model deprecations are part of the [Einstein Platform release notes](https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein_platform.htm) on a monthly basis.

### Deprecated Models

Model deprecation is the process where a model provider gradually phases out a model (usually in favor of a new and improved model). The process starts with an announcement outlining when the model will no longer be accessible or supported. The deprecation announcement usually contains a specific shutdown date. Deprecated models are still available to use until the shutdown date.

After the shutdown date, you won’t be able to use that model in your application and requests to that model will be rerouted to a replacement model. We recommend that you start migrating your application away from a model as soon as its deprecation is announced. During migration, update and test each part of your application with the replacement model that we recommend. For more details about deprecated models, see [Large Language Model Support](https://help.salesforce.com/s/articleView?id=sf.generative_ai_large_language_model_support.htm&type=5) in Salesforce Help.

### Rerouted Models

These models are rerouted.

| Model | API Name | Rerouted To |
| --- | --- | --- |
| Azure OpenAI GPT 3.5 Turbo | `sfdc_ai__DefaultAzureOpenAIGPT35Turbo` | GPT 4 Omni Mini |
| Azure OpenAI GPT 3.5 Turbo 16k | `sfdc_ai__DefaultAzureOpenAIGPT35Turbo_16k` | GPT 4 Omni Mini |
| Azure OpenAI GPT 4 Turbo | `sfdc_ai__DefaultAzureOpenAIGPT4Turbo` | GPT 4 Omni |
| OpenAI GPT 3.5 Turbo | `sfdc_ai__DefaultOpenAIGPT35Turbo` | OpenAI GPT 4 Omni Mini |
| OpenAI GPT 3.5 Turbo 16k | `sfdc_ai__DefaultOpenAIGPT35Turbo_16k` | OpenAI GPT 4 Omni Mini |
| OpenAI GPT 4 | `sfdc_ai__DefaultOpenAIGPT4` | GPT 4 Omni |
| OpenAI GPT 4 32k | `sfdc_ai__DefaultOpenAIGPT4_32k` | GPT 4 Omni |
| OpenAI GPT 4 Turbo | `sfdc_ai__DefaultOpenAIGPT4Turbo` | GPT 4 Omni |

## See Also

-   [Model API Names](/docs/einstein/genai/guide/models-api-names.html)
-   [Access Models API with Apex](/docs/einstein/genai/guide/access-models-api-with-apex.html)
-   [Access Models API with REST](/docs/einstein/genai/guide/access-models-api-with-rest.html)
-   [Rate Limits for Models API](/docs/einstein/genai/guide/models-api-rate-limits.html)
-   [Models REST API Reference](/docs/einstein/genai/references/models-api?meta=summary)