# Print API

The Payment API endpoints allow your airline backend to take a payment from a customer using a secure PCI compliant payment solution.

They cover:

-   Specifying the amount, currency, and vendor of a payment transaction.
-   Printing receipts and verifying signatures in the case that this is required.
-   Handling errors when they occur during the payment process.

The only supported device at present is:

| Acronym | Definition                                    |
| ------- | --------------------------------------------- |
| PMT     | Payment Device for Chip and Pin transactions. |

## Endpoints

The end path for the Print API starts with **POST** `/payment/v2/`, followed by the endpoint (i.e. payment action) for a device to carry out.

### POST `/payment/v2/process`

Send a POST `/payment/v2/process` request to an PMT device to...

### POST `/payment/v2/receiptprinted`

Send a POST `/payment/v2/receiptprinted` request to an PMT device to...

### POST `/payment/v2/signatureverified`

Send a POST `/payment/v2/signatureverified` request to an PMT device to...

### POST `/payment/v2/transactioncompletedresponse`

Send a POST `/payment/v2/transactioncompletedresponse` request to an PMT device to...

## Construct a Payment Request

### Resource URLs

At present, Payment API Resource URLs are comprised of:

-   A REST API standard method preceding the URL for accessing the endpoint. In the case of the Print API, the only method used is POST.
-   A Base URL specific to the SITA Flex environment, sometimes displayed as `{{baseurl}}` in the Resource URL in Postman.
-   The end path of the Resource URL is comprised of the API name (`payment`) followed by the endpoint name. For example, the end path `/payment/v2/process` contains the API `payment` followed by the endpoint `process`.

> **Note:** No path parameters are required when sending Payment API requests.

### Header Parameters

A `location-id` is required in the header of the request. Flex APIs use the Azure API Management service (APIM) to route a request to the correct region based on the airport code extracted from the `LocationId`.

### Authorization Headers

An `access_token` is required in the Authorization Header of requests for authentication.

> **Note:** The `access_token` is displayed as the Postman variable `bearer_token` in the **Authorization** tab of API requests in the provided Postman collection.

### Request Bodies

All Request Bodies must include the `ConnectionId` of the device the airline backend would like to interact with

#### POST `/payment/v2/process`

The following is a sample Request Body for <action> using an PMT device.

```JSON
{
  "connectionId": "{{pmt_connection_id}}",
  "correlationId": "correl_paymt",
  "Amount": 127.30,
  "CurrencyCode": 978,
  "OriginatorsTransactionReference":"{{$guid}}"
}
```

##### Sample Request Body for POST `/payment/v2/process` request

#### POST `/payment/v2/receiptprinted`

The following is a sample Request Body for <action> using an PMT device.

```JSON
{
  "connectionId": "{{pmt_connection_id}}",
  "isError":false,
  "transactionError": "NO_ERROR",
  "correlationId" : "correl_paymt"
}
```

##### Sample Request Body for POST `/payment/v2/receiptprinted`request

#### POST `/payment/v2/signatureverified`

The following is a sample Request Body for <action> using an PMT device.

`"verified": true` is shared between this and the last one probably combine description.

```JSON
{
  "connectionId": "{{pmt_connection_id}}",
  "verified": true,
  "correlationId" : "correl_paymt"
}
```

##### Sample Request Body for POST `/payment/v2/signatureverified` request

#### POST `/payment/v2/transactioncompletedresponse`

The following is a sample Request Body for <action> using an PMT device.

```JSON
{
  "connectionId": "{{pmt_connection_id}}",
  "verified": true,
  "correlationId" : "correl_paymt"
}
```

##### Sample Request Body for POST `/payment/v2/transactioncompletedresponse` request

## Service Bus Messages

The following is not an exhaustive list of all possible Service Bus `Message Types`. Only the most common ones encountered when sending Payment API requests are described.

### PrintDeviceStatus

#### `DeviceStatus` is `Online`

After you connect to a print device, a `PrintDeviceStatus` message is displayed on the Service Bus that should indicate the `DeviceStatus` is `Online`.

```JSON
{
    "DeviceStatus": "Online",
    "MediaStatus": "Ok",
    "BinStatus": "Ok"
}
```

##### `PrintDeviceStatus` Service Bus Message showing the Print device is `Online`

#### `DeviceStatus` Changes

If the device's status changes for whatever reason, like the device going `Offline` or the paper becomes jammed, a `DeviceStatus` message may display after requesting a print, followed by an unsuccessful `PrintResponse` message.

```json
{
    "DeviceStatus": "Online",
    "MediaStatus": "Jammed",
    "BinStatus": "Ok"
}
```

