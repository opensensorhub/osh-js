self.onmessage = function (event) {
    var data = event.data;
    var timeStamp = data.timeStamp;
    var pktSize = data.pktSize;
    var videoData = data.pktData;
    // look for 1st byte of actual frame data
    var i;
    var key = false;
    for (i = 0; i < 100; i++) {
        if ((videoData[i] === 101 || videoData[i] === 65) && videoData[i - 1] === 1
            && videoData[i - 2] === 0 && videoData[i - 3] === 0) {
            // check if key frame
            if (videoData[i] === 101) {
                key = true;
            }
            var offset = i - 4;
            var pktSizeOff = pktSize - offset;
            var nalSize = pktSizeOff - 4;
            videoData = new Uint8Array(data.pktData.buffer, offset, pktSizeOff);
            videoData[0] = (nalSize >> 24) & 0xFF;
            videoData[1] = (nalSize >> 16) & 0xFF;
            videoData[2] = (nalSize >> 8) & 0xFF;
            videoData[3] = nalSize & 0xFF;
            break;
        }
    }
    var encodedFrame = {
        timeStamp: timeStamp,
        pktSize: pktSize,
        videoData: videoData,
        key: key
    };
    self.postMessage(encodedFrame, [
        encodedFrame.videoData.buffer
    ]);
};
//# sourceMappingURL=webapi.decode.worker.js.map