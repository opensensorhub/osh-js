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
import {isDefined, randomUUID} from "../../utils/Utils.js";

/**
 * @extends Layer
 */
class CurveLayer extends Layer {
    /**
     * Create the CurveLayer
     * @param {Object} properties -
     * @param {String} [properties.xLabel=""] -
     * @param {String} [properties.yLabel=""] -
     * @param {String} [properties.color="#000000"] - color in hex or rgba value
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
        this.type = 'curve';
        this.props.xLabel = "";
        this.props.yLabel = "";
        this.props.color = "#399ca5";
        this.props.stroke = 1;
        this.props.curveId = randomUUID();
        this.props.x = 0;
        this.props.y = 0;

        if (isDefined(properties.stroke)) {
            this.props.stroke = properties.stroke;
        }

        if (isDefined(properties.color)) {
            this.props.color = properties.color;
        }

        if (isDefined(properties.x)) {
            this.props.x = properties.x;
        }

        if (isDefined(properties.y)) {
            this.props.y = properties.y;
        }

        const that = this;
        if (isDefined(properties.getStroke)) {
            let fn = function (rec, timeStamp, options) {
                that.props.stroke = that.getFunc('getStroke')(rec,timeStamp,options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getStroke'), fn);
        }

        if (isDefined(properties.getColor)) {
            let fn = function (rec, timeStamp, options) {
                that.props.color = that.getFunc('getColor')(rec,timeStamp,options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getColor'), fn);
        }

        if (isDefined(properties.getValues)) {
            let fn = function (rec, timeStamp, options) {
                const value = that.getFunc('getValues')(rec,timeStamp,options);
                that.props.x = value.x;
                that.props.y = value.y;
            };
            this.addFn(that.getDataSourcesIdsByProperty('getValues'), fn);
        }

        this.saveState();
    }
}
export default CurveLayer;
