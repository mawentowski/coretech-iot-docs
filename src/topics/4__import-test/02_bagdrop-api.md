# Bagdrop API

The **Bagdrop** API endpoints allow your airline backend to control a Self Bagdrop Unit to:

- initiate a bag drop process to allow the passenger to place a bag on the belt.
- move the bag through the various positions of the bagdrop unit that correspond to the different stages of the bagdrop process.
- allow either the agent or the passenger to resolve any issues with the bag (depending on the situation).
- release the bag to the Baggage Handling System (BHS).

The only supported device at present is the following:

| Acronym | Definition    |
| ------- | ------------- |
| SBD     | Self-Bag Drop |

## Endpoints

The end path for BagDrop API endpoints begins with **POST** `/bagdrop/v2`, followed by the endpoint (i.e. action) for the device to carry out. 

### POST `/bagdrop/v2/getbag`

A POST `/bagdrop/v2/getbag` request is sent to initiate a bagdrop process and open the door (if there is a door) of the SBD so the passenger can place their bag on the belt. 

### POST `/bagdrop/v2/processbag`

After the passenger places a bag on the belt, the bag's measurements are taken and a settled weight is calculated. A POST `/bagdrop/v2/processbag` request is then sent to close the door and move the bag from the `Entry` position to the `Process` position.

### POST `/bagdrop/v2/returnbag`

If an issue arises when the bag is in the `Process` position, and the customer *is able to* resolve the issue, a POST `/bagdrop/v2/returnbag` request is sent to open the door and return the bag to the `Entry` position where the customer to resolve an issue. 

Once the customer resolves the issue, another POST `/bagdrop/v2/processbag` request is sent to return the bag to the `Process` position so the bagdrop process can continue.

### POST `/bagdrop/v2/cancelbag`

If an issue arises when the bag is in the `Process` position, and the customer *is not* *able to* resolve the issue, a POST `/bagdrop/v2/cancelbag` request is sent to open the door and return the bag to the `Entry` position where the agent can to resolve an issue. 

Once the agent resolves the issue, another POST `/bagdrop/v2/processbag` request is sent to return the bag to the `Process` position so the bagdrop process can continue.

### POST `/bagdrop/v2/releasebag`

Once the bag has been processed, a POST `/bagdrop/v2/releasebag` request is sent that moves the bag to the Baggage Handling System and completes the bagdrop process.

## Construct a BagDrop Request

### Resource URLs

At present, Bagdrop API Resource URLs are comprised of:

- A REST API standard method preceding the URL for accessing the endpoint. In the case of the Bagdrop API, the only method used is POST.
- A Base URL specific to the SITA Flex environment, sometimes displayed as `{{baseurl}}` in the Resource URL in Postman.
- The end path of the Resource URL is comprised of the API name (`bagdrop`) followed by the endpoint name. For example, the end path `/bagdrop/v2/getbag` contains the API `bagdrop` followed by the endpoint `getbag`.

>  **Note:** No path parameters are required when sending Bagdrop API requests.

### Header Parameters

A `location-id` is required in the header of requests. Flex APIs use the Azure API Management Service (APIM) to route a request to the correct Azure Region based on the airport code extracted from the `LocationId`.

### Authorization Headers

An `access_token` is required in the Authorization Header of requests for authentication.

> **Note:** The `access_token` is displayed as the Postman variable `bearer_token` in the **Authorization** tab of API requests in the provided Postman collection.

### Request Bodies

All Request Bodies must include the `ConnectionId` of the device the airline backend is sending the command to.

## Service Bus Messages

The following is not an exhaustive list of all possible Service Bus `Message Types`. Only the most common ones encountered when sending Bagdrop API requests are described.

### BagdropDeviceStatus

A `BagdropDeviceStatus` message displays on the Service Bus:

- when the `DeviceStatus` changes, like when an SBD goes from `Online` to `Offline`, or vice versa. An SBD may go `Offline` due to an issue with the device, or when a `BagDropTransactionTimeout` occurs. 
- after a `/bagdrop/v2/getbag` request is sent, which initiates the bagdrop process and reserves the SBD for exclusive access by the airline backend. The `DeviceInUse` property changes from `false` (the value displayed after sending the POST `/session/v2/connections` request) to `true`.

```JSON
{
    "DeviceStatus": "Online",
    "DeviceInUse": true
}
```

##### Example `BagdropDeviceStatus` Service Bus Message indicating the device is online and exclusively reserved

