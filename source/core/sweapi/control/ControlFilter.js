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

import SensorWebApiFilter from "../Filter";

class ControlFilter extends SensorWebApiFilter {
    /**
     *
     * @param {Object} properties - object properties
     * @param {string[]} [properties.q=undefined] - Comma separated keywords used for full-text search
     * @param {string[]} [properties.actuableProperty=undefined] - Comma separated list of actuable property URIs to filter command streams
     * @param {string[]} [properties.select=undefined] - Comma separated list of properties to include or exclude from results (use "!" prefix to exclude)
     * @param {string} [properties.format='application/json'] - Mime type designating the format to use to encode the response.
     * @param {string} [properties.issueTime=undefined] - ISO 8601 time range to filter commands on their issue time. When this parameter is omitted,
     * no filtering on "issueTime" is applied.
     */
    constructor(properties) {
        super({
            q: undefined,
            actuableProperty: undefined,
            observedProperty: undefined,
            issueTime: undefined,
            select: undefined,
            format: 'application/json',
            ...properties // merge defined properties
        });
        //TODO: assertions
    }
}
export default ControlFilter;
