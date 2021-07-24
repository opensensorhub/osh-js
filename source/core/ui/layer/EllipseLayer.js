/***************************** BEGIN LICENSE BLOCK ***************************
 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.
 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.
 Copyright (C) 2021 Botts Innovative Research, Inc. All Rights Reserved.
 Author: Drew Botts <drew@botts-inc.com>
 ******************************* END LICENSE BLOCK ***************************/
import Layer from "./Layer.js";
import {isDefined} from "../../utils/Utils";

/**
 * @extends Layer
 * @example
 *
 * import EllipseLayer from 'osh-js/core/ui/layer/EllipseLayer';
 *
 * let ellipse = new EllipseLayer({
        dataSourceId: gpsDataSource.id,
        getPosition: (rec) => ({
            x: rec.location.lon,
            y: rec.location.lat,
            z: rec.location.alt
        }),
        color: 'rgba(255,74,22, 0.5)',
        semiMinorAxis: 100,
        semiMajorAxis: 200,
        name: "Android Phone GPS Path"
    });
 */
class EllipseLayer extends Layer {

    /**
     * Creates the EllipseLayer
     * @param {Object} properties
     * @param {Object[]} [properties.position] - defines the default location of the ellipse [lat, lon, alt]
     * @param {Number} [properties.semiMajorAxis=null] - defines the semi-major axis of the ellipse
     * @param {Number} [properties.semiMinorAxis=null] - defines the semi-minor axis of the ellipse
     * @param {Number} [properties.rotation=null] - defines the rotation of the ellipse counter-clockwise from north.
     * @param {Boolean} [properties.clampToGround=false] - defines if the line has to be clamped to ground
     * @param {String} [properties.color='red'] - defines the color property of the ellipse
     * @param {Function} [properties.getPosition] - defines a function to return the location
     * @param {Function} [properties.getColor] - defines a function to return the color
     * @param {Function} [properties.getSemiMajorAxis] - defines a function to return the semiMajorAxis
     * @param {Function} [properties.getSemiMinorAxis] - defines a function to return the semiMinorAxis
     * @param {Function} [properties.getHeight] - defines a function to return the height of the ellipse above the ellipsoid
     * @param {Function} [properties.getRotation] - defines a function to return the rotation of the ellipse
     * @param {Function} [properties.getEllipseID] - map an id to a unique ellipse
     */
    constructor(properties) {
        super(properties);
        this.type = 'ellipse';
        this.properties = properties;
        this.props.position = {};
        this.props.semiMajorAxis = null;
        this.props.semiMinorAxis = null;
        this.props.rotation = null;
        this.props.clampToGround = false;
        this.props.color = 'red';
        this.props.ellipseId = 'ellipse';
        this.props.name = '';


        if (isDefined(properties.name)){
            this.props.name = properties.name;
        }

        if (isDefined(properties.id)){
            this.props.id = properties.id;
        }

        if (isDefined(properties.color)){
            this.props.color = properties.color;
        }

        if (isDefined(properties.clampToGround)){
            this.props.clampToGround = properties.clampToGround;
        }

        if (isDefined(properties.rotation)){
            this.props.rotation = properties.rotation;
        }

        if (isDefined(properties.semiMinorAxis)){
            this.props.semiMinorAxis = properties.semiMinorAxis;
        }

        if (isDefined(properties.semiMajorAxis)){
            this.props.semiMajorAxis = properties.semiMajorAxis;
        }

        if (isDefined(properties.position)){
            this.props.position = properties.position;
        }

        let that = this;

        if (isDefined(properties.getEllipseID)){
            let fn = function (rec) {
                that.props.ellipseId = that.getFunc('getEllipseID')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getEllipseID'), fn);
        }

        if (isDefined(properties.getPosition)){
            let fn = function (rec){
                that.props.position = that.getFunc('getPosition')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getPosition'), fn);
        }

        if (isDefined(properties.getSemiMajorAxis)){
            let fn = function (rec){
                that.props.semiMajorAxis = that.getFunc('getSemiMajorAxis')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getSemiMajorAxis'), fn);
        }

        if (isDefined(properties.getSemiMinorAxis)){
            let fn = function (rec){
                that.props.semiMinorAxis = that.getFunc('getSemiMinorAxis')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getSemiMinorAxis'), fn);
        }

        if (isDefined(properties.getHeight)){
            let fn = function (rec){
                that.props.height = that.getFunc('getHeight')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getHeight'), fn);
        }

        if (isDefined(properties.getRotation)){
            let fn = function (rec){
                that.props.rotation = that.getFunc('getRotation')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getRotation'), fn);
        }

        if (isDefined(properties.getColor)){
            let fn = function (rec){
                that.props.color = that.getFunc('getColor')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getColor'), fn);
        }

        this.saveState();
    }
}
export default EllipseLayer;
