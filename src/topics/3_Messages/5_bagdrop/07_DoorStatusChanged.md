## DoorStatusChanged

Message to indicate a change in the door status.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | bagdrop|
| MessageType         | string | M | DoorStatusChanged |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | M | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*|

### Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| DoorStatus | [DoorStatus](#DoorStatus)| See details below |    

#### DoorStatus

|DoorStatus|
|--|
|Open|
|Closed|
|PowerOff|
|Jammed|
|NotInstalled|
|IntrusionDetected|
|Unknown|

**Message Body Sample Success JSON**

```JSON 
{
   "DoorStatus": "Open"
}
```