##### `DeviceStatus` Service Bus Message sent after requesting a print on a printer with a paper jam

### PrintResponse

After sending a request to print to a device, the `PrintResponse` is the primary `MessageType` received on the Service Bus after making a print request. It is virtually identical across devices and print formats. Its sole purpose to indicate if the print was successful and how many documents were printed.

Upon making a POST `/print/v2/` request, the Flex API acknowledges the request with a synchronous message, returning a `2xx` success status code no matter if the print was successful or unsuccessful. It merely indicates the Flex API successfully sent the request.

The API takes the `ConnectionId` and looks up the details associated with the ID, most notably the `DeviceId`. The `DeviceID` is sent to IoT Hub where is it routed to the correct workstation to carry out the command on the peripheral (for example, printing).

The Flex API then routes the messages to the Service Bus topic for sending messages to airlines (`airline-messages`), returned as `MessageData` in the **Message Body**. `MessageData` indicates if the request was successful.

A successful print returns a `PrintResponse` message with `IsSuccess` set to `true`, in which case the number of successful prints is returned.

```JSON
{
    "IsSuccess": true,
    "Error": null,
    "SuccessfulPrints": "1"
}
```

##### `PrintResponse` Service Bus Message indicating a successful print

For an unsuccessful print, a `PrintResponse` message displays with `IsSuccess` set to `false` in the Message Body. An `ErrorCode` and `Message` are returned. In this case, the reason for the failed print request is that the printer is jammed.

```JSON
{
    "IsSuccess": false,
    "Error": {
        "ErrorCode": "NotAbleToPrint",
        "Message": "PrintNotOk/UnSuccessfulPrint, with Jammed"
    },
    "SuccessfulPrints": "0"
}
```

##### `PrintResponse` Service Bus Message indicating an unsuccessful print due to paper jam

> **Note:** The actual text contained in the error `Message` is determined by the software on the workstation.

The resolution would be to physically locate the printer, unjam the paper, then attempt to send another print request.

## Print API Walkthrough

Follow along with this walkthrough to experience the Print API, including connecting to a device, issuing a print command, then reading the response. The following tools are used to demonstrate the Print API:

-   The <a href="Citrix Virtualized SITA Flex.htm">Citrix Virtualized SITA Flex Environment</a> to add devices.
-   The SITA Flex API Postman Collection that allows you to send requests to Flex.
-   Your airline backend to receive messages from the Azure Service Bus.

You will be interacting with an ATB device (Automated Ticket & Boarding Pass Printer) since it supports the most print format possibilities like SVG, PDF, or AEA. With this knowledge, you can apply the same steps to interacting with other print devices.

> **Note:** This walkthrough provides some basic troubleshooting steps. However, if an error displays that is not covered, refer to the <a href="Troubleshooting Environments.htm">Troubleshooting Environments</a> or <a href="Troubleshooting Error Codes.htm">Troubleshooting Error Codes</a> sections for detailed steps on how to resolve the issue.

### Prerequisite Steps

1. Login to the <a href="Citrix Virtualized SITA Flex.htm">Citrix Virtualized SITA Flex Environment</a> you set up previously.
2. In Postman, open the **SITA Flex API Collection** and **Postman environment** `.json` files. In the Postman environment file:
    - Ensure your `clientid` and `clientsecret` are populated in both the **Initial Value** and **Current Value** columns.
    - Ensure the `{{location}}` variable corresponds to the VM's machine name as seen in the Peripheral View. For example, a VM with machine name `ZZU1CKB005` as seen in the Peripheral view could correspond to the `location` like `A-ZZU-MZUZUAIRPORT-ZZU1CKB005` in the Postman Environment.
3. In Postman, perform the following:
    - Send a Get Access token request.
    - Send a POST `/session/v2/subscriptions` request.
    - Send a POST `/site/v2/reservations` request.

### Add an ATB Device

> **Note:** If an ATB has already been added, skip this section.

1. In the Device Simulator of the VM, click **Add Device**.

![](C:\Users\Mark.Wentowski\Documents\Git Repos\flex-api-docs\images\device-sim-add.jpg)

2. Select **ATBStandard** from the **Device Type** drop-down.
3. Leave the other setting as is.
4. Click **Add Device**.
    - The ATB device is now available in the Device Simulator.
5. On the device, click **Run**.
    - An ATB screen displays. You may keep it open for later use.

### Connect to the ATB

1. In Postman, send a `/session/v2/connections` request to connect to the ATB.
    - After connecting to a device, a connection `expiryTime` is returned in the Response Body set to **30 minutes** from the time the `session/v2/connections` request was made.

