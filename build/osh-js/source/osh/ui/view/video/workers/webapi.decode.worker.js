self.onmessage = (event) => {
    const data = event.data;
    const timeStamp = data.timeStamp;
    const pktSize = data.pktSize;
    let videoData = data.pktData;

    // look for 1st byte of actual frame data
    let i;
    let key = false;
    for (i = 0; i < 100; i++) {
        if ((videoData[i] === 101 || videoData[i] === 65) && videoData[i - 1] === 1
            && videoData[i - 2] === 0 && videoData[i - 3] === 0) {

            // check if key frame
            if (videoData[i] === 101) {
                key = true;
            }

            let offset = i - 4;
            let pktSizeOff = pktSize - offset;
            let nalSize = pktSizeOff - 4;
            videoData = new Uint8Array(data.pktData.buffer, offset, pktSizeOff);
            videoData[0] = (nalSize >> 24) & 0xFF;
            videoData[1] = (nalSize >> 16) & 0xFF;
            videoData[2] = (nalSize >> 8) & 0xFF;
            videoData[3] = nalSize & 0xFF;
            break;
        }
    }

    const encodedFrame = {
        timeStamp: timeStamp,
        pktSize:pktSize,
        videoData: videoData,
        key: key
    };

    self.postMessage(encodedFrame, [
        encodedFrame.videoData.buffer
    ]);
}
