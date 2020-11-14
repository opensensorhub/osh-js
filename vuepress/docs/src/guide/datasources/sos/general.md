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

 [API reference](../../api/osh/datareceiver/DataSource.md)
 
To create a new datasource type, see the [developer docs](../../advanced/developers/datasources.md).
