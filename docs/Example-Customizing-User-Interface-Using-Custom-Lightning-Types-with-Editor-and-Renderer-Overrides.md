# Example: Customizing User Interface Using Custom Lightning Types with Editor and Renderer Overrides

This example explains how to override the default user interface to create a customized appearance of responses on the custom agent’s action input and output with custom Lightning types.

In this example, you specify an editor override and a renderer override for the custom Lightning type that you created.

## Before You Begin

Download these sample data files.

-   [apexClass.zip](https://resources.docs.salesforce.com/rel1/doc/en-us/static/misc/apexClassExample.zip)
-   [flightResponseCLTandLWC.zip](https://resources.docs.salesforce.com/rel1/doc/en-us/static/misc/flightResponseCLTAndLWCExample.zip)
-   [flightFiltersCLTandLWC.zip](https://resources.docs.salesforce.com/rel1/doc/en-us/static/misc/flightFilterCLTAndLWCExample.zip)

## Example Apex Class for Retrieving Flight Information

Use these Apex classes together to create a custom agent action that finds flights. The main `FlightAgent` class contains the invocable method, and the other classes define the complex data structures for the request and response.

When you create your custom agent action, select the method **Find Flights**.

**FlightAgent Class**

This class is the main class that contains the logic for the `Find Flights` agent action. It also defines the `FlightRequest` and `FlightResponse` inner classes to handle the action's input and output.

```apex
global class FlightAgent {

    @InvocableMethod(label='Find Flights' description='Finds available flights')
    global static List findFlights(List req) {
        List flightResponses = new List();

        // For example, we hardcode the data and don’t focus on how we retrieve it.
        // However, consider that we receive available flight data from a service
        // and then iterate through the data to generate the final response.

        List flights = new List();
        Flight f1 = new Flight('IX 2814', 1, false, 1000l, 20.20d, 70);
        Flight f2 = new Flight('6E 488', 2, false, 2000l, 15.15d, 120);
        Flight f3 = new Flight('6E 523', 1, false, 3000l, 13.14d, 75);
        Flight f4 = new Flight('6E 6166', 2, false, 4000l, 14.14d, 130);
        flights.add(f1);  flights.add(f2); flights.add(f3); flights.add(f4);
        AvailableFlight availableFlights = new AvailableFlight();
        availableFlights.flights = flights;

        FlightResponse fr = new FlightResponse();
        fr.aFlight = availableFlights;
        flightResponses.add(fr);

        return flightResponses;
    }

    @JsonAccess(serializable='always' deserializable='always')
    global class FlightRequest {

        @InvocableVariable
        global String originCity;

        @InvocableVariable
        global String destinationCity;

        @InvocableVariable
        global Date dateOfTravel;

        @InvocableVariable
        global FlightRequestFilter filters;
    }

    @JsonAccess(serializable='always' deserializable='always')
    global class FlightResponse {

        @InvocableVariable
        global AvailableFlight aFlight;
    }
}
```

**AvailableFlight Class**

This class defines a list that holds multiple Flight objects.

```apex
@JsonAccess(serializable='always' deserializable='always')
global class AvailableFlight {

    @AuraEnabled
    global List flights;
}
```

**Flight Class**

This class defines the data structure for flight details.

```apex
@JsonAccess(serializable='always' deserializable='always')
global class Flight {

    @AuraEnabled
    global String flightId;

    @AuraEnabled
    global Integer numLayovers;

    @AuraEnabled
    global Boolean isPetAllowed;

    @AuraEnabled
    global Long price;

    @AuraEnabled
    global Double discountPercentage;

    @AuraEnabled
    global Integer durationInMin;

    global Flight(String flightId, Integer numLayovers, Boolean isPetAllowed,
                  Long price, Double discountPercentage, Integer durationInMin) {
        this.flightId = flightId;
        this.numLayovers = numLayovers;
        this.isPetAllowed = isPetAllowed;
        this.price = price;
        this.discountPercentage = discountPercentage;
        this.durationInMin = durationInMin;
     }
}
```

**FlightRequestFilter**

This class defines the data structure for the optional filters a user can apply when searching for flights.

```apex
@JsonAccess(serializable='always' deserializable='always')
global class FlightRequestFilter {

    @AuraEnabled
    global Long price;

    @AuraEnabled
    global Double discountPercentage;
}
```

The Apex class `FlightAgent` accepts the flight search criteria, including the origin city, destination city, and date of travel, and then returns a list of available flights.

> **Note:**
> 
> For this example, flight availability data is already included in the `FlightAgent` Apex class. However, in a real-time scenario, flight information is fetched from an external service, and the Apex class processes that data to generate the final response.

## Create Agent Action by Using Apex Class

For information about how to create a custom action by using Apex class, see [Create a Custom Agent Action](https://developer.salesforce.com/agentforce-workshop/agents/4-apex-actions).

Inputs and outputs for the agent action are defined by using standard Lightning types and Apex classes.

Input:

-   `dateOfTravel`, `destinationCity`, and `originCity` use standard Lightning types such as lightning\_\_dateType and lightning\_\_textType.
-   The `filters` input is a complex type that references an Apex class.

Output:

-   The output `aFlight` for the agent action is a complex type that references an Apex class.

Here’s an image that shows the custom agent action created.

![Input and output settings for a 'Find Flights' agent action. Inputs: dateOfTravel, destinationCity, filters, originCity. Output: aFlight.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example1-Agent-Action.png)

The available flight information is retrieved by using `@apexClassType/c__AvailableFlight` in the agent action output, where:

-   `apexClassType` is the bundle name.
-   `AvailableFlight` is the Apex class.

When you execute this agent action, it prompts you to provide input and then generates the output.

## Agent Action Execution Input

The agent’s action UI collects these details to find available flights.

-   Origin city
-   Destination city
-   Date of travel

Here’s the image that shows how the custom agent action input appears in an agent conversation.

![Agent's response to collect flight details. The response lacks filter details for price and discount percentage, making it difficult to filter flight data.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example1-Input-Action.png)

## Agent Action Execution Output

The agent’s action UI returns the available flight details.

Here’s the image that shows how the custom agent action’s output appears in an agent conversation.

![Agent's response to a flight details request. The response lacks labels and is presented in a format that is hard to understand.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example-Execution-Output.png)

## Result Data

The agent displays the flight data in the response.

Here’s the sample code that shows the available flight data.

```json
{
  "aFlight": {
    "flights": [
      {
        "price": 1000,
        "numLayovers": 1,
        "isPetAllowed": false,
        "flightId": "IX 2814",
        "durationInMin": 70,
        "discountPercentage": 20.2,
        "departureTime": "08:30"
      },
      {
        "price": 2000,
        "numLayovers": 2,
        "isPetAllowed": true,
        "flightId": "6E 488",
        "durationInMin": 120,
        "discountPercentage": 15.15,
        "departureTime": "09.00"
      }
    ]
  }
}
```

## Customize UI for Output

Create a custom Lightning type named `flightResponse` to enhance the visibility of the information in the output UI.

### Override Default UI for Output With Custom Lightning Types

Override the agent’s action UI for output to enhance the user experience by using Custom Lightning Types (CLTs). With CLTs, you can add your own Lightning Web Components (LWC) to present data in a more structured and intuitive format.

Configure the `renderer.json` file to override the default UI of a custom Lightning type in the agent action.

Here’s an example showing a lightningTypes folder for a custom Lightning type named `flightResponse`.

```text
+--lightningTypes
        +--flightResponse
            +--schema.json
            +--lightningDesktopGenAi
               +--renderer.json

```

The custom Lightning type `flightResponse` includes a `schema.json` file and a `renderer.json` file. The `renderer.json` file controls how the data is displayed to the user in the agent action output.

This sample code shows the contents of the `schema.json` file.

```json
{
  "title": "My Flight Response",
  "description": "My Flight Response",
  "lightning:type": "@apexClassType/c__AvailableFlight"
}
```

This sample code shows the contents of the `renderer.json` file.

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

**See Also**

-   _Metadata API Developer Guide_: [LightningTypeBundle](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_lightningtypebundle.htm)

### Build Output Components with Lightning Web Components

This section explains how the components are created and deployed for agent action output.

This image shows the Lightning Web Component (LWC) folder structure.

![The lwc folder contains a folder named flightDetails, which is the LWC component. The flightDetails folder includes CSS, HTML, JS, and metadata files.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example1-Output-LWC.png)

The LWC component includes HTML markup designed to represent the data that the agent returns for `@apexClassType/c__AvailableFlight`. This HTML markup ensures that the data is displayed in an intuitive and customized format.

This sample code shows the contents of the `flightDetails.js-meta.xml` file.

```xml


    64.0
    true
    Flight LWC
    
      lightning__AgentforceOutput
    
    
      
        
      
    

```

> **Note:**
> 
> When you create an LWC component to override the UI for action input, use lightning\_\_AgentforceInput as the target. For output, use lightning\_\_AgentforceOutput. For information about LWC target types, see [lightning\_\_AgentforceInput](https://developer.salesforce.com/docs/platform/lwc/guide/targets-lightning-agentforce-input.html) and [lightning\_\_AgentforceOutput](https://developer.salesforce.com/docs/platform/lwc/guide/targets-lightning-agentforce-output.html).

This sample code shows the contents of the `flightDetails.html` file.

This sample code shows the contents of the `flightDetails.js` file.

```javascript
import { LightningElement, api } from "lwc";

export default class FlightDetails extends LightningElement {
  @api value;
  flightData = [];

  // Method to convert duration from minutes to hours and minutes
  formattedDuration(durationInMin) {
    if (durationInMin) {
      const hours = Math.floor(durationInMin / 60); // Get whole hours
      const minutes = durationInMin % 60; // Get remaining minutes
      return `${hours} hr ${minutes} min`;
    }
    return;
  }

  // Method to calculate arrival time based on departure time and duration
  arrivalTime(durationInMin) {
    const hours = 7,
      minutes = 0;
    const departureDate = new Date(2025, 0, 1, hours, minutes); // Sample date for calculation

    const arrivalDate = new Date(departureDate.getTime() + durationInMin * 60000); // Add duration to departure time

    const arrivalHours = String(arrivalDate.getHours()).padStart(2, "0");
    const arrivalMinutes = String(arrivalDate.getMinutes()).padStart(2, "0");

    return `${arrivalHours}:${arrivalMinutes}`;
  }

  connectedCallback() {
    const flights = this.value?.flights || [];
    this.flightData = flights.map((flight) => ({
      ...flight,
      petAllowedStatus: flight.isPetAllowed ? "Yes" : "No",
      durationInHr: this.formattedDuration(flight.durationInMin),
      departureTime: "07:00",
      arrivalInHr: this.arrivalTime(flight.durationInMin),
    }));
  }
}
```

**See Also**

-   _Lightning Web Components Developer Guide_: [Get Started with Lightning Web Components](https://developer.salesforce.com/docs/platform/lwc/guide)

### Integrate Custom Lightning Type into Agent Action Output

To add a custom Lightning type to the agent action, complete these steps.

1.  Open the agent action.
2.  Edit the `Output Rendering` parameter of the agent action output for `aFlight`.
3.  Select the custom lightning type `flightResponse`.
4.  Save the agent action.

The Unsupported Data Type message appears in the `Map to Variable` parameter. You see this message when you refer to types such as `@apexClassType` and custom Lightning types in an agent action’s `Output Rendering` parameter. This message doesn’t affect your saved work and can be safely ignored.

This image shows the custom Lightning type that you created.

![The agent action output settings with 'flightResponse' selected in the Output Rendering field.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example1-FlightResponse-Output.png)

### Customized Output UI

Before executing the agent action that you modified, reload the agent page. The agent prompts you to provide input and then generate the output. The output provides a new UI experience.

This image shows how the custom agent action’s output appears in an agent conversation.

![Agent's response to a flight details request. The response includes clear labels and is presented in a format that is easy to understand.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example-Final-Output.png)

## Customize UI for Input

Create a custom Lightning type named `flightFilter` to show filters in the input UI that suits your business needs.

### Override Default UI for Input with Custom Lightning Types

Override the agent’s action UI for input to enhance the user experience by using Custom Lightning Types (CLTs). With CLTs, you can add your own Lightning Web Components (LWC) to present data in a more structured and intuitive format

Configure the `editor.json` file to override the default UI of a custom Lightning type in the agent action.

Here’s an example that shows a lightningTypes folder for a custom Lightning type named `flightFilter`.

```text
+--lightningTypes
        +--flightFilter
            +--schema.json
            +--lightningDesktopGenAi
               +--editor.json
```

The custom Lightning type `flightFilter` includes a `schema.json` file and an `editor.json` file. The `editor.json` file controls how the data is displayed to the user in the agent action input.

This sample code shows the contents of the `schema.json` file.

```json
{
  "title": "Flight Filter",
  "description": "Flight Filter",
  "lightning:type": "@apexClassType/c__FlightRequestFilter"
}
```

This sample code shows the contents of the `editor.json` file.

```json
{
  "editor": {
    "componentOverrides": {
      "$": {
        "definition": "c/flightRequestFilter"
      }
    }
  }
}
```

**See Also**

-   _Metadata API Developer Guide_: [LightningTypeBundle](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_lightningtypebundle.htm)

### Build Input Components with Lightning Web Components

This section explains how the components are created and deployed for agent action input.

This image shows the Lightning Web Component (LWC) folder structure.

![The lwc folder contains a folder named flightRequestFilter, which is the LWC component. The flightRequestFilter folder includes CSS, HTML, JS, and metadata files.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example1-Input-LWC.png)

The LWC component includes HTML markup designed to accept input for `@apexClassType/c__FlightRequestFilter`. This HTML markup ensures that the data is displayed in an intuitive and customized format.

This sample code shows the contents of the `flightRequestFilter.js-meta.xml` file.

```xml


    64.0
    true
    Flight Filter LWC
    
      lightning__AgentforceInput
    
    
      
        
      
    

```

> **Note:**
> 
> When you create an LWC component to override the UI for action input, use lightning\_\_AgentforceInput as the target. For output, use lightning\_\_AgentforceOutput. For information about LWC target types, see [lightning\_\_AgentforceInput](https://developer.salesforce.com/docs/platform/lwc/guide/targets-lightning-agentforce-input.html) and [lightning\_\_AgentforceOutput](https://developer.salesforce.com/docs/platform/lwc/guide/targets-lightning-agentforce-output.html).

This sample code shows the contents of the `flightRequestFilter.html` file.

This sample code shows the contents of the `flightRequestFilter.js` file.

```javascript
import { api, LightningElement } from "lwc";
export default class FlightFilter extends LightningElement {
  @api
  get readOnly() {
    return this._readOnly;
  }

  set readOnly(value) {
    this._readOnly = value;
  }
  _readOnly = false;
  _value;
  @api
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }
  price;
  discountPercentage;

  connectedCallback() {
    if (this.value) {
      this.price = this.value?.price || "";
      this.discountPercentage = this.value?.discountPercentage || "";
    }
  }
  handleInputChange(event) {
    event.stopPropagation();
    const { name, value } = event.target;
    this[name] = value;
    this.dispatchEvent(
      new CustomEvent("valuechange", {
        detail: {
          value: {
            price: this.price,
            discountPercentage: this.discountPercentage,
          },
        },
      }),
    );
  }
}
```

> **Note:**
> 
> You must include the `handleInputChange()` function to capture user input, update the component’s state, and notify the parent component (planner component) by using the valuechange event. The function ensures real-time data binding and prevents unwanted event propagation.

**See Also**

-   _Lightning Web Components Developer Guide_: [Get Started with Lightning Web Components](https://developer.salesforce.com/docs/platform/lwc/guide)

### Integrate Custom Lightning Type into Agent Action Input

To add a custom Lightning type to the agent action, complete these steps.

1.  Open the agent action.
2.  Edit the `Input Rendering` parameter of the agent action input for `filters`.
3.  Select the custom lightning type `flightFilter`.
4.  Save the agent action.

The Unsupported Data Type message appears in the `Map to Variable` parameter. You see this message when you refer to types such as `@apexClassType` and custom Lightning types in an agent action’s `Input Rendering` parameter. This message doesn’t affect your saved work and can be safely ignored.

This image shows the custom Lightning type that you created.

![The agent action output settings with 'flightFilter' selected in the Input Rendering field.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example1-FlightFilter-Input.png)

### Customized Input UI

Before executing the agent action that you modified, reload the agent page. The agent prompts you to provide input and then generate the output. The input provides a new UI experience.

This image shows how the custom agent action’s input appears in an agent conversation.

![Agent's response to collect flight details. The response includes filter fields for price and discount percentage, making it easy to filter flight data.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example1-Input-Final.png)

> **Note:**
> 
> In certain instances the large language model (LLM) requests input as text, so make sure to accurately update the topic instructions for the correct selection of the Override Input component. For example, when you enter a prompt to find flights, the agent executes the Find Flight action. The Find Flight action executes by taking input through a UI form, and not in the form of Text because it includes a price and discount range.