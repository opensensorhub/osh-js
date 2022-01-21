# SweApiFetchVideo

SweApiFetchVideo is a specific DataSource to parse SweApi video data.

The class inherits directly from [TimeSeriesDataSource](general.md).

There are not specific properties for this DataSource.

<br/>
<DocumentationLoad path="/guide/api/SweApiFetchVideo.html"/>

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

