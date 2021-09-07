import {isDefined} from "../../../../utils/Utils";
import YUVCanvas from "./../YUVCanvas";


let gl;
let offscreen;
let yuvCanvas;

self.onmessage = (event) => {
    if(isDefined(event.data.canvas)) {
        // offscreen = event.data.canvas;
        // yuvCanvas = new YUVCanvas({
        //     width: 1920,
        //     height: 1080,
        //     contextOptions: {
        //         preserveDrawingBuffer: true
        //     },
        //     canvas:offscreen
        // });
    } else {
        const videoFrame = event.data.frame;
        createImageBitmap(videoFrame,{
        }).then(bitmap => {
            try {
                // yuvCanvas.canvasElement.drawing = true;
                // yuvCanvas.drawNextOuptutPictureBitmapGL({
                //     yData: bitmap,
                //     yDataPerRow: 1920,
                //     yRowCnt: 1080,
                //     roll: 0
                // });
                //
                // yuvCanvas.canvasElement.drawing = false;
                // bitmap.close();

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
    }
}
