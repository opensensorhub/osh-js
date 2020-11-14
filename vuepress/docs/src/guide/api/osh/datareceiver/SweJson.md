---
title: SweJson
---

# SweJson

<a name="SweJson"></a>

## SweJson ⇐ <code>DataSource</code>
This datasource provides generic parsing for JSON response.

**Kind**: global class  
**Extends**: <code>DataSource</code>  
<a name="new_SweJson_new"></a>

### new SweJson(name, properties)

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
| properties.replaySpeed | <code>Number</code> | the replay factor |
| properties.responseFormat | <code>Number</code> | the response format (e.g application/json) |
| properties.reconnectTimeout | <code>Number</code> | the timeout before reconnecting |

**Example**  
```js
import SweJson from 'osh/datareceiver/SweJson.js';

let androidPhoneGpsDataSource = new SweJson("android-GPS", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/Location",
    startTime: "2015-02-16T07:58:00Z",
    endTime: "2015-02-16T08:09:00Z",
    replaySpeed: replaySpeed+"",
    bufferingTime: 1000,
    timeShift: -16000
  });
```
