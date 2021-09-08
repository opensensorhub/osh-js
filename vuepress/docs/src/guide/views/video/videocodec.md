# Video Codec API <Badge text="beta" type="warning"/>

New APIs are being released such as the WebCodec API and allow more flexible support for video streaming.

Details of the API can be found here [https://github.com/w3c/webcodecs](https://github.com/w3c/webcodecs) 
and here [https://web.dev/webcodecs/](https://web.dev/webcodecs/).

Full specification: [https://www.w3.org/TR/webcodecs/](https://www.w3.org/TR/webcodecs/)

This new API allows, among other things, to decode Video frames using Hardware acceleration.

<br/>
<DocumentationLoad path="/guide/api/WebCodecView.html"/>

## Supported layers

The view supports type layers:
- data

## Limitation

::: warning
This experimental version can be used in chrome >= 94 and support only H264, VP8 & VP9.
The VideoDecoder use a lot of memory. This may lead to some issues while playing multiple videos
at the same time.
:::

## Codec

By default, the following profiles are used for the codecs:
- 'vp9':'vp09.02.10.10.01.09.16.09.01',
- 'vp8': 'vp08.00.41.08',
- 'h264': 'avc1.42e01e'

The codec string can be passed in parameter but the the profile cannot be overrided yet.

By default, the h264 codec is used.

## Architecture
 
The WebCodec API is used to decode frame using the VideoDecoder. In addition, the VideoDecoder is used within a webWorker to optimize performance.

## Example

<<< @/../../showcase/examples/video-h264-webcodec-api/video-h264-webcodec-api.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/video-h264-webcodec-api.html" style="border:none;width:100%;height: 500px" />
