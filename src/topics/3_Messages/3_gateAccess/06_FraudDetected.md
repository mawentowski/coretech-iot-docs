## FraudDetected
Message containing the details of a fraud alert sent from the self boarding gate device.

### Message Properties

User properties are used to aid in the deserialization of the service bus messages.  These properties can be read from the service bus message and used to determine how to deserialize the message body.

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | gate                    |
| MessageType         | string | M | FraudDetected           |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | O | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*         |


### Message Body

#### Base Message Body

| Field       | Type        | Description                               |
|-------------|-------------|-------------------------------------------|
| ErrorCode   | string      | Contains the fraud error code (see below) |

**Example FraudDetected JSON Message**

```JSON 
{
    "ErrorCode": "PassengerBoardingSidewise",
}
```

##### Fraud Error Codes
| Error Code                           | Description                         |
|--------------------------------------|-------------------------------------|
| PassengerBoardingSidewise            | FRXS = Passenger boarded without boarding authorisation sidewise |
| PassengerBoardedWithoutAuthorization | FRXX = Passenger boarded without boarding authorisation |
| PassengerCrawledUnderGate            | FRXU = Passenger boarded without boarding authorisation crawling under |
| PassengerEnteredOppositeSide         | FRXJ = Passenger entered from opposite side without boarding authorization and passing to the entrance side (jumping over) |
| PassengerJumpedOverGateParameter | FRXO = Other person jumped over from opposite side |
| UnknownFraudDetected                 | An unknown error was received |
