# Scratch Org Access

This guide describes the basic steps for using Salesforce CLI to create a generative AI scratch org for a Developer or Enterprise edition org.

> **Note:**
> 
> A scratch org is a dedicated, configurable, and short-term Salesforce environment that you can quickly spin up when starting a new project, a new feature branch, or a feature test. Scratch orgs are configured using a scratch org definition file, which lists the features and settings that mirror the customer's production org. See [Scratch Orgs](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_scratch_orgs.htm) in the Salesforce DX Developer Guide for detailed information.

1.  Install [Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm) on your computer.
    
2.  Open a terminal (macos, Linux) or command prompt (Windows) and make sure that Salesforce CLI is up to date by running this command.
    
3.  (Optional) [Create a Salesforce DX project](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_create_new.htm) on your computer and change to the directory.
    
    If you only want to create a scratch org, then this step isn't necessary. But we recommend creating a DX project if you plan to store your org’s metadata (code and configuration), org templates, sample data, and tests in a version control system. See [Project Setup](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_workspace_setup.htm).
    
4.  Select and enable your Dev Hub org, which must have your Data 360 licenses. See [Select and Enable a Dev Hub Org](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_setup_enable_devhub.htm) in the Salesforce DX Developer Guide for more information.
    
5.  Log in to your Dev Hub org and allow access. In the browser window that opens, sign in to your org with your Salesforce login credentials. Click **Allow**, which allows Salesforce CLI to access to your org.
    
6.  Create a definition file, such as `afdx-scratch-def.json`. If you're using a Salesforce DX project, create the file in the `config` directory alongside the existing `config/project-scratch-def.json` file.
    
    To use an Einstein Generative AI scratch org, add the `Einstein1AIPlatform` feature, which is supported in Developer and Enterprise editions. To automatically enable Einstein and Agentforce, turn on the `agentPlatformSettings.enableAgentPlatform` and `einsteinGptSettings.enableEinsteinGptPlatform` settings.
    
7.  Using the scratch org definition file, create the scratch org.
    
8.  Open the org.
    

After you open the org, you can use Salesforce generative AI features such as Agentforce, Prompt Builder, Model Builder, and the Models API. To learn more, see [About Einstein Generative AI](https://help.salesforce.com/s/articleView?id=sf.generative_ai_about.htm) in Salesforce Help.

## See Also

-   [Set Up Einstein Generative AI and Agentforce](/docs/einstein/genai/guide/org-setup.html)
-   [AgentPlatformSettings Metadata API](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_agentplatformsettings.htm)
-   [EinsteinGptSettings Metadata API](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_einsteingptsettings.htm)