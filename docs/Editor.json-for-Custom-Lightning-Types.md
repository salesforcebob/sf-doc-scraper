# Editor.json for Custom Lightning Types

An optional file that you can configure for a custom Lightning type that you create. With this file, you can customize how user input is collected by defining the input component.

## Editor Override

You can define a single editor for your entire custom Lightning type.

Let’s say that you have a custom Lightning type named `flightFilter` with a `schema.json` file. For information about how to create custom lightning types, see [LightningTypeBundle Metadata API](/docs/einstein/genai/guide/lightning-types-custom.html#lightningtypebundle-metadata-type).

You configure `editor.json` to define an editor for your entire custom Lightning type. As a result, the same editor applies whenever you use the instance of this type as input.

Here’s an example of what the `editor.json` file can look like for the custom Lightning type `flightFilter`.

```text
+--lightningTypes
        +--flightFilter
            +--schema.json
            +--lightningDesktopGenAi
               +--editor.json
```

### Example

To illustrate the concept, this example uses the [Apex Class](/docs/einstein/genai/guide/lightning-types-example-full-editor-renderer.html#example-apex-class-for-retrieving-flight-information).

The `Filter` class contains two fields: `price` and `discountPercentage`.

By default, individual out-of-the-box editors are displayed to collect user input. This example uses `c/myFilterComponent` in an editor to collect user input that's related to the flight search filter criteria.

For example, you use a slider to select a value for `Discount Percentage`, and you apply minimum and maximum limits for `Price`.

Let’s create a custom LWC component, `myFilterComponent`, that contains the fields `price` and `discountPercentage`. For information about how to create Lightning web components, see [Create Lightning Web Components](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-introduction.html).

Here’s a sample code that shows the LWC component `myFilterComponent`.

```js
import { LightningElement } from 'lwc';
export default class MyFilterComponent extends LightningElement {
    @api value;
    // value contains properties mentioned in schema/Apex class
    // Ex: {price: 0, discountPercentage: 0}
   …
   …
}
```

This sample code shows the contents of the `myFilterComponent.js-meta.xml` file.

```xml


    64.0
    true
    My Filter Component
    
      lightning__AgentforceInput
    

```

Reference the LWC component `myFilterComponent` in the `editor.json` file.

Here’s how to reference the LWC component `myFilterComponent` to override the editor for the `Filter` input in the `editor.json` file.

```json
{
  "editor": {
    "componentOverrides": {
      "$": {
        "definition": "c/myFilterComponent"
      }
    }
  }
}
```

> **Note:**
> 
> To specify editor override, use the “$” keyword in your `editor.json` file.

**See Also**

-   [lightning\_\_AgentforceInput Target](https://developer.salesforce.com/docs/platform/lwc/guide/targets-lightning-agentforce-input.html)

## LWC Attribute Mapping

Let’s say that you built the LWC component `myExistingFilterComponent` that contains the fields with the names `cost` and `discountPercentage`.

```js
import { LightningElement } from 'lwc';
export default class MyExistingFilterComponent extends LightningElement {
    @api
    cost = 0;
    @api
    discountPercentage = 0;
   …
   …
}
```

This sample code shows the contents of the `myExistingFilterComponent.js-meta.xml` file.

```xml


    64.0
    true
    My Existing Filter Component
    
      lightning__AgentforceInput
    
    
      
        
        
      
    

```

You decide to reuse the `myExistingFilterComponent` instead of creating a new one, `myFilterComponent`, with field names `price` and `discountPercentage`. However, the field name `price` in the [Flight Class](/docs/einstein/genai/guide/lightning-types-example-full-editor-renderer.html#example-apex-class-for-retrieving-flight-information) doesn’t match the field name `cost` in `myExistingFilterComponent`.

To map the fields from `Flight` class to the corresponding fields in the LWC component `myExistingFilterComponent`, use attribute mapping.

Here’s a sample code that shows how to reference `myExistingFilterComponent` to override the editor for the `Filter` input in the `editor.json` file with attribute mapping.

```json
{
  "editor": {
    "componentOverrides": {
      "$": {
        "definition": "c/myExistingFilterComponent"
        "attributes": {
          "cost": "{!$attrs.price}",
          "discountPercentage": "{!$attrs.discountPercentage}"
        }
      }
    }
  }
}
```

> **Note:**
> 
> You must map the fields in the LWC component to the corresponding fields in the Apex class, even if they have the same name. However, individual attribute mapping isn’t necessary if the component receives the entire Apex class object through a single “value” attribute.

The expression `"cost": "{!$attrs.price}"` indicates:

-   `cost`: Field in the LWC component `myExistingFilterComponent`
-   `{!$attrs}`: Pointer to the `Filter` class
-   `price`: Field in the `Filter` class
-   `{!$attrs.price}`: Links the price field of the `Filter` Apex class to the cost field of the LWC component `myExistingFilterComponent` and vice versa.