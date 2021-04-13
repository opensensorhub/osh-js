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

            this.canvasCtx.fillStyle = 'rgb(200, 200, 200)';
            this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            // let  barWidth = (WIDTH / bufferLength) * 2.5;
            // TODO: handle too small WIDTH
            let barWidth = this.properties.props.barWidth;
            let spaceWidth = (WIDTH / (dataArray.length+1)) - barWidth;
            let barHeight;
            let x = barWidth;

            for(let i = 0; i < dataArray.length; i++) {
                barHeight = dataArray[i]  + 128;

                this.canvasCtx.fillStyle = 'rgb(' + barHeight*2+ ',200,200)';
                this.canvasCtx.fillRect(x, HEIGHT - barHeight , barWidth, barHeight );

                // console.log(HEIGHT - barHeight / 2, barWidth, barHeight / 2)
                x += barWidth + spaceWidth;
            }
        }catch (error) {
            console.error(error);
        }
    }
}

export default AudioFrequencyDomainCanvas;
