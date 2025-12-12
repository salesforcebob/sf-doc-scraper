# Introduction to Lightning Types

Lightning Types are JSON-based data types to structure, validate, and display data for the Agentforce Service agent via [Enhanced Chat v2](https://help.salesforce.com/s/articleView?id=service.enhanced_chat_v2_intro.htm&type=5) and Agentforce Employee agent in Lightning Experience.

With Lightning Types, you can manage the representation and shape of data types. You can use Lightning types to create consistent and flexible data interactions in Lightning Experience.

Salesforce provides standard Lightning types, such as [text](/docs/einstein/genai/guide/lightning-types-references.html#lightning__texttype) and [multiline](/docs/einstein/genai/guide/lightning-types-references.html#lightning__multilinetexttype) text, to structure your data type. Additionally, you can create Lightning types to customize the UI experience for Agentforce Service agent via Enhanced Chat v2 and Agentforce Employee agent in Lightning Experience based on your business requirements.

> **Note:**
> 
> Custom Lightning types aren’t supported in the Salesforce mobile app.

## Building Blocks of a Lightning Type

Lightning Type consists of these artifacts.

1.  **Schema** defines the structure of data and the rules for its validation, such as maximum length, type, and format.
2.  **Editor** defines the input UI component that you use to enter or edit data.
3.  **Renderer** defines the output UI component that displays data.

## Supported Data Types in Lightning Types

Not all data types that you use in an Apex class are supported in Lightning types.

Lightning types support these data types.

-   Primitives, including Integer, Double, Long, Date, Datetime, Time, String, ID, and Boolean
-   sObjects, either a generic or specific sObject, such as Account, Contact, and MyCustomObject\_\_c
-   Collections
    -   A list or array of primitives, sObjects, user-defined Apex classes, and collections
    -   A map, represented as `Map<key, value>`, where the key is always a string and the value can be a primitive, sObject, or collection
-   User-defined Apex classes