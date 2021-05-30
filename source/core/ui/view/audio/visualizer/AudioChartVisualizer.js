import AudioCanvasVisualizer from "./AudioCanvasVisualizer";

class AudioChartVisualizer extends AudioCanvasVisualizer {
    constructor(properties) {
        super(properties);
    }

    parseDate(intTimeStamp) {
        const date = new Date(intTimeStamp);
        return this.withLeadingZeros(date.getUTCHours()) + ":" + this.withLeadingZeros(date.getUTCMinutes()) + ":"
            + this.withLeadingZeros(date.getUTCSeconds());
    }

    withLeadingZeros(dt) {
        return (dt < 10 ? '0' : '') + dt;
    }

    reset() {
        this.resetting = true;
        this.chart.stop();
        this.chart.data.labels = [];
        this.chart.data.datasets.forEach( dataset => dataset.data = []);
        this.chart.update(0);
        this.resetting = false;
        // this.chart.data.datasets = [];
        // this.chart.update();
    }

    onended() {}
}

export default  AudioChartVisualizer;
