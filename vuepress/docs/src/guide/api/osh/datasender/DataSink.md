---
title: DataSink
---

# DataSink

<a name="DataSink"></a>

## DataSink
This class is in charge of send command to the server

**Kind**: global class  

* [DataSink](#DataSink)
    * [new DataSink(name, properties)](#new_DataSink_new)
    * [.sendRequest(properties)](#DataSink+sendRequest)
    * [.getId()](#DataSink+getId) ⇒ <code>String</code>
    * [.getName()](#DataSink+getName) ⇒ <code>String</code>
    * ["onError" (response)](#DataSink+event_onError)
    * ["onSuccess" (response)](#DataSink+event_onSuccess)

<a name="new_DataSink_new"></a>

### new DataSink(name, properties)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | - |
| properties | <code>Object</code> | - |
| properties.protocol | <code>String</code> | ['http'] |
| properties.endpointUrl | <code>String</code> | - |

<a name="DataSink+sendRequest"></a>

### dataSink.sendRequest(properties)
Sends the request.

**Kind**: instance method of [<code>DataSink</code>](#DataSink)  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | - |

<a name="DataSink+getId"></a>

### dataSink.getId() ⇒ <code>String</code>
Gets the data connector default id.

**Kind**: instance method of [<code>DataSink</code>](#DataSink)  
**Returns**: <code>String</code> - The id  
<a name="DataSink+getName"></a>

### dataSink.getName() ⇒ <code>String</code>
Gets the name.

**Kind**: instance method of [<code>DataSink</code>](#DataSink)  
**Returns**: <code>String</code> - The name  
<a name="DataSink+event_onError"></a>

### "onError" (response)
Called when an error is caught.

**Kind**: event emitted by [<code>DataSink</code>](#DataSink)  

| Param |
| --- |
| response | 

<a name="DataSink+event_onSuccess"></a>

### "onSuccess" (response)
Called when the request succeeded.

**Kind**: event emitted by [<code>DataSink</code>](#DataSink)  

| Param |
| --- |
| response | 

