# Data Masking with Models API

The Einstein Trust Layer identifies and masks selected personally identifiable information (PII) and payment card industry (PCI) data in the prompts before sending them to the large language model (LLM). Data masking prevents your sensitive data from exposure to the LLM and keeps your sensitive CRM data safely stored inside Salesforce.

## Prerequisites

To ensure that sensitive data is masked, verify that your desired language and locale is supported, and then follow the admin instructions for setting up data masking. See [Einstein Trust Layer Region Language Support](https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_lang_region.htm) and [Data Masking](https://help.salesforce.com/s/articleView?id=sf.generative_ai_mask_data.htm) in _Salesforce Help_.

After you verify that your locale is supported and that data masking is turned on, specify the correct locale in your API request. See [Specify Languages and Locales with Models API](/docs/einstein/genai/guide/models-api-languages-and-locales.html).

## How It Works

Data masking involves replacing each value that’s detected with placeholder text based on what it represents. Then, the LLM can maintain the context of the prompt to generate a relevant response. After the LLM returns a response, the Einstein Trust Layer demasks the data that was originally masked. The response that you see has the actual data. You can track data masking and view the masked data by using the audit trail. Audit trail is stored in Data 360.

There’s no programmatic way to handle masked data from the Models API.

> **Note:**
> 
> Although our detection models have shown to be effective during internal testing, it’s important to note that no model can guarantee 100% accuracy. In addition, cross-region and multi-country use cases can affect the ability to detect specific data patterns. With trust as our priority, we’re dedicated to the ongoing evaluation and refinement of our models.

## Context Window

Although some of the [supported models](/docs/einstein/genai/guide/supported-models.html#model-criteria) have extended context windows, all models are currently limited to a context size of 65,536 tokens when data masking is turned on in the Einstein Trust Layer. To turn off data masking and use the full context window, see [Set Up Einstein Trust Layer](https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_setup.htm) in Salesforce Help.

## See Also

-   _Salesforce Help_: [Einstein Trust Layer Region Language Support](https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_lang_region.htm)
-   _Salesforce Help_: [Data Masking](https://help.salesforce.com/s/articleView?id=sf.generative_ai_mask_data.htm)