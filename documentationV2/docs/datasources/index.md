---
id: index
title: DataSources
sidebar_label: General
---

The DataSource is the entry point defining some properties about the kind of data you want to display and how to connect to it.

There are properties to control the playback stream, server version, data connector, buffering, and some other network options.

**osh-js** comes with built-in datasource types:

- [SweJson](swejson.md)
- [Video](video.md)
- [VideoWithRoll](videoroll.md)

## Data parsing

The second role of the DataSource is to provide a way to parse the data depending on the kind of DataSource we invoke.
Each DataSource provides an inner parser which defines how to parse the data.

The DataSource uses a DataConnector which instantiates a WebSocket connection to make a permanent connection to the server.
The data is in the form of an **arrayBuffer** as defined into the [WebSocket Specification](https://html.spec.whatwg.org/multipage/web-sockets.html#network). 

The DataSource parses the binary array to read the original content such as Text, Json, other binary data(video frames) etc.

The data is then parsed and processed into the Toolkit [to be synchronized](../datasynchronizer/index.md) or/and displayed 
into a [View](../view/index).

## Global configuration

There are global properties common to every datasource owned by the DataSource Object.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
|name|String|-| the datasource name
|properties|Object| object |the datasource properties
|customUrlParams|Object| - | custom URL params 

The **customUrlParams** are properties that are automatically appended to the URL as they are provided.

Example:

```jsx

const dataSource = {
    ...,
    customUrlParams: {
        'someParams': 'value1'
    }   
};
```

This will give the following result URL:

```html
http://some-url?..&customUrlParams=value1
```

## Properties configuration

The general datasource properties allows to define the parameters of the data you want to fetch.
Moreover, it is possible de get more control on the reconnection process and/or the synchronization algorithm when it is 
associated with a DataSynchronizer.

*batchsize* is useful if you want to process data in batches and display them all at once rather than displaying them one by one. For example, in the case of static data that one would like to display in a block.

| Name | Type | Default | Description |  Mandatory 
| ---- | ---- | ------- | --------------- |  ---------
|protocol|String| - | defines the protocol of the datasource | yes 
|endpointUrl|String| - | the endpoint url | yes
|service|String| - | the service | yes
|offeringID|String| - | the offeringID | yes
|observedProperty|String| - | the observed property | yes
|startTime|String| - | the start time (ISO format) | yes
|endTime|String| - | the end time (ISO format) | yes
|timeShift|Boolean|0| fix some problem with some android devices with some timestamp shift to 16 sec | -
|bufferingTime|Number| 0 | defines the time during the data has to be buffered* | -
|timeOut|Number| 0 | defines the limit time before data has to be skipped* | -
|replaySpeed|Number| 1 | the replay factor to speedUp or slow down the playback stream | -
|responseFormat|String| - | the response format (e.g video/mp4) | - 
|reconnectTimeout|Number| 10000ms | the timeout before reconnecting | -
|batchSize|Number| 1 | the number of data to fetch at the same time | -

## Example

Here a simple example demonstrating how to get some GPS data:

```jsx
import SweJson from 'osh/datareceiver/SweJson.js';

// create data source for Android phone GPS
let gpsDataSource = new SweJson('android-GPS', {
	protocol: 'ws',
	service: 'SOS',
	endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
	offeringID: 'urn:android:device:060693280a28e015-sos',
	observedProperty: 'http://sensorml.com/ont/swe/property/Location',
	startTime: '2015-02-16T07:58:30Z',
	endTime: '2015-02-16T08:09:00Z',
	replaySpeed: 2
});
```
**Useful only when used with DataSynchronizer*

To create a new datasource type, see the [developer docs](../developers/datasources.md).
