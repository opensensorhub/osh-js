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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import DataSink from './DataSink.js';
/**
 * @extends DataSink
 */
var UavMapTasking = /** @class */ (function (_super) {
    __extends(UavMapTasking, _super);
    function UavMapTasking(name, properties) {
        var _this = _super.call(this, name, properties) || this;
        var that = _this;
        return _this;
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
    UavMapTasking.prototype.buildTakeOffRequest = function (props) {
        return this.buildRequest("navCommands,TAKEOFF,10");
    };
    /**
     * Builds the got to SPS request.
     * @private
     * @param {Object} props -
     * @returns {String} the goto SPS request
     */
    UavMapTasking.prototype.buildGotoRequest = function (props) {
        return this.buildRequest("navCommands,GOTO_LLA," + props.lat + "," + props.lon + ",0,0");
    };
    /**
     * Builds the orbit SPS request.
     * @return {String} the orbit SPS request
     * @param {Object} props -
     */
    UavMapTasking.prototype.buildOrbitRequest = function (props) {
        return this.buildRequest("navCommands,ORBIT," + props.lat + "," + props.lon + ",0," + props.radius);
    };
    /**
     * Builds the lookat SPS request.
     * @return {String} the lookat SPS request
     * @param {Object} props -
     */
    UavMapTasking.prototype.buildLookAtRequest = function (props) {
        return this.buildRequest("camCommands,MOUNT_TARGET," + props.lat + "," + props.lon + ",0");
    };
    /**
     * Builds the land SPS request.
     * @return {String} the land SPS request
     * @param {Object} props -
     */
    UavMapTasking.prototype.buildLandRequest = function (props) {
        return this.buildRequest("navCommands,LAND," + props.lat + "," + props.lon);
    };
    /**
     * Builds the request based on sps standard.
     * @private
     * @param {String} cmdData - the command data
     * @return {String} the sps request
     */
    UavMapTasking.prototype.buildRequest = function (cmdData) {
        var xmlSpsRequest = "<sps:Submit ";
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
    };
    return UavMapTasking;
}(DataSink));
export default UavMapTasking;
//# sourceMappingURL=UavMapTasking.js.map