# Text Input Components

Android Compose components for text input in Agentforce conversations.

## SalesforceTextInput

`@Composable fun SalesforceTextInput`

Used for general purpose data entry. Repurposed from a patterns component.

> **Note:**
> 
> **State Management**: It is crucial that the value provided in the `onValueChange` callback is fed back into the component in order to have the final state of the text being displayed.
> 
> **Anti-Pattern Warning**: While `onValueChange` is useful to be informed about the latest state of the text input by users, it is generally not recommended to modify the value that you get via `onValueChange` callback. Any change to this value may result in a context reset and end up with input session restart. Such a scenario would cause glitches in the UI or text input experience for users.
> 
> **Visual Transformation**: In order to create formatted text fields, for example for entering a phone number or a social security number, use the `visualTransformation` parameter.

### Signature

```kotlin
@Composable
fun SalesforceTextInput(
    modifier: Modifier = Modifier,
    value: TextFieldValue,
    onValueChange: (TextFieldValue) -> Unit = {},
    onClearClicked: () -> Unit = {},
    label: String?,
    enabled: Boolean = true,
    readOnly: Boolean = false,
    isRequired: Boolean = false,
    visualTransformation: VisualTransformation = VisualTransformation.None,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    keyboardActions: KeyboardActions = KeyboardActions.Default,
    singleLine: Boolean = true,
    maxLines: Int = 1,
    interactionSource: MutableInteractionSource = remember { MutableInteractionSource() },
    focusRequester: FocusRequester = FocusRequester(),
    labelTextStyle: TextStyle = TextStyles.InputText,
    textStyle: TextStyle = TextStyles.InputText.copy(color = LocalAgentforceTheme.current.colors().onSurface1)
)
```

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| enabled | Boolean | Controls the enabled state of the text field. When false, the text field will be neither editable nor focusable, the input of the text field will not be selectable (default: true) |
| focusRequester | FocusRequester | Used to open the IME and/or switch the cursor to this component |
| interactionSource | MutableInteractionSource | The MutableInteractionSource representing the stream of Interactions for this TextField. You can create and pass in your own remembered MutableInteractionSource if you want to observe Interactions and customize the appearance/behavior of this TextField in different Interactions |
| isRequired | Boolean | Indicates if this text input is required to be non-empty. Places a "\*" next to the label (default: false) |
| keyboardActions | KeyboardActions | When the input service emits an IME action, the corresponding callback is called. Note that this IME action may be different from what you specified in KeyboardOptions.imeAction |
| keyboardOptions | KeyboardOptions | Software keyboard options that contains configuration such as KeyboardType and ImeAction |
| label | String? | A String that is displayed above the text input |
| labelTextStyle | TextStyle | TextStyle applied to the label. Defaults to TextStyles.InputText |
| maxLines | Int | The maximum height in terms of maximum number of visible lines. Should be equal or greater than 1. Note that this parameter will be ignored and instead maxLines will be set to 1 if singleLine is set to true (default: 1) |
| modifier | Modifier | Optional Modifier for this text field |
| onClearClicked | () -> Unit | Callback triggered when clear button is clicked |
| onValueChange | (TextFieldValue) -> Unit | The callback that is triggered when the input service updates the text. An updated text comes as a parameter of the callback |
| readOnly | Boolean | Controls the editable state of the text field. When true, the text field can not be modified, however, a user can focus it and copy text from it. Read-only text fields are usually used to display pre-filled forms that user can not edit (default: false) |
| singleLine | Boolean | When set to true, this text field becomes a single horizontally scrolling text field instead of wrapping onto multiple lines. The keyboard will be informed to not show the return key as the ImeAction. Note that maxLines parameter will be ignored as the maxLines attribute will be automatically set to 1 (default: true) |
| textStyle | TextStyle | TextStyle applied to the text. Defaults to TextStyles.InputText |
| value | TextFieldValue | The input TextFieldValue with text to be shown in the text field |
| visualTransformation | VisualTransformation | The visual transformation filter for changing the visual representation of the input. By default no visual transformation is applied |

## SalesforceModalInputField

`@Composable fun SalesforceModalInputField`

Used to represent the input field for data that will open a modal bottom sheet to let the user input something.

Whenever the user taps to add something into the field, it will trigger a modal bottom sheet to show up. The value of the field will always be a string representation.

### Signature

```kotlin
@Composable
fun SalesforceModalInputField(
    modifier: Modifier = Modifier,
    @DrawableRes icon: Int,
    label: String? = null,
    value: String = "",
    isRequired: Boolean = false,
    enabled: Boolean = true,
    showModalInput: () -> Unit,
    clearValue: () -> Unit
)
```

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| clearValue | () -> Unit | Allows the user to clear the value when tapping the cross icon |
| enabled | Boolean | Controls the enabled state of the field (default: true) |
| icon | Int | The icon that shows up in the default case when the input's value is empty |
| isRequired | Boolean | Indicates if this field can be left empty (default: false) |
| label | String? | The label for the field (default: null) |
| modifier | Modifier | Optional Modifier for this component |
| showModalInput | () -> Unit | Helps trigger the modal that will show the mechanism for user input |
| value | String | The value of the field as a String representation (default: "") |

## Related Documentation

-   [AgentforceThemeManager](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-theme-manager-android.html)
-   [AgentforceColors](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-colors-android.html)
-   [AgentforceConversation](/docs/einstein/genai/references/agentforce-mobile-sdk/agentforce-conversation-android.html)