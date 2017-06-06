var gulp = require('gulp-help')(require('gulp'),{hideDepsMessage:true});
var argv = require('yargs').argv;
var clean = require('gulp-clean');
var jshint= require("gulp-jshint");
var uglify = require('gulp-uglify');
var sort = require('gulp-sort');
var order = require('gulp-order');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var noop = require("gulp-noop");
var file = require('gulp-file');
var gap = require('gulp-append-prepend');
var karmaServer = require('karma').Server;
var jsdoc = require('gulp-jsdoc3');
var copydir = require('copy-dir');
var mkdirp = require('mkdirp');

// out directory
var OUT_DIR = "./dist";

// out workers directory
var WORKERS_OUT_DIR = OUT_DIR+"/js/workers";

//--- VENDOR SRC ---//


// CESIUM

var CESIUM_SRC = ["vendor/cesium/Build/Cesium/Cesium.js","vendor/cesium-draw-helper/DrawHelper.js","vendor/cesium-wfst/cesium-wfst.js"];
var CESIUM_SRC_DEBUG = ["vendor/cesium/Build/CesiumUnminified/Cesium.js","vendor/cesium-draw-helper/DrawHelper.js","vendor/cesium-wfst/cesium-wfst.js"];
var CESIUM_CSS = ["vendor/cesium-draw-helper/DrawHelper.css"];
var CESIUM_RESOURCES_DIR = {};
var CESIUM_RESOURCES_FILES = ["vendor/cesium/Build/Cesium/**","!vendor/cesium/Build/Cesium/Cesium.js"];

// END CESIUM

//--- FFMPEG

var FFMPEG_SRC = ["vendor/yuvcanvas/YUVCanvas.js","vendor/ffmpeg/ffmpeg-h264.js"];
var FFMPEG_SRC_DEBUG = FFMPEG_SRC;
var FFMPEG_CSS = [];
var FFMPEG_RESOURCES_DIR = {};
var FFMPEG_RESOURCES_FILES = [];

//--- END FFMPEG

// NVD3

var NVD3_SRC = ["vendor/d3/d3.min.js","vendor/nvd3/build/nv.d3.min.js"];
var NVD3_SRC_DEBUG = ["vendor/d3/d3.js","vendor/nvd3/build/nv.d3.js"];
var NVD3_CSS = ["vendor/nvd3/build/nv.d3.css"];
var NVD3_RESOURCES_DIR = {};
var NVD3_RESOURCES_FILES = [];

//--- END NVD3


// NOUISLIDER

var NOUISLIDER_SRC = ["vendor/nouislider/distribute/nouislider.min.js","vendor/wnumb/wNumb.js"];
var NOUISLIDER_SRC_DEBUG = ["vendor/nouislider/distribute/nouislider.js","vendor/wnumb/wNumb.js"];
var NOUISLIDER_CSS = ["vendor/nouislider/distribute/nouislider.css"];
var NOUISLIDER_RESOURCES_DIR = {};
var NOUISLIDER_RESOURCES_FILES = {};

//--- END NOUISLIDER

// OL3

var OL3_SRC = ["vendor/ol3/ol.js","vendor/ol3-layerswitcher/src/ol3-layerswitcher.js"];
var OL3_SRC_DEBUG = ["vendor/ol3/ol-debug.js","vendor/ol3-layerswitcher/src/ol3-layerswitcher.js"];
var OL3_CSS = ["vendor/ol3/ol.css","vendor/ol3-layerswitcher/src/ol3-layerswitcher.css"];
var OL3_RESOURCES_DIR = {};
var OL3_RESOURCES_FILES = [];

//--- END OL3


// LEAFLET

