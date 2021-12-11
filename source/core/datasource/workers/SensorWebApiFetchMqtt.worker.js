import SensorWebApiFetchMqttHandler from "../handler/SensorWebApiFetchMqttHandler";
import SensorWebApiFetchJsonParser from "../parsers/sensorwebapi/SensorWebApiFetchJson.parser";

let dataSourceHandler = new SensorWebApiFetchMqttHandler(new SensorWebApiFetchJsonParser()); // should be stream handler

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


