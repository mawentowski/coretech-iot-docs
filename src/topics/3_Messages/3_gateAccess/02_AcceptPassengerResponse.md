## AcceptPassengerResponse

The response to the AcceptPassenger API call.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | gate                    |
| MessageType         | string | M | AcceptPassengerResponse |
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
| ErrorCode    | String                   | NotAbleToAcceptPassenger                |
| Message      | String                   | Contains the specific reason why the request failed |

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
        "ErrorCode": "NotAbleToAcceptPassenger",
        "Message": "BoardingCancelledByPassenger"
    }
}
```
###### Error Messages

| Message | Description | 
|--|--|
| BoardingCancelledByPassenger | Boarding was cancelled by passenger leaving through the gate entrance |
| FraudErrorPassengerBoardedThenOnePassengerCrossedFromOppositeSide | One passenger boarded and one crossed from opposite side |
| FraudErrorPassengerBoardedThenReturnedToEntrance | One passenger boarded but then returned to the entrance |
| FraudErrorPassengerBoardedThenTwoPassengerCrossedFromOppositeSide | One passenger boarded and two crossed from opposite side |
| ReceiptPrintFailureBadDataCLFCodeNotFound | The receipt print command contained an unknown CLF code |
| ReceiptPrintFailureBadDataFont | The receipt print command contained an unknown font |
| ReceiptPrintFailureBadDataFontSize | The receipt print command contained an unsupported font size |
| ReceiptPrintFailurePaperJam | A receipt print was attempted but their was a paper jam |
| ReceiptPrintFailurePaperOut | A receipt print was attempted but the paper is out |
| ReceiptPrintFailurePrinterBusy | Receipt print failed due to technical issue |
| ReceiptPrintFailurePrinterMissing | Receipt print failed due to technical issue |
| ReceiptPrintFailurePrinterNotAvailable | Receipt print failed due to technical issue |
| ReceiptPrintFailurePrinterOffline | Receipt print failed due to technical issue |
| TailGateFraudOnePassengerBoarded | Tail gate fraud, 1 passenger boarded and 1 passenger returned |
| TailGateFraudTwoPassengersBoarded| Tail gate fraud, 2 passengers boarded at same time |
| TimedOutPassengerDidNotTakeReceipt |  A receipt was printed but the passenger did not take it in time |
| TimedOutPassengerDidNotWalkThroughGate | The passenger failed to pass through the gate in time | 
| TimedOutPassengerTookReceiptTooLate | A receipt was printed but the passenger took it too late |