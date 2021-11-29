import MqttDataSourceHandler from "../handler/MqttDataSourceHandler";
import SensorWebApiFetchJson from "../../../core/datasource/parsers/SensorWebApiFetchJson.parser";
import SensorWebApiFetchHandler from "../../../core/datasource/handler/SensorWebApiFetchHandler";
import {isDefined} from "../../../core/utils/Utils";
import MqttSensorWebApiDataStreamHandler from "../handler/SensorWebApiDataStreamMqttHandler";

let  dataSourceHandler;
const streamRegex = new RegExp('\\/(.*\\/)(.*)\\/observations'); // /datastreams/abc13/obs

self.onmessage = (event) => {
    if(event.data.message === 'init') {
        if(streamRegex.test(JSON.parse(event.data.properties).collection)) {
            dataSourceHandler = new MqttSensorWebApiDataStreamHandler(new SensorWebApiFetchJson()); // should be stream handler
        } else {
            dataSourceHandler = new SensorWebApiFetchHandler();
        }
    }
    if(isDefined(dataSourceHandler)) {
        dataSourceHandler.handleMessage(event.data, self);
    }
}