### DoorOpening and DoorClosing

> **Note:** These messages only display if the SBD is configured to have a door.

A `DoorOpening` message displays on the Service Bus:

- When a `/bagdrop/v2/getbag` request is sent that opens the door to the SBD so the passenger can place her bag on the belt.
- When an issue has occurred and either a `/bagdrop/v2/returnbag` or `/bagdrop/v2/cancelbag` request was sent to open the door and return the bag to the `Entry` position so the issue can be resolved by the customer or an agent.

A `DoorClosing` message displays on the Service Bus:

- after a `/bagdrop/v2/processbag` request is sent. The door to the SBD closes and the bag moves from the `Entry` position to the `Process` position. 

> **Note:** Both messages contain an empty Message Body.

### BagPlaced

After a `/bagdrop/v2/getbag` request initiates the bagdrop process, the door to the SBD opens (if there is a door) so the passenger can place the bag on the belt. Baggage information may be collected by the SBD and displayed in a `BagPlaced` message on the Service Bus.

```json
{
    "Bag": {
        "Tags": [],
        "Weight": {
            "Amount": 23.8,
            "Unit": "Kg"
        },
        "Position": "Entry",
        "VolumeResult": {
            "Width": {
                "Amount": 0.0,
                "Unit": "Cm"
            },
            "Height": {
                "Amount": 0.0,
                "Unit": "Cm"
            },
            "Length": {
                "Amount": 0.0,
                "Unit": "Cm"
            },
            "TubDetection": "NoTub"
        }
    },
    "IsSuccess": true,
    "Error": null
}
```

##### `BagPlaced` Service Bus message displaying properties of the 'placed' bag

The `"Position": "Entry"` indicates that the bag is currently located on the `Entry` position of the SBD unit. 

`"IsSuccess": true` indicates that a bag has been placed on the belt and a settled weight has been calculated for the bag, in addition to other measurements like dimensions of the bag.

### BagChanged

The structure of the `BagChanged` message is identical to the `BagPlaced` message, displaying collected baggage information.

The property of importance is `Position`. Whenever a bag moves from one position to the next, a `BagChanged` message displays that indicates the value of `Position` has changed. For example, when the bag moves from the **Entry Area** to the **Process Area**, the property `Position` changes from `Entry` to `Process`. When the bag moves back from `Process` to `Entry`, in the case of an issue, this message displays as well.

Regarding the baggage information, the following scenarios are possible, depending on the configuration of the SBD:

- The `Process` position may be the first time baggage information was collected (not the `Entry` position). 
- Baggage information may be collected a second time at the `Process` position, updating the values collected at the `Entry` position.
- Baggage information is not collected at all at the `Process` position. The baggage information matches the information collected in the `Entry` position.

### BagResponses

>  **Note:** For the purpose of this documentation, Service Bus `MessageTypes` that contain the text `BagResponse` are grouped together since they all simply confirm the success or failure of a request. In actuality, the `MessageTypes` will display like `GetBagResponse` or `ProcessBagReponse` to reflect the type of request that was made at that stage of the bagdrop process.

`BagResponse` messages display on the Service Bus after sending requests to the BagDrop API at different stages of a bagdrop process and are often sent in conjunction with other types of messages like `BagChanged` and `BagdropDeviceStatus`. 

The only purpose of a `BagResponse` message is to indicate whether the request was successful (`"IsSuccess": true`). The structure of `BagResponse` messages are identical to `BagPlaced` and `BagChanged` messages that display collected baggage information.

The following `BagResponse` messages display on the Service Bus by endpoint:

- A `GetBagResponse` is received after a `/bagdrop/v2/getbag` request to initiate the bag drop process and open the SBD door if there is one.

  If the SBD has a door, the property `"Bag": null` is returned which indicates no baggage information was collected because because no bag has been placed on the belt yet. 

  If the SBD does not have a door, the `GetBagResponse` message includes the baggage information collected from the bag placed on the belt at the time the `/bagdrop/v2/getbag` request was sent.

- A `ProcessBagResponse` is received after a `/bagdrop/v2/processbag` request is made to move the bag from the `Entry` position to the `Process` position where the bag is processed.

- A `ReturnBagResponse` is received after a `/bagdrop/v2/returnbag` request to return the bag to the `Entry` position *where the passenger* can resolve an issue.

