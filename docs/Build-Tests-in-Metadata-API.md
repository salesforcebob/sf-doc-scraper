# Build Tests in Metadata API

To define tests, use the `AiEvaluationDefinition` Metadata API type. To learn how to use Metadata API, see [Quick Start: Metadata API](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_quickstart_retrieve.htm).

> **Note:**
> 
> To use Salesforce CLI to create agent tests instead of directly using Metadata API, see [Test an Agent with Agentforce DX](/docs/einstein/genai/guide/agent-dx-test.html).

The `AiEvaluationDefinition` metadata type contains a set of test cases. Each test case takes inputs (including an utterance) and contains a set of expectations (such as an expected action sequence) for the response.

## Test Case Inputs

Test cases can include various types of inputs. The primary input is an utterance, but you can also include context variables and conversation history to evaluate agent responses in complex scenarios.

### Context Variables

In addition to an utterance, a test case input can contain context variables. These variables allow you to create more nuanced tests on how agents behave in different contexts, and determine the overall robustness of an agent in scenarios that better simulate a production environment.

For more information on context variables, see the [Standard Variable Reference](https://help.salesforce.com/s/articleView?id=ai.agent_variables_ref.htm).

> **Note:**
> 
> By default, context variables are immutable and are only set at the beginning of an agent session. The only context variable that is editable after a session begins is `EndUserLangauge`.

### Conversation History

In addition to context variables and an utterance, you can add the conversation history to the test definition as input. Passing the conversation history into the testing service adds additional context that enables multi-turn testing. Instead of testing single shot utterance-response pairs, you can now test utterances within the context of a conversation.

To add conversation history to your test definition, add the messages from the conversation within `inputs` as shown. Each `conversationHistory` includes the role of the message sender, the message text, the topic used if the role is agent, and the index of the message in the conversation.

```XML

  
    user
    Show me all accounts
    0
  
  
    agent
    You have account A, account B, and account C.
    EmployeeCopilot__GeneralCRM
    1
  

```

For more information on the fields required for conversation history, see the [Testing API Metadata Reference](/docs/einstein/genai/references/testing-api/testing-metadata-reference.html).

## Example Metadata Test Definition

‌This sample XML `AiEvaluationDefinition` has two test cases for the `Agentforce_for_Salesforce` agent. The first test case provides an utterance (“Summarize the Global Media account”) and defines multiple expectations for the response.

1.  The first expectation verifies that the `OOTBSingleRecordSummary` topic is used.
2.  The second expectation verifies that the `IdentifyRecordByName` action is used.
3.  The third expectation includes a string that's expected in the test response.
4.  The fourth expectation uses the `conciseness` quality metric to gauge whether the generated answer is brief but comprehensive. Shorter is better.

```xml


    My Sample Tests
    my_test_n1
    Agentforce_for_Salesforce
    AGENT
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
            ["IdentifyRecordByName"]
        
        
            bot_response_rating
            Summarization of the Global Media account
        
        
            conciseness
        
    
    
        2
        
          give me a pizza recipe
        
        
            topic_sequence_match
            Small_Talk
        
        
            action_sequence_match
            []
        
        
            bot_response_rating
            the agent cant answer this
        
    

```

See [AiEvaluationDefinition](/docs/einstein/genai/references/testing-api/testing-metadata-reference.html#aievaluationdefinition).

To deploy metadata components with Salesforce CLI, [Deploy and Run Tests in the Command Line](/docs/einstein/genai/guide/testing-api-cli.html).

## See Also

-   [Metadata API Reference](/docs/einstein/genai/references/testing-api/testing-metadata-reference.html)
-   [Run Tests in Connect API](/docs/einstein/genai/guide/testing-api-connect.html)