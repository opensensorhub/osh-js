/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import {isDefined} from "../utils/Utils";

class SensorWebApiFilter {
    constructor(props) {
        this.props = props;
    }

    /**
     *
     * @param {string[]} [parameters=[]] list of parameters to include
     * @return {string}
     */
    toQueryString(parameters= []) {
        let queryString = '';
        let separator = '';
        for (let queryParameter in this.props) {
            if((parameters.length === 0 || parameters.includes(queryParameter)) && isDefined(this.props[queryParameter])) {
                if(Array.isArray(this.props[queryParameter])) {
                    queryString += separator + queryParameter + '=' + encodeURIComponent(this.props[queryParameter].join());
                } else {
                    queryString += separator + queryParameter + '=' + encodeURIComponent(this.props[queryParameter]);
                }
                separator = '&';
            }
        }
        return queryString;
    }
}
export default SensorWebApiFilter;
