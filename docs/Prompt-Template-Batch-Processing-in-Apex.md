# Prompt Template Batch Processing in Apex

To asynchronously generate large quantities of responses for prompt templates you can use Prompt Template Batch Processing. You can batch and execute jobs in Flow and Apex. For Flow, see [Flow Core Action: Prompt Template Actions](https://help.salesforce.com/s/articleView?id=platform.flow_ref_elements_actions_generate_prompt_response.htm).

See the object reference guide for [AiJobRun](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_aijobrun.htm) and [AiJobRunItem](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_aijobrunitem.htm).

## Considerations

There are several immutability and status constraints for batch processing standard objects.

### Immutability

Once an `AiJobRun` begins processing and the status updates to `InProgress`, some `AiJobRunItem` fields become immutable.

-   You can't change the `AiJobRunId` and `Input` field values.
-   `AiJobRunItem` schema fields set to a non-null value (except status) can't be changed.
-   You can't delete the `AiJobRun` or any of its `AiJobRunItems`.

### Status Changes

These statuses for both AiJobRun and AiJobRunItem can't be changed by the user:

-   `InProgress`
-   `Completed`
-   `Failed`

To initiate an `AiJobRun` for batch execution, update the status to `ReadyToStart`.

### Rate Limits

There's a limit of 1,000 `AiJobRunItems` for each `AiJobRun`.

When using models that support native batch processing, there is a limit of 10,000 `AiJobRunItems` for each `AiJobRun`. Additionally, in Apex, you can start up to 5 `AiJobRun` objects in 24 hours.

For a list of models that support native batch processing, see [Large Language Model Support](https://help.salesforce.com/s/articleView?language=en_US&id=sf.generative_ai_large_language_model_support.htm).

### Processing Order

When an `AiJobRun` object is created, it's assigned a `CreatedDate` field with a dateTime timestamp. Multiple `AiJobRun` objects with a `ReadyToStart` status begin processing in chronological order of the `CreatedDate` value. However, if several `AiJobRun` objects are updated to `ReadyToStart` within a few seconds of one another, the start time may not strictly follow the `CreatedDate` order. This processing order behavior applies to all `AiJobRun` objects, regardless of how their status is updated.

## Apex Example

This example demonstrates how to use Apex to schedule and run batch jobs.

1.  Create an `AiJobRun` object.

```apex
AIJobRun jobRun = new AIJobRun(
    JobType = 'PromptTemplate',
    Target = 'AgentConversationClassifier' // Prompt Template Id
);
insert jobRun;
```

2.  Create an `AiJobRunItem` list with information about each job.

```apex
List agentConversations = [
    SELECT Id, ConversationText__c FROM AgentConversation__c WHERE LLMProcessed__c = false
];

List jobRunItems = new List();
for (AgentConversation__c conversation : agentConversations) {
    String promptInput = '{"Input:conversationId": "' + conversation.Id + '"}';

    AiJobRunItem runItem = new AiJobRunItem(
        AiJobRunId = jobRun.Id,
        Status = 'Ready',
        Input = promptInput
    );

    jobRunItems.add(runItem);
}

if (!jobRunItems.isEmpty()) {
    insert jobRunItems;
}
```

Input parameter names must include the `Input:` prefix. If your prompt template expects a record input, pass a JSON payload with the record id nested under the input name.

```apex
MyCustomObject__c rec = [SELECT Id FROM MyCustomObject__c LIMIT 1];
String promptInput = '{"Input:myCustomObject":{"id":"5003000000D8cuIQAA"}}';
```

3.  Update the `AiJobRun Status` to trigger execution.

```apex
jobRun.Status = 'ReadyToStart';
update jobRun;
```

## Monitor Job Completion with Apex Triggers

You can use [Apex triggers](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_triggers.htm) to automatically respond when a batch job completes. By creating a trigger on the `AiJobRun` object for update operations, you can detect when the `Status` field changes to `Completed`.

When the job completes, you can query the related `AiJobRunItem` records to access both the original input data and the generated responses. The `Input` field contains the input data for each individual item within the job run, and the `Response` field contains the corresponding LLM response.

For more information about Apex triggers, see the [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_triggers.htm).

### Job Type Values

[`AiJobRun.JobType`](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_aijobrun.htm) can differ based on how the batch is initiated.

-   Apex-created batch runs: `PromptTemplate`
-   Flow (Prompt Template Batch Generation action): `GeneratePromptAsyncIA`

## See Also

-   _Agentforce Developer Guide_: [Get Started with Prompt Builder](/docs/einstein/genai/guide/get-started-prompt-builder.html)
-   _Salesforce Help_: [Flow Core Action: Prompt Template Actions](https://help.salesforce.com/s/articleView?id=platform.flow_ref_elements_actions_generate_prompt_response.htm)