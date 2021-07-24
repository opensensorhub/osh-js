import File from 'osh-js/core/datasource/File';
import {DATASOURCE_DATA_TOPIC} from 'osh-js/core/Constants';
import { saveAs } from 'file-saver';
import runFFMpegTest from './ffmpeg/audio.ffmpeg';

const concat = (buffer1, buffer2) => {
    const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);

    return tmp.buffer;
};
const withWaveHeader = (data, numberOfChannels, sampleRate) => {
    const header = new ArrayBuffer(44);

    const d = new DataView(header);

    d.setUint8(0, "R".charCodeAt(0));
    d.setUint8(1, "I".charCodeAt(0));
    d.setUint8(2, "F".charCodeAt(0));
    d.setUint8(3, "F".charCodeAt(0));

    d.setUint32(4, data.byteLength / 2 + 44, true);

    d.setUint8(8, "W".charCodeAt(0));
    d.setUint8(9, "A".charCodeAt(0));
    d.setUint8(10, "V".charCodeAt(0));
    d.setUint8(11, "E".charCodeAt(0));
    d.setUint8(12, "f".charCodeAt(0));
    d.setUint8(13, "m".charCodeAt(0));
    d.setUint8(14, "t".charCodeAt(0));
    d.setUint8(15, " ".charCodeAt(0));

    d.setUint32(16, 16, true);
    d.setUint16(20, 1, true);
    d.setUint16(22, numberOfChannels, true);
    d.setUint32(24, sampleRate, true);
    d.setUint32(28, sampleRate * 1 * 2);
    d.setUint16(32, numberOfChannels * 2);
    d.setUint16(34, 16, true);

    d.setUint8(36, "d".charCodeAt(0));
    d.setUint8(37, "a".charCodeAt(0));
    d.setUint8(38, "t".charCodeAt(0));
    d.setUint8(39, "a".charCodeAt(0));
    d.setUint32(40, data.byteLength, true);

    return concat(header, data);
};

const button = document.querySelector('button');

button.onclick = () => test5();

function test1() {
    const jsonAudioDatasource = new File('Audio data',{
        paths: ['./data/sampleAudio.json'],
        batchSize: 1
    });

    const bc  = new BroadcastChannel(DATASOURCE_DATA_TOPIC + jsonAudioDatasource.id);


    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext();

    // Get an AudioBufferSourceNode.
    // This is the AudioNode to use when we want to play an AudioBuffer

    const length = 256;
    var myArrayBuffer = audioCtx.createBuffer(1, length, 8000);

    bc.onmessage = async (message) => {
        if (message.data.type === 'data') {
            // console.log(message.data.values);
            for (let value of message.data.values) {
                const data = value.data.amplitudeArray;
                // Create an empty two second stereo buffer at the
                // sample rate of the AudioContext
                // const audioBufferChunk = await audioCtx.decodeAudioData(
                //     withWaveHeader(
                //         new Float32Array(data).buffer,
                //         1, 8000
                //     )
                // );
                // for (var i = 0; i < data.length; i++) {
                //     tmp[i] = data[i];
                // }
                var nowBuffering = myArrayBuffer.getChannelData(0);
                for (var i = 0; i < length; i++) {
                    nowBuffering[i] = data[i];
                }
                let source = audioCtx.createBufferSource();
                source.buffer = concat(source.buffer, myArrayBuffer);
                source.connect(audioCtx.destination);
                source.start();
            }
        }
    }

    jsonAudioDatasource.connect();
}

function test2() {
// Fetch the original image
    fetch('./data/example.wav')
        // Retrieve its body as ReadableStream
        .then(response => {
        const stream = response.body;
        const reader = stream.getReader();

        let AudioContext = window.AudioContext || window.webkitAudioContext;
        let audioCtx = new AudioContext();

        audioCtx.onstatechange = function() {
            console.log(audioCtx.state);
        }
        let i =0;
        const buffers = [];

        let running = false;

        function checkForNextBuffer() {
            if(!running && buffers.length > 0) {
                createNewSource(buffers.shift());
            }
        }
        function createNewSource(audioBufferChunk) {
            running = true;
            let source = audioCtx.createBufferSource();
            source.buffer = audioBufferChunk;
            source.connect(audioCtx.destination);
            source.start();
            source.onended = () => {
                running = false;
                checkForNextBuffer();
            }
        }

        reader.read().then(async function processBytes({ done, value }) {
            if (done) {
                console.log("Stream complete");
                return;
            }
            const chunkSize = value.buffer.byteLength / 6;
            const nbChunk = value.buffer.byteLength / chunkSize;

            for(let i=0; i < nbChunk;i++) {
                const chunk = value.buffer.slice(i * chunkSize, (i+1)*chunkSize);
                const d = withWaveHeader(new Uint8Array(chunk).buffer,2, 8000)
                const audioBufferChunk = await audioCtx.decodeAudioData(d);

                buffers.push(audioBufferChunk);
                checkForNextBuffer();
            }
            return reader.read().then(processBytes);
        });
    });
}

