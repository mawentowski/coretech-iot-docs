## PaymentDeviceStatus

Message to convey a change in status on the payment device.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | payment                    |
| MessageType         | string | M | PaymentDeviceStatus        |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *{connectionId}*        |
| CorrelationId       | string | M | *{user_defined_string}* |
| DeviceId            | string | M | *{deviceId}*            |
| Timestamp           | DateTime | M | *{timestamp}*|

### Message Body

#### Base Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| DeviceStatus | string                   | PoweredOff, Offline, Online             |
| DeviceInUse  | boolean                  | True, False                             | 

**Message Body Sample Success JSON**
```
{    
    "DeviceStatus": "PoweredOff",
    "DeviceInUse": false
}
```