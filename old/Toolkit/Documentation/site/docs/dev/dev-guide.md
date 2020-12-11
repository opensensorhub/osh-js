Developer's Guide
===

This guide is meant to help you setup a development environment so that you can extend OpenSensorHub (OSH for short) 
with your own datasources, views or modules.

Don't forget to send us a Pull Request if you want to contribute to this project with your work. Other users may be interested in your modules and bug fixes!

Of course, contributing new modules to the community is optional as our license does not prevent proprietary and commercial derived work. However, keep in mind that **if you modify the source files we provide, you must make it available publicly in source form**. 

This page provides instructions for three possible options, depending on your level of involvement:

  * [Exploring the code online](#exploring-the-code)

  * [Getting the code](#getting-the-code) using Git
  
  * [Build using NPM, bower and Gulp](#npm-bower-gulp)

  * [Contributing](#contributing) new features and bug fixes to the project
  
### Exploring the Code

If you just want to explore the code, you can browse the source online directly on 
[Github OSH Toolkit](https://github.com/opensensorhub/osh-js). Alternatively, you can download it to your computer using the **Download ZIP** link on each GitHub repository or using the `git` program (see next section).
It is part of the global [OSH](https://github.com/opensensorhub) project.

### Getting the code

The `git` command is used to download the code from the Github repositories. For example, you can download the code for the core modules using the following command:

```bash
$ git clone --recursive https://github.com/opensensorhub/osh-js.git
```

### Technologies & frameworks

The Toolkit is pure Javascript and uses CSS3 for styling. Some external extra libraries add extra functionnalities:
  
  * Cesium: pure js 3D globe
  
  * x2js: convert XML into JSON
  
  * nouislider: time slider bar
  
  * NVD3: re-usable chart for d3.js
  
  * OpenLayer
  
  * Leaflet
  
  * Custom javascript tree
  
  * Ffmpeg: portage of the Ffmpeg C++ library into JS (emscripten) to decode H264 frames
  
 
### Building from Source

#### Pre-requisites

The building uses NPM, Bower and Gulp. Be sure you have installed them before continuing.

 * NPM: This is a package manager for Javascript [Get NPM](https://www.npmjs.com/get-npm)
 
 * Bower: A package manager for the web [Get Bower](https://bower.io/#install-bower) 
 
 * Gulp: It's a build system allowing to automate tasks [Get Gulp](http://gulpjs.com/)
 
 * JsDoc: Tool to build documentation [Get JsDoc](http://usejsdoc.org/)
 
#### Build

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

As described in the gulp help command, you can also include some libraries:

``Toolkit $ gulp build --ffmpeg --leaflet``

A dist directory will be created containing the new files, for this example:

```bash
dist/
├── css
│   ├── font-awesome-4.6.3
.   .
.   .    ...
│   ├── osh-debug.css
│   └── osh.min.css
├── images
.   .
.   .   ...
├── js
│   ├── osh-debug.js
│   ├── osh.min.js
│   └── workers
│       ├── ffmpeg-h264.js
│       └── osh-UI-FFMPEGViewWorker.js
└── vendor
    ├── fullscreen@2x.png
    ├── fullscreen.png
    ├── images
    │   ├── layers-2x.png
    │   ├── layers.png
    │   ├── marker-icon-2x.png
    │   ├── marker-icon.png
    │   ├── marker-shadow.png
    │   ├── spritesheet-2x.png
    │   ├── spritesheet.png
    │   └── spritesheet.svg
    ├── vendor-debug.css
    ├── vendor-debug.js
    ├── vendor.min.css
    └── vendor.min.js
```

The result is a set of files that you can load to use the Toolkit. An *osh-debug* and *osh.min" files are produced to get a minified or debug version of the toolkit as well as the 
stylesheet files.
ALl the vendor files are produced into the *dist/vendor* directory. Like the *osh* files, there are a debug and minified version. All the directories located into the vendor folder 
are relative to the javascript/stylesheet files. Keep this structure as it is produced to get a working version of the vendor file.

The *js* directory contains:

- osh-debug.js: the debug version of the Toolkit
- osh.min.js: the minified version of the Toolkit
- workers directory: the workers directory. To use workers, you have to set the workers directory structure as: "BASE_PROJECT_ROOT"/js/workers. Otherwise the workers could not be used. 

