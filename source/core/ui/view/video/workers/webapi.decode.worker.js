import {isDefined} from "../../../../utils/Utils";

let width, height, videoDecoder;

self.onmessage = (event) => {
    if(isDefined(event.data.init)) {
        const init = {
            output: (videoFrame) => {
                createImageBitmap(videoFrame,{
                }).then(bitmap => {
                    try {
                        self.postMessage({
                            bitmap:bitmap,
                            timestamp: videoFrame.timestamp,
                            pktSize: event.data.pktSize
                        }, [bitmap]);

                    } catch (exception) {
                        console.error(exception);
                    } finally {
                        videoFrame.close();
                        bitmap.close();
                    }
                });
            },
            error: (error) => {
                console.error(error);
            }
        };
        width = 1920;
        height = 1080;

        videoDecoder = new VideoDecoder(init);
        videoDecoder.configure({
            codec: event.data.init.codec,
            codedWidth: 1920,
            codedHeight: 1080
        });

        self.postMessage({
            init: true
        });
    } else {
        const pktData = event.data.pktData;
        const timeStamp = event.data.timeStamp;

        let i;
        let key = false;
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

        let chunk = new EncodedVideoChunk({
            timestamp: timeStamp,
            type: key ? 'key' : 'delta',
            data: pktData
        });
        videoDecoder.decode(chunk);
        // const videoFrame = event.data.frame;
        // createImageBitmap(videoFrame,{
        // }).then(bitmap => {
        //     try {
        //         self.postMessage({
        //             bitmap:bitmap,
        //             timestamp: videoFrame.timestamp,
        //             pktSize: event.data.pktSize
        //         }, [bitmap]);
        //
        //     } catch (exception) {
        //         console.error(exception);
        //     } finally {
        //         videoFrame.close();
        //         bitmap.close();
        //     }
        // });
    }
}
