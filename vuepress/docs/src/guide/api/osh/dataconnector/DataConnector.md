---
title: DataConnector
---

# DataConnector

<a name="DataConnector"></a>

## DataConnector
The DataConnector is the abstract class used to create different connectors.

**Kind**: global class  

* [DataConnector](#DataConnector)
    * [new DataConnector(url)](#new_DataConnector_new)
    * [.setUrl(url)](#DataConnector+setUrl)
    * [.getId()](#DataConnector+getId) ⇒ <code>String</code>
    * [.getUrl()](#DataConnector+getUrl) ⇒ <code>String</code>
    * [.setReconnectTimeout(timeout)](#DataConnector+setReconnectTimeout)
    * [.onChangeStatus(status)](#DataConnector+onChangeStatus)
    * [.checkStatus(status)](#DataConnector+checkStatus)
    * [.onDisconnect()](#DataConnector+onDisconnect)
    * [.onConnect()](#DataConnector+onConnect)

<a name="new_DataConnector_new"></a>

### new DataConnector(url)

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The full url used to connect to the data stream |

<a name="DataConnector+setUrl"></a>

### dataConnector.setUrl(url)
Sets the url

**Kind**: instance method of [<code>DataConnector</code>](#DataConnector)  

| Param |
| --- |
| url | 

<a name="DataConnector+getId"></a>

### dataConnector.getId() ⇒ <code>String</code>
The data connector default id.

**Kind**: instance method of [<code>DataConnector</code>](#DataConnector)  
<a name="DataConnector+getUrl"></a>

### dataConnector.getUrl() ⇒ <code>String</code>
The stream url.

**Kind**: instance method of [<code>DataConnector</code>](#DataConnector)  
<a name="DataConnector+setReconnectTimeout"></a>

### dataConnector.setReconnectTimeout(timeout)
Sets the reconnection timeout

**Kind**: instance method of [<code>DataConnector</code>](#DataConnector)  

| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>Number</code> | delay in milliseconds before reconnecting dataSource |

<a name="DataConnector+onChangeStatus"></a>

### dataConnector.onChangeStatus(status)
Called when the connection STATUS changes

**Kind**: instance method of [<code>DataConnector</code>](#DataConnector)  

| Param | Type | Description |
| --- | --- | --- |
| status | <code>Status</code> | the new status |

<a name="DataConnector+checkStatus"></a>

### dataConnector.checkStatus(status)
Check a change of the status and call the corresponding callbacks if necessary

**Kind**: instance method of [<code>DataConnector</code>](#DataConnector)  

| Param | Type | Description |
| --- | --- | --- |
| status | <code>Status</code> | the currentStatus |

<a name="DataConnector+onDisconnect"></a>

### dataConnector.onDisconnect()
Called when the connector has been disconnected

**Kind**: instance method of [<code>DataConnector</code>](#DataConnector)  
<a name="DataConnector+onConnect"></a>

### dataConnector.onConnect()
Called when the connector has been connected

**Kind**: instance method of [<code>DataConnector</code>](#DataConnector)  
