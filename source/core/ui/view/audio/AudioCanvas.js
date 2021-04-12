import AudioView from "./AudioView";

class AudioCanvas extends AudioView {
    constructor(properties) {
        super(properties);
        this.initCanvas();
    }

    // abstract
    draw(decodedSample) {}

    initCanvas() {
        let domNode = document.getElementById(this.divId);
        const bounds = domNode.getBoundingClientRect();

        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("width",bounds.width);
        this.canvas.setAttribute("height",bounds.height);

        domNode.appendChild(this.canvas);
        this.canvasCtx = this.canvas.getContext("2d");
    }
}

export default AudioCanvas;
