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
     * @param {String} [properties.lineColor="#000000"] - color in hex or rgba value
     * @param {String} [properties.backgroundColor="#000000"] - color in hex or rgba value
     * @param {String} [properties.fill=false] -
     * @param {Number} [properties.maxValues=10] - Defines the max values hold by the layer
     * @param {Number} [properties.stroke=1] -
     * @param {Number} [properties.x=0] -
     * @param {Number} [properties.y=[]] -
     * @param {Number} [properties.maxValues=10] - The maximum values to display
     * @param {Function} properties.getStroke -
     * @param {Function} properties.getLineColor -
     * @param {Function} properties.getValues -
     *
     */
    constructor(properties) {
        super(properties);
        this.type = 'curve';
        this.props.xLabel = "";
        this.props.yLabel = "";
        this.props.lineColor = "#399ca5";
        this.props.backgroundColor = "#399ca5";
        this.props.fill = false;
        this.props.stroke = 1;
        this.props.curveId = randomUUID();
        this.props.x = 0;
        this.props.y = 0;
        this.props.maxValues = 10;

        if (isDefined(properties.stroke)) {
            this.props.stroke = properties.stroke;
        }

        if (isDefined(properties.maxValues)) {
            this.props.maxValues = properties.maxValues;
        }

        if (isDefined(properties.lineColor)) {
            this.props.lineColor = properties.lineColor;
        }

        if (isDefined(properties.backgroundColor)) {
            this.props.backgroundColor = properties.backgroundColor;
        }

        if (isDefined(properties.fill)) {
            this.props.fill = properties.fill;
        }

        if (isDefined(properties.x)) {
            this.props.x = properties.x;
        }

        if (isDefined(properties.y)) {
            this.props.y = properties.y;
        }

        const that = this;

        // must be first to assign correctly the first location to the right id if it is defined
        if (this.checkFn("getCurveId")) {
            let fn = async (rec,timestamp,options) => {
                that.props.curveId = await that.getFunc('getCurveId')(rec,timestamp,options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getCurveId'),fn);
        }

        if (this.checkFn("getName")) {
            let fn = async (rec,timestamp,options) => {
                that.props.name = await that.getFunc('getName')(rec,timestamp,options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getName'),fn);
        }

        if (isDefined(properties.getStroke)) {
            let fn = async (rec, timestamp, options) => {
                that.props.stroke = await that.getFunc('getStroke')(rec,timestamp,options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getStroke'), fn);
        }

        if (isDefined(properties.getLineColor)) {
            let fn = async (rec, timestamp, options) => {
                that.props.lineColor = await that.getFunc('getLineColor')(rec,timestamp,options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getLineColor'), fn);
        }

        if (isDefined(properties.getBackgroundColor)) {
            let fn = async (rec, timestamp, options) => {
                that.props.backgroundColor = await that.getFunc('getBackgroundColor')(rec,timestamp,options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getLineColor'), fn);
        }

        if (isDefined(properties.getValues)) {
            let fn = async (rec, timestamp, options) => {
                const value = await that.getFunc('getValues')(rec,timestamp,options);
                if (value != undefined || null) {
                    that.props.x = value.x;
                    that.props.y = value.y;
                }
            };
            this.addFn(that.getDataSourcesIdsByProperty('getValues'), fn);
        }

        this.saveState();
    }
}
export default CurveLayer;