> **Note:** Notice in the Request Body that the `DeviceId` will be populated based by the variable `{{location}}` in the Postman environment.

2. Check the Service Bus subscription for a `PrintDeviceStatus` message:

```JSON
{
    "DeviceStatus": "Online",
    "MediaStatus": "Ok",
    "BinStatus": "Ok"
}
```

##### `PrintDeviceStatus` Service Bus Message indicating the device is online

The message should return a `DeviceStatus` of `Online`, with `MediaStatus` and `BinStatus` as `Ok` if there are no issues with the printer. If there are no issues, the device is now available to successfully receive Print requests.

> **Note**: In the Tests tab of Postman, there is some Javascript that updates the `atb_connection_id` environmental variable after connecting to the ATB. This variable is used so you do not need to manually enter a `connectionId` in subsequent calls to the Print API.

#### `DeviceStatus` is `Offline`

If the `DeviceStatus` returns as `Offline`, check to see if the device is running in the Device Simulator. You can tell if a device is running if there is a **Stop** button on the device in Device Simulator.

_If <u>it is not</u> running:_

1. Click **Run**.
2. In the Peripheral View, check to see if the ATB **Status** is now `Online`.

_If <u>it is</u> running_, from the Device Simulator on the VM:

1. Click **Stop**.
2. Click **Run**.
3. In the Peripheral View, check to see if the ATB **Status** is now `Online`.

### Print a Boarding Pass PDF

1. In Postman, send a `/print/v2/boardingpass/pdf` request.

    > **Note:** In the Request Body, notice that PDF `printData` has been included for you.

2. Check the Service Bus for a new `PrintResponse` message.

    - The Flex API acknowledges the request by returning a `2xx` success status code, as seen in a tool like Postman.
    - If `IsSuccess` is `true`, then the print was successful. The number of `SuccessfulPrints` is returned. In this case, the device printed `1` boarding pass in PDF format.

```JSON
{
    "IsSuccess": true,
    "Error": null,
    "SuccessfulPrints": "1"
}
```

##### `PrintResponse` Service Bus Message indicating a successful print

3. Go to the **ATB Simulator** window in the VM.
    - The printed boarding pass should be visible in the **Print Preview**.

![](C:\Users\Mark.Wentowski\Documents\Git Repos\flex-api-docs\images\print-bp-pdf.png)

##### ATB Simulator with Boarding Pass displaying in Print Preview

### Simulate an Unsuccessful Print

The ATB Simulator (and simulators for other print devices) allows you to add a **Fault Indicator** (like a paper jam) to simulate a failed print scenario.

1. In the ATB Simulator, set the **Fault Indicator** to `Paper Jam`.

![](C:\Users\Mark.Wentowski\Documents\Git Repos\flex-api-docs\images\print-bp-pdf-paperjam.png)

2. In Postman, send a `/print/v2/boardingpass/pdf` request.
3. Check the Service Bus for a new `PrintResponse` message.

```JSON
{
    "IsSuccess": false,
    "Error": {
        "ErrorCode": "NotAbleToPrint",
        "Message": "PrintNotOk/UnSuccessfulPrint, with Jammed"
    },
    "SuccessfulPrints": "0"
}
```

##### `PrintResponse` Service Bus Message indicating an unsuccessful print with reason `Message`

`IsSuccess` should be `false`, which indicates the Print was unsuccessful. A general error displays, `NotAbleToPrint`, followed by an error `Message` that explains why the print was unsuccessful. In this case, it is because the printer is jammed.

The resolution would be to physically locate the printer and unjam it.

## Best Practices

### Supported Devices

The Print API makes use of valid for printer devices only.

### PDF Size Warning

It is recommended that your PDF documents are not too large, or else there will be a noticeable delay when printing. This is due to the current CPU processing limitations on the printers themselves, as the peripheral needs to process the PDF data, format it, and make it ready for printing in hardware. Also, at present, PDF data will be sent over a virtual COM port which is rate limited.

One way of reducing the size of your PDF is to reduce the DPI of the PDF document. This will shrink the data payload size but ensures elements such as barcodes are still legible to allow BGR and LSR devices to read them.

You should be targeting PDFs around the 10-20KB size. This should be enough to display the required document details. If you need assistance with this task, please contact <flex.api.support@sita.aero>.

### Paper Stock Dimensions for PDFs/SVGs

This may seem obvious, but ensure that your PDFs and SVGs match the paper stock dimension for boarding passes and bag tags at the airport you are operating at.
