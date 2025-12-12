# Considerations for the Testing API

Review these considerations before you use Testing API.

## Einstein Requests Usage

Einstein Requests is a usage metric for generative AI. The use of generative AI capabilities, in either a production or sandbox environment, consumes Einstein Requests credits and possibly Data 360 credits. See [Generative AI Billable Usage Types](https://help.salesforce.com/s/articleView?id=ai.generative_ai_usage.htm&type=5).

## In-Progress Run Limit

You can have up to 10 `IN-PROGRESS` runs at any time.

## Maximum Test Cases in AiEvaluationDefinition

In an `AiEvaluationDefinition` component in Metadata API, the maximum number of test cases is 1,000.

## Test Results May Change When Rerun

Because of continuous improvements to the testing service, sometimes test results may change.