import TimeSeriesDataSourceHandler from "./TimeSeriesDataSourceHandler";
import DataStreams from "../../sensorwebapi/api/datastream/DataStreams";
import Systems from "../../sensorwebapi/api/system/Systems";
import FeatureOfInterests from "../../sensorwebapi/api/featureofinterest/FeatureOfInterests";
import {isDefined} from "../../utils/Utils";
import {EventType} from "../../event/EventType";
import Observations from "../../sensorwebapi/api/observation/Observations";
import SystemFilter from "../../sensorwebapi/api/system/SystemFilter";
import FeatureOfInterestFilter from "../../sensorwebapi/api/featureofinterest/FeatureOfInterestFilter";
import DataStreamFilter from "../../sensorwebapi/api/datastream/DataStreamFilter";

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
        let filter;

        // create parser depending on protocol
        // MQTT has a special parser
        // TODO: handle MQTT protocol

        // check if is a collection
        if (this.properties.collection === '/systems') {
            sensorWebApi = new Systems(networkProperties);
            filter = this.createSystemFilter(properties);
            collection = sensorWebApi.searchSystems(filter,  properties.batchSize);
        } else if (this.properties.collection === '/fois') {
            sensorWebApi = new FeatureOfInterests(networkProperties);
            filter = this.createFeatureOfInterestFilter(properties);
            collection = sensorWebApi.searchFeaturesOfInterest(filter,  properties.batchSize);
        } else if (this.properties.collection === '/datastreams') {
            sensorWebApi = new DataStreams(networkProperties);
            filter = this.createDataStreamFilter(properties);
            collection = sensorWebApi.searchDataStreams(filter,  properties.batchSize);
        } else if (this.properties.collection === '/observations') {
            sensorWebApi = new Observations(networkProperties);
            collection = sensorWebApi.searchObservations();
        }

        this.collection = await collection;
        this.parser = sensorWebApi.parser;
        this.filter = filter;
    }

    createSystemFilter(properties) {
       const props = {};
        if(isDefined(properties.keywords)) {
            props.q = properties.keywords;
        }
        if(isDefined(properties.roi)) {
            props.location = props.roi;
        }
        if(isDefined(properties.parentId)) {
            props.parent = properties.parentId;
        }
        if(isDefined(properties.responseFormat)) {
            props.format = properties.responseFormat;
        }
        if(isDefined(properties.validTime)) {
            props.validTime = properties.validTime;
        }
        if(isDefined(properties.phenomenonTime)) {
            props.phenomenonTime = properties.phenomenonTime;
        }
        if(isDefined(properties.resultTime)) {
            props.resultTime = properties.resultTime;
        }
        if(isDefined(properties.excludedProps)) {
            props.select = properties.excludedProps.map(e => '!' + e);
        }
        if(isDefined(properties.includedProps)) {
            if(!isDefined(props.select)) {
                props.select = [];
            }
            props.select.concat(properties.includedProps);
        }

        return new SystemFilter(props);
    }

    createFeatureOfInterestFilter(properties) {
        const props = {};
        if(isDefined(properties.keywords)) {
            props.q = properties.keywords;
        }
        if(isDefined(properties.roi)) {
            props.location = props.roi;
        }
        if(isDefined(properties.parentId)) {
            props.parent = properties.parentId;
        }
        if(isDefined(properties.responseFormat)) {
            props.format = properties.responseFormat;
        }
        if(isDefined(properties.validTime)) {
            props.validTime = properties.validTime;
        }
        if(isDefined(properties.phenomenonTime)) {
            props.phenomenonTime = properties.phenomenonTime;
        }
        if(isDefined(properties.resultTime)) {
            props.resultTime = properties.resultTime;
        }
        if(isDefined(properties.excludedProps)) {
            props.select = properties.excludedProps.map(e => '!' + e);
        }
        if(isDefined(properties.includedProps)) {
            if(!isDefined(props.select)) {
                props.select = [];
            }
            props.select.concat(properties.includedProps);
        }

        return new FeatureOfInterestFilter(props);
    }

    createObservationFilter(properties) {
        const props = {};
        if(isDefined(properties.roi)) {
            props.location = props.roi;
        }
        if(isDefined(properties.responseFormat)) {
            props.format = properties.responseFormat;
        }
        if(isDefined(properties.phenomenonTime)) {
            props.phenomenonTime = properties.phenomenonTime;
        }
        if(isDefined(properties.resultTime)) {
            props.resultTime = properties.resultTime;
        }
        if(isDefined(properties.resultTime)) {
            props.resultTime = properties.resultTime;
        }
        if(isDefined(properties.featureOfInterest)) {
            props.featureOfInterest = properties.featureOfInterest;
        }
        if(isDefined(properties.excludedProps)) {
            props.select = properties.excludedProps.map(e => '!' + e);
        }
        if(isDefined(properties.includedProps)) {
            if(!isDefined(props.select)) {
                props.select = [];
            }
            props.select.concat(properties.includedProps);
        }

        return new FeatureOfInterestFilter(props);
    }

    createDataStreamFilter(properties) {
        const props = {};
        if(isDefined(properties.keywords)) {
            props.q = properties.keywords;
        }
        if(isDefined(properties.roi)) {
            props.location = props.roi;
        }
        if(isDefined(properties.responseFormat)) {
            props.format = properties.responseFormat;
        }
        if(isDefined(properties.phenomenonTime)) {
            props.phenomenonTime = properties.phenomenonTime;
        }
        if(isDefined(properties.resultTime)) {
            props.resultTime = properties.resultTime;
        }
        if(isDefined(properties.observedProperty)) {
            props.observedProperty = properties.observedProperty;
        }
        if(isDefined(properties.featureOfInterest)) {
            props.featureOfInterest = properties.featureOfInterest;
        }
        if(isDefined(properties.excludedProps)) {
            props.select = properties.excludedProps.map(e => '!' + e);
        }
        if(isDefined(properties.includedProps)) {
            if(!isDefined(props.select)) {
                props.select = [];
            }
            props.select.concat(properties.includedProps);
        }

        return new DataStreamFilter(props);
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