function test3() {
// Fetch the original image
    const jsonAudioDatasource = new File('Audio data',{
        paths: ['./data/sampleAudio.json'],
        batchSize: 5000
    });

    const bc  = new BroadcastChannel(DATASOURCE_DATA_TOPIC + jsonAudioDatasource.id);

    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext();

    bc.onmessage = async (message) => {
        if (message.data.type === 'data') {
            let i = 0;

            for (let value of message.data.values) {
                if(i++ === 0) {
                    continue;
                }
                const data = new Float32Array(value.data.amplitudeArray);
                if (audioCtx.state === 'suspended') {
                    await audioCtx.resume();
                }
                const audioBufferChunk = await audioCtx.decodeAudioData(data.buffer);
                let source = audioCtx.createBufferSource();
                source.buffer = audioBufferChunk;
                source.connect(audioCtx.destination);
                source.start();
            }
        }
    };

    jsonAudioDatasource.connect();
}

let fileContent = [];

function test4() {
// Fetch the original image
    const jsonAudioDatasource = new File('Audio data',{
        paths: ['./data/sound_wav.json'],
        batchSize: 1
    });

    let AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = new AudioContext();

    audioCtx.onstatechange = function() {
        console.log(audioCtx.state);
    }

    let lastClockTime = null;
    const bc  = new BroadcastChannel(DATASOURCE_DATA_TOPIC + jsonAudioDatasource.id);
    let refTime = null;
    let lastClock = null;

    bc.onmessage = async (message) => {
        if (message.data.type === 'data') {
            for (let value of message.data.values) {
                const data = value.data;
                let delta = 0;

                if(refTime == null) {
                    refTime = data.timestamp;
                    lastClock = performance.now();
                    console.log(refTime);
                } else {
                    let clockTime = performance.now();
                    let dClockTime = (clockTime - lastClock);

                    delta = data.timestamp - refTime - dClockTime;
                    lastClock = clockTime;
                }
                // console.log(delta/1000);
                const d = withWaveHeader(new Uint8Array(data.amplitudeArray).buffer,1, 44100)
                const audioBufferChunk = await audioCtx.decodeAudioData(d);
                //
                let source = audioCtx.createBufferSource();
                source.buffer = audioBufferChunk;
                source.connect(audioCtx.destination);
                source.start(delta/1000);
            }
        }
    };

    jsonAudioDatasource.connect();
}

const downloadB = document.getElementById("download");

downloadB.onclick = () => {
// Fetch the original image
    fetch('./data/ff-16b-1c-44100hz.wav')
        // Retrieve its body as ReadableStream
        .then(response => {
            const stream = response.body;
            const reader = stream.getReader();

            let AudioContext = window.AudioContext || window.webkitAudioContext;
            let audioCtx = new AudioContext();

            audioCtx.onstatechange = function () {
                console.log(audioCtx.state);
            }
            let i = 0;
            let stTime = new Date("2019-03-27T13:23:56.576Z").getTime();

            const chunkSize = 2048;
            const sampleRate = 44100;

            reader.read().then(async function processBytes({done, value}) {
                if (done) {
                    console.log("Stream complete");
                    var blob = new Blob([JSON.stringify(fileContent)], {type: "application/json"});
                    saveAs(blob, "sound_wav.json");
                    return;
                }
                const nbChunk = value.buffer.byteLength / chunkSize;

                for (let i = 0; i < nbChunk; i++) {
                    const chunk = value.slice(i * chunkSize, (i + 1) * chunkSize);
                    console.log(chunk.buffer.byteLength)
                    const json = {
                        "timestamp": stTime,
                        "samplingRate": sampleRate,
                        "amplitudeArray": Array.from(chunk)
                    };
                    stTime += chunkSize / sampleRate;
                    fileContent.push(json);
                }
                return reader.read().then(processBytes);
            });
        });
};

function testFFmpeg() {
    runFFMpegTest();
}

// function download() {
//     var blob = new Blob([JSON.stringify(fileContent)], {type: "application/json"});
//     saveAs(blob, "sound_wav.json");
// }

function test5() {
    const samplesElement = document.getElementById("samples");

    fetch('./data/ff-16b-1c-44100hz.aac')
        // Retrieve its body as ReadableStream
        .then(response => {
            const stream = response.body;
            const reader = stream.getReader();

            let AudioContext = window.AudioContext || window.webkitAudioContext;
            let audioCtx = new AudioContext();

            audioCtx.onstatechange = function () {
                console.log(audioCtx.state);
            }
            let lastClockTIme = null;
            let deltaInc = 0;

            reader.read().then(async function processBytes({done, value}) {
                if (done) {
                    console.log("Stream complete");
                    return;
                }
                // let d = withWaveHeader(value.buffer,1, 8000)
                let d = value.buffer;
                console.log(value);
                const audioBufferChunk = await audioCtx.decodeAudioData(d);
                //
                let source = audioCtx.createBufferSource();
                source.buffer = audioBufferChunk;
                source.connect(audioCtx.destination);

                console.log('chunk');
                if(deltaInc === 0) {
                    source.start(0);
                    lastClockTIme = performance.now();
                } else {
                    let clockTime = performance.now();
                    let dClockTime = (clockTime - lastClockTIme);

                    let delta = deltaInc - dClockTime/1000;/* - ((refTime - dClockTime)/1000);*/
                    lastClockTIme = clockTime;
                    source.start(deltaInc);
                }
                deltaInc += audioBufferChunk.duration;

                const spanElt = document.createElement("span");
                samplesElement.appendChild(spanElt);
                let spanTime = deltaInc * 1000;
                let intervalV;
                intervalV = setInterval(() => {
                    spanTime-=50;
                    if(spanTime < 0) {
                        spanTime = 0;
                    }
                    spanElt.innerText = "Next Sample in "+(spanTime)+" ms";
                    clearInterval(intervalV);
                }, 50)
                return reader.read().then(processBytes);
            });
        });
}
