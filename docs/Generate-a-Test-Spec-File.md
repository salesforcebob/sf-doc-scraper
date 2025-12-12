# Generate a Test Spec File

A test spec is a YAML file in your DX project that lists the test cases for a particular agent. The test spec file is local to your DX project and is an easy-to-read equivalent of the `AiEvaluationDefinition` metadata component that defines an agent test in your development org.

Run this interactive command from the VS Code [integrated terminal](https://code.visualstudio.com/docs/terminal/getting-started) to generate a test spec:

```bash
sf agent generate test-spec
```

> **Tip:**
> 
> As with all Salesforce CLI commands, you can also generate a test spec by opening a terminal (macOS, Linux) or command prompt (Windows), changing to your DX project directory, and running the `agent generate test-spec` CLI command.

The `agent generate test-spec` command first asks you what type of test you want to make; currently, only `AGENT` is supported. It then asks you to select the agent you want to test from a list of agent API names. The command compiles this list by searching your local Salesforce DX project, it doesn't search your org. After you select an agent, the command continues asking for basic information, such as whether you want to overwrite the default file of the test spec if it already exists, and the name and description of the test.

The command then prompts you to create one or more test cases by asking you for this information for each test case:

-   **Utterance** (Required) - A natural-language statement, question, or command to test the agent. Enter utterances that you expect the users of your agent to use. For example: “_Who is working the front desk today at noon?”_ Or “_Send me the list of customer complaints from yesterday.”_
    
-   **Expected topic** (Required) - The API name of the topic that you expect the agent to use when it responds to the utterance. The command gets the list of topics from the local metadata components in your Salesforce DX project that are associated with your agent, specifically GenAiPlugin.
    
-   **Expected actions** (Required) - The API name of one or more actions associated with the topic that you expect the agent to use. The command gets the list of actions from the local metadata components in your Salesforce DX project associated with the agent topic, specifically GenAiFunction.
    
-   **Expected outcome** (Required) - A natural-language description of the expected outcome of the test case. For example, “_Anna is working the front desk.”_ Or “_The list of customer complaints is provided_.”
    
-   **Custom evaluation** (Optional) - A way to test an agent response for specific strings or numbers. See [Add Custom Evaluation Criteria to an Agent Test Spec](/docs/einstein/genai/guide/agent-dx-test-customize.html#add-custom-evaluation-criteria-to-an-agent-test-spec) if you opt to add a custom evaluation to your test.
    
-   **Conversation history** (Optional) - Sample conversation history, which adds context to the test. See [Add Conversation History to Enhance the Test Context](/docs/einstein/genai/guide/agent-dx-test-customize.html#add-conversation-history-to-enhance-the-test-context) if you opt to add conversation history to your test.
    

This is an example of a generated test spec file for the `Resort_Manager` agent. By default, the test spec is generated in the `specs` directory and its name is `{Agent_API_name}-testSpec.yaml`. This sample spec file defines one test case:

```yaml
name: Resort Manager Tests
description: Tests for the Resort Manager agent.
subjectType: AGENT
subjectName: Resort_Manager
testCases:
  - utterance: Who is working the front desk today at noon?
    expectedTopic: p_16jQP0000000PEX_Employee_Schedule_Management
    expectedActions:
      - EmployeeCopilot__CreateAToDo
    expectedOutcome: Anna is working the desk.
    customEvaluations: []
    conversationHistory: []
    metrics:
      - completeness
      - coherence
      - conciseness
      - output_latency_milliseconds
      - instruction_following
      - factuality
```

If you opt to not add custom evaluations or conversation history to the agent test, the `customEvaluations` and `conversationHistory` sections still show up but they're empty.

The `agent generate test-spec` command automatically adds the `metrics:` section; see [Use Metrics to Assess Agent Responses](/docs/einstein/genai/guide/agent-dx-test-customize.html#use-metrics-to-assess-agent-responses) for more information about these useful metrics.

Now that you understand the structure of the agent spec YAML file, you can manually edit it in the VS Code editor by adding new test cases.

## Generate a Test Spec from an AiEvaluationDefinition Metadata XML File

If you have an AiEvaluationDefinition metadata XML file in your DX project, you can make a YAML test spec file from it. You can do this by passing the file path of the XML file to the `--from-definition` flag. This example also shows how to use the `--output-file` flag to specify the name of the spec file:

```bash
sf agent generate test-spec \
    --from-definition force-app/main/default/aiEvaluationDefinitions/ResortManagerTest.aiEvaluationDefinition-meta.xml \
    --output-file specs/Resort_Manager-test-spec.yaml
```

## See Also

-   [_Salesforce CLI Command Reference_: agent Commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_agent_commands_unified.htm)
-   [_Salesforce Extensions for Visual Studio Code_](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide)
-   [_Salesforce Help_: Agentforce Testing Center](https://help.salesforce.com/s/articleView?id=ai.agent_testing_center.htm&type=5)
-   [_Reference_: AiEvaluationDefinition](/docs/einstein/genai/references/testing-api/testing-metadata-reference.html)
-   [Build Tests in Metadata API](/docs/einstein/genai/guide/testing-api-build-tests.html)