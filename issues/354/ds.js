import SosGetResultAudio from 'osh-js/core/datasource/SosGetResultAudio.js';
import {DATASOURCE_DATA_TOPIC} from "osh-js/core/Constants";

const button = document.querySelector('button');
const samplesElement = document.getElementById("samples");

button.onclick = () => test8();

let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext();

audioCtx.onstatechange = function () {
    console.log(audioCtx.state);
}

const concat = (buffer1, buffer2) => {
    const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);

    return tmp.buffer;
};

async function test8(){
    // create data source for UAV camera
    let audioDataSource = new SosGetResultAudio("alex-audio", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:dd90fceba7fd5b47-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/AudioFrame",
        startTime: "2021-03-24T09:56:00Z",
        endTime: "now",
        // replaySpeed: 1,
        batchSize:500
    });

    const bc  = new BroadcastChannel(DATASOURCE_DATA_TOPIC + audioDataSource.id);
    let lastClockTIme = null;

    let total=0;
    let errors = 0;

    let deltaInc = 0;
    let buffer = null;

    let flushLimit = 2;
    let count = 0;
    bc.onmessage = async (message) => {
        if (message.data.type === 'data') {
            for (let value of message.data.values) {
                const data = value.data.frameData;

                total++;
                if(buffer === null) {
                    buffer = new Uint8Array(data, 0, data.byteLength).buffer;
                } else {
                    buffer = concat(buffer, new Uint8Array(data, 0, data.byteLength).buffer);
                }

                if(count >= flushLimit) {
                    console.log("flushing...");
                    try {
                        let audioBufferChunk = await audioCtx.decodeAudioData(buffer);
                        //
                        let source = audioCtx.createBufferSource();
                        source.buffer = audioBufferChunk;
                        source.connect(audioCtx.destination);

                        if (deltaInc === 0) {
                            source.start(0);
                        } else {
                            console.log(deltaInc)
                            deltaInc -= 0.030;
                            source.start(deltaInc);
                        }
                        deltaInc += audioBufferChunk.duration;
                    } catch (exception) {
                        errors++;
                        console.error(exception, errors, 'at ', deltaInc, 'secs', data);
                    }
                    console.log(total, errors);
                    buffer = null;
                    count = 0;
                } else {
                    count++;
                }
            }
        }
    };
// start streaming
    audioDataSource.connect();
}

