/**
 * @classdesc
 * @class
 * @augments OSH.DataSender.DataSource
 */
OSH.DataSender.UavMapTasking = OSH.DataSender.DataSink.extend({

    initialize: function(name, properties) {

        this._super(name, properties);

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_TAKEOFF, function (event) {
            this.connector.sendRequest(this.buildTakeOffRequest());            
        }.bind(this));

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_GOTO, function (event) {
            this.connector.sendRequest(this.buildGotoRequest({lat: event.geoLat, lon: event.geoLon}));
        }.bind(this));

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_ORBIT, function (event) {
            this.connector.sendRequest(this.buildOrbitRequest({lat: event.geoLat, lon: event.geoLon, radius: 10}));
        }.bind(this));

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_LOOKAT, function (event) {
            this.connector.sendRequest(this.buildLookAtRequest({lat: event.geoLat, lon: event.geoLon}));
        }.bind(this));

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_LAND, function (event) {
            this.connector.sendRequest(this.buildLandRequest({lat: event.geoLat, lon: event.geoLon}));
        }.bind(this));
    },


    /**
     * Builds the take off SPS request.
     * @param {string} props
     * @returns {string} the take off sps request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @instance
     */
    buildTakeOffRequest: function(props) {
        return this.buildRequest("navCommands,TAKEOFF,10");
    },



    /**
     * Builds the got to SPS request.
     * @param {string} props
     * @returns {string} the goto SPS request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @instance
     */
    buildGotoRequest: function(props) {
        return this.buildRequest("navCommands,GOTO_LLA,"+props.lat+","+props.lon+",0,0");
    },


    /**
     * Builds the orbit SPS request.
     * @returns {string} the orbit SPS request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @param {string} props
     * @instance
     */
    buildOrbitRequest: function(props) {
        return this.buildRequest("navCommands,ORBIT,"+props.lat+","+props.lon+",0,"+props.radius);
    },


    /**
     * Builds the lookat SPS request.
     * @returns {string} the lookat SPS request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @param {string} props
     * @instance
     */
    buildLookAtRequest: function(props) {
        return this.buildRequest("camCommands,MOUNT_TARGET,"+props.lat+","+props.lon+",0");
    },


    /**
     * Builds the land SPS request.
     * @returns {string} the land SPS request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @param {string} props
     * @instance
     */
    buildLandRequest: function(props) {
        return this.buildRequest("navCommands,LAND,"+props.lat+","+props.lon);
    },


    /**
     * Builds the request based on sps standard.
     * @param {string} the command data
     * @returns {string} the sps request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @instance
     */
    buildRequest: function(cmdData) {
        var xmlSpsRequest = "<sps:Submit ";

        // adds service
        xmlSpsRequest += "service=\""+this.properties.service+"\" ";

        // adds version
        xmlSpsRequest += "version=\""+this.properties.version+"\" ";

        // adds ns
        xmlSpsRequest += "xmlns:sps=\"http://www.opengis.net/sps/2.0\" xmlns:swe=\"http://www.opengis.net/swe/2.0\"> ";

        // adds procedure
        xmlSpsRequest += "<sps:procedure>"+this.properties.offeringID+"</sps:procedure>";

        // adds taskingParameters
        xmlSpsRequest += "<sps:taskingParameters><sps:ParameterData>";

        // adds encoding
        xmlSpsRequest += "<sps:encoding><swe:TextEncoding blockSeparator=\" \"  collapseWhiteSpaces=\"true\" decimalSeparator=\".\" tokenSeparator=\",\"/></sps:encoding>";

        // adds values
        xmlSpsRequest += "<sps:values>"+cmdData+"</sps:values>";

        // adds endings
        xmlSpsRequest += "</sps:ParameterData></sps:taskingParameters></sps:Submit>";

        document.fire("osh:log", xmlSpsRequest);

        return xmlSpsRequest;
    }

    
});