- A `CancelBagResponse` is received after a `/bagdrop/v2/cancelbag` request to return the bag to the `Entry` position *where the agent* can resolve an issue.

- A `ReleaseBagResponse` is received after a `/bagdrop/v2/releasebag` request to release the bag to the BHS.

#### ErrorCodes

If a request fails, the Service Bus message will return no baggage information with an `ErrorCode` and `Message` describing why the request failed. A possible cause is there was a `BagDropTransactionTimeout` that prevents sending any further requests to the SBD.

```JSON
{
   "Bag":null,
   "IsSuccess":false,
   "Error":{
      "ErrorCode":"UnknownError",
      "Message":"ReturnBag failed, device status: . Bag cannot be Returned."
   }
}
```

##### Sample `ReturnBagResponse` Message indicating the reason the request failed

### BagDropTransactionTimeout

A `BagDropTransactionTimeout` message displays on the Service Bus with an empty Message Body when too much time has elapsed since the last Bagdrop API request was made.

#### Timeout at Entry Area

If this error occurs when the bag is in the `Entry` position, another `/bagdrop/v2/getbag` request must be made to restart the bagdrop process. If you send a `/bagdrop/v2/processbag` request when a timeout has occurred and you have not sent the `/bagdrop/v2/getbag` request, you will receive an error status code.

#### Timeout at Process Area

If this error occurs when the bag is in the `Process` position, a `BagdropDeviceStatus` message also displays on the Service Bus indicating the device is no longer 'in use' (`"DeviceInUse": false`).

You will receive an error status code when sending any further requests. For example, if you attempt to send a `/bagdrop/v2/releasebag` request to continue to the next phase in the bagdrop process, you will receive an error.

At this stage, sending another `/bagdrop/v2/getbag` request to restart the bag drop process will not resolve the issue because there is a bag located in the `Process` position that requires action. The process cannot be restarted until the bag is removed.

## Bagdrop API Walkthrough

Follow along with this walkthrough to experience the Bagdrop API, including connecting to an SBD and completing an entire bagdrop process that ends with releasing the bag to the Baggage Handling System (BHS).

The following tools are used to demonstrate the Print API:

- The <a href="Citrix Virtualized SITA Flex.htm">Citrix Virtualized SITA Flex Environment</a> to add devices.
- The SITA Flex API Postman Collection that allows you to send requests to Flex. 
- Your airline backend to receive messages from the Azure Service Bus.

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

### Add an SBD Device

> **Note:** If an SBD has already been added, skip this section. 

1. In the Device Simulator of the VM, click **Add Device**.

![](C:\Users\Mark.Wentowski\Documents\Git Repos\flex-api-docs\images\device-sim-add.jpg)

##### Add an SBD in Device Simulator

2. Select **SBD** from the **Device Type** drop-down.

3. Leave the other settings as is.

4. Click **Add Device**.

   - The SBD is now available in the Device Simulator.
   - By default, the SBD does not have a door. In order to trigger door-related Service Bus messages, you will add a door to the SBD next. 

5. On the device, click **Options**, then **Settings**.

6. Click the **SBD Bag Door** drop-down and select **(1) Door is installed**.

![](C:\Users\Mark.Wentowski\Documents\Git Repos\flex-api-docs\images\sita-sbd-settings.png)

##### SBD Bag Door Setting set to `Door is installed`

7. Click **Save and Close**.
8. On the device, click **Run**.
   - An SBD screen display. You may keep it open for later use.

### Connect to the SBD

1. In Postman, send a `/session/v2/connections` request to connect to the SBD.
   - **Note:** After connecting to a device, a connection `expiryTime` is returned in the Response Body set to **30 minutes** from the time the `session/v2/connections` request was made.

> **Note:** Notice in the Request Body that the `DeviceId` will be populated based by the variable `{{location}}` in the Postman environment.

2. Check the Service Bus subscription for a `BagdropDeviceStatus` message shown below.

```JSON
{
    "DeviceStatus": "Online",
    "DeviceInUse": false
}
```

##### `BagdropDeviceStatus` Service Bus Message indicating the device is `Online` and not exclusively reserved

The message should indicate the SBD is `Online` and is not exclusively being used (`"DeviceInUse": "false"`). The device is available to successfully receive a `/bagdrop/v2/getbag` request. 

> **Note**: In the Tests tab of Postman, there is a Javascript function that updates the `sbd_connection_id` environmental variable after connecting to the SBD. This variable makes it so you do not need to manually enter a `connectionId` in subsequent calls to the bagdrop API.

