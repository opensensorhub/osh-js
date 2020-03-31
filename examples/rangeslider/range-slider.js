import RangeSlider from "../../source/ext/osh/ui/rangeslider/RangeSlider";
import DataSourceVideoH264 from "../../source/osh/datareceiver/DataSourceVideoH264";
import FFMPEGView from "../../source/osh/ui/view/video/FFMPEGView";

// create data source for UAV camera
let videoDataSource = new DataSourceVideoH264("drone-Video", {
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
let videoView = new FFMPEGView("video-container", {
    dataSourceId: videoDataSource.id,
    css: "video-h264",
    name: "UAV Video",
    useWorker: true,
    width: 1280,
    height: 720,
    framerate:25,
    showTime: true
});

let rangeSlider = new RangeSlider("rangeSlider",{
    dataSourceId: videoDataSource.id,
    startTime: "2015-12-19T21:04:30Z",
    endTime: "2015-12-19T21:09:19Z",
    refreshRate:1
});

videoDataSource.connect();

rangeSlider.onChange = function(startTime, endTime) {
    videoDataSource.disconnect();
    // get current parameters
    let props = videoDataSource.properties;
    let options = videoDataSource.options;

    // update start/end time
    props.startTime = new Date(parseInt(startTime)).toISOString();
    props.endTime = new Date(parseInt(endTime)).toISOString();

    // reset parameters
    videoDataSource.initDataSource(props, options);
    videoDataSource.connect();
};
