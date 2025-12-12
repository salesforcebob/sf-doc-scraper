# Toxicity Scoring with Models API

Most LLMs are trained on a vast collection of data that includes a wide range of problematic content. Generated responses can contain toxic material that is unacceptable in an enterprise context. When free text input is allowed in prompts, services can also see toxic language entered directly by end users. Detection of toxic language is a key capability of the Einstein Trust Layer, enabling application developers and customers to take appropriate policy actions in response. Toxic language detection is an important component of our audit trail solution. See [Einstein Trust Layer](https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_layer.htm) in _Salesforce Help_.

## How It Works

By default, the Models API automatically performs toxicity confidence scoring on LLM generations. The API passes back a flag indicating whether toxicity was detected, along with score information. This information is also stored in Data 360 for your review. See [Review Toxicity Scores](https://help.salesforce.com/s/articleView?id=sf.generative_ai_audit_toxicity.htm) in _Salesforce Help_.

To ensure that toxicity detection can be as accurate as possible, specify the correct locale in your API request. See [Specify Languages and Locales with Models API](/docs/einstein/genai/guide/models-api-languages-and-locales.html).

> **Note:**
> 
> The presence of region-specific language presents difficulties in effectively identifying harmful or inappropriate content. Einstein Trust Layer doesn’t always identify such content with 100% accuracy, especially when it involves region-specific language patterns.

## Example Response

This response snippet highlights some of the content moderation data that is returned in the response. This information is also stored in Data 360.

```json
{
  "id": "chatcmpl-9AMuFltdq7M5ntZVvQcAkgyWhfoas",
  "generation": {
    "id": "333127bd-2d5d-41e8-9781-59a1a18ed69f",
    "generatedText": "Once upon a time in sunny San Diego...",
    "contentQuality": {
      "scanToxicity": {
        "isDetected": false,
        "categories": [
          {
            "categoryName": "profanity",
            "score": 0
          },
          {
            "categoryName": "violence",
            "score": 0
          },
          {
            "etc": "etc...."
          }
        ]
      }
    },
    "etc": "etc...."
  }
}
```

## Toxicity Response Fields

This table lists some of the key content moderation fields in a generation response.

| Field | Type | Parent Object | Description |
| --- | --- | --- | --- |
| `contentQuality` | object | `generation` | Content moderation details for generated content, including its safety and quality scores. |
| `scanToxicity` | object | `contentQuality` | Represents safety and toxicity data. |
| `isDetected` | boolean | `scanToxicity` | Indicates whether a scan detected any toxic content. When the `isDetected` field is `true`, it indicates a high level of confidence that the content contains toxic language. However, when the `isDetected` field is `false`, it doesn’t necessarily mean there isn’t toxicity, but rather, that the model didn’t detect toxicity in the content. |
| `categories` | array | `scanToxicity` | The array of toxicity categories |
| `categoryName` | string | `categories` | Name of the toxicity category |
| `score` | number | `categories` | A toxicity score value from 0 to 1. A higher score means the response is more likely to be toxic. |

## See Also

-   _Models API Reference_: [Generate Text Endpoint](/docs/einstein/genai/references/models-api?meta=generateText)
-   _Models API Developer Guide_: [Access Models API with REST](/docs/einstein/genai/guide/access-models-api-with-rest.html)
-   _Models API Developer Guide_: [Access Models API with Apex](/docs/einstein/genai/guide/access-models-api-with-apex.html)
-   _Salesforce Help_: [Einstein Trust Layer](https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_layer.htm)
-   _Salesforce Help_: [Review Toxicity Scores](https://help.salesforce.com/s/articleView?id=sf.generative_ai_audit_toxicity.htm)