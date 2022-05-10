## TransactionCompleted

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | payment                 |
| MessageType         | string | M | TransactionCompleted    |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *{connectionId}*        |
| CorrelationId       | string | M | *{user_defined_string}* |
| DeviceId            | string | M | *{deviceId}*            |
| Timestamp           | DateTime | M | *{timestamp}*         |

### Message Body
#### Base Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| ResultCode   | string                   | result received from the payment device |

**Message Body Sample Success JSON**
```
{
    "ResultCode" : "Approved"
}
```
