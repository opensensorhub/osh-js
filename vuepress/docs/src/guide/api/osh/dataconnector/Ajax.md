---
title: Ajax
---

# Ajax

<a name="Ajax"></a>

## Ajax ⇐ <code>DataConnector</code>
Defines the AjaxConnector to connect to a remote server by making AjaxRequest.

**Kind**: global class  
**Extends**: <code>DataConnector</code>  

* [Ajax](#Ajax) ⇐ <code>DataConnector</code>
    * [new Ajax(url, properties)](#new_Ajax_new)
    * [.sendRequest(request, extraUrl)](#Ajax+sendRequest)
    * ["onError" (event)](#Ajax+event_onError)
    * ["onSuccess" (event)](#Ajax+event_onSuccess)

<a name="new_Ajax_new"></a>

### new Ajax(url, properties)
Creates Ajax.


| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | - |
| properties | <code>Object</code> | - |
| properties.method | <code>String</code> | - |
| properties.responseType | <code>String</code> | - |

**Example**  
```js
import Ajax from 'osh/dataconnector/Ajax.js';

let request = ...;
let connector = new Ajax(url);

// handle onSuccess
connector.onSuccess = function(event) {
 // does something
}

connector.onError = function(event) {
 // does something
}

// send request
connector.sendRequest(request);
```
<a name="Ajax+sendRequest"></a>

### ajax.sendRequest(request, extraUrl)
Sends the request to the defined server.

**Kind**: instance method of [<code>Ajax</code>](#Ajax)  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>String</code> | The Http request |
| extraUrl | <code>String</code> | get query parameters |

<a name="Ajax+event_onError"></a>

### "onError" (event)
This is the callback method in case of getting error connection.

**Kind**: event emitted by [<code>Ajax</code>](#Ajax)  

| Param | Description |
| --- | --- |
| event | The error details |

<a name="Ajax+event_onSuccess"></a>

### "onSuccess" (event)
This is the callback method in case of getting success connection.

**Kind**: event emitted by [<code>Ajax</code>](#Ajax)  

| Param |
| --- |
| event | 

