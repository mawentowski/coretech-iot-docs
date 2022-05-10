## BagResponse Messages

Standard format Bag Response messages received at stages of the bagdrop process.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | bagdrop                    |
| MessageType         | string | M | <a href="BagResponse Messages_1.htm#BagResponseMessageType">BagResponseMessageType</a> |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *connectionId*        |
| CorrelationId       | string | M | *user_defined_string* |
| DeviceId            | string | M | *deviceId*            |
| Timestamp           | DateTime | M | *timestamp*|

#### BagResponseMessageType

|MessageType|
|--|
|BagChanged|
|BagPlaced|
|BagRemoved|
|CancelBagResponse|
|GetBagResponse|
|ProcessBagResponse|
|ReleaseBagResponse|
|ReturnBagResponse|

### Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| Bag| [Bag](#Bag)| See details below |    
| IsSuccess| boolean | True, False |    
| Error| [Error](#Error)| See details below | 

#### Bag

 Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| Tags| string[] | See details below |    
| Weight | [Measurement](#Measurement) | see below |    
| Position | string | Position of the bag | 
| VolumeResult | [VolumeResult](#VolumeResult) | Volume of the bag |


##### VolumeResult
| Property     | Type              | Description                     |
|--------------|-------------------|---------------------------------|
| Width        | [Measurement](#Measurement) |                                 |
| Height       | [Measurement](#Measurement) |                                 |
| Length       | [Measurement](#Measurement) |                                 |
| TubDetection | TubDetectionType  | NoTub, TubRequired, TubDetected |

###### Measurement

 Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| Amount| integer/decimal | Numeric amount of measurement |    
| Unit | cm/kg | Unit of Measurement |    

#### Error

 Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| ErrorCode | [ErrorCode](#ErrorCode)| See details below |    
| Message | string | Error Message |    


##### ErrorCode


|ErrorCodes|
|--|
|NoBagFound|
|HoldingAreaFull|
|NotAbleToReleaseBag|
|NotAbleToProcessBag|
|ConveyorBeltInoperable|
|UnknownError|
|BagIsTooLong|
|BagIsTooHigh|
|BagIsJammed|
|UnexpectedBagDetectedInRear|
|BagIsTooFlat|
|BagIsTooShort|
|BagWeightIsOverBhsUpperLimit|
|BagWeightIsUnderBhsLowerLimit|
|TooManyBags|
|BagIsConstantlyMoving|
|BagIsNotConveyable|
|BhsOffline|
|BhsBusy|
|BagInEntryNotRemovedInTime|
|BagWeightUnexpectedlyChanged|

**Message Body Sample Success JSON**

```JSON 
{
    "Bag": {
        "Tags": [
             "0123456789"
        ],
        "Weight": {
            "Amount": 24.5,
            "Unit": "Kg"
        },
        "Position": "Process",
        "VolumeResult": {
            "Length": {
                "Amount": 0,
                "Unit": "Cm"
            },
            "Height": {
                "Amount": 0,
                "Unit": "Cm"
            },
            "Width": {
                "Amount": 0,
                "Unit": "Cm"
            },
            "TubDetection": "NoTub"
        }
    },
    "IsSuccess": true,
    "Error": null
}
```

**Message Body Sample Failure JSON**

```JSON 
{
    "Bag": {
        "Tags": [
            "0123456789"
        ],
        "Weight": {
            "Amount": 24.5,
            "Unit": "Kg"
        },
        "Position": "Entry | Process | Hold | WaitForRelease | Release",
        "VolumeResult": {
           "Length": {
                "Amount": 0,
                "Unit": "Cm"
           },
           "Height": {
               "Amount": 0,
                "Unit": "Cm"
            },
            "Width": {
                "Amount": 0,
                "Unit": "Cm"
            },
            "TubDetection": "NoTub | TubRequired | TubDetected"
        }
    },
    "IsSuccess": false
    "Error": {
      "ErrorCode": "", 
      "Message": ""
    }
}
```
