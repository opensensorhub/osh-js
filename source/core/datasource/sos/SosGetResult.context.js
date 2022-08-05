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

import SosGetResultParser from '../../parsers/sos/SosGetResult.parser.js'
import SosContext from "./Sos.context";

class SosGetResultContext extends SosContext {

    constructor() {
        super(new SosGetResultParser());
    }

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
    getPath(properties) {
        let queryString     = super.getPath(properties);
        const startTime     = properties.startTime;
        const endTime       = properties.endTime;
        const replaySpeed   = properties.replaySpeed;

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

export default SosGetResultContext;
