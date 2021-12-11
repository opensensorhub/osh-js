import SosGetResultAudioParser from '../parsers/sos/SosGetResultAudio.parser.js';
import TimeSeriesDataSourceHandler from "../handler/TimeSeriesDataSourceHandler";

const dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultAudioParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


