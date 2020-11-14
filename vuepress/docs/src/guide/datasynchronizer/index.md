---
id: index
title: DataSynchronizer
sidebar_label: General
---

The DataSynchronizer is an object allowing the synchronization of multiple DataSources. 

When several DataSources connect to the server, the data come on different channels. 

They come in temporal order within the same Stream but f you want to display data from several DataSources at a time *t*,
 then you need to set up a synchronization mechanism.

Let's take the example of a GPS sensor, and a video where the GPS sensor sends data at a rate of 1 data/second, 
and the video sends data at a rate of 30 frames/second.

So if we want to synchronize them, we have to take into account each video frame (where each frame has a timestamp 
that can locate it precisely in time) and a GPS data. 

A mechanism will therefore have to take all these data streams as INPUT, ordering them in temporal order and sending
 them back to the Views so that they can be displayed.

This is the role of the DataSynchronizer, taking several DataSources as Input and send back the new stream containing 
all data ordered in temporal order.

## Properties configuration

There are properties owned by the DataSynchronizer Object.

| Name | Type | Default | Description |  Mandatory
| ---- | ---- | ------- | ----------- |  ---------
|replaySpeed|Number|1| The playback speed | -
|intervalRate|Number|5| The inner interval rate to process each incoming data* (in milliseconds) | -
|dataSources|[DataSource](../datasources/index.md)|-| The list of DataSource objects to synchronize | yes 

**Note For further details about how the algorithm works, see [Advanced section](../advanced/datasynchronizer.md)*

## Example

This example defines multiple DataSources object to synchronize:

```jsx
import DataSynchronizer from 'osh/datasynchronizer/DataSynchronizer';
import Video            from 'osh/datareceiver/Video.js';
import SweJson          from 'osh/datareceiver/SweJson.js';

const REPLAY_SPEED = 1.0;

// Video data
const videoDataSource = new Video('drone-Video', {
    protocol: 'ws',
    service: 'SOS',
    endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
    offeringID: 'urn:mysos:solo:video2',
    observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
    startTime: '2015-12-19T21:04:29.231Z',
    endTime: '2015-12-19T21:09:19.675Z',
    replaySpeed: REPLAY_SPEED
});

// GPS data
const platformLocationDataSource = new SweJson('android-GPS', {
    protocol: 'ws',
    service: 'SOS',
    endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
    offeringID: 'urn:mysos:solo:nav2',
    observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
    startTime: '2015-12-19T21:04:29.231Z',
    endTime: '2015-12-19T21:09:19.675Z',
    replaySpeed: REPLAY_SPEED
});

// Orientation data
const platformOrientationDataSource = new SweJson('android-Heading', {
    protocol: 'ws',
    service: 'SOS',
    endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
    offeringID: 'urn:mysos:solo:nav2',
    observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
    startTime: '2015-12-19T21:04:29.231Z',
    endTime: '2015-12-19T21:09:19.675Z',
    replaySpeed: REPLAY_SPEED
});

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: REPLAY_SPEED,
    intervalRate: 5,
    dataSources: [videoDataSource, platformLocationDataSource, platformOrientationDataSource]
})

// connects each DataSource
dataSynchronizer.connect();
```

## Channels

The *DataSynchronizer* will receive the data through
 [*BroadcastChannel*(s)](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) 
 and send back the result through the same 
channel(s).
