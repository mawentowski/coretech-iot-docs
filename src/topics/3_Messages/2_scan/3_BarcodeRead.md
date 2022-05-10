## BarcodeRead

This message is received on the service bus for an LSR scan.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | scan                    |
| MessageType         | string | M | BarcodeRead        |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | M | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*|

### Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| BarCodeData| string| A string containing the barcode.  |    
| BarCodeType| string| Contains the bar code type(see below)  | 

#### Bar Code Type
| Type | Description |
|--|--|
| 1 | 1D Code Interleaved 2 of 5 |
| 3 | 1D Code 39 |
| 4 | 1D Data Matrix |
| 5 | 2D QR |
| 6 | 2D PDF417 |
| 7 | 1D Code 128 with check digit |
| 8 | 1D Code 39 with check digit |
| 0 | 1D Interleaved 2 of 5 with check digit |

**Message Body Sample Success JSON**
```JSON 
{
    "BarCodeData": "0000123456789", 
    "BarCodeType": "1"    
}