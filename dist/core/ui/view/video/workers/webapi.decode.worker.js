import { isDefined } from "../../../../utils/Utils";
var width, height, videoDecoder, codec;
var currentPktSize, currentTimestamp;
self.onmessage = function (event) {
    if (isDefined(event.data.init)) {
        codec = event.data.init.codec;
        width = event.data.init.width;
        height = event.data.init.height;
        var init = {
            output: function (videoFrame) {
                // check picture width
                if (width !== videoFrame.codedWidth || height !== videoFrame.codedHeight) {
                    width = videoFrame.codedWidth;
                    height = videoFrame.codedHeight;
                    videoDecoder.configure({
                        codec: codec,
                        codedWidth: width,
                        codedHeight: height
                    });
                }
                createImageBitmap(videoFrame, {}).then(function (bitmap) {
                    videoFrame.close();
                    try {
                        self.postMessage({
                            bitmap: bitmap,
                            timestamp: currentTimestamp,
                            pktSize: currentPktSize,
                            width: width,
                            height: height
                        }, [bitmap]);
                    }
                    catch (exception) {
                        console.error(exception);
                    }
                });
            },
            error: function (error) {
                console.error(error);
            }
        };
        videoDecoder = new VideoDecoder(init);
        videoDecoder.configure({
            codec: codec,
            codedWidth: width,
            codedHeight: height
        });
        self.postMessage({
            init: true
        });
    }
    else {
        var pktData = event.data.pktData;
        var timestamp = event.data.timestamp;
        currentPktSize = event.data.pktSize;
        currentTimestamp = timestamp;
        var i = void 0;
        var key = false;
        // H264 logic
        for (i = 0; i < 100; i++) {
            if ((pktData[i] === 101 || pktData[i] === 65) && pktData[i - 1] === 1
                && pktData[i - 2] === 0 && pktData[i - 3] === 0) {
                // check if key frame
                if (pktData[i] === 101) {
                    key = true;
                }
                break;
            }
        }
        var chunk = new EncodedVideoChunk({
            timestamp: timestamp,
            type: key ? 'key' : 'delta',
            data: pktData
        });
        videoDecoder.decode(chunk);
    }
};
//# sourceMappingURL=webapi.decode.worker.js.map