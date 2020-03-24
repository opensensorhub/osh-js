// create data source for Android phone camera
import {VideoMjpeg} from "../../source/osh/datareceiver/osh-DataReceiver-DataSourceVideoMjpeg.js";
import MjpegView from "../../source/osh/ui/view/video/osh-UI-MjpegView.js";

var videoDataSource = new VideoMjpeg("android-Video", {
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
var videoView = new MjpegView("video-container", {
    dataSourceId: videoDataSource.id,
    css: "video-mjpeg",
    name: "Android Video",
    keepRatio: true,
    showTime: true
});

// start streaming
videoDataSource.connect();
