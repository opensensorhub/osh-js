var gulp = require('gulp-help')(require('gulp'),{hideDepsMessage:true});
var argv = require('yargs').argv;
var clean = require('gulp-clean');
var merge = require('merge-stream');
var jshint= require("gulp-jshint");
var uglify = require('gulp-uglify');
var sort = require('gulp-sort');
var order = require('gulp-order');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

gulp.task('build','build a distributable osh-js instance',['clean'],function () {
    // ...
    if(argv.minify) {
        gulp.start("minify");
    } else {
        gulp.start("normal");
    }


}, {
    options: {
        'minify': 'Minified the libraries. All the dependencies vendor librairies are included in a all-in-one file\n',
        'ffmpeg': 'Include FFMPEG library. This library provides FFmpeg builds ported to JavaScript using Emscripten project. ' +
        'Builds are optimized for in-browser use: minimal size for faster loading, asm.js, performance tunings, etc. This is a fork ' +
        'from Kagami/ffmpeg.js: https://github.com/sensiasoft/ffmpeg.js\n',
        'nvd3': 'Include NVD3 library: http://nvd3.org/\n',
        'broadway': 'Include broadway JS library. Broadway JS is a JavaScript H.264 decoder: https://github.com/mbebenita/Broadway\n',
        'jsonix': 'Include jsonix library. sonix (JSON interfaces for XML) is a JavaScript library ' +
        'which allows you to convert between XML and JSON structures: ' +
        ' https://github.com/highsource/jsonix\n',
        'cesium':'An open-source JavaScript library for world-class 3D globes and maps: https://cesiumjs.org/\n',
        'leaflet':'An open-source JavaScript library for mobile-friendly interactive maps: http://leafletjs.com/\n',
        'ol3':'OpenLayer 3 makes it easy to put a dynamic map in any web page. It can display map tiles, ' +
        'vector data and markers loaded from any source: https://openlayers.org/\n',
        'nouislider': 'This library is responsible for displaying the RangeSlider bar.It is lightweight JavaScript range slider, ' +
        'originally developed to be a jQuery UI alternative: https://github.com/leongersen/noUiSlider\n',
        'tree': 'This library is responsible for displaying the Entity Tree View. It is a pure Javascript TreeView Component: https://github.com/rafaelthca/aimaraJS\n'
    }
});

