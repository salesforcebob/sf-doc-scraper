# Schema.json for Custom Lightning Types

The `schema.json` file uses the JSON Schema Specification to define your custom Lightning type. The schema consists of a specific set of keywords that apply constraints to the data.

This table describes the keywords that you can specify in a `schema.json` file.

| Keyword | Required or Optional | Type | Description |
| --- | --- | --- | --- |
| `title` | Required | String | Name for the Lightning type |
| `description` | Optional | String | Description for the Lightning type |
| `lightning:type` | Required | String | Refers to `@apexClassType` types by using fully qualified names.  
  
This keyword is syntactic sugar for the `$ref` keyword in JSON Schema, which links together schemas.  
  
For information about `$ref`, see [Understanding JSON Schema: The Sref keyword](https://json-schema.org/understanding-json-schema/structuring?highlight=ref#ref) |

Unless noted otherwise, the keywords follow the JSON Schema specification.

Here’s a sample code that shows the contents of the `schema.json` file for a custom Lightning type `flightResponse`.

```json
{
  "title": "My Flight Response",
  "description": "My Flight Response",
  "lightning:type": "@apexClassType/c__AvailableFlight"
}
```

## Create Custom Labels for Custom Lightning Types

You can customize labels for the title and description values in the `schema.json` file for a custom Lightning type.

To create and use a translated custom label in a custom Lightning type, complete these steps.

1.  From Setup, enter `Labels` in the Quick Find box, and then select **Custom Labels**.
2.  Create a custom label.
3.  In the `schema.json` file for the custom Lightning type that you created, use the expression `{!$Label.c.MyLabel1}` for the title and description values. Here, “c” is the namespace prefix and “MyLabel1” is the API name of the custom label.

**See Also**

-   [Create and Edit Custom Labels](https://help.salesforce.com/s/articleView?id=platform.cl_edit.htm&type=5)
-   [Translate Custom Labels](https://help.salesforce.com/s/articleView?id=platform.cl_translate_edit.htm&type=5)