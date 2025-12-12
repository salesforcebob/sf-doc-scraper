# Trust Layer

It’s important that your data stays safe while you innovate with new technology, such as large language models (LLMs). The Einstein Trust Layer includes protections for your data and your users when interfacing with LLMs.

-   Grounding in CRM data to ensure accuracy
-   Masking of sensitive data, such as social security numbers
-   Toxicity detection on LLM generations
-   Audit trail and feedback
-   Zero data retention agreements with third-party LLM partners

![Einstein trust layer](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/trust-layer.webp)

## Zero Data Retention

At Salesforce, trust is our #1 value. To keep your data secure, Salesforce has agreements in place with LLM providers, such as OpenAI. These agreements include commitments for zero data retention, allowing you to use generative AI capabilities without worrying about your private data being retained by third-party LLM providers.

## Trusted Generative AI

Salesforce’s Einstein generative AI solutions are designed, developed, and delivered based on our five principles for trusted generative AI.

-   **Accuracy**: We back up model responses with explanations and sources whenever possible. We recommend that a human check each model response before sharing them with end users for the majority of use cases.
-   **Safety**: We work to detect and mitigate bias, toxicity, and harmful responses from models used in our products through industry-leading detection and mitigation techniques.
-   **Transparency**: We ensure that our models and features respect data provenance and are grounded in your data whenever possible.
-   **Empowerment**: We believe our products should augment people’s capabilities and make them more efficient and purposeful in their work.
-   **Sustainability**: We strive towards building right-sized models that prioritize accuracy and reducing our carbon footprint.

## Reviewing Generative AI Outputs

Generative AI is a tool that helps you be more creative, productive, and make smarter business decisions. This technology isn’t a replacement for human judgment. You’re ultimately responsible for any LLM-generated response you share with your customers. Whether text is human- or LLM-generated, your customers associate it with your organization’s brand and use it to make decisions. So it’s important to make sure that LLM-generated responses intended for external audiences are accurate and helpful, and that they and align with your company’s values, voice, and tone.

When your end users review generated responses for external audiences, focus on the accuracy and safety of the content.

-   **Accuracy**: Generative AI can sometimes “hallucinate”—fabricate responses that aren’t grounded in fact or existing sources. Before you publish a response, check to make sure that key details are correct. For example, is the customer service suggestion based on an existing and up-to-date knowledge article?
-   **Bias and Toxicity**: Because AI is created by humans and trained on data created by humans, it can also contain bias against historically marginalized groups. Rarely, some responses can contain harmful language. Check your responses to make sure they’re appropriate for your customers.

If the response doesn’t meet your standards or your company’s business needs, you don’t have to use it. Some solutions allow end users to edit the response directly, and if not, it’s best to start over and generate another response.

## Next Steps

-   Review our [Einstein Trust Layer](https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_layer.htm) documentation in Salesforce Help.
-   Understand [Toxicity Confidence Scoring](/docs/einstein/genai/guide/models-api-toxicity-scoring.html) with the Models API.
-   Understand [Data Masking](/docs/einstein/genai/guide/models-api-data-masking.html) with the Models API.

## See Also

-   _Salesforce Research_: [Trusted AI](https://www.salesforceairesearch.com/trusted-ai)