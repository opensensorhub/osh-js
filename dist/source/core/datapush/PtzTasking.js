/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import DataSink from './DataSink.js';

/**
 * @extends DataSink
 */
class PtzTasking extends DataSink {

    constructor(name, properties) {
        super(name, properties);

        let that = this;
        // EventManager.observe(EventManager.EVENT.PTZ_SEND_REQUEST + "-" + this.id, (event) =>
        //     that.protocol.sendRequest(that.buildRequest(that.getCommandData(event.cmdData))));
    }

    // to override by specific vendor dataSender
    getCommandData(values) {
        let cmdData = '';

        if (values.rtilt !== null) {
            cmdData += 'rtilt,' + values.rtilt + ' ';
        }

        if (values.rpan !== null) {
            cmdData += 'rpan,' + values.rpan + ' ';
        }

        if (values.rzoom !== null) {
            cmdData += 'rzoom,' + values.rzoom + ' ';
        }
        return cmdData;
    }

    /**
     * Builds the request based on sps standard.
     * @private
     * @returns {string} the sps request
     */
    buildRequest(cmdData) {
        let xmlSpsRequest = "<sps:Submit ";

        // adds service
        xmlSpsRequest += "service=\"" + this.properties.service + "\" ";

        // adds version
        xmlSpsRequest += "version=\"" + this.properties.version + "\" ";

        // adds ns
        xmlSpsRequest += "xmlns:sps=\"http://www.opengis.net/sps/2.0\" xmlns:sweapi=\"http://www.opengis.net/swe/2.0\"> ";

        // adds procedure
        xmlSpsRequest += "<sps:procedure>" + this.properties.procedure + "</sps:procedure>";

        // adds taskingParameters
        xmlSpsRequest += "<sps:taskingParameters><sps:ParameterData>";

        // adds encoding
        xmlSpsRequest += "<sps:encoding><sweapi:TextEncoding blockSeparator=\" \"  collapseWhiteSpaces=\"true\" decimalSeparator=\".\" tokenSeparator=\",\"/></sps:encoding>";

        // adds values
        xmlSpsRequest += "<sps:values>" + cmdData + "</sps:values>";

        // adds endings
        xmlSpsRequest += "</sps:ParameterData></sps:taskingParameters></sps:Submit>";

        return xmlSpsRequest;
    }
}
export default PtzTasking;
