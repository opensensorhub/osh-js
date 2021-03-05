import SosGetResultVideo from 'core/datasource/SosGetResultVideo.js';
import FFMPEGView from 'core/ui/view/video/FFMPEGView.js';
import FoscamPtzTasking from "core/command/FoscamPtzTasking.js";
import PtzTaskingView from "ext/ui/view/tasking/PtzTaskingView.js";

// create data source for UAV camera
let videoDataSource = new SosGetResultVideo("drone-Video", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "localhost:8282/sensorhub/sos",
    offeringID: "foscam",
    observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
    startTime: "now",
    endTime: "2055-12-19T21:09:19Z",
    replaySpeed: 1
});

// show it in video view using FFMPEG JS decoder
let videoView = new FFMPEGView("video-container", {
    dataSourceId: videoDataSource.id,
    css: "video-h264",
    name: "Foscam Video",
    framerate:25,
    showTime: true,
    directPlay: true
});

let ptzTasking = new FoscamPtzTasking("Ptz", {
    protocol: "http",
    service: "SPS",
    version: "2.0",
    endpointUrl: "localhost:8282/sensorhub/sps",
    procedure: "urn:uuid:3f430d39-de1d-411a-b3b5-309816469d6b"
});

let ptzView  = new PtzTaskingView("tasking-container",{
    dataSenderId:ptzTasking.id,
    presets:["Reset","TopMost","BottomMost","LeftMost","RightMost"]
});

// start streaming
videoDataSource.connect();

ptzView.onChange = function(rpan, rtilt, rzoom, preset) {
    let cmdData = ptzTasking.getCommandData({
        rpan: rpan, rtilt:rtilt, rzoom:rzoom, preset:preset
    });
    ptzTasking.sendRequest(cmdData);
};
