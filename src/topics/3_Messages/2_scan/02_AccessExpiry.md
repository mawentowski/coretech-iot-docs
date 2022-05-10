## AccessExpiry

This message is received on the service bus for the scan device access expiry time.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | scan                    |
| MessageType         | string | M | AccessExpiry            |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | M | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*|

### Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| AccessExpiryTime | DateTime | The access expiry time for the connection           |

**Message Body Sample Success JSON**
```JSON 
{     
    "AccessExpiryTime": "2021-06-15T14:56:40+00:00"
}
```