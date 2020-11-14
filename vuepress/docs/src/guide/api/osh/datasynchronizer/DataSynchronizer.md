---
title: DataSynchronizer
---

# DataSynchronizer

<a name="DataSynchronizer"></a>

## DataSynchronizer
**Kind**: global class  

* [DataSynchronizer](#DataSynchronizer)
    * [new DataSynchronizer(properties)](#new_DataSynchronizer_new)
    * [.push(dataSourceId, data)](#DataSynchronizer+push)
    * [.connect()](#DataSynchronizer+connect)
    * [.disconnect()](#DataSynchronizer+disconnect)
    * [.getStartTime()](#DataSynchronizer+getStartTime) ⇒ <code>String</code>
    * [.getEndTime()](#DataSynchronizer+getEndTime) ⇒ <code>String</code>
    * [.getReplaySpeed()](#DataSynchronizer+getReplaySpeed) ⇒ <code>Number</code>
    * [.setTimeRange(startTime, endTime, replaySpeed)](#DataSynchronizer+setTimeRange)
    * [.reset()](#DataSynchronizer+reset)
    * [.terminate()](#DataSynchronizer+terminate)

<a name="new_DataSynchronizer_new"></a>

### new DataSynchronizer(properties)
Creates The dataSynchronizer.


| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | the property of the object |
| properties.replaySpeed | <code>Number</code> | replaySpeed value |
| properties.intervalRate | <code>Number</code> | interval in which data is played |
| properties.dataSources | <code>Array.&lt;DataSource&gt;</code> | the dataSource array |

<a name="DataSynchronizer+push"></a>

### dataSynchronizer.push(dataSourceId, data)
**Kind**: instance method of [<code>DataSynchronizer</code>](#DataSynchronizer)  

| Param | Type | Description |
| --- | --- | --- |
| dataSourceId | <code>String</code> | the dataSource id |
| data | <code>Object</code> | the data to push into the data synchronizer |

<a name="DataSynchronizer+connect"></a>

### dataSynchronizer.connect()
Connects all dataSources

**Kind**: instance method of [<code>DataSynchronizer</code>](#DataSynchronizer)  
<a name="DataSynchronizer+disconnect"></a>

### dataSynchronizer.disconnect()
Disconnects all dataSources

**Kind**: instance method of [<code>DataSynchronizer</code>](#DataSynchronizer)  
<a name="DataSynchronizer+getStartTime"></a>

### dataSynchronizer.getStartTime() ⇒ <code>String</code>
Gets the startTime of the first DataSource objet

**Kind**: instance method of [<code>DataSynchronizer</code>](#DataSynchronizer)  
**Returns**: <code>String</code> - - startTime as ISO date  
<a name="DataSynchronizer+getEndTime"></a>

### dataSynchronizer.getEndTime() ⇒ <code>String</code>
Gets the endTime of the first DataSource objet

**Kind**: instance method of [<code>DataSynchronizer</code>](#DataSynchronizer)  
**Returns**: <code>String</code> - - endTime as ISO date  
<a name="DataSynchronizer+getReplaySpeed"></a>

### dataSynchronizer.getReplaySpeed() ⇒ <code>Number</code>
Gets the replaySpeed

**Kind**: instance method of [<code>DataSynchronizer</code>](#DataSynchronizer)  
**Returns**: <code>Number</code> - - the replay speed  
<a name="DataSynchronizer+setTimeRange"></a>

### dataSynchronizer.setTimeRange(startTime, endTime, replaySpeed)
Sets the data source time range

**Kind**: instance method of [<code>DataSynchronizer</code>](#DataSynchronizer)  

| Param | Type | Description |
| --- | --- | --- |
| startTime | <code>String</code> | the startTime (in date ISO) |
| endTime | <code>String</code> | the startTime (in date ISO) |
| replaySpeed | <code>Number</code> | the replay speed |

<a name="DataSynchronizer+reset"></a>

### dataSynchronizer.reset()
Resets reference time

**Kind**: instance method of [<code>DataSynchronizer</code>](#DataSynchronizer)  
<a name="DataSynchronizer+terminate"></a>

### dataSynchronizer.terminate()
Terminate the corresponding running WebWorker by calling terminate() on it.

**Kind**: instance method of [<code>DataSynchronizer</code>](#DataSynchronizer)  
