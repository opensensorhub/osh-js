import SensorWebApiFetchHandler from "../handler/SensorWebApiFetchHandler";
import SensorWebApiFetchJsonParser from "../parsers/SensorWebApiFetchJson.parser";

let  dataSourceHandler = new SensorWebApiFetchHandler(new SensorWebApiFetchJsonParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


