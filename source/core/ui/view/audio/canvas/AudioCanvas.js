class AudioCanvas  {
    constructor(properties) {
        this.initCanvas(properties);
    }

    // abstract
    draw(decodedSample) {}

    initCanvas(properties) {
        let domNode = properties.nodeElement;
        const bounds = domNode.getBoundingClientRect();

        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("width",bounds.width);
        this.canvas.setAttribute("height",bounds.height);

        domNode.appendChild(this.canvas);
        this.canvasCtx = this.canvas.getContext("2d");
    }
}

export default AudioCanvas;
