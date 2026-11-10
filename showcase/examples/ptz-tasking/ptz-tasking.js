import VideoView from 'osh-js/core/ui/view/video/VideoView.js';
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";
import {Mode} from "../../../../source/core/datasource/Mode";
import VideoDataLayer from "../../../../source/core/ui/layer/VideoDataLayer";
import Systems from "osh-js/core/consysapi/system/Systems";
import ControlStreamFilter from "../../../source/core/consysapi/controlstream/ControlStreamFilter";


const systemId = "mkmk546knttpg";
const cmdStreamId = "3ft1spese38pg";
const dsId = "khv081o7hpma2";

const mqttProps = {
    prefix: '/api',
    endpointUrl: 'api.georobotix.io/ogc/t18/api',
};

// create data source for dahua camera
let videoDataSource =  new ConSysApi('Dahua Office - Video', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    tls: true,
    startTime: '2023-06-06T14:01:15.637Z',
    endTime: '2023-06-06T22:53:15Z',
    minTime: '2023-06-06T14:01:15.637Z',
    maxTime: '2055-06-06T22:53:15Z ',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: `/datastreams/${dsId}/observations`,
    responseFormat: 'application/swe+binary',
});


const systems = new Systems({
    endpointUrl: 'api.georobotix.io/ogc/t18/api',
    streamProtocol: 'mqtt',
    mqttOpts: mqttProps,
    tls: true,
});

let control;

function sendPtzCommand(params) {
    if (!control) return;

    control.postCommand(JSON.stringify({
        params: params
    }));
}

async function startListening() {
    const system = await systems.getSystemById(systemId);
    const control = await system.getControlStreamById(ptzControlStreamId);
    control.streamStatus(new ControlStreamFilter(), message => {
        console.log('PTZ command status:', message);
        const statusElement = document.getElementById('text_status');
        if (statusElement) {
            statusElement.textContent = JSON.stringify(message, null, 2);
        }
    });


    document.getElementById('pan-left').onclick = () => {
        sendPtzCommand({ rpan: -10 });
    };
    document.getElementById('pan-right').onclick = () => {
        sendPtzCommand({ rpan: 10 });
    };
    document.getElementById('tilt-up').onclick = () => {
        sendPtzCommand({ rtilt: 5 });
    };
    document.getElementById('tilt-down').onclick = () => {
        sendPtzCommand({ rtilt: -5 });
    };
    document.getElementById('zoom-in').onclick = () => {
        sendPtzCommand({ rzoom: 0.1 });
    };
    document.getElementById('zoom-out').onclick = () => {
        sendPtzCommand({ rzoom: -0.1 });
    };
    document.getElementById('ptz-home').onclick = () => {
        sendPtzCommand({ preset: 'Home' });
    };
    document.getElementById('preset-home').onclick = () => {
        sendPtzCommand({ preset: 'Home' });
    };
    document.getElementById('set-position').onclick = () => {
        sendPtzCommand({
            ptzPos: {
                pan: Number(document.getElementById('pan-slider').value),
                tilt: Number(document.getElementById('tilt-slider').value),
                zoom: Number(document.getElementById('zoom-slider').value)
            }
        });
    };
}

// show it in video view using FFMPEG JS decoder
let videoView = new VideoView({
    container: 'video-container',
    css: 'video-dahua',
    name: 'Dahua Office - Video',
    framerate: 25,
    showTime: true,
    showStats: true,
    useWebCodecApi: true,
    layers: [
        new VideoDataLayer({
            dataSourceId: videoDataSource.id,
            getFrameData: (rec) => rec.img,
            getTimestamp: (rec) => rec.timestamp
        })
    ]
});

['pan', 'tilt', 'zoom'].forEach(name => {
    const slider = document.getElementById(`${name}-slider`);
    const label = document.getElementById(`${name}-value`);

    if (slider && label) {
        slider.oninput = () => {
            label.textContent = slider.value +
                (name === 'zoom' ? '' : '°');
        };
    }
});

// start streaming
videoDataSource.connect();
startListening();
