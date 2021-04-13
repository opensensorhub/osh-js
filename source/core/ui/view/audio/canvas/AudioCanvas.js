class AudioCanvas  {
    constructor(properties) {
        this.properties = properties;
        this.initCanvas(properties);
    }

    // abstract
    draw(decodedSample) {}

    onended(decodedSample) {}

    initCanvas(properties) {
        let domNode = properties.nodeElement;
        this.canvas = document.createElement("canvas");

        if(this.properties.props.hasOwnProperty('css')) {
            this.canvas.setAttribute("class",this.properties.props.css);
        }
        const bounds = domNode.getBoundingClientRect();
        this.canvas.setAttribute("width", bounds.width);
        this.canvas.setAttribute("height", bounds.height);
        domNode.appendChild(this.canvas);
        this.canvasCtx = this.canvas.getContext("2d");
    }
}

export default AudioCanvas;
