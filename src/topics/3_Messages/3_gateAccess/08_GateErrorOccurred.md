## GateErrorOccurred

Gate error message as received from the gate device.

### Message Properties

User properties are used to aid in the deserialization of the service bus messages.  These properties can be read from the service bus message and used to determine how to deserialize the message body.

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | gate                    |
| MessageType         | string | M | GateErrorOccurred       |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | O | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*         |


### Message Body

#### Base Message Body

| Field       | Type        | Description                                        |
|-------------|-------------|----------------------------------------------------|
| ErrorCode   | string      | Contains the gate technical error code (see below) |

**Example GateErrorOccurred JSON Message**

```JSON 
{
    "ErrorCode": "GateTechnicalErrorFlapRelated",
}
```
##### Gate Technical Error Codes
| Error Code                      | Description                         |
|---------------------------------|-------------------------------------|
| GateTechnicalErrorFlapRelated   | TEHF = A technical error happened in the “self-boarding unit” which requires technical assistance – flap related |
| GateTechnicalErrorSensorRelated | TEHS = A technical error happened in the “self-boarding unit” which requires technical assistance – sensor related |
| GateTechnicalErrorNotSpecified  | UNKN = Other error which is currently not specified |