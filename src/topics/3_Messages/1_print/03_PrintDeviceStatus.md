## PrintDeviceStatus

Message for when the status of a print device changes.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | print                    |
| MessageType         | string | M | PrintDeviceStatus        |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | M | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*|

### Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| DeviceStatus| string| PoweredOff, Offline, Online  |    
| MediaStatus| string| Device media status  | 
| BinStatus| string| Device bin status  | 

**Message Body Sample Success JSON**
```JSON 
{  
   "DeviceStatus": "Online",
   "MediaStatus": "Ok",
   "BinStatus": "Ok"
}