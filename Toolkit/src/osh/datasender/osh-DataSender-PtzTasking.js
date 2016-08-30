/**
 * @classdesc
 * @class
 */
OSH.DataSender.PtzTasking = Class.create(OSH.DataSender.DataSink,{

    /**
     * Builds the request based on sps standard.
     * @override
     * @inheritdoc
     * @returns {string} the sps request
     * @memberof OSH.DataReceiver.PtzTasking
     * @instance
     */
    buildRequest: function($super,properties) {
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
        xmlSpsRequest += "<sps:values>";
        
        if (properties.pan != 0)
        	xmlSpsRequest += "rpan,"+properties.pan;
        
        if (properties.tilt != 0)
        	xmlSpsRequest += " rtilt,"+properties.tilt;        	
        
        if (properties.zoom != 0)
        	xmlSpsRequest += " rzoom,"+properties.zoom;

        // adds endings
        xmlSpsRequest += "</sps:values></sps:ParameterData></sps:taskingParameters></sps:Submit>";

        document.fire("osh:log", xmlSpsRequest);

        return xmlSpsRequest;
    }
});