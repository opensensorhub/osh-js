import AudioCanvasVisualizer from "../AudioCanvasVisualizer";

/**
 * Class to visualize audio frequency using Native canvas drawing
 */
class AudioFrequencyCanvasVisualizer extends AudioCanvasVisualizer {
    /**
     * Class to visualize audio frequency using Native canvas drawing
     * @param {Object} [properties={}] - the properties of the visualizer
     * @param {number} [properties.fftSize=32] - The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency domain data.
     * @param {Object} [properties.barWidth=10] - bar width
     * @param {string} properties.container - The div element to attach to
     * @param {string} [properties.css=''] - The css classes to set, can be multiple if separate by spaces
     */
    constructor(properties) {
        super({
            barWidth:10,
            fftSize: 32,
            ...properties,
            type: 'frequency',
            format: 'float'
        });
    }

    draw(decodedSample) {
        this.decodedSample = decodedSample;
        this.sampleNumber++;
    }

    render() {
        const dataArray = this.decodedSample[this.properties.type][this.properties.format];
        try {
            const WIDTH = this.canvas.width;
            const HEIGHT = this.canvas.height;

            this.canvasCtx.fillStyle = 'rgba(221,221,221,0.8)';
            this.canvasCtx.fillStyle = 'rgb(255,255,255)';
            this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            // let  barWidth = (WIDTH / bufferLength) * 2.5;
            // TODO: handle too small WIDTH
            let barWidth = this.properties.barWidth;
            let spaceWidth = (WIDTH / (dataArray.length+1)) - barWidth;
            let barHeight;
            let x = barWidth;

            for(let i = 0; i < dataArray.length; i++) {
                barHeight = 100 - dataArray[i] * -1;
                barHeight = HEIGHT * barHeight / 100;

                this.canvasCtx.fillStyle = 'rgb(215,215,215)';
                this.canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, HEIGHT );

                this.canvasCtx.fillStyle = 'rgba(34,34,34,0.8)';
                this.canvasCtx.beginPath();
                this.canvasCtx.rect(x, HEIGHT - barHeight, barWidth, HEIGHT );
                this.canvasCtx.stroke();

                x += barWidth + spaceWidth;
            }

            this.canvasCtx.fillStyle = 'rgba(198,198,198,0.8)';
            this.canvasCtx.fillRect(0, 0, 1, HEIGHT);
            this.canvasCtx.fillRect(0, HEIGHT-1, WIDTH, 1);
        }catch (error) {
            console.error(error);
        }
    }
}

export default AudioFrequencyCanvasVisualizer;
