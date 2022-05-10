## ScanDeviceStatus

This message is received on the service bus for the status of a scanning device for a particular connection.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | scan                    |
| MessageType         | string | M | ScanDeviceStatus|
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | M | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*|

### Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| DeviceStatus | string                   | [PoweredOff, Offline, Online]  |    
| DeviceInUse  | boolean                  | True, False  | 

**Message Body Sample Success JSON**
```JSON 
{ 
    "DeviceStatus": "Online",
    "DeviceInUse": true
}
```