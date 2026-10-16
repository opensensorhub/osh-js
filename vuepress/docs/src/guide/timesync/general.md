# DataSynchronizer

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

<DocumentationLoad path="/guide/api/DataSynchronizer.html"/>

The ***timerResolution*** allows you to define the refresh rate of the synchronization algorithm.

The algorithm uses a function to check the state of its buffer to know if a data is candidate to be sent to the views. 
This function is timed by a time interval that can be changed during the construction of the DataSynchronizer object 
using the ***timerResolution*** property.

**Note For further details about how the algorithm works, see [Advanced section](../advanced/datasynchronizer.md)*

The **masterTimeRefreshRate** defines the time to refresh and send the masterTime through the BroadcastChannel. Depending 
on the data frequency, it can be useful to change the default value.

## Channels

The *DataSynchronizer* will receive the data through
 [*BroadcastChannel*(s)](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) 
 and send back the result through the same 
channel(s).

It also returns a time synchronization data defined by `TIME_SYNCHRONIZER_TOPIC` + `<id_of_synchronizer>`.

The `TIME_SYNCHRONIZER_TOPIC` constant is defined from the constant package `'osh-js/core/Constants'`

### Example

<<< @/../../showcase-dev/examples/datasource-swejson/datasource-swejson.js#snippet_datasource_swejson
