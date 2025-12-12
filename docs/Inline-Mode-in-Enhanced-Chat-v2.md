# Inline Mode in Enhanced Chat v2

Enhanced Chat v2 supports two display modes: **floating** and **inline**.

-   **Floating (default mode)**: Floating mode represents a chat client that appears when the user clicks the Floating Action Button (FAB) located in the bottom-right corner of the screen.
-   **Inline**: Inline mode renders the chat client directly within a specified target `<div>` element on the parent page. This mode allows the chat interface to appear seamlessly within your site’s layout. Inline mode fills the entirety of the target element. Optionally, the chat header can be toggled on or off in inline mode.

> **Note:**
> 
> Inline mode is only available for Enhanced Chat v2 deployments. For more information, see [What’s Enhanced Chat v2?](https://help.salesforce.com/s/articleView?id=service.enhanced_chat_v2_intro.htm&type=5).

For detailed setup steps on Enhanced Chat APIs, see [Get Started with APIs for Enhanced Chat](https://developer.salesforce.com/docs/service/messaging-web/guide/api-overview.html).

## Enable Inline Mode

1.  From Setup, in the Quick Find box, enter `Embedded Service Deployments`, and select **Embedded Service Deployments**.
2.  Click **Code Snippet**.
3.  Add the code snippet to your web page where you will host the chat client.
4.  Update `displayMode` and disable the header if desired:

```javascript
embeddedservice_bootstrap.settings.displayMode = 'inline';
embeddedservice_bootstrap.settings.headerEnabled = false; // Optional
```

3.  Specify the target element where the chat client will be embedded:

```javascript
const myElement = document.querySelector('.chat-container');
embeddedservice_bootstrap.settings.targetElement = myElement;
```

## Configuration Troubleshooting

ECv2 validates your display mode and target element configuration. You may see console warnings if inline or floating modes are not configured correctly.

### Inline Mode Without Custom Target Element

If you receive a console warning that reads `displayMode is set to "inline" but targetElement is using the default (document.body). This will embed the chat into the entire page body`, you can use the example code to specify a custom container.

```javascript
const myElement = document.querySelector('.chat-container');
embeddedservice_bootstrap.settings.targetElement = myElement;
embeddedservice_bootstrap.settings.displayMode = 'inline';
```

### Floating Mode With Custom Target

If you receive a console warning that reads `targetElement is set to a custom element but displayMode is not set to "inline". In floating mode, the chat button will float within the specified container`, there are two potential solutions.

1.  Fully embed the chat by setting the mode to inline: `embeddedservice_bootstrap.settings.displayMode = 'inline';`.
2.  Allow the chat to float in the default location by removing the custom `targetElement` setting.