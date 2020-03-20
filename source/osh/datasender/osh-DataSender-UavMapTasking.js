/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2012-2016 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoftware.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc
 * @class
 * @augments OSH.DataSender.DataSource
 */
import DataSink from './osh-DataSender-DataSink.js';
import EventManager from '../osh-EventManager.js';

export default class UavMapTasking extends DataSink {

    constructor(name, properties) {
        super(name, properties);

        let that = this;
        EventManager.observe(OSH.EventManager.EVENT.UAV_TAKEOFF, (event) =>
            that.connector.sendRequest(that.buildTakeOffRequest()));

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_GOTO, (event) =>
            that.connector.sendRequest(that.buildGotoRequest({lat: event.geoLat, lon: event.geoLon})));

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_ORBIT, (event) =>
            that.connector.sendRequest(that.buildOrbitRequest({lat: event.geoLat, lon: event.geoLon, radius: 10})));

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_LOOKAT, (event) =>
            that.connector.sendRequest(that.buildLookAtRequest({lat: event.geoLat, lon: event.geoLon})));

        OSH.EventManager.observe(OSH.EventManager.EVENT.UAV_LAND, (event) =>
            that.connector.sendRequest(that.buildLandRequest({lat: event.geoLat, lon: event.geoLon})));
    }


    /**
     * Builds the take off SPS request.
     * @param {string} props
     * @returns {string} the take off sps request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @instance
     */
    buildTakeOffRequest(props) {
        return this.buildRequest("navCommands,TAKEOFF,10");
    }

    /**
     * Builds the got to SPS request.
     * @param {string} props
     * @returns {string} the goto SPS request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @instance
     */
    buildGotoRequest(props) {
        return this.buildRequest("navCommands,GOTO_LLA," + props.lat + "," + props.lon + ",0,0");
    }


    /**
     * Builds the orbit SPS request.
     * @returns {string} the orbit SPS request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @param {string} props
     * @instance
     */
    buildOrbitRequest(props) {
        return this.buildRequest("navCommands,ORBIT," + props.lat + "," + props.lon + ",0," + props.radius);
    }


    /**
     * Builds the lookat SPS request.
     * @returns {string} the lookat SPS request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @param {string} props
     * @instance
     */
    buildLookAtRequest(props) {
        return this.buildRequest("camCommands,MOUNT_TARGET," + props.lat + "," + props.lon + ",0");
    }


    /**
     * Builds the land SPS request.
     * @returns {string} the land SPS request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @param {string} props
     * @instance
     */
    buildLandRequest(props) {
        return this.buildRequest("navCommands,LAND," + props.lat + "," + props.lon);
    }


    /**
     * Builds the request based on sps standard.
     * @param {string} the command data
     * @returns {string} the sps request
     * @memberof OSH.DataReceiver.UavMapTasking
     * @instance
     */
    buildRequest(cmdData) {
        let xmlSpsRequest = "<sps:Submit ";

        // adds service
        xmlSpsRequest += "service=\"" + this.properties.service + "\" ";

        // adds version
        xmlSpsRequest += "version=\"" + this.properties.version + "\" ";

        // adds ns
        xmlSpsRequest += "xmlns:sps=\"http://www.opengis.net/sps/2.0\" xmlns:swe=\"http://www.opengis.net/swe/2.0\"> ";

        // adds procedure
        xmlSpsRequest += "<sps:procedure>" + this.properties.offeringID + "</sps:procedure>";

        // adds taskingParameters
        xmlSpsRequest += "<sps:taskingParameters><sps:ParameterData>";

        // adds encoding
        xmlSpsRequest += "<sps:encoding><swe:TextEncoding blockSeparator=\" \"  collapseWhiteSpaces=\"true\" decimalSeparator=\".\" tokenSeparator=\",\"/></sps:encoding>";

        // adds values
        xmlSpsRequest += "<sps:values>" + cmdData + "</sps:values>";

        // adds endings
        xmlSpsRequest += "</sps:ParameterData></sps:taskingParameters></sps:Submit>";

        document.fire("osh:log", xmlSpsRequest);

        return xmlSpsRequest;
    }
}
