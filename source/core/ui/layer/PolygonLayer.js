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

import {isDefined, randomUUID} from "../../utils/Utils.js";
import Layer from "./Layer.js";

/**
 * This polygon layer class defines the constructs necessary to create render-able polygons
 *
 * @extends Layer
 * @example
 import PolygonLayer from 'core/ui/layer/PolygonLayer.js';

 let boundedDrapingLayer = new PolygonLayer({
           getVertices : {
                dataSourceIds: [boundsDatasource.getId()],
                handler: (rec) => {
                    return [
                        rec.ulc.lon,
                        rec.ulc.lat,
                        rec.urc.lon,
                        rec.urc.lat,
                        rec.llc.lon,
                        rec.llc.lat,
                        rec.lrc.lon,
                        rec.lrc.lat,
                    ];
                }
            },
    });
 */
class PolygonLayer extends Layer {
    /**
     * Creates the PolygonLayer
     *
     * @param {Object} properties
     * @param {Number[]} [properties.vertices] - defines the default vertices as an array of lat, lon e.g. [lat0, lon0, lat1, lon2, ... , latN, lonN]
     * @param {Function} [properties.getVertices] - defines a function to return the vertices as an array of lat, lon
     *      e.g. [lat0, lon0, lat1, lon2, ... , latN, lonN]
     * @param {String} [properties.outlineColor=rgb(0,0,0)] - defines the weight of the polyline
     * @param {Number} [properties.outlineWidth=1] - defines the weight of the polyline
     * @param {String} [properties.color=rgb(255,0,0)] - defines the color of the polyline
     * @param {Number} [properties.opacity=1] - defines the opacity of the polyline
     * @param {Boolean} [properties.clampToGround=false] - defines if the line has to be clamped to ground
     * @param {Function} [properties.getColor] - defines a function to return the color
     * @param {Function} [properties.getOpacity] - defines a function to return the opacity
 	 * @param {Function} [properties.getOutlineColor] - defines a function to return the outline color
     * @param {Function} [properties.getOutlineWidth] - defines a function to return the outline width
     * @param {Function} [properties.getPolygonId] - map an id to a unique polygon
     */
    constructor(properties) {
        super(properties);
        this.type = 'polygon';
    }
    
    // call by super class
    init(properties=this.properties) {
        super.init(properties);

        const props = {
            vertices : null,
            color : 'rgb(255,0,0)',
            outlineColor : 'rgb(0,0,0)',
            outlineWidth : 1,
            opacity : 1,
            clampToGround : false
        };

        if(isDefined(properties.vertices)){
            props.vertices = properties.vertices;
        }

        if(isDefined(properties.color)){
            props.color = properties.color;
        }

        if(isDefined(properties.outlineWidth)){
            props.outlineWidth = properties.outlineWidth;
        }

        if(isDefined(properties.outlineColor)){
            props.outlineColor = properties.outlineColor;
        }

        if(isDefined(properties.opacity)){
            props.opacity = properties.opacity;
        }

        if(isDefined(properties.clampToGround)){
            props.clampToGround = properties.clampToGround;
        }

        this.definedId('polygonId', props);

        if (isDefined(properties.getVertices)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('vertices',await this.getFunc('getVertices')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getVertices'), fn);
        }

        if(isDefined(properties.getColor)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('color',await this.getFunc('getColor')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getColor'),fn);
        }

        if(isDefined(properties.getOutlineWidth)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('outlineWidth',await this.getFunc('getOutlineWidth')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getOutlineWidth'),fn);
        }

        if(isDefined(properties.getOutlineColor)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('outlineColor',await this.getFunc('getOutlineColor')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getOutlineColor'),fn);
        }

        if(isDefined(properties.getOpacity)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('opacity',await this.getFunc('getOpacity')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getOpacity'),fn);
        }
    }
}

export default  PolygonLayer;
