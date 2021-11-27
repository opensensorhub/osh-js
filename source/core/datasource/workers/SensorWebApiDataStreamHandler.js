import TimeSeriesDataSourceHandler from "./TimeSeriesDataSourceHandler";
import DataStreams from "../../sensorwebapi/api/datastream/DataStreams";
import Systems from "../../sensorwebapi/api/system/Systems";
import FeatureOfInterests from "../../sensorwebapi/api/featureofinterest/FeatureOfInterests";
import Observations from "../../sensorwebapi/api/observation/Observations";
import {isDefined} from "../../utils/Utils";
import {EventType} from "../../event/EventType";
import DataStream from "../../sensorwebapi/api/datastream/DataStream";
import ObservationFilter from "../../sensorwebapi/api/observation/ObservationFilter";

class SensorWebApiDataStreamHandler extends TimeSeriesDataSourceHandler {
    constructor(parser) {
        super(parser);
    }

    async createDataConnector(properties) {
        super.createDataConnector(properties);

        const networkProperties = {
            info: {
                connector: this.connector
            },
            stream: {
                connector: this.connector
            }
        };

        // create parser depending on protocol
        // MQTT has a special parser
        // TODO: handle MQTT protocol
        const streamRegex = new RegExp('\\/(.*\\/)(.*)\\/observations'); // /datastreams/abc13/observations
        const match = streamRegex.exec(this.properties.collection);

        // check if is a collection
        this.sensorWebApiStream = new DataStream({
            id: match[2]
        },networkProperties);

        //TODO create filter

        this.observationFilter = new ObservationFilter();
    }

    async connect() {
        this.sensorWebApiStream.streamObservations(this.observationFilter, this.onMessage.bind(this));
    }
}
export default SensorWebApiDataStreamHandler;

