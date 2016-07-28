OSH.DataSender.UavMapTasking = Class.create(OSH.DataSender.DataSource,{

    initialize: function($super, name, properties) {

        $super(name, properties);

        document.observe("osh:uav:takeoff", function (event) {
            this.connector.sendRequest(this.buildTakeOffRequest());            
        }.bind(this));

        document.observe("osh:uav:goto", function (event) {
            this.connector.sendRequest(this.buildGotoRequest({lat: event.memo.geoLat, lon: event.memo.geoLon}));            
        }.bind(this));

        document.observe("osh:uav:orbit", function (event) {
            this.connector.sendRequest(this.buildOrbitRequest({lat: event.memo.geoLat, lon: event.memo.geoLon, radius: 10}));            
        }.bind(this));

        document.observe("osh:uav:lookat", function (event) {
            this.connector.sendRequest(this.buildLookAtRequest({lat: event.memo.geoLat, lon: event.memo.geoLon}));            
        }.bind(this));

        document.observe("osh:uav:land", function (event) {
            this.connector.sendRequest(this.buildLandRequest({lat: event.memo.geoLat, lon: event.memo.geoLon}));            
        }.bind(this));
    },


    buildTakeOffRequest: function(props) {
        return this.buildRequest("navCommands,TAKEOFF,10");
    },


    buildGotoRequest: function(props) {
        return this.buildRequest("navCommands,GOTO_LLA,"+props.lat+","+props.lon+",0,0");
    },


    buildOrbitRequest: function(props) {
        return this.buildRequest("navCommands,ORBIT,"+props.lat+","+props.lon+",0,"+props.radius);
    },


    buildLookAtRequest: function(props) {
        return this.buildRequest("camCommands,MOUNT_TARGET,"+props.lat+","+props.lon+",0");
    },


    buildLandRequest: function(props) {
        return this.buildRequest("navCommands,LAND,"+props.lat+","+props.lon);
    },


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
