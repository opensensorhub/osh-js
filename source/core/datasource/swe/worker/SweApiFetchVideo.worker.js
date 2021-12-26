import SensorWebApiFetchHandler from "../handler/SweApiFetchHandler";
import SensorWebApiFetchVideo from "../parser/SweApiFetchVideo.parser";

let  dataSourceHandler = new SensorWebApiFetchHandler(new SensorWebApiFetchVideo());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


