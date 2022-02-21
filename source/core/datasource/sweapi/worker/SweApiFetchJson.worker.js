import SensorWebApiFetchHandler from "../handler/SweApiFetchHandler";
import SweApiFetchStreamJsonParser from "../parser/json/SweApiFetchJson.parser";
import SweApiFetchGenericJson from "../parser/json/SweApiFetchGenericJson.parser";

let  dataSourceHandler = new SensorWebApiFetchHandler(new SweApiFetchGenericJson());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


