function init() {
    var dataProviderController = new OSH.DataReceiver.DataReceiverController({
        bufferingTime: 2 * 1000, // 2 seconds
        synchronizedTime: false // true to sync the data
    });

// creates datasource

//--Android Phone Video, Orientation and GPS Location (MJPEG)
    var androidPhoneGpsDataSource = new OSH.DataReceiver.LatLonAlt("android-GPS", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "www.bottsgeo.com:8080/sensorhub/sos",
        offeringID: "urn:android:device:89845ed469b7edc7-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/Location",
        startTime: "2016-06-08T19:46:07Z",
        endTime: "2016-06-08T20:35:06.983Z",
        replaySpeed: "1"
    });

    var androidPhoneOrientationDataSource = new OSH.DataReceiver.OrientationQuaternion("android-Orientation", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "www.bottsgeo.com:8080/sensorhub/sos",
        offeringID: "urn:android:device:89845ed469b7edc7-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
        startTime: "2016-06-08T19:46:07Z",
        endTime: "2016-06-08T20:35:06.983Z",
        replaySpeed: "1"
    });

    var androidPhoneVideoDataSource = new OSH.DataReceiver.VideoMjpeg("android-Video", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "www.bottsgeo.com:8080/sensorhub/sos",
        offeringID: "urn:android:device:89845ed469b7edc7-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2016-06-08T19:46:07Z",
        endTime: "2016-06-08T20:35:06.983Z",
        replaySpeed: "1"
    }, {
        format: "mjpeg"
    });
//--

//--Virb Video (MP4) and GPS Location
    var virb1GpsDataSource = new OSH.DataReceiver.LatLonAlt("virb1-GPS", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "www.bottsgeo.com:8080/sensorhub/sos",
        offeringID: "urn:osh:virb1",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorLocation",
        startTime: "2016-06-08T19:46:10Z",
        endTime: "2016-06-08T20:35:06.983Z",
        replaySpeed: "1"
    });

    var virb1VideoDataSource = new OSH.DataReceiver.VideoMp4("virb1-Video", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "www.bottsgeo.com:8080/sensorhub/sos",
        offeringID: "urn:osh:virb1",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2016-06-08T19:46:10Z",
        endTime: "2016-06-08T20:35:06.983Z",
        replaySpeed: "1",
        responseFormat: "video/mp4"
    }, {
        format: "mp4"
    });

    var virb2GpsDataSource = new OSH.DataReceiver.LatLonAlt("virb2-GPS", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "www.bottsgeo.com:8080/sensorhub/sos",
        offeringID: "urn:osh:virb2",
        observedProperty: "http://www.opengis.net/def/property/OGC/0/SensorLocation",
        startTime: "2016-06-08T19:46:10Z",
        endTime: "2016-06-08T20:35:06.983Z",
        replaySpeed: "1"
    });

    var virb2VideoDataSource = new OSH.DataReceiver.VideoMp4("virb2-Video", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "www.bottsgeo.com:8080/sensorhub/sos",
        offeringID: "urn:osh:virb2",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2016-06-08T19:46:10Z",
        endTime: "2016-06-08T20:35:06.983Z",
        replaySpeed: "1",
        responseFormat: "video/mp4"
    }, {
        format: "mp4"
    });

//--

