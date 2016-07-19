OSH.DataSender.Tasking = Class.create(OSH.DataSender.DataSource,{

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
        xmlSpsRequest += "<sps:values>rpan,"+properties.pan+" rzoom,"+properties.zoom+" r tilt,"+properties.tilt+"</sps:values>";

        // adds endings
        xmlSpsRequest += "</sps:ParameterData></sps:taskingParameters></sps:Submit>";

        document.fire("osh:log", xmlSpsRequest);

        return xmlSpsRequest;
    }
});