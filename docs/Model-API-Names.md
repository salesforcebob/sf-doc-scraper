# Model API Names

To access an LLM with the Models API, you must know its API name.

Most endpoints for the Models API require the model’s API name in the URL path. For example, to use the OpenAI GPT-4o mini model with the `/generations` endpoint, the URL looks like this:

```bash
https://api.salesforce.com/einstein/platform/v1/models/sfdc_ai__DefaultOpenAIGPT4OmniMini/generations
```

The API name is also required in the `modelName` property when making a Models API request using Apex. For example:

```apex
aiplatform.ModelsAPI.createGenerations_Request request = new aiplatform.ModelsAPI.createGenerations_Request();
request.modelName = 'sfdc_ai__DefaultOpenAIGPT4OmniMini';
```

The API name is a string made up of substrings:

-   Namespace: `sfdc_ai`
-   Separator: `__`
-   Configuration name: `Default`
-   Provider name: `OpenAI` (not used with most geo-aware models)
-   Model name: `GPT4OmniMini` (not used with BYOLLM and custom-configured models)

To find the API name for a supported model, see [Supported Models](/docs/einstein/genai/guide/supported-models.html#salesforce-managed-models).

To find the model version, such as `gpt-4o-2024-11-20`, for a supported model, see [Large Language Model Support](https://help.salesforce.com/s/articleView?id=sf.generative_ai_large_language_model_support.htm&type=5) in Salesforce Help.

## Look Up the API Name

To look up the API name of any custom or standard model configuration in Einstein Studio:

1.  Go to the **Models** page.
2.  Click the **Generative** tab.
3.  Click the name of a configured model.
4.  The API name is shown in the configured model details.

![Einstein Studio API Name](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/model-support-studio-2b.webp)

## See Also

-   [Supported Models](/docs/einstein/genai/guide/supported-models.html)