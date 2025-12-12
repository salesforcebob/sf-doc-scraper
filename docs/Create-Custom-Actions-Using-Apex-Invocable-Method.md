# Create Custom Actions Using Apex Invocable Method

With Agentforce Builder, developers can enhance agent capabilities by creating custom actions using Apex, flows, or prompt templates. This unique extensibility empowers developers to tailor agents to their business needs. To use your Apex code in a custom action, you can annotate your method with `@InvocableMethod`. This annotation makes the action available for configuration in Agentforce Builder. The following sample code shows an Apex class that uses this annotation.

```apex
public with sharing class HelloWorld {

    @InvocableMethod(label='Hello World' description='Takes a name and returns a greeting message')
    public static List sayHello(List inputs) {
        List outputs = new List();

        for (InputParameters input : inputs) {
            OutputParameters output = new OutputParameters();
            output.greeting = 'Hello, ' + input.name + '!';
            outputs.add(output);
        }

        return outputs;
    }

    public class InputParameters {
        @InvocableVariable(required=true label='Name' description='The name of the person to greet')
        public String name;
    }

    public class OutputParameters {
        @InvocableVariable(label='Greeting' description='The greeting message')
        public String greeting;
    }
}
```

To learn how to turn an invocable method into a custom action in Agentforce, review these resources.

**Salesforce Help**

-   _Salesforce Help_: [Create a Custom Action for Agents](https://help.salesforce.com/s/articleView?id=sf.copilot_actions_custom_create_scratch.htm)
-   _Salesforce Help_: [Use Agentforce to Invoke External Service Actions](https://help.salesforce.com/s/articleView?id=platform.external_services_custom_agent_actions.htm)

**Developer Blog**

-   _Developer Blog_: [Build Custom Agent Actions Using Apex](https://developer.salesforce.com/blogs/2024/03/build-custom-copilot-actions-using-apex)
-   _Developer Blog_: [Best Practices for Building Agentforce Apex Actions](https://developer.salesforce.com/blogs/2025/07/best-practices-for-building-agentforce-apex-actions)

**Developer Reference**

-   _Apex Developer Guide_: [InvocableMethod Annotation](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation_InvocableMethod.htm)