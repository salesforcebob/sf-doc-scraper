# Specify Languages and Locales with Models API

The Models API can receive text requests that combine data from multiple sources and in potentially different languages. However, not specifying the correct set of languages and locales limits the effectiveness of critical features, such as [Data Masking](/docs/einstein/genai/guide/models-api-data-masking.html), [Toxicity Scoring](/docs/einstein/genai/guide/models-api-toxicity-scoring.html), and [Feedback](/docs/einstein/genai/guide/models-api-feedback.html). To address this issue, you can specify a set of localization parameters in the payload to provide an accurate list of locales or languages included in the prompt, and to generate a response in the desired language.

To learn more, see [Einstein Trust Layer Region Language Support](https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_lang_region.htm).

## Usage

To provide multi-language or multi-locale support, specify a `localization` payload in your request for Generations, Chat Generations, Embeddings. The locale field can contain the [ISO language code](https://www.iso.org/iso-639-language-code) or a combination of the [ISO language code](https://www.iso.org/iso-639-language-code) and the [ISO country code](https://www.iso.org/iso-3166-country-codes.html) (`language_COUNTRY`).

```json
{
  "localization": {
    "defaultLocale": "en_US",
    "inputLocales": [
      {
        "locale": "en_US",
        "probability": 0.6
      },
      {
        "locale": "es_ES",
        "probability": 0.4
      }
    ],
    "expectedLocales": ["en_US"]
  }
}
```

| Parameter | Type | Required? | Description |
| --- | --- | --- | --- |
| `localization` | object | Optional | Parent object containing all localization information. If not specified, we assume `en_US` (US English). |
| `defaultLocale` | string | Required if `localization` specified | The default locale. This value determines the region of the prompt for services that require the region, such as data masking. `defaultLocale` is a fallback value when the provided values for `inputLocales` or `expectedLocales` are unsupported for a particular operation. |
| `inputLocales` | array of objects | Optional | The list of language codes or locales found in the prompt’s text. Each item must contain a `locale` string (with the language or the locale) and an optional `probability` value (from 0 to 1). The probability is an estimate of how frequently you expect that language to appear in the input. |
| `expectedLocales` | array of strings | Optional | The list of language codes or locales that you want the LLM to use when generating the text. |

## Guidelines

-   Always verify that the language and locale are supported in the [Einstein Trust Layer](https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_lang_region.htm).
-   If only one language appears in every prompt for every request, pass this information in the `defaultLocale` value.
-   If a language can appear in the prompt but isn’t always present, pass that language into `inputLocales`.
-   Whenever possible, provide both a language and a locale so that Trust Layer features, such as data masking, are more effective.

## See Also

-   _Salesforce Help_: [Einstein Trust Layer Region Language Support](https://help.salesforce.com/s/articleView?id=sf.generative_ai_trust_lang_region.htm)