#### `DeviceStatus` is `Offline`

If the `DeviceStatus` returns as `Offline`, check to see if the device is running in the Device Simulator. You can tell if a device is running if there is a **Stop** button on the device in Device Simulator.

*If <u>it is not</u> running:*

1. Click **Run**.
2. In the Peripheral View, check to see if the SBD **Status** is now `Online`.

*If <u>it is</u> running*, from the Device Simulator on the VM:

1. Click **Stop**.
2. Click **Run**.
3. In the Peripheral View, check to see if the SBD **Status** is now `Online`.

### Initiate a Bag Drop Process

1. In Postman, send a `/bagdrop/v2/getbag` request.
   - The Flex API acknowledges the request by returning a `2xx` success status code, as seen in a tool like Postman.
   - If you added a door to the SBD earlier, notice that the door icon disappeared in the SBD Device Simulator. This simulates the door opening on a real bagdrop after a bagdrop process was initiated.

![](C:\Users\Mark.Wentowski\Documents\Git Repos\flex-api-docs\images\sbd-door-disappear.png)

##### Device Simulator showing an 'opened door' after sending a `/bagdrop/v2/getbag` request.

> **Note:** On a real bag drop, a message like "Please place your bag on the belt" would display.

- An updated `BagdropDeviceStatus` message displays on the Service Bus, indicating the SBD is now 'In Use'.

```JSON
{
    "DeviceStatus": "Online",
    "DeviceInUse": true
}
```

##### `BagdropDeviceStatus` Service Bus Message indicating the device is now exclusively reserved

- A `DoorOpening` message displays on the Service Bus with an empty Message Body. This simply indicates the door of the SBD has opened.
- A `GetBagResponse` message displays on the Service Bus which is an indication the bagdrop process is initiated. The property `"Bag": null` indicates there is no bag information because, for the purpose of this simulation, the passenger has not yet placed the bag onto the belt. 

```json
{
    "Bag": null,
    "IsSuccess": true,
    "Error": null
}
```

##### `GetBagResponse` Service Bus Message indicating no baggage data has been collected

#### Timeout at Entry Area

A `BagDropTransactionTimeout` message displays on the service bus with an empty Message Body when too much time has elapsed since the `/bagdrop/v2/getbag` request was made. Another `/bagdrop/v2/getbag` request must be made to restart the bagdrop process. If you send a `/bagdrop/v2/processbag` request when a timeout has occurred and you have not sent the `/bagdrop/v2/getbag` request, you will receive an error status code.

### Place a Bag on the Belt

1. With the SBD Device Simulator open, click **New Bag**. 

   ![](C:\Users\Mark.Wentowski\Documents\Git Repos\flex-api-docs\images\sbd-new-bag.png)

   - A **New Bag** window displays.

2. Leave all settings as is.

3. Click **Create Bag**.

   - A new **Bag #** panel is displayed.

>  **Note:** The bag in its current state is simulating the passenger holding the bag prior to placing the bag on the belt.

3. Ensure the door is open (not red).
   - If the door has turned red (door is closed), send another `/bagdrop/v2/getbag` request to open it.
4. Click **Place Selected Bag** next to the New Bag button you clicked earlier (see previous screenshot).
   - The bag (in green) displays in the SBD image in the **Entry Area** like when a real bag is placed by a passenger in the **Entry Area** of a SBD.
   - The **Weight Scale Status** (below the purple belt) displays **Scale is debouncing** (you must look quickly to see it), then **Scale is settled** after a few seconds to indicate the settled weight has been determined.

> **Note**: If the passenger is using a mobile app, the app may request confirmation that the bag has been placed by displaying a "I have placed the bag" prompt. After tapping the button, the passenger is brought to the next step in the bagdrop process.

### View Settled Weight

In the SBD Device Simulator, notice above the **New Bag** and **Place Selected Bag** buttons is a field with two properties called **Bounce**.

In the previous step, you placed a bag onto the belt. When this occurred, the belt was 'in-motion' while the weight on the belt settled, just like on a real bag drop. The **Bounce** properties simulate the fluctuation of weight while the weight of the bag settles.

The settled weight is calculated after the specified number of balancing events (**5** by default) has occurred.

![](C:\Users\Mark.Wentowski\Documents\Git Repos\flex-api-docs\images\sbd-bounce.png)

