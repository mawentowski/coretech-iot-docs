## ErrorOccurred

Used for generic error messages that do not fit one of the other error types.

### Message Properties

User properties are used to aid in the deserialization of the service bus messages.  These properties can be read from the service bus message and used to determine how to deserialize the message body.

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | gate                    |
| MessageType         | string | M | ErrorOccurred           |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | O | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*         |


### Message Body

#### ErrorOccurred

| Field       | Type        | Description                                        |
|-------------|-------------|----------------------------------------------------|
| Message     | string      | Generic error message                              |

**Example ErrorOccurred JSON Message**

```JSON 
{
    "Message": "UnknownError",
}
```