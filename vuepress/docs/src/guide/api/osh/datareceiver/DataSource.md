---
title: DataSource
---

# DataSource

<a name="DataSource"></a>

## DataSource
The DataSource is the abstract class used to create different datasources.

**Kind**: global class  

* [DataSource](#DataSource)
    * [new DataSource(name, properties, worker)](#new_DataSource_new)
    * [.setTimeRange(startTime, endTime, replaySpeed)](#DataSource+setTimeRange)
    * [.getStartTime()](#DataSource+getStartTime) ⇒ <code>String</code>
    * [.getEndTime()](#DataSource+getEndTime) ⇒ <code>String</code>
    * [.getReplaySpeed()](#DataSource+getReplaySpeed) ⇒ <code>String</code>
    * [.disconnect()](#DataSource+disconnect)
    * [.connect()](#DataSource+connect)
    * [.getId()](#DataSource+getId) ⇒ <code>String</code>
    * [.getName()](#DataSource+getName) ⇒ <code>String</code>
    * [.updateUrl(name, properties)](#DataSource+updateUrl)

<a name="new_DataSource_new"></a>

### new DataSource(name, properties, worker)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>String</code> |  | the datasource name |
| properties | <code>Object</code> |  | the datasource properties |
| properties.timeShift | <code>Boolean</code> | <code>false</code> | fix some problem with some android devices with some timestamp shift to 16 sec |
| properties.bufferingTime | <code>Number</code> | <code>0</code> | defines the time during the data has to be buffered. Useful only when used with DataSynchronizer |
| properties.timeOut | <code>Number</code> | <code>0</code> | defines the limit time before data has to be skipped. Useful only when used with DataSynchronizer |
| properties.protocol | <code>String</code> |  | defines the protocol of the datasource. @see [DataConnector](DataConnector) |
| properties.endpointUrl | <code>String</code> |  | the endpoint url |
| properties.service | <code>String</code> |  | the service |
| properties.offeringID | <code>String</code> |  | the offeringID |
| properties.observedProperty | <code>String</code> |  | the observed property |
| properties.startTime | <code>String</code> |  | the start time (ISO format) |
| properties.endTime | <code>String</code> |  | the end time (ISO format) |
| properties.replaySpeed | <code>Number</code> | <code>1</code> | the replay factor |
| properties.responseFormat | <code>Number</code> |  | the response format (e.g video/mp4) |
| properties.reconnectTimeout | <code>Number</code> | <code>10000</code> | the time before reconnecting (in milliseconds) |
| properties.batchSize | <code>Number</code> | <code>1</code> | the number of data to fetch |
| worker | <code>Object</code> |  | DataSource worker |

<a name="DataSource+setTimeRange"></a>

### dataSource.setTimeRange(startTime, endTime, replaySpeed)
Sets the data source time range

**Kind**: instance method of [<code>DataSource</code>](#DataSource)  

| Param | Type | Description |
| --- | --- | --- |
| startTime | <code>String</code> | the startTime (in date ISO) |
| endTime | <code>String</code> | the startTime (in date ISO) |
| replaySpeed | <code>Number</code> | the replay speed |

<a name="DataSource+getStartTime"></a>

### dataSource.getStartTime() ⇒ <code>String</code>
Gets the startTime

**Kind**: instance method of [<code>DataSource</code>](#DataSource)  
**Returns**: <code>String</code> - - startTime as ISO date  
<a name="DataSource+getEndTime"></a>

### dataSource.getEndTime() ⇒ <code>String</code>
Gets the endTime

**Kind**: instance method of [<code>DataSource</code>](#DataSource)  
**Returns**: <code>String</code> - - endTime as ISO date  
<a name="DataSource+getReplaySpeed"></a>

### dataSource.getReplaySpeed() ⇒ <code>String</code>
Gets the endTime

**Kind**: instance method of [<code>DataSource</code>](#DataSource)  
**Returns**: <code>String</code> - - endTime as ISO date  
<a name="DataSource+disconnect"></a>

### dataSource.disconnect()
Disconnect the dataSource then the connector will be closed as well.

**Kind**: instance method of [<code>DataSource</code>](#DataSource)  
<a name="DataSource+connect"></a>

### dataSource.connect()
Connect the dataSource then the connector will be opened as well.

**Kind**: instance method of [<code>DataSource</code>](#DataSource)  
<a name="DataSource+getId"></a>

### dataSource.getId() ⇒ <code>String</code>
Gets the datasource id.

**Kind**: instance method of [<code>DataSource</code>](#DataSource)  
**Returns**: <code>String</code> - the datasource id  
<a name="DataSource+getName"></a>

### dataSource.getName() ⇒ <code>String</code>
Gets the datasource name.

**Kind**: instance method of [<code>DataSource</code>](#DataSource)  
**Returns**: <code>String</code> - the datasource name  
<a name="DataSource+updateUrl"></a>

### dataSource.updateUrl(name, properties)
Update properties
     /**

**Kind**: instance method of [<code>DataSource</code>](#DataSource)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the datasource name |
| properties | <code>Object</code> | the datasource properties |
| properties.timeShift | <code>Boolean</code> | fix some problem with some android devices with some timestamp shift to 16 sec |
| properties.bufferingTime | <code>Number</code> | defines the time during the data has to be buffered |
| properties.timeOut | <code>Number</code> | defines the limit time before data has to be skipped |
| properties.protocol | <code>String</code> | defines the protocol of the datasource. @see [DataConnector](DataConnector) |
| properties.endpointUrl | <code>String</code> | the endpoint url |
| properties.service | <code>String</code> | the service |
| properties.offeringID | <code>String</code> | the offeringID |
| properties.observedProperty | <code>String</code> | the observed property |
| properties.startTime | <code>String</code> | the start time (ISO format) |
| properties.endTime | <code>String</code> | the end time (ISO format) |
| properties.replaySpeed | <code>Number</code> | the replay speed |
| properties.responseFormat | <code>Number</code> | the response format (e.g video/mp4) |
| properties.reconnectTimeout | <code>Number</code> | the timeout before reconnecting |

