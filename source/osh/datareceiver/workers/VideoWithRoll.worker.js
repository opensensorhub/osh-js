import DataSourceHandler from './DataSourceHandler.js';
import VideoWithRollParser from "../parsers/VideoWithRoll.parser";

const dataSourceHandler = new DataSourceHandler(new VideoWithRollParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, this);
}


