# Video Codec API <Badge text="beta" type="warning"/>

New APIs are being released such as the WebCodec API and allow more flexible support for video streaming.

Details of the API can be found here [https://github.com/WICG/web-codecs](https://github.com/WICG/web-codecs) 
and here [https://wicg.github.io/web-codecs/](https://wicg.github.io/web-codecs/).

This new API allows, among other things, to decode Video frames using Hardware acceleration.

<br/>
<DocumentationLoad path="/guide/api/WebCodecView.html"/>

## Supported layers

The view supports type layers:
- data

## Limitation

::: warning
This experimental version can be used in chrome >= 86 and with the 'Experimental Web Platform features' flag enabled.
It does not support multi video reading at the same time.
:::

## Example

<<< @/../../showcase/examples/video-h264-webcodec-api/video-h264-webcodec-api.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/video-h264-webcodec-api.html" style="border:none;width:100%;height: 500px" />