var LEAFLET_SRC = [
    "vendor/leaflet/dist/leaflet.js", // leaflet core
    "vendor/Leaflet.fullscreen/dist/Leaflet.fullscreen.js", // leaflet fullscreen plugin
    "vendor/Leaflet.draw/dist/leaflet.draw.js" // leaflet draw layer plugin
];
var LEAFLET_SRC_DEBUG = [
    "vendor/leaflet/dist/leaflet-src.js", // leaflet core
    "vendor/Leaflet.fullscreen/dist/Leaflet.fullscreen.js", // leaflet fullscreen plugin
    "vendor/Leaflet.draw/dist/leaflet.draw-src.js" // leaflet draw layer plugin
];

var LEAFLET_CSS = ["vendor/leaflet/dist/leaflet.css","vendor/Leaflet.fullscreen/dist/leaflet.fullscreen.css","vendor/Leaflet.draw/dist/leaflet.draw.css"];
var LEAFLET_RESOURCES_DIR = {
    "./vendor/leaflet/dist/images" : "images",
    "./vendor/Leaflet.draw/dist/images" : "images"
};
var LEAFLET_RESOURCES_FILES = ["vendor/Leaflet.fullscreen/dist/*.png"];

// END LEAFLET

// TREE

var TREE_SRC = ["vendor/tree/tree.js"];
var TREE_SRC_DEBUG = TREE_SRC;
var TREE_CSS = ["vendor/tree/tree.css"];
var TREE_RESOURCES_DIR = {"./vendor/tree/images" : "images"};
var TREE_RESOURCES_FILES = [];

// END TREE

// X2JS

var X2JS_SRC = ["vendor/x2js/x2js.js"];
var X2JS_SRC_DEBUG = X2JS_SRC;
var X2JS_CSS = [];
var X2JS_RESOURCES_DIR = {};
var X2JS_RESOURCES_FILES = [];

// END X2JS


Array.prototype.pushAll=function(array) {
    for(var i=0;i < array.length;i++) {
        this.push(array[i]);
    }
}

var ALL_VENDOR_SRC = [];
var ALL_VENDOR_DEBUG = [];
var ALL_VENDOR_CSS = [];
var ALL_VENDOR_RESOURCES_DIR = [];
var ALL_VENDOR_RESOURCES_FILES = [];
var VENDOR_CSS_EXTRA_PARAMS = "/*EXTRA CSS PARAMS\n*/";
var WORKERS_FILES = [];

if(argv.cesium) {
    ALL_VENDOR_SRC.pushAll(CESIUM_SRC);
    ALL_VENDOR_DEBUG.pushAll(CESIUM_SRC_DEBUG);
    ALL_VENDOR_CSS.pushAll(CESIUM_CSS);
    ALL_VENDOR_RESOURCES_DIR.push(CESIUM_RESOURCES_DIR);
    ALL_VENDOR_RESOURCES_FILES.pushAll(CESIUM_RESOURCES_FILES);
    VENDOR_CSS_EXTRA_PARAMS += '@import "Widgets/widgets.css";';
}

if(argv.ffmpeg) {
    ALL_VENDOR_SRC.pushAll(FFMPEG_SRC);
    ALL_VENDOR_DEBUG.pushAll(FFMPEG_SRC_DEBUG);
    ALL_VENDOR_CSS.pushAll(FFMPEG_CSS);
    ALL_VENDOR_RESOURCES_DIR.push(FFMPEG_RESOURCES_DIR);
    ALL_VENDOR_RESOURCES_FILES.pushAll(FFMPEG_RESOURCES_FILES);
    WORKERS_FILES.pushAll(["./src/osh/ui/view/video/workers/osh-UI-FFMPEGViewWorker.js","vendor/ffmpeg/ffmpeg-h264.js"]);
}

if(argv.nvd3) {
    ALL_VENDOR_SRC.pushAll(NVD3_SRC);
    ALL_VENDOR_DEBUG.pushAll(NVD3_SRC_DEBUG);
    ALL_VENDOR_CSS.pushAll(NVD3_CSS);
    ALL_VENDOR_RESOURCES_DIR.push(NVD3_RESOURCES_DIR);
    ALL_VENDOR_RESOURCES_FILES.pushAll(NVD3_RESOURCES_FILES);
}

