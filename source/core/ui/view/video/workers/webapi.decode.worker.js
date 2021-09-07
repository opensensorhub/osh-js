import {isDefined} from "../../../../utils/Utils";

let gl;
let offscreen;
self.onmessage = (event) => {
    if(isDefined(event.data.canvas)) {
        gl = event.data.canvas.getContext("webgl");
        offscreen = event.data.canvas;
    } else {
        const videoFrame = event.data.frame;
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
            }
        });
    }
}
