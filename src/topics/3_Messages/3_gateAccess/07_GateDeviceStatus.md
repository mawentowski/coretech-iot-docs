## GateDeviceStatus

This message conveys changes to the gate device status, such as power state etc.

### Message Properties

User properties are used to aid in the deserialization of the service bus messages.  These properties can be read from the service bus message and used to determine how to deserialize the message body.

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | gate                    |
| MessageType         | string | M | GateDeviceStatus        |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | O | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*         |


### Message Body

#### Base Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| DeviceStatus | string                   | PoweredOff, Offline, Online             |

**Example GateDeviceStatus JSON Message**
```JSON 
{
    "DeviceStatus": "PoweredOff"
}
```
