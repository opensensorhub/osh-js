# Audio

The Audio view allows you to display audio-type data.
New APIs are being released such as the WebCodec API and allow more flexible support for audio streaming.

Details of the API can be found here https://github.com/WICG/web-codecs (opens new window)and here https://wicg.github.io/web-codecs/ (opens new window).

If the browser does not support WebCodec API, It will use as fallback the lib ffmpeg.js.

The lib is based on FFMPEG.js which is a port of the native FFMPEG C++ library using [emscripten](https://emscripten.org/).
[More information: https://github.com/mdhsl/ffmpeg.js](https://github.com/mdhsl/ffmpeg.js)

The view is composed of a decoder (either WebCodec API or FFMPEG.js) and one or more audio viewers: equalizer, spectrogram etc.

<br/>
<DocumentationLoad path="/guide/api/AudioView.html"/>

## Supported layers

The view supports type layers:
- data

## Docoders

The view will use the decoder that is supported by the browser, either the one of the WebCodecApi or the one of the Ffmpeg.js lib.
By default, the 'aac' codec is used. 

### WebCodecAPI

The webcodecApi uses HW acceleration. The webcodecApi uses HW acceleration and is still experimental. 
It is necessary to activate the options in chrome as indicated on [https://github.com/WICG/web-codecs](https://github.com/WICG/web-codecs)

### Ffmpeg.js

The decoding is processed frame by frame using the library ffmpeg.js following this principle
[https://ffmpeg.org/doxygen/3.3/decode__audio_8c_source.html](https://ffmpeg.org/doxygen/3.3/decode__audio_8c_source.html).

## Visualizers

The view allows to visualize the audio data in frequency and time. 

One or more visualizers can be added to the audio view. The audio view is responsible for decoding the data and then forwarding the decoded AudioBuffer to all visualizers.
Each will then display the data independently. The audio view does not have an anchor in the DOM, it is the visualizers that must be added on a div of the application.

To do this, we will use the **container** parameter of the constructor.

<DocumentationLoad path="/guide/api/AudioVisualizer.html"/>

There are several audio visualizers provided by default and grouped by type: time, frequency or spectrogram. Each group can have several implementations: chart.js, pure HTML5 canvas, three.js etc.

Here is the list:

Frequency:
- AudioFrequencyCanvasVisualizer
    <DocumentationLoad path="/guide/api/AudioFrequencyCanvasVisualizer.html"/>
  

- AudioFrequencyChartJsVisualizer
  <DocumentationLoad path="/guide/api/AudioFrequencyChartJsVisualizer.html"/>
  
Time:

- AudioTimeCanvasVisualizer
  <DocumentationLoad path="/guide/api/AudioTimeCanvasVisualizer.html"/>
  
- AudioTimeChartJsVisualizer
  <DocumentationLoad path="/guide/api/AudioTimeChartJsVisualizer.html"/>


Spectrogram:

- AudioSpectrogramVisualizer
  <DocumentationLoad path="/guide/api/AudioSpectrogramVisualizer.html"/>


## Example

<<< @/../../showcase/examples/audio/audio.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/audio.html" style="border:none;width:100%;height: 500px" />

