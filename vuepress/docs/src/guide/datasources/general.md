# General

The DataSource is the entry point defining some properties about the kind of data you want to display and how to connect to it.

There are properties to control the playback stream, server version, protocols, buffering, and some other network options.

**osh-js** comes with built-in datasource types:

- [SosGetResult](sos.md)
- [SweApiFetchJson](sweapifetch.md)

## Data parsing

The second role of the DataSource is to provide a way to parse the data depending on the kind of DataSource we invoke.
Each DataSource provides an inner generic parser which defines how to parse the data.

The generic parser will make **getResultTemplate** request for SOS, or **/schema** for SweApi. Using the schema or resultTemplate,
the parser is able to automatically parse the data into the correct format.

The DataSource uses a DataConnector which instantiates a WebSocket or HTTP connection to get results from the server.
In case of GetResult request, it is preferable to use a WebSocket because it will keep a persistent connection between the client and the server.

For the case of using a WebSocket connector, the data is in the form of an **arrayBuffer** as defined into the
[WebSocket Specification](https://html.spec.whatwg.org/multipage/web-sockets.html#network).

The DataSource parses the binary array to read the original content such as Text, Json, other binary data(video frames) etc.

Several types of DataSource exist. For the moment, they are divided into `TimeSeriesDataSource` and `DataSource`.

`TimeSeriesDataSource` inherits directly from `DataSource` and adds the notion of time.
Indeed, it mainly concerns the `GetResult` request.

## Data after parsing

The data are mapped into internal Object. Each DataSource defines the properties of this object but some are common to
every DataSource.

For the time being, two kind of message are supported: `message` and `data`.

## DataSource

### Common properties

Some properties are common to all DataSources. These are the DataSourceId, and the message type.

```json
{
  type: "message",
  dataSourceId: "123-456-4569-4545"
}
```

### Data type `message`

The data type message are useful to send some message from the DataSource to the endpoint. For example, if the connector
disconnects, then the dataSources can alert the view that the status of the connection has been changed.

The structure of such a message is:

```json
{
  type: "message",
  dataSourceId: "123-456-4569-4545",
  status: Status.DISCONNECTED
}

```
### Data type `data`

These are the data messages. These objects are the result of parsing the source object received by the server
to the internal object of the Toolkit.
Each message contains a set of values, which in turn contains a timeStamp and an associated data.

The choice to pass an array rather than a single object is due to the fact that the *batch* property of the DataSource can be used.
This property allows to receive a group of data rather than a single data item([see batch section](./batch.md)).
For example, if you want to display a Graph,
it is often preferable to initialize it with all the data at once (for archive data) rather than updating it data by data.

The structure of such a message is:

```json
{
    type: "data",
    dataSourceId: "123-456-4569-4545",
    values: [{
      data: {
        lat: 45.2,
        lon: 45
      }
   }]
}

```

### Data type `time`

The main idea is to be able to retrieve the timestamp of the last data from a datasource on a specified channel.
This is useful for example if you only want to display the different times (and compare them) of the DataSources.

```json
{
    "timestamp": 1396076885000,
    "type": "time"
}
```

### Subscription

A DataSource can subscribe to one or more events simultaneously. To do so, we can use the `subscribe` method by specifying the type of data we want.

```js
myDataSource.subscribe((message) =>  ..., [EventType.DATA, EventType.TIME]);
```

### Events type

Several types of events can be listened:
- DATA: data parsed result
- LAST_TIME: last data timestamp
- STATUS: connexion status,
- TIME_CHANGED: when the time of a dataSource changed
- MASTER_TIME: current executing time of the corresponding DataSynchronizer 
 
### Global configuration

There are global properties common to every datasource owned by the DataSource Object.

<DocumentationLoad path="/guide/api/DataSource.html"/>

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

The **batchSize** property allows to receive a group of data rather than a single data item.
For example, if you want to display a Graph, it is often preferable to initialize it with all the data at once
(for archive data) rather than updating it data by data. [see batch section](./batch_replayspeed.md)

The **reconnectTimeout** allows you to set the time before the connector tries to reconnect after being disconnected.

### Properties configuration

The general datasource properties allows to define the parameters of the data you want to fetch.
Moreover, it is possible de get more control on the reconnection process and/or the synchronization algorithm when it is
associated with a DataSynchronizer.

*batchsize* is useful if you want to process data in batches and display them all at once rather than displaying them one by one. For example, in the case of static data that one would like to display in a block.

To create a new datasource type, see the [developer docs](../../advanced/developers/datasources.md).

## TimeSeriesDataSource

This datasource allows to request the server with the notion of time. The temporal synchronization of the data is then possible for all DataSources inheriting it.

After the parsing, the data can be synchronized using [the DataSynchronizer](../../timesync/general.md) or/and displayed
into a [View](../../views/index).


### Data type *data*

The structure is similar to a DataSource but with a `timestamp' field allowing to add temporality to the data.

The structure of such a message is:

```json
{
    type: "data",
    dataSourceId: "123-456-4569-4545",
    values: [{
      timeStamp: 1231545456,
      data: {
        lat: 45.2,
        lon: 45
      }
   }]
}

```

### Modes

Several modes are possible:
- REAL_TIME: allows you to read a stream in real time
- REPLAY: allows you to read a stream in replay
- BATCH: allows you to read a stream at once

Some options are available depending on the chosen mode.

In REAL_TIME mode, to overcome a spontaneous latency problem, it is possible to define a **timeout** property.
In REPLAY mode, it is possible to define the temporal size of the FETCH to be executed and also the size of the maximum number of data to be recovered in this temporal range.

::: warning
The use of REPLAY mode must be associated with the use of a DataSynchronizer. So, for all datasources declared in REPLAY
mode, they must be added and driven by a DataSynchronizer
:::
### Global configuration

There are global properties common to every datasource owned by the TimeSeriesDataSource Object.

<DocumentationLoad path="/guide/api/TimeSeriesDataSource.html"/>

Example:

```jsx

const timeSeriesDataSource = {
    ...,
    timeShift: -16000,
    timeOut: 100,
    replaySpeed: 1.5
};
```
The **timeOut** is useful only for [data synchronization](../../timesync/general.md) in REAL_TIME mode.

The **replaySpeed** property allows to modify the same frequency of reception of archive data compared to their
original frequency in REPLAY mode.

### Properties configuration

The general datasource properties allows to define the parameters of the data you want to fetch.
Moreover, it is possible de get more control on the reconnection process and/or the synchronization algorithm when it is
associated with a DataSynchronizer.