gulp.task('minify', false, ['images'],function(){
    var jsSources = new Array();
    var cssSources = new Array();

    if(argv.ffmpeg) {
        jsSources.push('vendor-local/ffmpeg/ffmpeg-h264.js');
        jsSources.push('vendor-local/ffmpeg/YUVCanvas.js');
    }
    if(argv.nvd3) {
        jsSources.push('vendor/nvd3/build/nv.d3.min.js');
        cssSources.push('vendor/nvd3/build/nv.d3.min.css');
    }

    if(argv.d3) {
        jsSources.push('vendor/d3/d3.min.js');
    }

    if(argv.broadway) {
        jsSources.push('vendor-local/broadway/broadway-all.min.js');
        jsSources.push('vendor-local/broadway/YUVCanvas.js');
        jsSources.push('vendor-local/broadway/Decoder.js');
        jsSources.push('vendor-local/broadway/Player.js');
    }

    if(argv.nouislider) {
        jsSources.push('vendor/nouislider/distribute/nouislider.min.js');
        cssSources.push('vendor/nouislider/distribute/nouislider.min.css');
    }

    if(argv.cesium) {
        jsSources.push('vendor/cesium.js/dist/Cesium.js');
        // copy cesium resources
        gulp.src(['vendor/cesium.js/dist/**','!vendor/cesium.js/dist/Cesium.js'])
            .pipe(gulp.dest('dist/'));
    }
    if(argv.ol3) {
        jsSources.push('vendor/ol3/ol.js');
        cssSources.push('vendor/ol3/ol.css');
    }
    if(argv.leaflet) {
        jsSources.push('vendor/leaflet/dist/leaflet.js');
        cssSources.push('vendor/leaflet/dist/leaflet.css');

        jsSources.push('vendor/Leaflet.fullscreen/dist/Leaflet.fullscreen.min.js');
        cssSources.push('vendor/Leaflet.fullscreen/dist/Leaflet.fullscreen.css');
        // copy leaflet resources
        gulp.src('vendor/leaflet/dist/images/*').pipe(gulp.dest('dist/images'));
        gulp.src('vendor/Leaflet.fullscreen/dist/*.png').pipe(gulp.dest('dist/'));
    }
    if(argv.tree) {
        jsSources.push('vendor-local/tree/tree.js');
        cssSources.push('vendor-local/tree/tree.css');
        // copy tree resources
        gulp.src('vendor-local/tree/images/*').pipe(gulp.dest('dist/images'));
    }
    if(argv.jsonix) {
        jsSources.push('vendor/jsonix/dist/*.js');
        cssSources.push('vendor/jsonix/dist/*.css');
    }

    var vendorJsSrc = gulp.src(jsSources)
        .pipe(concat('vendor.min.js'));

    var oshJsSrc = gulp.src('src/osh/**/*.js')
        .pipe(jshint())
        //.pipe(jshint.reporter('default')) //display error on stdout
        .pipe(order([
            'osh-BaseClass.js',
            'osh-Template.js',
            'osh-Utils.js',
            'osh-Browser.js',
            'osh-DomEvent.js',
            'osh-EventManager.js',
            'osh-Buffer.js',
            'dataconnector/osh-DataConnector.js',
            'dataconnector/osh-DataConnector-HttpAjaxConnector.js',
            'dataconnector/osh-DataConnector-Websocket.js',
            'datareceiver/osh-DataReceiver-DataSource.js',
            'datareceiver/osh-DataReceiver-DataSourceEulerOrientation.js',
            'datareceiver/osh-DataReceiver-DataSourceLatLonAlt.js',
            'datareceiver/osh-DataReceiver-DataSourceNexrad.js',
            'datareceiver/osh-DataReceiver-DataSourceOrientationQuaternion.js',
            'datareceiver/osh-DataReceiver-DataSourceVideoH264.js',
            'datareceiver/osh-DataReceiver-DataSourceVideoMjpeg.js',
            'datareceiver/osh-DataReceiver-DataSourceVideoMp4.js',
            'datareceiver/osh-DataReceiver-DataSourceChart.js',
            'datareceiver/osh-DataReceiverController.js',
            'datasender/osh-DataSender-DataSink.js',
            'datasender/osh-DataSender-PtzTasking.js',
            'datasender/osh-DataSender-UavMapTasking.js',
            'datasender/osh-DataSenderController.js',
            'discovery/osh-Sensor.js',
            'discovery/osh-Server.js',
            'log/osh-Log.js',
            'ui/osh-UI-View.js',
            'ui/contextmenu/osh-UI-ContextMenu.js',
            'ui/contextmenu/osh-UI-ContextMenu-CssMenu.js',
            'ui/contextmenu/osh-UI-ContextMenu-CircularMenu.js',
            'ui/contextmenu/osh-UI-ContextMenu-StackMenu.js',
            'ui/styler/osh-UI-Styler.js',
            'ui/styler/osh-UI-StylerImageDraping.js',
            'ui/styler/osh-UI-StylerCurve.js',
            'ui/styler/osh-UI-StylerNexrad.js',
            'ui/styler/osh-UI-StylerPolyline.js',
            'ui/styler/osh-UI-StylerPointMarker.js',
            'ui/view/chart/osh-UI-Nvd3CurveChartView.js',
            'ui/view/discovery/osh-UI-DiscoveryView.js',
            'ui/view/entity/osh-UI-EntityTreeView.js',
            'ui/view/map/osh-UI-CesiumView.js',
            'ui/view/map/osh-UI-LeafletView.js',
            'ui/view/map/osh-UI-OpenLayerView.js',
            'ui/view/osh-UI-DialogView.js',
            'ui/view/osh-UI-Loading.js',
            'ui/view/osh-UI-RangeSlider.js',
            'ui/view/tasking/osh-UI-PtzTaskingView.js',
            'ui/view/video/osh-UI-FFMPEGView.js',
            'ui/view/video/osh-UI-H264View.js',
            'ui/view/video/osh-UI-MjpegView.js',
            'ui/view/video/osh-UI-Mp4View.js',
        ], { base: './src/osh' }))
        .pipe(concat('osh-src.min.js'))
        .pipe(uglify({mangle:false}));

    var vendorCss = gulp.src(cssSources)
        .pipe(concat('vendor.min.css'));

    var oshCss = gulp.src('src/css/*.css')
        .pipe(concat('osh.min.css'))
        .pipe(cleanCSS({compatibility: '*'}));

    // merge js files
    merge(vendorJsSrc, oshJsSrc)
        .pipe(concat('osh-all.min.js'))
        .pipe(gulp.dest('dist'));

    // merge css files
    merge(vendorCss, oshCss)
        .pipe(concat('osh-all.min.css'))
        .pipe(gulp.dest('dist'));
});

//----------- NORMAL ------------------//

