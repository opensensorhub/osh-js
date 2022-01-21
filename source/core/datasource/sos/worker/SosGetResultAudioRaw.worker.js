import SosGetResultAudioRawParser from '../parser/SosGetResultAudioRaw.parser.js';
import TimeSeriesDataSourceHandler from "../../handler/TimeSeriesDataSourceHandler";

const dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultAudioRawParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


