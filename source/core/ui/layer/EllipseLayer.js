/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2021 Botts Innovative Research, Inc. All Rights Reserved.

 Author: Nicolas Garay <nic.garay@botts-inc.com>

 ******************************* END LICENSE BLOCK ***************************/
import Layer from "./Layer";
import {hasValue} from "../../utils/Utils";

/**
 * Creates a layer container for Ellipses
 *
 * @extends Layer
 * @example
 *
 * import EllipseLayer from 'core/ui/layer/EllipseLayer.js';
 *
 * let ellipseLayer = new EllipseLayer({
        getId : {
            dataSourceIds: [dataSource.getId()],
            handler: (rec) => {
                return rec.id;
            }
        },
        getColor = {
            dataSourceIds: [dataSource.getId()],
            handler: (rec) => {
                return rec.color;
            }
        },
        getEllipse = {
            dataSourceIds: [dataSource.getId()],
            handler: (rec) => {
                return {
                    location: {
                        x: rec.lon,
                        y: rec.lat,
                        z: rec.alt === undefined ? 0 : rec.alt
                    },
                    semiMajorAxis: rec.semiMajorAxis,
                    semiMinorAxis: rec.semiMinorAxis,
                    angle: rec.angle;
                }
            }
        }
    });
 */
class EllipseLayer extends Layer {

    /**
     * Creates an EllipseLayer
     *
     * @param {Object} properties
     */
    constructor(properties) {
        super(properties);
        this.type = 'ellipse';
        this.properties = properties;
        this.props.ellipses = {};
        this.props.color = '#FFFFFF';
        this.props.ellipseId = 'ellipse';

        if (hasValue(properties.color)) {
            this.props.color = properties.color;
        }

         let that = this;

        if (this.checkFn('getId')) {
            let fn = function(rec, timeStamp, options) {
                that.props.ellipseId =
                    that.getFunc('getId')(rec, timeStamp, options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getId'),fn);
        }

        if (this.checkFn('getEllipse')) {
            let fn = function(rec, timeStamp, options) {
                that.props.ellipses[that.props.ellipseId] =
                    that.getFunc('getEllipse')(rec, timeStamp, options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getEllipse'),fn);
        }

        if (this.checkFn('getColor')) {
            let fn = function(rec, timeStamp, options) {
                that.props.color =
                    that.getFunc('getColor')(rec, timeStamp, options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getColor'),fn);
        }

        this.saveState();
    }

    /**
     *
     */
    clear() {
        this.props.ellipses[this.props.ellipseId] = [];
    }
}

export default EllipseLayer;