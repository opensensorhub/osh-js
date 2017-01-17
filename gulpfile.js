var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
var jshint= require("gulp-jshint");
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var sort = require('gulp-sort');
var order = require('gulp-order');
var gulpSrcOrdered = require('gulp-src-ordered-globs');

gulp.task('build', ['css', "js-normal", 'images',"copy-vendor"]);
gulp.task('build-minify', ['css-min',"js-minify", 'images',"copy-vendor"]);


//--------- JS -------------//
gulp.task('js-normal', function () {
    return gulp.src('Toolkit/src/**/*.js')
        .pipe(sort())
        .pipe(plugins.jshint())
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
        ], { base: './Toolkit/src/osh' }))
        .pipe(plugins.concat('osh.js'))
        .pipe(gulp.dest('Toolkit/dist/js'));
});

gulp.task('js-minify', function() {
    gulp.src('Toolkit/src/osh/**/*.js')
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
    ], { base: './Toolkit/src/osh' }))
    .pipe(plugins.concat('osh.min.js'))
   /* .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))*/
   .pipe(uglify({mangle:false}))
    .pipe(gulp.dest('Toolkit/dist/js'))
});

//------- CSS -------------//
gulp.task('css', ["css-normal","copy-fonts"]);
gulp.task('css-min', ["css-minify","copy-fonts"]);

gulp.task('css-normal', function () {
    return gulp.src('Toolkit/src/css/*.css')
        .pipe(plugins.concat('osh.css'))
        .pipe(gulp.dest('Toolkit/dist/css'));
});

gulp.task('copy-fonts', function () {
    return gulp.src('Toolkit/src/css/font-awesome-4.6.3/**/*')
        .pipe(gulp.dest('Toolkit/dist/css/font-awesome-4.6.3'));
});

gulp.task('css-minify', function() {
    return gulp.src('Toolkit/src/css/*.css')
        .pipe(plugins.concat('osh.min.css'))
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(gulp.dest('Toolkit/dist/css'));
});

//--------- IMAGES -----------//
gulp.task('images', function () {
    return gulp.src('Toolkit/src/images/**/*')
        .pipe(gulp.dest('Toolkit/dist/images'));
});

//---------- VENDORS --------//

gulp.task('copy-vendor', function () {
    gulpSrcOrdered([ 'Toolkit/vendor/**/*',
                     '!Toolkit/vendor/ogc-schemas/**',
                     '!Toolkit/vendor/cesium.js/**',
                     '!Toolkit/vendor/jsonix/**',
                     '!Toolkit/vendor/leaflet/**',
                     '!Toolkit/vendor/nouislider/**',
                     '!Toolkit/vendor/nvd3/**'])
            .pipe(gulp.dest('Toolkit/dist/vendor'));

    //specific copying can go here
    //OGC schemas for JSONIX
    gulp.src([ 'Toolkit/vendor/ogc-schemas/scripts/lib/*'])
        .pipe(gulp.dest('Toolkit/dist/vendor/ogc-schemas'));

    //Cesium dist only
    gulp.src([ 'Toolkit/vendor/cesium.js/dist/**/*'])
        .pipe(gulp.dest('Toolkit/dist/vendor/cesium.js'));

    //jsonix dist only
    gulp.src([ 'Toolkit/vendor/jsonix/dist/**/*'])
        .pipe(gulp.dest('Toolkit/dist/vendor/jsonix'));

    //Leaflet dist only
    gulp.src([ 'Toolkit/vendor/leaflet/dist/**/*'])
        .pipe(gulp.dest('Toolkit/dist/vendor/leaflet'));

    //nouislider dist only
    gulp.src([ 'Toolkit/vendor/nouislider/distribute/**/*'])
        .pipe(gulp.dest('Toolkit/dist/vendor/nouislider'));

    //nvd3 dist only
    gulp.src([ 'Toolkit/vendor/nvd3/build/**/*'])
        .pipe(gulp.dest('Toolkit/dist/vendor/nvd3'));
});

//------- TOOLS -------//
//clean
gulp.task('clean', function () {
    return gulp.src('Toolkit/dist', {read: false})
        .pipe(plugins.clean({read:false}));
});