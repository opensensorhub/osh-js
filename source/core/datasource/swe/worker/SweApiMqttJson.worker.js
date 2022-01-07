import SweApiFetchMqttHandler from "../handler/SweApiFetchMqttHandler";
import SweApiFetchStreamJsonParser from "../parser/SweApiFetchStreamJson.parser";

const dataSourceHandler = new SweApiFetchMqttHandler(new SweApiFetchStreamJsonParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};
