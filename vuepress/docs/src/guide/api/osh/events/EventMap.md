---
title: EventMap
---

# EventMap

<a name="EventMap"></a>

## EventMap
This class is responsible for observing and firing events. It used an object as backed data structure.

**Kind**: global class  

* [EventMap](#EventMap)
    * [.observe(eventName, fnCallback, id)](#EventMap+observe)
    * [.fire(eventName, properties)](#EventMap+fire)

<a name="EventMap+observe"></a>

### eventMap.observe(eventName, fnCallback, id)
Observes any eventName and calls the callback when the event is fired.

**Kind**: instance method of [<code>EventMap</code>](#EventMap)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| eventName | <code>String</code> |  | - |
| fnCallback | <code>function</code> |  | - |
| id | <code>String</code> | <code>any</code> | id of the div to observe |

<a name="EventMap+fire"></a>

### eventMap.fire(eventName, properties)
Fires an event

**Kind**: instance method of [<code>EventMap</code>](#EventMap)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>String</code> | - |
| properties | <code>Object</code> | - |

