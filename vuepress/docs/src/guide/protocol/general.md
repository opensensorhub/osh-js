# Protocols

Protocols define how DataSources should connect to retrieve their data. The main properties passed in the
 DataSource are used, and even depend on the connector used.

Connectors are created and used inside WebWorker so that the main thread is not blocked.

## How it works

Connectors, whatever their type, are only intended to create a connection (when it is a remote access to a server)
or to open a stream (to a file for example). For this, it is necessary to define a certain number of properties in the DataSource.
For ease of use, their implementation is hidden and their configuration will be done via the DataSources.

Once the connector retrieves the data, it sends the data to the Broadcast channel of the DataSource that will serve
the DataSynchronizer or View.

# Types

| Property | Name      | Description                 |
|----------|-----------|-----------------------------|
| ws       | WebSocket | WebSocket connector         |
| http     | HTTP      | Http connector              |
| topic    | Topic     | Broadcast channel connector |
| file     | File      | File connector              |
| mqtt     | MQTT      | MQTT connector              |
These connectors have some common properties and some more specific ones

<DocumentationLoad path="/guide/api/DataConnector.html"/>


## WebSocket protocol: '***ws***'

The WebSocket connector is used to open a connection to a WebSocket feed.

Within the Toolkit, some options of the dataSources allow to define the remote address of the server, some properties
depend on the SOS standard that the OSH server needs to retrieve the data.

[See an example](/guide/datasources/sos/swejson.html#example)

## HTTP protocol: '***http***'

The HTTP connector is used to open a connection to a HTTP feed.

Within the Toolkit, some options of the dataSources allow to define the remote address of the server, some properties
depend on the SOS standard that the OSH server needs to retrieve the data.

## MQTT protocol: '***mqtt***'
The MQTT connector is used to open a connection to a MQTT feed.

The Toolkit uses a utility class to connect to the MQTT Server. This utility class `MqttProvider` is based on the MQTT.js lib
[https://github.com/mqttjs/MQTT.js](https://github.com/mqttjs/MQTT.js)

It should be noted that for the moment, and given the current architecture of the Toolkit, the MQTT connector is launched
in a WebWorker. Thus, it is not possible to mutualize the connections to the server between different DataSouces.


## Topic protocol: '***topic***'

The Topic connector is used to listen to a BroadcastChannel given a specific topic name.

Example:

```js
import SosGetResult from 'osh-js/core/datasource/SosGetResult';

new SosGetResult('Example',{
  replaySpeed: 1.0,
  name: 'Example',
  protocol: 'topic',
  topicName: 'channel-test'
});
```
## File protocol: '***file***'

The File connector is used to read a file.

It uses the [loaders.gl](https://loaders.gl/) library to parse different file types

```js
import File from 'osh-js/core/datasource/File';

new File('Example',{
  name: 'Example',
  paths: ['http://opensensorhub.github.io/osh-js/dev/demos/earthquakes/data/earthquakes.1.csv']
});
```
*Note: By default, the DataSource File object defines the 'file' protocol.
It is therefore not necessary to define it in its properties.*
