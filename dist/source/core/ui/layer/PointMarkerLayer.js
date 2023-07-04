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

import {
    assertArray,
    assertFunction, assertNumber,
    assertObject,
    assertPositive,
    assertString,
    assertBoolean,
    hasValue,
    isDefined
} from "../../utils/Utils.js";
import Layer from "./Layer.js";

/**
 * @extends Layer
 * @example
 *
 * import PointMarkerLayer from 'core/ui/layer/PointMarkerLayer.js';
 *
 * let pointMarkerLayer = new PointMarkerLayer({
        location : {
            x : 1.42376557,
            y : 43.61758626,
            z : 100
        },
        getLocation : {
            dataSourceIds : [androidPhoneGpsDataSource.getId()],
            handler : function(rec) {
                return {
                    x : rec.lon,
                    y : rec.lat,
                    z : rec.alt
                };
            }
        },
        getOrientation : {
            dataSourceIds : [androidPhoneOrientationDataSource.getId()],
            handler : function(rec) {
                return {
                    heading : rec.heading
                };
            }
        },
        icon : 'images/cameralook.png',
        getIcon : {
            dataSourceIds: [androidPhoneGpsDataSource.getId()],
            handler : function(rec,timeStamp,options) {
                if(options.selected) {
                    return 'images/cameralook-selected.png'
                } else {
                    return 'images/cameralook.png';
                };
            }
        }
    });
 */
const initialStates = {};
class PointMarkerLayer extends Layer {
    /**
     * Create the PointMarker
     * @param {Object} properties
     * @param {Number[]} properties.location - [x,y,z]
     * @param {Number} [properties.orientation=0] -
     * @param {String} properties.icon -
     * @param {Number} [properties.iconScale=1] - the icon scale size
     * @param {String} [properties.iconColor="#000000"] - the icon color
     * @param {Number[]} [properties.iconAnchor=[16,16]] -
     * @param {Number[]} [properties.iconSize=[16,16]] -
     * @param {Number} [properties.iconOpacity=0.75] - icon opacity
     * @param {String} [properties.label=""] - the label to display
     * @param {String} [properties.labelColor="#000000"] - color
     * @param {String} [properties.labelOutlineColor=undefined] - color
     * @param {String} [properties.labelBackgroundColor=undefined] -  color
     * @param {Number} [properties.labelSize=16] -
     * @param {Number} [properties.labelScale=1.0] - label scale
     * @param {Number[]} [properties.labelOffset=[0,0]] -
     * @param {Number} [properties.zIndex=0] - z-ordering of markers
     * @param {Number} [properties.allowBillboardRotation=true] - allow billboard rotation
     * @param {Function} [properties.getLocation] -
     * @param {Function} [properties.getDescription] -
     * @param {Function} [properties.getOrientation] -
     * @param {Function} [properties.getIcon] -
     * @param {Function} [properties.getIconColor] -
     * @param {Function} [properties.getIconScale] -
     * @param {Function} [properties.getLabel] -
     * @param {Function} [properties.getLabelColor] -
     * @param {Function} [properties.getLabelSize] -
     * @param {Function} [properties.getZindex] - z-ordering of markers
     * @param {Function} [properties.getMarkerId] - map an id to a unique marker
     * @param {Number} [properties.zoomLevel=15] - Set the default zoom level
     * @param {Boolean} [properties.defaultToTerrainElevation=false] - Set the default to terrain elevation
     *
     */
    constructor(properties) {
        super(properties);
        this.type = 'marker';
    }

