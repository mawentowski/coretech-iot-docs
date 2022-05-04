# SITA Flex Overview

The SITA Flex Platform is a collection of cloud APIs that allow airport and airline application developers to **build fully mobile, passenger service applications** either on or off-airport while maintaining **full common-use compatibility**.

SITA Flex’s goal is to facilitate the transition from legacy applications to mobile passenger service and workforce solutions that offer more customer engagement and opportunities to reduce costs and generate more revenue.

See <a href="SITA Flex APIs_1.htm">SITA Flex APIs</a> for a more detailed description of the API.

## Who is it for?

### High-Level Use Cases

SITA Flex is for airports or airlines:

-   Who wish to **leverage mobile apps to engage the customer** and require their applications to have full, conventional common-use compatibility.
-   Who need to **scale their operation up or down** **easily** with the ability increase capacity and implement off-airport passenger processing (including bags, etc.).
-   Who wish to take advantage of the **health/safety benefits of mobile devices** (using a personal device is inherently safer than shared infrastructure).
-   Who wish to reduce airport furniture requirements.

### Knowledge Prerequisites

To effectively implement SITA Flex APIs in your application, it is assumed that you have:

-   **Experience developing with cloud-based REST APIs and have extensive domain knowledge of airport and airline processes**. Otherwise, you must acquire this knowledge prior to developing applications using SITA Flex APIs to use them effectively.

-   **General knowledge of the different** **peripheral types** and they how they operate in airport.

-   **Working knowledge of the** **IATA Technical Peripheral Specification** that covers all devices in the airport and how to communicate with them.

-   **A familiarity with the old ways of printing such as** **pectabs**, **logos**, **templates**, and associated print data covered in the legacy AEA Specification.

-   **A familiarity the new ways of printing using PDFs and SVGs** that are covered in the new IATA Technical Peripheral Specification.

-   **A strong idea of how your app should work** prior to using SITA Flex.

SITA can provide you the specifications listed through requests to:

-   <flex.api.support@sita.aero>

## Basic Concepts

Before understanding Flex APIs, it is important to understand a few key concepts.

| Term              | Definition                                                                                                                                                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Flex Platform     | The collection of APIs that provide authentication, subscription, and device access services at an airport or ancillary location.                                                                                           |
| Flex Subscriber   | A subscriber to the Flex Platform. This can be an airline, ground handler or third-party entity that wants to use the Flex Platform. The subscriber can have multiple Flex Registrations grouped by an Airline Code.        |
| Flex Registration | A Flex Registration is an App Registration in Azure Active Directory with roles assigned to allow access to the APIs of the Flex Service. The Flex Registration is associated with the airline code of the Flex Subscriber. |
| Airline Backend   | Refers to your data center or server interacting with Flex.                                                                                                                                                                 |
| Location          | A Workstation, Kiosk or touch point where one or more Flex-enabled devices are located.                                                                                                                                     |

Other terms and acronyms important to understanding Flex are defined in the <a href="Glossary_1.htm">Glossary</a>.

## SITA Flex APIs

The SITA Flex platform contains the following APIs, each with a variety of endpoints and methods to access them in different ways.

> **Note**: The endpoints below describe the use of devices to perform certain actions like printing or scanning. For an in-depth explanation of device types, consult the _IATA Technical Peripheral Specification (formerly AEA) Edition 2018_.

### Session API

The <a href="Session API_1.htm">Session API</a> endpoints allow your airline backend to connect to devices configured in the SITA Flex environment so it can receive messages from those devices.

When using this API, you must **subscribe** to the Azure Service Bus, **reserve** a location for exclusive access, then create a **connection** to Flex devices to receive messages on the subscription.

Example locations configured in the SITA Flex environment include:

-   Airport CUTE type workstations for check-in and boarding
-   CUSS Type devices such as a Self-Service Kiosk
-   Self-Service BagDrop and Self-Service Boarding Gate

### Print API

The <a href="Print API_1.htm">Print API</a> endpoints allow your airline backend to use airport devices to print airport documents such as boarding passes, bag tags, and reports.

The supported devices at present are the following:

| Acronym | Definition                                                                   |
| ------- | ---------------------------------------------------------------------------- |
| ATB     | Automated Ticket & Boarding Pass Printer. Supports SVG, PDF, or AEA formats. |
| BTP     | Baggage Tag Printer. Supports PDF or AEA formats.                            |
| DCP     | Document Printer                                                             |
| GPP     | General Purpose Printer                                                      |

### Scan API

The <a href="Scan API_1.htm">Scan API</a> endpoints allow your airline backend to use airport devices to read travel documents like boarding passes, bag tags, and passports.

The supported devices at present are the following:

| Acronym | Definition                             |
| ------- | -------------------------------------- |
| LSR     | Laser Sensor Reader (Bar Code Scanner) |
| MSR     | Magnetic Stripe Readers                |
| OCR     | Optical Character Recognition          |

### Payment API

The Payment API endpoints allow your airline backend to take a payment from a customer using a secure PCI compliant payment solution.

They cover:

-   Specifying the amount, currency, and vendor of a payment transaction.
-   Printing receipts and verifying signatures in the case that this is required.
-   Handling errors when they occur during the payment process.

The only supported device at present is:

| Acronym | Definition                                    |
| ------- | --------------------------------------------- |
| PMT     | Payment Device for Chip and Pin transactions. |

> **Note:** The Payment API full documentation will be provided in a future release of this document.

### GateAccess API

The <a href="GateAccess API_1.htm">GateAccess API</a> endpoints allow your airline backend to interact with Boarding Gate Readers (BGR/BCR) and Self-Boarding Gates (SBG).

The supported devices at present are the following:

| Acronym | Definition           |
| ------- | -------------------- |
| BCR     | Boarding Card Reader |
| BGR     | Boarding Gate Reader |
| SBG     | Self-Boarding Gate   |

### Bagdrop API

The <a href="Bagdrop API.htm">Bagdrop API</a> endpoints allow your airline backend to control a Self Bagdrop Unit to:

-   move the bag between the various parts of the bagdrop process.
-   retrieve information about the bag that is currently being processed by the unit.

The only supported device at present is:

| Acronym | Definition    |
| ------- | ------------- |
| SBD     | Self-Bag Drop |

## Azure Service Bus

To use the SITA Flex APIs properly, having a firm understanding of the Service Bus is required.

The Azure Service Bus is a message broker Flex uses to send messages to an airline backend. The Service Bus subscription provides a back channel for asynchronous and unsolicited messages from the platform and devices.

A full description of the Service Bus is out of scope for this documentation, but this section seeks to explain how Flex interacts with it on a high level. See the [Microsoft Docs](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview) on the Service Bus for a deeper dive.

A few key takeaways:

-   Each airline backend needs its own subscription.

-   Flex airports and their Flex locations will be configured in a specific Azure Region.

-   Subscriptions are specific to an Azure Region and so your backend may need several subscriptions to receive messages from all the airport locations you operate at.

-   The subscription is intended to be long lived; you should ensure that you refresh the subscription when it expires.

-   It is the responsibility of the airline backend system to correctly route the messages received on a subscription to the correct client applications.

-   Flex communications are both synchronous and asynchronous.

### Flex API HTTP Responses and Service Bus Messages

It is important to know that after sending Flex API HTTP requests, the HTTP responses are oftentimes not the primary source of information airline backends will act upon.

Instead, whenever a Flex API request is sent to a device, an action is carried out of the device and a 'response' Service Bus message is sent to the Azure Service Bus subscription the airline backend is 'subscribed to'. The `MessageType` determines the type of information returned.

Hence, the HTTP response returned by Flex is synchronous and only acknowledges a request has been made. The Service Bus message returned on the Service Bus Subscription after sending an HTTP request to Flex is an asynchronous response and can be considered the 'true' response to the API request.

### Download Client Library

Microsoft Service Bus client libraries can be downloaded from [here](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview#client-libraries).

## Application Configuration

Customers have a certain degree of freedom when it comes to setting up their applications to use Flex APIs.

### Airline Backends

An airline backend is the server/data center that communicates with Flex. An airline may choose to have a single backend that services multiple applications, or multiple backends to service multiple applications. For example, an airline may have an airline backend for a passenger-facing mobile app and another for a desktop app for agents.

> **Tip:** While possible to have a single backend servicing multiple apps, it is more common to having separate airline backends for each app. Ultimately, it is for the airline to determine the best approach.

Once again, whether an airline backend manages one or multiple applications, each application has its own set of credentials.

### Subscriptions

Because the Service Bus is Azure Region-specific, each airline backend must maintain one subscription <u>for each Azure Region</u>. For any one Azure Region, all messages sent from devices in that region display on that region's subscription.

A subscription is created when an airline backend sends a POST `session/v2/subscriptions` request.

### Client Applications

Airline backends should be designed to service thousands of clients. Flex does not interact with any client applications, only the airline backends that service those clients. If a client application requests to print a boarding pass, it is the responsibility of the backend to send the response back to the device that made the request (e.g., "Print Successful"). In other words, the airline backend must be able to pair requests with responses and handle the overall interaction with its client applications.

## Development Effort/Scope

Seasoned developers who have 1) **experience developing cloud-based apps**, 2) **extensive domain knowledge of airport processes**, and 3) a **clear idea of how their app will work**, have a clear advantage for integrating SITA Flex APIs into their application more quickly.

For developers that possess the traits above, but are a third-party developer instead of in-house, extra time for acquiring DCS access and other complications should be factored into the development scope and addressed early.

For a developer that does not possess any, or only some of these traits, development effort is harder to assess and depends on the extent of the knowledge gap. If there is a knowledge gap, the developer must conduct thorough research to familiarize herself with airport processes. SITA will, however, provide as much guidance as is reasonably possible.

## Customer Registration

### Flex Registration

A Flex Registration is an App Registration in Azure Region with permissions granted to access Flex APIs. For any one airline, each airline application has its own app registration associated with its airline code, along with its own set of credentials. The credentials given are application specific.

### Developer.aero Registration

