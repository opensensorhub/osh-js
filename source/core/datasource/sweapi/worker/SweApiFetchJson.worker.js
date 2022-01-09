import SensorWebApiFetchHandler from "../handler/SweApiFetchHandler";
import SweApiFetchStreamJsonParser from "../parser/json/SweApiFetchStreamJson.parser";

let  dataSourceHandler = new SensorWebApiFetchHandler(new SweApiFetchStreamJsonParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


