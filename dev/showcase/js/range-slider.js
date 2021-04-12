import RangeSlider from 'osh-js/ext/ui/view/rangeslider/RangeSliderView.js';
import SosGetResultVideo from 'osh-js/core/datasource/SosGetResultVideo.js';
import FFMPEGView from 'osh-js/core/ui/view/video/FFMPEGView.js';

// create data source for UAV camera
let videoDataSource = new SosGetResultVideo("drone-Video", {
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
let videoView = new FFMPEGView({
    container: "video-container",
    css: "video-h264",
    name: "UAV Video",
    framerate:25,
    showTime: true,
    showStats: true,
    dataSourceId: videoDataSource.id
});

let rangeSlider = new RangeSlider({
    container: "rangeSlider",
    startTime: "2015-12-19T21:04:30Z",
    endTime: "2015-12-19T21:09:19Z",
    dataSource: videoDataSource
});

videoDataSource.connect();
