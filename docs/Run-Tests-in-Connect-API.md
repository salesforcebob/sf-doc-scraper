# Run Tests in Connect API

The Connect API endpoints for Testing API focus on executing test cases, polling for results, and programmatically retrieving detailed test results.

The Testing Connect API has three endpoints:

-   **Start Test**: Starts an asynchronous test on an agent. The test evaluates predesigned test cases that are deployed via Metadata API or the Testing Center.
-   **Get Test Status**: Retrieves the operational status of a specific test. We designed this endpoint to poll to monitor the progress of a test.
-   **Get Test Results**: Retrieves a detailed report of a test, including information on each test case and the results of all predetermined expectations.

> **Note:**
> 
> To use Salesforce CLI to run agent tests instead of directly using Connect API, see [Run the Agent Tests with Agentforce DX](/docs/einstein/genai/guide/agent-dx-test-run.html).

## Prerequisites

To successfully test your agents, you need predefined test cases in metadata files or generated tests from the Testing Center. Review Metadata API test definitions in [Metadata API Reference](/docs/einstein/genai/references/testing-api/testing-metadata-reference.html). To call Testing API endpoints in Connect API, you first need to create a connected app and create a token.

## Create a Salesforce App

To securely use Connect API endpoints for Testing API, you must create an [External Client App (ECA)](https://help.salesforce.com/s/articleView?id=xcloud.external_client_apps.htm&type=5) or a [Connected App](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_overview.htm&type=5).

Create an external client app with OAuth and JWT enabled. Use these instructions to get set up: [Create a Local External Client App](https://help.salesforce.com/s/articleView?id=xcloud.create_a_local_external_client_app.htm&type=5)

When creating the app, include these settings.

1.  Use these OAuth Scopes:
    
    -   **Access Connect REST API Resources (chatter\_api)**
    -   **Manage user data via APIs (api)**
    -   **Manage user data via Web browsers (web)**
    -   **Perform requests at any time (refresh\_token, offline\_access)**
    
    ![OAuth scopes settings](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/testing-eca-oauth.png)
    
2.  Select these additional OAuth settings:
    
    -   **Enable Client Credentials Flow**
    -   **Issue JSON Web Token (JWT)-based access tokens for named users**
    
    ![OAuth flow and security settings](https://a.sfdcstatic.com/developer-website/sfdocs/genai/media/testing-eca-oauth-flow.png)
    
    -   For more information on OAuth settings and security, see [Configure the External Client App OAuth Settings](https://help.salesforce.com/s/articleView?id=xcloud.configure_external_client_app_oauth_settings.htm&language=en_US&type=5).
3.  After creating the app, ensure that the API caller has the correct client credentials and that the client can issue JWT-based access tokens.
    
    -   Click the **Policies** tab for the app, and then click **Edit**.
    -   Select the **Enable Client Credentials Flow** checkbox.
    -   Specify the client user in the **Run As** field.
    -   Select the **Issue JSON Web Token (JWT)-based access tokens** checkbox. By default, this token expires in 30 minutes. You can change this value to less than 30 minutes.

## Obtain Credentials

To create a token, you need the consumer key and the consumer secret from your ECA.

1.  From Setup, find and select **External Client Apps**.
    
2.  Select your app and click the **Settings** tab.
    
3.  Expand the **OAuth Settings** section.
    
4.  Click the **Consumer Key and Consumer Secret** button, and copy your secrets. You need these values to mint this token.
    
    Store your consumer secret in a secure location.
    
5.  From Setup, in the Quick Find box, enter `My Domain`, and then select **My Domain**.
    
6.  Copy the value shown in the **Current My Domain URL** field.
    
7.  Request a JWT from Salesforce using a POST request, specifying the values for your consumer key, consumer secret, and domain name.
    

## Create a Token

All calls to Testing API require a token. Create a token by using the consumer key, the consumer secret, and your domain name.

```bash
curl -X POST https://{MY_DOMAIN_URL}/services/oauth2/token
-d 'grant_type=client_credentials'
-d 'client_id={CONSUMER_KEY}'
-d 'client_secret={CONSUMER_SECRET}'
```

-   `MY_DOMAIN_URL`: Get the domain from Setup by searching for **My Domain**. Copy the value shown in the **Current My Domain URL** field.
-   `CONSUMER_KEY`, `CONSUMER_SECRET`: Get the consumer key and secret by following the instructions in [Obtain Credentials](#obtain-credentials).

The previous cURL request returns a JSON payload similar to this response.

```json
{
  "access_token": "eyJ0bmsiOiJ...(shortened)",
  "signature": "Zzf2V4jNqOtyYIeotqXNRfKRMmLsFvRwQda+fdgpmH8=",
  "token_format": "jwt",
  "scope": "chatter_api api",
  "instance_url": "https://instance_name.my.salesforce.com",
  "id": "https://login.test1.pc-rnd.salesforce.com/id/00DSG00000KcODt2AN/005SG00000GiUcHYAV",
  "token_type": "Bearer",
  "issued_at": "1737590384852"
}
```

Copy the access token specified in the `access_token` property. This token is required when you make requests to the API. Congratulations! The Testing Connect API is now ready for use. Review [Connect API Reference](/docs/einstein/genai/references/testing-api/testing-connect-reference.html) to familiarize yourself with required headers, parameters, and response objects.

## Call the API

After you complete the setup steps and use Metadata API to deploy your tests, run your tests by using these three Connect API endpoints:

-   Start Test: `POST …/einstein/ai-evaluations/runs`
-   Get Test Status: `GET …/einstein/ai-evaluations/runs/:runId`
-   Get Test Results: `GET …/einstein/ai-evaluations/runs/:runId/results`

To learn how to use Connect API, see [Connect REST API Quick Start](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/quickstart.htm).

To start a test, make a POST request to `/services/data/v63.0/einstein/ai-evaluations/runs`. Provide the name of the test definition (specified in the metadata component) in the body of the request. See [Start Test](/docs/einstein/genai/references/testing-api/testing-connect-reference.html#start-test).

```bash
curl -X POST https://{INSTANCE_NAME}.my.salesforce.com/services/data/v63.0/einstein/ai-evaluations/runs/
     -H "Content-Type: application/json"
     -H "Authorization: Bearer {TOKEN}"
     -d '{
           "aiEvaluationDefinitionName": "{TEST_NAME}",
         }'
```

-   `INSTANCE_NAME`: The instance of your Salesforce org.
-   `TOKEN`: The access token obtained from [Create a Token](#create-a-token).
-   `TEST_NAME`: The name of the test to start.

The response returns an evaluation ID that you can use to check the status of the test and the test results.

```json
{
  "runId": "4KBSM00000000Xt4AI",
  "status": "NEW"
}
```

To check the test status, make a GET request to `/services/data/v63.0/einstein/ai-evaluations/runs/{runId}`

The response provides information about the test. See [Get Test Status](/docs/einstein/genai/references/testing-api/testing-connect-reference.html#get-test-status).

```json
{
  "status": "COMPLETED",
  "startTime": "2024-11-26T10:00:00Z",
  "endTime": "2024-11-26T10:30:00Z",
  "errorMessage": ""
}
```

After the test is completed, make a GET request to `/services/data/v63.0/einstein/ai-evaluations/runs/{runId}/results`

The response contains the results of the test. See [Get Test Results](/docs/einstein/genai/references/testing-api/testing-connect-reference.html#get-test-results).

```json
{
  "status": "COMPLETED",
  "subjectName": "developer_name",
  "startTime": "2024-11-28T12:00:00Z",
  "endTime": "2024-11-28T12:05:00Z",
  "errorMessage": null,
  "testCases": [
    {
      "status": "COMPLETED",
      "testNumber": 1,
      "startTime": "2024-11-28T12:00:10Z",
      "endTime": "2024-11-28T12:00:20Z",
      "inputs": {
        "utterance": "Input used to run the agent"
      },
      "generatedData": {
        "actionsSequence": ["Action1", "Action2"],
        "outcome": "Agent response",
        "topic": "AnswerQuestionsWithKnowledge"
      },
      "testResults": [
        {
          "name": "topic_sequence_match",
          "actualValue": "Result A",
          "expectedValue": "Result A",
          "metricScore": "PASS",
          "metricLabel": "Label",
          "metricExplainability": "Measures the correctness of the result",
          "status": "COMPLETED",
          "startTime": "2024-11-28T12:00:12Z",
          "endTime": "2024-11-28T12:00:13Z",
          "errorCode": null,
          "errorMessage": null
        },
        {
          "name": "action_sequence_match",
          "actualValue": "Result B",
          "expectedValue": "Result B",
          "metricScore": "PASS",
          "metricLabel": "Label",
          "metricExplainability": "Measures the correctness of the result",
          "status": "COMPLETED",
          "startTime": "2024-11-28T12:00:14Z",
          "endTime": "2024-11-28T12:00:15Z",
          "errorCode": null,
          "errorMessage": null
        }
      ]
    },
    {
      "status": "ERROR",
      "testNumber": 2,
      "startTime": "2024-11-28T12:00:30Z",
      "endTime": "2024-11-28T12:00:40Z",
      "generatedData": {},
      "errorMessage": "Error message",
      "testResults": [
        {
          "name": "topic_sequence_match",
          "metricScore": "FAILED",
          "status": "COMPLETED",
          "startTime": "2024-11-28T12:00:32Z",
          "endTime": "2024-11-28T12:00:33Z",
          "errorCode": 1,
          "errorMessage": "Error Message"
        }
      ]
    }
  ]
}
```

### Understand the Agent Test Results

See [Use Test Results to Improve Your Agent](/docs/einstein/genai/guide/testing-api-use-results.html).

## See Also

-   [Connect API Reference](/docs/einstein/genai/references/testing-api/testing-connect-reference.html)
-   [AiEvaluationDefinition Reference](/docs/einstein/genai/references/testing-api/testing-metadata-reference.html)
-   [Build Tests in Metadata API](/docs/einstein/genai/guide/testing-api-build-tests.html)