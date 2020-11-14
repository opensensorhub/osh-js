---
title: VideoWithRoll
---

# VideoWithRoll

<a name="VideoWithRoll"></a>

## VideoWithRoll ⇐ <code>DataSource</code>
This datasource provides parsing to H264 raw data with roll.
Data: ArrayBuffer

**Kind**: global class  
**Extends**: <code>DataSource</code>  
<a name="new_VideoWithRoll_new"></a>

### new VideoWithRoll(name, properties)

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
| properties.responseFormat | <code>Number</code> | the response format (e.g video/mp4) |
| properties.reconnectTimeout | <code>Number</code> | the timeout before reconnecting |
| properties.customUrlParams | <code>Object</code> | the encoding options |
| properties.customUrlParams.video_bitrate | <code>Number</code> | define a custom bitrate (in b/s) |
| properties.customUrlParams.video_scale | <code>Number</code> | define a custom scale, 0.0 < value < 1.0 |
| properties.customUrlParams.video_width | <code>Number</code> | define a custom width |
| properties.customUrlParams.video_height | <code>Number</code> | define a custom height |

**Example**  
```js
import VideoWithRoll from 'osh/datareceiver/VideoWithRoll.js';

var videoDataSource = new VideoWithRoll("H264 video ", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:a0e0eac2fea3f614-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2016-08-11T20:17:30.402Z",
        endTime: "2016-08-11T20:18:05.451Z",
        replaySpeed: 1,
        bufferingTime: 1000
  });
```
