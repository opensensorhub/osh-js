import TimeSeriesDataSourceHandler from "./TimeSeriesDataSourceHandler";
import DataStreams from "../../sensorwebapi/api/datastream/DataStreams";
import Systems from "../../sensorwebapi/api/system/Systems";
import FeatureOfInterests from "../../sensorwebapi/api/featureofinterest/FeatureOfInterests";
import {isDefined} from "../../utils/Utils";
import {EventType} from "../../event/EventType";
import Observations from "../../sensorwebapi/api/observation/Observations";

class SensorWebApiFetchApiHandler  extends TimeSeriesDataSourceHandler {
    constructor() {
        super();
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

        let collection;
        let sensorWebApi;

        // create parser depending on protocol
        // MQTT has a special parser
        // TODO: handle MQTT protocol

        // check if is a collection
        if (this.properties.collection === '/systems') {
            sensorWebApi = new Systems(networkProperties);
            collection = sensorWebApi.searchSystems();
        } else if (this.properties.collection === '/fois') {
            sensorWebApi = new FeatureOfInterests(networkProperties);
            collection = sensorWebApi.searchFeaturesOfInterest();
        } else if (this.properties.collection === '/datastreams') {
            sensorWebApi = new DataStreams(networkProperties);
            collection = sensorWebApi.searchDataStreams();
        } else if (this.properties.collection === '/observations') {
            sensorWebApi = new Observations(networkProperties);
            collection = sensorWebApi.searchObservations();
        }

        this.collection = await collection;
        this.parser = sensorWebApi.parser;
    }

    async connect() {
        if (isDefined(this.collection)) {
            while (this.collection.hasNext()) {
                const values = await this.collection.nextPage();
                this.onMessage(values.map(v => v.properties));
            }
        }
    }

    onMessage(values){
        this.broadcastChannel.postMessage({
            dataSourceId: this.dataSourceId,
            type: EventType.DATA,
            values: [...values]
        });
    }
}
export default SensorWebApiFetchApiHandler;

