import SweApiFetchMqttHandler from "../handler/SweApiFetchMqttHandler";
import SensorWebApiFetchJsonParser from "../parser/SweApiFetchJson.parser";

let dataSourceHandler = new SweApiFetchMqttHandler(new SensorWebApiFetchJsonParser()); // should be stream handler

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


