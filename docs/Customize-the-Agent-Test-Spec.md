# Customize the Agent Test Spec

Running the `agent generate test-spec` command results in a good agent test spec. But there are other items you can add to the file to create even better tests. Because the agent test spec file is in YAML format, it's easy to update manually.

## Test Service Agent Context Variables

Service agents can connect to customer channels. Specifically, you can configure your Service agent to route conversations to it with enhanced messaging channels. See [Connect a Service Agent to Messaging](https://help.salesforce.com/s/articleView?id=ai.service_agent_messaging.htm&type=5).

You can also personalize your Service agent conversations with context variables. Context variables let your agent use record fields of the Messaging Session standard objects as action inputs. See [Use Context Variables in Service Agent Conversations](https://help.salesforce.com/s/articleView?id=ai.service_agent_context_variables.htm&type=5).

If you've configured your Service agent with context variables, you can test how they work at the same time you test your agent. Do this by adding a `contextVariables:` section to your test cases in the agent test spec. For each context variable you want to test, add a `name`|`value` pair. The `name` property is the API name of the context variable and `value` is a specific value you want to test.

For example, let's say that you added the EndUserLanguage context variable to your Service agent. This variable specifies the preferred language of the user participating in the messaging session. To run a test case as if the user were talking in Spanish, manually update your YAML agent test spec like this.

```yaml
testCases:
  - utterance: Are there any resort experiences that match my interests today?
    expectedTopic: Experience_Management
    expectedActions: []
    expectedOutcome: The agent should politely ask for the guest's email address AND membership number.
    customEvaluations: []
    conversationHistory: []
    contextVariables:
      - name: EndUserLanguage
        value: Spanish
```

To find the API name of a context variable, open your agent in your development org's Agent Builder UI and go to the Context tab.

![Agent Builder showing the Context tab and EndUserLanguage variable highlighted.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-context-variables.png)

Context variable API names correspond to field names of the [MessagingSession](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_messagingsession.htm) standard object.

## Use Metrics to Assess Agent Responses

When you run `agent generate test-spec`, the command automatically adds out-of-the-box metrics in a `metrics:` section for each test case in the generated spec YAML file. For example:

```yaml
testCases:
  - utterance: Are there any resort experiences that match my interests today?
    expectedTopic: Experience_Management
    expectedActions: []
    expectedOutcome: The agent should politely ask for the guest's email address AND membership number.
    customEvaluations: []
    conversationHistory: []
    metrics:
      - coherence
      - completeness
      - conciseness
      - output_latency_milliseconds
      - instruction_following
      - factuality
```

Use these metrics to assess the quality and latency of agent responses during testing. Including the metric name in the test spec enables the metric information in the test result. Here's what the metrics measure:

-   **Coherence** - Measures whether the response is easy to understand and has no grammatical errors.
-   **Completeness** - Measures whether the response includes all the essential information.
-   **Conciseness** - Measures whether the response is brief but comprehensive. Shorter is better.
-   **Latency** - Returns the latency in milliseconds from sending a request until a response is received.
-   **Instruction Adherence** - Evaluates how well the generated responses follow the topic instructions.
-   **Factuality** - Evaluates how factual the response is.

After you run an agent test that has these metrics in the test YAML file, you get a Metrics section in the test case output similar to this:

```text
❯ METRICS (Value/Threshold)
────────────────────────────────────────────────────────────────────────
❌ : COMPLETENESS (1/0.6) : The answer does not provide any weather information, which is the main request. It only mentions a technical issue and suggests checking a weather app or website, which does not fully address the user's query.
✅ : COHERENCE (4/0.6) : The answer is easy to understand, free of significant grammar errors, and flows well when read by itself.
✅ : CONCISENESS (5/0.6)
❌ : INSTRUCTION FOLLOWING (0.4/0.6) : The answer does not follow the instructions at all. It performs a completely different task than what the query asks. The query asks for the weather, but the answer provides a solution to the technical issue and asks for further assistance.
❌ : FACTUALITY (0/0.6) : The answer does not provide any weather information and instead informs the user that the weather information could not be retrieved due to a technical issue. The answer does not contain any factual information about the weather.
⏱️ : OUTPUT LATENCY (3564ms)
```

See [Use Test Results to Improve Your Agent](/docs/einstein/genai/guide/testing-api-use-results.html) for information on the returned scores for these metrics.

If you don't want to include these metrics in an agent test run, simply delete the specific metric, or the entire `metrics:` section, from the test case in the spec YAML file.

## Add Custom Evaluation Criteria to an Agent Test Spec

Custom evaluations test an agent response for specific strings or numbers. If you opt to add one or more custom evaluations to an agent test case when you run `agent generate test-spec`, you're prompted for the following information:

-   **Label**: A descriptive name of the custom evaluation.
-   **JSONPath expression**: Enables you to automatically point to the data you want to test. See [Construct the JSONPath Expression](/docs/einstein/genai/guide/agent-dx-test-customize.html#construct-the-jsonpath-expression) for tips.
-   **Comparison operator**: The operator used to compare the expected and actual values returned from the test. Examples are equals, greater than or equal, and so on.
-   **Expected value**: The value you expect after the evaluation is tested.

After you enter values, the agent test spec YAML file includes a `customEvaluations` section like this:

```text
    customEvaluations:
      - label: Check for correct date
        name: string_comparison
        parameters:
          - name: operator
            value: equals
            isReference: false
          - name: actual
            value: $.generatedData.invokedActions[*][?(@.function.name == 'Check_Weather')].function.input.dateToCheck
            isReference: true
          - name: expected
            value: "2025-09-12"
            isReference: false
```

The `agent generate test-spec` command uses the Agentforce Testing API under the covers, so for more information, see [Add Custom Evaluation Criteria to a Test Case](/docs/einstein/genai/guide/testing-api-custom-evaluation-criteria.html#get-started-with-custom-evaluation-criteria).

### Construct the JSONPath Expression

To construct the JSONPath expression that tests the actual result of a custom evaluation, you need the generated JSON data from an invoked action. To get this information, first [run the agent test](/docs/einstein/genai/guide/agent-dx-test-run.html) without any custom evaluations and specify that you want to see the generated JSON.

If you use the `agent test run` CLI command to run an agent test, specify the `--verbose` flag to show the generated JSON data in the test results output. For example:

```bash
sf agent test run --api-name Guest_Experience_Agent_Test --verbose
```

The test results output includes a section called **Generated Data**, which includes information about any invoked actions in the agent test run. This sample JSON data shows information about the invoked action (function) called `Check_Weather`:

```text
Generated Data
┌───────────────────────────────────────┐
│ Data                                  │
├───────────────────────────────────────┤
│ [                                     │
│   [                                   │
│     {                                 │
│       "function": {                   │
│         "name": "Check_Weather",      │
│         "input": {                    │
│           "dateToCheck": "2025-09-12" │
│         },                            │
│         "output": {}                  │
│       },                              │
│       "executionLatency": 804         │
│     }                                 │
│   ]                                   │
│ ]                                     │
└───────────────────────────────────────┘
```

If you're using the VS Code Testing Panel to run agent tests, be sure the **Generated Data Output** box is checked; the JSON data is displayed in the **ACTION: INVOCATION** section of the test results.

![VS Code testing panel showing the checked generated data output box and the sample output.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-generated-data.png)

Now that you have the generated JSON data, you can build the required JSONPath expression. This sample JSONPath expression finds the value of the inputted date to the `Check_Weather` function (agent action):

```text
$.generatedData.invokedActions[*][?(@.function.name == 'Check_Weather')].function.input.dateToCheck
```

See [Dynamically Reference Generated Data](/docs/einstein/genai/guide/testing-api-custom-evaluation-criteria.html#dynamically-reference-generated-data) for more information about constructing a JSONPath expression.

## Add Conversation History to Enhance the Test Context

Adding the conversation history to an agent test adds additional context that enables multi-turn testing. Instead of testing single-shot utterance-response pairs, you can now test utterances within the context of a conversation.

Including conversation history in an agent test is easy. When you first run `agent generate test-spec`, the command asks if you want to add conversation history to the generated YAML file. If you answer `Y`, the command adds a `conversationHistory` section with a boilerplate conversation, like this:

```yaml
testCases:
  - utterance: Are there any resort experiences that match my interests today?
    expectedTopic: Experience_Management
    expectedActions: []
    expectedOutcome: The agent should politely ask for the guest's email address AND membership number.
    customEvaluations: []
    conversationHistory:
      - role: user
        message: example user message
      - role: agent
        message: example agent message
        topic: Example_agent_topic
```

You can also manually add the `conversationHistory` section to an existing agent test spec YAML file if it doesn't already have one. Then add `role`\-`message` pairs that mimic a conversation leading up to the actual agent test. For the agent message (`role: agent`), you must also include the topic that the agent used to generate a response.

This example of a test for a retail agent shows how to add a conversation history in which the user provides an order ID:

```yaml
testCases:
  - utterance: When will my purchase arrive?
    expectedTopic: Look_Up_Order
    expectedActions: [Predict_Arrival_Date]
    expectedOutcome: The agent should tell the customer when their purchase will arrive.
    customEvaluations: []
    conversationHistory:
      - role: user
        message: I purchased an item last week but it hasn't arrived yet.
      - role: agent
        message: What is your order ID?
        topic: Ask_for_Order_ID
      - role: user
        message: It's 123456.
      - role: agent
        message: You ordered a Wacky Cat Bobblehead, right?  Great choice.
        topic: Look_Up_Order
```