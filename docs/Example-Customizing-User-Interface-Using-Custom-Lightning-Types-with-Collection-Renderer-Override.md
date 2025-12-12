# Example: Customizing User Interface Using Custom Lightning Types with Collection Renderer Override

This example explains how to override the default user interface to create a customized appearance of responses on the custom agent’s action output with custom Lightning types.

In this example, you specify a renderer collection override for the custom Lighting type that you created.

## Before You Begin

Download these sample data files.

-   [apexClass.zip](https://resources.docs.salesforce.com/rel1/doc/en-us/static/misc/apexClassesExample.zip)
-   [hotelLWCandCLT.zip](https://resources.docs.salesforce.com/rel1/doc/en-us/static/misc/hotelLWCAndCLTExample.zip)

## Example Apex Class for Retrieving Hotel Information

Use these Apex classes together to create a custom agent action that finds available hotels. The main `HotelReservation` class contains the invocable method, and the other classes define the complex data structures for the request and response.

When you create your custom agent action, select the method **Find hotels**.

**HotelReservation Class**

This class is the main class that contains the logic for the `find hotels` agent action.

```apex
@JsonAccess(serializable='always' deserializable='always')
global class HotelReservation {
    @InvocableMethod(label='Find hotels ' description='Find Available Hotels')
    global static List findHotels(List req) {
        // For example, we hardcode the data and don’t focus on how we retrieve it.
        // However, consider that we receive available hotel data from a service
        // and then iterate through the data to generate the final response.

        List hotelResponseList = new List();

        Room r1 = new Room('DELUX', 2, 15.15d, 2000l, false);
        List rooms = new List();
        rooms.add(r1);

        HotelCategory fourStar = new HotelCategory('four');
        Hotel hotel1 = new Hotel('Sahara Hotels', 'Gacchibowli Hyderabad', rooms, fourStar);
        HotelCategory fiveStar = new HotelCategory('five');
        Hotel hotel2 = new Hotel('Taj Vivanta', 'Kokapet', rooms, fiveStar);
        List hotels = new List();
        hotels.add(hotel1);
        hotels.add(hotel2);

        HotelResponse hotelresponse = new HotelResponse(hotels);
        hotelResponseList.add(hotelresponse);

        return hotelResponseList;
    }
}
```

**HotelResponse Class**

This class defines the data structure for the response that returns a list of available hotels.

```apex
@JsonAccess(serializable='always' deserializable='always')
global class HotelResponse {
    @InvocableVariable
    global List hotels;

    global HotelResponse(List hotels) {
        this.hotels = hotels;
    }
}
```

**Hotel Class**

This class defines the data structure for hotel details.

```apex
@JsonAccess(serializable='always' deserializable='always')
global class Hotel {
    @InvocableVariable
    global String name;

    @InvocableVariable
    global String address;

    @InvocableVariable
    global List rooms;

    @InvocableVariable
    global HotelCategory hotelCategory;

    global Hotel(String name, String address, List rooms, HotelCategory hotelCategory) {
        this.name = name;
        this.address = address;
        this.rooms = rooms;
        this.hotelCategory = hotelCategory;
    }
}
```

**Room Class**

This class defines the data structure for rooms within a hotel.

```apex
@JsonAccess(serializable='always' deserializable='always')
global class Room {
    @InvocableVariable
    global String type;

    @InvocableVariable
    global Integer available;

    @InvocableVariable
    global Double discountPercentage;

    @InvocableVariable
    global Long price;

    @InvocableVariable
    global Boolean petAllowed;

    global Room(String type, Integer available, Double discountPercentage, Long price, Boolean petAllowed) {
        this.type = type;
        this.available = available;
        this.discountPercentage = discountPercentage;
        this.price = price;
        this.petAllowed = petAllowed;
    }
}
```

**HotelCategory Class**

This class defines the data structure for a hotel’s star rating.

```apex
@JsonAccess(serializable='always' deserializable='always')
global class HotelCategory {
    @InvocableVariable
    global String star;

    global HotelCategory(String star) {
        this.star = star;
    }
}
```

**HotelRequest Class**

This class defines the data structure for the agent action’s input criteria.

```apex
@JsonAccess(serializable='always' deserializable='always')
global class HotelRequest {
    @InvocableVariable
    global String city;

    @InvocableVariable
    global Date checkInDate;

    @InvocableVariable
    global Date checkOutDate;
}
```

The Apex class `Hotel Reservation` accepts the hotel search criteria, including the check in date, check out date, and city, and then returns a list of available hotels.

> **Note:**
> 
> For this example, hotel availability data is already included in the `Hotel Reservation` Apex class. However, in a real-time scenario, hotel information is fetched from an external service, and the Apex class processes that data to generate the final response.

## Create Agent Action by Using Apex Class

For information about how to create a custom action by using Apex class, see [Create a Custom Agent Action](https://developer.salesforce.com/agentforce-workshop/agents/4-apex-actions).

Inputs and outputs for the agent action are defined by using standard Lightning types.

Input:

-   `checkInDate`, `checkOutDate`, and `city` use standard Lightning types such as lightning\_\_dateType and lightning\_\_textType.

Output:

-   The output `hotels` for the agent action is a list type.

Here’s an image that shows the custom agent action created.

![Input and output settings for a 'Find hotels' agent action. Inputs: checkInDate, checkOutDate, City. Output: hotels.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example2-Agent-Action.png)

The available flight information is retrieved by using `@apexClassType/c__Hotel` in the agent action output, where:

-   `apexClassType` is the bundle name.
-   `Hotel` is the Apex class.

When you execute this agent action, it prompts you to provide input and then generates the output.

## Agent Action Execution Input

The agent’s action UI collects these details to find available hotels.

-   Check in date
-   Check out date
-   City

Here’s the image that shows how the custom agent action input appears in an agent conversation.

![Agent action input collects hotel details: checkInDate, checkOutDate, and city.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example-Execution-Hotel-Input.png)

## Agent Action Execution Output

The agent’s action UI returns the available hotel details.

Here’s the image that shows how the custom agent action’s output appears in an agent conversation.

![Agent's response to a hotel details request. The response lacks labels and is presented in a format that is hard to understand.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example-Execution-Hotel-Output.png)

## Result Data

The agent displays the hotel data in the response.

Here’s the sample code that shows the available hotel data.

```json
{
  "hotels": [
    {
      "rooms": [
        {
          "type": "DELUX",
          "price": 2000,
          "petAllowed": false,
          "discountPercentage": 15.15,
          "available": 2
        }
      ],
      "name": "Sahara Hotels",
      "hotelCategory": {
        "star": "four"
      },
      "address": "Gacchibowli Hyderabad"
    },
    {
      "rooms": [
        {
          "type": "DELUX",
          "price": 2000,
          "petAllowed": false,
          "discountPercentage": 15.15,
          "available": 2
        }
      ],
      "name": "Taj Vivanta",
      "hotelCategory": {
        "star": "five"
      },
      "address": "Kokapet"
    }
  ]
}
```

## Customize UI for Output

Create a custom Lightning type named `hotelResponse` to enhance the visibility of the information in the output UI.

### Override Default UI for Output With Custom Lightning Types

Override the agent’s action UI for output to enhance the user experience by using Custom Lightning Types (CLTs). With CLTs, you can add your own Lightning Web Components (LWC) to present data for lists in a more structured and intuitive format.

Configure the `renderer.json` file to override the default UI of a custom Lightning type in the agent action.

Here’s an example showing a lightningTypes folder for a custom Lightning type named `hotelResponse`.

```text
+--lightningTypes
        +--hotelResponse
            +--schema.json
            +--lightningDesktopGenAi
               +--renderer.json
```

The custom Lightning type `hotelResponse` includes a `schema.json` file and a `renderer.json` file. The `renderer.json` file controls how the data is displayed to the user in the agent action output.

This sample code shows the contents of the `schema.json file`.

```json
{
  "title": "Hotel Reservation",
  "description": "Hotel Reservation",
  "lightning:type": "@apexClassType/c__Hotel"
}
```

This sample code shows the contents of the `renderer.json` file.

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

### Build Output Components with Lightning Web Components

This section explains how the components are created and deployed for agent action output.

This image shows the Lightning Web Component (LWC) folder structure.

![The lwc folder contains a folder named hotelDetails, which is the LWC component. The hotelDetails folder includes CSS, HTML, JS, and metadata files.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example2-Output-LWC.png)

The LWC component includes HTML markup designed to accept output for `@apexClassType/c__Hotel`. This HTML markup ensures that the data is displayed in an intuitive and customized format.

This sample code shows the contents of the `hotelDetails.js-meta.xml` file.

```xml


    64.0
    true
    HotelDetails
  
        lightning__AgentforceOutput
    
    
        
            
        
    

```

> **Note:**
> 
> When you create an LWC component to override the UI for action input, use lightning\_\_AgentforceInput as the target. For output, use lightning\_\_AgentforceOutput. For information about LWC target types, see [lightning\_\_AgentforceInput Target](https://developer.salesforce.com/docs/platform/lwc/guide/targets-lightning-agentforce-input.html) and [lightning\_\_AgentforceOutput Target](https://developer.salesforce.com/docs/platform/lwc/guide/targets-lightning-agentforce-output.html).

This sample code shows the contents of the `hotelDetails.html` file.

This sample code shows the contents of the `hotelDetails.js` file.

```js
import { LightningElement, api } from "lwc";

export default class HotelDetails extends LightningElement {
  @api value;
}
```

**See Also**

-   _Lightning Web Components Developer Guide_: [Get Started with Lightning Web Components](https://developer.salesforce.com/docs/platform/lwc/guide)

### Integrate Custom Lightning Type into Agent Action Output

To add a custom Lightning type to the agent action, complete these steps.

1.  Open the agent action.
2.  Edit the `Output Rendering` parameter of the agent action output for `HotelResponse`.
3.  Select the custom lightning type `HotelResponse`.
4.  Save the agent action.

The Unsupported Data Type message appears in the `Map to Variable` parameter. You see this message when you refer to types such as `@apexClassType` and custom Lightning types in an agent action’s `Output Rendering` parameter. This message doesn’t affect your saved work and can be safely ignored.

This image shows the custom Lightning type that you created.

![The agent action output settings with 'hotelResponse' selected in the Output Rendering field.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example2-HotelResponse-Output.png)

### Customized Input UI

Before executing the agent action that you modified, reload the agent page. The agent prompts you to provide input and then generate the output. The output provides a new UI experience.

This image shows how the custom agent action’s input appears in an agent conversation.

![Agent's response to a hotel details request. The response includes clear labels and is presented in a format that is easy to understand.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/lightning-types-images/Example-Final-Output-Hotel.png)