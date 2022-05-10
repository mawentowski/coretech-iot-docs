## BoardingPassData
Returns the barcode string from a scanned boarding pass

### Message Properties

User properties are used to aid in the deserialization of the service bus messages.  These properties can be read from the service bus message and used to determine how to deserialize the message body.

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | gate                    |
| MessageType         | string | M | BoardingPassData        |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | O | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*         |


### Message Body

| Field       | Type                     | Description                                   |
|-------------|--------------------------|-----------------------------------------------|
| BarcodeData | string                   | Base64 encoded string containing barcode data |

**Example BoardingPassData JSON Message**
```JSON 
{
    "BarcodeData":"Nk0xTExPWUQvSiBNUiBBQkNERUYgTUFOTEhSSUJBIDEyMzQgMTYzQzAxQQ==",
}
```