##### SBD Device Simulator showing `Bounce` Properties that simulate the motion of the belt after placing a bag

To view the settled weight:

1. Click the **Session History** tab.

![](C:\Users\Mark.Wentowski\Documents\Git Repos\flex-api-docs\images\sbd-session-history.png)

In the Session History log, notice that the **Bounce** events are shown. For each event, a weight measurement is taken. Within the characters of the event string, `SW=2` means the bag is still settling on the weight scale. Notice how from one event to the next, the weight goes up and down, indicated by the `CW=` value. For example, one measurement could be `CW=23.8` then the next could be `CW=24.5`.

In the last event, the `SW=4` indicates this measurement is the final measurement taken when the bag has settled and not in motion. 

A `BagPlaced` message displays on the Service Bus once a settled weight is determined:

```json
{
    "Bag": {
        "Tags": [],
        "Weight": {
            "Amount": 23.8,
            "Unit": "Kg"
        },
        "Position": "Entry",
        "VolumeResult": {
            "Width": {
                "Amount": 0.0,
                "Unit": "Cm"
            },
            "Height": {
                "Amount": 0.0,
                "Unit": "Cm"
            },
            "Length": {
                "Amount": 0.0,
                "Unit": "Cm"
            },
            "TubDetection": "NoTub"
        }
    },
    "IsSuccess": true,
    "Error": null
}
```

##### `BagPlaced` Service Bus message displaying properties of the 'placed bag'

The `"Position": "Entry"` indicates that the bag is currently located on the entry position of the SBD unit. 

> **Note:** The `Position` will update when new measurements are made as the bagdrop process progresses and the position of the bag changes.

`"IsSuccess": true` indicates that a bag has been placed on the belt and a settled weight has been calculated for the bag, in addition to other measurements like dimensions of the bag.

>  **Note**: The SBD device in the SBD Device Simulator is not capable of providing a the `VolumeResult` that includes the baggage dimensions, returning `"Amount": 0.0` for the various dimensions. However, some SBDs have this capability. When interacting with an actual SBD with the capability to take measurements, those measurements will display. How your airline backend could use this information is to potentially reject a bag if a bag's `width` is greater than a certain allowed amount, for example.

### Process the Bag

1. In Postman, send a `/bagdrop/v2/processbag` request.
   - The Flex API acknowledges the request by returning a `2xx` success status code, as seen in a tool like Postman.
   - In the SBD Device Simulator, notice that the door has closed and the the bag has now moved from the `Entry` position to the `Process` position to simulate the belt moving down the bag. The bag is not accessible to the passenger in this position.

![](C:\Users\Mark.Wentowski\Documents\Git Repos\flex-api-docs\images\sbd-process.png)

##### Device Simulator showing the bag has moved to the Processing Area

> **Note:** On a real bag drop, a message like "Processing Bag, please wait." would display and the door to the bag drop would close (if not already closed).

- A `DoorClosing` message may display on the Service Bus with an empty Message Body. This indicates the door has closed after the passenger placed the bag on the belt.
- A `BagChanged` message displays on the Service Bus which indicates the bag has changed position. This message looks very similar to the `BagPlaced` message, except with the property `Position` set to `Process`.

> **Note:** In the simulation, the same baggage information collected from the measurement taken in the **Entry Area** is displayed in the `BagChanged` message. However, on a real bagdrop, it is possible the baggage information may change. For example, the SBD may be configured to take a measurement in the **Processing Area** rather than **Entry Area**. Or, another measurement may be made in the Processing Area that updates the measurements.

- A `ProcessBagResponse` message displays on the Service Bus that indicates the bag was successfully processed (`"IsSuccess": true`). This message, like the `Bag Placed` and `BagChanged` messages, displays the baggage measurements.

#### Not enough time remaining on connection

A Bagdrop API returns a `400 Bad Request` error status code when the connection to a device is soon to reach its 30-minute `expiryTime` set after the POST `/session/v2/connections` was made.

```JSON
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "Bad Request",
    "status": 400,
    "detail": "Not enough time remaining on connection.",
    "traceId": "00-baf5325b0757fc408018bca88119a826-65e7e75f65b69c4a-00"
}
```

##### The connection to the device is soon to be expired

The resolution is to simply send another `session/v2/connections` request to create a new connection and receive a new `expiryTime`.

#### Timeout at Process Area