    // call by super class
    init(properties=this.properties) {
        super.init(properties);
        const props = {
            markerId: () => this.getId(),
            location: null,
            orientation: {heading: 0},
            icon: null,
            iconAnchor: [16, 16],
            iconSize: [16, 16],
            iconScale: 1.0,
            iconColor: undefined,
            iconOpacity: 0.75,
            label: null,
            labelColor: undefined,
            labelOutlineColor: undefined,
            labelBackgroundColor: undefined,
            labelSize: 16,
            labelScale: 1.0,
            labelOffset: [0, 0],
            zoomLevel: 15,
            defaultToTerrainElevation: false,
            zIndex: 0,
            allowBillboardRotation: true,
            options: {}
        };

        if (isDefined(properties.defaultToTerrainElevation)) {
            props.defaultToTerrainElevation = properties.defaultToTerrainElevation;
        }

        if (hasValue(properties.location)) {
            assertObject(properties.location, "location");
            props.location = properties.location;
        }

        if (hasValue(properties.orientation)) {
            assertObject(properties.orientation, "orientation");
            props.orientation = properties.orientation;
        }

        if (hasValue(properties.icon)) {
            assertString(properties.icon, "icon");
            props.icon = properties.icon;
        }

        if (hasValue(properties.iconAnchor)) {
            assertArray(properties.iconAnchor, "iconAnchor");
            props.iconAnchor = properties.iconAnchor;
        }

        if (hasValue(properties.iconSize)) {
            assertArray(properties.iconSize, "iconSize");
            props.iconSize = properties.iconSize;
        }

        if (hasValue(properties.iconScale)) {
            assertPositive(properties.iconScale, "iconScale");
            props.iconScale = properties.iconScale;
        }

        if (hasValue(properties.iconColor)) {
            assertString(properties.iconColor, "iconColor");
            props.iconColor = properties.iconColor;
        }

        if (hasValue(properties.iconOpacity)) {
            assertString(properties.iconOpacity, "iconOpacity");
            props.iconOpacity = properties.iconOpacity;
        }

        if (hasValue(properties.label)) {
            assertString(properties.label, "label");
            props.label = properties.label;
        }

        if (hasValue(properties.labelColor)) {
            assertString(properties.labelColor, "labelColor");
            props.labelColor = properties.labelColor;
        }

        if (hasValue(properties.labelOutlineColor)) {
            assertString(properties.labelOutlineColor, "labelOutlineColor");
            props.labelOutlineColor = properties.labelOutlineColor;
        }

        if (hasValue(properties.labelBackgroundColor)) {
            assertString(properties.labelBackgroundColor, "labelBackgroundColor");
            props.labelBackgroundColor = properties.labelBackgroundColor;
        }

        if (hasValue(properties.labelSize)) {
            assertPositive(properties.labelSize, "labelSize");
            props.labelSize = properties.labelSize;
        }

        if (hasValue(properties.labelScale)) {
            assertPositive(properties.labelScale, "labelScale");
            props.labelScale = properties.labelScale;
        }

        if (hasValue(properties.labelOffset)) {
            assertArray(properties.labelOffset, "labelOffset");
            props.labelOffset = properties.labelOffset;
        }


        if (hasValue(properties.zoomLevel)) {
            assertPositive(properties.zoomLevel, "zoomLevel");
            props.zoomLevel = properties.zoomLevel;
        }

        if (hasValue(properties.zIndex)) {
            assertNumber(properties.zIndex, "zIndex");
            props.zIndex = properties.zIndex;
        }

        if (hasValue(properties.allowBillboardRotation)) {
            assertBoolean(properties.allowBillboardRotation, "allowBillboardRotation");
            props.allowBillboardRotation = properties.allowBillboardRotation;
        }

        this.definedId('markerId', props);

        if (this.checkFn("getLocation")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('location',await this.getFunc('getLocation')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getLocation'), fn);
        }

        if (this.checkFn("getOrientation")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('orientation',await this.getFunc('getOrientation')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getOrientation'), fn);
        }

        if (this.checkFn("getIcon")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('icon',await this.getFunc('getIcon')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getIcon'), fn);
        }

        if (this.checkFn("getIconColor")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('iconColor',await this.getFunc('getIconColor')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getIconColor'), fn);
        }

        if (this.checkFn("getIconScale")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('iconScale',await this.getFunc('getIconScale')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getIconScale'), fn);
        }

        if (this.checkFn("getLabel")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('label',await this.getFunc('getLabel')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getLabel'), fn);
        }

        if (this.checkFn("getLabelColor")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('labelColor',await this.getFunc('getLabelColor')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getLabelColor'), fn);
        }

        if (this.checkFn("getLabelSize")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('labelSize',await this.getFunc('getLabelSize')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getLabelSize'), fn);
        }

        if (this.checkFn("getZindex")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('zIndex',await this.getFunc('getZindex')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getZindex'), fn);
        }
    }
}

export default PointMarkerLayer;
