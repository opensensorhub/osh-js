# VideoView

The video view allows you to play a video stream of several kinds:
- compressed H264, H265, VP9, VP8 etc.
- Mjpeg

To do this, it will first detect the compression used (provided by the schema description or GetResultTemplate) and then use an internal view among these three views:
- Mjpeg: for MJPEG data
- FFMPEG: for all other types of compressed data
- VideoCodecApi: still experimental in chrome

## FFMPEG

The FFMPEG view allows you to display video-type data.  The lib is based on FFMPEG.js which is a port of the native 
FFMPEG C++ library using [emscripten](https://emscripten.org/).

[More information: https://github.com/mdhsl/ffmpeg.js](https://github.com/mdhsl/ffmpeg.js)

<br/>
<DocumentationLoad path="/guide/api/FFMPEGView.html"/>

### Supported layers

The view supports type layers:
- videoData

### Limitation

The view theoretically decodes all types of video streams supported by FFMPEG. Due to the limitation of emscripten
and WebAssembly, the Javascript library does not support hardware decoding. So processing is completely handled by the CPU.

However, it is possible to display almost twenty H264 videos in parallel, since CPU decoding is optimized by the CPU
instructions themselves.

### Example

<<< @/../../showcase/examples/video-h264/video-h264.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/video-h264.html" style="border:none;width:100%;height: 500px" />

## MJPEG

The MJPEG view allows the display of a video stream made up of images in JPEG format.

<br/>
<DocumentationLoad path="/guide/api/MjpegView.html"/>

### Supported layers

The view supports type layers:
- videoData

### Example

<<< @/../../showcase/examples/video-mjpeg/video-mjpeg.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/video-mjpeg.html" style="border:none;width:100%;height: 500px" />

## Video Codec API <Badge text="beta" type="warning"/>

New APIs are being released such as the WebCodec API and allow more flexible support for video streaming.

Details of the API can be found here [https://github.com/w3c/webcodecs](https://github.com/w3c/webcodecs)
and here [https://web.dev/webcodecs/](https://web.dev/webcodecs/).

Full specification: [https://www.w3.org/TR/webcodecs/](https://www.w3.org/TR/webcodecs/)

This new API allows, among other things, to decode Video frames using Hardware acceleration.

<br/>
<DocumentationLoad path="/guide/api/WebCodecView.html"/>

###  Supported layers

The view supports type layers:
- data

###  Limitation

::: warning
This experimental version can be used in chrome >= 94 and support only H264, VP8 & VP9.
The VideoDecoder use a lot of memory. This may lead to some issues while playing multiple videos
at the same time.
:::

###  Codec

By default, the following profiles are used for the codecs:
- 'vp9':'vp09.02.10.10.01.09.16.09.01',
- 'vp8': 'vp08.00.41.08',
- 'h264': 'avc1.42e01e'

The codec string can be passed in parameter but the the profile cannot be overridden yet.

By default, the h264 codec is used.

### Architecture

The WebCodec API is used to decode frame using the VideoDecoder. In addition, the VideoDecoder is used within a webWorker to optimize performance.

