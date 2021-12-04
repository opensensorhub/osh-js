import TimeSeriesDataSourceHandler from "./TimeSeriesDataSourceHandler";
import DataStream from "../../sensorwebapi/api/datastream/DataStream";
import ObservationFilter from "../../sensorwebapi/api/observation/ObservationFilter";
import MqttConnector from "../../protocol/MqttConnector";
import SensorWebApiDataStreamParser from "../parsers/SensorWebApiDataStream.parser";
import SensorWebApiFetchJson from "../parsers/SensorWebApiFetchJson.parser";
import SweApiMqttJsonParser from "../parsers/SweApiMqttJson.parser";

class SensorWebApiStreamHandler extends TimeSeriesDataSourceHandler {
    constructor() {
        super();
    }

    async createDataConnector(properties, connector) {
        let parser;

        if(properties.protocol === 'mqtt') {
            const tls = (properties.tls) ? 's' : '';
            const url = properties.protocol + tls + '://' + properties.endpointUrl;
            super.createDataConnector(properties, new MqttConnector(url,properties));
            this.parser = new SweApiMqttJsonParser();
        } else {
            super.createDataConnector(properties, connector);
            this.parser = new SensorWebApiFetchJson();
        }

        const networkProperties = {
            ...properties,
            connector: this.connector
        };

        // create parser depending on protocol
        // MQTT has a special parser
        // TODO: handle MQTT protocol
        const streamRegex = new RegExp('\\/(.*\\/)(.*)\\/observations'); // /datastreams/abc13/observations
        const match = streamRegex.exec(this.properties.collection);

        // check if is a collection
        this.sensorWebApiStream = new DataStream({
            id: match[2]
        }, networkProperties);

        //TODO create filter

        this.observationFilter = new ObservationFilter();
    }

    async connect() {
        this.sensorWebApiStream.streamObservations(this.observationFilter, this.onMessage.bind(this));
    }
}
export default SensorWebApiStreamHandler;

