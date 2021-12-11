import SensorWebApiFetchHandler from "../handler/SensorWebApiFetchHandler";

let  dataSourceHandler = new SensorWebApiFetchHandler();

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


