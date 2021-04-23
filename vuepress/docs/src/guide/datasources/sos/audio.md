# SosGetResultAudio

SosGetResultVideo is a specific DataSource to parse Audio data.

The class inherits directly from [TimeSeriesDataSource](general.md).

There are specific properties for this DataSource.

## Parser

The underlaying stream is binary.
 
The first 8 bytes is the timestamp in millis.
 
The next 4 bytes define the sampleRate.

The next 4 bytes define the number of samples.

The next 4 bytes define the data compressed size.

The next bytes are corresponding to an audio frame.

**|--- 8 bytes timestamp ---|--- 4 bytes sampleRate ---|--- 4 bytes number of samples ---|--- 4 bytes data compressed size ---|--- AUDIO FRAME ---|**

<ins>From Server</ins>:

```json
[..binary..data..]
```

<ins>After parsing</ins>:

```json
{
    timeStamp: 1450559070000,
    data: {
      frameData: [..binary..AUDIO FRAME...],
      sampleRate: 11025,
      nbSamples: 750,
      pktLength: 1024
    } 
}  
```

## Example

<<< @/../../showcase/examples/datasource-audio/datasource-audio.js#snippet_datasource_audio

<hr class="demo-hr"/>

<Example path="/showcase/datasource-audio.html" style="border:none;width:100%;height: 500px" />



