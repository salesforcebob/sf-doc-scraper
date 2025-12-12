# Custom Lightning Types

Create custom Lightning types to customize the appearance of the UI for Agentforce Service agent via [Enhanced Chat v2](https://help.salesforce.com/s/articleView?id=service.enhanced_chat_v2_intro.htm&type=5) and Agentforce Employee agent in Lightning Experience. With custom Lightning types, you override the default user interface to manage complex interactions within Salesforce.

> **Note:**
> 
> You can only override the default UI with a custom Lightning type for agent actions that use Apex classes as input or output.

To create custom lightning types in Salesforce, use the LightningTypeBundle metadata component. For information about how to create custom Lightning types, see [LightningTypeBundle Metadata API](#lightningtypebundle-metadata-type).

Benefits:

-   **Enhanced UI Customization**
    
    Standard Lightning types have predefined UI components. However, they don’t always fit your design needs or the user experience. Custom Lightning types give you full control over the UI. You can create tailored components that match your specific styling and behavior requirements. This customization ensures that the interface looks and functions exactly as you need for your application.
    
-   **Handling Complex Data Structures**
    
    Standard Lightning types sometimes can’t handle complex data, but custom Lightning types can manage and render complex data structures. For example, they can handle deeply nested objects, complex arrays, and dynamic fields that change based on user input. With custom Lightning types, you can build UIs that display complex data smoothly. Customize your UI to handle complex data structures, and you ensure that your Salesforce actions can accommodate even the most detailed and dynamic workflows.
    

## UI Comparison: Before and After

These screenshots demonstrate the improvements in the agent action output UI achieved through custom Lightning types.

| The default UI for output in an agent action | The customized UI for output in an agent action |
| --- | --- |
| ![Agent's response to a flight details request, with no labels, a cluttered and unappealing layout, and no "Book Now" button.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/UI-Comparision-Output1.png) | ![Agent's response to a flight details request, featuring clear labels, an appealing layout, a highlighted discount, and a prominent "Book Now" button.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/UI-Comparision-Output2.png) |

## LightningTypeBundle Metadata Type

The LightningTypeBundle metadata type describes the custom Lightning types. It’s available in API version 64.0 and later.

To get a list of the custom and standard Lightning types deployed in your org, make a call to the `connect/lightning-types` resource.

For more information about the resources available in the Type System Connect REST API, see the [Type System Resources](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/connect_resources_type_system_resources.htm).

## Understand the LightningTypeBundle Structure

LightningTypeBundle components are stored in the lightningTypes folder.

Here’s an example of the LightningTypeBundle structure.

```text
+--myMetadataPackage
    +--lightningTypes (1)
        +--TypeName (2)
           +--schema.json (3)
           +--lightningDesktopGenAi (4)
              +--editor.json (5) OR +--renderer.json (6)
```

The bundle includes these resources.

-   The `lightningTypes` folder (1) contains a folder for each custom Lightning type created in the format `TypeName` (2).
-   Each custom Lightning type folder contains a [`schema.json`](/docs/einstein/genai/guide/lightning-types-custom-schema.html) file (3) that defines the JSON schema that drives the custom Lightning type validation.
-   If applicable, the custom Lightning type folder also contains a `lightningDesktopGenAi` folder (4) with two files that indicate the optional artifacts needed for the `lightningDesktopGenAi` channel. Configure these files to override the default UI of a custom Lightning type when it’s used in an agent action.
    -   The [`editor.json`](/docs/einstein/genai/guide/lightning-types-custom-editor.html) file (5) has custom user interface and editor information.
    -   The [`renderer.json`](/docs/einstein/genai/guide/lightning-types-custom-renderer.html) file (6) has custom user interface and renderer information.

### Use SF Commands or Metadata API to Deploy LightningTypeBundles

To deploy a LightningTypeBundle to your Salesforce org, use Metadata API or SF Commands. The Metadata API uses a manifest file that defines the metadata that you want to deploy.

Here’s an example `package.xml` manifest file for a LightningTypeBundle that includes the custom Lightning type `myFlight`.

```xml


    
        myFlight
        LightningTypeBundle
    
    64.0

```

To delete a custom Lightning type, you must deploy a destructiveChanges package to your org that lists the types to delete.

**See Also**

-   _Metadata API Developer Guide_: [Deploying and Retrieving Metadata with the Zip File](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/file_based_zip_file.htm)
-   _Metadata API Developer Guide_: [Deleting Components from an Organization](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_deploy_deleting_files.htm)

### SF Commands and Packaging Support

Retrieve, deploy, and track source control for the LightningTypeBundle metadata type by using SF commands. See [source Commands](https://developer.salesforce.com/docs/atlas.en-us.236.0.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_force_source.htm).

Packaging supports the LightningTypeBundle metadata type that describes custom Lightning types. You can include the LightningTypeBundle in first-generation (1GP) and second-generation (2GP) packages. See the [First-Generation Managed Packaging Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.pkg1_dev.meta/pkg1_dev/first_gen_packageable_components.htm#mdc_lightning_types) and the [Second-Generation Managed Packaging Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.pkg2_dev.meta/pkg2_dev/packaging_packageable_components.htm#mdc_lightning_types).

**See Also**

-   [Metadata Coverage Report](https://developer.salesforce.com/docs/metadata-coverage/64)
-   [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_top.htm)
-   [Use Managed Packages to Develop Your AppExchange Solution](https://developer.salesforce.com/docs/atlas.en-us.packagingGuide.meta/packagingGuide/managed_packaging_intro.htm)

## Lightning Type Configuration Files

For details on each configuration file type, review these topics.

-   [Schema.json](/docs/einstein/genai/guide/lightning-types-custom-schema.html)
-   [Editor.json](/docs/einstein/genai/guide/lightning-types-custom-editor.html)
-   [Renderer.json](/docs/einstein/genai/guide/lightning-types-custom-renderer.html)

## Understand Namespace Prefixes for Metadata References

When you reference metadata such as a custom label or a component in your custom Lightning type, use the correct namespace prefix. This prefix applies to metadata references in your schema, editor, and renderer files.

**For metadata created in your org**

Use the “c” namespace prefix. This rule applies even if your org has its own namespace. For example, if your org’s namespace is `myOrgNamespace` and you create an LWC component named `flightDetails`, refer to it as `c/flightDetails`.

> **Note:**
> 
> This rule also applies to custom Lightning types in managed packages. Reference any new metadata in the same package by using the “c” prefix.

**For metadata installed via a managed package**

Use the package’s unique namespace as the prefix. For example, if a package has the namespace `isv` and includes an LWC component named `flightDetails`, refer to it as `isv/flightDetails`.

**Example of Local Org Metadata References**

This `schema.json` file uses the “c” namespace to reference a custom label and the `@apexClassType` reference of an Apex class.

```json
{
  "title": "{!$Label.c.FlightTitle}",
  "description": "My Flight Response",
  "lightning:type": "@apexClassType/c__AvailableFlight"
}
```

This `renderer.json` file uses the “c” namespace to reference a Lightning Web Component.

```json
{
  "renderer": {
    "componentOverrides": {
      "$": {
        "definition": "c/flightDetails"
      }
    }
  }
}
```