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
     * @param {Function} [properties.getPolygonId] - map an id to a unique polygon
     */
    constructor(properties) {
        super(properties);
        this.type = 'polygon';

        this.properties = properties;
        this.props.vertices = {};
        this.props.polygonId = randomUUID();

        const that = this;

        if(isDefined(properties.vertices)){
            this.props.vertices = properties.vertices;
        }

        // must be first to assign correctly the first location to the right id if it is defined
        if(isDefined(properties.getPolygonId)) {
            let fn = function(rec) {
                that.props.polygonId = that.getFunc('getPolygonId')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getPolygonId'),fn);
        }

        if (isDefined(properties.getVertices)) {
            let fn = function (rec, timeStamp, options) {
                let vertices = that.getFunc('getVertices')(rec,timeStamp,options);
                if(!(that.props.polygonId in that.props.vertices)) {
                    that.props.vertices[that.props.polygonId] = [];
                }
                that.props.vertices[that.props.polygonId] = vertices;
            };
            this.addFn(that.getDataSourcesIdsByProperty('getVertices'), fn);
        }

        this.saveState();
    }
}

export default  PolygonLayer;
