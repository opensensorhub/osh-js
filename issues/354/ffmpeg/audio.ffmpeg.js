import DecodeWorker from './ffmpeg.decode.audio.worker.js';
import File from "osh-js/core/datasource/File";
import {DATASOURCE_DATA_TOPIC} from "osh-js/core/Constants";

export default function runFFMpegTest() {
    const decodeWorker = new DecodeWorker();

    const jsonAudioDatasource = new File('Audio data', {
        paths: ['./data/sound_wav.json'],
        batchSize: 1
    });

    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext();

    audioCtx.onstatechange = function () {
        console.log(audioCtx.state);
    }

    const bc = new BroadcastChannel(DATASOURCE_DATA_TOPIC + jsonAudioDatasource.id);
    let refTime = null;
    let lastClockTime = null;

    bc.onmessage = async (message) => {
        if (message.data.type === 'data') {
            for (let value of message.data.values) {
                const data = value.data;
                let delta = 0;

                if (refTime == null) {
                    refTime = data.timestamp;
                    lastClockTime = performance.now();
                    console.log(refTime);
                } else {
                    let clockTime = performance.now();
                    let dClockTime = (clockTime - lastClockTime);

                    delta = data.timestamp - refTime - dClockTime;
                    lastClockTime = clockTime;
                }
                const audioBufferChunk = null; // Do something with FFMPEG
                //
                let source = audioCtx.createBufferSource();
                source.buffer = audioBufferChunk;
                source.connect(audioCtx.destination);
                source.start(delta / 1000);
            }
        }
    };

    jsonAudioDatasource.connect();
}
