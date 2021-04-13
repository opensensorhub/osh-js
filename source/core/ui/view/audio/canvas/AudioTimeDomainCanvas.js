import AudioCanvas from "./AudioCanvas";

class AudioTimeDomainCanvas extends AudioCanvas {
    constructor(properties) {
        super({
            props: {
                barWidth:10
            },
            ...properties
        });
    }

    draw(decodedSample) {
        const dataArray = decodedSample.dataTimeDomainArray;
        try {

            const WIDTH = this.canvas.width;
            const HEIGHT = this.canvas.height + (25*100/this.canvas.height);

            this.canvasCtx.fillStyle = 'rgb(200, 200, 200)';
            this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            this.canvasCtx.lineWidth = 2;
            this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

            this.canvasCtx.beginPath();

            let sliceWidth = WIDTH / dataArray.length;
            let x = 0;

            for (let i = 0; i < dataArray.length; i++) {

                let v = dataArray[i];
                let y = v * HEIGHT + HEIGHT/2;

                if (i === 0) {
                    this.canvasCtx.moveTo(x, y);
                } else {
                    this.canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            this.canvasCtx.lineTo(WIDTH, HEIGHT / 2);
            this.canvasCtx.stroke();
        }catch (error) {
            console.error(error);
        }
    }
}

export default AudioTimeDomainCanvas;
