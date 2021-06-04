import AudioVisualizer from "./AudioVisualizer";

class AudioCanvasVisualizer extends AudioVisualizer {
    constructor(properties) {
        super(properties);
        this.initCanvas(properties);
    }

    // abstract
    draw(decodedSample) {}

    onended(decodedSample) {}

    initCanvas(properties) {
        const domNode = document.getElementById(properties.container);
        this.canvas = document.createElement("canvas");

        if(this.properties.hasOwnProperty('css')) {
            this.canvas.setAttribute("class",this.properties.css);
        }

        const bounds = domNode.getBoundingClientRect();
        this.canvas.setAttribute("width", bounds.width);
        this.canvas.setAttribute("height", bounds.height);
        domNode.appendChild(this.canvas);
        this.canvasCtx = this.canvas.getContext("2d");
    }
}

export default AudioCanvasVisualizer;
