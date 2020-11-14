---
title: TopicConnector
---

# TopicConnector

<a name="TopicConnector"></a>

## TopicConnector
**Kind**: global class  

* [TopicConnector](#TopicConnector)
    * [new TopicConnector(properties)](#new_TopicConnector_new)
    * [.connect()](#TopicConnector+connect)
    * [.disconnect()](#TopicConnector+disconnect)
    * [.fullDisconnect(removeInterval)](#TopicConnector+fullDisconnect)
    * [.reconnect()](#TopicConnector+reconnect)
    * [.close()](#TopicConnector+close)
    * ["onMessage" (data)](#TopicConnector+event_onMessage)

<a name="new_TopicConnector_new"></a>

### new TopicConnector(properties)

| Param | Description |
| --- | --- |
| properties | - |

<a name="TopicConnector+connect"></a>

### topicConnector.connect()
Connect to the broadcastChannel.

**Kind**: instance method of [<code>TopicConnector</code>](#TopicConnector)  
<a name="TopicConnector+disconnect"></a>

### topicConnector.disconnect()
Disconnects the websocket.

**Kind**: instance method of [<code>TopicConnector</code>](#TopicConnector)  
<a name="TopicConnector+fullDisconnect"></a>

### topicConnector.fullDisconnect(removeInterval)
Fully disconnect the websocket connection by sending a close message to the webWorker.

**Kind**: instance method of [<code>TopicConnector</code>](#TopicConnector)  

| Param | Type | Description |
| --- | --- | --- |
| removeInterval | <code>Boolean</code> | force removing the interval |

<a name="TopicConnector+reconnect"></a>

### topicConnector.reconnect()
Try to reconnect if the connexion if closed

**Kind**: instance method of [<code>TopicConnector</code>](#TopicConnector)  
<a name="TopicConnector+close"></a>

### topicConnector.close()
Closes the webSocket.

**Kind**: instance method of [<code>TopicConnector</code>](#TopicConnector)  
<a name="TopicConnector+event_onMessage"></a>

### "onMessage" (data)
The onMessage method used by the websocket to callback the data

**Kind**: event emitted by [<code>TopicConnector</code>](#TopicConnector)  

| Param | Description |
| --- | --- |
| data | the callback data |

