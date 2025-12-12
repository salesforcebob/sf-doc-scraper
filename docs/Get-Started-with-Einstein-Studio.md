# Get Started with Einstein Studio

With [Einstein Studio](https://help.salesforce.com/s/articleView?id=sf.c360_a_ai_use_ai_models.htm), you can configure foundation models, customize model hyperparameters, and test prompts in a playground environment before deploying a model to production. See [Configure and Test a Model with Model Playground](https://help.salesforce.com/s/articleView?id=sf.c360_a_ai_foundation_models_test.htm).

You can also bring your own large language model (BYOLLM) from an LLM provider using your own account. The model is saved to the Model Library in Einstein Studio as a foundation model that you can configure. See [Add a Foundation Model](https://help.salesforce.com/s/articleView?id=sf.c360_a_ai_foundation_models_create.htm) and [Bring Your Own LLM](/docs/einstein/genai/guide/supported-models.html#bring-your-own-llm).

To connect _any_ language model (including custom-built models) to Einstein Studio's BYOLLM feature, you can use the LLM Open Connector. The [Einstein AI Platform GitHub repository](https://github.com/salesforce/einstein-platform) contains API specifications and example code for the LLM Open Connector.

When you’re familiar with how to configure and manage your models with Einstein Studio, you can access these models using the Models API.

## Access Your Models Programmatically

Access your Einstein Studio generative models with the Models API.

-   [Access Models API with REST](/docs/einstein/genai/guide/access-models-api-with-rest.html)
-   [Access Models API with Apex](/docs/einstein/genai/guide/access-models-api-with-apex.html)
-   [Supported Models](/docs/einstein/genai/guide/supported-models.html)
-   [Build Lightning Web Components and Flows with Models API](/docs/einstein/genai/guide/models-api-build-lwc-flow.html)

## See Also

-   _Salesforce Help_: [Einstein Studio](https://help.salesforce.com/s/articleView?id=sf.c360_a_ai_use_ai_models.htm)
-   Einstein AI Platform on GitHub: [LLM Open Connector](https://github.com/salesforce/einstein-platform?tab=readme-ov-file#llm-open-connector)