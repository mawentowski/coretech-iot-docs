## StatusChanged

Message to indicate a change in the device status.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | bagdrop|
| MessageType         | string | M | StatusChanged |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | M | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*|

### Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| DeviceStatus| string| PoweredOff, Offline, Online, UnderMaintenance |    
| BagDropStatus| [BagDropStatus](#BagDropStatus)| See Below  |

#### BagDropStatus

|BagDropStatus|
|--|
|Normal|
|TechnicalError|
|UnknownError|
|IntrusionDetected|
|BagDetectedInEntryPoint|
|BagJammedInSbd|
|BagInHoldingArea|
|BagInProcessingArea|
| BagRemovedUnexpectedly|,    
|BagUnexpectedlyDetectedInRear|,
|DoorStoppedForBlockage|,   
| DoorStartedAfterBlockage|,
|BhsOffline|,
 |BhsBusy|,
|EmergencyStopPressed|,
|BagWeightUnexpectedlyChanged|,

**Message Body Sample Success JSON**

```JSON 
{
   "DeviceStatus": "UnderMaintenance",
   "BagDropStatus": "Normal"
}
```

