import SensorWebApiFetchHandler from "../handler/SensorWebApiFetchHandler";
import {isDefined} from "../../utils/Utils";
import SensorWebApiDataStreamHandler from "../handler/SensorWebApiDataStreamHandler";
import SensorWebApiFetchJson from "../parsers/SensorWebApiFetchJson.parser";

let  dataSourceHandler;
const streamRegex = new RegExp('\\/(.*\\/)(.*)\\/observations'); // /datastreams/abc13/obs

self.onmessage = (event) => {
    if(event.data.message === 'init') {
        if(streamRegex.test(JSON.parse(event.data.properties).collection)) {
            dataSourceHandler = new SensorWebApiDataStreamHandler(new SensorWebApiFetchJson()); // should be stream handler
        } else {
            dataSourceHandler = new SensorWebApiFetchHandler();
        }
    }
    if(isDefined(dataSourceHandler)) {
        dataSourceHandler.handleMessage(event.data, self);
    }
}


