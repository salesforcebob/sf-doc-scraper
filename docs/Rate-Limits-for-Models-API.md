# Rate Limits for Models API

The Models API has a standard rate limit for all requests except for requests made via Apex methods in sandbox, demo, and trial orgs. When calling the Models API through Apex in a sandbox, demo, or trial org there are different limits.

## Production Orgs

There’s a default rate limit of 500 LLM generation requests per minute (RPM) per org for each REST endpoint (or equivalent Apex method) in production orgs. However, depending on a model’s usage and the available capacity from model providers, the RPM limit can vary by model. For the RPM limit per org for individual models, see [Large Language Model Support](https://help.salesforce.com/s/articleView?id=ai.generative_ai_large_language_model_support.htm) in Salesforce Help.

The Embeddings and Feedback capabilities have a higher rate limit of 1,000 requests per minute per org (for embeddings or feedback).

If a rate limit is exceeded, the Models API returns a response with a `429` status and an error object.

To request a rate limit increase, reach out to your Salesforce account executive.

The Apex methods of the Models API are also subject to the Apex [Callout Limits and Limitations](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_callouts_timeouts.htm).

All Models API requests are subject to Salesforce’s usage and billing rates. See [Einstein Usage](https://help.salesforce.com/s/articleView?id=sf.generative_ai_usage.htm).

## Sandbox, Demo, and Trial Orgs

The following limits only apply to requests made through Apex methods in sandbox, demo, and trial orgs. Sandbox, demo, and trial orgs using the Models REST API are subject to the above limit for requests per minute per org for each REST endpoint.

**Sandbox Orgs**

The rate limit value for Apex methods in a sandbox is 200 requests per hour.

> **Note:**
> 
> A request from the Agentforce reasoning engine to the Models API in a sandbox is not rate limited. This behavior is a known issue and may change at any time.

**Demo and Trial Orgs**

The rate limit value for Apex methods in a demo or trial org is 150 requests per hour.

## See Also

-   _Models API Developer Guide_: [Access Models API with REST](/docs/einstein/genai/guide/access-models-api-with-rest.html)
-   _Models API Developer Guide_: [Access Models API with Apex](/docs/einstein/genai/guide/access-models-api-with-apex.html)
-   [Supported Models](/docs/einstein/genai/guide/supported-models.html)