## ErrorOccurred

Message for generic error situations not covered by other messages directly.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | print                    |
| MessageType         | string | M | ErrorOccurred|
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | M | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*|

### Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| Message| string| Error Message  |    

**Message Body Sample Success JSON**
```JSON 
{
    "Message": "PrintNotOk"
}
```