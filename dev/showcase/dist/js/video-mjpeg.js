import SosGetResultVideo from 'osh-js/core/datasource/SosGetResultVideo.js';
import MjpegView from 'osh-js/core/ui/view/video/MjpegView.js';

// create data source for Android phone camera
let videoDataSource = new SosGetResultVideo("android-Video", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
    startTime: "2015-02-16T07:58:35Z",
    endTime: "2015-02-16T08:09:00Z",
    replaySpeed: 3
});

// show it in video view
let videoView = new MjpegView({
    container: "video-mjpeg-container",
    css: "video-mjpeg",
    name: "Android Video",
    keepRatio: true,
    showTime: true,
    dataSourceId: videoDataSource.id
});

// start streaming
videoDataSource.connect();
