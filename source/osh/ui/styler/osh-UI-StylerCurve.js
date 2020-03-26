/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import Styler from "./osh-UI-Styler.js";
import {isDefined} from "../../osh-Utils.js";

/**
 * @classdesc
 * @class Curve
 * @type {Style}
 * @augments Styler
 */
export default class Curve extends Styler {
    constructor(properties) {
        super(properties);
        this.xLabel = "";
        this.yLabel = "";
        this.color = "#000000";
        this.stroke = 1;
        this.x = 0;
        this.y = [];

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

        if (isDefined(properties.strokeFunc)) {
            let fn = function (rec, timeStamp, options) {
                that.stroke = properties.strokeFunc.handler(rec, timeStamp, options);
            };
            this.addFn(properties.strokeFunc.dataSourceIds, fn);
        }

        if (isDefined(properties.colorFunc)) {
            let fn = function (rec, timeStamp, options) {
                that.color = properties.colorFunc.handler(rec, timeStamp, options);
            };
            this.addFn(properties.colorFunc.dataSourceIds, fn);
        }

        if (isDefined(properties.valuesFunc)) {
            let fn = function (rec, timeStamp, options) {
                let values = properties.valuesFunc.handler(rec, timeStamp, options);
                that.x = values.x;
                that.y = values.y;
            };
            this.addFn(properties.valuesFunc.dataSourceIds, fn);
        }
    }

    /**
     * @param dataSourceId
     * @param rec
     * @param view
     * @param options
     * @instance
     * @memberof Curve
     */
    setData(dataSourceId, rec, view, options) {
        if (super.setData(dataSourceId, rec, view, options)) {
            //if(typeof(view) != "undefined" && view.hasOwnProperty('updateMarker')){
            if (isDefined(view)) {
                view.updateCurve(this, rec.timeStamp, options);
                return true;
            }
        }
        return false;
    }
}
