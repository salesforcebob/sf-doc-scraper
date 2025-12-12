# SalesforceAsyncImage

`@Composable fun SalesforceAsyncImage`

Salesforce Coil's AsyncImage

## Function

```kotlin
@Composable
fun SalesforceAsyncImage(
    data: Any?,
    @DrawableRes placeHolderDrawableResId: Int = 0,
    @DrawableRes errorDrawableResId: Int = 0,
    @DrawableRes fallbackDrawableResId: Int = 0,
    contentScale: ContentScale = ContentScale.Fit,
    imageContentDescription: String? = null,
    tintColor: Color? = null,
    modifier: Modifier = Modifier
)
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `data` | `Any?` | Set the data to load. The default supported data types are: String (mapped to a Uri), Uri, HttpUrl, File, DrawableRes, Drawable, Bitmap, ByteArray, ByteBuffer |
| `placeHolderDrawableResId` | `Int` | Set the placeholder drawable to use when the request starts |
| `errorDrawableResId` | `Int` | Set the error drawable to use if the request fails |
| `fallbackDrawableResId` | `Int` | Set the fallback drawable to use if data is null |
| `contentScale` | `ContentScale` | Optional scale parameter used to determine the aspect ratio scaling to be used if the bounds are a different size from the intrinsic size of the AsyncImagePainter |
| `imageContentDescription` | `String?` | ContentDescription for the AsyncImage |
| `tintColor` | `Color?` | Tint color for the AsyncImage |
| `modifier` | `Modifier` | Modifier for the compose view |

## Related Documentation

-   [AgentforceAttachment](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-attachment-android.html)
-   [AgentforceMessage](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-message-android.html)
-   [AgentforceConversation](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-android.html)