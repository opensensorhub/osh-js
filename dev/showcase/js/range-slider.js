import RangeSlider from 'osh-js/ext/ui/view/rangeslider/RangeSliderView.js';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.js';
import VideoView from 'osh-js/core/ui/view/video/VideoView.js';
import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';

// create data source for UAV camera
let videoDataSource = new SosGetResult("drone-Video", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:mysos:solo:video2",
    observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
    startTime: "2015-12-19T21:04:30Z",
    endTime: "2015-12-19T21:09:19Z",
    replaySpeed: 1
});

// show it in video view using FFMPEG JS decoder
let videoView = new VideoView({
    container: "video-container",
    css: "video-h264",
    name: "UAV Video",
    framerate:25,
    showTime: true,
    showStats: true,
    layers: [
        new VideoDataLayer({
            dataSourceId: videoDataSource.id,
            getFrameData: (rec) => rec.videoFrame,
            getTimestamp: (rec) => rec.timestamp
        })
    ]
});

let rangeSlider = new RangeSlider({
    container: "rangeSlider",
    startTime: "2015-12-19T21:04:30Z",
    endTime: "2015-12-19T21:09:19Z",
    dataSource: videoDataSource
});

videoDataSource.connect();