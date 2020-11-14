---
title: Server
---

# Server

<a name="Server"></a>

## Server
**Kind**: global class  

* [Server](#Server)
    * [new Server(properties)](#new_Server_new)
    * [.getCapabilities(successCallback, errorCallback)](#Server+getCapabilities)
    * [.getFeatureOfInterest(successCallback, errorCallback)](#Server+getFeatureOfInterest)
    * [.getFeatureOfInterestById(procedure, successCallback, errorCallback)](#Server+getFeatureOfInterestById)
    * [.getResultTemplate(offering, observedProperty, successCallback, errorCallback)](#Server+getResultTemplate)
    * [.getDescribeSensor(procedure, successCallback, errorCallback)](#Server+getDescribeSensor)

<a name="new_Server_new"></a>

### new Server(properties)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| properties | <code>Object</code> |  | - |
| properties.url | <code>String</code> |  | - |
| properties.baseUrl | <code>String</code> |  | - |
| [properties.sos] | <code>String</code> | <code>&quot;sos&quot;</code> | - |
| [properties.sps] | <code>String</code> | <code>&quot;sps&quot;</code> | - |

<a name="Server+getCapabilities"></a>

### server.getCapabilities(successCallback, errorCallback)
Gets the server Capabilities.

**Kind**: instance method of [<code>Server</code>](#Server)  

| Param | Type | Description |
| --- | --- | --- |
| successCallback | <code>function</code> | async method called when the response succeeded |
| errorCallback | <code>function</code> | async method called when an error occured |

<a name="Server+getFeatureOfInterest"></a>

### server.getFeatureOfInterest(successCallback, errorCallback)
Gets the server Feature of interest.

**Kind**: instance method of [<code>Server</code>](#Server)  

| Param | Type | Description |
| --- | --- | --- |
| successCallback | <code>function</code> | async method called when the response succeeded |
| errorCallback | <code>function</code> | async method called when an error occurred |

<a name="Server+getFeatureOfInterestById"></a>

### server.getFeatureOfInterestById(procedure, successCallback, errorCallback)
Gets the server Feature of interest given a procedure id.

**Kind**: instance method of [<code>Server</code>](#Server)  

| Param | Type | Description |
| --- | --- | --- |
| procedure | <code>String</code> | The procedure id |
| successCallback | <code>function</code> | async method called when the response succeeded |
| errorCallback | <code>function</code> | async method called when an error occurred |

<a name="Server+getResultTemplate"></a>

### server.getResultTemplate(offering, observedProperty, successCallback, errorCallback)
Gets the server result template.

**Kind**: instance method of [<code>Server</code>](#Server)  

| Param | Type | Description |
| --- | --- | --- |
| offering | <code>String</code> | The corresponding offering |
| observedProperty | <code>String</code> | The corresponding observed property |
| successCallback | <code>function</code> | async method called when the response succeeded |
| errorCallback | <code>function</code> | async method called when an error occurred |

<a name="Server+getDescribeSensor"></a>

### server.getDescribeSensor(procedure, successCallback, errorCallback)
Gets the server Feature of interest given a procedure id.

**Kind**: instance method of [<code>Server</code>](#Server)  

| Param | Type | Description |
| --- | --- | --- |
| procedure | <code>String</code> | The procedure id |
| successCallback | <code>function</code> | async method called when the response succeeded |
| errorCallback | <code>function</code> | async method called when an error occurred |

