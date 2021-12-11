import SensorWebApiFetchHandler from "../handler/SensorWebApiFetchHandler";
import SensorWebApiFetchVideo from "../parsers/sensorwebapi/SensorWebApiFetchVideo.parser";

let  dataSourceHandler = new SensorWebApiFetchHandler(new SensorWebApiFetchVideo());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


