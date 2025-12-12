# Renderer.json for Custom Lightning Types

An optional file that you can configure for a custom Lightning type that you create. With this file you can customize how data is presented to the user by defining the output component.

## Renderer Override

You can define a single renderer for your entire custom Lightning type.

Let’s say that you have a custom Lightning type named `flightFilter` with the `schema.json` file. For information about how to create custom Lightning types, see [LightningTypeBundle Metadata API](/docs/einstein/genai/guide/lightning-types-custom.html#lightningtypebundle-metadata-type).

You configure `renderer.json` to define a renderer for your entire custom Lightning type. As a result, the same renderer applies whenever you use the instance of this type as output.

Here’s an example of what the `renderer.json` file can look like for the custom Lightning type `flightFilter`.

```text
+--lightningTypes
        +--flightFilter
            +--schema.json
            +--lightningDesktopGenAi
               +--renderer.json
```

### Example

To illustrate the concept, this example uses the [Apex Class](/docs/einstein/genai/guide/lightning-types-example-full-editor-renderer.html#example-apex-class-for-retrieving-flight-information).

The `Filter` class contains two fields: `price` and `discountPercentage`.

By default, individual out-of-the-box renderers are displayed as output to the user. This example uses `c/myFilterRenderer` in a renderer to display flight details.

Color coding can help represent discount percentages based on their values. For example, the higher the percentage, the more prominent the color used to display the discount.

Let’s create a custom LWC component, `myFilterRenderer`, that contains the fields `price` and `discountPercentage`. For information about how to create Lightning web components, see [Create Lightning Web Components](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-introduction.html).

Here’s a sample code that shows the LWC component `myFilterRenderer`.

```js
import { LightningElement } from 'lwc';
export default class MyFilterRenderer extends LightningElement {
    @api value;
    // value contains properties mentioned in schema/Apex class
    // Ex: {price: 0, discountPercentage: 0}
   …
   …
}
```

This sample code shows the contents of the `myFilterRenderer.js-meta.xml` file.

```xml


    64.0
    true
    My Filter Renderer
    
      lightning__AgentforceOutput
    

```

Reference the LWC component `myFilterRenderer` in the `renderer.json` file.

Here’s how to reference the LWC component `myFilterRenderer` to override the renderer for the `Filter` output in the `renderer.json` file.

```json
{
  "renderer": {
    "componentOverrides": {
      "$": {
        "definition": "c/myFilterRenderer"
      }
    }
  }
}
```

> **Note:**
> 
> To specify renderer override, use the “$” keyword in your `renderer.json` file.

**See Also**

-   [lightning\_\_AgentforceOutput Target](https://developer.salesforce.com/docs/platform/lwc/guide/targets-lightning-agentforce-output.html)

## LWC Attribute Mapping

Let’s say that you built the LWC component `myExistingFilterRenderer` that contains fields with the names `cost` and `discountPercentage`.

```js
import { LightningElement } from 'lwc';
export default class MyExistingFilterRenderer extends LightningElement {
    @api
    cost = 0;
    @api
    discountPercentage = 0;
   …
   …
}
```

This sample code shows the contents of the `myExistingFilterRenderer.js-meta.xml` file.

```xml


    64.0
    true
    My Existing Filter Renderer
    
      lightning__AgentforceOutput
    
    
      
        
        
      
    

```

You decide to reuse the `myExistingFilterRenderer` component instead of creating a new one, `myFilterRenderer`, with field names `price` and `discountPercentage`. However, the field name `price` in the [Flight Class](/docs/einstein/genai/guide/lightning-types-example-full-editor-renderer.html#example-apex-class-for-retrieving-flight-information) doesn’t match the field name `cost` in `myExistingFilterRenderer`.

To map the fields from `Flight` class to the corresponding fields in the LWC component `myExistingFilterRenderer`, use attribute mapping.

Here’s a sample code that shows how to reference the LWC component `myExistingFilterRenderer` to override the renderer for the `Filter` output in the `renderer.json` file with attribute mapping.

```json
{
  "renderer": {
    "componentOverrides": {
      "$": {
        "definition": "c/myExistingFilterRenderer"
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

-   `cost`: Field in the LWC component `myExtistingFilterRenderer`
-   `{!$attrs}`: Pointer to the `Filter` class
-   `price`: Field in the `Filter` class
-   `{!$attrs.price}`: Links the price field of the `Filter` Apex class to the cost field of the LWC component `myExtistingFilterRenderer` and vice versa

## Collection Renderer Override

You can define a renderer for your structure list of data using the collection construct within the renderer configuration. This approach allows you to associate a custom Lightning Web Component (LWC) for rendering structured lists of data.

Let’s say that you have a custom Lightning type named `hotelResponse` with the `schema.json` file. For information about how to create custom Lightning types, see [LightningTypeBundle Metadata API](/docs/einstein/genai/guide/lightning-types-custom.html#lightningtypebundle-metadata-type).

You configure `renderer.json` for rendering the entire list of hotel data.

Here’s an example of what the `renderer.json` file can look like for the custom Lightning type `hotelResponse`.

```text
+--lightningTypes
        +--hotelResponse
            +--schema.json
            +--lightningDesktopGenAi
               +--renderer.json
```

### Example

To illustrate the concept, this example uses the [Apex Class](/docs/einstein/genai/guide/lightning-types-example-collection-renderer.html#example-apex-class-for-retrieving-hotel-information).

By default, individual out-of-the-box renderers are used to display the list of hotel data. This example uses `c/hotelDetails` in a collection renderer to display the list of hotel data.

For example, [to display a list of hotels](/docs/einstein/genai/guide/lightning-types-example-collection-renderer.html).

Let’s create a custom LWC component, `hotelDetails`, that contains the field value. For information about how to create Lightning web components, see [Create Lightning Web Components](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-introduction.html).

Here’s a sample code that shows the LWC component `hotelDetails`.

```js
import { LightningElement, api } from "lwc";
export default class HotelDetails extends LightningElement {
  @api value;
}
```

Reference this component in the `renderer.json` file.

Here’s how to reference the LWC component `hotelDetails` to override the renderer for the `Hotel` output in the `renderer.json` file.

```json
{
  "collection": {
    "renderer": {
      "componentOverrides": {
        "$": {
          "definition": "c/hotelDetails"
        }
      }
    }
  }
}
```

**See Also**

-   [lightning\_\_AgentforceOutput Target](https://developer.salesforce.com/docs/platform/lwc/guide/targets-lightning-agentforce-output.html)