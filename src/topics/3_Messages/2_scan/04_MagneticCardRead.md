## MagneticCardRead

This message is received on the service bus for an MSR scan.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | scan                    |
| MessageType         | string | M | MagneticCardRead        |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | M | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*|

### Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| CardType     | string | [PaymentCard, OtherCard]  |    
| Track1       | string | Track 1 data  | 
| Track2       | string | Track 2 data  | 
| Track3       | string | Track 3 data  | 
| Track4       | string | Track 4 data  | 

**Message Body Sample Success JSON**
```JSON 
{
    "CardType": "OtherCard",
    "Track1": "B3763 096665 01003^DANAISAWAT/K              ^0112981215164",
    "Track2": "376309666501003=0112981215164",
    "Track3": "12217124111741=99999999000",
    "Track4": ""
}
```