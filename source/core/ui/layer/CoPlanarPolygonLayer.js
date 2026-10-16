/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut

 ******************************* END LICENSE BLOCK ***************************/

import PolygonLayer from "./PolygonLayer.js";

/**
 * This coplanar polygon layer class defines the constructs necessary to create render-able polygons
 *
 * @extends PolygonLayer
 * @example
 import CoPlanarPolygonLayer from 'core/ui/layer/PolygonLayer.js';

 let boundedDrapingLayer = new PolygonLayer({
           getVertices : {
                dataSourceIds: [boundsDatasource.getId()],
                handler: (rec) => {
                    return [
                        rec.ulc.lon,
                        rec.ulc.lat,
                        rec.ulc.alt,
                        rec.urc.lon,
                        rec.urc.lat,
                        rec.ulc.alt,
                        rec.llc.lon,
                        rec.llc.lat,
                        rec.ulc.alt,
                        rec.lrc.lon,
                        rec.lrc.lat,
                        rec.ulc.alt,
                    ];
                }
            },
    });
 */
class CoPlanarPolygonLayer extends PolygonLayer {
    /**
     * Creates the PolygonLayer
     *
     * @param {Object} properties
     * @param {Number[]} [properties.vertices] - defines the default vertices as an array of lat, lon e.g. [lat0, lon0, alt0, lat1, lon2, alt1, ... , latN, lonN, altN,]
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
        this.type = 'coplanarPolygon';
    }
}

export default CoPlanarPolygonLayer;
