# SweApiFetch

SweApiFetch is a specific DataSource to parse SweApi JSON data.

The class inherits directly from [TimeSeriesDataSource](general.md).

There are not specific properties for this DataSource.

<br/>
<DocumentationLoad path="/guide/api/SweApi.html"/>

## Parser

Depending on the format, the input could be JSON, binary, xml, etc. data.
Whatever the input format, the datasource will format the data in a homogeneous way to be read in the same way by Layers
and Views.

The time field formatted as String ISO Date is converted into time in milliseconds.

The other fields are keeping as they are and are forwarded to the result object.

## Properties

Several properties are available:
- responseFormat: defines the input format for the generic parser
- protocol: ws/mqtt

Often the available formats are:
- application/om+json
- application/swe+json
- application/swe+binary
- application/swe+csv

SweApi supports **MQTT** protocol. 
A **mqttOpts** property is available to setup prefix and endpointUrl of the Mqtt server.

The general **endpointUrl** is still use for fetching resources only.

The **prefix** is a collection route prefix such as:

- prefix='/api'
- resource='/datastreams/gal7w6j6v7n9/observations'
 
Result =  /api/datastreams/gal7w6j6v7n9/observations

## Examples: responseFormat=application/om+json format

<ins>From Server</ins>:

```json
{
  "datastream@id": "gal7w6j6v7n9",
  "foi@id": "xcz0cdcxyy5y",
  "phenomenonTime": "2012-06-29T14:33:57.533Z",
  "resultTime": "2012-06-29T14:33:57.533Z",
  "result": {
    "location": {
      "lat": 34.7018644887497,
      "lon": -86.65802913096641,
      "alt": 3047.812619211108
    }
  },
  "timestamp": 1340980437533
}
```

<ins>After parsing</ins>:

```json
{
  "dataSourceId": "DataSource-a6472266-f869-5b0d-8632-3aa0c24569b1",
  "type": "data",
  "values": [
    {
      "data": {
        "timestamp": 1340980437533,
        "location": {
          "lat": 34.7018644887497,
          "lon": -86.65802913096641,
          "alt": 3047.812619211108
        }
      },
      "version": -9007199254740991
    }
  ]
}
```
## Example

<<< @/../../showcase-dev/examples/datasource-sweapifetch/datasource-sweapifetch.js#snippet_datasource_sweapifetch

<hr class="demo-hr"/>

<Example path="/showcase-dev/datasource-sweapifetch.html" style="border:none;width:100%;height: 200px" />
