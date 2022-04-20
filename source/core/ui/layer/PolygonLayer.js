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

        this.properties = properties;
        this.props.vertices = {};
        this.props.polygonId = randomUUID();
        this.props.color = 'rgb(255,0,0)';
        this.props.outlineColor = 'rgb(0,0,0)';
        this.props.outlineWidth = 1;
        this.props.opacity = 1;
        this.props.clampToGround = false;

        const that = this;

        if(isDefined(properties.vertices)){
            this.props.vertices = properties.vertices;
        }

        if(isDefined(properties.color)){
            this.props.color = properties.color;
        }

        if(isDefined(properties.outlineWidth)){
            this.props.outlineWidth = properties.outlineWidth;
        }

        if(isDefined(properties.outlineColor)){
            this.props.outlineColor = properties.outlineColor;
        }

        if(isDefined(properties.opacity)){
            this.props.opacity = properties.opacity;
        }

        if(isDefined(properties.clampToGround)){
            this.props.clampToGround = properties.clampToGround;
        }

        // must be first to assign correctly the first location to the right id if it is defined
        if(isDefined(properties.getPolygonId)) {
            let fn = async (rec) => {
                that.props.polygonId = await that.getFunc('getPolygonId')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getPolygonId'),fn);
        }

        if (isDefined(properties.getVertices)) {
            let fn = async (rec, timestamp, options) => {
                let vertices = await that.getFunc('getVertices')(rec, timestamp, options);
                if (!(that.props.polygonId in that.props.vertices)) {
                    that.props.vertices[that.props.polygonId] = [];
                }
                that.props.vertices[that.props.polygonId] = vertices;
            };
            this.addFn(that.getDataSourcesIdsByProperty('getVertices'), fn);
        }

        if(isDefined(properties.getColor)) {
            let fn = async (rec) => {
                that.props.color = await that.getFunc('getColor')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getColor'),fn);
        }

        if(isDefined(properties.getOutlineWidth)) {
            let fn = async (rec) => {
                that.props.outlineWidth = await that.getFunc('getOutlineWidth')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getOutlineWidth'),fn);
        }

        if(isDefined(properties.getOutlineColor)) {
            let fn = async (rec) => {
                that.props.outlineColor = await that.getFunc('getOutlineColor')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getOutlineColor'),fn);
        }

        if(isDefined(properties.getOpacity)) {
            let fn = async (rec) => {
                that.props.opacity = await that.getFunc('getOpacity')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getOpacity'),fn);
        }

        this.saveState();
    }
}

export default  PolygonLayer;
