## DoorClosing

Message to indicate the bagdrop door is closing.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | bagdrop                 |
| MessageType         | string | M | DoorClosing             |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | M | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*         |

### Message Body
```
No Message Body
```