## PaymentTransactionTimeout

A message to indicate the the payment transaction has timed out on the device.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | payment                    |
| MessageType         | string | M | PaymentTransactionTimeout        |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *{connectionId}*        |
| CorrelationId       | string | M | *{user_defined_string}* |
| DeviceId            | string | M | *{deviceId}*            |
| Timestamp           | DateTime | M | *{timestamp}*|

### Message Body

```
No Message Body
```