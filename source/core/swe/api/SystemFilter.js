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

class SystemFilter {
    /**
     *
     * @param {Object} properties - object properties
     * @param {string[]} [properties.ids=[]] - ids
     * @param {string[]} [properties.uuids=[]] - uuids
     * @param {string[]} [properties.keywords=[]] - keywords
     * @param {string[]} [properties.foidIds=[]] - foidIds
     * @param {string[]} [properties.propUris=[]] - propUris
     * @param {number[]} [properties.roi=[]] - roi filter resources on their location such as `minx,miny, maxx, maxy` or WKT geometry
     * @param {string} [properties.validTime='1970-01-01T00:00:00Z/2055-01-01T00:00:00Z'] - validTime - ISO 8601 time range to filter resources on their validity time.
     When this parameter is omitted, the implicit value is "now", except for "history" collections where the absence of this parameter means no filtering is applied.
     */
    constructor(properties) {
        this.ids = [];
        this.uuids = [];
        this.keywords = [];
        // time range
        this.validTime = '1970-01-01T00:00:00Z/2055-01-01T00:00:00Z';
        this.roi = undefined;
        this.foidIds = [];
        this.propUris = [];

        if(isDefined(properties.ids)) {
            this.ids = properties.ids;
        }
        if(isDefined(properties.uuids)) {
            this.uuids = properties.uuids;
        }
        if(isDefined(properties.keywords)) {
            this.keywords = properties.keywords;
        }
        if(isDefined(properties.validTime)) {
            this.validTime = properties.validTime;
        }
        if(isDefined(properties.foidIds)) {
            this.foidIds = properties.foidIds;
        }
        if(isDefined(properties.propUris)) {
            this.propUris = properties.propUris;
        }
    }
}
export default SystemFilter;