if(argv.nouislider) {
    ALL_VENDOR_SRC.pushAll(NOUISLIDER_SRC);
    ALL_VENDOR_DEBUG.pushAll(NOUISLIDER_SRC_DEBUG);
    ALL_VENDOR_CSS.pushAll(NOUISLIDER_CSS);
    ALL_VENDOR_RESOURCES_DIR.push(NOUISLIDER_RESOURCES_DIR);
    ALL_VENDOR_RESOURCES_FILES.pushAll(NOUISLIDER_RESOURCES_FILES);}

if(argv.ol3) {
    ALL_VENDOR_SRC.pushAll(OL3_SRC);
    ALL_VENDOR_DEBUG.pushAll(OL3_SRC_DEBUG);
    ALL_VENDOR_CSS.pushAll(OL3_CSS);
    ALL_VENDOR_RESOURCES_DIR.push(OL3_RESOURCES_DIR);
    ALL_VENDOR_RESOURCES_FILES.pushAll(OL3_RESOURCES_FILES);}
if(argv.leaflet) {
    ALL_VENDOR_SRC.pushAll(LEAFLET_SRC);
    ALL_VENDOR_DEBUG.pushAll(LEAFLET_SRC_DEBUG);
    ALL_VENDOR_CSS.pushAll(LEAFLET_CSS);
    ALL_VENDOR_RESOURCES_DIR.push(LEAFLET_RESOURCES_DIR);
    ALL_VENDOR_RESOURCES_FILES.pushAll(LEAFLET_RESOURCES_FILES);}

if(argv.tree) {
    ALL_VENDOR_SRC.pushAll(TREE_SRC);
    ALL_VENDOR_DEBUG.pushAll(TREE_SRC_DEBUG);
    ALL_VENDOR_CSS.pushAll(TREE_CSS);
    ALL_VENDOR_RESOURCES_DIR.push(TREE_RESOURCES_DIR);
    ALL_VENDOR_RESOURCES_FILES.pushAll(TREE_RESOURCES_FILES);}

if(argv.x2js) {
    ALL_VENDOR_SRC.pushAll(X2JS_SRC);
    ALL_VENDOR_DEBUG.pushAll(X2JS_SRC_DEBUG);
    ALL_VENDOR_CSS.pushAll(X2JS_CSS);
    ALL_VENDOR_RESOURCES_DIR.push(X2JS_RESOURCES_DIR);
    ALL_VENDOR_RESOURCES_FILES.pushAll(X2JS_RESOURCES_FILES);}

//--- END VENDOR SRC ---//

//--- OSH SRC ---//
var OSH_SRC = [];

