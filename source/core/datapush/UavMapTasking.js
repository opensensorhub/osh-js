/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2012-2020 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoftware.com>

 ******************************* END LICENSE BLOCK ***************************/


import DataSink from './DataSink.js';

/**
 * @extends DataSink
 */
class UavMapTasking extends DataSink {

    constructor(name, properties) {
        super(name, properties);

        let that = this;
        // EventManager.observe(EventManager.EVENT.UAV_TAKEOFF, (event) => that.protocol.sendRequest(that.buildTakeOffRequest()));
        //
        // EventManager.observe(EventManager.EVENT.UAV_GOTO, (event) =>
        //     that.protocol.sendRequest(that.buildGotoRequest({lat: event.geoLat, lon: event.geoLon})));
        //
        // EventManager.observe(EventManager.EVENT.UAV_ORBIT, (event) =>
        //     that.protocol.sendRequest(that.buildOrbitRequest({lat: event.geoLat, lon: event.geoLon, radius: 10})));
        //
        // EventManager.observe(EventManager.EVENT.UAV_LOOKAT, (event) =>
        //     that.protocol.sendRequest(that.buildLookAtRequest({lat: event.geoLat, lon: event.geoLon})));
        //
        // EventManager.observe(EventManager.EVENT.UAV_LAND, (event) =>
        //     that.protocol.sendRequest(that.buildLandRequest({lat: event.geoLat, lon: event.geoLon})));
    }


    /**
     * Builds the take off SPS request.
     * @param {Object} props -
     * @return {String} the take off sps request
     */
    buildTakeOffRequest(props) {
        return this.buildRequest("navCommands,TAKEOFF,10");
    }

    /**
     * Builds the got to SPS request.
     * @private
     * @param {Object} props -
     * @returns {String} the goto SPS request
     */
    buildGotoRequest(props) {
        return this.buildRequest("navCommands,GOTO_LLA," + props.lat + "," + props.lon + ",0,0");
    }


    /**
     * Builds the orbit SPS request.
     * @return {String} the orbit SPS request
     * @param {Object} props -
     */
    buildOrbitRequest(props) {
        return this.buildRequest("navCommands,ORBIT," + props.lat + "," + props.lon + ",0," + props.radius);
    }


    /**
     * Builds the lookat SPS request.
     * @return {String} the lookat SPS request
     * @param {Object} props -
     */
    buildLookAtRequest(props) {
        return this.buildRequest("camCommands,MOUNT_TARGET," + props.lat + "," + props.lon + ",0");
    }


    /**
     * Builds the land SPS request.
     * @return {String} the land SPS request
     * @param {Object} props -
     */
    buildLandRequest(props) {
        return this.buildRequest("navCommands,LAND," + props.lat + "," + props.lon);
    }


    /**
     * Builds the request based on sps standard.
     * @private
     * @param {String} cmdData - the command data
     * @return {String} the sps request
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
        xmlSpsRequest += "<sps:procedure>" + this.properties.offeringID + "</sps:procedure>";

        // adds taskingParameters
        xmlSpsRequest += "<sps:taskingParameters><sps:ParameterData>";

        // adds encoding
        xmlSpsRequest += "<sps:encoding><sweapi:TextEncoding blockSeparator=\" \"  collapseWhiteSpaces=\"true\" decimalSeparator=\".\" tokenSeparator=\",\"/></sps:encoding>";

        // adds values
        xmlSpsRequest += "<sps:values>" + cmdData + "</sps:values>";

        // adds endings
        xmlSpsRequest += "</sps:ParameterData></sps:taskingParameters></sps:Submit>";

        document.fire("core:log", xmlSpsRequest);

        return xmlSpsRequest;
    }
}

export default UavMapTasking;
