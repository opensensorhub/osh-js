# SosGetResult

SosGetResult is the generic DataSource to parse JSON data from SOS.

The class inherits directly from [TimeSeriesDataSource](general.md).

There are not specific properties for this DataSource. 

## Parser
Depending on the format, the input could be JSON, binary, xml, etc. data.
Whatever the input format, the datasource will format the data in a homogeneous way to be read in the same way by Layers
and Views.

## Examples: JSON format

For example, for the application/json:

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

<DocumentationLoad path="/guide/api/SosGetResult.html"/>

### Example

<<< @/../../showcase-dev/examples/datasource-swejson/datasource-swejson.js#snippet_datasource_swejson

<hr class="demo-hr"/>

<Example path="/showcase-dev/datasource-swejson.html" style="border:none;width:100%;height: 500px" />


## Examples: Binary format

The underlaying stream is a video binary stream.

The first 8 bytes is the timestamp in millis.

The next 4 bytes define the frame length.

The next bytes are corresponding to a full NAL unit.

**|--- 8 bytes timestamp ---|--- 4 bytes frame length ---|--- NAL UNIT ---|**

<ins>From Server</ins>:

```json
[..binary..data..]
```

<ins>After parsing</ins>:

```json
{
  "timeStamp": 1450559070000,
  "data": {
    "frameData": {
      "data": [..binary..NAL_UNIT...],
      "compression": "h264",
    },
    "roll": 90
  }
}  
```
## Example

<<< @/../../showcase-dev/examples/datasource-video/datasource-video.js#snippet_datasource_video

<hr class="demo-hr"/>

<Example path="/showcase-dev/datasource-video.html" style="border:none;width:100%;height: 500px" />
