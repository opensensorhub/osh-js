import FfmpegDecoder from "../FfmpegDecoder";
import {isDefined} from "../../../../utils/Utils";

const ffmpegDecoder = new FfmpegDecoder();

self.onmessage = function(e) {
    const decodedFrame = ffmpegDecoder.decode(e.data);
    if(isDefined(decodedFrame)){
        self.postMessage(decodedFrame,
            [
                decodedFrame.frameYData.buffer,
                decodedFrame.frameUData.buffer,
                decodedFrame.frameVData.buffer
            ]);
    }
}

self.onerror = (e) => {
    console.log('closing worker');
}
