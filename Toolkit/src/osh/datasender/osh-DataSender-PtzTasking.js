/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @augments OSH.DataSender.DataSink
 */
OSH.DataSender.PtzTasking = OSH.DataSender.DataSink.extend({

    /**
     * Builds the request based on sps standard.
     * @returns {string} the sps request
     * @memberof OSH.DataReceiver.PtzTasking
     * @instance
     */
    buildRequest: function(properties) {
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