OSH_SRC.push('./src/osh/osh-BaseClass.js');
OSH_SRC.push('./src/osh/osh-Template.js');
OSH_SRC.push('./src/osh/osh-Browser.js');
OSH_SRC.push('./src/osh/osh-Utils.js');
OSH_SRC.push('./src/osh/osh-Browser.js');
OSH_SRC.push('./src/osh/osh-EventMap.js');
OSH_SRC.push('./src/osh/osh-EventManager.js');
OSH_SRC.push('./src/osh/osh-Buffer.js');
OSH_SRC.push('./src/osh/dataconnector/osh-DataConnector.js');
OSH_SRC.push('./src/osh/dataconnector/osh-DataConnector-HttpAjaxConnector.js');
OSH_SRC.push('./src/osh/dataconnector/osh-DataConnector-Websocket.js');
OSH_SRC.push('./src/osh/datareceiver/osh-DataReceiver-DataSource.js');
OSH_SRC.push('./src/osh/datareceiver/osh-DataReceiver-DataSourceEulerOrientation.js');
OSH_SRC.push('./src/osh/datareceiver/osh-DataReceiver-DataSourceLatLonAlt.js');
OSH_SRC.push('./src/osh/datareceiver/osh-DataReceiver-DataSourceNexrad.js');
OSH_SRC.push('./src/osh/datareceiver/osh-DataReceiver-DataSourceUAHWeather.js');
OSH_SRC.push('./src/osh/datareceiver/osh-DataReceiver-DataSourceOrientationQuaternion.js');
OSH_SRC.push('./src/osh/datareceiver/osh-DataReceiver-DataSourceVideoH264.js');
OSH_SRC.push('./src/osh/datareceiver/osh-DataReceiver-DataSourceVideoMjpeg.js');
OSH_SRC.push('./src/osh/datareceiver/osh-DataReceiver-DataSourceVideoMp4.js');
OSH_SRC.push('./src/osh/datareceiver/osh-DataReceiver-DataSourceJSON.js');
OSH_SRC.push('./src/osh/datareceiver/osh-DataReceiver-DataSourceChart.js');
OSH_SRC.push('./src/osh/datareceiver/osh-DataReceiverController.js');
OSH_SRC.push('./src/osh/datasender/osh-DataSender-DataSink.js');
OSH_SRC.push('./src/osh/datasender/osh-DataSender-PtzTasking.js');
OSH_SRC.push('./src/osh/datasender/osh-DataSender-FoscamPtzTasking.js');
OSH_SRC.push('./src/osh/datasender/osh-DataSender-UavMapTasking.js');
OSH_SRC.push('./src/osh/datasender/osh-DataSenderController.js');
OSH_SRC.push('./src/osh/discovery/osh-Sensor.js');
OSH_SRC.push('./src/osh/discovery/osh-Server.js');
OSH_SRC.push('./src/osh/log/osh-Log.js');
OSH_SRC.push('./src/osh/ui/view/osh-UI-View.js');
OSH_SRC.push('./src/osh/ui/contextmenu/osh-UI-ContextMenu.js');
OSH_SRC.push('./src/osh/ui/contextmenu/osh-UI-ContextMenu-CssMenu.js');
OSH_SRC.push('./src/osh/ui/contextmenu/osh-UI-ContextMenu-CircularMenu.js');
OSH_SRC.push('./src/osh/ui/contextmenu/osh-UI-ContextMenu-StackMenu.js');
OSH_SRC.push('./src/osh/ui/styler/osh-UI-Styler.js');
OSH_SRC.push('./src/osh/ui/styler/osh-UI-StylerImageDraping.js');
OSH_SRC.push('./src/osh/ui/styler/osh-UI-StylerCurve.js');

if(argv.cesium) {
    OSH_SRC.push('./src/osh/ui/styler/osh-UI-StylerNexrad.js');
}
OSH_SRC.push('./src/osh/ui/styler/osh-UI-StylerPolyline.js');
OSH_SRC.push('./src/osh/ui/styler/osh-UI-StylerPointMarker.js');
if(argv.nvd3) {
    OSH_SRC.push('./src/osh/ui/view/chart/osh-UI-Nvd3CurveChartView.js');
}
OSH_SRC.push('./src/osh/ui/view/discovery/osh-UI-DiscoveryView.js');
if(argv.tree) {
    OSH_SRC.push('./src/osh/ui/view/entity/osh-UI-EntityTreeView.js');
}
if(argv.cesium) {
    OSH_SRC.push('./src/osh/ui/view/map/osh-UI-CesiumView.js');
}
if(argv.leaflet) {
    OSH_SRC.push('./src/osh/ui/view/map/osh-UI-LeafletView.js');
}
if(argv.ol3) {
    OSH_SRC.push('./src/osh/ui/view/map/osh-UI-OpenLayerView.js');
}
OSH_SRC.push('./src/osh/ui/view/dialog/osh-UI-DialogView.js');
OSH_SRC.push('./src/osh/ui/view/dialog/osh-UI-MultiDialogView.js');
OSH_SRC.push('./src/osh/ui/view/osh-UI-Loading.js');
if(argv.nouislider) {
    OSH_SRC.push('./src/osh/ui/view/osh-UI-RangeSlider.js');
}
OSH_SRC.push('./src/osh/ui/view/tasking/osh-UI-PtzTaskingView.js');
if(argv.ffmpeg) {
    OSH_SRC.push('./src/osh/ui/view/video/osh-UI-FFMPEGView.js');
}
if(argv.broadway) {
    OSH_SRC.push('./src/osh/ui/view/video/osh-UI-H264View.js');
}
OSH_SRC.push('./src/osh/ui/view/video/osh-UI-MjpegView.js');
OSH_SRC.push('./src/osh/ui/view/video/osh-UI-Mp4View.js');

