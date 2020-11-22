# SweJson

SweJson is a specific DataSource to parse JSON data.

The class inherits directly from [DataSource](general.md).

There are not specific properties for this DataSource. 

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

The result is then processed through the Toolkit to be synchronized or/and displayed into the [View](../../views/index).

<DocumentationLoad path="/guide/api/DataSource.html"/>

## Example

<<< @/../../showcase/examples/datasource-swejson/datasource-swejson.js#snippet_datasource_swejson

<hr class="demo-hr"/>

<iframe src="../../../showcase/datasource-swejson.html" style="border:none;width:100%;height: 500px" />
