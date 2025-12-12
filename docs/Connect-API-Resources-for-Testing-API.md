# Connect API Resources for Testing API

The Connect API endpoints for Testing API execute test cases, poll for results, and programmatically retrieve detailed test results.

## Start Test

Start a test asynchronously based on the provided AiEvaluationDefinition name or ID. This endpoint schedules the test and returns an identifier to track its progress. OAuth 2.0 with a connected app is required. See the [Connect REST API Quick Start](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/quickstart.htm).

### Resource

```text
/services/data/v63.0/einstein/ai-evaluations/runs
```

#### HTTP Methods

`POST`

### Request

#### Headers

```bash
{
"Content-Type": "application/json",
"Authorization": "Bearer "
}
```

#### Parameters

```bash
{
"aiEvaluationDefinitionName": ""
}
```

The API enforces that exactly one of the two parameters is provided. If no parameters or multiple parameters are provided, the API returns a `400 Bad Request` response code with an empty error message.

| Parameter Name | Type | Description |
| :-- | :-- | :-- |
| `aiEvaluationDefinitionName` | string | Required. The name (`DeveloperName`) of the test definition to start. |

### Response

HTTP response code: 200

```json
{
  "runId": "",
  "status": ""
}
```

| Parameter Name | Type | Description |
| :-- | :-- | :-- |
| `runId` | string | The unique ID of the test that started. |

## Get Test Status

Retrieves the operational status of a specified test. We designed this endpoint to poll to monitor the progress of a test.

### Resource

```text
/einstein/ai-evaluations/runs/:runId
```

#### HTTP Methods

`GET`

### Request

#### Headers

```bash
{
"Authorization": "Bearer "
}
```

#### Parameters

| Parameter Name | Type | Description |
| :-- | :-- | :-- |
| `runId` | string | Required. The unique identifier for the test. |

### Response

```json
{
  "status": "",
  "startTime": "",
  "endTime": "",
  "errorMessage": ""
}
```

| Parameter Name | Type | Description |
| :-- | :-- | :-- |
| `status` | enum | 
-   NEW: The test was created but not yet started.
-   IN\_PROGRESS: The test is currently executing.
-   COMPLETED: The test finished successfully.
-   ERROR: At least one test case encountered an operational error.

 |
| `startTime` | ISO 8601 timestamp | The timestamp indicating when the test started. |
| `endTime` | ISO 8601 timestamp | The timestamp indicating when the test ended. `endTime` is null if the test hasn't ended yet. |
| `errorMessage` | string | The details of the error if the status is ERROR. `errorMessage` is empty if no error occurred. |

## Get Test Results

Retrieve a detailed report of a test, including information on each test case and the results of all predetermined expectations.

### Resource

```text
/einstein/ai-evaluations/runs/:runId/results
```

#### HTTP Methods

`GET`

### Request

#### Headers

```bash
{
"Authorization": "Bearer "
}
```

#### Parameters

| Parameter Name | Type | Description |
| :-- | :-- | :-- |
| `runId` | string | Required. The unique identifier of the test. |

### Response

```json
{
  "status": "",
  "subjectName": "",
  "startTime": "",
  "endTime": "",
  "errorMessage": "",
  "testCases": [
    {
      "status": "",
      "testNumber": "",
      "startTime": "",
      "endTime": "",
      "errorMessage": "",
      "inputs": {
        "utterance": ""
      },
      "generatedData": {
        "actionsSequence": "",
        "outcome": "",
        "topic": ""
      },
      "testResults": [
        {
          "name": "",
          "actualValue": "",
          "expectedValue": "",
          "metricScore": "",
          "metricLabel": "",
          "metricExplainability": "",
          "status": "",
          "startTime": "",
          "endTime": "",
          "errorCode": "",
          "errorMessage": ""
        }
      ]
    }
  ]
}
```

#### Response Object

| Parameter Name | Type | Description |
| :-- | :-- | :-- |
| `status` | enum | 
-   NEW: The test was created but not yet started.
-   IN\_PROGRESS: The test is currently executing.
-   COMPLETED: The test finished successfully.
-   ERROR: At least one test case encountered an operational error.

 |
| `startTime` | ISO 8601 timestamp | The timestamp indicating when the test started. |
| `endTime` | ISO 8601 timestamp | The timestamp indicating when the test ended. `endTime` is null if the test hasn't ended yet. |
| `errorMessage` | string | The details of the error if the status is ERROR. `errorMessage` is empty if no error occurred. |
| `testCases` | TestCaseObject | Represents the test cases being evaluated. |

#### testCase Object

| Parameter Name | Type | Description |
| :-- | :-- | :-- |
| status | enum | 
-   NEW: The test has been created but not yet started.
-   IN\_PROGRESS: The test is currently executing.
-   COMPLETED: The test finished successfully.
-   ERROR: At least one test case encountered an operational error.

 |
| testNumber | integer | The number of the test case. |
| subjectName | string | A unique identifier for the subject. This should be the `DeveloperName` of the `AiEvalDefinition` entity. |
| startTime | ISO 8601 timestamp | The timestamp indicating when the test started. |
| endTime | ISO 8601 timestamp | The timestamp indicating when the test ended. `endTime` is null if the test hasn't ended yet. |
| errorMessage | string | Details of the error if the status is ERROR. `errorMessage` is empty if no error occurred. |
| inputs | InputsObject | Represents the inputs sent to the agent. |
| generatedData | GeneratedDataObject | Represents the data that was generated by the subject during the test and was used to evaluate the expectations. |
| testResults | array\[TestResultObject\] | Includes the results of each test. |

#### inputs Object

| Parameter Name | Type | Description |
| :-- | :-- | :-- |
| utterance | string | The utterance sent to the agent. |

#### generatedData Object

| Parameter Name | Type | Description |
| :-- | :-- | :-- |
| actionsSequence | array\[string\] | A sequence of actions performed during the test. |
| outcome | string | The response of the subject under test. |
| topic | string | The topic used by the subject during testing. |

#### testResult Object

| Parameter Name | Type | Description |
| :-- | :-- | :-- |
| name | string | The name of the test metric. |
| actualValue | string | The actual value obtained during the test. |
| expectedValue | string | The expected value for the metric. |
| metricScore | enum | The outcome for the metric. Values: `PASS`, `FAILED`. For `instruction_adherence` only: `HIGH`, `LOW`, `UNCERTAIN`. |
| metricLabel | string | The metric name. |
| metricExplainability | string | A detailed explanation of the metric's purpose and test criteria. |
| metricType | string | The name of the test metric. |
| status | string | 
-   NEW: The test has been created but not yet started
-   IN\_PROGRESS: The test is currently executing
-   COMPLETED: The test finished successfully
-   ERROR: At least one test case encountered an operational error

 |
| startTime | ISO 8601 timestamp | The timestamp when the test of this metric started. |
| endTime | ISO 8601 timestamp | The timestamp when the test of this metric ended. |
| errorCode | string or null | The error code if an error occurred during the test; otherwise, null. |
| errorMessage | string or null | A detailed error message if an error occurred during the test; otherwise, null. |