//--- END OSH SRC ---//

var OSH_CSS = ["src/css/*.css"];
var OSH_RESOURCES_DIR = {
        "./src/css/font-awesome-4.6.3/" : "css/font-awesome-4.6.3/",
        "./src/images/" : "images"
};

var OSH_RESOURCES_FILES = [];

gulp.task('build','build a distributable osh-js instance',['debug','minify'],function () {
    // ...
}, {
    options: {
        'ffmpeg': 'Include FFMPEG library. This library provides FFmpeg builds ported to JavaScript using Emscripten project. ' +
        'Builds are optimized for in-browser use: minimal size for faster loading, asm.js, performance tunings, etc. This is a fork ' +
        'from Kagami/ffmpeg.js: https://github.com/sensiasoft/ffmpeg.js\n',
        'nvd3': 'Include NVD3 library: http://nvd3.org/\n',
        'x2js': 'Include x2js library. It is useful to use discovery and server services\n',
        'cesium':'An open-source JavaScript library for world-class 3D globes and maps: https://cesiumjs.org/\n',
        'leaflet':'An open-source JavaScript library for mobile-friendly interactive maps: http://leafletjs.com/\n',
        'ol3':'OpenLayer 3 makes it easy to put a dynamic map in any web page. It can display map tiles, ' +
        'vector data and markers loaded from any source: https://openlayers.org/\n',
        'nouislider': 'This library is responsible for displaying the RangeSlider bar.It is lightweight JavaScript range slider, ' +
        'originally developed to be a jQuery UI alternative: https://github.com/leongersen/noUiSlider\n',
        'tree': 'This library is responsible for displaying the Entity Tree View. It is a pure Javascript TreeView Component: https://github.com/rafaelthca/aimaraJS\n'
    }
});


//-------------------------------------------------------
//-------------------------------------------------------
//------------------- INIT ---------------------//
// META TASK
gulp.task('init', false,["init-vendor-css-file","init-vendor-css-min-file"]);

gulp.task('init-vendor-css-file', false,function () {
    return file('vendor-debug.css', '/*Concataned css file*/', { src: true })
        .pipe(gulp.dest(OUT_DIR+'/vendor/'));

});

gulp.task('init-vendor-css-min-file', false,function () {
    return file('vendor.min.css', '/*Concataned css file*/', { src: true })
        .pipe(gulp.dest(OUT_DIR+'/vendor/'));
});

//-------------------------------------------------------
//-------------------------------------------------------
//------------------- NORMAL ---------------------//
// META TASK
gulp.task('debug', false,["debug-osh-js","debug-osh-css","debug-vendor-js","debug-vendor-css","copy-osh-resources","copy-vendor-resources","copy-workers"]);

gulp.task('debug-osh-js', false,function() {
    return gulp.src(OSH_SRC)
        .pipe(concat('osh-debug.js'))
        .pipe(gulp.dest(OUT_DIR+"/js"));
});

gulp.task('debug-osh-css', false,function() {
    return gulp.src(OSH_CSS)
        .pipe(concat('osh-debug.css'))
        .pipe(gulp.dest(OUT_DIR+"/css"));
});

