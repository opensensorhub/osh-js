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

class SosGetFoisDataSourceHandler extends SosDataSourceHandler {
    constructor(parser) {
        super(parser);
    }

    getQueryString(properties) {
        return this.buildUrl(properties);
    }

    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.protocol the protocol protocol
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.procedureId the foi procedure id
     * @param {String} [properties.responseFormat=application/xml] the response format (e.g video/mp4)
     * @return {String} the full url
     */
    buildUrl(properties) {
        let url = super.buildUrl({
            responseFormat:'application/xml',
            ...properties,
        });
        // adds request
        url += "&request=GetFeatureOfInterest";

        // adds foiURN if any
        if(isDefined(properties.procedureId)) {
            url += '&procedure='+properties.procedureId;
        }
        return url;
    }
}

export default SosGetFoisDataSourceHandler;
