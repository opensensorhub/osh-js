import SosGetResultHandler from "../sos/handler/SosGetResult.handler";
import SosGetFoisHandler from "../sos/handler/SosGetFois.handler";
import SweApiHandler from "../sweapi/handler/SweApi.handler";

class DataSourceWorker {
    constructor() {
        this.dataSourceHandlers = {};
    }

    handleMessage(event) {
        let resp = {};
        if (event.data.ackId) {
            resp.ackId = event.data.ackId;
        }
        const eventData = event.data;

        try {
            if (eventData.message === 'init') {
                this.handleInit(eventData, resp);
            }
            if (eventData.message === 'connect') {
                this.handleConnect(eventData, resp);
            } else if (eventData.message === 'disconnect') {
                this.handleDisconnect(eventData, resp);
            } else if (eventData.message === 'topics') {
                this.handleTopics(eventData, resp);
            } else if (eventData.message === 'update-properties') {
                this.handleUpdateProperties(eventData, resp);
            } else if (eventData.message === 'is-connected') {
                this.handleIsConnected(eventData, resp);
            } else if (eventData.message === 'is-init') {
                this.handleIsInit(eventData, resp);
            } else if (eventData.message === 'remove-handler') {
                this.handleRemoveHandler(eventData, resp);
            }
        } catch (ex) {
            console.error(ex);
            resp.error = ex;
            this.postMessage(resp);
        } finally {
            // resp.data = returnValue;
            // this.postMessage(resp);
        }
    }

    handleInit(eventData, resp) {
        const dsId = eventData.dsId;
        this.dataSourceHandlers[dsId] = this.createHandlerFromProperties(eventData.properties);
        this.dataSourceHandlers[dsId].init(eventData.properties, eventData.topics, eventData.id).then(() => {
            resp.data = this.dataSourceHandlers[dsId].isInitialized();
            this.postMessage(resp);
        });
    }

    handleConnect(eventData, resp) {
        const dsId = eventData.dsId;
        if(dsId in this.dataSourceHandlers) {
            this.dataSourceHandlers[dsId].connect(eventData.startTime, eventData.version).then(() => {
                this.postMessage(resp);
            });
        }
    }

    handleDisconnect(eventData, resp) {
        const dsId = eventData.dsId;
        if(dsId in this.dataSourceHandlers) {
            this.dataSourceHandlers[dsId].disconnect().then(() => {
                this.postMessage(resp);
            });
        }
    }

    handleTopics(eventData, resp) {
        const dsId = eventData.dsId;
        if(dsId in this.dataSourceHandlers) {
            this.dataSourceHandlers[dsId].setTopics(eventData.topics);
            this.postMessage(resp);
        }
    }

    handleUpdateProperties(eventData, resp) {
        const dsId = eventData.dsId;
        if(dsId in this.dataSourceHandlers) {
            this.dataSourceHandlers[dsId].updateProperties(eventData.data);
            this.postMessage(resp);
        }
    }

    handleIsConnected(eventData, resp) {
        const dsId = eventData.dsId;
        if(dsId in this.dataSourceHandlers) {
            resp.data = this.dataSourceHandlers[dsId].isConnected();
            this.postMessage(resp);
        }
    }

    handleRemoveHandler(eventData, resp) {
        const dsId = eventData.dsId;
        delete this.dataSourceHandlers[dsId];
        this.postMessage(resp);
    }

    handleIsInit(eventData, resp) {
        const dsId = eventData.dsId;
        resp.data = this.dataSourceHandlers[dsId].isInitialized();
        this.postMessage(resp);
    }

    postMessage(message) {

    }
    createHandlerFromProperties(properties) {
        if (properties.type === 'SosGetResult') {
            return new SosGetResultHandler();
        } else if (properties.type === 'SosGetFois') {
            return new SosGetFoisHandler();
        } else if (properties.type === 'SweApiStream') {
            return new SweApiHandler();
        } else {
            throw Error('Unsupported SOS service Error');
        }
    }
}
export default DataSourceWorker;
