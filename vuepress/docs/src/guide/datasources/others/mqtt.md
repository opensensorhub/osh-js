# MQTT

SweApiMqttJson is a specific DataSource to parse MQTT Json data.

The class inherits directly from [TimeSeriesDataSource](general.md).

There are specific properties for this DataSource.

## Parser

The underlaying stream is binary.

## Parser
The time field formatted as String ISO Date is converted into time in milliseconds.

The other fields are keeping as they are and are forwarded to the result object.

<ins>From Server</ins>:

```json
{
  "datastreamId": "m1isar991e9i",
  "phenomenonTime": "2012-06-29T14:35:15.666Z",
  "resultTime": "2012-06-29T14:35:15.666Z",
  "result": {
    "platformLocation": {
      "lat": 34.72933450002658,
      "lon": -86.67674608839525,
      "alt": 3047.812619211108
    },
    "platformHPR": {
      "heading": 255.07896423339844,
      "pitch": 2.1997742652893066,
      "roll": -10.055849075317383
    }
  }
}
```

<ins>After parsing</ins>:

```json
{
  "data": {
    "platformLocation": {
      "lat": 34.72933450002658,
      "lon": -86.67674608839525,
      "alt": 3047.812619211108
    },
    "platformHPR": {
      "heading": 255.07896423339844,
      "pitch": 2.1997742652893066,
      "roll": -10.055849075317383
    }
  },
  "timeStamp": 1340980515666,
  "version": -9007199254740991
} 
```

<DocumentationLoad path="/guide/api/SweApiMqttJson.html"/>

## Example

<<< @/../../showcase/examples/mqtt/mqtt.js#snippet_datasource_mqttswejson

<hr class="demo-hr"/>

<Example path="/showcase/mqtt.html" style="border:none;width:100%;height: 500px" />
