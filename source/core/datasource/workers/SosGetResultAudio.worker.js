import SosGetResultAudioParser from '../parsers/SosGetResultAudio.parser.js';
import TimeSeriesDataSourceHandler from "./TimeSeriesDataSourceHandler";

const dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultAudioParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


