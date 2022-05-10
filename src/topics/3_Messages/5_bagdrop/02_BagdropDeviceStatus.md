## BagdropDeviceStatus

Message to indicate a change in the device status.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | bagdrop|
| MessageType         | string | M | BagdropDeviceStatus |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | M | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*|

### Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| DeviceStatus| string | Online, Offline, PowerOff, UnderMaintenance |    
| DeviceInUse | boolean | True, False |    

**Message Body Sample Success JSON**

```JSON 
{
  "DeviceInUse":true,
  "DeviceStatus":"Online"
}
```