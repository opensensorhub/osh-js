# General

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

The data is then parsed and processed into the Toolkit [to be synchronized](../../datasynchronizer/index.md) or/and displayed 
into a [View](../../views/index).

## Data after parsing

The data are mapped into internal Object. Each DataSource defines the properties of this object but some are common to 
every DataSource.

For the time being, two kind of message are supported: 'message' and 'data'.

### Common properties

Some properties are common to all DataSources. These are the DataSourceId, and the message type.

```json
{
  type: "message",
  dataSourceId: "123-456-4569-4545"
}
```

### Data type *message*

The data type message are useful to send some message from the DataSource to the endpoint. For example, if the connector 
disconnects, then the dataSources can alert the view that the status of the connection has been changed.

The structure of such a message is:

```json
{
  type: "message",
  dataSourceId: "123-456-4569-4545",
  timestamp: 1231545456,
  status: Status.DISCONNECTED
}

```
### Data type *data*

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
      timeStamp: 1231545456,
      data: {
        lat: 45.2,
        lon: 45
      }
   }]
}

```

## Global configuration

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

The **timeOut** and **bufferingTime** are useful only for [data synchronization](../../datasynchronizer/general.md).

The **replaySpeed** property allows to modify the same frequency of reception of archive data compared to their
 original frequency.
  
## Properties configuration

The general datasource properties allows to define the parameters of the data you want to fetch.
Moreover, it is possible de get more control on the reconnection process and/or the synchronization algorithm when it is 
associated with a DataSynchronizer.

*batchsize* is useful if you want to process data in batches and display them all at once rather than displaying them one by one. For example, in the case of static data that one would like to display in a block.

To create a new datasource type, see the [developer docs](../../advanced/developers/datasources.md).