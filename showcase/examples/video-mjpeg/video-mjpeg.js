import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import VideoView from 'osh-js/core/ui/view/video/VideoView';
import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';

// create data source for Android phone camera
let videoDataSource = new SosGetResult("android-Video", {
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
let videoView = new VideoView({
    container: "video-mjpeg-container",
    css: "video-mjpeg",
    name: "Android Video",
    keepRatio: true,
    showTime: true,
    layers: [
        new VideoDataLayer({
            dataSourceId: videoDataSource.id,
            getFrameData: (rec) => rec.videoFrame,
            getTimestamp: (rec) => rec.timestamp
        })
    ]
});

// start streaming
videoDataSource.connect();
