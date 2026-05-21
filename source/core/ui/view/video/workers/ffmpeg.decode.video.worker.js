import FfmpegDecoder from "../../ffmpeg/FfmpegVideoDecoder";
import {isDefined} from "../../../../utils/Utils";

let ffmpegDecoder;

self.onmessage = async function (e) {
    if (isDefined(e.data.message) && e.data.message === 'init') {
        ffmpegDecoder = new FfmpegDecoder(e.data.codec);
    }

    if (isDefined(ffmpegDecoder)) {
        // Clone incoming data to avoid buffer detachment issues
        const msg = { ...e.data };
        if (msg.pktData instanceof ArrayBuffer) {
            msg.pktData = msg.pktData.slice(0);
        }
        const decodedFrame = await ffmpegDecoder.decode(msg);
        if (isDefined(decodedFrame)) {
            self.postMessage(decodedFrame,
                [
                    decodedFrame.frameYData.buffer,
                    decodedFrame.frameUData.buffer,
                    decodedFrame.frameVData.buffer
                ]);
        }
    }
}

self.onerror = (e) => {
    console.error('Decode worker error:', e);
}

self.onmessageerror = (e) => {
    console.error('Decode worker message error:', e);
}
