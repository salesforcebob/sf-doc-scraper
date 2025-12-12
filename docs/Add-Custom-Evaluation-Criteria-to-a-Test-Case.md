# Add Custom Evaluation Criteria to a Test Case

To test an agent response for specific strings or numbers, you can create custom evaluations. This enables you to create test cases for any data in an agent response, extending testing capabilities beyond standard or out-of-the-box expectations.

Custom evaluations enable more specific testing, such as ensuring that latency is less than 10 seconds, or that agent action inputs and outputs meet certain requirements.

## Get Started with Custom Evaluation Criteria

Custom evaluations follow a different format from standard expectations. Instead of defining an expectation with a name and an expected value, custom evaluations require individual parameters to define the evaluation requirements.

Currently, there are two different types of custom evaluations that you can add to your test metadata.

-   **String comparison**: Tests a response for a specific string value. The API name for this evaluation is `string_comparison`.
-   **Numeric comparison**: Tests a response for a specific numeric value. The API name for this evaluation is `numeric_comparison`.

## Use Parameters to Define a Custom Evaluation

This example custom evaluation checks if the reply email created by the DraftGenericReplyEmail action mentions the right person.

```text

            expected recipient match
                string_comparison
                
                    operator
                    equals
                    false
                
                
                    actual
                    $.generatedData.invokedActions[*][?(@.function.name == 'DraftGenericReplyEmail')].function.input.recipient
                    true
                
                
                    expected
                    Jon
                    false
                
        
```

This example of a custom evaluation has three different parameters: an actual value, an expected value, and an operator to compare them. Each parameter is defined with a `name` field, a `value` field, and an `isReference` field. The parameters are set individually using the `AiEvaluationExpectationParameter` format. For details, see the [Metadata reference](/docs/einstein/genai/references/testing-api/testing-metadata-reference.html).

This example evaluation uses the `equals` operator. This means the test case checks if the `actual` value from the agent matches the `expected` value. All string comparison operators are case sensitive. There are different valid operators for string comparison and numeric comparison evaluations.

The valid string comparison operators are:

-   `equals`: Checks if the `actual` value directly matches the `expected` value.
-   `contains`: Checks if the `actual` value contains the `expected` value.
-   `startswith`: Checks if the `actual` value begins with the `expected` value.
-   `endswith`: Checks if the `actual` value ends with the `expected` value.

The valid numeric comparison operators are:

-   `equals`: Checks for numerical equality.
-   `greater_than_or_equal`: Checks if the `actual` value is greater than or equal to (`>=`) the `expected` value.
-   `greater_than`: Checks if the `actual` value is greater than (`>`) the `expected` value.
-   `less_than`: Checks if the `actual` value is less than (`<`) the `expected` value.
-   `less_than_or_equal`: Checks if the `actual` value is less than or equal to (`<=`) the `expected` value.

> **Note:**
> 
> Each parameter field is limited to 100 characters.

The actual value is retrieved with a JSONPath expression. This expression enables you to automatically point to the data you want to test from the [Get Test Results](/docs/einstein/genai/references/testing-api/testing-connect-reference.html#get-test-results) resource in Connect API. For details on how to construct a JSONPath expression, see [Dynamically Reference Generated Data](#dynamically-reference-generated-data).

### Dynamically Reference Generated Data

In most custom evaluations, the `value` for the `actual` result is a JSONPath expression that points to generated data. This is runtime data from the `generatedData` object returned by the [Get Test Results](/docs/einstein/genai/references/testing-api/testing-connect-reference.html#get-test-results) resource. For this expression to dynamically reference data, `isReference` must be set to `true`.

Most JSONPath expressions for custom evaluations follow a pattern.

```text
$.generatedData.invokedActions[*][?(@.function.name == '{ACTION}')].{DYNAMIC_DATA}
```

You can show the generated JSON data when retrieving test results via Agentforce DX. To show the generated JSON, add the `--verbose` flag to a `agent test run` command. For more information, see [Customize the Agent Test Spec](/docs/einstein/genai/guide/agent-dx-test-customize.html).

#### Example JSONPath Expressions

Get the `query` input for the `namespace_actionName` action:

```text
$.generatedData.invokedActions[*][?(@.function.name == {namespace_actionName})]
.function.input.query
```

Get the `result` output for the `namespace_actionName` action:

```text
$.generatedData.invokedActions[*][?(@.function.name == 'namespace_actionName')]
.function.output.result
```

Get the `value` from the first `additionalContext` item for the `namespace_actionName` action:

```text
$.generatedData.invokedActions[*][?(@.function.name == {namespace_actionName})]
.function.output.additionalContext[0].value
```

For information on JSONPath operators, see the [official documentation](https://javadoc.io/doc/com.jayway.jsonpath/json-path/2.2.0/com/jayway/jsonpath/JsonPath.html).

## Example Test Case Definition

This is a complete test case metadata file that demonstrates standard expectations, out-of-the-box metrics, custom evaluation criteria, and context variables.

```xml


    My first Salesforce Agent test
    Agent_Sanity
    AGENT
    Sales_Agent
    v1
    
        1
        
            Summarize the Global Media account
            
                OrchestrationStage
                001SB00000MC0yrYAD_test
            
            
                EndUserLanguage
                Spanish
            
        
        
            topic_sequence_match
            OOTBSingleRecordSummary
        
        
            action_sequence_match
            ['IdentifyRecordByName', 'SummarizeRecord']
        
        
            bot_response_rating
            Summarization of the Global Media account including important points
        
        
            coherence
        
        
            output_latency_milliseconds
        
    
    
        2
        
            List contact names associated with Global Media account
        
        
            topic_sequence_match
            GeneralCRM
        
        
            action_sequence_match
            ['IdentifyRecordByName', 'QueryRecords']
        
        
            bot_response_rating
            should respond with list of contacts
        
        
            expected recipient match
                string_comparison
                
                    operator
                    equals
                    false
                
                
                    actual
                    $.generatedData.invokedActions[*][?(@.function.name == 'DraftGenericReplyEmail')].function.input.recipient
                    true
                
                
                    expected
                    Jon
                    false
                
        
    

```