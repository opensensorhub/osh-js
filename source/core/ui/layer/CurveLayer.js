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
    }
    // call by super class
    init(properties=this.properties) {
        super.init(properties);
        const props = {
            xLabel : "",
            yLabel : "",
            lineColor : "#399ca5",
            backgroundColor : "#399ca5",
            fill : false,
            stroke : 1,
            curveId : randomUUID(),
            x : 0,
            y : 0,
            maxValues : 10
        };


        if (isDefined(properties.stroke)) {
            props.stroke = properties.stroke;
        }

        if (isDefined(properties.maxValues)) {
            props.maxValues = properties.maxValues;
        }

        if (isDefined(properties.lineColor)) {
            props.lineColor = properties.lineColor;
        }

        if (isDefined(properties.backgroundColor)) {
            props.backgroundColor = properties.backgroundColor;
        }

        if (isDefined(properties.fill)) {
            props.fill = properties.fill;
        }

        if (isDefined(properties.x)) {
            props.x = properties.x;
        }

        if (isDefined(properties.y)) {
            props.y = properties.y;
        }


        this.definedId('curveId', props);

        if (isDefined(properties.getStroke)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('stroke',await this.getFunc('getStroke')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getStroke'), fn);
        }

        if (isDefined(properties.getLineColor)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('lineColor',await this.getFunc('getLineColor')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getLineColor'), fn);
        }

        if (isDefined(properties.getBackgroundColor)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('backgroundColor',await this.getFunc('getBackgroundColor')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getLineColor'), fn);
        }

        if (isDefined(properties.getValues)) {
            let fn = async (rec, timestamp, options) => {
                const value = await this.getFunc('getValues')(rec,timestamp,options);
                this.updateProperty('x',value.x);
                this.updateProperty('y',value.y);
            };
            this.addFn(this.getDataSourcesIdsByProperty('getValues'), fn);
        }
    }
}
export default CurveLayer;
