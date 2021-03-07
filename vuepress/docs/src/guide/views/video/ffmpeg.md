# FFMPEG

The FFMPEG view allows you to display video-type data.  The lib is based on FFMPEG.js which is a port of the native 
FFMPEG C++ library using [emscripten](https://emscripten.org/).

[More information: https://github.com/mdhsl/ffmpeg.js](https://github.com/mdhsl/ffmpeg.js)

<br/>
<DocumentationLoad path="/guide/api/FFMPEGView.html"/>

## Supported layers

The view supports type layers:
- data

## Limitation

The view theoretically decodes all types of video streams supported by FFMPEG. Due to the limitation of emscripten
and WebAssembly, the Javascript library does not support hardware decoding. So processing is completely handled by the CPU.

However, it is possible to display almost twenty H264 videos in parallel, since CPU decoding is optimized by the CPU
instructions themselves.

## Example

<<< @/../../showcase/examples/video-h264/video-h264.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/video-h264.html" style="border:none;width:100%;height: 500px" />
