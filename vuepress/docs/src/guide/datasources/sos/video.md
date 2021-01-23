# SosGetResultVideo

SosGetResultVideo is a specific DataSource to parse Video data.

The class inherits directly from [TimeSeriesDataSource](general.md).

There are specific properties for this DataSource.

## Specific properties

These properties are members of [customUrlParams](general.md#global-configuration).

<DocumentationLoad path="/guide/api/SosGetResultVideo.html"/>

*(1) Note that in case of the video stream, it is very important to define the **responseFormat** to activate the support of these parameters.*

*(2) Note these parameters are available only from OSH server >= 1.4.0*

## Parser

The underlaying stream is binary.
 
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
    timeStamp: 1450559070000,
    data: {
      frameData: [..binary..NAL_UNIT...],
      roll: 0    
    } 
}  
```

## Example

<<< @/../../showcase/examples/datasource-video/datasource-video.js#snippet_datasource_video

<hr class="demo-hr"/>

<Example path="/showcase/datasource-video.html" style="border:none;width:100%;height: 500px" />



