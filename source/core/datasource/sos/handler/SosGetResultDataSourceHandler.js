/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2022 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import SosDataSourceHandler from "./SosDataSourceHandler";
import {isDefined} from "../../../utils/Utils";

class SosGetResultDataSourceHandler extends SosDataSourceHandler {
    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.protocol the protocol protocol
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} properties.replaySpeed the replay factor
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Object} properties.customUrlParams - the encoding options
     * @return {String} the full url
     */
    getQueryString(properties) {
        let queryString     = super.getQueryString(properties);

        const startTime     = this.state.getStartTime();
        const endTime       = this.state.getEndTime();
        const replaySpeed   = this.state.getReplaySpeed();

        // adds request
        queryString += "&request=GetResult";

        // adds offering
        queryString += "&offering=" + properties.offeringID;

        // adds observedProperty
        queryString += "&observedProperty=" + properties.observedProperty;

        // adds temporalFilter
        queryString += "&temporalFilter=phenomenonTime," + startTime + "/" + endTime;

        if(replaySpeed) {
            // adds replaySpeed
            queryString += "&replaySpeed=" + replaySpeed;
        }

        return queryString;
    }
}

export default SosGetResultDataSourceHandler;
