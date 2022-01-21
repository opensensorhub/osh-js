import SosGetResultAudioRawParser from '../parsers/SosGetResultAudioRaw.parser.js';
import TimeSeriesDataSourceHandler from "./TimeSeriesDataSourceHandler";

const dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultAudioRawParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}