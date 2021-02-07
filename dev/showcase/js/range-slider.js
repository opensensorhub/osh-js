import RangeSlider from "osh-ext/ui/view/rangeslider/RangeSliderView.js";
import SosGetResultVideo from "osh/datareceiver/SosGetResultVideo.js";
import FFMPEGView from "osh/ui/view/video/FFMPEGView.js";
import DataLayer from "osh/ui/layer/DataLayer";

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

const dataLayer =  new DataLayer({
    dataSourceId: videoDataSource.id
});

// show it in video view using FFMPEG JS decoder
let videoView = new FFMPEGView({
    container: "video-container",
    css: "video-h264",
    name: "UAV Video",
    framerate:25,
    showTime: true,
    showStats: true,
    layers: [dataLayer]
});

let rangeSlider = new RangeSlider({
    container: "rangeSlider",
    startTime: "2015-12-19T21:04:30Z",
    endTime: "2015-12-19T21:09:19Z",
    dataSource: videoDataSource
});

videoDataSource.connect();