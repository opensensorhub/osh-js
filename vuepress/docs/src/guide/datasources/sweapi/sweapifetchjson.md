# SweApiFetchJson

SweApiFetchJson is a specific DataSource to parse SweApi JSON data.

The class inherits directly from [TimeSeriesDataSource](general.md).

There are not specific properties for this DataSource.

<br/>
<DocumentationLoad path="/guide/api/SweApiFetchJson.html"/>

## Parser
The time field formatted as String ISO Date is converted into time in milliseconds.

The other fields are keeping as they are and are forwarded to the result object.

<ins>From Server</ins>:

```json
{
  "time": "2015-02-16T07:58:52Z",
  "location": {
    "lat": 43.61759959, 
    "lon": 1.42376351, 
    "alt": 195.0
  }
}
```

<ins>After parsing</ins>:

```json
{
    timeStamp: 1424073532000,
    data: {
        "location": {
            "lat": 43.61759959, 
            "lon": 1.42376351, 
            "alt": 195.0
        }              
    }
}  
```

## Example

<<< @/../../showcase/examples/mqtt/mqtt.js#snippet_datasource_mqttswejson

<hr class="demo-hr"/>

<Example path="/showcase/mqtt.html" style="border:none;width:100%;height: 500px" />
