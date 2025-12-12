# AgentforceSDKError

```kotlin
sealed class AgentforceSDKError : Exception
```

## Properties

| Property | Type | Mutability | Description |
| --- | --- | --- | --- |
| cause | Throwable? | val | Exception cause |
| message | String? | val | Exception message |

## Functions

| Function | Signature | Description |
| --- | --- | --- |
| addSuppressed | `fun addSuppressed(Throwable): Unit` |  |
| fillInStackTrace | `open fun fillInStackTrace(): Throwable` |  |
| getLocalizedMessage | `open fun getLocalizedMessage(): String` |  |
| getStackTrace | `open fun getStackTrace(): Array<StackTraceElement>` |  |
| getSuppressed | `fun getSuppressed(): Array<Throwable>` |  |
| initCause | `open fun initCause(Throwable): Throwable` |  |
| printStackTrace | `open fun printStackTrace(): Unit` |  |
| printStackTrace | `open fun printStackTrace(PrintStream): Unit` |  |
| printStackTrace | `open fun printStackTrace(PrintWriter): Unit` |  |
| setStackTrace | `open fun setStackTrace(Array<StackTraceElement>): Unit` |  |

## Nested Classes

-   `AgentforceSDKError.NoAgentConfigured`
-   `AgentforceSDKError.UnableToStartASession`

## Inherited Functions

-   clone, equals, finalize, getClass, hashCode, notify, notifyAll, toString, wait, wait, wait