//-- Thermal IR video from FLIR (MJPEG)
    var flirVideoDataSource = new OSH.DataReceiver.VideoMjpeg("flir-Video", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "www.bottsgeo.com:8080/sensorhub/sos",
        offeringID: "urn:android:device:89845ed469b7edc7:flirone-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
        startTime: "2016-06-08T19:59:31.535Z",
        endTime: "2016-06-08T20:35:06.983Z",
        replaySpeed: "1"
    }, {
        format: "mjpeg"
    });
    //--

    //--TruPulse Range Finder

    // creates entities
    var androidEntity = {
        name: "Android Phone",
        dataSources: [androidPhoneGpsDataSource.getId(), androidPhoneOrientationDataSource.getId(), androidPhoneVideoDataSource.getId()]
    }

    var virb1Entity = {
        name: "VIRB1 Camera",
        dataSources: [virb1GpsDataSource.getId(), virb1VideoDataSource.getId()]
    }

    var virb2Entity = {
        name: "VIRB2 Camera",
        dataSources: [virb2GpsDataSource.getId(), virb2VideoDataSource.getId()]
    }

    var flirEntity = {
        name: "FLIR Camera",
        dataSources: [androidPhoneGpsDataSource.getId(), flirVideoDataSource.getId()]
    }

    // creates view
    var leafletView = new OSH.UI.LeafletView("main-container");

    var videoView2 = new OSH.UI.VideoView("container-video1", {
        dataSourceId: virb1VideoDataSource.getId(),
        format: "mp4",
        css: "video",
        cssSelected: "video-selected",
        name: "VIRB 1",
        draggable: true
    });

    var videoView3 = new OSH.UI.VideoView("container-video2", {
        dataSourceId: virb2VideoDataSource.getId(),
        format: "mp4",
        css: "video",
        cssSelected: "video-selected",
        name: "VIRB 2",
        draggable: true
    });

    var videoView1 = new OSH.UI.VideoView("container-video3", {
        dataSourceId: androidPhoneVideoDataSource.getId(),
        format: "mjpeg",
        css: "video",
        cssSelected: "video-selected",
        name: "Android Video",
        draggable: true
    });

    var videoView4 = new OSH.UI.VideoView("container-video4", {
        dataSourceId: flirVideoDataSource.getId(),
        format: "mjpeg",
        css: "video",
        cssSelected: "video-selected",
        name: "FLIR",
        draggable: true
    });

    // creates stylers
    var androidMarkerStyler = new OSH.UI.Styler.PointMarker({
        location: {
            x: -86.7433953,
            y: 34.7255687,
            z: 100
        },
        locationFunc: {
            dataSourceIds: [androidPhoneGpsDataSource.getId()],
            handler: function (rec) {
                return {
                    x: rec.lon,
                    y: rec.lat,
                    z: rec.alt
                };
            }
        },
        orientationFunc: {
            dataSourceIds: [androidPhoneOrientationDataSource.getId()],
            handler: function (rec) {
                return {
                    heading: rec.heading
                };
            }
        },
        icon: 'images/cameralook.png',
        iconFunc: {
            dataSourceIds: [androidPhoneGpsDataSource.getId()],
            handler: function (rec, timeStamp, options) {
                if (options.selected) {
                    return 'images/cameralook-selected.png'
                } else {
                    return 'images/cameralook.png';
                }
                ;
            }
        }
    });

    var virb1MarkerStyler = new OSH.UI.Styler.PointMarker({
        location: {
            x: -86.7433953,
            y: 34.7255687,
            z: 100
        },
        locationFunc: {
            dataSourceIds: [virb1GpsDataSource.getId()],
            handler: function (rec) {
                return {
                    x: rec.lon,
                    y: rec.lat,
                    z: rec.alt
                };
            }
        },
        icon: 'images/cameralook.png',
        iconFunc: {
            dataSourceIds: [virb1GpsDataSource.getId()],
            handler: function (rec, timeStamp, options) {
                if (options.selected) {
                    return 'images/cameralook-selected.png'
                } else {
                    return 'images/cameralook.png';
                }
                ;
            }
        }
    });

    var virb2MarkerStyler = new OSH.UI.Styler.PointMarker({
        location: {
            x: -86.7433953,
            y: 34.7255687,
            z: 100
        },
        locationFunc: {
            dataSourceIds: [virb2GpsDataSource.getId()],
            handler: function (rec, timeStamp, options) {
                return {
                    x: rec.lon,
                    y: rec.lat,
                    z: rec.alt
                };
            }
        },
        icon: 'images/cameralook.png',
        iconFunc: {
            dataSourceIds: [virb2GpsDataSource.getId()],
            handler: function (rec, timeStamp, options) {
                if (options.selected) {
                    return 'images/cameralook-selected.png'
                } else {
                    return 'images/cameralook.png';
                }
                ;
            }
        }
    });

    // adds view item to the view
    leafletView.addViewItem({
        styler: androidMarkerStyler,
        name: "Android Phone"
    });

    leafletView.addViewItem({
        styler: virb1MarkerStyler,
        name: "VIRB 1"
    });

    leafletView.addViewItem({
        styler: virb2MarkerStyler,
        name: "VIRB 2"
    });

    // adds datasources to dataProviderController
    dataProviderController.addDataSource(androidPhoneGpsDataSource);
    dataProviderController.addDataSource(androidPhoneOrientationDataSource);
    dataProviderController.addDataSource(androidPhoneVideoDataSource);
    dataProviderController.addDataSource(virb1GpsDataSource);
    dataProviderController.addDataSource(virb1VideoDataSource);
    dataProviderController.addDataSource(virb2GpsDataSource);
    dataProviderController.addDataSource(virb2VideoDataSource);
    dataProviderController.addDataSource(flirVideoDataSource);

    // registers the view into the data provider
    dataProviderController.registerObserver(leafletView);
    dataProviderController.registerObserver(videoView1);
    dataProviderController.registerObserver(videoView2);
    dataProviderController.registerObserver(videoView3);
    dataProviderController.registerObserver(videoView4);

    // adds controller to interact between views
    var controller = new OSH.EventManager();
    controller.addView(leafletView);
    controller.addView(videoView1);
    controller.addView(videoView2);
    controller.addView(videoView3);
    controller.addView(videoView4);

    // adds entities to controller
    controller.addEntity(androidEntity);
    controller.addEntity(virb1Entity);
    controller.addEntity(virb2Entity);
    controller.addEntity(flirEntity);

    // starts streaming
    dataProviderController.connectAll();

    // inits rangeSlider
    var rangeSlider = new OSH.UI.JQRangeSlider("rangeSlider", {
        startDate: "2016-06-08T19:59:31.535Z",
        endDate: "2016-06-08T20:35:06.983Z"
    });
}