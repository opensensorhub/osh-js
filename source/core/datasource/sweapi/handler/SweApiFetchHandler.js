import TimeSeriesDataSourceHandler from "../../handler/TimeSeriesDataSourceHandler";
import DataStreams from "../../../sweapi/datastream/DataStreams";
import Systems from "../../../sweapi/system/Systems";
import FeatureOfInterests from "../../../sweapi/featureofinterest/FeatureOfInterests";
import {isDefined} from "../../../utils/Utils";
import {EventType} from "../../../event/EventType";
import Observations from "../../../sweapi/observation/Observations";
import SystemFilter from "../../../sweapi/system/SystemFilter";
import FeatureOfInterestFilter from "../../../sweapi/featureofinterest/FeatureOfInterestFilter";
import DataStreamFilter from "../../../sweapi/datastream/DataStreamFilter";
import DataStream from "../../../sweapi/datastream/DataStream";
import ObservationFilter from "../../../sweapi/observation/ObservationFilter";

class SensorWebApiFetchApiHandler  extends TimeSeriesDataSourceHandler {
    constructor(parser) {
        super(parser);
    }

    async updateAferCreatingConnector(properties) {
        const networkProperties = {
            ...properties,
            connector: this.connector
        };

        let collection;
        let filter;

        let stream = this.properties.protocol === 'mqtt' || this.properties.protocol === 'ws';

        // check if is a collection
        if (this.properties.collection === '/systems') {
            filter = this.createSystemFilter(properties);
            collection = new Systems(networkProperties).searchSystems(filter, properties.batchSize);
        } else if (this.properties.collection === '/fois') {
            filter = this.createFeatureOfInterestFilter(properties);
            collection = new FeatureOfInterests(networkProperties).searchFeaturesOfInterest(filter, properties.batchSize);
        } else if (this.properties.collection.startsWith('/datastreams')) {
            filter = this.createDataStreamFilter(properties);

            const regex = new RegExp('\\/(.*\\/)(.*)\\/observations'); // /datastreams/abc13/observations
            if(regex.test(this.properties.collection)) {
                filter = this.createObservationFilter(properties);
                // is observation streaming
                const match = regex.exec(this.properties.collection);
                let apiObject = new DataStream({
                    id: match[2]
                }, networkProperties);
                if(stream) {
                   // apiObject.streamObservations(filter, this.onMessage.bind(this));
                    this.streamObject = apiObject;
                } else {
                    collection = apiObject.searchObservations(filter, properties.batchSize);
                }
            } else {
                collection = new DataStreams(networkProperties).searchDataStreams(filter, properties.batchSize);
            }
        } else if (this.properties.collection === '/observations') {
            collection = new Observations(networkProperties).searchObservations();
        }

        if(stream) {
            await this.setupStream(collection);
        } else {
            await this.setupNonStream(collection);
        }

        this.filter = filter;
    }

    async setupStream(collection) {
        this.connect = this.connectStream;
    }

    async setupNonStream(collection) {
        this.collection = await collection;
        this.onMessage = this.onMessageNonStream;
    }

    async connectStream() {
        this.streamObject.streamObservations(this.filter, this.onMessage.bind(this));
    }

    // connect non stream object
    async connect() {
        if (isDefined(this.collection)) {
            while (this.collection.hasNext()) {
                const values = await this.collection.nextPage();
                await this.onMessage(values);
            }
        }
    }

    onMessageNonStream(values){
        this.broadcastChannel.postMessage({
            dataSourceId: this.dataSourceId,
            type: EventType.DATA,
            values: [...values]
        });
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
            if(isDefined(properties.startTime)) {
                props.phenomenonTime = properties.startTime + '/'+ properties.endTime;
            }
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
            if(isDefined(properties.startTime)) {
                props.phenomenonTime = properties.startTime + '/'+ properties.endTime;
            }
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
        if(isDefined(properties.replaySpeed)) {
            props.replaySpeed = properties.replaySpeed;
        }
        if(isDefined(properties.startTime)) {
            props.phenomenonTime = properties.startTime + '/'+ properties.endTime;
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

        return new ObservationFilter(props);
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
            if(isDefined(properties.startTime)) {
                props.phenomenonTime = properties.startTime + '/'+ properties.endTime;
            }
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
}
export default SensorWebApiFetchApiHandler;

