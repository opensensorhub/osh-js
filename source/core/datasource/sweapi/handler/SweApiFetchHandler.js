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
import CommandFilter from "../../../sweapi/command/CommandFilter";
import ControlFilter from "../../../sweapi/control/ControlFilter";
import Control from "../../../sweapi/control/Control";

class SensorWebApiFetchApiHandler  extends TimeSeriesDataSourceHandler {
    constructor(parser) {
        super(parser);
    }

    async updateState() {
        await super.updateState();
        await this.initSweApi();
    }
    async updateProperties(properties) {
        await super.updateProperties(properties);
        await this.initSweApi();
    }

    async initSweApi() {
        const networkProperties = {
            ...this.properties,
            connector: this.connector
        };

        let collection;
        let filter;

        let stream = this.properties.protocol === 'mqtt'
                    || this.properties.protocol === 'ws'
        ;

        // check if is a collection
         if(/^(.*)\/systems/.test(this.properties.collection)){
            const systems = new Systems(networkProperties);
            //
            filter = this.createSystemFilter(this.properties);
            const regex = new RegExp('\\/systems\\/(.*)\\/controls\\/(.*)\\/status');
            // stream status
            if(regex.test(this.properties.collection)) {
                filter = this.createControlFilter(this.properties);
                // is observation streaming
                const match = regex.exec(this.properties.collection);

                let apiObject = new Control({
                    id: match[2],
                    'system@id':match[1]
                }, networkProperties);

                if(stream) {
                    this.streamObject = apiObject;
                } else {
                    collection = apiObject.searchStatus(filter, this.properties.batchSize);
                }
            } else {
                collection = systems.searchSystems(filter, this.properties.batchSize);
            }
        } else if(/^(.*)\/fois/.test(this.properties.collection)){
            filter = this.createFeatureOfInterestFilter(this.properties);
            collection = new FeatureOfInterests(networkProperties).searchFeaturesOfInterest(filter, this.properties.batchSize);
        } else if(/^(.*)\/datastreams/.test(this.properties.collection)){
            filter = this.createDataStreamFilter(this.properties);

            const regex = new RegExp('\\/(.*\\/)(.*)\\/observations'); // /datastreams/abc13/observations
            if(regex.test(this.properties.collection)) {
                filter = this.createObservationFilter(this.properties);
                // is observation streaming
                const match = regex.exec(this.properties.collection);
                let apiObject = new DataStream({
                    id: match[2]
                }, networkProperties);
                if(stream) {
                   // apiObject.streamObservations(filter, this.onMessage.bind(this));
                    this.streamObject = apiObject;
                } else {
                    collection = apiObject.searchObservations(filter, this.properties.batchSize);
                }
            } else {
                collection = new DataStreams(networkProperties).searchDataStreams(filter, this.properties.batchSize);
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

    getQueryString(properties) {
        this.filter.props.phenomenonTime = this.state.getStartTime() + '/' + this.state.getEndTime();
        return this.filter.toQueryString();
    }

    async setupStream(collection) {
        this.connect = this.connectStream;
    }

    async setupNonStream(collection) {
        this.collection = await collection;
        this.onMessage = this.onMessageNonStream;
    }

    handleMessages(messages, format) {
        if (format === 'application/om+json') {
            let results = [];
            for(let message of messages) {
                results.push({
                    timestamp: message.timestamp,
                    ...message.result
                })
            }
            return results;
        } else {
            return messages;
        }
    }
    async connectStream() {
        if(this.streamObject instanceof DataStream) {
            this.streamObject.streamObservations(this.filter, (messages) => {
                // the onMessage needs to send data result only. If the content of the record contains
                // time + result, we need to pass only result.
                // TODO: This would be handled automatically by parsers?
                this.onMessage(this.handleMessages(messages, this.filter.props.format));
            });
        } else if(this.streamObject instanceof Control) {
            this.streamObject.streamStatus(this.filter, (messages) => {
                // the onMessage needs to send data result only. If the content of the record contains
                // time + result, we need to pass only result.
                // TODO: This would be handled automatically by parsers?
                this.onMessage(this.handleMessages(messages, this.filter.props.format));
            });
        }
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

    async parseData(message) {
        // the data has already parsed
        return message;
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
            props.phenomenonTime = this.state.getStartTime() + '/' + this.state.getEndTime();
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
            props.phenomenonTime = this.state.getStartTime() + '/' + this.state.getEndTime();
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
            props.phenomenonTime = this.state.getStartTime() + '/' + this.state.getEndTime();
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

    createCommandFilter(properties) {
        const props = {};
        if(isDefined(properties.keywords)) {
            props.q = properties.keywords;
        }
        if(isDefined(properties.actuableProperty)) {
            props.actuableProperty = properties.actuableProperty;
        }
        if(isDefined(properties.statusCode)) {
            props.statusCode = properties.statusCode;
        }
        if(isDefined(properties.responseFormat)) {
            props.format = properties.responseFormat;
        }
        if(isDefined(properties.issueTime)) {
            props.issueTime = properties.issueTime;
        }
        if(isDefined(properties.executionTime)) {
            props.executionTime = properties.executionTime;
        }
        if(isDefined(properties.reportTime)) {
            props.reportTime = properties.reportTime;
        }

        return new CommandFilter(props);
    }

    createControlFilter(properties) {
        const props = {};
        if(isDefined(properties.keywords)) {
            props.q = properties.keywords;
        }
        if(isDefined(properties.actuableProperty)) {
            props.actuableProperty = properties.actuableProperty;
        }
        if(isDefined(properties.statusCode)) {
            props.statusCode = properties.statusCode;
        }
        if(isDefined(properties.responseFormat)) {
            props.format = properties.responseFormat;
        }
        if(isDefined(properties.issueTime)) {
            props.issueTime = properties.issueTime;
        }
        if(isDefined(properties.executionTime)) {
            props.executionTime = properties.executionTime;
        }
        if(isDefined(properties.reportTime)) {
            props.reportTime = properties.reportTime;
        }

        return new ControlFilter(props);
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
            props.phenomenonTime = this.state.getStartTime() + '/' + this.state.getEndTime();
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

