---
title: EventManager
---

# EventManager

<a name="EventManager"></a>

## EventManager
This class is response for handling events and acts as an event bus.

**Kind**: global class  

* [EventManager](#EventManager)
    * [.EVENT](#EventManager.EVENT) : <code>Object</code>
    * [.fire(eventName, properties)](#EventManager.fire)
    * [.observe(eventName, fnCallback)](#EventManager.observe)
    * [.observeDiv(divId, eventName, fnCallback)](#EventManager.observeDiv)

<a name="EventManager.EVENT"></a>

### EventManager.EVENT : <code>Object</code>
This part defines the events used INTO the API

**Kind**: static constant of [<code>EventManager</code>](#EventManager)  
<a name="EventManager.fire"></a>

### EventManager.fire(eventName, properties)
Fires an event

**Kind**: static method of [<code>EventManager</code>](#EventManager)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | - |
| properties | <code>Object</code> | - |

<a name="EventManager.observe"></a>

### EventManager.observe(eventName, fnCallback)
Observes any eventName and calls the callback when the event is fired.

**Kind**: static method of [<code>EventManager</code>](#EventManager)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | - |
| fnCallback | <code>function</code> | - |

<a name="EventManager.observeDiv"></a>

### EventManager.observeDiv(divId, eventName, fnCallback)
Observes eventName attached to a div element  and calls the callback when the event is fired.

**Kind**: static method of [<code>EventManager</code>](#EventManager)  

| Param | Type | Description |
| --- | --- | --- |
| divId | <code>String</code> | - |
| eventName | <code>String</code> | - |
| fnCallback | <code>function</code> | - |

