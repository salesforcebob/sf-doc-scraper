# Standard Lightning Types

Salesforce provides some Lightning types out of the box that act as the basic types that you can reference to structure a more complex schema.

To understand how a Lightning type is validated, you must identify the underlying type used for each Lightning type.

Each standard Lightning type includes a default editor and renderer, so there’s no need for you to create those components.

Similar to JSON Schema types, each Lightning type has its own type-specific keywords that apply only to that type.

You can use these standard Lightning types.

-   lightning\_\_objectType
-   lightning\_\_booleanType
-   lightning\_\_dateType
-   lightning\_\_dateTimeType
-   lightning\_\_dateTimeStringType
-   lightning\_\_integerType
-   lightning\_\_numberType
-   lightning\_\_richTextType
-   lightning\_\_textType
-   lightning\_\_multilineTextType
-   lightning\_\_urlType

For information about the keywords available and the default editor and renderer associated with each of the Lightning types, see [Lightning Types Reference](/docs/einstein/genai/guide/lightning-types-references.html#lightning-types).

## Lightning Types in Agent Action

Agent actions use standard Lightning types to define the structure, validate, and display of data in Salesforce when an action is triggered.

Here’s how Lightning types are used in the context of agent actions.

-   **Mapping Data Types to Lightning Types**
    
    In Salesforce, Apex classes are often used to handle business logic, such as processing inputs and returning results. For example, consider an agent action called Flight Booking that searches for available flights. When you trigger this agent action, the inputs and outputs from the Apex class are mapped to standard Lightning types. So if an Apex class accepts inputs like dates, strings, and numbers, these data types are mapped to the corresponding standard Lightning types, such as lightning\_\_dateType, lightning\_\_stringType, and lightning\_\_numberType. This mapping ensures that the data is structured correctly.
    
-   **Schema Definition and Validation**
    
    Each standard Lightning type has an associated schema that defines the structure of the data and the rules for its validation, such as maximum length and format.
    
    This schema ensures that the data that you enter to the action conforms to the expected type and format, which helps to avoid errors during execution.
    
    For example, if an action expects you to enter Date data, the schema ensures that you enter only a valid date.
    
-   **Automatic UI Generation**
    
    When you trigger an action, Salesforce automatically generates the appropriate UI components for the action’s inputs and outputs based on the mapped Lightning types. The UI displays relevant input fields, pickers, or tables according to the standard Lightning type.
    
    For example:
    
    -   If an Apex action expects a multiline text input, a multiline text field appears in the UI, based on the standard Lightning type lightning\_\_multilineTextType.
    -   For date fields, a date picker automatically appears in the UI, based on the standard Lightning type lightning\_\_dateType.
-   **Rendering the Data**
    
    The renderer component associated with each Lightning type displays the data when an action is executed.
    
    For example:
    
    -   For an Apex class that returns a list of flights, you can use the standard Lightning type lightning\_\_listType to display the flight data in an appropriate format.
    
    This rendering ensures that the output is displayed in a structured and readable way, whether it’s a list, table, or simple text.
    
-   **Out-of-the-Box Components**
    
    When you use standard Lightning types, Salesforce provides ready-to-use components for input and output with minimal configuration required. These components handle most use cases, offering a seamless experience when working with standard Lightning types in agent actions.
    

## Example: Standard Lightning Types in Agent Action

Here’s how agent actions output is displayed by using standard Lightning types.

**Agent Action: Summarize Record**

This image shows the input and output settings for the 'Summarize Record' agent action, which uses standard Lightning types.

![Input and output settings for the 'Summarize Record' agent action, with standard Lightning types used in the Data Type field for both configurations.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Summerize-Record.png)

Here’s how a record summary appears in the action output.

![A summary of an account shows company details, opportunities, open cases, activities, contacts, and recent purchases.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Summerize-Record-Output.png)

The agent action output has these elements.

1.  Utterance
2.  Agent Response
3.  Agentforce Component (LWC)
4.  Agentforce Action Output/Input Type (Lightning Type)

**Agent Action: Identify Objects By Name**

This image shows the input and output settings for the 'Identify Object By Name' agent action, which uses standard Lightning types.

![Input and output settings for the 'Identify Objects By Name' agent action, with standard Lightning types used in the Data Type field for both configurations.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Identify-Object.png)

Here's how the list of accounts appears in the action output.

![A list displays account names and phone numbers.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Identify-Object-Output.png)

The agent action output has these elements.

1.  Utterance
2.  Agent Response
3.  Agentforce Component (LWC)
4.  Agentforce Action Output/Input Type (Lightning Type)