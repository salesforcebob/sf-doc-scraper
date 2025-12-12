# Test an Agent with Agentforce DX

Testing an agent entails sending it questions, statements, or commands (_utterances_) and then making sure that the agent behaves as you expected when it responds.

## Flow of Pro-Code Agent Testing

Using Agentforce DX to test an agent is the pro-code equivalent of using the [Agentforce Testing Center UI](https://help.salesforce.com/s/articleView?id=ai.agent_testing_center.htm&type=5) in your development org. As with any software development, testing an agent is an iterative process. Here’s the general flow, and later sections of this guide go into details about some steps.

-   [Generate a test spec](/docs/einstein/genai/guide/agent-dx-test-spec.html) for your agent with the `agent generate test-spec` CLI command. A test spec is a local YAML file that describes one or more test cases for your agent.
-   [Customize the generated YAML test spec file.](/docs/einstein/genai/guide/agent-dx-test-customize.html) Add more testing items to the test spec file, such as setting context variables and including out-of-the-box metrics in the test output.
-   [Create the agent test in your development org](/docs/einstein/genai/guide/agent-dx-test-create.html) with the `agent test create` command, passing it the test spec file. This command also automatically syncs the associated metadata back to your DX project.
-   [Run the agent tests in your development org](/docs/einstein/genai/guide/agent-dx-test-run.html) and view the results with the `agent test run` command. You can also use the VS Code agent testing panel to view and run the tests.
-   If your tests all pass, then you’re all set! But if tests fail, use the [VS Code Agent Preview pane or the `agent preview` CLI command](/docs/einstein/genai/guide/agent-dx-preview.html) to chat with the active agent and test the utterances and responses in a conversational way. When using VS Code Agent Preview, you can also easily invoke the Apex Replay Debugger to debug Apex classes that implement actions. Then use all the information you gathered to fine-tune your agent instructions, actions, or topics.
-   Iterate as needed over the preceding steps until you've perfected your set of agent tests. Then use the test results to update your agent to work correctly.
-   Add the tests to a continuous integration (CI) system to make sure that your agent continues to work correctly in the future.

## See Also

-   [_Salesforce CLI Command Reference_: agent Commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_agent_commands_unified.htm)
-   [_Salesforce Extensions for Visual Studio Code_](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide)
-   [_Salesforce Help_: Agentforce Testing Center](https://help.salesforce.com/s/articleView?id=ai.agent_testing_center.htm&type=5)
-   [Testing API Developer Guide](/docs/einstein/genai/guide/testing-api.html)