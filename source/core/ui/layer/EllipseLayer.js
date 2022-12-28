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
import {assertNumber, hasValue, isDefined} from "../../utils/Utils";

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
     * @param {Number} [properties.zIndex=0] - z-ordering of ellipses
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
    }
    // call by super class
    init(properties=this.properties) {
        super.init(properties);
        const props = {
            position : {},
            semiMajorAxis : null,
            semiMinorAxis : null,
            rotation : null,
            clampToGround : false,
            color : 'red',
            ellipseId : 'ellipse',
            zIndex : 0,
        };


        if (isDefined(properties.color)){
            props.color = properties.color;
        }

        if (isDefined(properties.clampToGround)){
            props.clampToGround = properties.clampToGround;
        }

        if (isDefined(properties.rotation)){
            props.rotation = properties.rotation;
        }

        if (isDefined(properties.semiMinorAxis)){
            props.semiMinorAxis = properties.semiMinorAxis;
        }

        if (isDefined(properties.semiMajorAxis)){
            props.semiMajorAxis = properties.semiMajorAxis;
        }

        if (isDefined(properties.position)){
            props.position = properties.position;
        }

        if (hasValue(properties.zIndex)) {
            assertNumber(properties.zIndex, "zIndex");
            props.zIndex = properties.zIndex;
        }

        this.definedId('ellipseID', props)

        if (isDefined(properties.getPosition)){
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('position',await this.getFunc('getPosition')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getPosition'), fn);
        }

        if (isDefined(properties.getSemiMajorAxis)){
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('semiMajorAxis',await this.getFunc('getSemiMajorAxis')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getSemiMajorAxis'), fn);
        }

        if (isDefined(properties.getSemiMinorAxis)){
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('semiMinorAxis',await this.getFunc('getSemiMinorAxis')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getSemiMinorAxis'), fn);
        }

        if (isDefined(properties.getHeight)){
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('height',await this.getFunc('getHeight')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getHeight'), fn);
        }

        if (isDefined(properties.getRotation)){
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('rotation',await this.getFunc('getRotation')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getRotation'), fn);
        }

        if (isDefined(properties.getColor)){
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('color',await this.getFunc('getColor')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getColor'), fn);
        }
    }
}
export default EllipseLayer;
