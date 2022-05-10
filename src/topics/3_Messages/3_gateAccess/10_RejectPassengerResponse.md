## RejectPassengerResponse

The response to the RejectPassenger API call.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | gate                    |
| MessageType         | string | M | RejectPassengerResponse |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | O | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*|

### Message Body
#### Base Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| IsSuccess    | Boolean                  | Indicates whether request was successful|
| Error        | [GateError](#GateError)  | Contains the error fields               |

##### GateError

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| ErrorCode    | String                   | NotAbleToRejectPassenger                |
| Message      | String                   | Additional information as to the reason for the error |

**Message Body Sample Success JSON**
```JSON 
{
    "IsSuccess":true,
    "Error": null
}
```
**Message Body Sample Failure JSON**
```JSON 
{
    "IsSuccess":false,
    "Error": {
        "ErrorCode": "NotAbleToRejectPassenger",
        "Message": "Contains error message"
    }
}