A `BagDropTransactionTimeout` message displays on the service bus with an empty Message Body when too much time has elapsed since the `/bagdrop/v2/process` request was made. 

To resolve the issue:

1. Right-click the bag in the SBD Device Simulator and select **Remove**.

2. Check the Service Bus for a `StatusChanged` message which indicates the bag was removed. The device then goes `Offline`.

```JSON
{
    "DeviceStatus":"Offline",
    "BagDropStatus":"BagRemovedUnexpectedly"
}
```

##### `StatusChanged` Service Bus message indicating the bag was unexpectedly removed from the Processing area

> **Note:** In a bag drop process with a real SBD, unexpectedly removing the bag from the belt displays the same `BagDropStatus`.

3. Close the SBD Device Simulator Window.

4. On the SBD Device in Device Simulator, click **Run**.
   - A new SBD Device Simulator opens. 
   - An updated `BagdropDeviceStatus` message displays on the Service Bus, indicating the SBD is now `Online`.

```JSON
{
    "DeviceStatus": "Online",
    "DeviceInUse": false
}
```

##### `BagdropDeviceStatus` Service Bus Message indicating the device is now `Online`

5. Send a `/bagdrop/v2/getbag` request. 
   - If successful, the Flex API returns a 2xx status code returns a successful `GetBagResponse` message on the Service Bus.

### Simulate a Customer Resolving an Issue

1. With the bag in the Process Area, send a `/bagdrop/v2/returnbag` to simulate the bagdrop returning the bag to the customer to resolve an issue.
   - The bag moves from the **Processing Area** back to the **Entry Area** and the door opens for a short period of time. If the door closes, sending another `/bagdrop/v2/returnbag` request will open the door again.
   - A `DoorOpening` message displays on the Service Bus with an empty Message Body. This simply indicates the door of the SBD has opened so the bag can be accessible to the passenger to resolve the issue.
   - A `BagChanged` message displays on the Service Bus which indicates the bag has changed `Position` from the `Process` area to the `Entry` area.
   - A `ReturnBagResponse` message displays on the Service Bus which indicates the request to return the bag to the `Entry` position was successful (`"IsSuccess":true`).

![](C:\Users\Mark.Wentowski\Documents\Git Repos\flex-api-docs\images\sbd-return-cancel-entry.png)

##### SBD Device Simulator showing the bag has returned to the Entry Area where the customer can resolve the issue

> **Note:** In a real life scenario, the customer would resolve a minor issue if no intervention is required by the agent.

2. To simulate the customer having resolved the issue, send another `/bagdrop/v2/processbag` request to close the door and move the bag back the **Processing Area**.

### Simulate an Agent Intervening to Resolve an Issue

1. With the bag in the Process Area, send a `/bagdrop/v2/cancelbag` request to simulate the bagdrop returning the bag due to an issue that requires agent assistance and cannot be resolved by the customer.
   - The bag moves from the **Processing** **Area** back to the **Entry** **Area** and the door opens for a short period of time. 
   - The same messages received on the Service Bus after sending a `/bagdrop/v2/returnbag` request are received after sending a `/bagdrop/v2/cancelbag` request. They indicate the bag has returned to the **Entry** **Area**.

![](C:\Users\Mark.Wentowski\Documents\Git Repos\flex-api-docs\images\sbd-return-cancel-entry.png)

##### SBD Device Simulator showing the bag has returned to the Entry Area where the agent can resolve the issue

> **Note:** In a real life scenario, the agent would be alerted to resolve the issue at the SBD.

2. To simulate the agent having resolved the issue, send another `/bagdrop/v2/processbag` request to close the door and move the bag back the **Processing Area**.

### Release the Bag to the BHS

1. With the bag in the **Process** Area, send a `/bagdrop/v2/releasebag` request to simulate the completion of the bagdrop process with the SBD unit releasing the bag.

   - The bag moves from the **Processing Area** to the **BHS Release Area** where it will remain in the VM until it is removed.

   - You can start a new bag drop process at this point by adding a new bag, sending a `/bagdrop/v2/getbag` request, then placing the new bag on the belt.

![](C:\Users\Mark.Wentowski\Documents\Git Repos\flex-api-docs\images\sbd-release-bag.png)

##### SBD Device Simulator showing the bag has been successfully released to the BHS Release Area

- If you wish, you can start a new bag drop process at this point by adding a new bag, sending a `/bagdrop/v2/getbag` request, then placing the new bag on the belt.