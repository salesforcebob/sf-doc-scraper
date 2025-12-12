# Get Started with Citations in Apex

These Apex classes enable developers to add citations to a custom action programmatically. To add citations to a custom action, you’ll need to implement it with an Apex class.

Citations can be consumed via employee agents as well as through calls to the [Agent API](https://developer.salesforce.com/docs/einstein/genai/guide/agent-api.html). For more information on citations for employee agents and Knowledge Action, see [Build Trust in AI Responses with Citations](https://help.salesforce.com/s/articleView?language=en_US&id=ai.generative_ai_trust_citations.htm) in Salesforce Help.

> **Note:**
> 
> Platform-generated citations are only available for agents created after May 26, 2025.

## Prerequisites

This guide assumes you have experience developing Apex custom actions. For more information, review these guides:

-   [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_dev_guide.htm)
-   [Create Actions with Apex REST Agent Actions](/docs/einstein/genai/guide/agent-apex.html)

Citations is an Agentforce feature and it requires agents to be enabled in your org. See [Set Up Agents](https://help.salesforce.com/s/articleView?id=sf.copilot_setup.htm) in Salesforce Help.

## Citations Basics

For an agent action to include citations, the Apex action must use several citation-specific variables and types. Supported sources are unstructured data, such as knowledge articles, data from PDF files, and information from external web pages. To see citations in your agent responses, the agent must be activated.

For an agent to correctly return citations, an Apex action class must include citation input and/or output classes.

-   `AiCopilot.GenAiCitationInput`: This enables an action to add sources to the agent reasoning context. The reasoning engine can then call the citations platform if there are valid sources referenced in the response.
-   `AiCopilot.GenAiCitationOutput`: This enables actions to directly provide citations for responses without calling the citations platform.

> **Note:**
> 
> For both `GenAiCitationInput` and `GenAiCitationOutput` classes, you can customize the label associated with the citation in the `label` field. Ensure that your end user has access to the URL and label for source reference content.

If you want your agent action to generate text based on provided sources and determine relevant citations automatically, use `GenAiCitationInput`. If you want your agent action to generate text and citations based on predetermined logic, use `GenAiCitationOutput`.

For more information on citation types, see [Citations Apex Reference](/docs/einstein/genai/references/citations/citations-reference.html).

### Generate Citations with the Reasoning Engine

The `GenAiCitationInput` class supplies the Agentforce reasoning engine with citation information. From there, the reasoning engine can determine where and how citations are added to generated content.

To generate citations from a `GenAiCitationInput` Apex class, you must return the generated response as well as the citation metadata to the agent. In the example implementation, the response is generated from a prompt template and retriever.

### Generate Citations Manually

The `GenAiCitationOutput` type provides direct control over how custom actions surface citations for source information. `GenAiCitationOutput` bypasses the reasoning engine’s logic and allows for explicit insertion of citations.

If you have actions that you want to always return specific citations, use `GenAiCitationOutput`. Otherwise, use `GenAiCitationInput` and allow the action to call the citation platform when necessary.

## Example Citation Implementation

We’ll walk through how to deploy an Apex class that uses citations to our org. This example invokes a prompt template using Connect API, parses the response, and returns a `GenAiCitationInput` object back to the Agentforce reasoning engine.

As a prerequisite, ensure that you have [agents](https://help.salesforce.com/s/articleView?id=ai.agent_setup_enable.htm) and [Prompt Builder](https://help.salesforce.com/s/articleView?id=ai.prompt_builder_enable.htm) enabled in your org.

> **Note:**
> 
> For more information on how to connect your Visual Studio Code environment to Salesforce, see [Use Visual Studio Code for Salesforce Development](https://trailhead.salesforce.com/content/learn/projects/quickstart-vscode-salesforce/use-vscode-for-salesforce) on Trailhead.

Copy and paste the following Apex class into your development environment.

For `GenAiCitationInput`, the Apex class must return data that the Agentforce reasoning engine can use to generate a response. The prompt template and retriever are invoked, and the response from the agent contains relevant inline citations.

```apex
// Invokes Einstein Prompt Template via Connect API, gets response/citations, transforms citations.
public class KnowledgeBaseApex {

    // Test method for debugging execute().
    public static void test() {
        execute('Can you explain what is an LLM?');
    }

    // Calls 'Knowledge_Search' Prompt Template via Connect API, gets raw response/citations.
    public static ConnectApi.EinsteinPromptTemplateGenerationsRepresentation execute(String query) {
        ConnectApi.WrappedValue inputText = new ConnectApi.WrappedValue();
        inputText.value = query;
        Map inputParams = new Map();
        // NOTE: 'Input:Question' must match the Prompt Template input variable API name.
        inputParams.put('Input:Question', inputText);

        ConnectApi.EinsteinPromptTemplateGenerationsInput executeTemplateInput = new ConnectApi.EinsteinPromptTemplateGenerationsInput();
        executeTemplateInput.additionalConfig = new ConnectApi.EinsteinLlmAdditionalConfigInput();
        executeTemplateInput.additionalConfig.applicationName = 'PromptBuilderPreview';
        executeTemplateInput.isPreview = true;
        executeTemplateInput.citationMode = 'post_generation';
        executeTemplateInput.inputParams = inputParams;

        ConnectApi.EinsteinPromptTemplateGenerationsRepresentation generationsOutput = ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate(
            'Knowledge_Search', // Developer Name of the Prompt Template
            executeTemplateInput
        );

        return generationsOutput;
    }

    // Helper methods to transform Connect API citations to AI Copilot format.

    // Transforms a single Connect API source reference to AiCopilot format.
    public static AiCopilot.GenAiSourceReference transform(ConnectApi.EinsteinLlmGenAiSourceReference sourceRef) {
        List contents = new List();
        for (ConnectApi.EinsteinLlmGenerationGenAiSourceContentInfo contentInfo : sourceRef.contents) {
            contents.add(new AiCopilot.GenAiSourceContentInfo(contentInfo.fieldName, contentInfo.objectName, contentInfo.content));
        }

        List metadata = new List();
        for (ConnectApi.EinsteinLlmGenerationGenAiSourceReferenceInfo referenceInfo : sourceRef.metadata) {
            metadata.add(new AiCopilot.GenAiSourceReferenceInfo(referenceInfo.link, referenceInfo.sourceObjectRecordId, referenceInfo.sourceObjectApiName));
        }

        return new AiCopilot.GenAiSourceReference(null, contents, metadata);
    }

    // Transforms the overall Connect API citation block to AiCopilot format.
    public static AiCopilot.GenAiCitationInput transform(ConnectApi.EinsteinLlmGenerationCitationOutput citations) {
        List sourceRefs = new List();
        if (citations != null && citations.sourceReferences != null) {
            for (ConnectApi.EinsteinLlmGenAiSourceReference source : citations.sourceReferences) {
                sourceRefs.add(transform(source));
            }
        }
        return new AiCopilot.GenAiCitationInput(null, sourceRefs);
    }

    // Defines input (Request) and output (Response) structures for the Invocable Method.
    public class Request {
        @InvocableVariable(required=true description='Complete user question')
        public String Question;
    }

    public class Response {
        @InvocableVariable(required=true description='Generated text response from the LLM')
        public String Data;

        @InvocableVariable(required=true description='Structured citation sources')
        public AiCopilot.GenAiCitationInput sources;
    }

    // @InvocableMethod for Flows: gets question, calls execute, transforms citations, returns results.
    @InvocableMethod(label='Call Knowledge Prompt Apex' description='Invokes the Knowledge Search prompt template and returns the response with citations.')
    public static List executePrompt(List requests) {
        String question = requests[0].Question;
        ConnectApi.EinsteinPromptTemplateGenerationsRepresentation output = execute(question);

        List responses = new List();
        Response response = new Response();
        response.Data = output.prompt;
        response.sources = transform(output.citations);
        responses.add(response);

        return responses;
    }
}
```