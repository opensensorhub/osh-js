import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import VideoView from 'osh-js/core/ui/view/video/VideoView';
import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import SosGetResultParser from "../../../source/core/parsers/sos/SosGetResult.parser";

let startTime = "2015-02-16T07:57:59.447Z";
let endTime = "2015-02-16T08:09:00Z";

// create data source for Android phone camera
let videoDataSource = new SosGetResult("android-Video", {
    endpointUrl: "sensiasoft.net/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
    startTime: startTime,
    endTime: endTime,
    mode: Mode.REPLAY,
    tls: true,
    prefetchBatchDuration: 5000,
    timeShift: -16000
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
const dataSynchronizer = new DataSynchronizer({
    masterTimeRefreshRate: 250,
    replaySpeed: 1.0,
    startTime: startTime,
    endTime: endTime,
    dataSources: [
        videoDataSource
    ]
});
dataSynchronizer.connect()

