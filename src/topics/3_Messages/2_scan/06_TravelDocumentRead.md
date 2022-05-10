## TravelDocumentRead

This message is received on the service bus for an OCR scan.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | scan                    |
| MessageType         | string | M | TravelDocumentRead        |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | M | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*|

### Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| MrzData      | string                   | Scanned passport data.                  |

**Message Body Sample Success JSON**
```JSON 
{   
    "MrzData": "P<D<<SCHMIDT<<KARL<HEINZ<<<<<<<<<<<<<<<<<<<<\r1234567897D<<0102030M0405063<<<<<<<<<<<<<<<8",     
}