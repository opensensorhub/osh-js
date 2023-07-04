import FfmpegDecoder from "../FfmpegDecoder";
import { isDefined } from "../../../../utils/Utils";
var ffmpegDecoder;
self.onmessage = function (e) {
    if (isDefined(e.data.message) && e.data.message === 'init') {
        ffmpegDecoder = new FfmpegDecoder(e.data.codec);
    }
    if (isDefined(ffmpegDecoder)) {
        var decodedFrame = ffmpegDecoder.decode(e.data);
        if (isDefined(decodedFrame)) {
            self.postMessage(decodedFrame, [
                decodedFrame.frameYData.buffer,
                decodedFrame.frameUData.buffer,
                decodedFrame.frameVData.buffer
            ]);
        }
    }
};
self.onerror = function (e) {
    console.log('closing worker');
};
//# sourceMappingURL=ffmpeg.decode.worker.js.map