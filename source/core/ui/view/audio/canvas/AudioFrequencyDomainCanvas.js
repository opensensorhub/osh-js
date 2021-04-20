import AudioCanvas from "./AudioCanvas";

class AudioFrequencyDomainCanvas extends AudioCanvas {
    constructor(properties) {
        super({
            props: {
                barWidth:10
            },
            ...properties
        });
    }

    draw(decodedSample) {
        const dataArray = decodedSample.dataFreqDomainArray;
        try {
            const WIDTH = this.canvas.width;
            const HEIGHT = this.canvas.height;

            this.canvasCtx.fillStyle = 'rgba(221,221,221,0.8)';
            this.canvasCtx.fillStyle = 'rgb(255,255,255)';
            this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            // let  barWidth = (WIDTH / bufferLength) * 2.5;
            // TODO: handle too small WIDTH
            let barWidth = this.properties.props.barWidth;
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

export default AudioFrequencyDomainCanvas;
