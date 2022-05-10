## PrintResponse

Response to any calls to the printing API endpoints.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | print                    |
| MessageType         | string | M | PrintResponse        |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | M | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*|

### Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| IsSuccess| boolean| True, False|    
| Error | Error | See Below  | 
| SuccessfulPrints | integer | No. of successful prints  | 

#### Error

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| ErrorCode| string | ErrorCodes (see below)|    
| Message| string | Print error message | 


##### ErrorCodes
| Error Code                      |
|---------------------------------|
| NotAbleToPrint|
| NotAbleToSetPectab| 
| NotAbleToSetLogo| 
|NotAbleToSetTemplate|

**Message Body Sample Success JSON**
```JSON 
{
  "IsSuccess": true,
  "Error": null,
  "SuccessfulPrints": "3"
}
```

**Message Body Sample Failure JSON**
```JSON 
{
   "IsSuccess": false,
   "Error":
    {
      "ErrorCode":"NotAbleToPrint",
      "Message":"PrintNotOk/UnSuccessfulPrint"
    },
    "SuccessfulPrints":"2"
}
```