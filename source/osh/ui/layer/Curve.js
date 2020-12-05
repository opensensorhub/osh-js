/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import Layer from "./Layer.js";
import {isDefined} from "../../utils/Utils.js";

/**
 * @extends Layer
 */
class Curve extends Layer {
    /**
     * Create the Curve
     * @param {Object} properties -
     * @param {String} [properties.xLabel=""] -
     * @param {String} [properties.yLabel=""] -
     * @param {String} [properties.color="#000000"] -
     * @param {Number} [properties.stroke=1] -
     * @param {Number} [properties.x=0] -
     * @param {Number} [properties.y=[]] -
     * @param {Function} properties.getStroke -
     * @param {Function} properties.getColor -
     * @param {Function} properties.getValues -
     *
     */
    constructor(properties) {
        super(properties);
        this.xLabel = "";
        this.yLabel = "";
        this.color = "#000000";
        this.stroke = 1;
        // this.x = 0;
        // this.y = [];

        this.values = [];

        let that = this;

        if (isDefined(properties.stroke)) {
            this.stroke = properties.stroke;
        }

        if (isDefined(properties.color)) {
            this.color = properties.color;
        }

        if (isDefined(properties.x)) {
            this.x = properties.x;
        }

        if (isDefined(properties.y)) {
            this.y = properties.y;
        }

        if (isDefined(properties.getStroke)) {
            let fn = function (rec, timeStamp, options) {
                that.stroke = properties.getStroke.handler(rec, timeStamp, options);
            };
            this.addFn(properties.getStroke.dataSourceIds, fn);
        }

        if (isDefined(properties.getColor)) {
            let fn = function (rec, timeStamp, options) {
                that.color = properties.getColor.handler(rec, timeStamp, options);
            };
            this.addFn(properties.getColor.dataSourceIds, fn);
        }

        if (isDefined(properties.getValues)) {
            let fn = function (rec, timeStamp, options) {
                let value = properties.getValues.handler(rec, timeStamp, options);
                // that.x = values.x;
                // that.y = values.y;
                that.values.push(value);
            };
            this.addFn(properties.getValues.dataSourceIds, fn);
        }
    }

    setData(dataSourceId, rec, view, options) {
        if (super.setData(dataSourceId, rec, view, options)) {
            //if(typeof(view) != "undefined" && view.hasOwnProperty('updateMarker')){
            if (isDefined(view)) {
                view.updateCurve(this, this.values, options);
                return true;
            }
        }
        return false;
    }
}
export default Curve;
