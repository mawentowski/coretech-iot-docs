## PrintReceipt

Message with the data to print a payment receipt, the print data is standard format for a payment terminal printer.

### Message Properties

| Field | Type | Mandatory/Optional | Value/Description |
|--|--|--|--|
| MessageNamespace    | string | M | payment                    |
| MessageType         | string | M | PrintReceipt            |
| MessageVersion      | string | M | 1                       |
| ConnectionId        | string | M | *{connectionId}*        |
| CorrelationId       | string | M | *{user_defined_string}* |
| DeviceId            | string | M | *{deviceId}*            |
| Timestamp           | DateTime | M | *{timestamp}*|

### Message Body

#### Base Message Body

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| MerchantReceipt   | [Receipt](#Receipt)  | Holds the receipt data for the merchant |
| CardholderReceipt | [Receipt](#Receipt)  | Holds the receipt data for the customer |

##### Receipt

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| ReceiptHeader  | [ReceiptElement[]](#ReceiptElement) | The header section of the receipt |
| ReceiptContent | [ReceiptElement[]](#ReceiptElement) | The main content of the receipt   |
| ReceiptFooter  | [ReceiptElement[]](#ReceiptElement) | The footer section of the receipt |

###### ReceiptElement

| Field        | Type                     | Description/Values                      |
|--------------|--------------------------|-----------------------------------------|
| Format       | string | Print format |
| Name         | string | The field name to print |
| Abbreviation | string | The abbreviated field name |
| Value        | string | The value text to print |
| NameRequired | string | true|false |


**Message Body Sample Success JSON**
```
{
   "MerchantReceipt":{
      "ReceiptHeader":[
         {
            "Format":"NORMAL",
            "Name":"Copy",
            "Abbreviation":"Copy",
            "Value":"MERCHANT COPY",
            "NameRequired":"true"
         },
         {
            "Format":"NORMAL",
            "Name":"",
            "Abbreviation":"",
            "Value":"",
            "NameRequired":"false"
         }
      ],
      "ReceiptContent":[
         {
            "Format":"NORMAL",
            "Name":"Card data source",
            "Abbreviation":"Card data source",
            "Value":"ICC",
            "NameRequired":"false"
         },
         {
            "Format":"EMPHASIS",
            "Name":"Card scheme",
            "Abbreviation":"Card scheme",
            "Value":"MasterCard",
            "NameRequired":"false"
         }
      ],
      "ReceiptFooter":[
         
      ]
   },
   "CardholderReceipt":{
      "ReceiptHeader":[
         {
            "Format":"NORMAL",
            "Name":"Copy",
            "Abbreviation":"Copy",
            "Value":"CARDHOLDER COPY",
            "NameRequired":"true"
         },
         {
            "Format":"NORMAL",
            "Name":"",
            "Abbreviation":"",
            "Value":"",
            "NameRequired":"false"
         }
      ],
      "ReceiptContent":[
         {
            "Format":"NORMAL",
            "Name":"Card data source",
            "Abbreviation":"Card data source",
            "Value":"ICC",
            "NameRequired":"false"
         },
         {
            "Format":"EMPHASIS",
            "Name":"Card scheme",
            "Abbreviation":"Card scheme",
            "Value":"MasterCard",
            "NameRequired":"false"
         }
      ],
      "ReceiptFooter":[
         {
            "Format":"NORMAL",
            "Name":"VAT number",
            "Abbreviation":"VAT",
            "Value":"VAT: 012345678901234",
            "NameRequired":"false"
         },
         {
            "Format":"NORMAL",
            "Name":"",
            "Abbreviation":"",
            "Value":"Please retain for your records",
            "NameRequired":"false"
         }
      ]
   }
}
```