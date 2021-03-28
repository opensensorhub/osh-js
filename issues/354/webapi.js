const button = document.querySelector('button');
const samplesElement = document.getElementById("samples");

button.onclick = () => test6();

let audioDecoder = new AudioDecoder({
    output: onDecodedAudio,
    error: onDecodedAudioError
});

let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext();
let deltaInc = 0;

function onDecodedAudio(decodedSample) {
    const buffer = decodedSample.buffer;
    let source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(deltaInc);
    deltaInc += buffer.duration;
}

function onDecodedAudioError(error) {
    console.error(error);
}

const sampleRate = 8000;

async function init() {
    await audioDecoder.configure({
        codec: 'amr',
        numberOfChannels:1,
        sampleRate: sampleRate
    });
}

let count =0;
async function test6() {
    await init();
    fetch('./data/ff-16b-1c-8000hz.amr')
        // Retrieve its body as ReadableStream
        .then(response => {
            const stream = response.body;
            const reader = stream.getReader();

            let first =  true;
            let deltaInc = 0;
            reader.read().then(async function processBytes({done, value}) {
                if (done) {
                    console.log("Stream complete");
                    return;
                }
                deltaInc = 0;

                const chunk = new EncodedAudioChunk({
                    type:  first? "key" : "delta",
                    data: value.buffer,
                    timestamp: 0
                });

                try {
                    audioDecoder.decode(chunk);
                    console.log(value.length/sampleRate, count);
                } catch (error) {
                    console.error(error, (value.length/sampleRate),count);
                }

                count++;
                deltaInc += value.length/sampleRate;
                first = false;
                return reader.read().then(processBytes);
            });
        });
}
