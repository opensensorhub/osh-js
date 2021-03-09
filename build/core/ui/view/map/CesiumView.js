/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Sensia Software LLC. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>
 Author: Alex Robin <alex.robin@sensiasoft.com>

 ******************************* END LICENSE BLOCK ***************************/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { isDefined } from "../../../utils/Utils.js";
import { when, Cartographic, Cartesian3, Cartesian2, Color, HorizontalOrigin, VerticalOrigin, HeightReference, Math, Transforms, Matrix3, Matrix4, MaterialAppearance, Material, sampleTerrain, GeometryInstance, RectangleGeometry, Rectangle, Primitive, createDefaultImageryProviderViewModels, Viewer, WebMapServiceImageryProvider, EllipsoidTerrainProvider, NearFarScalar, HeadingPitchRoll, HeadingPitchRange, Ellipsoid, EncodedCartesian3, ScreenSpaceEventType, CallbackProperty } from 'cesium';
import ImageDrapingVS from "./shaders/ImageDrapingVS.js";
import ImageDrapingFS from "./shaders/ImageDrapingFS.js";
import "cesium/Build/Cesium/Widgets/widgets.css";
import MapView from "./MapView";
/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the Cesium object.
 * @extends MapView
 * @example

 import CesiumView from 'core/ui/view/map/CesiumView.js';

 // style it with a moving point marker
 let pointMarker = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat
    }),
    orientation: {
        heading: 0
    },
    icon: 'images/car-location.png',
    iconAnchor: [16, 40]
});

 // #region snippet_cesium_location_view
 // create Cesium view
 let cesiumView = new CesiumView({
    container: 'cesium-container',
    layers: [pointMarker]
});
 */
