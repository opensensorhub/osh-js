---
title: WebSocketConnector
---

# WebSocketConnector

<a name="WebSocketConnector"></a>

## WebSocketConnector ⇐ <code>DataConnector</code>
Defines the WebSocketConnector to connect to a remote server by creating a WebSocket channel.

**Kind**: global class  
**Extends**: <code>DataConnector</code>  

* [WebSocketConnector](#WebSocketConnector) ⇐ <code>DataConnector</code>
    * [new WebSocketConnector(properties)](#new_WebSocketConnector_new)
    * [.connect()](#WebSocketConnector+connect)
    * [.disconnect()](#WebSocketConnector+disconnect)
    * ["onMessage" (data)](#WebSocketConnector+event_onMessage)

<a name="new_WebSocketConnector_new"></a>

### new WebSocketConnector(properties)

| Param | Description |
| --- | --- |
| properties | - |

**Example**  
```js
import WebSocketConnector from 'osh/dataconnector/WebSocketConnector.js';

let url = ...;
let connector = new WebSocketConnector(url);

// connect
connector.connect();

// disconnect
connector.disconnect();

// close
connector.close();
```
<a name="WebSocketConnector+connect"></a>

### webSocketConnector.connect()
Connect to the webSocket. If the system supports WebWorker, it will automatically creates one otherwise use
the main thread.

**Kind**: instance method of [<code>WebSocketConnector</code>](#WebSocketConnector)  
<a name="WebSocketConnector+disconnect"></a>

### webSocketConnector.disconnect()
Disconnects and close the websocket.

**Kind**: instance method of [<code>WebSocketConnector</code>](#WebSocketConnector)  
<a name="WebSocketConnector+event_onMessage"></a>

### "onMessage" (data)
The onMessage method used by the websocket to callback the data

**Kind**: event emitted by [<code>WebSocketConnector</code>](#WebSocketConnector)  

| Param | Description |
| --- | --- |
| data | the callback data |

