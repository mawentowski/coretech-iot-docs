## ProcessPaymentResponse

Response message to the ProcessPayment API request.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string   | M | payment                 |
| MessageType         | string   | M | ProcessPaymentResponse  |
| MessageVersion      | string   | M | 1                       |
| ConnectionId        | string   | M | *{connectionId}*        |
| CorrelationId       | string   | M | *{user_defined_string}* |
| DeviceId            | string   | M | *{deviceId}*            |
| Timestamp           | DateTime | M | *{timestamp}*           |

### Message Body
#### Base Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| IsSuccess    | Boolean                  | Indicates whether request was successful|
| Error        | [PaymentError](#PaymentError)  | Contains the error fields               |

##### PaymentError

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| ErrorCode    | String                   | See [ErrorCodes](#ErrorCodes)           |
| Message      | String                   | Contains the specific reason why the request failed |

**Message Body Sample Success JSON**
```
{
   "IsSuccess": true,
   "Error": null
}
```
**Message Body Sample Failure JSON**
```
{
   "IsSuccess": false,
   "Error": {
       "ErrorCode": "NO_RECEIPT_PRINTER",
       "Message": "Contains error message"
   }
}
```

###### ErrorCodes
| Error Code | Description  |
|--|--|
| NOT_ALLOWED | |
| MISSING_DEVICE  | |
| MISSING_DEVICE_COMMUNICATION  | |
| MISSING_TRANSACTION  | |
| ILLEGAL_STATE  | |
| MISSING_ITEM  | |
| CHANGED_SESSION  | |
| ILLEGAL_VALUE  | |
| INVALID_MESSAGE  | |
| INTERNAL_ERROR  | |
| BLOCKED_CARD_OR_APPLICATION  | |
| CARD_NOT_ACCEPTED  | |
| DEVICE_IN_USE  | |
| INVALID_TRANSACTION_PARAMETERS  | |
| NO_CARD_READERS  | |
| NO_RECEIPT_PRINTER  | |
| RECEIPT_NOT_PRINTED  | |
| TIMED_OUT_WAITING_FOR_CARD  | |
| UNABLE_TO_GO_ONLINE  | |
| NO_ERROR  | |