var CesiumView = /** @class */ (function (_super) {
    __extends(CesiumView, _super);
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Boolean} [properties.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     * @param {Object} [properties.cesiumProps={}] - Properties which can override the default framework ones
     * @param {Object} [properties.cesiumProps.viewerProps={}] - the properties of the [Cesium]{@link https://cesium.com/docs/cesiumjs-ref-doc/Viewer.html?classFilter=Viewer} Viewer object
     *
     */
    function CesiumView(properties) {
        var _this = _super.call(this, __assign({ supportedLayers: ['marker', 'draping', 'polyline'] }, properties)) || this;
        var cssClass = document.getElementById(_this.divId).className;
        document.getElementById(_this.divId).setAttribute("class", cssClass + " " + _this.css);
        _this.imageDrapingPrimitive = null;
        _this.imageDrapingPrimitiveReady = false;
        _this.frameCount = 0;
        _this.captureCanvas = document.createElement('canvas');
        _this.captureCanvas.width = 640;
        _this.captureCanvas.height = 480;
        return _this;
    }
    /**
     * Updates the marker associated to the layer.
     * @param {PointMarkerLayer.props} props - The layer properties allowing the update of the marker
     */
    CesiumView.prototype.updateMarker = function (props) {
        // for the first data, we can receive the orientation before the first location point
        if (!isDefined(props.location)) {
            return;
        }
        var marker = this.getMarker(props);
        if (!isDefined(marker)) {
            var markerObj = this.addMarker({
                lat: props.location.y,
                lon: props.location.x,
                alt: props.location.z,
                orientation: props.orientation,
                icon: props.icon,
                iconAnchor: props.iconAnchor,
                label: props.label,
                labelColor: props.labelColor,
                labelSize: props.labelSize,
                labelOffset: props.labelOffset,
                name: props.name,
                description: props.description,
                id: props.id + "$" + props.markerId
            });
            this.addMarkerToLayer(props, markerObj);
        }
        this.updateMapMarker(props, {
            lat: props.location.y,
            lon: props.location.x,
            alt: props.location.z,
            orientation: props.orientation,
            icon: props.icon,
            label: props.label,
            labelColor: props.labelColor,
            labelSize: props.labelSize,
            defaultToTerrainElevation: props.defaultToTerrainElevation
        });
    };
    /**
     * Updates the image draping associated to the layer.
     * @param {ImageDrapingLayer.props} props - The layer properties allowing the update of the image draping
     */
    CesiumView.prototype.updateDrapedImage = function (props) {
        if (!isDefined(props.platformLocation)) {
            return;
        }
        var llaPos = props.platformLocation;
        var DTR = Math.PI / 180;
        var attitude = props.platformOrientation;
        var gimbal = props.gimbalOrientation;
        ///////////////////////////////////////////////////////////////////////////////////
        // compute rotation matrix to transform lookrays from camera frame to ECEF frame //
        ///////////////////////////////////////////////////////////////////////////////////
        var camPos = Cartesian3.fromDegrees(llaPos.x, llaPos.y, llaPos.z);
        var nedTransform = Transforms.northEastDownToFixedFrame(camPos);
        var camRot = new Matrix3();
        Matrix4.getMatrix3(nedTransform, camRot);
        var rotM = new Matrix3();
        if (isDefined(attitude)) {
            // UAV heading, pitch, roll (given in NED frame)
            var uavHeading = Matrix3.fromRotationZ(attitude.heading * DTR, rotM);
            Matrix3.multiply(camRot, uavHeading, camRot);
            var uavPitch = Matrix3.fromRotationY(attitude.pitch * DTR, rotM);
            Matrix3.multiply(camRot, uavPitch, camRot);
            var uavRoll = Matrix3.fromRotationX(attitude.roll * DTR, rotM);
            Matrix3.multiply(camRot, uavRoll, camRot);
        }
        // gimbal angles (on solo gimbal, order is yaw, roll, pitch!)
        if (isDefined(gimbal)) {
            var gimbalYaw = Matrix3.fromRotationZ(gimbal.heading * DTR, rotM);
            Matrix3.multiply(camRot, gimbalYaw, camRot);
            var gimbalRoll = Matrix3.fromRotationX(gimbal.roll * DTR, rotM);
            Matrix3.multiply(camRot, gimbalRoll, camRot);
            var gimbalPitch = Matrix3.fromRotationY((90 + gimbal.pitch) * DTR, rotM);
            Matrix3.multiply(camRot, gimbalPitch, camRot);
        }
        // transform to camera frame
        var img2cam = Matrix3.fromRotationZ(90 * DTR, rotM);
        Matrix3.multiply(camRot, img2cam, camRot);
        ////////////////////////////////////////////////////////////////////////////////////
        var camProj = props.cameraModel.camProj;
        var camDistR = props.cameraModel.camDistR;
        var camDistT = props.cameraModel.camDistT;
        var imgSrc = props.imageSrc;
        {
            var snapshot_1 = false;
            if (props.getSnapshot !== null) {
                snapshot_1 = props.getSnapshot();
            }
            // snapshot
            if (props.snapshot) {
                var ctx = this.captureCanvas.getContext('2d');
                ctx.drawImage(imgSrc, 0, 0, this.captureCanvas.width, this.captureCanvas.height);
                imgSrc = this.captureCanvas;
            }
            var encCamPos = EncodedCartesian3.fromCartesian(camPos);
            var appearance_1 = new MaterialAppearance({
                material: new Material({
                    fabric: {
                        type: 'Image',
                        uniforms: {
                            image: imgSrc,
                            camPosHigh: encCamPos.high,
                            camPosLow: encCamPos.low,
                            camAtt: Matrix3.toArray(Matrix3.transpose(camRot, new Matrix3())),
                            camProj: Matrix3.toArray(camProj),
                            camDistR: camDistR,
                            camDistT: camDistT
                        }
                    }
                }),
                vertexShaderSource: ImageDrapingVS,
                fragmentShaderSource: ImageDrapingFS
            });
            if (this.imageDrapingPrimitive === null || snapshot_1) {
                if (this.imageDrapingPrimitive === null)
                    this.imageDrapingPrimitive = {};
                var promise = sampleTerrain(this.viewer.terrainProvider, 11, [Cartographic.fromDegrees(llaPos.x, llaPos.y)]);
                var that_1 = this;
                when(promise, function (updatedPositions) {
                    //console.log(updatedPositions[0]);
                    var newImageDrapingPrimitive = that_1.viewer.scene.primitives.add(new Primitive({
                        geometryInstances: new GeometryInstance({
                            geometry: new RectangleGeometry({
                                rectangle: Rectangle.fromDegrees(llaPos.x - 0.1, llaPos.y - 0.1, llaPos.x + 0.1, llaPos.y + 0.1),
                                height: updatedPositions[0].height,
                                extrudedHeight: llaPos.z - 1
                            })
                        }),
                        appearance: appearance_1
                    }));
                    if (!snapshot_1)
                        that_1.imageDrapingPrimitive = newImageDrapingPrimitive;
                    that_1.viewer.scene.primitives.raiseToTop(that_1.imageDrapingPrimitive);
                    that_1.imageDrapingPrimitiveReady = true;
                });
            }
            else if (this.imageDrapingPrimitiveReady) {
                this.imageDrapingPrimitive.appearance = appearance_1;
            }
        }
        this.frameCount++;
    };
    //---------- MAP SETUP --------------//
    CesiumView.prototype.beforeAddingItems = function (options) {
        this.first = true;
        // #region snippet_cesiumview_default_cesiumprops_viewer_props
        var imageryProviders = createDefaultImageryProviderViewModels();
        var viewerProps = {
            baseLayerPicker: true,
            imageryProviderViewModels: imageryProviders,
            selectedImageryProviderViewModel: imageryProviders[6],
            timeline: false,
            homeButton: false,
            navigationInstructionsInitiallyVisible: false,
            navigationHelpButton: false,
            geocoder: true,
            fullscreenButton: false,
            showRenderLoopErrors: true,
            animation: false,
            scene3DOnly: true,
            terrainProvider: new EllipsoidTerrainProvider(),
        };
        // #endregion snippet_cesiumview_default_cesiumprops_viewer_props
        if (isDefined(options)) {
            if (options.hasOwnProperty('cesiumProps') && options.cesiumProps.hasOwnProperty('viewerProps')) {
                viewerProps = __assign(__assign({}, viewerProps), options.cesiumProps.viewerProps);
            }
        }
        this.viewer = new Viewer(this.divId, viewerProps);
        this.viewer.scene.copyGlobeDepth = true;
        this.viewer.scene._environmentState.useGlobeDepthFramebuffer = true;
        // inits callbacks
        // Get default left click handler for when a feature is not picked on left click
        var that = this;
        var onClick = function (movement) {
            // Pick a new feature
            var pickedFeature = that.viewer.scene.pick(movement.position);
            if (!isDefined(pickedFeature) || !isDefined(pickedFeature.id)) {
                return;
            }
            var mId = that.getMarkerId(pickedFeature.id.id);
            if (!isDefined(mId)) {
                return;
            }
            var sId = that.getLayerId(pickedFeature.id.id);
            if (!isDefined(sId)) {
                return;
            }
            var layer = that.getLayer(sId);
            if (!isDefined(layer)) {
                return;
            }
            that.viewer.selectedEntity = pickedFeature.id;
            that.viewer.selectedEntity.name = mId;
            pickedFeature.pixel = movement.position;
            that.onMarkerLeftClick(mId, pickedFeature, layer.props, {});
        };
        var onRightClick = function (movement) {
            // Pick a new feature
            var pickedFeature = that.viewer.scene.pick(movement.position);
            if (!isDefined(pickedFeature) || !isDefined(pickedFeature.id)) {
                return;
            }
            var mId = that.getMarkerId(pickedFeature.id.id);
            if (!isDefined(mId)) {
                return;
            }
            var sId = that.getLayerId(pickedFeature.id.id);
            if (!isDefined(sId)) {
                return;
            }
            var layer = that.getLayer(sId);
            if (!isDefined(layer)) {
                return;
            }
            that.viewer.selectedEntity = pickedFeature.id;
            that.viewer.selectedEntity.name = mId;
            pickedFeature.pixel = movement.position;
            that.onMarkerRightClick(mId, pickedFeature, layer.props, {});
        };
        var onHover = function (movement) {
            var pickedFeature = that.viewer.scene.pick(movement.endPosition);
            if (!isDefined(pickedFeature) || !isDefined(pickedFeature.id)) {
                return;
            }
            var mId = that.getMarkerId(pickedFeature.id.id);
            if (!isDefined(mId)) {
                return;
            }
            var sId = that.getLayerId(pickedFeature.id.id);
            if (!isDefined(sId)) {
                return;
            }
            var layer = that.getLayer(sId);
            if (!isDefined(layer)) {
                return;
            }
            pickedFeature.pixel = movement.endPosition;
            that.onMarkerHover(mId, pickedFeature, layer.props, {});
        };
        this.viewer.screenSpaceEventHandler.setInputAction(onClick, ScreenSpaceEventType.LEFT_CLICK);
        this.viewer.screenSpaceEventHandler.setInputAction(onRightClick, ScreenSpaceEventType.RIGHT_CLICK);
        this.viewer.screenSpaceEventHandler.setInputAction(onHover, ScreenSpaceEventType.MOUSE_MOVE);
    };
    /**
     * Abstract method to remove a marker from its corresponding layer.
     * This is library dependent.
     * @param {Object} marker - The Map marker object
     */
    CesiumView.prototype.removeMarkerFromLayer = function (marker) {
        this.viewer.entities.remove(marker);
    };
    /**
     * Add a marker to the map.
     * @param {Object} properties
     * @param {Number} properties.lon
     * @param {Number} properties.lat
     * @param {String} properties.icon - the icon path
     * @param {String} properties.label - label of the tooltip
     * @param {String} properties.description - description of the marker to display into the tooltip
     * @param {Object} properties.orientation.heading - orientation of the icon in degree
     * @return {Entity} the new created entity
     */
    CesiumView.prototype.addMarker = function (properties) {
        var imgIcon = 'images/cameralook.png';
        if (properties.icon !== null) {
            imgIcon = properties.icon;
        }
        var isModel = imgIcon.endsWith(".glb");
        var label = properties.hasOwnProperty("label") && properties.label != null ? properties.label : null;
        var fillColor = properties.labelColor || '#FFFFFF';
        var labelSize = properties.labelSize || 16;
        var iconOffset = new Cartesian2(-properties.iconAnchor[0], -properties.iconAnchor[1]);
        var labelOffset = new Cartesian2(properties.labelOffset[0], properties.labelOffset[1]);
        var name = properties.hasOwnProperty("name") && properties.name != null ? properties.name :
            label != null ? label : "Selected Marker";
        var desc = properties.hasOwnProperty("description") && properties.description != null ? properties.description : null;
        var color = properties.hasOwnProperty("color") && isDefined(properties.color) ?
            Color.fromCssColorString(properties.color) : Color.YELLOW;
        var geom;
        var lonLatAlt = [0, 0, 0];
        if (isDefined(properties.location)) {
            lonLatAlt = [properties.location.x, properties.location.y, properties.location.z || 0];
        }
        if (isModel) {
            geom = {
                name: name,
                description: desc,
                position: Cartesian3.fromDegrees(lonLatAlt[0], lonLatAlt[1], lonLatAlt[2]),
                label: {
                    text: label,
                    font: labelSize + 'px sans-serif',
                    scaleByDistance: new NearFarScalar(150, 1.0, 1e6, 0.0),
                    fillColor: Color.fromCssColorString(fillColor),
                    horizontalOrigin: HorizontalOrigin.CENTER,
                    verticalOrigin: VerticalOrigin.TOP,
                    pixelOffset: labelOffset
                },
                model: {
                    uri: imgIcon,
                    scale: 4,
                    modelM: Matrix4.IDENTITY.clone(),
                    color: color
                }
            };
        }
        else {
            var rot = 0;
            if (isDefined(properties.orientation) && isDefined(properties.orientation.heading)) {
                rot = properties.orientation.heading;
            }
            geom = {
                name: name,
                description: desc,
                position: Cartesian3.fromDegrees(lonLatAlt[0], lonLatAlt[1], lonLatAlt[2]),
                label: {
                    text: label,
                    font: labelSize + 'px sans-serif',
                    scaleByDistance: new NearFarScalar(150, 1.0, 1e6, 0.0),
                    fillColor: Color.fromCssColorString(fillColor),
                    horizontalOrigin: HorizontalOrigin.CENTER,
                    verticalOrigin: VerticalOrigin.TOP,
                    pixelOffset: labelOffset,
                    pixelOffsetScaleByDistance: new NearFarScalar(150, 1.0, 1e6, 0.0)
                },
                billboard: {
                    image: imgIcon,
                    scaleByDistance: new NearFarScalar(1000, 1.0, 10e6, 0.0),
                    alignedAxis: Cartesian3.UNIT_Z,
                    rotation: Math.toRadians(rot),
                    horizontalOrigin: HorizontalOrigin.LEFT,
                    verticalOrigin: VerticalOrigin.TOP,
                    pixelOffset: iconOffset,
                    pixelOffsetScaleByDistance: new NearFarScalar(1000, 1.0, 10e6, 0.0),
                    eyeOffset: new Cartesian3(0, 0, -1) // make sure icon always displays in front
                }
            };
        }
        if (properties.hasOwnProperty('description')) {
            geom.description = properties.description;
        }
        geom.id = properties.id;
        return this.viewer.entities.add(geom);
    };
    /**
     * Abstract method to remove a polyline from its corresponding layer.
     * This is library dependent.
     * @param {Object} polyline - The Map marker object
     */
    CesiumView.prototype.removePolylineFromLayer = function (polyline) {
        this.viewer.entities.remove(polyline);
    };
    /**
     * Add a polyline to the map.
     * @param {locations} locations - the coordinates [{x, y}]
     * @param {Object} properties
     * @param {String} properties.type
     * @param {String} properties.color
     * @param {Number} properties.weight
     * @param {Number} properties.opacity
     * @param {Number} properties.smoothFactor
     * @return {Object} the new created polyline
     */
    CesiumView.prototype.addPolyline = function (locations, properties) {
        var that = this;
        var entity = this.viewer.entities.add({
            polyline: {
                positions: new CallbackProperty(function (time, result) {
                    var locations = [];
                    var polylineLayer = that.getLayer(properties.id);
                    if (polylineLayer) {
                        locations = polylineLayer.props.locations[properties.polylineId];
                    }
                    return locations.map(function (element) { return Cartesian3.fromDegrees(element.x, element.y, element.z); }).flat();
                }, false),
                width: properties.weight,
                material: new Color.fromCssColorString(properties.color),
                clampToGround: (properties.clampToGround) ? properties.clampToGround : true
            }
        });
        entity._dsid = properties.id;
        return entity;
    };
    /**
     * Updates a polyline, if one does not exist it is added to the view
     * @param {PolylineLayer.props} props - The layer properties allowing the update of the polyline
     */
    CesiumView.prototype.updatePolyline = function (props) {
        var polyline = this.getPolyline(props);
        if (!isDefined(polyline)) {
            var polylineObj = this.addPolyline([], props);
            this.addPolylineToLayer(props, polylineObj);
        }
    };
    /**
     * Updates the marker associated to the layer.
     * @param {Layer} layer - The layer allowing the update of the marker
     * @param {Object} properties -
     * @param {Object} properties.lon -
     * @param {Object} properties.lat -
     * @param {Object} properties.alt -
     * @param {Object} properties.orientation -
     * @param {Object} properties.icon -
     * @param {Object} properties.defaultToTerrainElevation -
     * @param {Object} properties.selected -
     */
    CesiumView.prototype.updateMapMarker = function (layer, properties) {
        var lon = properties.lon;
        var lat = properties.lat;
        var alt = properties.alt;
        var orient = properties.orientation;
        var labelColor = properties.labelColor;
        var imgIcon = properties.icon;
        var label = properties.label;
        var defaultToTerrainElevation = properties.defaultToTerrainElevation;
        if (!isNaN(lon) && !isNaN(lat)) {
            var marker = this.getMarker(layer);
            // get ground altitude if non specified
            if (isDefined(alt) || isNaN(alt)) {
                alt = this.getAltitude(lat, lon);
                if (alt > 1)
                    alt += 0.3;
            }
            // update position
            var pos = Cartesian3.fromDegrees(lon, lat, alt);
            marker.position = pos;
            // update orientation
            if (isDefined(orient)) {
                var DTR = Math.PI / 180.0;
                var heading = orient.heading;
                var pitch = 0.0;
                // const roll = 0.0;
                marker.orientation = Transforms.headingPitchRollQuaternion(pos, new HeadingPitchRoll(heading * DTR, /*roll*DTR*/ 0.0, pitch * DTR)); // inverse roll and pitch to go from NED to ENU;
                if (marker.billboard)
                    marker.billboard.rotation = Math.toRadians(heading);
            }
            if (isDefined(label)) {
                marker.label.text = label;
            }
            if (isDefined(labelColor)) {
                marker.label.fillColor = Color.fromCssColorString(labelColor);
            }
            // update icon or model
            if (marker.billboard) {
                if (defaultToTerrainElevation) {
                    marker.billboard.heightReference = HeightReference.CLAMP_TO_GROUND;
                }
                marker.billboard.image = imgIcon;
            }
            else if (marker.model) {
                if (defaultToTerrainElevation) {
                    marker.model.heightReference = HeightReference.CLAMP_TO_GROUND;
                }
                marker.model.uri = imgIcon;
            }
            // update label
            //marker.label = properties.label;
            //if (properties.labelColor != null)
            //	marker.label.fillColor = Cesium.Color.fromCssColorString(properties.labelColor);
            // update billboard aligned axis depending on camera angle
            if (marker.billboard) {
                if (this.viewer.camera.pitch < -Math.PI / 4)
                    marker.billboard.alignedAxis = Cartesian3.UNIT_Z;
                else
                    marker.billboard.alignedAxis = Cartesian3.ZERO;
            }
            // zoom map if first marker update
            if (this.first) {
                this.viewer.zoomTo(this.viewer.entities, new HeadingPitchRange(Math.toRadians(0), Math.toRadians(-90), 2000));
                this.first = false;
            }
            if (properties.selected) {
                this.viewer.selectedEntity = marker;
            }
        }
    };
    /**
     *
     * @private
     */
    CesiumView.prototype.getAltitude = function (lat, lon) {
        var position = Cartesian3.fromDegrees(lon, lat, 0, this.viewer.scene.globe.ellipsoid, new Cartesian3());
        var altitude = this.viewer.scene.globe.getHeight(Ellipsoid.WGS84.cartesianToCartographic(position));
        if (altitude === 'undefined' || altitude <= 0)
            altitude = 0.1;
        return altitude;
    };
    /**
     *
     * @param type
     * @param url
     * @param layers
     * @param imageFormat
     * @param options
     * @return {*}
     */
    CesiumView.prototype.addImageryProvider = function (type, url, layers, imageFormat, options) {
        var minLOD = 0;
        var maxLOD;
        if (options.hasOwnProperty('minLOD')) {
            minLOD = options.minLOD;
        }
        if (options.hasOwnProperty('maxLOD')) {
            maxLOD = options.maxLOD;
        }
        var imageryProvider;
        if (type === 'wms') {
            imageryProvider = new WebMapServiceImageryProvider({
                url: url,
                layers: layers,
                minimumLevel: minLOD,
                maximumLevel: maxLOD,
                parameters: {
                    transparent: 'true',
                    format: 'image/' + imageFormat
                }
            });
        }
        // imageryProvider.alpha = 0.5;
        this.viewer.imageryLayers.addImageryProvider(imageryProvider);
        return imageryProvider;
    };
    return CesiumView;
}(MapView));
export default CesiumView;
//# sourceMappingURL=CesiumView.js.map