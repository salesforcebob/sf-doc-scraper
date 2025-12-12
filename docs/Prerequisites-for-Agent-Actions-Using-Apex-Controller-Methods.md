# Prerequisites for Agent Actions Using Apex Controller Methods

You must first install Agentforce Vibes Extension to use this feature. Agentforce Vibes Extension is available in the [VS Code](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode) and [Open VSX](https://open-vsx.org/extension/salesforce/salesforcedx-vscode) marketplaces as a part of the Salesforce Extension Pack. You can install it in the VS Code desktop application, or just use it in [Agentforce Vibes IDE](https://developer.salesforce.com/docs/platform/code-builder/guide/codebuilder-overview.html), where the Salesforce Extension Pack (Expanded) comes pre-installed.

Agentforce Vibes Extension is enabled by default. Any developer with access to a Salesforce org can use the extension. See [Set Up Agentforce Vibes Extension](https://developer.salesforce.com/docs/platform/einstein-for-devs/guide/einstein-setup.html) for more details.

To validate and test documents to make sure that they work with your AuraEnabled Apex controller methods, make sure that the MuleSoft for Agentforce API Design Extension in the MuleSoft for Agentforce Extension Pack (beta) is installed. The Salesforce API Topic and Action Enablement governance rulesets are included in the MuleSoft for Agentforce Extension Pack (beta).

## AuraEnabled Apex Class Requirements for OAS Generation

In order for an Apex class to qualify to be registered as an OpenAPI spec in the API catalog, it must have the annotation `@AuraEnabled` and have sharing rules defined using either the with sharing, without sharing, or inherited sharing modifiers. See [Use the with sharing, without sharing, and inherited sharing Keywords](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_keywords_sharing.htm).

Apex classes from installed managed packages don't qualify. The Apex code inside a managed package remains inaccessible, even if declared global.

## Set Up Your Salesforce DX Project

If this is your first time working in the VS Code IDE, check out the documentation for [Salesforce Extensions for Visual Studio Code](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/vscode-overview.html) and [Agentforce Vibes IDE](https://developer.salesforce.com/docs/platform/code-builder/guide/codebuilder-overview.html). You will also need to install the [Salesforce Command Line Interface (CLI)](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm). If you already have the Salesforce CLI installed, make sure to update it with the `sf update` command.

-   See [Create Project](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/create-project.html) to get set up with a new Salesforce DX project.
-   See [Create a Project from a Repository](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/create-project.html#create-a-project-from-a-repository), if you have a Salesforce DX project in a GitHub repo that you want to use.

## Decompose Your External Service Registrations

Decomposing [External Service Registration](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_externalserviceregistration.htm) (ESR) files makes them easier to work with because you can edit the OpenAPI v3 specification in a YAML editor in the VS Code IDE. To decompose your ESR metadata into YAML and metadata XML files, run `sf project convert source-behavior -b decomposeExternalServiceRegistrationBeta` in the command line to decompose existing ESR metadata files. New ESR files will be automatically decomposed upon generation. This command updates the `sfdx-project.json` file in your project to include the following:

```text
"sourceBehaviorOptions": [ "decomposeExternalServiceRegistrationBeta" ]
```

When deploying the decomposed ESR to the org, the ESR metadata type data is reconstructed into a single record by embedding the YAML contents into the metadata XML.

## Log In to Your Salesforce Org

Your AI AppDev org comes ready for Salesforce development. Salesforce Extensions for VS Code and Agentforce Vibes IDE run commands against this org. Connect to this org and then bring your Apex REST classes into your Salesforce IDE to generate your OAS. See [Change or Open your Default Org](https://developer.salesforce.com/docs/platform/sfvscode-extensions/guide/default-org.html) to learn more about connecting to a Salesforce org.