Before you can start using SITA Flex APIs, you need to register a [developer.aero](https://www.developer.aero) account to acquire credentials needed for authentication to use the Pre-Production Environment.

## Flex Environments

Flex has two environments available for airlines to use:

### Staging

-   The staging environment is configured and deployed with the same resources as production and so provides an experience akin to using the production environment.
-   It is the staging environment that most Airline Proof of Concepts (PoCs) will use when connecting to Flex.
-   The virtual test locations and Flex suitcases exist within the staging environment.

### Production

-   This is the production environment for Flex where live airport locations are configured.
-   Airline production software will use the Flex production environment for real-world airport operations.

## Recommended Tools

The following tools are recommending for interacting with Flex.

### Postman

SITA provides a Postman collection that includes environment variables that store repeated information for efficiency.

There are several blank variables you must fill in with your specific information. For example, `client_id` and `client_secret`. Other variables are included that do not require any changes.

Use Postman to:

-   Validate that your development kit is working as expected and that your code is behaving as expected.
-   Copy code snippets and paste them into your application for testing and validation.

Download Postman here: <https://www.postman.com/downloads>.

### JSON Web Tokens

The SITA Flex Platform uses Bearer Tokens in the form of JSON Web Tokens (JWT). This is a standard that is defined in RFC 7519.

Microsoft provides [jwt.ms](https://jwt.ms) for free to debug JWTs received from the SITA Flex Platform to ensure you understand and can verify their contents.

### Base64

[Base64](https://base64.guru/) provides a range of encoders and decoders that can be used to translate data to-and-from Base64.

## Next Steps

To enable you to test your applications on a representative environment, you will have been provided access to one of the following:

-   **SITA Flex “Suitcase”** – which contains all the devices and software required to develop your application against the SITA Flex API.
-   **Citrix Virtualized SITA Flex Environment** – this is a set of VMs that have been configured in the Flex Environment with a Device Simulator that will behave like real hardware devices in a SITA Flex suitcase.

Prior to using SITA Flex APIs, you need to <a href="Test Environments_1.htm">set up a test environment</a>.

## Get Support

For any technical support queries or if something is not behaving as documented, send an email to the following support group:

-   <flex.api.support@sita.aero>

# Test Environments

To enable you to test your applications on a representative environment, you are provided access to one of the following:

-   **SITA Flex "Suitcase**" - contains all the devices and software required to develop your application against the SITA Flex APIs. This will have been physically shipped to your location to allow you to use the Flex environment.
-   **Citrix Virtualized SITA Flex Environment** - a set of VMs that have been configured in the Flex Environment with a Device Simulator that will behave like real hardware devices in a SITA Flex suitcase. You access this environment over the internet with credentials provided to you as part of application registration.

> **Note:** The Citrix Virtualized SITA Flex Environment is provided if shipping a suitcase is determined to be problematic. For example, duration of shipping, import rules, damage to the suitcase or devices in shipping, or device availability.

## SITA Flex Suitcase

### Components

The SITA Flex Suitcase contains the following components:

![](images\flex-suitcase.png)

The suitcase is a self-contained Flex environment consisting of the following items:

-   Windows 10 Laptop
-   Boarding Pass Printer (Custom TK180)
-   Bagtag Printer (Custom TK180)
-   Travel Document Reader (DESKO IDenty Chrom)
-   Boarding Gate Reader (DESKO BGR 504 pro)

### Verify Suitcase Condition

Check for visible signs of damage to the devices in the suitcase.

If there are, please inform SITA immediately at <flex.api.support@sita.aero> before using the suitcase.

If any devices are damaged, then disconnect those devices to ensure no further damage to them or the connected laptop.

### Check and Power On Devices

1. Ensure that all devices are connected via their USB cables and power cables.
1. Ensure that both the printers have enough stock loaded into them.
1. Power on the devices and ensure the following occurs:
    - **Printers** - the screens light up with no errors on startup.
    - **Travel Document Reader** - a green light displays.
    - **Boarding Gate Reader** - the screen displays that it is ready.

### Launch Windows 10 Desktop

1. Power on the Windows 10 Laptop and ensure that it boots the Windows 10 Desktop.

    - The **Peripheral View** window displays on the laptop.

    ![](images/peripheral-view.png)

    - The **Peripheral View** runs locally on the workstation and displays the status of the devices.
    - If you do not see the **Peripheral View** as shown above, or no devices are showing under the **VPS Devices** tab, refer to the troubleshooting section <a href="Peripheral View Shows No devices_1.htm">Peripheral View Shows No devices</a>.

### Verify Devices Statuses

The next step is to ensure all the devices listed in the **Peripheral View** are showing as `Online`.

If you do not see `Online` statuses for all devices, refer to the <a href="UnknownUnreachable Device_1.htm">troubleshooting Unknown Unreachable Device(s)</a>.

If all statuses look correct, then your suitcase is ready for application development.

Continue to <a href="Get Started using Flex_1.htm">Get Started using Flex</a>.

## Citrix Virtualized SITA Flex Environment

In addition to using the devices included in the SITA Flex suitcase, you may also interact with Flex using a Device simulator in a virtualized environment configured with Flex. The Device Simulator hosts "fake" devices that behave like the real ones included in the suitcase.

It is recommended that you download the **Citrix Workspace** application to access SITA's Citrix NetScaler Gateway.

### Install Citrix Workspace

1. Download the latest version of the [Citrix Workspace app](https://www.citrix.com/en-gb/downloads/workspace-app/windows/workspace-app-for-windows-latest.html).
1. Download and open the installer.
1. Select all default settings.
    - The installation completes, with the option to **Add Account**.
1. Click **Add Account**.
    - The **Citrix Workspace** displays.

### Log in to Citrix Workspace

1. Enter and submit the **Store URL** provided to you by SITA.
2. Enter your **Citrix Workspace** **Username** and **Password** provided by SITA.
3. Click **Sign In**.

### Optional: View Primary Account

After signing in for the first-time, `Store Service` has now been added as your primary account.

To view accounts:

1. Click the drop-down arrow to the left of the search bar in the application header and select **Accounts**.

    ![](images/citrix-workspace.jpg)

    - The `(Primary)` account `Store Service` is visible.

    ![](images/add-remove-accs.jpg)

    - You may also **Add** or **Remove** accounts from this window.

2. Click **Ok** to close the window.

### Add VM to Workspace

If the VM you are assigned is not visible from the home page, you may add it.

To add a VM to your workspace:

1. Click on the **+** icon on the left side of the screen.
1. Click the VM you have been assigned.
    - A VM icon transitions onto your workspace that allows quick access to that VM.
    - If you click **+** again, you will notice a green check mark displays next to the VM to indicate it has been added.

### Log into the VM

> **Note**: Copying and pasting information into the VM is not allowed for security reasons -- you must hand type all information. If you need assistance making something available on the desktop, contact <flex.api.support@sita.aero>.

To log in to the VM:

1. Click the quick access link to the VM you have been assigned from your workspace.

    - If you see an error stating "The resource is unavailable currently", refer to <a href="VM Not Available_1.htm">troubleshooting an unavailable VM</a>.

2. Enter your **VNC Password** provided by SITA.

    - If successful, the Windows lock screen displays.

3. Right-click the blue header of the **VNC Window** and select **Send Ctrl+Alt+Del**.![](images/vnc-window.jpg)

    - A VM Windows Login screen displays.

4. Enter and submit the Windows Credentials (SITA APC Logon) that you have been provided by SITA.
    - The **Peripheral View** opens and displays the status of the devices.

![](images/perip-view-status.jpg)

### Add a Device

Devices must be added using the Device Simulator before they can interact with Flex.

To add a device:

1. Double-click the **Device Simulator** icon screen on Windows desktop.

    ![](images/device-sim-shortcut.jpg)

    - The **Device Simulator** displays.

1. Click **Add Device**.

    ![](images/device-sim-add.jpg)

> **Note:** For demonstrative purposes, you will be adding an `ATBStandard` device. However, note that there are many other devices available.

3. Click the **Device Type** drop-down and select `ATB Standard`.

![](images/device-type.jpg)

4. Leave all default values the same for the selected `ATB Standard` device.
5. Click **Add Device**.

    - The device now displays in **Device Simulator** and is available to **Run**.

6. On the device, click **Options**, then **Settings**.
    - An **ATB Settings** window displays.
    - You may modify several fields that enable changes in the behavior of the device. However, the default values should be enough for your initial development.

![](images/atb-settings.jpg)

7. Click **Save and Close** in the **ATB Settings** window.

### Run the Device

1. On the device, click **Run**.
    - The **ATB Simulator** page displays, and the **Session Log** updates as the device is activated.

![](images/run-device-periph.jpg)

2. From Windows desktop, return to the **Peripheral View** and observe that the **ATB** device status is now showing in green as `Online`.

    ![](images/run-device-periph-1.jpg)

### Next Steps

After having successfully added and run a device in the **Device Simulator**, you are now ready to interact with the device using the Flex APIs.

Repeat the steps above for any other device type. Many devices can run at the same time using the Device Simulator.

> **Note**: All the default values should be used when adding and running the device, unless otherwise stated.

Continue to <a href="Get Started using Flex_1.htm">Get Started using Flex</a> to interact with the device you just added.

## V1 to V2 Changes

For customers moving from V1 to V2, this section describes some of the basic changes you should consider for the new version of the APIs.

### Messages Properties

Service bus messages now have a set of Message Properties (some built in, some custom) that assist you as the consumer in deserializing the Message Body of the message.

This is a change from the ‘envelope with payload’ format of the v1 messages and is an improvement since you only have to deserialize the body one time based on the `MessageType` property.

> **Note:** A full list of Service Bus Message Types is described in the Messages Reference sections.

Here’s a brief code snippet that shows the difference between a v1 message and a v2 message:

```C#
using Microsoft.Azure.ServiceBus;
using Sita.AirportApi.ServiceBusConsole.Core.Model.FlexCore;
using System.Text;

namespace Sita.AirportApi.ServiceBusConsole.Core.Model
{
    public class DisplayMessage
    {
        public string MessageNamespace { get; set; }
        public string MessageType { get; set; }
        public string MessageVersion { get; set; }
        public string ConnectionId { get; set; }
        public string DeviceId { get; set; }
        public string CorrelationId { get; set; }
        public string Timestamp { get; set; }
        public string MessageBodyJson { get; set; }

        /// <summary>
        /// Create a DisplayMessage object from a Flex Core Platform Message
        /// </summary>
        /// <param name="platformMessage"></param>
        public DisplayMessage(PlatformMessage platformMessage)
        {
            MessageType = platformMessage.PayloadType;
            MessageVersion = platformMessage.PayloadVersion;
            MessageBodyJson = platformMessage.PayloadAsJson;
        }

        /// <summary>
        /// Create a DisplayMessage object from a Session Management V2 Message
        /// </summary>
        /// <param name="platformMessage"></param>
        public DisplayMessage(Message message)
        {
            MessageNamespace = message.UserProperties["MessageNamespace"]?.ToString();
            MessageType = message.UserProperties["MessageType"]?.ToString();
            MessageVersion = message.UserProperties["MessageVersion"]?.ToString();
            ConnectionId = message.UserProperties["ConnectionId"]?.ToString();
            DeviceId = message.UserProperties["DeviceId"]?.ToString();
            Timestamp = message.UserProperties["Timestamp"]?.ToString();
            CorrelationId = message.CorrelationId;
            MessageBodyJson = Encoding.UTF8.GetString(message.Body);
        }
    }
}

```

##### Code Snippet showing the difference between v1 and v2 Service Bus Messages

### Flex APIs Reorganization

Many of the endpoints associated with the V1 Locations API have been replaced by the **Session API** endpoints, including requests to create Service Bus Subscriptions and connect to devices.

There is **no longer a Peripheral API** that lets you reserve and release devices, it has been broken out into separate APIs that deal with the different device functions.

-   For example, printing and scanning devices are now controlled by **Print API** and **Scan API**, respectively.
-   The request to reserve a device is now made to the Session API by sending a POST `/session/v2/connections` request, and you may use the DEL method to delete the connection (or reservation as referred to in V1).

### New DEL Methods

To conform with REST API standards, some requests initially categorized as POST methods that involve the deletion of certain entities are now changed to DEL methods. For example:

-   Instead of unsubscribing from a Service Bus Subscription with a POST `/v1/location/unsubscribe` request, you now send a **DEL** `/session/v2/subscriptions/{subscription_id}` request.

-   Instead of releasing a peripheral after reserving it (POST `/v1/peripheral/release`), you send a request to delete the connection **DEL** `/session/v2/connections/{connection_id}`.

The GET method will also be incorporated into future releases.

### No Session Token

Previously, to use Flex APIs, a `/v1/location/getsessiontoken` request must be made to acquire a session token that tracks the session and maps all calls made during the session. The Request Body needed to include a `LocationID` and `AirlineCode`. The request returned the `SessionToken` to be included in the Request Body of all future API calls made during the session.

There is no longer a need to request a session token. The `access_token`, included as the `bearer_token` in Authorization Headers, now contains the required information to map your API calls during the session. The `access_token` contains application registration details including the application name that contains the `AirlineCode`. Certain roles assigned to that `AirlineCode` govern the allowed interactions with Flex APIs.

### Subscribe Request Changes

In V1, the response after sending a `/v1/location/subscribe` request included a `locationCapabilityList` with a list of devices at the location and their statues. In V2, the `/session/v2/subscriptions` request _only returns Service Bus details_ for the new subscription.

The Service Bus details are largely the same, except some of the property names are different.

-   There is a new `Subscription ID` that is Flex-specific and must be included in all requests connecting to and interacting with devices.
-   The `serviceBusSharedAccessToken` is now contained within the `connectionString` that holds all information required for Azure to validate you have access to the Azure Service Bus.
-   The property `serviceBusTopic` has replaced `topicName` and has a fixed value of `airline-messages` in all situations.
-   The property `subscriptionName` has replaced `serviceBusSubscription` and is a GUID returned per subscription.
-   Both properties `serviceBusTopic` and `subscriptionName` are identifiers to tell your application which specific channel it should read Service Bus messages.

### New Reservation Endpoint

The new POST `/site/v2/reservations` request limits use of a location to the airline backend with a specific airline code that made the request. The airline backend must reserve the location to make use of its devices.

### No Device 'Status' Request

There is a no longer a `/v1/location/status/` request available to return device statuses at a location. Instead, when you connect to a device, a `DeviceStatus` message is displayed on the Service Bus that indicates the device status. When the device status changes in some cases, a new message is sent.

The `/session/v2/locations/{locationId}` returns a list of devices and their capabilities, but not their statuses.

### 'Connect', not 'Reserve'

The V1 POST `/v1/peripheral/reserve` request should not be confused with the new `/site/v2/reservations` endpoint, they are unrelated. Previously, the purpose of reserving a device was to 'connect' to it. The new `/site/v2/reservations` endpoint is about reserving a location for exclusive access to its devices.

Instead of 'reserving' a device through a POST `/v1/peripheral/reserve` request, you now 'connect' to a device by making a POST `/session/v2/connections` request. The outcome of the request is the same, to connect to a device to send and receive messages.

Instead of passing a `LocatorList` value to identify the peripheral, the IoT Hub identifier `deviceID` is passed.

### 'DeviceID' instead of 'Locator'

The IoT Hub identifier `deviceID` is now used in requests instead of `Locator`.

### No TransactionID or RequestID

In V1, the `TransactionId` property was required to pair certain kinds of requests with responses on the Service Bus. In addition, certain requests also required a `RequestId` used by the API to ensure that duplicate messages are not processed.

Both these properties are no longer required.

### No 'Enable' or 'Disable' Devices

Previously, devices needed to be 'enabled' to indicate the application is ready to receive data via reading or scanning and 'disabled' to stop the flow of information from the device to the application.

You no longer need to Enable or Disable devices, except for scan devices. 'Enable' is now POST `/scan/v2/startscanning` and 'Disable' is now POST `/scan/v2/stopscanning`. The `/scan/v2/startscanning` request readies the device to start scanning airport documents.

### No AEA Command Request

While it is possible to send an AEA format print request, there is no longer the ability to send AEA commands to a device to handle the whole device interaction in your application as was possible previously.

# Get Started using Flex

By the time you have reached the end of this **Get Started** section, you will:

-   have completed any prerequisite steps required for using Flex APIs.

-   understand how Flex handles authentication and how to retrieve an `access_token` to authorize your requests.

-   know the basic components of a Flex API request (e.g., Resource URLs, parameters, and Request Bodies).

## Prerequisites

Before you can start using SITA Flex APIs, you need to have already:

-   Completed the Flex Registration process, which includes an App Registration in Azure Active Directory.
-   Registered a [developer.aero](https://www.developer.aero) account to acquire credentials needed for authentication.
-   Downloaded the Postman Collection available on [developer.aero](https://www.developer.aero) that includes a Postman environment `.json` file. This tutorial references the Postman collection frequently.
-   Set up a test environment, either the <a href="SITA Flex Suitcase_1.htm">SITA Flex Suitcase</a> or the <a href="Citrix Virtualized SITA Flex_1.htm">Citrix Virtualized SITA Flex Environment</a>.

## Get Credentials

Register and login to [developer.aero](https://www.developer.aero) and retrieve your **Consumer Key** (i.e., `client_id`) and **Consumer Secret** (i.e., `client_secret`).

To locate this information:

1. Click **Apps** in the top-right corner.
1. Click **Flex API**.
1. Scroll down until you see your **Consumer Key** and **Consumer Secret**.

In the Postman environment file provided by SITA, you must update the `clientid` and `clientsecret` variables with your credentials.

> **Tip**: For both these variables, you must update the **Initial Value** and **Current value** columns with the same data. For example, you must enter your `clientid` twice, one time in each column.

## Protect Sensitive Information

It is very important to protect sensitive information. Your `client_id` and `client_secret` should be kept safe and remain as private information for your application.

General Guidelines:

-   Never store this information in source code or in client applications that communicate with your main application server (that then communicate with SITA Flex).
-   Technologies such as [Azure Key Vault](https://azure.microsoft.com/nl-nl/services/key-vault/) (or other equivalents) are recommended to store
    sensitive information. Please follow security best practices when handling this
    information.

## Login to a Test Environment

Login to either the SITA Flex Suitcase or the Citrix Virtual Environment, depending on which one you have set up.

## Download Azure Client Library

Download the Service Bus client library for the language you are using, available via the Azure SDK. How to install and properly configure Azure client libraries is outside the scope of this document. For detailed information, see Microsoft's official documentation:

-   [Azure Service Bus messaging overview - Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview#client-libraries)

## Optional: Set up Service Bus Console

> **Note:** These instructions assume a `ServiceBusConsole.7z` file has been given to you. Otherwise, skip this section.

The Service Bus Console allows you to view Service Bus responses. The Console takes the subscription details returned after a Subscribe call and connects to that subscription. Then, when you connect to and interact with devices, messages related to those events are displayed in the console.

In reality, a customer would use the Azure Service Bus SDK provided by Microsoft to receive messages on the Service Bus. SITA staff use the console to simulate how a live customer would receive messages without the need of creating an application.

To run the console:

1. Install the following programs, if not already installed:

    - [Z-zip](https://www.7-zip.org/) - to extract the console file package.
    - [Notepad++](https://notepad-plus-plus.org/downloads/v8.1.9/) - to open the `.json` file
    - [.NET 5.0 Runtime](https://dotnet.microsoft.com/download/dotnet/5.0/runtime?utm_source=getdotnetcore&utm_medium=referral) - required for the console to run.

2. In File Explorer, right-click `ServiceBusConsole.7z` file, hover over **7-zip** and select **Extract files**...

3. Leave the default settings as is and click **Okay**.

    - A new folder displays containing the extracted files.

4. Open the new **ServiceBusConsole** folder.

5. Right-click `ConnectionDetails.json` and select **Edit with Notepad++**.

6. In Postman, send a `/session/v2/subscriptions` request.

7. Copy the JSON returned in the Response Body, and paste it into the `ConnectionDetails.json`, replacing its current contents.

8. Save and close the file.

9. Back in the extracted folder, double-click the `Sita.AirportApi.ServiceBusConsole` executable to run the Console.

    - Look for the file named `Sita.AirportApi.ServiceBusConsole` whose type is `Application` (as seen in the **Type** column in Windows Explorer).
    - The console displays.

10. Hit Enter and the console will subscribe to the service bus subscription entered earlier.
    - Device messages returned on the Service Bus are now displayed in the console in real-time.

If you hit Enter twice, you have aborted the connection to the Service Bus and will not receive messages.

To resolve:

1. Close the Terminal.
2. Double-click the file to open another Terminal.
3. Hit Enter (one time).

## Authenticate

Flex APIs use the Microsoft OAuth2 flow for authentication. Read Microsoft's official documentation on [OAuth2](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-oauth2) for more details.

SITA assigns you an application id (i.e., `client_id`), application secret (i.e., `client_secret`) and `resource` that can then be used to obtain an `access_token` for SITA Flex APIs (referred to as `bearer_token` in the Authorization Header of requests).

-   The `client_id` is the public identifier for your app and is unique across all clients that the authorization server handles.
-   The `client_secret` is a secret known only to your application and the authorization server.
-   The `resource` is a GUID denoting the resource / service / application that "access to" is being requested.

> **Note:** The generic `resource` for the PRX (Pre-Production) environment used for authentication is `51583536-28c7-4ea6-8d94-d0a7e91cb1cb`.

Credentials are provided for each airline backend that will be creating a service bus subscription.

The `access_token` provides authentication for clients to securely call Flex APIs protected by Azure, and it must be included in the header of API calls.

> **Note**: Access tokens are valid for 60 minutes.

The basic grant flow for the Pre-Production Environment is shown below:

![](images/grant-flow.png)

##### Grant Flow for Pre-Production Environment

> **Note:** SITA Flex uses the v1.0 endpoints of the Microsoft Identify Platform (i.e., Azure Active Directory).

## Get Access Token

Send a **Get Access Token** request to exchange your credentials for an access token that authorizes your API calls. This token is returned in the JSON response as an `access_token` but should be included in Authorization Headers of future requests made during this session as `bearer_token`.

### Request Body

To successfully make the request, you must include your credentials in the Request Body.

In the Request Body, notice your credential values are represented by Postman variables. For example, `{{clientid}}`. The Postman variables used are defined Postman environment file.

### Success Response

A successful request returns the `200 OK` status code with a JSON Response Body containing the `access_token`.

```JSON
{
    "token_type": "Bearer",
    "expires_in": "3599",
    "ext_expires_in": "3599",
    "expires_on": "1635954949",
    "not_before": "1635951049",
    "resource": "51583536-28c7-4ea6-8d94-d0a7e91cb1cb",
    "access_token": "eyJ0eXAiOiJKV1QiLsf1V6TJUs1P3601"
}
```

##### Response Body containing the `access_token`

In Postman, if you check the **Tests** tab, you will notice there is Javascript code that saves the `access_token` value that was returned to the `{{bearer_token}}` variable defined in the Postman environment. Now, when future requests are made in this session, the `bearer_token` will be included in the Authorization Header without the need to manually enter it.

###### **Warning:** The bearer token expires. The current expiration time is set to 3599 seconds as indicated in the example Response Body above. Ensure that you refresh this access token if continued access is required; otherwise, you will receive a <a href="401 Unauthorized_1.htm">401 Unauthorized</a> error. The token can be refreshed by requesting another access token

## Construct an API Request

Now that you have an `access_token`, it is possible to start sending API requests. API Requests must contain the components described below:

### Resource URLs

At present, all Flex Resource Endpoint URLs are comprised of:

-   A REST API standard method preceding the URL for accessing the endpoint, either POST, GET, or DEL.
-   A Base URL specific to the SITA Flex environment, sometimes displayed as `{{baseurl}}` in the Resource URL in Postman.
-   The end path of the Resource URL is typically comprised of the API name followed by the endpoint name. For example, the end path `/session/v2/subscriptions` contains the API `session` followed by the endpoint `subscriptions`.
-   Path parameters, which may or may not be required depending on the endpoint. For example, certain endpoints require you to pass a `locationId` and DEL operations require you to pass the ID of the entity you wish to delete. Path parameters are the only kind of parameters passed in the Resource URLs.

### Header Parameters

A `location-id` is required in the header of the request. Flex APIs use the Azure API Management service (APIM) to route requests to the correct Azure Region based on the airport code extracted from the `LocationId`.

### Authorization Headers

An `access_token` is required in the Authorization Header of requests to provide authentication for clients to securely call Flex APIs.

### Request Bodies

A Request Body may or may not be required depending on the endpoint. For example, to send a request to an ATB device to print a boarding in PDF format, you must pass `printData` in the Request Body that includes the PDF data.

## Next Steps

Now that you have an `access_token` that authorizes your requests, you may now follow the <a href="Session API_1.htm">Session API</a> flow.

# Session API

The **Session API** endpoints allow airline backends to connect to devices configured in a SITA Flex environment and to receive those messages on an Azure Service Bus subscription.

The flow of the API is to:

-   **Reserve** a location configured in the SITA Flex environment by sending a POST `/site/v2/reservations` request.

-   **Subscribe** to the Azure Service Bus subscription for your airline backend through a POST `/session/v2/subscriptions` request.

-   **Get Location Capabilities** through a POST `/site/v2/locations/{locationId}` request that returns list of devices at a location and their capabilities.

-   Create a **connection** to Flex devices to receive messages on the subscription through a POST `/session/v2/connections` request.

> **Note:** The Get Location Capabilities endpoint (`/site/v2/locations/{locationId}`) is not serviced by the Session API. It is serviced by the Location API. However, it fits logically in the Session API flow at the time this documentation was written.
>
> Also, note that the Reserve (`/site/v2/reservations`) and Get Location Capabilities endpoints both contain the `/site` in their end paths. `/site` is just a way of logically grouping these two endpoints and is not an API.

Example locations configured in the SITA Flex environment include:

-   Airport CUTE type workstations for check-in and boarding
-   CUSS Type devices like a Self-Service Kiosk
-   Self-Service BagDrop and Self-Service Boarding Gate

> **Note:** When reserving a location, the `locationId` should not be confused with a workstation with peripherals physically connected to it. Rather, it is a logical entity that has certain capabilities associated with it.

## Reserve a Location

The POST `/site/v2/reservations` request limits use of a location to the airline backend with a specific airline code that made the request. The airline backend must reserve the location to make use of its devices.

> **Note:** Flex knows the airline code of the requester because it is encoded in the access token.

### Request Body

The airline backend sends a POST `/site/v2/reservations` request, passing the `LocationId` in the Request Body it wishes to reserve.

The following is a sample Response Body containing the location to be reserved:

```JSON
{
  "LocationId": "A-ZZU-MZUZUAIRPORT-ZZU1CKB004"
}
```

##### Sample Request Body for POST `/site/v2/reservation` request containing the `LocationId` passed from the client app

### Response Body

A successful request returns a `2xx` success status code with the JSON Response Body containing the `reservationId`. You must include this ID later in connection requests to devices at the reserved location.

```JSON
[
    {
        "reservationId": "868e5715-2c82-426e-b7da-10e208dd865d",
        "airlineCode": "ZZ",
        "locationId": "A-ZZU-MZUZUAIRPORT-ZZU1CKB004",
        "expiryTime": "2021-11-24T19:26:30.846778+00:00"
    }
]
```

##### Sample Response Body for POST `/site/v2/reservation` request containing the `reservationId`

The Response Body contains informational properties such as the `airlineCode` encoded in the access token and `locationID` passed in the Request Body. The property `expiryTime` indicates when the reservation is due to expire.

> **Note:** It is important that airline backends keep track of when a location reservation is about to expire so it can request a new reservation if continued access is desired.

Now that the location is reserved by an airline code, any request made by another airline will be rejected. This will occur until the reservation's `expiryTime` has been reached or the airline who made the reservation has sent a DEL `/site/v2/reservation` to delete the reservation.

The following error displays when attempting to reserve a location that is already reserved:

```JSON
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "Bad Request",
    "status": 400,
    "detail": "Location reserved by other airlines.",
    "traceId": "00-25dd79293ba71f479ce30da826eecd09-3aa97e2de755f540-00"
}
```

##### Sample 400 Bad Request Error Message when a location is reserved by another airline

> **Note:** For a ground handler, there is a concept that any airlines it handles can share a location at the same time.

Sending a DEL `/site/v2/reservations/{reservation_id}` request returns a `2xx` success status code and deletes a reservation if one exists.

### Best Practices

#### Deleting Reservations

It is important to delete the reservation once done with a location because an active reservation prevents other airline backends from using the location. This is achieved by sending a DEL `/site/v2/reservations/{reservation_id}` request, passing in the `reservation_id` of the reservation to be deleted as a path parameter.

## Create a Subscription

The POST `/session/v2/subscriptions` request creates a subscription on the Azure Service Bus and returns a Service Bus endpoint and SAS token for the airline backend to connect to the subscription.

Sending a POST `/session/v2/subscriptions` request does not 'subscribe' to the Service Bus, it only creates a subscription and returns connection details. The application must then connect to the Service Bus connection using the connection details provided.

The Microsoft Service Bus documentation provides best practices for how applications should be configured to do this for each client library: [Azure Service Bus messaging overview - Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview#client-libraries).

> **Note:** No Request Body is required to create a subscription.

### Response Body

A successful request returns a `2xx` success status code with the JSON Response Body containing the Service Bus details for the new subscription.

```JSON
{
    "subscriptionId": "4ec343b2-eab5-4fd3-b0c4-3cd5bc30ee5c",
    "topicName": "airline-messages",
    "subscriptionName": "2c73e63e-a3ef-4fcc-b13c-d2a90912bca8c",
    "expiryTime": "2021-10-22T23:54:50.8272178+00:00",
    "connectionString": "Endpoint=sb://flex-pry-eastus-asb.servicebus.windows.net;SharedAccessSignature=SharedAccessSignature sr=https%3A%2F%2Fflex-pry-eastus-asb.servicebus.windows.net%2Fairline-messages%2Fsubscriptions%2F2c73e63e-a3ef-4fcc-b13c-d290912bca8c%2F&sig=dL2mHQJgfnCIc5SZZ8UgmzSPYoAIJkGEqN7hmAgFKz8%3D&se=1634946891&skn=ClientAccessKey"
}
```

##### Sample Response Body for POST `session/v2/subscriptions` request containing details for connecting to the subscription

**Warning:** Not sending a `/session/v2/subscriptions` request results in a **400 Bad Request** error, as described in the <a href="400 Bad Request_1.htm">400 Bad Request</a> troubleshooting section.

#### `connectionString`

The `connectionString` returned in the Response Body contains the subscription's Service Bus endpoint that begins after `Endpoint=`. In the example Response Body displayed previously, the endpoint is: `sb://flex-pry-eastus-asb.servicebus.windows.net`. Notice the endpoint contains the environment. In the example, the Pre-Production environment is named `pry` and the Azure Region containing the subscription is `eastus`.

The `SharedAccessSignature`, also known as a SAS token, follows the Service Bus endpoint and contains the airline backend's credentials for accessing the subscription. The entire value of the SAS token needs to be passed in the Authorization Header of requests made to the Azure Service Bus REST API.

It is not necessary to understand the contents of the SAS token. It is important to include the full SAS token value in the HTTP Authorization Headers of requests sent to the Azure Service Bus REST API. Without these credentials, you will receive a `Not Authorized` error message.

> **Note:** To learn more about SAS tokens, consult the Microsoft documentation on [Azure Service Bus Messaging](https://docs.microsoft.com/en-us/azure/service-bus-messaging/).

#### `subscriptionId`

The `subscriptionId` is a Flex-specific ID passed in the Request Body of connection requests to associate a device with a specific Service Bus Subscription.

For example, when connecting to an ATB device, the airline backend will send a POST `/session/v2/connections` request, including the `subscriptionId` in the Request Body. The returned `connectionID` is now associated to the subscription, and thus Flex knows to route any messages coming from the device to that specific subscription.

> **Tip:** In Postman, if you click the **Tests** tab, you will notice there is Javascript code that sets the environmental variable `{{subscription_id}}` to the `subscriptionId` returned after making the request. Now, when future requests are made in this session, the `subscriptionId` is included in the Response Body without the need to manually enter it.

#### `expiryTime`

After sending the request, an `expiryTime` is returned set to **12 hours** from the time the request was made, at which point the subscription expires.

#### Service Bus Properties

The Response Body also contains properties that are Service Bus-specific. These properties are passed in verbatim when you use the Microsoft SDK to connect to the subscription.

The `topicName` and `subscriptionName` are identifiers to tell your application which specific subscription it should read Service Bus messages. The `topicName` has a fixed value of `airline-messages` in all situations, and `subscriptionName` is a GUID returned per subscription.

### Best Practices

#### How to Handle Subscriptions

The airline backend can handle subscriptions in several different ways. The first way is to keep a subscription alive through repeated calls to the POST `session/v2/subscriptions` endpoint to create a new SAS token when the old one expires. The SAS token is contained in the `connectionString` in the Response Body.

> **Note:** The SAS token contains the credentials needed by the airline backend to access the Azure Service Bus.

The second way is to have an 'on-demand' solution whereby the airline backend determines if there is a subscription in place for the specified location. If there is already a subscription for the location, the airline backend uses that subscription and does not send a request to create a new one. If there is no subscription in place, it sends a POST `session/v2/subscriptions` request to create a new subscription.

> **Note:** The airline backend will only ever have one subscription for an Azure Region. So, if a new subscription is created, it will continue to use that subscription for all requests from client applications in that region.

#### Avoid Multiple SAS Tokens

Making repeated calls to POST `session/v2/subscriptions` does not create a new subscription. The same `subscriptionId` associated with the existing subscription is returned in the Response Body. However, it is important to note that <u>a new SAS token is generated</u>.

If a POST `session/v2/subscriptions` request is made, and there is an existing SAS token that has yet to reach its `expiryTime`, there are now two SAS tokens. In this case, the airline backend should disconnect from the old SAS token and connect to the new one that has an `expiryTime`.

> **Note:** In best practice, an airline backend would never encounter a situation where it would need to disconnect from an old SAS token to use the new one. The ideal scenario would be to allow the old SAS token to expire then create a new one by sending a `session/v2/subscriptions` request.

If the airline backend drops an active connection the Azure Service Bus by disconnecting from a SAS token, no messages are lost. Any messages sent to the subscription are queued and will display once another connection is made with a new SAS token.

#### Protect Subscriptions Details

Since SITA Flex only expects to be interacting with the one authenticated system such as your Application Web Server, it is recommended that the Azure Service Bus subscription details should not be shared amongst several parties. They should remain secret for specific usage in your application at any given point and should not have several consumers who subscribe to this Azure Service Bus. It is recommended that the Web Server backend of your application subscribes to this Azure Service Bus subscription and then any clients that need to be notified are signaled by your backend application using another technology such as SignalR, or an equivalent.

#### Subscription Removal

If an ill-behaved application does not properly clean-up its subscription, an auto-delete on idle takes care of the subscription removal (`AutoDeleteOnIdle` property in Azure Service Bus). Currently, the time is controlled by SITA Flex Core services and is set to **24 hours**.

#### Deleting Subscriptions

If a subscription is no longer needed, it is best practice to delete the subscription by sending a DEL `/session/v2/subscriptions/{subscription_id}` request, passing in the `subscription_id` of the subscription to be deleted as a path parameter.

## Get Location Capabilities

The POST `/site/v2/locations/{locationId}` request provides a way for airline backends to determine what devices are configured at a location and their capabilities.

> **Note:** This request is not required, but it can return useful information for an airline backend act upon.

You must pass the `locationId` as a path parameter in the request.

### Response Body

A successful request returns a `2xx` success status code with the JSON Response Body containing the list of devices and their capabilities at the requested `locationId`:

```JSON
[
    {
        "deviceId": "A-ZZU-MZUZUAIRPORT-ZZU1CKB004.ATB1",
        "capabilities": [
            "PrintBoardingPass"
        ]
    },
    {
        "deviceId": "A-ZZU-MZUZUAIRPORT-ZZU1CKB004.BTP1",
        "capabilities": [
            "PrintBagTag"
        ]
    },
    {
        "deviceId": "A-ZZU-MZUZUAIRPORT-ZZU1CKB004.LSR1",
        "capabilities": [
            "ReadBarcode"
        ]
    },
    {
        "deviceId": "A-ZZU-MZUZUAIRPORT-ZZU1CKB004.LSR2",
        "capabilities": [
            "ReadBarcode"
        ]
    },
    {
        "deviceId": "A-ZZU-MZUZUAIRPORT-ZZU1CKB004.OCR1",
        "capabilities": [
            "ReadTravelDocument",
            "ReadBarcode"
        ]
    },
    {
        "deviceId": "A-ZZU-MZUZUAIRPORT-ZZU1CKB004.PMT1",
        "capabilities": [
            "ProcessPayment"
        ]
    },
    {
        "deviceId": "A-ZZU-MZUZUAIRPORT-ZZU1CKB004.SBD1",
        "capabilities": [
            "BagDrop"
        ]
    },
    {
        "deviceId": "A-ZZU-MZUZUAIRPORT-ZZU1CKB004.BGR1",
        "capabilities": [
            "Gate"
        ]
    }
]
```

##### Sample Response Body for POST `/site/v2/locations/` request containing device details at a location

#### `deviceId`

The Response Body includes a `deviceId` for each device configured at a location.

The `deviceId` is comprised of the location (for example, `A-ZZU-MZUZUAIRPORT-ZZU1CKB004`), followed by the name of the device (for example, `.BGR1`).

The airline backend then uses these IDs to connect to devices at the location. For example, to connect to an ATB through a POST `/session/v2/connections` request, you must pass the `DeviceId` in the Request Body.

#### `capabilities`

Many times, you can determine the capabilities of a device by simply looking at the `deviceId`. For example, the `ATB` device only has the capability to print a boarding pass. So, when a `deviceId` contains `.ATB`, it is assumed that device only has the `PrintBoardingPass` capability.

    {
        "deviceId": "A-ZZU-MZUZUAIRPORT-ZZU1CKB004.ATB1",
        "capabilities": [
         "PrintBoardingPass"
        ]
    },

##### Sample ATB Device whose only capability is to print a boarding pass

However, some devices have multiple capabilities. For example, a General Purpose Printer (GPP) may have both the capabilities `PrintBoardingPass` and `PrintBagTag`. Returning a list of devices is useful to an airline backend particularly in cases where devices at a location have multiple capabilities and can receive different kinds of requests.

## Connect to a Device

The POST `/session/v2/connections` request creates a connection to a device at specific location and associates that device to a subscription where it can send messages for the airline backend to consume.

### Request Body

You must pass three properties in the Request Body of a `/session/v2/connections` request:

-   The `DeviceId` returned after sending the `/site/v2/locations/{locationId}` request that listed devices configured at a site.
-   The `subscriptionId` is a Flex-specific ID of the Service Bus subscription the `DeviceId` will be associated to.
-   The `ReservationId` of the location where the device is configured. This ID tells the Flex API that the airline has reserved the location where the device is located.

The following is a sample Request Body:

```JSON
{
    "SubscriptionId": "87fd60f9-aea8-466e-9659-43ad928c75f6",
    "ReservationId": "46d2309e-0ec5-4ef9-98f1-e45a54c76688",
    "DeviceId": "A-ZZU-MZUZUAIRPORT-ZZU1CKB005.BTP1"
}
```

##### Sample Request Body for POST `/session/v2/connections` request seeking to connect to a BTP device

### Response Body

A successful request returns a `2xx` success status code with the JSON Response Body containing the connection details.

```JSON
{
    "connectionId": "a060a6f1-ec5b-43cb-8f0b-bf6f8891ebdf",
    "reservationId": "46d2309e-0ec5-4ef9-98f1-e45a54c76688",
    "subscriptionId": "87fd60f9-aea8-466e-9659-43ad928c75f6",
    "deviceId": "A-ZZU-MZUZUAIRPORT-ZZU1CKB005.BTP1",
    "expiryTime": "2021-11-26T09:30:35.9528789+00:00"
}
```

##### Sample Response Body for POST `/site/v2/reservation` request containing the `connectionId`

The returned `connectionId` is now associated to the `subscriptionId`, so any messages coming from the device will display on that subscription. The airline backend will now use this `connectionId` to send commands to the device through Flex.

An `expiryTime` set to **5 minutes** from the time of the request is returned. This indicates when the connection to the device expires.

> **Tip:** If continued access to the device is desired, ensure to send another POST `/session/v2/connections` request to create a new connection at the time of expiry of the old connection.

The API also returns properties passed in the Request Body (for example, the `reservationId`).

### Best Practices

#### Deleting Connections

If a connection is no longer needed, it is best practice to delete the connection to allow other airline backends to connect to the device. This is achieved by sending a DEL `/session/v2/connections/{connection_id}` request, passing in the `connection_id` of the connection to be deleted as a path parameter.

## Interact with a Device

After having successfully completed the Session API flow, you are now ready to explore all the Flex APIs. There are dedicated sections for each API, each providing an overview of how the API works and a step-by-step walkthrough that uses Postman, a VM, and a Service Bus connection to interact with the API:

-   <a href="Print API_1.htm">Print API</a>
-   <a href="Scan API_1.htm">Scan API</a>
-   <a href="GateAccess API_1.htm">GateAccess API</a>
-   <a href="Bagdrop API.htm">Bagdrop API</a>
-   Payment API _(In Progress)_

# Print API

The **Print API** endpoints allow your airline backend to use airport devices to print airport documents like boarding passes, bag tags, and reports.

A variety of print formats are supported, including PDF, SVGs, AEA Pectabs, Logos, Templates, and Print Data. AEA is a legacy format, while SVG and PDF provide more richness of detail that modern applications require. However, there may be use cases where AEA format is required, so the option is provided.

> **Note:** This documentation does not go into detail about all device types and print formats. It only seeks to demonstrate the capabilities of select devices with SITA Flex. For more information, refer to the AEA Spec. You may request a copy from <flex.api.support@sita.aero>.

The supported devices at present are the following:

| Acronym | Definition                                                                                       |
| ------- | ------------------------------------------------------------------------------------------------ |
| ATB     | Automated Ticket & Boarding Pass Printer that supports the print formats `pdf`, `svg`, or `aea`. |
| BTP     | Baggage Tag Printer that supports the formats `pdf` and `aea`.                                   |
| DCP     | Document Printer that can print reports.                                                         |

## Endpoints

The end path for the Print API starts with **POST** `/print/v2`, followed by the endpoint (i.e. action) for a device to carry out.

### POST /print/v2/boardingpass/{type}

Send a POST `/print/v2/boardingpass/{type}` request to an ATB device to print a boarding pass in the specified format `{type}`. Using this endpoint, boarding passes may be printed in either `pdf` or `svg` format.

### POST /print/v2/boardingpass/aea

Send a POST `/print/v2/boardingpass/aea` request to an ATB device to print a boarding pass in `aea` format.

### POST /print/v2/baggagetag/{type}

Send a POST `/print/v2/baggagetag/{type}` request to a BTP device to print a baggage tag in the specified format `{type}`. Using this endpoint, baggage tags may be printed in `svg` format only.

### POST /print/v2/baggagetag/aea

Send a POST `/print/v2/baggagetag/aea` request to an BTP device to print a baggage tag in `aea` format.

### POST /print/v2/report

Send a Post `/print/v2/report` request to a DCP device to print a report.

## Construct a Print Request

### Resource URLs

At present, Print API Resource URLs are comprised of:

-   A REST API standard method preceding the URL for accessing the endpoint. In the case of the Print API, the only method used is POST.
-   A Base URL specific to the SITA Flex environment, sometimes displayed as `{{baseurl}}` in the Resource URL in Postman.
-   The end path of the Resource URL is comprised of the API name (`print`) followed by the endpoint name. For example, the end path `/print/v2/boardingpass/` contains the API `print` followed by the endpoint `boardingpass`.
-   Path parameters, which may or may not be required depending on the endpoint. For example, when sending a POST `/print/v2/boardingpass/` request, you must append the path parameter `{type}` to the end path to indicate the requested print format for the boarding pass: POST `/print/v2/boardingpass/pdf`.

### Header Parameters

A `location-id` is required in the header of the request. Flex APIs use the Azure API Management service (APIM) to route requests to the correct Azure Region based on the airport code extracted from the `LocationId`.

### Authorization Headers

An `access_token` is required in the Authorization Header of requests for authentication.

> **Note:** The `access_token` is displayed as the Postman variable `bearer_token` in the **Authorization** tab of API requests in the provided Postman collection.

### Request Bodies

All Request Bodies must include the `ConnectionId` of the device the airline backend wishes to interact with and some form of print data depending on the format that defines the print output.

-   PDF, SVG, and report data are represented by the property `PrintData` in the Request Body.
-   AEA print data are represented by the property `AeaPrintData` in the Request Body.
-   In addition to including `PrintData` in baggage tag PDF requests, the `RfidData` property can be included in the Request Body to represent RFID baggage tag data.

The following is a sample Request Body for printing a boarding pass using an ATB device in either PDF or SVG format. PDF and SVG data are represented by the property `printData` passed in the Request Body.

```JSON
{
  "connectionId": "54624182-10c5-481b-ad9a-b9d1473bdb6f",
  "correlationId": "string",
  "printData": "JVBERi0xLjQKJdP0zOEKMSAwIG9iago8PAovQ3JlYXRpb25EYXRlKEQ6MjAxODEwM..."
}
```

##### Sample Request Body for POST `/print/v2/boardingpass/` request

The following is a sample Request Body for printing a bag tag using a BTP device in PDF format. The PDF data are represented by `printData`, same as when printing a PDF using an ATB. However, there is another data property called `rfidData` associated with baggage tag data specific to the BTP.

```JSON
{
  "connectionId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "correlationId": "347d8924-73cf-4662-ad34-0ebfc28c4fc6",
  "printData": "JVBERi0xLjQKJdP0zOEKMSAwIG9iago8PAovQ3JlYXRpb25EYXRlKEQ6MjAxODEwM...",
  "rfidData": {
    "licensePlateNumber": "507KLV",
    "julianDate": "21319"
  }
}
```

##### Sample Request Body for POST `/print/v2/baggagetag/pdf` request

The following is a sample Request Body for printing either a boarding pass or bag tag in AEA format. Notice that `aeaPrintData` is used instead of `printData`.

```JSON
{
  "connectionId": "33ed0d5a-3a92-4f08-be97-73535d73fc09",
  "correlationId": "10099a59-6880-468d-ac66-8bbda5eb7d02",
  "aeaPrintData": {
    "pectab": "UFQjIz9WMU4jQDsjVElDS1QjQ0hLSU4jQk9BUkQjMDEwMTE...",
    "logos": [
      "AAAAANH/wfDR/8Hw0f/B8NH/wfDR/8Hw0f/B8NH/wfDR/8H/B8NH//B..."
    ],
    "printData": "Q1AjMUMwMSMwMVYjMDJNMVZFUllMT05HRVhDRUVEU1NV..."
  }
}
```

##### Sample Request Body for printing boarding passes or bag tags in AEA format

## Service Bus Messages

The following is not an exhaustive list of all possible Service Bus `Message Types`. Only the most common ones encountered when sending Print API requests are described.

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

If the device's status changes for whatever reason (for example, the device goes `Offline` or the paper becomes jammed), a `DeviceStatus` message may display after requesting a print followed by an unsuccessful `PrintResponse` message.

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

Upon making a POST `/print/v2/` request, the Print API acknowledges the request with a synchronous message, returning a `2xx` success status code no matter if the print was successful or unsuccessful. It merely indicates the Print API successfully sent the request.

The API takes the `ConnectionId` and looks up the details associated with the ID, most notably the `DeviceId`. The `DeviceID` is sent to IoT Hub where is it routed to the correct workstation to carry out the command on the peripheral (for example, printing).

The Print API then routes the messages to the Service Bus topic for sending messages to airlines (`airline-messages`), returned as `MessageData` in the **Message Body**. `MessageData` indicates if the request was successful.

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

-   The <a href="Citrix Virtualized SITA Flex_1.htm">Citrix Virtualized SITA Flex Environment</a> to add devices.
-   The SITA Flex API Postman Collection that allows you to send requests to Flex.
-   Your airline backend to receive messages from the Azure Service Bus.

You will be interacting with an ATB device (Automated Ticket & Boarding Pass Printer) since it supports the most print format possibilities like SVG, PDF, or AEA. With this knowledge, you can apply the same steps to interacting with other print devices.

> **Note:** This walkthrough provides some basic troubleshooting steps. However, if an error displays that is not covered, refer to the <a href="Troubleshooting Environments_1.htm">Troubleshooting Environments</a> or <a href="Troubleshooting Error Codes_1.htm">Troubleshooting Error Codes</a> sections for detailed steps on how to resolve the issue.

### Prerequisite Steps

1. Login to the <a href="Citrix Virtualized SITA Flex_1.htm">Citrix Virtualized SITA Flex Environment</a> you set up previously.
2. In Postman, open the **SITA Flex API Collection** and **Postman environment** `.json` files. In the Postman environment file:
    - Ensure your `clientid` and `clientsecret` are populated in both the **Initial Value** and **Current Value** columns.
    - Ensure the `{{location}}` variable corresponds to the VM's machine name as seen in the Peripheral View. For example, a VM with machine name `ZZU1CKB005` as seen in the Peripheral view could correspond to a `location` called `A-ZZU-MZUZUAIRPORT-ZZU1CKB005` in the Postman Environment.
3. In Postman, perform the following:
    - Send a Get Access token request.
    - Send a POST `/session/v2/subscriptions` request.
    - Send a POST `/site/v2/reservations` request.

### Add an ATB Device

> **Note:** If an ATB has already been added, skip this section.

1. In the Device Simulator of the VM, click **Add Device**.

![](images/device-sim-add.jpg)

2. Select **ATBStandard** from the **Device Type** drop-down.
3. Leave the other setting as is.
4. Click **Add Device**.
    - The ATB device is now available in the Device Simulator.
5. On the device, click **Run**.
    - An ATB Device Simulator screen displays. You may keep it open for later use.

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

If the `DeviceStatus` returns as `Offline`, check to see if the device is running in the Device Simulator. If there is a **Stop** button on the device in Device Simulator, the device is running.

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
    - The Print API acknowledges the request by returning a `2xx` success status code, as seen in a tool like Postman.
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

![](images\print-bp-pdf.png)

##### ATB Simulator with Boarding Pass displaying in Print Preview

### Simulate an Unsuccessful Print

The ATB Simulator (and simulators for other print devices) allows you to add a **Fault Indicator** (for example, a paper jam) to simulate a failed print scenario.

1. In the ATB Simulator, set the **Fault Indicator** to `Paper Jam`.

![](images\print-bp-pdf-paperjam.png)

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

This may seem obvious but please ensure that your PDFs and SVGs match the paper stock dimension for boarding passes and bag tags at the airport you are operating at.

# Scan API

The **Scan API** endpoints allow your airline backend to use airport devices to read travel documents like boarding passes, bag tags, and passports.

The supported devices at present are the following:

| Device Acronym | Description                                                                             |
| -------------- | --------------------------------------------------------------------------------------- |
| LSR            | Laser Sensor Reader that reads `BarCodeData` from barcodes.                             |
| MSR            | Magnetic Stripe Reader that reads card payments, returning `CardType` and `Track` data. |
| OCR            | Optical Character Recognition device that reads `MrzData` from passports.               |

## Endpoints

The end path for the Scan API starts with **POST** `/scan/v2`, followed by the endpoint (i.e. action) for a device to carry out.

### POST /scan/v2/startscanning

Send a POST `/scan/v2/startscanning` request to request exclusive access to a device so it can start reading travel documents.

### POST /scan/v2/stopscanning

Send a POST `/scan/v2/stopscanning` request to release a device from exclusive access so other airline backends can reserve the device and use it to read travel documents.

## Construct a Scan Request

### Resource URLs

At present, Scan API Resource URLs are comprised of:

-   A REST API standard method preceding the URL for accessing the endpoint. In the case of the Scan API, the only method used is POST.
-   A Base URL specific to the SITA Flex environment, sometimes displayed as `{{baseurl}}` in the Resource URL in Postman.
-   The end path of the Resource URL is comprised of the API name (`scan`) followed by the endpoint name. For example, the end path `startscanning` contains the API `scan` followed by the endpoint `startscanning`.

> **Note:** No path parameters are required when sending Scan API requests.

### Header Parameters

A `location-id` is required in the header of the request. Flex APIs use the Azure API Management service (APIM) to route requests to the correct Azure Region based on the airport code extracted from the `LocationId`.

### Authorization Headers

An `access_token` is required in the Authorization Header of requests for authentication.

> **Note:** The `access_token` is displayed as the Postman variable `bearer_token` in the **Authorization** tab of API requests in the provided Postman collection.

### Request Bodies

The Request Body for both a `/scan/v2/startscanning` and `/scan/v2/stopscanning` request are the same, only providing a `connectionId` of the device.

## Service Bus Messages

The following is not an exhaustive list of all possible Service Bus `Message Types`. Only the most common ones encountered when sending Scan API requests are described.

### ScanDeviceStatus

#### `DeviceStatus` as `Online`

After you connect to a device, a `ScanDeviceStatus` message is displayed on the Service Bus that should indicate the `DeviceStatus` is `Online` with the `DeviceInUse` property set to `false`.

```JSON
{
    "DeviceStatus": "Online",
    "DeviceInUse": "false"
}
```

##### `ScanDeviceStatus` Service Bus Message Body showing the scan device is `Online` and not currently 'In Use'

> **Note**: `"DeviceInUse": "false"` is the default value when no application instance has reserved the device (`/scan/v2/startscanning`).

#### `DeviceStatus` Changes

If a device status changes from `Online` to `Offline` or `PoweredOff`, a `ScanDeviceStatus` message is sent with an updated `DeviceStatus`.

The following sample message is returned when the `DeviceStatus` of an exclusively reserved device changes to `PoweredOff`.

```json
{
    "DeviceStatus": "PoweredOff",
    "DeviceInUse": "true"
}
```

##### `ScanDeviceStatus` Service Bus Message Body showing the scan device is `PoweredOff`

#### `DeviceInUse` as `True`

A connection to scan device (`/session/v2/connections`) is not enough to receive unsolicited scan data from that device. The airline backend needs to tell the device it wants to receive scan data 'exclusively' by sending a `/scan/v2/startscanning` request. 'Exclusively' using a device means it is locked and will only send scan data to airline backend that made the request.

Upon making a `/scan/v2/startscanning` request, the Scan API acknowledges the request with a synchronous message, returning a `2xx` success status code (as seen in a tool like Postman) and an `accessExpiryTime` in the Response Body.

```json
{
    "accessExpiryTime": "2021-09-30T14:50:07.347Z"
}
```

##### Scan API Response Body containing date-time when exclusive access to the device expires

Unless explicitly released through a `/scan/v2/stopscanning` request, exclusive access to the device will automatically release once the `accessExpiryTime` has been reached. This date-time is **5 minutes** from the time the `/scan/v2/startscanning` request was made.

> **Note**: Subsequent calls to `/scan/v2/startscanning` will extend the `accessExpiryTime` by five minutes from the time of the request. Repeated requests can be used to maintain exclusive access for a longer period.

Now that the request has been successfully made, the Scan API sends the `DeviceID` of the device to the IoT Hub where it is then routed to the correct workstation and peripheral. After carrying out the command, another `ScanDeviceStatus` message is routed to the Service Bus subscription.

In the Message Body, the `DeviceInUse` property is set to `true` which indicates that the device is now exclusively reserved and now may begin sending messages to the airline backend that made the `/scan/v2/startscanning` request.

```json
{
    "DeviceStatus": "Online",
    "DeviceInUse": "true"
}
```

##### `DeviceStatus` Service Bus Message Body indicating the device is exclusively reserved by the airline backend

> **Note:** The same `ScanDeviceStatus` message is sent to all subscribers with an active connection to the scan device to indicate the device can no longer be given a `/scan/v2/startscanning` request.

#### `DeviceInUse` as `False`

When input from the device is no longer needed, make a `/scan/v2/stopscanning` request to release exclusive access to the device so it can be used by other airline backends.

The Scan API acknowledges the request with a synchronous message, returning a `2xx` success status code (as seen in a tool like Postman).

An asynchronous `ScanDeviceStatus` message is sent to all subscribers with an active connection to the scan device to indicate the device is no longer exclusively being used (`"DeviceInUse": "false"`) and is available to successfully receive a `/scan/v2/startscanning` request.

```JSON
{
    "DeviceStatus": "Online",
    "DeviceInUse": "false"
}
```

##### `DeviceStatus` Service Bus Message Body indicating the device is no longer 'in use' and is available to be reserved

### BarcodeRead

When the device executes a scan, a message is sent to the Service Bus containing data in the Message Body determined by the type of scan. The type of device determines the `MessageType`, as well as the type of data returned.

For example, an LSR device that scans a barcode returns a `BarcodeRead` message on the Service Bus, providing the string that contains the barcode (`BarCodeData`) as well as the type of barcode (`BarCodeType`). The type of barcode can be 1D, 2D, etc.

```JSON
{
    "BarCodeData":"6M1AZKUR AHMETKUR ERG6ULZ ZRHISTTK 1912 211Y024F0028 150>10B1OO2211BTK 292352404859427 1 020K X\r\n",
    "BarCodeType":"6"
}
```

##### `BarcodeRead` Service Bus Message Body that returned barcode data scanned by an LSR device

### MagneticCardRead

An MSR device that scans the magnetic strip on the back of a payment card returns a `MagneticCardRead` message on the Service Bus, providing the `CardType` and `Track` data.

```JSON
{
   "CardType":"OtherCard",
   "Track1":"8102172196=000",
   "Track2":"18102172196=10=31122004=",
   "Track3":"",
   "Track4":""
}
```

##### `MagneticCardRead` Service Bus Message Body that returned credit card data scanned by an MSR device

> **Note:** The magnetic stripe on the back of a card is separated into 4 tracks/rows of data that are returned by the Service Bus as multiple lines of `Track` data in the Message Body.

### TravelDocumentRead

An OCR device that scans a passport returns a `TravelDocumentRead` message on the Service Bus, providing the scanned passport data as `MrzData` in the Message Body.

```JSON
{
    "MrzData": "P<D<<SCHMIDT<<KARL<HEINZ<<<<<<<<<<<<<<<<<<<<\r1234567897D<<0102030M0405063<<<<<<<<<<<<<<<8",
}
```

##### `TravelDocumentRead` Service Bus Message Body that returned passport `MrzData` scanned by an OCR device

## Scan API Walkthrough

Follow along with this walkthrough to experience the Scan API, including connecting to a device, issuing a scan command, then reading the response. The following tools are used to demonstrate the Print API:

-   The <a href="Citrix Virtualized SITA Flex_1.htm">Citrix Virtualized SITA Flex Environment</a> to add devices.
-   The SITA Flex API Postman Collection that allows you to send requests to Flex.
-   Your airline backend to receive messages from the Azure Service Bus.

You will be interacting with an OCR device and simulating the scanning of a passport in the VM. With this knowledge, you can apply the same steps to interacting with other scan devices.

> **Note:** This walkthrough provides some basic troubleshooting steps. However, if an error displays that is not covered, refer to the <a href="Troubleshooting Environments_1.htm">Troubleshooting Environments</a> or <a href="Troubleshooting Error Codes_1.htm">Troubleshooting Error Codes</a> sections for detailed steps on how to resolve the issue.

### Prerequisite Steps

1. Login to the <a href="Citrix Virtualized SITA Flex_1.htm">Citrix Virtualized SITA Flex Environment</a> you set up previously.
2. In Postman, open the **SITA Flex API Collection** and **Postman environment** `.json` files. In the Postman environment file:
    - Ensure your `clientid` and `clientsecret` are populated in both the **Initial Value** and **Current Value** columns.
    - Ensure the `{{location}}` variable corresponds to the VM's machine name as seen in the Peripheral View. For example, a VM with machine name `ZZU1CKB005` as seen in the Peripheral view could correspond to a `location` called `A-ZZU-MZUZUAIRPORT-ZZU1CKB005` in the Postman Environment.
3. In Postman, perform the following:
    - Send a Get Access token request.
    - Send a POST `/session/v2/subscriptions` request.
    - Send a POST `/site/v2/reservations` request.

### Add an OSR Device

> **Note:** If an OCR has already been added, skip this section.

1. In the Device Simulator of the VM, click **Add Device**.

![](images/device-sim-add.jpg)

2. Select **OCR** from the **Device Type** drop-down.
3. Leave the other settings as is.
4. Click **Add Device**.
    - The OCR device is now available in the Device Simulator.
5. On the device, click **Run**.
    - An OCR Device Simulator screen displays. You may keep it open for later use.

### Connect to the OCR

1. In Postman, send a `/session/v2/connections` request to connect to the OCR.
    - After connecting to a device, a connection `expiryTime` is returned in the Response Body set to **30 minutes** from the time the `session/v2/connections` request was made.

> **Note:** Notice in the Request Body that the `DeviceId` will be populated partially based on the variable `{{location}}` in the Postman environment.

2. Check the Service Bus subscription for a `ScanDeviceStatus` message:

```JSON
{
    "DeviceStatus": "Online",
    "DeviceInUse": "false"
}
```

##### `ScanDeviceStatus` Service Bus Message Body showing the scan device is `Online` and not currently 'In Use'

The message should return the `DeviceStatus` as `Online` and a `DeviceInUse` property set to `false`. When a print device is not 'in use', it means the device is not exclusively reserved yet through a `/scan/v2/startscanning` request, and thus can be reserved by any airline backend that has connected to it.

> **Note**: In the Tests tab of Postman, there is some Javascript that updates the `ocr_connection_id` environmental variable after connecting to the OCR. This variable is used so you do not need to manually enter a `connectionId` in subsequent calls to the Print API.

#### `DeviceStatus` is `Offline`

If the `DeviceStatus` returns as `Offline`, check to see if the device is running in the Device Simulator. If there is a **Stop** button on the device in Device Simulator, the device is running.

![](images\ocr-stopped-offline.png)

_If <u>it is not</u> running:_

1. Click **Run**.
2. In the Peripheral View, check to see if the OCR **Status** is now `Online`.
3. Check the Service Bus for a new `ScanDeviceStatus` message indicating the SBD is now `Online`.
    - The issue should now be resolved.

_If <u>it is</u> running_, from the Device Simulator on the VM:

1. Click **Stop**.
2. Click **Run**.
3. In the Peripheral View, check to see if the OCR **Status** is now `Online`.
4. Check the Service Bus for a new `ScanDeviceStatus` message indicating the SBD is now `Online`.
    - The issue should now be resolved.

### Reserve the OCR

The next step is to reserve the OCR to give the airline backend exclusive access to interact with it.

1. In Postman, send a `/scan/v2/startscanning` request.
    - If successful, the Scan API returns a `2xx` success status code with the Response Body containing an `accessExpiryTime` set to **5 minutes** in the future.

```json
{
    "accessExpiryTime": "2021-09-30T14:50:07.347Z"
}
```

##### Scan API Response Body containing date-time when exclusive access to the device expires

2. Check the Service Bus for a new `ScanDeviceStatus` message.
    - The `DeviceInUse` property should be set to `true`, indicating that the device is now exclusively reserved and may begin sending messages to the airline backend that made the `/scan/v2/startscanning` request.

```json
{
    "DeviceStatus": "Online",
    "DeviceInUse": "true"
}
```

##### `DeviceStatus` Service Bus Message Body indicating the device is `Online` and is exclusively reserved by the airline backend

### Simulate a Passport Scan

Using the VM, you will simulate an OCR scanning a passport by manually entering MRZ data then reading that data to the device.

1. With the OCR Simulator in the VM, manually enter some data in the **MRZ Data** text box, then click the **Read** button.

> **Note:** Below is a realistic sample of MRZ data, but the data you enter is not important for the purpose of this walkthrough. Also, you can only manually type information into the text box and not paste content from outside the VM.

![](images\ocr-load-mrz.png)

##### OCR Device Simulator with MRZ Data entered

2. Click the **Read** button to simulate the OCR executing a scan and collecting the MRZ data.

![](images\ocr-read-mrz.png)

3. Check the Service Bus for a new `TravelDocumentRead` message that includes the scanned passport data as `MrzData` in the Message Body.

```json
{
    "MrzData": "P<D<<SCHMIDT<<KARL<HEINZ<<<<<<<<<<<<<<<<<<<<\r1234567897D<<0102030M0405063<<<<<<<<<<<<<<<8"
}
```

##### `TravelDocumentRead` Service Bus Message Body that returned passport `MrzData` 'scanned' by the OCR device

### Release the OCR

1. In Postman, send a `/scan/v2/stopscanning` request to release the device from exclusive access.
    - The Scan API acknowledges the request by returning a `2xx` success status code, as seen in a tool like Postman.
2. Check the Service Bus for a `ScanDeviceStatus` message indicating the device is no longer 'in use'.

```JSON
{
    "DeviceStatus": "Online",
    "DeviceInUse": "false"
}
```

##### `DeviceStatus` Service Bus Message Body indicating the device is no longer 'in use' and is available to be reserved by another backend or the same airline backend

## Best Practices

### Avoid Device Access Expiration

Perform multiple `/scan/v2/startscanning` requests to extend the `accessExpiryTime` if continued access to the device is needed. Repeated requests can be used to maintain exclusive access for a longer period.

### Releasing Devices

Once an airline backend is done with a device, it is important to release the device so other airline backends can reserve it. This is achieved by sending a `/scan/v2/startscanning` request, passing in the `deviceId` in the Request Body.

### Multiple User Scenario

-   When more than one application user requests exclusive access to a scan device, the first user to call `/scan/v2/startscanning` is granted exclusive access for five minutes.
-   All users with a connection to the device are sent a `ScanDeviceStatus` message on their Service Bus subscriptions that indicates the device has been reserved for exclusive access.
-   If a second user attempts to gain exclusive access to the device by sending a `/scan/v2/startscanning` request, they will receive an error that the device is not available.
-   To prevent a long wait for a second user when the first user is potentially not using the device anymore, a second user may send a `/scan/v2/startscanning` request that triggers the following:
    -   The first user is sent an `AccessExpiry` message on the Service Bus, with a new `AccessExpiryTime` only **30 seconds** in the future.
    -   The first user can react by sending another `/scan/v2/startscanning` request to reset the `AccessExpiryTime` to **5 minutes** from the time of the request.
    -   The first user can immediately release exclusive access to the device by sending a `/scan/v2/stopscanning` request.
    -   The first user can do nothing, and exclusive access will release after the 30 seconds has elapsed.
    -   If the exclusive access is relinquished, all users connected to the device will receive a `ScanDeviceStatus` message on their Service Bus subscriptions that indicates the device is no longer reserved for exclusive access. Another user may now request exclusive access by sending a `/scan/v2/startscanning` request.

# GateAccess API

The **GateAccess API** endpoints allow your airline backend to interact with Boarding Gate Readers (BGR/BCR) and Self-Boarding Gates (SBG).

The supported devices at present are the following:

| Acronym | Definition           | Description                                                                                                                                                                                                           |
| ------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BGR     | Boarding Gate Reader | Considered part of an **agent-driven** boarding process not involving a gate whereby the agent scans a passenger's boarding pass. If accepted, the passenger may move past the agent and board the flight.            |
| BCR     | Boarding Card Reader | Functions the same as a BGR. For this documentation, the use of the acronym BCR is synonymous with BGR.                                                                                                               |
| SBG     | Self-Boarding Gate   | Considered part of a **passenger-driven** boarding process involving a gate whereby the passenger scans his or her boarding pass at a gate. If accepted, the gate opens, and the passenger can pass through the gate. |

## Endpoints

The end path for the GateAccess API starts with **POST** `/gateaccess/v2`, followed by the endpoint (i.e. action) for device to carry out.

### POST /gateaccess/v2/opengate

Send a `/gateaccess/v2/opengate` request to initiate the boarding process. For a Self-Boarding Gate, the passenger is now allowed to proceed to scan their boarding pass. For Boarding Gate Readers, the agent scanning boarding passes is now ready to receive passengers in the queue.

### POST gateaccess/v2/acceptpassenger

Send a `gateaccess/v2/acceptpassenger` request to tell the GateAccess API that a passenger has boarded successfully. Send this request each time a passenger is processed successfully.

### POST /gateaccess/v2/rejectpassenger

Send a `/gateaccess/v2/rejectpassenger` request to tell the GateAccess API that a passenger is not allowed to board and must see an agent. Send this request each time a passenger is processed unsuccessfully.

### POST /gateaccess/v2/closegate

Send a `/gateaccess/v2/closegate` request to end the boarding process. For a Self-Boarding Gate, this triggers the gate to close. For Boarding Gate Readers, this indicates the boarding process has ended and the agent scanning boarding passes will no longer do so unless the boarding process is initiated over again (`/gateaccess/v2/opengate`).

## Construct a GateAccess Request

### Resource URLs

At present, GateAccess API Resource URLs are comprised of:

-   A REST API standard method preceding the URL for accessing the endpoint. In the case of the GateAccess API, the only method used is POST.
-   A Base URL specific to the SITA Flex environment, sometimes displayed as `{{baseurl}}` in the Resource URL in Postman.
-   The end path of the Resource URL is comprised of the API name (`gateaccess`) followed by the endpoint name. For example, the end path `gateaccess/v2/opengate` contains the API `gateaccess` followed by the endpoint `opengate`.

> **Note:** No path parameters are required when sending GateAccess API requests.

### Header Parameters

A `location-id` is required in the header of the request. Flex APIs use the Azure API Management service (APIM) to route requests to the correct Azure Region based on the airport code extracted from the `LocationId`.

### Authorization Headers

An `access_token` is required in the Authorization Header of requests for authentication.

> **Note:** The `access_token` is displayed as the Postman variable `bearer_token` in the **Authorization** tab of API requests in the provided Postman collection.

### Request Bodies

All Request Bodies must include the `ConnectionId` of the device the airline backend is sending the command to.

-   When sending a `gateaccess/v2/acceptpassenger` or `/gateaccess/v2/rejectpassenger` request, a `Message` may be included that displays on the device if the device is a Boarding Gate Reader.

If the device is a Self-Boarding Gate, the message is ignored. Below is an example `gateaccess/v2/acceptpassenger` request passing in `Message` data. It is possible to display the message on multiple lines as shown below:

```JSON
{
    "ConnectionId": "{{bgr_connection_id}}",
    "CorrelationId": "{{$guid}}",
    "Message": ["MSG Line 1", "MSG Line 2"],
    "ReceiptData": {
      "Data": ""
    }
}
```

##### Sample `gateaccess/v2/acceptpassenger` request including `Message` data to be displayed to the agent

-   When sending a `gateaccess/v2/acceptpassenger` request, `ReceiptData` may be passed to a device printer to print a receipt for the passenger.

```JSON
{
    "ConnectionId": "{{bgr_connection_id}}",
    "CorrelationId": "{{$guid}}",
    "Message": [""],
    "ReceiptData": {
      "Data": "#NN#RD#FONT1#SIZE7#FREEBOARDING RECEIPT#FONT1#SIZE7#FREECLASS CHANGE#FONT1#SIZE0#FREE#FONT1#SIZE0#FREEYour class has changed - See Below#FONT1#SIZE0#FREE#FONT1#SIZE3#NAMELEE/MAYLIN MDM#FONT1#SIZE3#FREE#FONT1#SIZE3#ALCDMH#FONT1#SIZE3#FLNR0002#FONT1#SIZE3#DATE16JAN#FONT1#SIZE3#BORDKUL#FONT1#SIZE3#DESTLHR#FONT1#SIZE3#SQNR8#FONT1#SIZE7#SEAT1K#FONT1#SIZE7#CLSSF#FONT1#SIZE0#FREE"
    }
}
```

##### Sample `/gateaccess/v2/acceptpassenger` Request Body that passes `ReceiptData` to be printed for the passenger

-   When sending a `/gateaccess/v2/rejectpassenger`, you may specify if an `Alarm` sounds.

## Device Processes

### Boarding Gate Reader Process

The following is a summary of the boarding process when an agent uses a Boarding Gate Reader (BGR/BCR) to board passengers:

-   The agent overseeing the boarding process initiates boarding through a `/gateaccess/v2/opengate` request.
-   An agent takes the boarding pass from the passenger and scans it.
-   The airline backend determines if that passenger can be boarded and displays the result for the agent.
-   If the passenger is accepted:
    -   A `/gateaccess/v2/acceptpassenger` request is sent. A green light displays, along with any `Message` passed by the airline in the Request Body (e.g., "Passenger Okay to Board").
    -   The agent gives the boarding pass back to the passenger, and the passenger is then allowed to pass the agent and board the flight.
-   If the passenger is rejected:
    -   A `/gateaccess/v2/rejectpassenger` request is sent. A red light displays, along with any message sent by the airline in the Request Body (e.g., "Passenger Not Okay to Board").
    -   The message can specifically say the reason why the passenger was rejected or only provide a general reason.
    -   Depending on the situation, the passenger may be sent a different desk for an agent to investigate the situation further.
-   Once all passengers are boarding, the agent sends a `/gateaccess/v2/closegate` request that closes the boarding process.

### Self-Boarding Gate Process

The following is a summary of the boarding process when the passenger scans his or her boarding pass using at a Self-Boarding Gate.

-   The agent overseeing the boarding process initiates boarding through a `/gateaccess/v2/opengate` request.
-   The gate display turns green to indicate it is ready to process passengers.
-   The passenger scans his or her boarding pass at the SBG.
-   The airline backend determines if that passenger can be boarded.
-   If the passenger is accepted:
    -   A `/gateaccess/v2/acceptpassenger` request is sent. The gate opens, and the display shows a green arrow indicating to the passenger they may pass through. The gate then closes behind the passenger.
-   If the passenger is rejected:
    -   A `/gateaccess/v2/rejectpassenger` request is sent. A red "X" displays, along with a message such as "you cannot board, go see an agent".
    -   Depending on the situation, the passenger may be sent a different desk for an agent to investigate the situation further.
-   Once all passengers are boarding, the agent sends a `/gateaccess/v2/closegate` request that ends the boarding process.

## Service Bus Messages

The following is not an exhaustive list of all possible Service Bus `Message Types`. Only the most common ones encountered when sending GateAccess API requests are described.

### GateDeviceStatus

#### `DeviceStatus` as `Online`

After you connect a device, a `GateDeviceStatus` message is displayed on the Service Bus that should indicate the `DeviceStatus` is `Online`.

```JSON
{
    "DeviceStatus": "Online"
}
```

##### `GateDeviceStatus` Service Bus Message Body showing the gate device is `Online`

#### `DeviceStatus` Changes

If a device status changes from `Online` to `Offline` or `PoweredOff`, a `GateDeviceStatus` message is sent with an updated `DeviceStatus`. Another message is sent when the `DeviceStatus` changes back to `Online` as well.

The following sample message is returned when the `DeviceStatus` changes to `PoweredOff`.

```json
{
    "DeviceStatus": "PoweredOff"
}
```

##### `GateDeviceStatus` Service Bus Message Body showing the gate device is `PoweredOff`

### OpenGateResponse

In an agent-controlled area prior to boarding, the Self-Boarding Gate (SBG) is in a 'closed' state where no passenger can scan their boarding pass and proceed through the gate.

The agent starts the boarding process by triggering the `/gateaccess/v2/opengate` request. For a Self-Boarding Gate, the gate displays green and is now ready to process passengers. When the agent is using a Boarding Gate Reader (BGR) to board passengers (a process not involving a gate), the boarding process is initiated and an agent may begin scanning boarding passes.

> **Note:** The `/gateaccess/v2/opengate` request is only sent once at the beginning of the process, not each time a passenger needs to pass through it. Once all passengers are processed, the boarding process is ended by sending a `/gateaccess/v2/closegate` request.

Upon making a `/gateaccess/v2/opengate` request, the GateAccess API acknowledges the request with a synchronous message, returning a `2xx` success status code (as seen in a tool like Postman).

An `OpenGateResponse` message displays on the Service Bus, simply indicating that the request to start the boarding process succeeded with `IsSuccess` set to `true`.

```json
{
    "IsSuccess": true,
    "Error": null
}
```

##### `OpenGateResponse` Service Bus Message Body indicating the request to initiate the boarding process has succeeded

### BoardingPassData

For a boarding process involving a Self-Boarding Gate (SBG) device, the passenger may scan his or her boarding pass. For a boarding process involving a Boarding Gate Reader, the agent may now scan the passenger's boarding pass.

When a passenger scans a boarding pass at a gate, the gate locks while it waits for the airline backend to accept or reject the passenger.

A `BoardingPassData` message displays on the Service Bus, including the scanned barcode as a Base64-encoded string.

```JSON
{
   "BarcodeData":"6M1AZKUR AHMETKUR ERG6ULZ ZRHISTTK 1912 211Y024F0028 150>10B1OO2211BTK 292352404859427 1 020K X"
}
```

##### `BoardingPassData` Service Bus Message Body including scanned boarding pass data

### Timeout Error

If the passenger is not accepted or rejected by the airline backend after a certain period, the transaction will timeout and an `ErrorOccurred` message displays on the Service Bus.

```JSON
{
   "Message":"Timeout has occurred while executing the command 'DisplayCommand'!"
}
```

##### `ErrorOccurred` Service Bus Message Body indicating a timeout has occurred

To resolve:

1. Send a `/gateaccess/v2/closegate` request
2. Delete the connection to the BGR through a **DEL** `/session/v2/connections` request.
3. Create a new connection to the BGR through a **POST** `/session/v2/connections` request.
4. Send a `/gateaccess/v2/opengate` request.
5. In the VM, manually enter barcode data and click **Read**.

### AcceptPassengerResponse

The airline backend accepts the passenger by sending a `gateaccess/v2/acceptpassenger` request which tells the GateAccess API that the passenger has been boarded successfully.

In the Request Body of the `gateaccess/v2/acceptpassenger` request, notice that a `Message` is included to display text on the device for the agent (if the device is a Boarding Gate Reader, not gate).

```Json
{
    "ConnectionId": "{{bgr_connection_id}}",
    "CorrelationId": "{{$guid}}",
    "Message": ["Passenger Okay to Board"],
    "ReceiptData": {
      "Data": "#NN#RD#FONT1#SIZE7#FREEBOARDING RECEIPT#FONT1#SIZE7#FREECLASS CHANGE#FONT1#SIZE0#FREE#FONT1#SIZE0#FREEYour class has changed - See Below#FONT1#SIZE0#FREE#FONT1#SIZE3#NAMELEE/MAYLIN MDM#FONT1#SIZE3#FREE#FONT1#SIZE3#ALCDMH#FONT1#SIZE3#FLNR0002#FONT1#SIZE3#DATE16JAN#FONT1#SIZE3#BORDKUL#FONT1#SIZE3#DESTLHR#FONT1#SIZE3#SQNR8#FONT1#SIZE7#SEAT1K#FONT1#SIZE7#CLSSF#FONT1#SIZE0#FREE"
    }
}
```

##### Sample `gateaccess/v2/acceptpassenger` Request Body with `Message` data to display on a BGR device that the passenger is 'Ok' to board

If `ReceiptData` is passed in the Request Body (as seen in the previous example), and the device is a Self-Boarding Gate, the device printer receives this data and can print the receipt for the passenger. **Important**: the passenger must then take the receipt for the gate to open.

> **Note:** It is also possible, but rarer, for there to be a printer for a Boarding Gate Reader in an agent-driven boarding scenario.

Upon making a `gateaccess/v2/acceptpassenger` request, the GateAccess API acknowledges the request with a synchronous message, returning a `2xx` success status code (as seen in a tool like Postman).

An `AcceptPassengerResponse` message displays on the Service Bus simply indicating that the request was made with no errors.

```json
{
    "IsSuccess": true,
    "Error": null
}
```

##### `AcceptPassengerResponse` Service Bus Message Body indicating that request to accept the passenger was successful

If the device is Boarding Gate Reader, a green light displays, along with a `Message` for the airline agent such as `Passenger Okay to Board`. The passenger is then allowed to pass the agent and board the flight.

If the device is a Self-Boarding Gate, the `Message` is ignored, and the gate opens with a green arrow that signals to the passenger they may now proceed through the gate.

> **Note:** In the case of a gate, any messages displayed to the passenger are not controlled by the GateAccess API.

### RejectPassengerResponse

The airline backend rejects the passenger by sending a `gateaccess/v2/rejectpassenger` request which tells the GateAccess API that the passenger was rejected and cannot board.

In the Request Body of the `gateaccess/v2/rejectpassenger` request, notice that a `Message` is included to display text on the device for the agent (if the device is a Boarding Gate Reader, not gate). Also, there is an option to trigger an `Alarm` sound when the passenger is rejected.

```Json
{
    "ConnectionId": "{{bgr_connection_id}}",
    "CorrelationId": "{{$guid}}",
    "Message": [ "Passenger Not Ok to Board" ],
    "Alarm": true
}
```

##### Sample `gateaccess/v2/rejectpassenger` Request Body with `Message` data to display to the agent that the passenger is 'Not Ok' to board

Upon making a `gateaccess/v2/rejectpassenger` request, the GateAccess API acknowledges the request with a synchronous message, returning a `2xx` success status code (as seen in a tool like Postman).

A `RejectPassengerResponse` message displays on the Service Bus that simply indicates that the request was made with no errors.

```json
{
    "IsSuccess": true,
    "Error": null
}
```

##### `RejectPassengerResponse` Service Bus Message Body indicating that request to reject the passenger was successful

If the device is Boarding Gate Reader, a red light displays, along with the `Message` for the airline agent such as `Passenger Not Okay to Board`. Depending on the situation, the passenger may be sent a different desk for an agent to investigate the situation further.

If the device is a Self-Boarding Gate, the `Message` is ignored, and a red "X" displays to the passenger, along with a message such as "you cannot board, go see an agent".

> **Note:** In the case of a gate, any messages displayed to the passenger are not controlled by the GateAccess API.

### CloseGateResponse

Once all passengers are boarded, the agent sends a `/gateaccess/v2/closegate` request that closes the boarding process.

Upon making a `/gateaccess/v2/closegate` request, the GateAccess API acknowledges the request with a synchronous message, returning a `2xx` success status code (as seen in a tool like Postman).

A `CloseGateResponse` message displays on the Service Bus simply indicating that the boarding process has ended, as indicated by the `IsSuccess` property set to `true`.

```json
{
    "IsSuccess": true,
    "Error": null
}
```

##### `CloseGateResponse` Service Bus Message Body indicating the request to end the boarding process has succeeded

## GateAccess API Walkthrough

Follow along with this walkthrough to experience the GateAccess API, including initiating a boarding process, simulating a board pass scan, accepting one passenger, rejecting another passenger, and ending the boarding process. The following tools are used to demonstrate the GateAccess API:

-   The [Citrix Virtualized Environmental VM]() to add devices.
-   The SITA Flex API Postman Collection that allows you to send requests to Flex.
-   Your airline backend to receive messages from the Azure Service Bus.

You will be interacting with an BGR device and simulating the scanning of a boarding pass using the Device Simulator. Since GateAccess API considers all Gate devices as the same, the same process you will follow in this walkthrough applies to a Self-Boarding Gate as well. The only exception is how `Message` data are handled.

> **Note:** This walkthrough provides some basic troubleshooting steps. However, if an error displays that is not covered, refer to the <a href="Troubleshooting Environments_1.htm">Troubleshooting Environments</a> or <a href="Troubleshooting Error Codes_1.htm">Troubleshooting Error Codes</a> sections for detailed steps on how to resolve the issue.

### Prerequisite Steps

1. Login to the [Citrix Virtualized SITA Flex Environment]() you set up previously.
2. In Postman, open the **SITA Flex API Collection** and **Postman environment** `.json` files. In the Postman environment file:
    - Ensure your `clientid` and `clientsecret` are populated in both the **Initial Value** and **Current Value** columns.
    - Ensure the `{{location}}` variable corresponds to the VM's machine name as seen in the Peripheral View. For example, a VM with machine name `ZZU1CKB005` as seen in the Peripheral view could correspond to a `location` called `A-ZZU-MZUZUAIRPORT-ZZU1CKB005` in the Postman Environment.
3. In Postman, perform the following:
    - Send a Get Access token request.
    - Send a POST `/session/v2/subscriptions` request.
    - Send a POST `/site/v2/reservations` request.

### Add an BGR Device

> **Note:** If an BGR has already been added, skip this section.

1. In the Device Simulator of the VM, click **Add Device**.

![](images\device-sim-add.jpg)

2. Select **BGR** from the **Device Type** drop-down.
3. Leave the other setting as is.
4. Click **Add Device**.
    - The BGR device is now available in the Device Simulator.
5. On the device, click **Run**.

    - A BGR Device Simulator screen displays. Leave this window open.

6. Notice how the **Display Output** contains the text `Not in Use`. Once the boarding process is started, the text will change to `Ready to Scan`.

### Connect to the BGR

1. In Postman, send a `/session/v2/connections` request to connect to the BGR.

> **Note:** Notice in the Request Body that the `DeviceId` will be populated partially based on the variable`{{location}}` in the Postman environment.

2. Check the Service Bus subscription for a `GateDeviceStatus` message:

```JSON
{
    "DeviceStatus": "Online"
}
```

##### `GateDeviceStatus` Service Bus Message Body showing the gate device is `Online`

The message should return the `DeviceStatus` as `Online`.

> **Note**: In the Tests tab of Postman, there is some Javascript that updates the `bgr_connection_id` environmental variable after connecting to the BGR. This variable is used so you do not need to manually enter a `connectionId` in subsequent calls to the GateAccess API.

#### `DeviceStatus` is `Offline`

If the `DeviceStatus` returns as `Offline`, check to see if the device is running in the Device Simulator. If there is a **Stop** button on the device in Device Simulator, the device is running.

![](images\bgr-stop-online.png)

_If <u>it is not</u> running:_

1. Click **Run**.
2. In the Peripheral View, check to see if the BGR **Status** is now `Online`.
3. Check the Service Bus for a new `GateDeviceStatus` message indicating the BGR is now `Online`.
    - The issue should now be resolved.

_If <u>it is</u> running_, from the Device Simulator on the VM:

1. Click **Stop**.
2. Click **Run**.
3. In the Peripheral View, check to see if the BGR **Status** is now `Online`.
4. Check the Service Bus for a new `GateDeviceStatus` message indicating the BGR is now `Online`.
    - The issue should now be resolved.

### Initiate Boarding Process

The next step is to initiate the boarding process:

1. In Postman, send a `/gateaccess/v2/opengate` request.
    - The GateAccess API acknowledges the request by returning a `2xx` success status code, as seen in a tool like Postman.
2. Check the Service Bus for a new `ScanDeviceStatus` message that indicates the request to initiate the boarding process was successful.

```json
{
    "IsSuccess": true,
    "Error": null
}
```

##### `OpenGateResponse` Service Bus Message Body indicating the request to initiate the boarding process has succeeded

3. Open the BGR Device Simulator, and you will notice the display now says **Ready to Scan**, indicating the device is now able to read barcode scans.

![](images\bgr-ready-to-scan.png)

### Simulate a Boarding Pass Scan

Using the VM, you will simulate an agent scanning a boarding pass using a BGR by manually entering Barcode data, then reading the data to the device.

1. With the BGR Simulator in the VM, manually enter some data in the **Barcode** text box, then click the **Read** button.

> **Note:** Below is a realistic sample of barcode data, but the data you enter is not important for the purpose of this walkthrough. Also, you can only manually type information into the text box and not paste content from outside the VM.

![](images\bgr-load-barcode.png)

##### BGR Device Simulator with Barcode Data entered

2. Click the **Read** button to simulate the BGR executing a scan and collecting the barcode data.

![](images\ocr-read-mrz.png)

3. Check the Service Bus for a new `BoardingPassData` message that includes the scanned barcode as a Base64-encoded string.

```JSON
{
   "BarcodeData":"6M1AZKUR AHMETKUR ERG6ULZ ZRHISTTK 1912 211Y024F0028 150>10B1OO2211BTK 292352404859427 1 020K X"
}
```

##### `BoardingPassData` Service Bus Message Body including the scanned boarding pass data

### Timeout Error

If you receive an `ErrorOccurred` Service Bus message mentioning a timeout, this indicates that the time allowed to accept or reject the passenger after the scan has expired and you must tell the API to restart the process.

```JSON
{
   "Message":"Timeout has occurred while executing the command 'DisplayCommand'!"
}
```

##### `ErrorOccurred` Service Bus Message Body indicating a timeout has occurred

To resolve:

1. Send a `/gateaccess/v2/closegate` request
2. Delete the connection to the BGR through a **DEL** `/session/v2/connections` request.
3. Create a new connection to the BGR through a **POST** `/session/v2/connections` request.
4. Send a `/gateaccess/v2/opengate` request.
5. In the VM, manually enter barcode data and click **Read**.

### Accept a Passenger

1. In Postman, open the `gateaccess/v2/acceptpassenger` request.
2. In the Request Body, change the `Message` to say `Passenger Okay to Board`:

```Json
{
    "ConnectionId": "{{bgr_connection_id}}",
    "CorrelationId": "{{$guid}}",
    "Message": ["Passenger Okay to Board"],
    "ReceiptData": {
      "Data": "#NN#RD#FONT1#SIZE7#FREEBOARDING RECEIPT#FONT1#SIZE7#FREECLASS CHANGE#FONT1#SIZE0#FREE#FONT1#SIZE0#FREEYour class has changed - See Below#FONT1#SIZE0#FREE#FONT1#SIZE3#NAMELEE/MAYLIN MDM#FONT1#SIZE3#FREE#FONT1#SIZE3#ALCDMH#FONT1#SIZE3#FLNR0002#FONT1#SIZE3#DATE16JAN#FONT1#SIZE3#BORDKUL#FONT1#SIZE3#DESTLHR#FONT1#SIZE3#SQNR8#FONT1#SIZE7#SEAT1K#FONT1#SIZE7#CLSSF#FONT1#SIZE0#FREE"
    }
}
```

##### Sample `gateaccess/v2/acceptpassenger` Request Body with `Message` data to display to the agent that the passenger is 'Ok' to board

3. Send the `gateaccess/v2/acceptpassenger` that tells the GateAccess API that the passenger has boarded successfully.
    - The GateAccess API acknowledges the request by returning a `2xx` success status code, as seen in a tool like Postman.
4. Check the Service Bus for a `AcceptPassengerResponse` message indicates that the request was made with no errors.

```json
{
    "IsSuccess": true,
    "Error": null
}
```

##### `AcceptPassengerResponse` Service Bus Message Body indicating that request to accept the passenger was successful

5. In the BGR Device Simulator, notice the that the message `Passenger Okay to Board` passed in the Request Body is displayed in the **Display Output**.

![](images\bgr-pax-accepted.png)

### Reject a Passenger

1. In the BGR Device Simulator, enter some new characters into the **Barcode** text box then **Read** the barcode to the device to simulate the agent scanning the next passenger's barcode.
    - Instead of accepting the passenger this time, you will reject him/her.
2. In Postman, open the `/gateaccess/v2/rejectpassenger` request.
3. In the Request Body, change the `Message` to say `Passenger Not Okay to Board`:

```Json
{
    "ConnectionId": "{{bgr_connection_id}}",
    "CorrelationId": "{{$guid}}",
    "Message": [ "Passenger Not Ok to Board" ],
    "Alarm": true
}
```

##### Sample `gateaccess/v2/rejectpassenger` Request Body with `Message` data to display to the agent that the passenger is 'Not Ok' to board

4. Send the `gateaccess/v2/rejectpassenger` that tells the GateAccess API that the passenger was rejected and cannot board.
    - The GateAccess API acknowledges the request by returning a `2xx` success status code, as seen in a tool like Postman.
5. If you look fast enough in the **BGR Device Simulator**, you will notice a red exclamation mark displays in the **Display Icon** window. This indicates to the agent that the passenger is 'Not Ok' to board. If you did not see it, you can click **Read** and send the request again to trigger the icon.

![](images\bgr-reject-exclam.png)

6. Check the Service Bus for a `RejectPassengerResponse` message that indicates that the request was made with no errors.

```json
{
    "IsSuccess": true,
    "Error": null
}
```

##### `RejectPassengerResponse` Service Bus Message Body indicating that request to reject the passenger was successful

### End the Boarding Process

1. In Postman, send a `/gateaccess/v2/closegate` request to tell the GateAccess API that the boarding process has ended.
    - The GateAccess API acknowledges the request by returning a `2xx` success status code, as seen in a tool like Postman.
2. Check the Service Bus for a `CloseGateResponse` message.

```json
{
    "IsSuccess": true,
    "Error": null
}
```

##### `CloseGateResponse` Service Bus Message Body indicating the request to end the boarding process has succeeded

3. In the BGR Device Simulator, notice that the **Display Output** says `Not In Use` like how it did before sending the `/gateaccess/v2/opengate` request at the very beginning of this walkthrough.

## Best Practices

### Device Screen Messages

The GateAccess API does not recognize if a request is being sent to a Boarding Gate Reader or a Self-Boarding Gate. From the perspective of the API, these devices are the same. So, any `Message` can be passed in the Request Body, but whether or not the message displays depends on the device type.

The `Message` passed by the airline in the Request Bodies of the `/gateaccess/v2/acceptpassenger` and `/gateaccess/v2/rejectpassenger` requests are meant to be messages for agents during an agent-driven boarding process using a Boarding Gate Reader. Since any boarding process involving a Self-Boarding Gate is a passenger-driven process, any `Message` passed to a SBG device is ignored.

### Receipt Data

Most Self-Boarding Gates, and some Boarding Gate Readers, have a receipt printer capable of receiving `ReceiptData` passed in the Request Body of a `/gateaccess/v2/acceptpassenger` request. The data must adhere to the AEA format for printing receipts.

A scenario where this could apply is if a passenger scans their boarding pass at a Self-Boarding Gate and their seat has changed so their boarding pass does not show the correct seat. The printer prints a receipt indicating that their class has changed with their new seat number.

The following is a sample Request Body of a `/gateaccess/v2/acceptpassenger` request that passes `ReceiptData` to be printed for the passenger.

```JSON
{
    "ConnectionId": "{{bgr_connection_id}}",
    "CorrelationId": "{{$guid}}",
    "Message": ["MSG Line 1", "MSG Line 2"],
    "ReceiptData": {
      "Data": "#NN#RD#FONT1#SIZE7#FREEBOARDING RECEIPT#FONT1#SIZE7#FREECLASS CHANGE#FONT1#SIZE0#FREE#FONT1#SIZE0#FREEYour class has changed - See Below#FONT1#SIZE0#FREE#FONT1#SIZE3#NAMELEE/MAYLIN MDM#FONT1#SIZE3#FREE#FONT1#SIZE3#ALCDMH#FONT1#SIZE3#FLNR0002#FONT1#SIZE3#DATE16JAN#FONT1#SIZE3#BORDKUL#FONT1#SIZE3#DESTLHR#FONT1#SIZE3#SQNR8#FONT1#SIZE7#SEAT1K#FONT1#SIZE7#CLSSF#FONT1#SIZE0#FREE"
    }
}
```

##### Sample `/gateaccess/v2/acceptpassenger` Request Body that passes `ReceiptData` to be printed for the passenger

It is important to note that a gate that prints a receipt only opens when the passenger has taken the receipt. If the passenger does not take the receipt, the gate will not open.

### Fraud Situations

Self-Boarding Gates generate more Error-style messages because they have sensors that track passengers' movements through the gate and generate errors depending on different fraud situations. The _IATA Technical Peripheral Specification (formerly AEA) Edition 2018_ goes into elaborate detail of all the possible situations that could trigger an error, along with diagrams that illustrate the various positions of the passenger in relation to the boarding gate.

# Bagdrop API

The **Bagdrop** **API** endpoints allow your airline backend to control a Self Bagdrop Unit to:

-   initiate a bag drop process to allow the passenger to place a bag on the belt.
-   move the bag through the various positions of the bagdrop unit that correspond to the different stages of the bagdrop process.
-   allow either the agent or the passenger to resolve any issues with the bag (depending on the situation).
-   release the bag to the Baggage Handling System (BHS).

The only supported device at present is the following:

| Acronym | Definition    |
| ------- | ------------- |
| SBD     | Self-Bag Drop |

## Endpoints

The end path for BagDrop API endpoints begins with **POST** `/bagdrop/v2`, followed by the endpoint (i.e. action) for the device to carry out.

### POST /bagdrop/v2/getbag

Send a POST `/bagdrop/v2/getbag` request to initiate a bagdrop process and open the door (if there is a door) of the SBD so the passenger can place their bag on the belt.

![](flow-diagrams\bagdrop - getbag.svg)

##### POST `/bagdrop/v2/getbag` Endpoint Flow

### POST /bagdrop/v2/processbag

After the passenger places a bag on the belt, the bag's measurements are taken, and a settled weight is calculated. Send a POST `/bagdrop/v2/processbag` request to close the door and move the bag from the `Entry` position to the `Process` position.

![](flow-diagrams\bagdrop-processbag.svg)

##### POST `/bagdrop/v2/processbag` Endpoint Flow

### POST /bagdrop/v2/returnbag

If an issue arises when the bag is in the `Process` position, and the customer _can resolve the issue_, send a POST `/bagdrop/v2/returnbag` request to open the door and return the bag to the `Entry` position where the customer to resolve the issue.

Once the customer resolves the issue, send another POST `/bagdrop/v2/processbag` request to return the bag to the `Process` position so the bagdrop process can continue.

![](flow-diagrams\bagdrop -returnbag.svg)

##### POST `/bagdrop/v2/returnbag` Endpoint Flow

### POST /bagdrop/v2/cancelbag

If an issue arises when the bag is in the `Process` position, and the customer _cannot to resolve the issue_, send a POST `/bagdrop/v2/cancelbag` request to open the door and return the bag to the `Entry` position where the agent can resolve the issue.

Once the agent resolves the issue, send another POST `/bagdrop/v2/processbag` request to return the bag to the `Process` position so the bagdrop process can continue.

![](flow-diagrams\bagdrop -cancelbag.svg)

##### POST `/bagdrop/v2/cancelbag` Endpoint Flow

### POST /bagdrop/v2/releasebag

Once the bag has been processed, send a POST `/bagdrop/v2/releasebag` request to move the bag to the Baggage Handling System (BHS Area) and complete the bagdrop process.

![](flow-diagrams\bagdrop -releasebag.svg)

##### POST `/bagdrop/v2/releasebag` Endpoint Flow

## Construct a BagDrop Request

### Resource URLs

At present, Bagdrop API Resource URLs are comprised of:

-   A REST API standard method preceding the URL for accessing the endpoint. In the case of the Bagdrop API, the only method used is POST.
-   A Base URL specific to the SITA Flex environment, sometimes displayed as `{{baseurl}}` in the Resource URL in Postman.
-   The end path of the Resource URL is comprised of the API name (`bagdrop`) followed by the endpoint name. For example, the end path `/bagdrop/v2/getbag` contains the API `bagdrop` followed by the endpoint `getbag`.

> **Note:** No path parameters are required when sending Bagdrop API requests.

### Header Parameters

A `location-id` is required in the header of requests. Flex APIs use the Azure API Management Service (APIM) to route requests to the correct Azure Region based on the airport code extracted from the `LocationId`.

### Authorization Headers

An `access_token` is required in the Authorization Header of requests for authentication.

> **Note:** The `access_token` is displayed as the Postman variable `bearer_token` in the **Authorization** tab of API requests in the provided Postman collection.

### Request Bodies

All Request Bodies must include the `ConnectionId` of the device the airline backend is sending the command to.

## Service Bus Messages

The following is not an exhaustive list of all possible Service Bus `Message Types`. Only the most common ones encountered when sending Bagdrop API requests are described.

### BagdropDeviceStatus

A `BagdropDeviceStatus` message displays on the Service Bus:

-   when the `DeviceStatus` changes. For example, when the SBD goes from `Online` to `Offline`, or vice versa. An SBD may go `Offline` due to an issue with the device, or when a `BagDropTransactionTimeout` occurs.
-   after a `/bagdrop/v2/getbag` request is sent, which initiates the bagdrop process and reserves the SBD for exclusive access by the airline backend. The `DeviceInUse` property changes from `false` (the value displayed after sending the POST `/session/v2/connections` request) to `true`.

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

-   When a `/bagdrop/v2/getbag` request is sent that opens the door to the SBD so the passenger can place her bag on the belt.
-   When an issue has occurred and either a `/bagdrop/v2/returnbag` or `/bagdrop/v2/cancelbag` request was sent to open the door and return the bag to the `Entry` position so the issue can be resolved by the customer or an agent.

A `DoorClosing` message displays on the Service Bus:

-   after a `/bagdrop/v2/processbag` request is sent. The door to the SBD closes and the bag moves from the `Entry` position to the `Process` position.

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

`"IsSuccess": true` indicates that a bag has been placed on the belt, and a settled weight has been calculated for the bag, in addition to other measurements such as the dimensions of the bag.

### BagChanged

The structure of the `BagChanged` message is identical to the `BagPlaced` message and displays baggage information collected through a measurement.

The property of importance is `Position`. Whenever a bag moves from one position to the next, a `BagChanged` message displays that indicates the value of `Position` has changed. For example, when the bag moves from the **Entry Area** to the **Process Area**, the property `Position` changes from `Entry` to `Process`. When the bag moves back from `Process` to `Entry`, in the case of an issue, this message displays as well.

Regarding the baggage information, the following scenarios are possible, depending on the configuration of the SBD:

-   The `Process` position may be the first-time baggage information was collected (not the `Entry` position).
-   Baggage information may be collected a second time at the `Process` position, updating the values collected at the `Entry` position.
-   Baggage information is not collected at all at the `Process` position. The baggage information matches the information collected in the `Entry` position.

### BagResponses

> **Note:** For this documentation, Service Bus `MessageTypes` that contain the text `BagResponse` are grouped together since they all simply confirm the success or failure of a request. In actuality, the `MessageTypes` will be specific to the type of request that was sent. For example, after a `/bagdrop/v2/getbag` request is sent, a `GetBagResponse` response displays on the Service Bus.

`BagResponse` messages display on the Service Bus after sending requests to the BagDrop API at different stages of a bagdrop process and are often sent in conjunction with other types of messages such as a `BagChanged` and `BagdropDeviceStatus` message.

The only purpose of a `BagResponse` message is to indicate whether the request was successful (`"IsSuccess": true`). The structure of `BagResponse` messages are identical to the `BagPlaced` and `BagChanged` messages that display collected baggage information.

The following `BagResponse` messages display on the Service Bus by endpoint:

-   A `GetBagResponse` is received after a `/bagdrop/v2/getbag` request is sent to initiate the bag drop process and open the SBD door if there is one.

If the SBD has a door, the property `"Bag": null` is returned which indicates no baggage information was collected because a bag has not been placed on the belt yet.

If the SBD does not have a door, the `GetBagResponse` message includes the baggage information collected from the bag placed on the belt at the time the `/bagdrop/v2/getbag` request was sent.

-   A `ProcessBagResponse` is received after a `/bagdrop/v2/processbag` request is sent to move the bag from the `Entry` position to the `Process` position where the bag can be processed.

-   A `ReturnBagResponse` is received after a `/bagdrop/v2/returnbag` request is sent to return the bag to the `Entry` position _where the passenger_ can resolve an issue.

-   A `CancelBagResponse` is received after a `/bagdrop/v2/cancelbag` request is sent to return the bag to the `Entry` position _where the agent_ can resolve an issue.

-   A `ReleaseBagResponse` is received after a `/bagdrop/v2/releasebag` request is sent to release the bag to the Baggage Handling System (BHS Area).

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

If this error occurs when the bag is in the `Entry` position, another `/bagdrop/v2/getbag` request must be made to restart the bagdrop process. If you send a `/bagdrop/v2/processbag` request when a timeout has occurred, and you have not sent the `/bagdrop/v2/getbag` request, you will receive an error status code.

#### Timeout at Process Area

If this error occurs when the bag is in the `Process` position, a `BagdropDeviceStatus` message also displays on the Service Bus indicating the device is no longer 'in use' (`"DeviceInUse": false`).

You will receive an error status code when sending any further requests. For example, if you attempt to send a `/bagdrop/v2/releasebag` request to continue to the next phase in the bagdrop process, you will receive an error.

At this stage, sending another `/bagdrop/v2/getbag` request to restart the bag drop process will not resolve the issue because there is a bag located in the `Process` position that requires action. The process cannot be restarted until the bag is removed.

## Bagdrop API Walkthrough

Follow along with this walkthrough to experience the Bagdrop API, including connecting to an SBD and completing an entire bagdrop process that ends with releasing the bag to the Baggage Handling System (BHS).

The following tools are used to demonstrate the Print API:

-   The <a href="Citrix Virtualized SITA Flex_1.htm">Citrix Virtualized SITA Flex Environment</a> to add devices.
-   The SITA Flex API Postman Collection that allows you to send requests to Flex.
-   Your airline backend to receive messages from the Azure Service Bus.

> **Note:** This walkthrough provides some basic troubleshooting steps. However, if an error displays that is not covered, refer to the <a href="Troubleshooting Environments_1.htm">Troubleshooting Environments</a> or <a href="Troubleshooting Error Codes_1.htm">Troubleshooting Error Codes</a> sections for detailed steps on how to resolve the issue.

### Prerequisite Steps

1. Login to the <a href="Citrix Virtualized SITA Flex_1.htm">Citrix Virtualized SITA Flex Environment</a> you set up previously.
2. In Postman, open the **SITA Flex API Collection** and **Postman environment** `.json` files. In the Postman environment file:
    - Ensure your `clientid` and `clientsecret` are populated in both the **Initial Value** and **Current Value** columns.
    - Ensure the `{{location}}` variable corresponds to the VM's machine name as seen in the Peripheral View. For example, a VM with machine name `ZZU1CKB005` as seen in the Peripheral view could correspond to a `location` called `A-ZZU-MZUZUAIRPORT-ZZU1CKB005` in the Postman Environment.
3. In Postman, perform the following:
    - Send a Get Access token request.
    - Send a POST `/session/v2/subscriptions` request.
    - Send a POST `/site/v2/reservations` request.

### Add an SBD Device

> **Note:** If an SBD has already been added, skip this section.

1. In the Device Simulator of the VM, click **Add Device**.

![](images\device-sim-add.jpg)

##### Add an SBD in Device Simulator

2. Select **SBD** from the **Device Type** drop-down.

3. Leave the other settings as is.

4. Click **Add Device**.

    - The SBD is now available in the Device Simulator.
    - By default, the SBD does not have a door. To trigger door-related Service Bus messages, you will add a door to the SBD in the following steps.

5. On the device, click **Options**, then **Settings**.

6. Click the **SBD Bag Door** drop-down and select **(1) Door is installed**.

![](images\sita-sbd-settings.png)

##### SBD Bag Door Setting set to `Door is installed`

7. Click **Save and Close**.
8. On the device, click **Run**.
    - An SBD Device Simulator screen displays. You may keep it open for later use.

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

If the `DeviceStatus` returns as `Offline`, check to see if the device is running in the Device Simulator. If there is a **Stop** button on the device in Device Simulator, the device is running.

_If <u>it is not</u> running:_

1. Click **Run**.
2. In the Peripheral View, check to see if the SBD **Status** is now `Online`.

_If <u>it is</u> running_, from the Device Simulator on the VM:

1. Click **Stop**.
2. Click **Run**.
3. In the Peripheral View, check to see if the SBD **Status** is now `Online`.

### Initiate a Bag Drop Process

1. In Postman, send a `/bagdrop/v2/getbag` request.
    - The Bagdrop API acknowledges the request by returning a `2xx` success status code, as seen in a tool like Postman.
    - If you added a door to the SBD earlier, notice that the door icon disappeared in the SBD Device Simulator. This simulates the door opening on a real bagdrop after a bagdrop process was initiated.

![](images\sbd-door-disappear.png)

##### Device Simulator showing an 'opened door' after sending a `/bagdrop/v2/getbag` request

> **Note:** On a real bag drop, a message such as "Please place your bag on the belt" would display.

-   An updated `BagdropDeviceStatus` message displays on the Service Bus, indicating the SBD is now 'In Use'.

```JSON
{
    "DeviceStatus": "Online",
    "DeviceInUse": true
}
```

##### `BagdropDeviceStatus` Service Bus Message indicating the device is now exclusively reserved

-   A `DoorOpening` message displays on the Service Bus with an empty Message Body. This simply indicates the door of the SBD has opened.
-   A `GetBagResponse` message displays on the Service Bus which is an indication the bagdrop process is initiated. The property `"Bag": null` indicates there is no bag information because, for the purpose of this simulation, the passenger has not yet placed a bag onto the belt.

```json
{
    "Bag": null,
    "IsSuccess": true,
    "Error": null
}
```

##### `GetBagResponse` Service Bus Message indicating no baggage data has been collected

#### Timeout at Entry Area

A `BagDropTransactionTimeout` message displays on the service bus with an empty Message Body when too much time has elapsed since the `/bagdrop/v2/getbag` request was made. Another `/bagdrop/v2/getbag` request must be made to restart the bagdrop process. If you send a `/bagdrop/v2/processbag` request when a timeout has occurred, and you have not sent the `/bagdrop/v2/getbag` request, you will receive an error status code.

### Place a Bag on the Belt

1. With the SBD Device Simulator open, click **New Bag**.

    ![](images\sbd-new-bag.png)

    - A **New Bag** window displays.

2. Leave all settings as is.

3. Click **Create Bag**.

    - A new **Bag #** panel is displayed.

> **Note:** The bag in its current state is simulating the passenger holding the bag prior to placing the bag on the belt.

3. Ensure the door is open (not red).
    - If the door has turned red (door is closed), send another `/bagdrop/v2/getbag` request to open it.
4. Click **Place Selected Bag** next to the New Bag button you clicked earlier (see previous screenshot).
    - The bag (in green) displays in the SBD image in the **Entry Area** like when a real bag is placed by a passenger in the **Entry Area** of an SBD.
    - The **Weight Scale Status** (below the purple belt) displays **Scale is debouncing** (you must look quickly to see it), then **Scale is settled** after a few seconds to indicate the settled weight has been determined.

> **Note**: If the passenger is using a mobile app, the app may request confirmation that the bag has been placed by displaying a "I have placed the bag" prompt. After tapping the button, the passenger is brought to the next step in the bagdrop process.

### View Settled Weight

In the SBD Device Simulator, notice above the **New Bag** and **Place Selected Bag** buttons is a field with two properties called **Bounce**.

In the previous step, you placed a bag onto the belt. When this occurred, the belt was 'in-motion' while the weight on the belt settled, like a real bag drop. The **Bounce** properties simulate the fluctuation of weight while the weight of the bag settles.

The settled weight is calculated after the specified number of balancing events (**5** by default) has occurred.

![](images\sbd-bounce.png)

##### SBD Device Simulator showing `Bounce` Properties that simulate the motion of the belt after placing a bag

To view the settled weight:

1. Click the **Session History** tab.

![](images\sbd-session-history.png)

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

The `"Position": "Entry"` indicates that the bag is currently located on the `Entry` position of the SBD unit.

> **Note:** The `Position` will update when new measurements are made as the bagdrop process progresses and the position of the bag changes.

`"IsSuccess": true` indicates that a bag has been placed on the belt, and a settled weight has been calculated for the bag, in addition to other measurements such as the dimensions of the bag.

> **Note**: The SBD device in the SBD Device Simulator is not capable of providing a the `VolumeResult` that includes the baggage dimensions, returning `"Amount": 0.0` for the various dimensions. However, some SBDs have this capability. When interacting with an actual SBD with the capability to take measurements, those measurements will display. How your airline backend could use this information is to potentially reject a bag if a bag's `width` is greater than a certain allowed amount, for example.

### Process the Bag

1. In Postman, send a `/bagdrop/v2/processbag` request.
    - The Bagdrop API acknowledges the request by returning a `2xx` success status code, as seen in a tool such as Postman.
    - In the SBD Device Simulator, notice that the door has closed, and the bag has now moved from the `Entry` position to the `Process` position to simulate the belt moving down the bag. The bag is not accessible to the passenger in this position.

![](images\sbd-process.png)

##### Device Simulator showing the bag has moved to the Processing Area

> **Note:** On a real bag drop, a message such as "Processing Bag, please wait." would display and the door to the bag drop would close (if not already closed).

-   A `DoorClosing` message may display on the Service Bus with an empty Message Body. This indicates the door has closed after the passenger placed the bag on the belt.
-   A `BagChanged` message displays on the Service Bus which indicates the bag has changed position. This message looks like the `BagPlaced` message, except with the property `Position` set to `Process`.

> **Note:** In the simulation, the same baggage information collected from the measurement taken in the **Entry Area** is displayed in the `BagChanged` message. However, on a real bagdrop, it is possible the baggage information may change. For example, the SBD may be configured to take a measurement in the **Processing Area** rather than **Entry Area**. Or another measurement may be made in the Processing Area that updates the measurements.

-   A `ProcessBagResponse` message displays on the Service Bus that indicates the bag was successfully processed (`"IsSuccess": true`). This message, like the `Bag Placed` and `BagChanged` messages, displays the baggage measurements.

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

A `BagDropTransactionTimeout` message displays on the Service Bus with an empty Message Body when too much time has elapsed since the `/bagdrop/v2/process` request was made.

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
    - If successful, the Bagdrop API returns a `2xx` status code returns a successful `GetBagResponse` message on the Service Bus.

### Simulate a Customer Resolving an Issue

1. With the bag in the Process Area, send a `/bagdrop/v2/returnbag` to simulate the SBD returning the bag to the customer to resolve an issue.
    - The bag moves from the **Processing Area** back to the **Entry Area** and the door opens for a short period. If the door closes, sending another `/bagdrop/v2/returnbag` request will open the door again.
    - A `DoorOpening` message displays on the Service Bus with an empty Message Body. This simply indicates the door of the SBD has opened so the bag can be accessible to the passenger to resolve the issue.
    - A `BagChanged` message displays on the Service Bus which indicates the bag has changed `Position` from the `Process` area to the `Entry` area.
    - A `ReturnBagResponse` message displays on the Service Bus which indicates the request to return the bag to the `Entry` position was successful (`"IsSuccess":true`).

![](images\sbd-return-cancel-entry.png)

##### SBD Device Simulator showing the bag has returned to the Entry Area where the customer can resolve the issue

> **Note:** In a real-life scenario, the customer would resolve a minor issue if no intervention is required by the agent.

2. To simulate the customer having resolved the issue, send another `/bagdrop/v2/processbag` request to close the door and move the bag back the **Processing Area**.

### Simulate an Agent Intervening to Resolve an Issue

1. With the bag in the Process Area, send a `/bagdrop/v2/cancelbag` request to simulate the bagdrop returning the bag due to an issue that requires agent assistance and cannot be resolved by the customer.
    - The bag moves from the **Processing** **Area** back to the **Entry** **Area** and the door opens for a short period.
    - The same messages received on the Service Bus after sending a `/bagdrop/v2/returnbag` request are received after sending a `/bagdrop/v2/cancelbag` request. They indicate the bag has returned to the **Entry** **Area**.

![](images\sbd-return-cancel-entry.png)

##### SBD Device Simulator showing the bag has returned to the Entry Area where the agent can resolve the issue

> **Note:** In a real-life scenario, the agent would be alerted to resolve the issue at the SBD.

2. To simulate the agent having resolved the issue, send another `/bagdrop/v2/processbag` request to close the door and move the bag back the **Processing Area**.

### Release the Bag to the BHS

1. With the bag in the **Process** Area, send a `/bagdrop/v2/releasebag` request to simulate the completion of the bagdrop process with the SBD unit releasing the bag.

    - The bag moves from the **Processing Area** to the **BHS Release Area** where it will remain in the VM until it is removed.
    - A `BagChanged` message displays on the Service Bus which indicates the bag's position has changed.
    - A `ReleaseBagResponse` message displays on the Service Bus which indicates the request to release the bag to the BHS was successful (`"IsSuccess":true`).
    - You can start a new bag drop process at this point by adding a new bag, sending a `/bagdrop/v2/getbag` request, then placing the new bag on the belt (performing the same process again).

![](images\sbd-release-bag.png)

##### SBD Device Simulator showing the bag has been successfully released to the BHS Release Area

-   If you wish, you can start a new bag drop process at this point by adding a new bag, sending a `/bagdrop/v2/getbag` request, then placing the new bag on the belt.

# Troubleshooting Environments

The following are common behaviors/issues that may arise on devices or software in SITA Flex environments, along with recommended resolution steps.

If any of the following suggested resolutions do not work, especially in the case of a `500 Internal Server Error`, please perform the following:

1. Send an email to <flex.api.support@sita.aero>.
2. Do one of the following, based on your situation:
    - If you are using your own **SITA Flex Suitcase**, provide the log files for the **SITA Flex Adapter Service** (FAS). These can be found in `C:\SITA\Logs\FAS`. Copy, zip, and send these logs along with your support request.
    - If you were using a **VM**, provide the VM you were using and what time you experienced the error. The support team will then remotely access the logs and investigate the issue.

## Unknown/Unreachable Device Statuses

In the **Peripheral View**, it is possible devices statuses display as `Unknown` or `Unreachable`. If this is the case, it is necessary to start or restart **SITA Flex Adapter Service**.

To resolve the issue:

1. Send DEL `/session/v2/subscriptions` request to unsubscribe from your current Flex API session.
2. Perform one of the following, depending on the situation:

    - If you are using the VM, shut down the **Device Simulator** completely by deleting all the devices and exiting the application.
    - If you are using the **SITA Flex Suitcase**, power off then power on the affected device.

3. In the Windows Search Bar, type `Services` and open `Services.msc`.
4. Locate the **SITA Flex Adapter Service** in the list of services.

    ![](images/adapter-service.png)

5. Perform one of the following, depending on the situation:
    - If **SITA Flex Adapter Service** _is not_ `Running`, then right-click it and select **Start** to start the service.
    - If **SITA Flex Adapter Service** _is_ `Running`, then right-click it and select **Restart** to restart the service.
6. Check the **Peripheral View** to see if the device statuses are `Online`.

## Peripheral View Shows No devices

It is possible the **Peripheral View** shows no devices as shown below:

![](images/periph-no-devices.png)

If no devices are listed like the previous screenshot:

1. In the Windows Search Bar, type `Services` and open `Services.msc`.
2. Locate the **APC Virtual Peripheral Service** in the list of services.

![](images/periph-service.png)

3. Perform one of the following, depending on the situation:
    - If **APC Virtual Peripheral Service** _is not_ `Running`, then right-click it and select **Start** to start the service.
    - If **APC Virtual Peripheral Service** _is_ `Running`, then right-click it and select **Restart** to restart the service.
4. Check in the **Peripheral View** to see if devices now display.
5. If not, restart the laptop and repeat the steps above.

## VM Not Available

It is possible after clicking a VM shortcut on the Citrix Workspace that the following message displays: "The resource is unavailable currently."

![](images/resource-unavailable.png)

If this is the case, perform the actions to resolve the issue:

1. Close all open instances of VMs.
2. Sign out of the **Citrix Workspace**.
3. Exit the **Citrix Workspace**.
4. Wait for all processes to end and then restart the **Citrix Workspace**.
5. Click the VM shortcut link you wish to run.
6. Sign in with your credentials.
    - The previous steps should have succeeded in connecting and starting the VM session.

# Troubleshooting Error Codes

Flex APIs follow standard RESTful API status code conventions when it comes to error codes. These troubleshooting guidelines are intended to be as specific as possible to Flex APIs.

## 400 Bad Request

The request was invalid.

### Invalid Request

Flex returns this error code when some part of the Request URL is invalid, excluding a Resource which triggers a `404: Resource not found`. The `error_description` indicates which value was incorrect.

In the example below, Flex returned this error after sending a Get Access token request and the `AAD_tenent` passed in the Resource URL is invalid. It could be the case that this value was incorrectly spelled, for example.

```JSON
{
    "error": "invalid_request",
    "error_description": "AADSTS900023: Specified tenant identifier '{{tennt}}' is neither a valid DNS name, nor a valid external domain.\r\nTrace ID: e2f39c31-d6fb-4c66-9c35-a815eeb33300\r\nCorrelation ID: 225c9f55-e2ef-4c24-8619-306a0ce36cbd\r\nTimestamp: 2021-11-05 11:42:40Z",
    "error_codes": [
        900023
    ],
    "timestamp": "2021-11-05 11:42:40Z",
    "trace_id": "e2f39c31-d6fb-4c66-9c35-a815eeb33300",
    "correlation_id": "225c9f55-e2ef-4c24-8619-306a0ce36cbd",
    "error_uri": "https://login.microsoftonline.com/error?code=900023"
}
```

##### Response Body when `AAD_tenent` passed in Resource URL is invalid

The resolution is to simply correct the invalid value in the Resource URL, then attempt another request.

### One or more validation errors occurred

A Flex API returns this error in either one of the following scenarios. They are somewhat specific to Postman when attempting to pass values as variables that may no longer be valid. They occur:

-   when attempting to connect to, or interact with, a peripheral when a `session/v2/subscriptions` request was made unsuccessfully during this session:

```JSON
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "traceId": "00-68e38c2ba0ec8840a4005dadea0d81c0-32fa28d00f6b3340-00",
    "errors": {
        "$.SubscriptionId": [
            "The JSON value could not be converted to System.Guid. Path: $.SubscriptionId | LineNumber: 1 | BytePositionInLine: 24."
        ]
    }
}
```

##### Response Body when no subscription exists

-   when the connection to a device has expired:

```JSON
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "traceId": "00-815de99286d3954fa69fce27b1ce06df-819ec6565c1c944a-00",
    "errors": {
        "$.connectionId": [
            "The JSON value could not be converted to System.Guid. Path: $.connectionId | LineNumber: 1 | BytePositionInLine: 20."
        ]
    }
}
```

##### Response Body when connection to device has expired

-   when attempting to delete a connection to a device when at present there is no connection.

```JSON
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "traceId": "00-ddcc4b696af7fc4e90e1566144750fbb-51c76a2b58fbdd49-00",
    "errors": {
        "connectionId": [
            "The value 'null' is not valid."
        ]
    }
}
```

##### Response Body when attempting to delete a connection when it does not exist

To determine which scenario applies, check the `errors` value in the Response Body:

-   If the error says `SubscriptionId`, then no subscription exists. Simply send a `session/v2/subscriptions` request to create and receive details for a new subscription.
-   If the error says `connectionId` with a `could not be converted` message, then the connection to the device has expired. Simply connect to the device again.
-   If the error says `connectionId` with a `The value 'null' is not valid.` message, then there is no connection to delete.

### Connection has expired

A Flex API returns this error when the connection to a device has expired.

```JSON
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "Bad Request",
    "status": 400,
    "detail": "Connection has expired.",
    "traceId": "00-baf5325b0757fc408018bca88119a826-65e7e75f65b69c4a-00"
}
```

##### The connection to the device has expired

After connecting to a device, a connection `expiryTime` is returned in the Response Body set to **30 minutes** from the time the `session/v2/connections` request was made.

The resolution is to simply send another `session/v2/connections` request.

### No Connection Exists

A Flex API returns this error when the connection to a device has expired.

```JSON
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "Bad Request",
    "status": 400,
    "detail": "No Connection Exists.",
    "traceId": "00-baf5325b0757fc408018bca88119a826-65e7e75f65b69c4a-00"
}
```

##### The connection to the device has expired

After connecting to a device, a connection `expiryTime` is returned in the Response Body set to **30 minutes** from the time the `session/v2/connections` request was made.

The resolution is to simply send another `session/v2/connections` request.

## 401 Unauthorized

The request did not include an authentication token, or the authentication token was expired.

### Unauthorized

Flex returns this error when the `access_token` included in the Authorization Header of a request has expired.

```JSON
{
    "type": "https://httpstatuses.com/401",
    "title": "Unauthorized",
    "status": 401,
    "traceId": "00-1e8461bd7e3e4448940a7aa2237a2515-9cfcf731cb93354b-00"
}
```

##### Response Body when `access_token` has expired

After requesting a Get Access Token, the returned `access_token` has an `expires_in` value of `3599` seconds, as indicated in the Response Body. This duration of time roughly equals **60 minutes**.

Ensure that you refresh this access token by sending another Get Access Token request if continued access is required.

After refreshing the access token, you must reconnect to devices.

## 403 Forbidden

The client did not have permission to access the requested resource.

### Forbidden

A Flex API returns this error when your permissions are not sufficient to perform the operation. Contact <flex.api.support@sita.aero> to request permission.

```JSON
{
    "type": "https://httpstatuses.com/403",
    "title": "Forbidden",
    "status": 403,
    "traceId": "00-a0876953d809b243aef112b22fab2139-1d37802bf725bf42-00"
}
```

##### Response Body when permissions are insufficient to access the resource

## 404 Resource Not Found

The requested resource was not found.

### Resource not found

A Flex API returns this error when a Flex Resource, also known as an API, has been entered incorrectly in the Resource URL.

1. Verify you are targeting the endpoint below for the Pre-production environment that your development environment has been configured in: <https://sita-apiprx-eastus-apimanagement.azure-api.net/>.
2. Identify and correct any other erroneous information, then attempt another request.

```JSON
{
    "statusCode": 404,
    "message": "Resource not found"
}
```

##### Response Body when an invalid Resource is included in the URL

## 500 Internal Server Error

The request was not completed due to an internal error on the server side.

### An error has occurred while communicating with the device

Any 500 Internal Errors are indicative of a major failure and should be sent immediately to <flex.api.support@sita.aero>.

```JSON
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.6.1",
    "title": "An error occurred while processing your request.",
    "status": 500,
    "detail": "An error has occurred while communicating with the device.",
    "traceId": "00-986e0e92622762478a360016038a2602-93ae8d22a22c9041-00"
}
```

##### Response Body that can occur for many reasons when a major error has been encountered

## 503 Service Unavailable

Standard error indicating the server is unavailable. Try again at a later.

# Glossary

The following acronyms are may be referenced throughout this Flex documentation and are important to understanding Flex APIs.

| Term  | Definition                              |
| ----- | --------------------------------------- |
| AAD   | Azure Active Directory                  |
| AEA   | Association of European Airlines        |
| API   | Application Programming Interface       |
| Azure | Microsoft’s Cloud solution              |
| CUSS  | Common Use Self Service                 |
| CUTE  | Common Use Terminal Equipment           |
| DCS   | Departure Control System                |
| IATA  | International Air Transport Association |
| PCI   | Payment Card Industry                   |
| PSP   | Payment Services Processor              |
| REST  | Representational State Transfer         |
| VM    | Virtual Machine                         |

# Useful Links

SITA developer.aero Flex API information:

-   <https://www.developer.aero/>

The OAuth 2.0 Authorization Framework: Client Credentials Grant (RFC 6749 Section 4.4):

-   <https://tools.ietf.org/html/rfc6749#section-4.4>

The OAuth 2.0 Authorization Framework: Bearer Token Usage:

-   <https://tools.ietf.org/html/rfc6750>

JSON Web Tokens (RFC 7519):

-   <https://tools.ietf.org/html/rfc7519>

Microsoft Identify Platform Documentation:

-   <https://docs.microsoft.com/en-us/azure/active-directory/develop/>

Microsoft Azure Active Directory (v1.0 endpoints) and OAuth v2.0 with Client Credentials Grant flow:

-   <https://docs.microsoft.com/en-us/azure/active-directory/azuread-dev/v1-oauth2-client-creds-grant-flow>

Microsoft Azure Active Directory Access Tokens:

-   <https://docs.microsoft.com/en-us/azure/active-directory/develop/access-tokens>

Microsoft Azure Service Bus Documentation:

-   <https://docs.microsoft.com/en-us/azure/service-bus-messaging/>

Microsoft Authentication Library:

-   <https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-migration>

Base64 encoder/decoder:

-   <https://base64.guru/>

IATA Technical Peripheral Specifications (formally known as the AEA Technical Specification Standards) can be purchased from IATA via links in the PDF:

-   [IATA Technical Peripheral Specifications](https://www.iata.org/contentassets/1dccc9ed041b4f3bbdcf8ee8682e75c4/2018_11_iata20technical20peripheral20specifications.pdf)

ISO 4217 Currency Code standard:

-   <https://en.wikipedia.org/wiki/ISO_4217>
