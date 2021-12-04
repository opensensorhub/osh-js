import SensorWebApiFetchJson from "../parsers/SensorWebApiFetchJson.parser";
import SensorWebApiStreamHandler from "../handler/SensorWebApiStreamHandler";

let dataSourceHandler = new SensorWebApiStreamHandler(new SensorWebApiFetchJson()); // should be stream handler

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


