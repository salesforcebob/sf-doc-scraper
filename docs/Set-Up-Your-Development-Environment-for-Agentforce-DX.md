# Set Up Your Development Environment for Agentforce DX

Setting up your Agentforce DX environment is similar to setting up your Salesforce DX environment but with a few agent-specific extras. If you're already a Salesforce pro-code developer, you've probably completed most of these tasks or are familiar with them.

## Install Pro-Code Tools

The pro-code tools for creating and testing agents are Visual Studio Code (VS Code), Agentforce Vibes IDE, and Salesforce CLI. VS Code is an integrated and extensible development environment (IDE) and consists of a code editor, build automation tools, a debugger, and intelligent code completion. Agentforce Vibes IDE is a web-based version of VS Code that you can use when you want to run VS Code inside a web browser.

Salesforce VS Code extensions are available from both the VS Code Marketplace and the Open VSX Registry, which you can use if you prefer using open-source projects. If you're using Agentforce Vibes IDE, you must install extensions from the Open VSX Registry.

You install Salesforce CLI and VS Code locally on your computer. Agentforce Vibes IDE is pre-installed with the Salesforce extension pack and Salesforce CLI. To set up Agentforce Vibes IDE, see [Set Up Agentforce Vibes IDE](https://developer.salesforce.com/docs/platform/code-builder/guide/codebuilder-setup.html).

1.  [Download and install VS Code](https://code.visualstudio.com/).
    
2.  Install the Agentforce DX VS Code extension from either the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode-agents) or the [Open VSX Registry](https://open-vsx.org/extension/salesforce/salesforcedx-vscode-agents).
    
    The Agentforce DX extension depends on these VS Code extensions which are automatically installed if they're not found:
    
    -   Agent Script
    -   Apex and the Apex Replay Debugger
3.  Install the Salesforce Extensions for Visual Studio Code from either the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode) or the [Open VSX Registry](https://open-vsx.org/extension/salesforce/salesforcedx-vscode).
    
    The Salesforce Extension Pack includes tools for developing on the Salesforce platform, such as features for working with development orgs (scratch orgs, sandboxes, and DE orgs), Apex, Lightning web components, Aura components, Visualforce, and SOQL. The extension pack also includes Agentforce Vibes.
    
4.  [Install Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm) on your computer.
    
5.  Open VS Code.
    
6.  From VS Code's integrated terminal, run the `sf search` CLI command and enter `agent` to view the available agent-related commands.
    
    A summary of the command appears at the bottom as you use the arrow keys to scroll through the list.
    
    ![VS Code with integrated terminal highlighted and showing the "sf search" command.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-vscode-start.png)
    
    You can also run Salesforce CLI commands from a separate terminal (macOS, Linux) or command prompt (Windows) if you prefer.
    
7.  To view detailed information about a particular command, such as its flags and examples of how to use it, use the `-–help` flag. Use `-h` for concise information.
    

If you’re new to pro-code development using VS Code, check out the Trailhead badge [Quick Start: Visual Studio Code for Salesforce Development](https://trailhead.salesforce.com/content/learn/projects/quickstart-vscode-salesforce).

## Agentforce Developer Environments

You can use either a sandbox or scratch org for Agentforce development, but it’s important to understand the capabilities and limitations of each. You can also use a Developer Edition org that has Agentforce and Data 360 enabled.

### Sandbox Versus Scratch Org

You can use both sandboxes and scratch orgs to develop and test agents, code, and other configuration changes without compromising the data and applications in your production org.

**Sandboxes** are copies of your Salesforce production org. They contain all the metadata that was in your org at the time they were created. Developers often use Developer and Developer Pro sandboxes, because they can be refreshed often, which brings in new changes from your production org. Partial and Full Copy sandboxes are useful for integration and user testing because they contain data from your production org in addition to the metadata, although this ability restricts how often Partial and Full Copy sandboxes can be refreshed.

**Scratch orgs** are empty environments that don’t have any metadata or data from your Salesforce production org, so you can create them quickly. Scratch orgs are ideal for source-driven development where you externalize all the metadata from your production org, then deploy the metadata to the scratch org when you want to work on a specific part of your application.

### Do Your Agents Depend on Data Libraries?

To select the appropriate developer environment, consider whether your agents require access to Agentforce Data Libraries and Data 360:

-   **No Data Libraries Required**: Use scratch orgs [configured for Agentforce development](/docs/einstein/genai/guide/scratch-org.html).
-   **Data Libraries Required**: Use a sandbox org capable of [connecting to Data 360](https://help.salesforce.com/s/articleView?id=data.c360_a_data_cloud_sandbox.htm&type=5).

Combining Data 360 and Agentforce is the best way to create successful agents. For that reason, we recommend that you work in a sandbox when using Agentforce DX. Developer and Developer Pro sandboxes are ideal choices. See [Choose the Right Salesforce Org for the Right Job](https://developer.salesforce.com/blogs/2024/05/choose-the-right-salesforce-org-for-the-right-job) for a deeper dive into the available choices.

### Create a Sandbox

To create a sandbox, use one of these two methods:

-   **Salesforce CLI**: Run the `org create sandbox` command. See [Sandboxes](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_sandboxes.htm) in the _Salesforce DX Developer Guide_.
-   **Setup UI in your org**. See [Create, Clone, or Refresh a Sandbox](https://help.salesforce.com/s/articleView?id=platform.data_sandbox_create_parent.htm&type=5) in _Salesforce Help._

### Create a Scratch Org

To create a scratch org, run the `org create scratch` Salesforce CLI command. See [Scratch Org Access](/docs/einstein/genai/guide/scratch-org.html) for details about creating a scratch org definition file that automatically enables Einstein and Agentforce, which you need to use the `agent` commands.

> **Tip:**
> 
> Newly-created scratch orgs can take some time to be fully set up with Einstein and Agentforce features. If you encounter errors about the LLM or agents not being provisioned when immediately running `agent create` or `agent generate spec` after creating a scratch org, wait a moment and try again.

### Sign Up for a Developer Edition Org

Use [this form](https://www.salesforce.com/form/developer-signup/?d=pb) to sign up for a free Salesforce Platform environment with Agentforce and Data 360.

## Enable Agentforce in Your Org

Although sandboxes are a copy of your production org, some additional manual configuration is required after the sandbox is created to enable Agentforce in it. If you use a Developer Edition org, follow these steps to ensure that it's ready for Agentforce DX.

1.  Log in to your sandbox or Developer Edition org.
    
2.  If your agents don’t require Data 360, skip to the next step. If your agents require Data 360, turn on Data 360.
    
    1.  From Setup, find and select **Data Cloud Setup Home**.
        
    2.  Follow the directions in [Turn On Data 360](https://help.salesforce.com/s/articleView?id=data.c360_a_setup_provision.htm&type=5).
        
        Data 360 setup can take up to 60 minutes to complete; the Setup page lets you know when it's finished.
        
        Don’t continue to the next step until Data 360 setup has fully completed.
        
3.  From Setup, find and select **Einstein Setup**.
    
    1.  Make sure that Einstein is enabled. If not, select **Turn on Einstein**.
        
    2.  Reload the Setup UI.
        
        If you just enabled Einstein for the first time, reloading Setup is required so that Agent setup becomes available. ![Einstein Setup page in Setup showing Einstein enabled.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-einstein-setup-1.png)
        
4.  From Setup, find and select **Agentforce Agents**
    
    1.  Select **Agentforce**.
    2.  Select **Enable the Agentforce (Default) Agent**. ![Agentforce Studio page in Setup showing Agentforce enabled.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-agentforce-setup-2.png)

## Create a Salesforce DX Project

A Salesforce DX project provides a project structure for your org’s metadata (code and configuration), sample data, and all your team’s tests. Development teams store these items in a version control system, such as GitHub. Agents are like any other Salesforce customization in that they’re made up of metadata, so you still use DX projects to store and work with them.

1.  Open VS Code, click **View | Command Palette**, and then select **SFDX: Create Project**.
2.  Select **Standard (Standard project template default)**.
3.  Enter a name for your project, such as `agentforcedx`.
4.  Navigate to the location where you want to create the project, then click **Create Project**.

A standard Salesforce DX project opens in VS Code's Explorer. The following screenshot highlights the agent-related metadata directories in the DX package directory.

> **Tip:**
> 
> New DX projects don't automatically include the highlighted metadata directories, but as you start authoring and testing your agents, your project will soon include them.

![VS Code showing open "agentforcedx" DX project, with key metadata directories highlighted.](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/dx-project-1.png)

If you want to run Salesforce CLI commands directly in the [integrated terminal](https://code.visualstudio.com/docs/terminal/getting-started), or from a separate terminal (macOS, Linux) or command prompt (Windows), here are the equivalent commands for setting up a Salesforce DX project:

```bash
cd 
sf project generate --name agentforcedx
cd agentforcedx
```

## Authorize Your Sandbox or Developer Edition Org

Authorize your sandbox or developer edition orgs so you can work in them with VS Code and the CLI commands.

1.  In VS Code, click **View | Command Palette** and then select **SFDX: Authorize an Org**.
2.  Click **Project Default**.
3.  Enter an alias for your org, such as `agentforce`.
4.  In the browser window that opens, sign in to your org with your login credentials.
5.  Click **Allow**, which allows Salesforce CLI to access your org.
6.  Close the browser window. Your org is now authorized and set as your default org.

Here’s the equivalent Salesforce CLI command that you can use in VS Code’s [integrated terminal](https://code.visualstudio.com/docs/terminal/getting-started). Or run it in a separate terminal (macOS, Linux) or command prompt (Windows) from within your DX project.

```bash
sf org login web --alias agentforce --set-default
```

## See Also

-   [_Trailhead_: Quick Start: VS Code Development for Salesforce Development](https://trailhead.salesforce.com/content/learn/projects/quickstart-vscode-salesforce)
-   [_Salesforce CLI Setup Guide_: Install Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm)
-   [_Salesforce Extensions for Visual Studio Code_](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide)
-   [_Salesforce DX Developer Guide_: Project Setup](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_workspace_setup.htm)
-   [_Salesforce DX Developer Guide_: Authorization](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_auth.htm)
-   [_Salesforce CLI Command Reference_: agent Commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_agent_commands_unified.htm)
-   [_Salesforce CLI Command Reference_: org Commands](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_org_commands_unified.htm)
-   [_Salesforce Help_: Design and Implement Agents](https://help.salesforce.com/s/articleView?id=sf.copilot_intro.htm&type=5)