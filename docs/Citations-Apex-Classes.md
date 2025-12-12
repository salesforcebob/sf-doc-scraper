# Citations Apex Classes

This page contains the reference material for citations in Apex. For a guide on using these classes, see [Get Started with Citations Apex](/docs/einstein/genai/guide/citations.html). To generate inline citations via the Agent API, see [Agent API Examples](/docs/einstein/genai/guide/agent-api-examples.html).

## GenAiCitationInput

This class contains the data that an action returns to the Agentforce reasoning engine. The reasoning engine can then use this data if the citations service is called.

| Property | Type | Description |
| :-- | :-- | :-- |
| inputText | string | The data from the action. |
| sources | [GenAiSourceReference](#genaisourcereference) | The source information. |

### GenAiSourceReference

Represents a source of information for generating citations.

| Property | Type | Description |
| :-- | :-- | :-- |
| id | string | The ID of the source information. |
| contents | [GenAiSourceContentInfo](#genaisourcecontentinfo) | The content of the source information |
| metadata | [GenAiSourceReferenceInfo](#genaisourcereferenceinfo) | Metadata on the source information. |

#### GenAiSourceContentInfo

Represents specific content from a source that's being cited.

| Property | Type | Description |
| :-- | :-- | :-- |
| fieldName | string | Not required. The name of the field from the source. |
| objectName | string | Not required. The object that the source data originates from. |
| content | string | The data from the source. |

#### GenAiSourceReferenceInfo

Represents metadata for a source reference.

| Property | Type | Description |
| :-- | :-- | :-- |
| link | string | A link to the source content. |
| source\_object\_record\_id | string | The ID for the source object. |
| source\_object\_api\_name | string | The API name for the source. |
| label | string | The custom label for the source. |

## GenAiCitationOutput

This class enables actions to directly provide citations for responses without calling the citations service through the Agentforce reasoning engine. This class closely resembles the output of the citations service.

| Property | Type | Description |
| :-- | :-- | :-- |
| references | [GenAiCitedReference](#genaicitedreference) | The reference to a source. |

### GenAiCitedReference

Represents a citation or reference to a source.

| Property | Type | Description |
| :-- | :-- | :-- |
| metadata | [GenAiCitedReferenceInfo](#genaicitedreferenceinfo) | The metadata for a source. |

#### GenAiCitedReferenceInfo

Represents metadata for a cited reference.

| Property | Type | Description |
| :-- | :-- | :-- |
| link | string | A link to the cited source content. |
| source\_object\_record\_id | string | The ID for the source object. |
| source\_object\_api\_name | string | The API name for the source. |
| label | string | The custom label for the source. |