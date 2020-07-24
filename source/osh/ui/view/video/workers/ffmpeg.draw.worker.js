import YUVCanvas from "../YUVCanvas";
import {isDefined} from "../../../../utils/Utils";

const bc = new BroadcastChannel('ffmpeg-draw-1');

self.buffer = [];

self.onmessage = (e) => {
    self.yuvCanvas  = new YUVCanvas({
        width: e.data.width,
        height: e.data.height,
        contextOptions: {preserveDrawingBuffer: true},
        canvas: e.data.canvas
    });
};

function display(e) {
    if(isDefined(self.yuvCanvas)) {
        //TODO: reseive auto width/heigth if needed
        self.yuvCanvas.canvasElement.drawing = true;
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
            roll: 0
        });
        self.yuvCanvas.canvasElement.drawing = false;
    }
}

setInterval(() => {
    if (buffer.length > 1) {
        display(buffer.shift());
    }
}, 1000 / 25.0);

bc.onmessage = (e) => {
    self.buffer.push(e.data);
};