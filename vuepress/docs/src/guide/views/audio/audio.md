# Audio

The Audio view allows you to display audio-type data.
New APIs are being released such as the WebCodec API and allow more flexible support for audio streaming.

Details of the API can be found here https://github.com/WICG/web-codecs (opens new window)and here https://wicg.github.io/web-codecs/ (opens new window).

If the browser does not support WebCodec API, It will use as fallback the lib ffmpeg.js.

The lib is based on FFMPEG.js which is a port of the native FFMPEG C++ library using [emscripten](https://emscripten.org/).
[More information: https://github.com/mdhsl/ffmpeg.js](https://github.com/mdhsl/ffmpeg.js)

<br/>
<DocumentationLoad path="/guide/api/AudioView.html"/>

## Supported layers

The view supports type layers:
- data

## Decoding

The view will use the decoder that is supported by the browser, either the one of the WebCodecApi or the one of the Ffmpeg.js lib.
By default, the 'aac' codec is used. 

### WebCodecAPI

The webcodecApi uses HW acceleration. The webcodecApi uses HW acceleration and is still experimental. 
It is necessary to activate the options in chrome as indicated on [https://github.com/WICG/web-codecs](https://github.com/WICG/web-codecs)

### Ffmpeg.js

The decoding is processed frame by frame using the library ffmpeg.js following this principle
[https://ffmpeg.org/doxygen/3.3/decode__audio_8c_source.html](https://ffmpeg.org/doxygen/3.3/decode__audio_8c_source.html).

## Time & Frequency domain visualization

The view allows to visualize the audio data in frequency and time. The two options timeDomainVisualization and
frequencyDomainVisualization allow to define which visualization should be created.
The view will create and use the nodes of the WebAudioApi to make the necessary transformations using an
AnalyzerNode [https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode).

The parameter `fftSize` is passed to the analyzer to be used to determine the frequency domain.

By default, two types of visualization are possible. One is based on the `chart.js` library and the other based on a pure HTML5 canvas.

## Chart.js properties configuration

This View is highly configurable. Chart.js is built using a property object. This object can be directly passed, in part or in full,
depending on what you want to configure, to the ChartView which will in turn forward it to the Deck object.

The ***chartjsProps*** allows to modify the native chart.js properties by passing a global chart
[configuration object](https://www.chartjs.org/docs/dev/configuration) into the ***chartProps***
or/and a ***datasetsProps*** to modify the native [datasets properties](https://www.chartjs.org/docs/dev/charts/line.html#dataset-properties).

Then a deep merge is processed and passed as a properties object of the Chart.js object.
When you pass one of these options to the ChartView, the properties will be merged with the defaults.

The default ***chartProps*** are:

for time:

<<< @/../../source/core/ui/view/audio/chart/AudioTimeDomainChartJs.js#snippet_audiochartjsview_default_chartprops

for frequency:

<<< @/../../source/core/ui/view/audio/chart/AudioFrequencyDomainChartJs.js#snippet_audiochartjsview_default_chartprops

## Example

<<< @/../../showcase/examples/audio/audio.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/audio.html" style="border:none;width:100%;height: 500px" />

