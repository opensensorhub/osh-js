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

import {isDefined} from "../../../utils/Utils";
import DataSourceContext from "../../common/context/DataSource.context";

class SosContext extends DataSourceContext {

    constructor(parser) {
        super();
        this.parser = parser;
    }

    async init(properties) {
        this.parser.init(properties);
        await super.init(properties);
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
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Object} properties.customUrlParams - the encoding options
     * @param {Number} properties.customUrlParams.video_bitrate - define a custom bitrate (in b/s)
     * @param {Number} properties.customUrlParams.video_scale - define a custom scale, 0.0 < value < 1.0
     * @param {Number} properties.customUrlParams.video_width - define a custom width
     * @param {Number} properties.customUrlParams.video_height - define a custom height
     * @return {String} the full url
     */
    getQueryString(properties) {
        let queryString = "";

        // adds service
        queryString = "service=" + properties.service;

        // adds version
        queryString += "&version=2.0";

        // adds responseFormat (optional)
        if (properties.responseFormat) {
            queryString += "&responseFormat=" + properties.responseFormat;
        }

        if(isDefined(properties.customUrlParams) && Object.keys(properties.customUrlParams).length > 0) {
            queryString += '&';
            for (let key in properties.customUrlParams) {
                queryString += key+'='+properties.customUrlParams[key]+'&';
            }
            if(url.endsWith('&')) {
                queryString = url.slice(0, -1);
            }
        }
        return queryString;
    }

    connect() {
        if(isDefined(this.connector)) {
            this.connector.doRequest('', this.getQueryString(this.properties));
        } else {
            throw Error('there is no connector defined');
        }
    }

}

export default SosContext;
