Install plugins dependencies using NPM:
``Toolkit $ npm install ``

Install vendor dependencies using bower:
``Toolkit $ bower install ``

Display Gulp help:
```
Tookit $ gulp help
Usage
  gulp [TASK] [OPTIONS...]

Available tasks
  build           build a distributable osh-js instance 
   --broadway     Include broadway JS library. Broadway JS is a JavaScript H.264 decoder: https://github.com/mbebenita/Broadway
 
   --cesium       An open-source JavaScript library for world-class 3D globes and maps: https://cesiumjs.org/
 
   --ffmpeg       Include FFMPEG library. This library provides FFmpeg builds ported to JavaScript using Emscripten project. Builds are optimized for in-browser use: minimal size for 
faster loading, asm.js, performance tunings, etc. This is a fork from Kagami/ffmpeg.js: https://github.com/sensiasoft/ffmpeg.js
 
   --x2js       Include x2js library. This is used to map XML data into JSON object
 
   --leaflet      An open-source JavaScript library for mobile-friendly interactive maps: http://leafletjs.com/
 
   --nouislider   This library is responsible for displaying the RangeSlider bar.It is lightweight JavaScript range slider, originally developed to be a jQuery UI alternative: 
https://github.com/leongersen/noUiSlider
 
   --nvd3         Include NVD3 library: http://nvd3.org/
 
   --ol3          OpenLayer 3 makes it easy to put a dynamic map in any web page. It can display map tiles, vector data and markers loaded from any source: https://openlayers.org/
 
   --tree         This library is responsible for displaying the Entity Tree View. It is a pure Javascript TreeView Component: https://github.com/rafaelthca/aimaraJS

  clean           Clean the dist directory
  help            Display this help text.
```

Build a full version using gulp:
``Toolkit $ gulp build ``
or
``Toolkit $ gulp build --minify``

As described in the gulp help command, you can also include some libraries:

``Toolkit $ gulp build --ffmpeg --leaflet --cesium``

and get a minified version using --minify argument
``Toolkit $ gulp build --minify --ffmpeg --leaflet --cesium``

A dist directory will be created containing the new files.

