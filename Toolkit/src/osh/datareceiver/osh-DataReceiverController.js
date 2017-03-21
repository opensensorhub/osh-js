/**
 * @classdesc This class is responsible of handling datasources. It observes necessary events to manage datasources.
 * @class OSH.DataReceiver.DataReceiverController
 * @listens {@link OSH.EventManager.EVENT.CONNECT_DATASOURCE}
 * @listens {@link OSH.EventManager.EVENT.DISCONNECT_DATASOURCE}
 * @listens {@link OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME}
 * @example
 *
 * var datasource = new OSH.DataReceiver... // creates OSH.DataReceiver.<>
 *
 * // creates controller
 * var dataProviderController = new OSH.DataReceiver.DataReceiverController({
 *   replayFactor : replayFactor
 * });
 *
 * // adds datasource to controller
 * dataProviderController.addDataSource(weatherDataSource);
 *
 * // and/or adds entity to controller
 * var entity = {
 *       id : "entity-"+OSH.Utils.randomUUID(),
 *       name: "Some entity",
 *       dataSources: [datasource]
 * };
 *
 * dataProviderController.addEntity(entity);
 *
 */
OSH.DataReceiver.DataReceiverController = Class.create({
    initialize: function (options) {
        this.options = options;
        this.initBuffer();
        this.dataSourcesIdToDataSources = {};

        /*
        * @event {@link OSH.EventManager.EVENT.CONNECT_DATASOURCE}
        * @type {Object}
        * @property {Object} event - Is notified when a dataSource has to be connected
        * @property {Object} event.dataSourcesId - The datasource id
        */
        // observe CONNECT event and connect dataSources consequently
        OSH.EventManager.observe(OSH.EventManager.EVENT.CONNECT_DATASOURCE, function (event) {
            var eventDataSourcesIds = event.dataSourcesId;
            for (var i = 0; i < eventDataSourcesIds.length; i++) {
                var id = eventDataSourcesIds[i];
                if (id in this.dataSourcesIdToDataSources) {
                    // if sync to master to time, request data starting at current time
                    if (this.dataSourcesIdToDataSources[id].syncMasterTime) {
                        this.updateDataSourceTime(id, new Date(this.buffer.currentTime).toISOString());
                    }
                    this.dataSourcesIdToDataSources[id].connect();
                    this.buffer.startDataSource(id);
                }
            }
        }.bind(this));

        /*
         * @event {@link OSH.EventManager.EVENT.DISCONNECT_DATASOURCE}
         * @type {Object}
         * @property {Object} event - Is notified when a dataSource has to be disconnected
         * @property {Object} event.dataSourcesId - The datasource id
         */
        // observe DISCONNECT event and disconnect dataSources consequently
        OSH.EventManager.observe(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE, function (event) {
            var eventDataSourcesIds = event.dataSourcesId;
            for (var i = 0; i < eventDataSourcesIds.length; i++) {
                var id = eventDataSourcesIds[i];
                if (id in this.dataSourcesIdToDataSources) {
                    this.dataSourcesIdToDataSources[id].disconnect();
                    this.buffer.cancelDataSource(id);
                }
            }
        }.bind(this));


        /*
         * @event {@link OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME}
         * @type {Object}
         * @property {Object} event - Is notified when the datasource has to be updated
         * @property {Object} event.startTime - The corresponding new start time
         * @property {Object} event.endTime - The corresponding new end time
         */
        OSH.EventManager.observe(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME, function (event) {

            var dataSourcesToReconnect = [];

            // disconnect all synchronized datasources
            for (var id in this.dataSourcesIdToDataSources) {
                var dataSrc = this.dataSourcesIdToDataSources[id];
                if (dataSrc.syncMasterTime && dataSrc.connected) {
                    dataSrc.disconnect();
                    this.buffer.cancelDataSource(id);
                    dataSourcesToReconnect.push(id);
                }
            }

            // reset buffer current time
            this.buffer.currentTime = Date.parse(event.startTime);

            // reconnect all synchronized datasources with new time parameters
            for (var i = 0; i < dataSourcesToReconnect.length; i++) {
                var id = dataSourcesToReconnect[i];
                var dataSrc = this.dataSourcesIdToDataSources[id];
                this.updateDataSourceTime(id, event.startTime, event.endTime);
                dataSrc.connect();
                this.buffer.startDataSource(id);
            }

        }.bind(this));
    },

    /**
     * Updates the datasource time range.
     * @param id the datasource id
     * @param startTime the start time
     * @param endTime the end time
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    updateDataSourceTime: function (id, startTime, endTime) {
        // get current parameters
        var dataSource = this.dataSourcesIdToDataSources[id];
        var props = dataSource.properties;
        var options = dataSource.options;

        // update start/end time
        if (typeof startTime != "undefined") {
            props.startTime = startTime;
        }

        if (typeof endTime != "undefined") {
            props.endTime = endTime;
        }

        // reset parameters
        dataSource.initDataSource(props, options);
    },

    /**
     * Instantiates a new OSH.Buffer {@link OSH.Buffer}
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    initBuffer: function () {
        this.buffer = new OSH.Buffer(this.options);
    },

    /**
     * Adds a entity to the current list of datasources and pushes it into the buffer.
     * @see {@link OSH.Buffer}
     * @param {Object} dataSource the datasource to add
     * @param options @deprecated
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    addEntity: function (entity, options) {
        if (typeof (entity.dataSources) != "undefined") {
            for (var i = 0; i < entity.dataSources.length; i++) {
                this.addDataSource(entity.dataSources[i], options);
            }
        }
    },

    /**
     * Adds a dataSource to the current list of datasources and pushes it into the buffer.
     * @see {@link OSH.Buffer}
     * @param {Object} dataSource the datasource to add
     * @param options @deprecated
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    addDataSource: function (dataSource, options) {
        this.dataSourcesIdToDataSources[dataSource.id] = dataSource;
        this.buffer.addDataSource(dataSource.id, {
            name: dataSource.name,
            syncMasterTime: dataSource.syncMasterTime,
            bufferingTime: dataSource.bufferingTime,
            timeOut: dataSource.timeOut
        });

        //TODO: make frozen variables?
        dataSource.onData = function (data) {
            this.buffer.push({dataSourceId: dataSource.getId(), data: data});

        }.bind(this);
    },

    /**
     * Connects each connector
     * @instance
     * @memberof OSH.DataReceiver.DataReceiverController
     */
    connectAll: function () {
        this.buffer.start();
        for (var id in this.dataSourcesIdToDataSources) {
            this.dataSourcesIdToDataSources[id].connect();
        }
    }
});