gulp.task('debug-vendor-js', false,function() {
    // makes all in one file
    return gulp.src(ALL_VENDOR_DEBUG)
            .pipe(concat('vendor-debug.js'))
            .pipe(gulp.dest(OUT_DIR+"/vendor/"));
});

gulp.task('debug-vendor-css', false,["init-vendor-css-file"],function() {
    // makes all in one file
    return gulp.src(OUT_DIR+"/vendor/vendor-debug.css")
        .pipe(gap.prependText(VENDOR_CSS_EXTRA_PARAMS))
        .pipe(gap.appendFile(ALL_VENDOR_CSS))
        .pipe(gulp.dest(OUT_DIR+"/vendor/"));
});

//-------------------------------------------------------
//-------------------------------------------------------
//------------------- MINIFIED ---------------------//
// META TASK
gulp.task('minify', false,["minify-osh-js","minify-osh-css","minify-vendor-js","minify-vendor-css","copy-osh-resources","copy-vendor-resources","copy-workers"]);

gulp.task('minify-osh-js', false,function() {
    return gulp.src(OSH_SRC)
        .pipe(uglify({mangle:false}))
        .pipe(concat('osh.min.js'))
        .pipe(gulp.dest(OUT_DIR+"/js"));
});

gulp.task('minify-osh-css', false,function() {
    return gulp.src(OSH_CSS)
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(concat('osh.min.css'))
        .pipe(gulp.dest(OUT_DIR+"/css"));
});

gulp.task('minify-vendor-js', false,function() {
    // makes all in one file
    return gulp.src(ALL_VENDOR_SRC)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(OUT_DIR+"/vendor/"));
});

gulp.task('minify-vendor-css', false,["init-vendor-css-min-file"],function() {
    // makes all in one file
    return gulp.src(OUT_DIR+"/vendor/vendor.min.css")
        .pipe(gap.appendFile(ALL_VENDOR_CSS))
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(gap.prependText(VENDOR_CSS_EXTRA_PARAMS))
        .pipe(gulp.dest(OUT_DIR+"/vendor/"));
});

//-------------------------------------------------------
//-------------------------------------------------------
//------------------- COMMON ---------------------//
gulp.task('copy-osh-resources', false,function() {
    for(var key in OSH_RESOURCES_DIR) {
        copydir.sync(key,OUT_DIR+"/"+OSH_RESOURCES_DIR[key]);
    }

    return gulp.src(OSH_RESOURCES_FILES)
          .pipe(gulp.dest(OUT_DIR));
});

gulp.task('copy-vendor-resources', false,function() {
    for(var currentVendorIdx = 0;currentVendorIdx < ALL_VENDOR_RESOURCES_DIR.length;currentVendorIdx++) {
        var currentVendor = ALL_VENDOR_RESOURCES_DIR[currentVendorIdx];
        for(var key in currentVendor) {
            var dir = OUT_DIR + "/vendor/" + currentVendor[key];
            mkdirp.sync(dir, function (err) {
                if (err){
                    console.error("Cannot create directory structure: "+dir);
                }
            });
            copydir.sync(key, OUT_DIR + "/vendor/" + currentVendor[key]);
        }
    }

    return gulp.src(ALL_VENDOR_RESOURCES_FILES)
        .pipe(gulp.dest(OUT_DIR+"/vendor"));
});

gulp.task('copy-workers', false,function() {
    return gulp.src(WORKERS_FILES)
        .pipe(gulp.dest(WORKERS_OUT_DIR));
});

//-------------------------------------------------------
//-------------------------------------------------------
//------------------- OTHERS ---------------------//
//clean
/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('doc', "Generate JSDoc",function (cb) {
    var config = require('./conf.json');
    gulp.src(['README.md', './src/**/*.js'], {read: false})
        .pipe(jsdoc(config, cb));
});

gulp.task('clean', "Clean the dist directory",function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean({force:true}));
});