gulp.task('normal', false, ['css', 'images'],function() {
    // Vendor part
    if(argv.ffmpeg) {
        gulp.src([ 'vendor-local/ffmpeg/**/*'])
            .pipe(gulp.dest('dist/vendor-local/ffmpeg'));
    }
    if(argv.nvd3) {
        gulp.src([ 'vendor/nvd3/build/**/*'])
            .pipe(gulp.dest('dist/vendor/nvd3'));
    }

    if(argv.d3) {
        gulp.src([ 'vendor/d3/**/*'])
            .pipe(gulp.dest('dist/vendor/d3'));
    }

    if(argv.broadway) {
        gulp.src([ 'vendor-local/ffmpeg/**/*'])
            .pipe(gulp.dest('dist/vendor-local/ffmpeg'));
    }

    if(argv.nouislider) {
        gulp.src([ 'vendor/nouislider/distribute/**/*'])
            .pipe(gulp.dest('dist/vendor/nouislider'));
    }

    if(argv.cesium) {
        gulp.src([ 'vendor/cesium.js/dist/**/*'])
            .pipe(gulp.dest('dist/vendor/cesium.js'));
    }
    if(argv.ol3) {
        gulp.src([ 'vendor/ol3/**/*'])
            .pipe(gulp.dest('dist/vendor/ol3'));
    }
    if(argv.leaflet) {
        gulp.src([ 'vendor/leaflet/dist/**/*'])
            .pipe(gulp.dest('dist/vendor/leaflet'));
        gulp.src([ 'vendor/Leaflet.fullscreen/dist/**'])
            .pipe(gulp.dest('dist/vendor/Leaflet.fullscreen'));
    }
    if(argv.tree) {
        gulp.src([ 'vendor-local/tree/**/*'])
            .pipe(gulp.dest('dist/vendor-local/tree'));
    }
    if(argv.jsonix) {
        gulp.src([ 'vendor/ogc-schemas/scripts/lib/*'])
            .pipe(gulp.dest('dist/vendor/ogc-schemas'));
    }

    // OSH Part
    gulp.src('src/**/*.js')
        .pipe(sort())
        .pipe(jshint())
        //.pipe(plugins.jshint.reporter('default'))
        .pipe(order([
            'osh-BaseClass.js',
            'osh-Template.js',
            'osh-Utils.js',
            'osh-Browser.js',
            'osh-DomEvent.js',
            'osh-EventManager.js',
            'osh-Buffer.js',
            'dataconnector/osh-DataConnector.js',
            'dataconnector/osh-DataConnector-HttpAjaxConnector.js',
            'dataconnector/osh-DataConnector-Websocket.js',
            'datareceiver/osh-DataReceiver-DataSource.js',
            'datareceiver/osh-DataReceiver-DataSourceEulerOrientation.js',
            'datareceiver/osh-DataReceiver-DataSourceLatLonAlt.js',
            'datareceiver/osh-DataReceiver-DataSourceNexrad.js',
            'datareceiver/osh-DataReceiver-DataSourceOrientationQuaternion.js',
            'datareceiver/osh-DataReceiver-DataSourceVideoH264.js',
            'datareceiver/osh-DataReceiver-DataSourceVideoMjpeg.js',
            'datareceiver/osh-DataReceiver-DataSourceVideoMp4.js',
            'datareceiver/osh-DataReceiver-DataSourceChart.js',
            'datareceiver/osh-DataReceiverController.js',
            'datasender/osh-DataSender-DataSink.js',
            'datasender/osh-DataSender-PtzTasking.js',
            'datasender/osh-DataSender-UavMapTasking.js',
            'datasender/osh-DataSenderController.js',
            'discovery/osh-Sensor.js',
            'discovery/osh-Server.js',
            'log/osh-Log.js',
            'ui/osh-UI-View.js',
            'ui/contextmenu/osh-UI-ContextMenu.js',
            'ui/contextmenu/osh-UI-ContextMenu-CssMenu.js',
            'ui/contextmenu/osh-UI-ContextMenu-CircularMenu.js',
            'ui/contextmenu/osh-UI-ContextMenu-StackMenu.js',
            'ui/styler/osh-UI-Styler.js',
            'ui/styler/osh-UI-StylerImageDraping.js',
            'ui/styler/osh-UI-StylerCurve.js',
            'ui/styler/osh-UI-StylerNexrad.js',
            'ui/styler/osh-UI-StylerPolyline.js',
            'ui/styler/osh-UI-StylerPointMarker.js',
            'ui/view/chart/osh-UI-Nvd3CurveChartView.js',
            'ui/view/discovery/osh-UI-DiscoveryView.js',
            'ui/view/entity/osh-UI-EntityTreeView.js',
            'ui/view/map/osh-UI-CesiumView.js',
            'ui/view/map/osh-UI-LeafletView.js',
            'ui/view/map/osh-UI-OpenLayerView.js',
            'ui/view/osh-UI-DialogView.js',
            'ui/view/osh-UI-Loading.js',
            'ui/view/osh-UI-RangeSlider.js',
            'ui/view/tasking/osh-UI-PtzTaskingView.js',
            'ui/view/video/osh-UI-FFMPEGView.js',
            'ui/view/video/osh-UI-H264View.js',
            'ui/view/video/osh-UI-MjpegView.js',
            'ui/view/video/osh-UI-Mp4View.js',
        ], { base: './src/osh' }))
        .pipe(concat('osh.js'))
        .pipe(gulp.dest('dist/js'));
});

//------- CSS -------------//
gulp.task('css',false, ["css-normal","copy-fonts"]);
gulp.task('css-min',false, ["css-minify","copy-fonts"]);

gulp.task('css-normal',false, function () {
    return gulp.src('src/css/*.css')
        .pipe(concat('osh.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('css-minify',false, function() {
    return gulp.src('src/css/*.css')
        .pipe(concat('osh.min.css'))
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-fonts',false, function () {
    return gulp.src('src/css/font-awesome-4.6.3/**/*')
        .pipe(gulp.dest('dist/css/font-awesome-4.6.3'));
});

//--------- IMAGES -----------//
gulp.task('images', false,function () {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'));
});

//------- TOOLS -------//
//clean
gulp.task('clean', "Clean the dist directory",function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean({force:true}));
});