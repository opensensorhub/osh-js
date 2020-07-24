import YUVCanvas from "../YUVCanvas";
import {isDefined} from "../../../../utils/Utils";

const bc = new BroadcastChannel('ffmpeg-draw-1');

self.buffer = [];

self.onmessage = (e) => {
    self.framerate =  e.data.framerate;
    self.yuvCanvas  = new YUVCanvas({
        width: e.data.width,
        height: e.data.height,
        contextOptions: {preserveDrawingBuffer: true},
        canvas: e.data.canvas
    });
};

function display(e) {
    if(isDefined(self.yuvCanvas)) {
        // update canvas size if frame size are changing
        if(self.yuvCanvas.width !== e.width || self.yuvCanvas.height !== e.height) {
            //re-create the canvas
            self.yuvCanvas.resize(e.width, e.height);
        }

        self.yuvCanvas.drawNextOuptutPictureGL({
            yData: e.yData,
            yDataPerRow: e.yDataPerRow,
            yRowCnt: e.yRowCnt,
            uData: e.uData,
            uDataPerRow: e.uDataPerRow,
            uRowCnt: e.uRowCnt,
            vData: e.vData,
            vDataPerRow: e.vDataPerRow,
            vRowCnt: e.vRowCnt,
            roll: e.roll
        });
    }
}

setInterval(() => {
    if (buffer.length > 1) {
        display(buffer.shift());
    }
}, 1000 / self.framerate);

bc.onmessage = (e) => {
    self.buffer.push(e.data);
};