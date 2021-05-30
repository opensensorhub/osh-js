import {isDefined, randomUUID} from "../../../../utils/Utils";
import AudioTimeDomainChartJs from "../chart/AudioTimeDomainChartJs";

class AudioSpectrogram {
    constructor(properties) {
        this.initFrequencySpectrogram(properties);
    }

    initFrequencySpectrogram(properties) {

        let domNode = properties.nodeElement;

        let canvas = document.createElement("canvas");
        canvas.setAttribute("id", randomUUID());
        canvas.setAttribute("class", properties.props.css);
        canvas.setAttribute("width", "1024");
        canvas.setAttribute("height", "1024");

        domNode.appendChild(canvas);

        this.bufferSize = 1024;
        this.height = canvas.height;
        this.width  = canvas.width;
        this.x = 0;

        this.ctx = canvas.getContext('2d');
        this.imageData = this.ctx.getImageData(0, 0, this.width, this.height);

        this.buf = new ArrayBuffer(this.imageData.data.length);
        this.data32 = new Uint32Array(this.buf);
        this.data = this.imageData.data;
        this.buf8 = new Uint8ClampedArray(this.buf);
    }

    draw(decodedSample) {
        const length = decodedSample.dataFreqDomainArray.length;

        const dataBuffer = new Float32Array(length);
        // Reverse the direction, making lower frequencies on the bottom.
        for (var i = length - 1; i >= 0; i--) {
            dataBuffer[i] = (decodedSample.dataFreqDomainArray[length - 1 - i])* -1 / 255.0 ;
        }
        const colorData = this.colorizeData(dataBuffer)
        this.addColumn(colorData);
        this.imageData.data.set(this.buf8);
        this.ctx.putImageData(this.imageData, 0, 0);
    }

    setPixel(x, y, red, green, blue, alpha) {
        this.data32[y * this.width + x] =
            (alpha << 24) |    // alpha
            (blue << 16) |      // blue
            (green <<  8) |     // green
            red;                // red
    }

    addColumn(colorizeData) {
        for (let y = 0; y < this.height; y++) {
            this.setPixel(this.x, y, colorizeData[4 * y + 0], colorizeData[4 * y + 1], colorizeData[4 * y + 2], colorizeData[4 * y + 3]);
        }
        this.x++;
        this.x %= this.width;
    }

    color(value) {
        const rgb = {R: 0, G: 0, B: 0};

        if (0 <= value && value <= 1 / 8) {
            rgb.R = 0;
            rgb.G = 0;
            rgb.B = 4 * value + .5; // .5 - 1 // b = 1/2
        } else if (1 / 8 < value && value <= 3 / 8) {
            rgb.R = 0;
            rgb.G = 4 * value - .5; // 0 - 1 // b = - 1/2
            rgb.B = 0;
        } else if (3 / 8 < value && value <= 5 / 8) {
            rgb.R = 4*value - 1.5; // 0 - 1 // b = - 3/2
            rgb.G = 1;
            rgb.B = -4 * value + 2.5; // 1 - 0 // b = 5/2
        } else if (5 / 8 < value && value <= 7 / 8) {
            rgb.R = 1;
            rgb.G = -4 * value + 3.5; // 1 - 0 // b = 7/2
            rgb.B = 0;
        } else if (7 / 8 < value && value <= 1) {
            rgb.R = -4*value + 4.5; // 1 - .5 // b = 9/2
            rgb.G = 0;
            rgb.B = 0;
        } else {    // should never happen - value > 1
            rgb.R = .5;
            rgb.G = 0;
            rgb.B = 0;
        }

        return [rgb.R, rgb.G, rgb.B, 1].map((d)  => { return parseInt(d * 255, 10)})
    }

    colorizeData(data) {
        console.log(data);
        const colorData = new Uint8Array(4 * this.bufferSize / 2);
        for(let i = 0, n = data.length; i < n; i++) {
            colorData.set(this.color(data[i]), i * 4);
        }

        return colorData;
    }
    onended() {}
    reset() {}
}

export default AudioSpectrogram;
