import SensorWebApiFetchHandler from "../handler/SweApiFetchHandler";

let  dataSourceHandler = new SensorWebApiFetchHandler();

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


