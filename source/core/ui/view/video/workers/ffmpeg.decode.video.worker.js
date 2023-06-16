import FfmpegDecoder from "../../ffmpeg/FfmpegVideoDecoder";
import {isDefined} from "../../../../utils/Utils";

let ffmpegDecoder;

self.onmessage = async function (e) {
    if (isDefined(e.data.message) && e.data.message === 'init') {
        ffmpegDecoder = new FfmpegDecoder(e.data.codec);
    }

    if (isDefined(ffmpegDecoder)) {
        const decodedFrame = await ffmpegDecoder.decode(e.data);
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
    console.log('closing worker');
}
