import YUVCanvas from "../YUVCanvas";
import { isDefined } from "../../../../utils/Utils";
import { FFMPEG_VIEW_DECODE_TOPIC } from "../../../../Constants";
var bc;
self.buffer = [];
self.onmessage = function (e) {
    self.framerate = e.data.framerate;
    self.yuvCanvas = new YUVCanvas({
        width: e.data.width,
        height: e.data.height,
        contextOptions: { preserveDrawingBuffer: true },
        canvas: e.data.canvas
    });
    bc = new BroadcastChannel(FFMPEG_VIEW_DECODE_TOPIC + e.data.dataSourceId);
    bc.onmessage = function (e) {
        self.buffer.push(e.data);
    };
};
function display(e) {
    if (isDefined(self.yuvCanvas)) {
        // update canvas size if frame size are changing
        if (self.yuvCanvas.width !== e.width || self.yuvCanvas.height !== e.height) {
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
setInterval(function () {
    if (buffer.length > 1) {
        display(buffer.shift());
    }
}, 1000 / self.framerate);
function reset() {
    // clear canvas
    var nodata = new Uint8Array(1);
    self.yuvCanvas.drawNextOuptutPictureGL({
        yData: nodata,
        yDataPerRow: 1,
        yRowCnt: 1,
        uData: nodata,
        uDataPerRow: 1,
        uRowCnt: 1,
        vData: nodata,
        vDataPerRow: 1,
        vRowCnt: 1
    });
}
//# sourceMappingURL=ffmpeg.draw.worker.js.map