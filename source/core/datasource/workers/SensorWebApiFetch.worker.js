import SensorWebApiFetchHandler from "./SensorWebApiFetchHandler";

const dataSourceHandler = new SensorWebApiFetchHandler();

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


