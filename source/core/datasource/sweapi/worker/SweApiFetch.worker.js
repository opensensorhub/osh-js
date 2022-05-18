import SensorWebApiFetchHandler from "../handler/SweApiFetchHandler";
import SweApiResultParser from "../parser/observations/SweApiResult.parser";

let  dataSourceHandler = new SensorWebApiFetchHandler(new SweApiResultParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


