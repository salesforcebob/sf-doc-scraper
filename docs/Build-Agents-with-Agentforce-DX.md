# Build Agents with Agentforce DX

Agentforce is a proactive, conversational AI solution, made up of autonomous agents, that sits on the Salesforce Platform. An autonomous agent is an advanced type of AI that can understand and respond to inquiries, then take action, with or without human intervention. When an agent is given an objective, it can generate tasks for itself, anticipate next steps, change course based on user input, and initiate new tasks within the use cases and guardrails you set up. You can think of your Agentforce agents as trusted digital teammates.

To learn more about Agentforce, check out these Trailhead modules:

-   [Introduction to Agentforce](https://trailhead.salesforce.com/content/learn/modules/introduction-to-agentforce)
-   [Autonomous Agents](https://trailhead.salesforce.com/content/learn/modules/autonomous-agents)

So what is Agentforce DX? If you're a pro-code Salesforce developer, you’re likely familiar with [Salesforce Developer Experience (DX)](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm): a set of tools to build, test, and ship applications on the Salesforce Platform. These tools include Salesforce CLI, VS Code extensions, Agentforce Vibes IDE, and DevOps Center. The tools also include developer environments such as scratch orgs, sandboxes, and Dev Edition orgs. Agentforce DX extends these tools to also work with agents.

You might have created and previewed an agent in an org using the [Agentforce Builder UI](https://help.salesforce.com/s/articleView?id=ai.agent_builder_intro.htm&type=5), which is a low-code development tool that's part of Agentforce Studio. You might even have tested your agent using your org's [Testing Center](https://help.salesforce.com/s/articleView?id=ai.agent_parent_test.htm&type=5). You can use these in-org builders to create and test agents with clicks, not code. But incorporating agent development and testing into a modern DevOps process requires storing the agent’s source code in a source control repository (also version control system or VCS). The source control repository then becomes part of the source of truth for your production org. Agentforce DX makes this possible.

Agents are made of metadata, just like any other Salesforce customization. For information about agent metadata types and structure, see [Agent Metadata: A Shallow Dive](/docs/einstein/genai/guide/agent-dx-metadata.html). Agentforce DX provides pro-code tools to create, preview, and test agents outside Agentforce Builder. It helps you move agent metadata between your Salesforce DX project and the scratch orgs, sandboxes, and production orgs you work with. With these abilities, you can incorporate agents into your modern software development process. Agentforce DX extends our [Salesforce DX](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm) tooling and can be used at the command-line or with a VS Code extension.

## Build Agents with Both Pro-Code and Low-Code Tools

When you build an agent, you can switch between low-code tools, such as the Agentforce Builder or Flow Builder UIs in your org, and pro-code tools, such as VS Code and Salesforce CLI on your local computer. Using both types of tools gives you flexibility and is all part of the iterative process of building an agent. The main thing is to always keep your Salesforce DX project in sync with your org.

Here’s a high-level example of how you can go back and forth between low- and pro-code tools as you iteratively build your agent. These steps are generic and simple; they’re simply meant to show that you have lots of options when developing agents.

1.  Author an agent from scratch in your local DX project by first generating its authoring bundle, which contains the agent's blueprint (Agent Script file), and then code this script file to define what your agent does. You can use either VS Code or CLI commands to generate and validate the authoring bundle, and then preview the resulting agent, in either simulated or live mode.
2.  Publish the authoring bundle to your org using VS Code or a CLI command, and then open the agent in the Agentforce Builder UI. You can continue coding the Agent Script file in your org's UI, commit a new version, preview it, and so on.
3.  Retrieve any metadata changes you made in the org back to your DX project.
4.  Use VS Code (with the Agentforce Vibes Extension) to create an Apex class that implements a new custom action for one of your topics. The Apex code is in your local Salesforce DX project. Update the agent's Agent Script file to use this Apex class.
5.  Deploy the local updates you made while coding the new Apex class back up to your org.
6.  Using VS Code or a CLI command, preview your agent to see if it's using this Apex class as you expect. Alternatively, preview the agent in the Agentforce Builder UI.
7.  Periodically check the new and updated metadata into your VCS, such as GitHub. Remember: Your VCS is the source of truth, so be sure that you keep it updated.
8.  Use Flow Builder in your org to create an autolaunched flow, then code the agent's Agent Script file in Agentforce Builder UI to use the new flow.
9.  Retrieve the new metadata back to your DX project, and check updated files into your VCS.

After you’re ready to test your agent, you again have pro-code and low-code options. You can use [VS Code and CLI commands](/docs/einstein/genai/guide/agent-dx-test.html), your org's [Agentforce Testing Center UI](https://help.salesforce.com/s/articleView?id=ai.agent_testing_center.htm), or [testing APIs](/docs/einstein/genai/guide/testing-api.html).

This guide shows you how to set up a Salesforce DX project and how to use Salesforce CLI and VS Code to author, preview, and test agents. While this guide doesn’t go into the details of coding an Apex class or creating a flow, we point you in the right direction when necessary.

## Give Us Your Feedback

Give us your feedback about Agentforce DX and report problems by entering an issue in our [GitHub repository](https://github.com/forcedotcom/cli/issues). Check out the [discussion page](https://github.com/forcedotcom/cli/discussions) to read about new features we're considering, add your comments, and propose your own.

## Release Notes

We release new versions of Salesforce CLI and its core plugins weekly. Read the [weekly release notes](https://github.com/forcedotcom/cli/blob/main/releasenotes/README.md) to learn about recent and upcoming changes, including changes to Agentforce DX CLI commands and VS Code extensions.

## See Also

-   [_Salesforce Help_: Build Enterprise-Ready Agents with Agentforce Builder](https://help.salesforce.com/s/articleView?id=ai.agent_builder_intro.htm&type=5)
-   [_Salesforce DX Developer Guide_: How Salesforce DX Tooling Changes the Way You Work](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro)
-   [_Trailhead_: Agentforce Basics](https://trailhead.salesforce.com/content/learn/modules/einstein-copilot-basics)