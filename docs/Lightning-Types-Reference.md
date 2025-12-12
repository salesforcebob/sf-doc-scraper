# Lightning Types Reference

This section describes the keywords available and the default editor and renderer associated with each of the Lightning types.

## lightning\_\_booleanType

The lightning\_\_booleanType Lightning type corresponds to the boolean type in a JSON schema. It produces only two values, true or false.

| lightning\_\_booleanType |  |
| --- | --- |
| Editor Description | When the type receives user input, it appears as a toggle in the UI.  
  
Default editor example:  
![A toggle switch indicating that a Boolean property is active.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Boolean-1.png) |
| Renderer Description | When the type produces output, it’s rendered as a `true` or `false` value.  
  
Default Renderer example:  
![Text displaying the boolean value 'true'.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Boolean-2.png) |

For information about boolean type, see [Understanding JSON Schema: boolean](https://json-schema.org/understanding-json-schema/reference/boolean).

## lightning\_\_dateType

The lightning\_\_dateType Lightning type uses a string type to specify the date data in the format `yyyy-mm-dd`.

| lightning\_\_dateType |  |
| --- | --- |
| Editor Description | When the type receives user input, it appears as a date picker in the UI.  
  
Default editor example:  
![A date picker set to February 21, 2025.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Date-1.png) |
| Renderer Description | When the type produces output, it’s rendered as a `date` data.  
  
Default Renderer example:  
![The date December 25, 2025.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Date-2.png) |

## lightning\_\_dateTimeType

The lightning\_\_dateTimeType Lightning type describes the complex Lightning type lightning\_\_objectType, which contains the `dateTime` and `timeZone` (optional) properties. Use the Lightning\_\_dateTimeType Lightning type to specify date and time together.

Because lightning\_\_dateTimeType is a standard complex Lightning type, the value of the type is represented as an object.

This table shows the properties of the object type that the lightning\_dataTimeType Lightning type describes.

| Property | Required or Optional | Type | Description |
| --- | --- | --- | --- |
| dateTime | Required | String | Specify the date value in `yyyy-MM-dd'T'HH:mm:ss.SSSZ` format. |
| timeZone | Optional | String | Specify the time zone information in IANA time zone database format. |

This example shows an object with valid date and time values.

```text
{
"dateTime": "2012-05-31T01:30:05.000Z",
"timeZone": "Asia/Kolkata"
}
```

| lightning\_\_dateTimeType |  |
| --- | --- |
| Editor Description | When the type receives user input, it appears as a date picker and a time picker in the UI.  
  
Default editor example:  
![A form that displays a date, time, and time zone.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Date-Time-1.png) |
| Renderer Description | When the type produces output, it’s rendered as a `date` and `time` data.  
  
Default Renderer example:  
![A timestamp indicating April 11, 2024, at 8:36 PM.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Date-Time-2.png) |

## lightning\_\_integerType

Use the lightning\_\_integerType Lightning type to specify integers. The type applies to whole numbers. The lightning\_\_integerType Lightning type corresponds to the integer type in a JSON schema.

| lightning\_\_intergerType |  |
| --- | --- |
| Editor Description | When the type receives user input, it appears as a numeric input field in the UI.  
  
Default editor example:  
![An integer field with the value 5 entered.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Integer-1.png) |
| Renderer Description | When the type produces output, it’s rendered as a number display field.  
  
Default Renderer example:  
![A text box displaying an integer value of 5.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Integer-2.png) |

For information about the integer type in JSON Schema, see [Understanding JSON Schema: integer](https://json-schema.org/understanding-json-schema/reference/numeric).

## lightning\_\_multilineTextType

The lightning\_\_multilineTextType Lightning type is similar to Lightning\_\_textType, but it accommodates a larger maximum character length and an editor for larger text input. The lightning\_\_multilineTextType Lightning type corresponds to the string type in a JSON schema.

| lightning\_\_multilineTextType |  |
| --- | --- |
| Editor Description | When the type receives user input, it appears as a multiline text input field on the UI.  
  
Default editor example:  
![A multiline text field with sample text entered.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/MultiLineText-1.png) |
| Renderer Description | When the type produces output, it’s rendered as a multiline text display field. |

For information about string types in JSON Schema, see [Understanding JSON Schema: string](https://json-schema.org/understanding-json-schema/reference/string).

## lightning\_\_numberType

Use the lightning\_\_numberType Lightning type to specify numbers. This type is validated as a decimal number, also known as a float in some programming languages. The lightning\_\_numberType Lightning type corresponds to the number type in a JSON schema.

| lightning\_\_numberType |  |
| --- | --- |
| Editor Description | When the type receives user input, it appears as a decimal number input field in the UI.  
  
Default editor example:  
![A decimal number field with the value 1.32 entered.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Number-1.png) |
| Renderer Description | When the type produces output, it’s rendered as a decimal number display field.  
  
Default Renderer example:  
![A text box displaying a decimal number value of 15.15.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Number-2.png) |

For information about number type in JSON Schema, see [Understanding JSON Schema: number](https://json-schema.org/understanding-json-schema/reference/numeric).

## lightning\_\_objectType

Use the lightning\_\_objectType lightning type to create object lightning types. This complex Lightning type can contain sub-properties, each with its own Lightning type.

With lightning\_\_objectType, you can group other lightning types. The lightning\_\_objectType lightning type corresponds to the object type defined in a JSON schema.

For information about object types in JSON Schema, see [Understanding JSON Schema: object](https://json-schema.org/understanding-json-schema/reference/object).

## lightning\_\_richTextType

Use the lightning\_\_richTextType Lightning type to add, edit, and delete rich text data. You can enter input text data of up to 100,000 characters.

| lightning\_\_richTextType |  |
| --- | --- |
| Editor Description | When the type receives user input, it appears as a rich text input field in the UI.  
  
Default editor example:  
![A rich text editor with formatting options and a sample text box.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/RichText-1.png) |
| Renderer Description | When the type produces output, it’s rendered as a rich text display field. |

For information about rich text editor, see [Rich Text Editor](https://help.salesforce.com/s/articleView?id=platform.fields_using_html_editor.htm&type=5).

## lightning\_\_textType

Use the lightning\_\_textType Lightning type for text fields, such as titles and descriptions. You can enter input text data of up to 255 characters. The lightning\_\_textType Lightning type corresponds to the string type in a JSON schema.

| lightning\_\_textType |  |
| --- | --- |
| Editor Description | When the type receives user input, it appears as a text input field on the UI.  
  
Default editor example:  
![A text field with sample text entered.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Text-1.png) |
| Renderer Description | When the type produces output, it’s rendered as a text display field.  
  
Default Renderer example:  
![A text box displaying sample text.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Text-2.png) |

## lightning\_\_urlType

Use the lightning\_\_urlType Lightning type for URL values. To specify the url schemes that the type can validate against, configure `lightning:allowedUrlSchemes` parameter of the Lightning type.

| lightning\_\_urlType |  |
| --- | --- |
| Editor Description | When the type receives user input, it appears as a URL input field in the UI.  
  
Default editor example:  
![A field with a sample URL entered.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/URL-1.png) |
| Renderer Description | When the type produces output, it’s rendered as a hyperlink. |