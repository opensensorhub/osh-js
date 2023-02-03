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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { isDefined } from "../../../utils/Utils.js";
import { Cartesian3, Cartesian2, Color, HorizontalOrigin, VerticalOrigin, HeightReference, Math, Transforms, Matrix3, Matrix4, MaterialAppearance, Material, GeometryInstance, PolygonGeometry, RectangleGeometry, Rectangle, Primitive, createDefaultImageryProviderViewModels, Viewer, WebMapServiceImageryProvider, EllipsoidTerrainProvider, NearFarScalar, HeadingPitchRoll, HeadingPitchRange, Ellipsoid, EncodedCartesian3, ScreenSpaceEventType, ColorGeometryInstanceAttribute, PolygonHierarchy, GroundPrimitive, PolylineCollection, PrimitiveCollection, EllipseGeometry, BillboardCollection, LabelCollection, Entity, Quaternion, ColorBlendMode, PerspectiveFrustum, FrustumGeometry, VertexFormat, CoplanarPolygonGeometry, GroundPolylineGeometry, GroundPolylinePrimitive, PolylineGeometry, PolylineColorAppearance, LabelStyle } from 'cesium';
import ImageDrapingVS from "./shaders/ImageDrapingVS.js";
import ImageDrapingFS from "./shaders/ImageDrapingFS.js";
import "cesium/Build/Cesium/Widgets/widgets.css";
import MapView from "./MapView";
import { FrustumPositionMode } from "../../layer/FrustumLayer";
import { ImageDrapingPositionMode, GimbalEulerAngleOrder } from "../../layer/ImageDrapingLayer.js";
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
     * @param {Object} [properties.options={}] - Properties which can override the default framework ones
     * @param {Object} [properties.options.viewer=undefined] - the Viewer object to pass [Cesium]{@link https://cesium.com/docs/cesiumjs-ref-doc/Viewer.html?classFilter=Viewer} Viewer object
     * @param {Object} [properties.options.viewerProps={}] - the properties of the [Cesium]{@link https://cesium.com/docs/cesiumjs-ref-doc/Viewer.html?classFilter=Viewer} Viewer object
     */
    function CesiumView(properties) {
        var _this = _super.call(this, __assign({ supportedLayers: ['marker', 'drapedImage', 'polyline', 'ellipse', 'polygon', 'coplanarPolygon', 'frustum'], autoZoomOnFirstMarker: true }, properties)) || this;
        var cssClass = document.getElementById(_this.divId).className;
        document.getElementById(_this.divId).setAttribute("class", cssClass + " " + _this.css);
        _this.captureCanvas = document.createElement('canvas');
        _this.captureCanvas.width = 640;
        _this.captureCanvas.height = 480;
        // for frustum
        _this.tmpHPR = new HeadingPitchRoll();
        _this.nedQuat = new Quaternion();
        _this.platformQuat = new Quaternion(0, 0, 0, 1);
        _this.sensorQuat = new Quaternion(0, 0, 0, 1);
        _this.camQuat = Quaternion.fromRotationMatrix(Matrix3.fromRowMajorArray([0, 0, 1,
            1, 0, 0,
            0, 1, 0])); // frustum is along Z
        return _this;
    }
    //---------- MAP SETUP
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
            requestRenderMode: true,
            maximumRenderTimeChange: Infinity,
            targetFrameRate: 30
        };
        // #endregion snippet_cesiumview_default_cesiumprops_viewer_props
        var customViewer = undefined;
        if (isDefined(options)) {
            if (options.hasOwnProperty('options') && options.options.hasOwnProperty('viewerProps')) {
                viewerProps = __assign(__assign({}, viewerProps), options.options.viewerProps);
            }
            if (options.hasOwnProperty('options') && options.options.hasOwnProperty('viewer')) {
                customViewer = options.options.viewer;
            }
        }
        this.viewer = (isDefined(customViewer)) ? customViewer : new Viewer(this.divId, viewerProps);
        this.viewer.terrainProvider = new EllipsoidTerrainProvider();
        this.viewer.scene.copyGlobeDepth = true;
        this.viewer.scene._environmentState.useGlobeDepthFramebuffer = true;
        this.viewer.scene.globe.depthTestAgainstTerrain = true;
        this.billboardCollection = new BillboardCollection();
        this.labelCollection = new LabelCollection();
        this.viewer.scene.primitives.add(this.billboardCollection);
        this.viewer.scene.primitives.add(this.labelCollection);
        // inits callbacks
        // Get default left click handler for when a feature is not picked on left click
        this.initCallbackEvents();
        this.changeToPromptRender = false;
        var that = this;
        this.viewer.scene.postUpdate.addEventListener(function () {
            // This code will run at 60 FPS
            if (that.changeToPromptRender) {
                that.viewer.scene.requestRender();
                that.changeToPromptRender = false;
            }
        });
    };
    CesiumView.prototype.render = function () {
        this.changeToPromptRender = true;
    };
    CesiumView.prototype.initCallbackEvents = function () {
        var that = this;
        // const infoBoxContainer = document.createElement('div');
        // infoBoxContainer.className = 'cesium-viewer-infoBoxContainer';
        // this.viewer.container.appendChild(infoBoxContainer);
        // const infoBox = new InfoBox(infoBoxContainer);
        // const infoBoxViewModel = infoBox.viewModel;
        // https://groups.google.com/g/cesium-dev/c/rzLrPY5ERJs/m/VYfUj-fYCgAJ
        var onClick = function (movement) {
            try {
                // Pick a new feature
                var pickedFeature = that.viewer.scene.pick(movement.position);
                if (!isDefined(pickedFeature) || !isDefined(pickedFeature.id)) {
                    // infoBoxViewModel.showInfo = false;
                    return;
                }
                var entity = void 0;
                var primitive = void 0;
                if (pickedFeature._id instanceof Entity) {
                    entity = pickedFeature._id;
                }
                else if (pickedFeature.id instanceof Entity) {
                    entity = pickedFeature.id;
                }
                else {
                    primitive = pickedFeature;
                }
                var featureId = entity && entity._id || primitive && primitive.id;
                var layerId = that.getLayerId(featureId);
                var layer = that.getLayer(layerId);
                if (isDefined(entity)) {
                    that.viewer.selectedEntity = entity;
                    pickedFeature.pixel = movement.position;
                    that.onMarkerRightClick(layerId, pickedFeature, layer.props, {});
                }
                else {
                    // is primitive
                    //TODO: support primitive selection using tracking tool
                    /* if (!isDefined(layer)) {
                         infoBoxViewModel.showInfo = false;
                         return;
                     }

                     infoBoxViewModel.showInfo = true;
                     infoBoxViewModel.titleText = layer.props.label || layer.props.name;
                     infoBoxViewModel.description = layer.props.description;
                 }

                 that.onMarkerLeftClick(layer.props.id, pickedFeature, layer.props, {});*/
                }
            }
            catch (exception) {
                // infoBoxViewModel.showInfo = false;
                console.error(exception);
            }
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
     *
     * @private
     */
    CesiumView.prototype.getGroundAltitude = function (lat, lon) {
        var position = Cartesian3.fromDegrees(lon, lat, 0, this.viewer.scene.globe.ellipsoid, new Cartesian3());
        var altitude = this.viewer.scene.globe.getHeight(Ellipsoid.WGS84.cartesianToCartographic(position));
        if (altitude === undefined || altitude <= 0)
            altitude = 0.1;
        return altitude;
    };
    CesiumView.prototype.panToLayer = function (layer) {
        var marker = this.getMarker(layer.props);
        this.viewer.zoomTo(marker, new HeadingPitchRange(Math.toRadians(0), Math.toRadians(-90), 2000));
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
    // ----------------------------------------------------//
    // ---------------------- LAYERS ---------------------//
    // --------------------------------------------------//
    // ----- MARKER
    CesiumView.prototype.addMarker = function (properties, entity) {
        if (entity === void 0) { entity = undefined; }
        // console.log(properties);
        var id = properties.id + "$" + properties.markerId;
        var isModel = properties.icon && properties.icon.endsWith(".glb") || false;
        var label = properties.hasOwnProperty("label") && properties.label != null ? properties.label : '';
        var iconOffset = new Cartesian2(-properties.iconAnchor[0], -properties.iconAnchor[1]);
        var color = isDefined(properties.iconColor) ? Color.fromCssColorString(properties.iconColor) : Color.YELLOW;
        var lonLatAlt = [0, 0, 0];
        if (isDefined(properties.location)) {
            lonLatAlt = [properties.location.x, properties.location.y, properties.location.z || 0];
        }
        // get ground altitude if non specified
        if (!isDefined(properties.location.z) || isNaN(properties.location.z)) {
            lonLatAlt[2] = this.getGroundAltitude(properties.location.x, properties.location.y);
            if (lonLatAlt[2] > 1)
                lonLatAlt[2] += 0.3;
        }
        var rot = 0;
        if (isDefined(properties.orientation) && isDefined(properties.orientation.heading)) {
            var heading = properties.orientation.heading;
            // const roll = 0.0;
            rot = Math.toRadians(heading);
        }
        // cartesian position
        var position = Cartesian3.fromDegrees(lonLatAlt[0], lonLatAlt[1], lonLatAlt[2]);
        var orientation = undefined;
        if (isDefined(properties.orientation) && isDefined(properties.orientation.heading)) {
            var DTR = Math.PI / 180.0;
            var heading = properties.orientation.heading;
            var pitch = 0.0;
            orientation = Transforms.headingPitchRollQuaternion(position, new HeadingPitchRoll(heading * DTR, /*roll*DTR*/ 0.0, pitch * DTR)); // inverse roll and pitch to go from NED to ENU;
        }
        var billboardOpts = undefined;
        var modelOpts = undefined;
        if (!isModel) {
            billboardOpts = {
                id: undefined,
                name: label,
                description: undefined,
                position: undefined,
                image: properties.icon,
                scaleByDistance: new NearFarScalar(1000, 1.0, 10e6, 0.0),
                alignedAxis: (this.viewer.camera.pitch < -Math.PI / 4) && properties.allowBillboardRotation ? Cartesian3.UNIT_Z : Cartesian3.ZERO,
                rotation: rot,
                horizontalOrigin: HorizontalOrigin.LEFT,
                verticalOrigin: VerticalOrigin.TOP,
                pixelOffset: iconOffset,
                pixelOffsetScaleByDistance: new NearFarScalar(1000, 1.0, 10e6, 0.0),
                eyeOffset: new Cartesian3(0, 0, -1 * properties.zIndex),
                show: properties.visible,
                heightReference: properties.defaultToTerrainElevation ? HeightReference.CLAMP_TO_GROUND : HeightReference.NONE,
                scale: properties.iconScale,
                imageSubRegion: undefined,
                color: color,
                width: properties.iconSize[0],
                height: properties.iconSize[1],
                translucencyByDistance: undefined,
                sizeInMeters: undefined,
                distanceDisplayCondition: undefined,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            };
        }
        else {
            modelOpts = {
                id: undefined,
                uri: properties.icon,
                scale: properties.iconScale,
                modelM: Matrix4.IDENTITY.clone(),
                color: color,
                colorBlendMode: ColorBlendMode.MIX,
                colorBlendAmount: 0.5,
                silhouetteColor: color,
                // silhouetteSize: 1.0, // cause image draping crash
                minimumPixelSize: 20,
                maximumScale: 20000,
                show: properties.visible,
                heightReference: properties.defaultToTerrainElevation ? HeightReference.CLAMP_TO_GROUND : HeightReference.NONE,
                alpha: properties.opacity,
                colorBlendAmountEnabled: true,
                imageBasedLightingFactor: undefined,
                lightColor: undefined,
                distanceDisplayCondition: undefined,
                nodeTransformations: undefined,
                articulations: undefined,
                clippingPlanes: undefined,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            };
        }
        // Add Label primitive
        var labelColor = properties.labelColor || '#FFFFFF';
        var labelSize = properties.labelSize || 16;
        var labelOffset = new Cartesian2(properties.labelOffset[0], properties.labelOffset[1]);
        var labelBackgroundColor = properties.labelBackgroundColor && Color.fromCssColorString(properties.labelBackgroundColor);
        var labelOutlineColor = properties.labelOutlineColor && Color.fromCssColorString(properties.labelOutlineColor);
        var labelOpts = {
            backgroundColor: labelBackgroundColor || undefined,
            backgroundPadding: undefined,
            distanceDisplayCondition: undefined,
            eyeOffset: undefined,
            fillColor: Color.fromCssColorString(labelColor),
            font: labelSize + 'px sans-serif',
            heightReference: properties.defaultToTerrainElevation ? HeightReference.CLAMP_TO_GROUND : HeightReference.NONE,
            horizontalOrigin: HorizontalOrigin.CENTER,
            id: undefined,
            outlineColor: labelOutlineColor || undefined,
            outlineWidth: (labelOutlineColor && 1.0) || undefined,
            pixelOffset: labelOffset,
            pixelOffsetScaleByDistance: new NearFarScalar(150, 1.0, 1e6, 0.0),
            position: Cartesian3.fromDegrees(lonLatAlt[0], lonLatAlt[1], lonLatAlt[2]),
            scale: undefined,
            scaleByDistance: new NearFarScalar(150, 1.0, 1e6, 0.0),
            show: undefined,
            showBackground: (labelBackgroundColor && true) || false,
            style: LabelStyle.FILL_AND_OUTLINE,
            text: label,
            totalScale: undefined,
            translucencyByDistance: undefined,
            verticalOrigin: VerticalOrigin.TOP,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
        };
        // zoom map if first marker update
        if (this.first && this.properties.autoZoomOnFirstMarker) {
            this.viewer.camera.flyTo({
                destination: Cartesian3.fromDegrees(lonLatAlt[0], lonLatAlt[1], 1000),
                duration: 1.0
            });
            this.first = false;
        }
        var entityOpts = {
            description: properties.description,
            position: Cartesian3.fromDegrees(lonLatAlt[0], lonLatAlt[1], lonLatAlt[2]),
            orientation: orientation,
            id: id,
            billboard: billboardOpts,
            model: modelOpts,
            label: labelOpts
        };
        if (!isDefined(entity)) {
            var entity_1 = this.viewer.entities.add(entityOpts);
            if (properties.selected) {
                this.viewer.selectedEntity = entity_1;
            }
            return entity_1;
        }
        else {
            // update only properties
            entity.billboard = billboardOpts && __assign({}, billboardOpts) || undefined;
            entity.model = modelOpts && __assign({}, modelOpts) || undefined;
            entity.label = labelOpts && __assign({}, labelOpts) || undefined;
            entity.name = label;
            entity.position = entityOpts.position;
            entity.description = entityOpts.description;
            entity.orientation = entityOpts.orientation;
            return entity;
        }
    };
    CesiumView.prototype.updateMarker = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var marker;
            return __generator(this, function (_a) {
                if (!isDefined(props.location)) {
                    return [2 /*return*/];
                }
                marker = this.getMarker(props);
                // create one collection for marker entities
                // /!\ If we remove the marker every time such as Primitive, we loose selection tracking!
                // if (isDefined(marker)) {
                //     isSelected = this.viewer.selectedEntity === marker;
                // this.removeMarkerFromLayer(marker);
                // }
                this.addMarkerToLayer(props, this.addMarker(props, marker));
                this.render();
                return [2 /*return*/];
            });
        });
    };
    CesiumView.prototype.removeMarkerFromLayer = function (marker) {
        this.viewer.entities.remove(marker);
        this.render();
    };
    // ----- ELLIPSE
    /**
     * Add an Ellipse to the view
     * @param properties
     * @param properties.id The id of the ellipse
     * @param properties.name The assigned name of the ellipse
     * @param properties.position [] The ellipse's center point in the fixed frame.
     * @param properties.semiMajorAxis {Number} The length of the ellipse's semi-major axis in meters.
     * @param properties.semiMinorAxis {Number} The length of the ellipse's semi-minor axis in meters.
     * @param properties.height {Number} 0.0 optionalThe distance in meters between the ellipse and the ellipsoid surface.
     * @param properties.extrudedHeight {Number} optionalThe distance in meters between the ellipse's extruded face and the ellipsoid surface.
     * @param properties.rotation {Number} 0.0 optionalThe angle of rotation counter-clockwise from north.
     * @param properties.stRotation {Number} 0.0 optionalThe rotation of the texture coordinates counter-clockwise from north.
     * @param properties.granularity {Number}    CesiumMath.RADIANS_PER_DEGREE optionalThe angular distance between points on the ellipse in radians.
     * @param properties.clampToGround {boolean} Flag to indicate if ellipse needs to be clamped to ground
     * @param properties.color The color of the ellipse
     * @param properties.transparency The level of transparency or alpha value
     * @returns {Entity}
     */
    CesiumView.prototype.addEllipse = function (properties) {
        // bind the object to the callback property
        var id = properties.id + "$" + properties.ellipseId;
        var position = properties.position;
        var semiMajorAxis = properties.semiMajorAxis;
        var semiMinorAxis = properties.semiMinorAxis;
        var height = isDefined(properties.height) ? properties.height : 0.0;
        var extrudedHeight = isDefined(properties.extrudedHeight) ? properties.extrudedHeight : 0.0;
        var rotation = isDefined(properties.rotation) ? properties.rotation : 0.0;
        var stRotation = isDefined(properties.stRotation) ? properties.stRotation : 0.0;
        var color = properties.color;
        var alpha = isDefined(properties.transparency) ? properties.transparency : 0.5;
        var ellipseInstance = new GeometryInstance({
            geometry: new EllipseGeometry({
                center: Cartesian3.fromDegrees(position.x, position.y),
                semiMajorAxis: semiMajorAxis,
                semiMinorAxis: semiMinorAxis,
                height: height,
                extrudedHeight: extrudedHeight,
                rotation: rotation,
                stRotation: stRotation
            }),
            id: id,
        });
        var ellipsePrimitive = new GroundPrimitive({
            geometryInstances: ellipseInstance,
            appearance: new MaterialAppearance({
                material: new Material({
                    fabric: {
                        type: 'Color',
                        uniforms: {
                            color: Color.fromCssColorString(color).withAlpha(alpha)
                        }
                    }
                }),
            }),
            asynchronous: false,
            show: properties.visible
        });
        this.viewer.scene.primitives.add(ellipsePrimitive);
        return ellipsePrimitive;
    };
    /**
     * Updates an Ellipse if it exists or adds a new one to the view
     * @param props
     * @param props.ellipseId
     * @param props.id The id of the ellipse
     * @param props.position [] The ellipse's center point in the fixed frame.
     * @param props.semiMajorAxis {Number} The length of the ellipse's semi-major axis in meters.
     * @param props.semiMinorAxis {Number} The length of the ellipse's semi-minor axis in meters.
     * @param props.height {Number} 0.0 optionalThe distance in meters between the ellipse and the ellipsoid surface.
     * @param props.extrudedHeight {Number} optionalThe distance in meters between the ellipse's extruded face and the ellipsoid surface.
     * @param props.rotation {Number} 0.0 optionalThe angle of rotation counter-clockwise from north.
     * @param props.stRotation {Number} 0.0 optionalThe rotation of the texture coordinates counter-clockwise from north.
     * @param props.granularity {Number}    CesiumMath.RADIANS_PER_DEGREE optionalThe angular distance between points on the ellipse in radians.
     * @param props.clampToGround {boolean} Flag to indicate if ellipse needs to be clamped to ground
     * @param props.transparency The level of transparency or alpha value
     * @param props.color The color of the ellipse
     */
    CesiumView.prototype.updateEllipse = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var ellipse;
            return __generator(this, function (_a) {
                if (!isDefined(props.position)) {
                    return [2 /*return*/];
                }
                ellipse = this.getEllipse(props);
                if (isDefined(ellipse)) {
                    this.removeEllipseFromLayer(ellipse);
                }
                this.addEllipseToLayer(props, this.addEllipse(props));
                this.render();
                return [2 /*return*/];
            });
        });
    };
    /**
     * Removes an ellipse
     * @param ellipse The ellipse to remove
     */
    CesiumView.prototype.removeEllipseFromLayer = function (ellipse) {
        this.viewer.scene.primitives.remove(ellipse);
        this.render();
    };
    // ----- POLYLINE
    /**
     * Add a polyline to the map.
     * @param {Object} properties
     * @return {Object} the new created polyline
     */
    CesiumView.prototype.addPolyline = function (properties) {
        var id = properties.id + "$" + properties.polylineId;
        var locations = properties.locations;
        var flatPositions = locations.map(function (element) { return Cartesian3.fromDegrees(element.x, element.y, element.z); }).flat();
        // check if clamp to terrain
        var polylinePrimitive;
        if (properties.clampToGround) {
            var polylineInstance = new GeometryInstance({
                geometry: new GroundPolylineGeometry({
                    id: id,
                    positions: flatPositions,
                    width: properties.weight,
                    loop: false,
                }),
                id: id,
            });
            polylinePrimitive = new GroundPolylinePrimitive({
                geometryInstances: polylineInstance,
                appearance: new MaterialAppearance({
                    material: new Material({
                        fabric: {
                            type: 'Color',
                            uniforms: {
                                color: Color.fromCssColorString(properties.color)
                            }
                        }
                    }),
                }),
                asynchronous: false,
                show: properties.visible
            });
        }
        else {
            // use classic primitive
            var polylineInstance = new GeometryInstance({
                geometry: new PolylineGeometry({
                    id: id,
                    positions: flatPositions,
                    width: properties.weight,
                    loop: false,
                }),
                attributes: {
                    color: ColorGeometryInstanceAttribute.fromColor(Color.fromCssColorString(properties.color))
                },
                id: id,
            });
            polylinePrimitive = new Primitive({
                geometryInstances: polylineInstance,
                appearance: new PolylineColorAppearance(),
                asynchronous: false,
                show: properties.visible
            });
        }
        this.viewer.scene.primitives.add(polylinePrimitive);
        return polylinePrimitive;
    };
    /**
     * Updates a given polyline, or adds it if it does not currently exist
     * @param props The properties containing the updated data
     */
    CesiumView.prototype.updatePolyline = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var polyline;
            return __generator(this, function (_a) {
                if (!isDefined(props.locations) || props.locations.length < 2) {
                    return [2 /*return*/];
                }
                polyline = this.getPolyline(props);
                if (isDefined(polyline)) {
                    this.removePolylineFromLayer(polyline);
                }
                this.addPolylineToLayer(props, this.addPolyline(props));
                this.render();
                return [2 /*return*/];
            });
        });
    };
    /**
     * Abstract method to remove a polyline from its corresponding layer.
     * This is library dependent.
     * @param {Object} polyline - The Map marker object
     */
    CesiumView.prototype.removePolylineFromLayer = function (polyline) {
        this.viewer.scene.primitives.remove(polyline);
        this.render();
    };
    // ----- POLYGON
    /**
     * Retrieves the polygon and updates it or creates a new instance
     * and adds with the given properties the polygon to the layer
     * @param {Object} properties properties to apply in updating polygon
     */
    CesiumView.prototype.updatePolygon = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var polygonPrimitiveCollection;
            return __generator(this, function (_a) {
                polygonPrimitiveCollection = this.getPolygon(props);
                if (isDefined(polygonPrimitiveCollection)) {
                    this.removePolygonFromLayer(polygonPrimitiveCollection);
                }
                this.addPolygonToLayer(props, this.addPolygon(props));
                this.render();
                return [2 /*return*/];
            });
        });
    };
    /**
     * Adds a polygon to the polygon layer
     * @param {Object} properties the properties to use in constructing the polygon
     * @returns {PrimitiveCollection}
     */
    CesiumView.prototype.addPolygon = function (properties) {
        // bind the object to the callback property
        var id = properties.id + "$" + properties.polygonId;
        // return this.viewer.entities.add(polygonObj);
        var polygonInstance = new GeometryInstance({
            geometry: new PolygonGeometry({
                polygonHierarchy: new PolygonHierarchy(Cartesian3.fromDegreesArray(properties.vertices)),
                attributes: {
                    color: ColorGeometryInstanceAttribute.fromColor(Color.fromRandom({ alpha: 0.5 }))
                },
            }),
            id: id,
        });
        var polygonPrimitive = new GroundPrimitive({
            geometryInstances: polygonInstance,
            appearance: new MaterialAppearance({
                material: new Material({
                    fabric: {
                        type: 'Color',
                        uniforms: {
                            color: Color.fromCssColorString(properties.color).withAlpha(properties.opacity)
                        }
                    }
                }),
            }),
            asynchronous: false,
            show: properties.visible
        });
        // according to this example: https://sandcastle.cesium.com/?#c=pVRNj9MwEP0rVi9JpeIulAWU7VZULVrQLlq0IC6EgzeZthaOHY2dVAH1v2MncZq05YQPbebjzbw38aRkSEoOe0BySyTsyQo0LzL6vfaFQVKbKyUN4xIwGN/EMpalRSVKYaot6kcsiT0v3r6iVxPy+sr+eo97JrPrnue69pzn9Dxv3vk6sfx5bMfQWC5M2o4tx5V3zegGVbaGLQLoJSKrwoZdn61Q2IM6k66XT/dPH9Y3TYoqjLAaV5cy7x4f1l2tXIlqq+QX5Bk3vITh5Dp3+KcRtAWVgcHqk9SGSTvQqJ9+dxL1KHd4GpGg7RZMjn5fMep6Njm+Fk0QmAFvhkekO32uQ1y/tz9t+48ckGGyq6IL+C4Ydm9pPKx06Nnt42HcKmJ5Dgyd9kHtz1YBciaWXbhPL2ujFyH1dfhW5RAG9esLJuREWX0doubvGDmcUdOVTHaopCrsW9swoSGWh/HgJrg786+r0IYtCQGJ4UqGDnuGoixNvbhcae4ybb9umC2bPU/NLiKzblWEUnlEDBbQOv5jKu1E+kvghzGU7Em71W++HFQnIIEeI05jZ9TiTldmfDllMBWXM5qM5tpUAhYNmfc8yxUaUqAIKZ0ayHJh5enpc5H8AkMTXe/8fOpB85SXdo9u49HJlywekUQwrW1kUwjxlf+GeLSYT23+ACYUS7ncPpaAglUuZfdy8dA4KaXzqTXPUUYp8cywV/Ev
        var polygonOutlinePrimitive = new PolylineCollection();
        polygonOutlinePrimitive.add({
            positions: Cartesian3.fromDegreesArray(properties.vertices),
            width: properties.outlineWidth,
            loop: true,
            material: new Material({
                fabric: {
                    type: 'Color',
                    uniforms: {
                        color: Color.fromCssColorString(properties.outlineColor)
                    }
                }
            }),
            show: properties.visible
        });
        var collection = new PrimitiveCollection();
        collection.add(polygonPrimitive);
        collection.add(polygonOutlinePrimitive);
        this.viewer.scene.primitives.add(collection);
        return collection;
    };
    /**
     * Abstract method to remove a polygon from its corresponding layer.
     * This is library dependent.
     * @param {Object} polygon - The Map polygon object
     */
    CesiumView.prototype.removePolygonFromLayer = function (polygonPrimitiveCollection) {
        polygonPrimitiveCollection.removeAll();
        this.viewer.scene.primitives.remove(polygonPrimitiveCollection);
        this.render();
    };
    /**
     * Retrieves the coplanar polygon and updates it or creates a new instance
     * and adds with the given properties the coplanar polygon to the layer
     * @param {Object} properties properties to apply in updating polygon
     */
    CesiumView.prototype.updateCoPlanarPolygon = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var polygonPrimitiveCollection;
            return __generator(this, function (_a) {
                polygonPrimitiveCollection = this.getPolygon(props);
                if (isDefined(polygonPrimitiveCollection)) {
                    polygonPrimitiveCollection.removeAll();
                    this.viewer.scene.primitives.remove(polygonPrimitiveCollection);
                }
                this.addPolygonToLayer(props, this.addCoPlanarPolygon(props));
                this.render();
                return [2 /*return*/];
            });
        });
    };
    /**
     * Adds a coplanar polygon to the coplanar polygon layer
     * @param {Object} properties the properties to use in constructing the coplanar polygon
     * @returns {Entity}
     */
    CesiumView.prototype.addCoPlanarPolygon = function (properties) {
        // bind the object to the callback property
        var id = properties.id + "$" + properties.polygonId;
        var polygonInstance = new GeometryInstance({
            geometry: new CoplanarPolygonGeometry({
                polygonHierarchy: new PolygonHierarchy(Cartesian3.fromDegreesArrayHeights(properties.vertices)),
            }),
            id: id,
        });
        var polygonPrimitive = new Primitive({
            geometryInstances: polygonInstance,
            appearance: new MaterialAppearance({
                material: new Material({
                    fabric: {
                        type: 'Color',
                        uniforms: {
                            color: Color.fromCssColorString(properties.color).withAlpha(properties.opacity)
                        }
                    }
                }),
            }),
            asynchronous: false,
            show: properties.visible
        });
        /* const polygonOutlineInstance = new GeometryInstance({
             geometry : new CoplanarPolygonOutlineGeometry({
                 polygonHierarchy: new PolygonHierarchy(Cartesian3.fromDegreesArrayHeights(properties.vertices[properties.polygonId])),
             }),
             attributes : {
                 color : ColorGeometryInstanceAttribute.fromColor(Color.fromRandom({alpha : 0.5}))
             },
             id: id,
         });

         const polygonOutlinePrimitive = new Primitive({
             geometryInstances : polygonOutlineInstance,
             appearance : new MaterialAppearance({
                 material: new Material({
                     fabric: {
                         type: 'Color',
                         uniforms: {
                             color:  Color.fromCssColorString(properties.outlineColor)
                         }
                     }
                 }),
             }),
             asynchronous: false
         });*/
        var collection = new PrimitiveCollection();
        collection.add(polygonPrimitive);
        // collection.add(polygonOutlinePrimitive);
        this.viewer.scene.primitives.add(collection);
        return collection;
    };
    // ----- IMAGE_DRAPING
    /**
     * Updates the image draping associated to the layer.
     * @param {ImageDrapingLayer.props} props - The layer properties allowing the update of the image draping
     */
    CesiumView.prototype.updateDrapedImage = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var drapedImagePrimitive, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!isDefined(props.platformLocation) || !isDefined(props.imageSrc)) {
                            return [2 /*return*/];
                        }
                        drapedImagePrimitive = this.getDrapedImage(props);
                        if (!!isDefined(drapedImagePrimitive)) return [3 /*break*/, 2];
                        _a = this.addDrapedImageToLayer;
                        _b = [props];
                        return [4 /*yield*/, this.addDrapedImage(props)];
                    case 1:
                        _a.apply(this, _b.concat([_c.sent()]));
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.addDrapedImage(props, drapedImagePrimitive)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        this.render();
                        return [2 /*return*/];
                }
            });
        });
    };
    CesiumView.prototype.addDrapedImage = function (props, existingDrapedImagePrimitive) {
        return __awaiter(this, void 0, void 0, function () {
            var camPos, camRot, rotM, DTR, platformOrientation, gimbalOrientation, yaw, pitch, roll, camProj, camDistR, camDistT, imgSrc, snapshot, ctx, encCamPos, appearance, drapedImageGeometry, drapedImagePrimitive;
            return __generator(this, function (_a) {
                camRot = new Matrix3();
                rotM = new Matrix3();
                DTR = Math.PI / 180;
                switch (props.positionMode) {
                    case ImageDrapingPositionMode.LONLATALT_WITH_EULER_ANGLES: {
                        // Get ECEF position from longitude, latitude, and altitude.
                        camPos = Cartesian3.fromDegrees(props.platformLocation.x, props.platformLocation.y, props.platformLocation.z);
                        // Start building the camera rotation matrix. Start with the NED transformation.
                        Matrix4.getMatrix3(Transforms.northEastDownToFixedFrame(camPos), camRot);
                        platformOrientation = props.platformOrientation;
                        if (platformOrientation) {
                            Matrix3.multiply(camRot, Matrix3.fromRotationZ(platformOrientation.heading * DTR, rotM), camRot);
                            Matrix3.multiply(camRot, Matrix3.fromRotationY(platformOrientation.pitch * DTR, rotM), camRot);
                            Matrix3.multiply(camRot, Matrix3.fromRotationX(platformOrientation.roll * DTR, rotM), camRot);
                        }
                        gimbalOrientation = props.gimbalOrientation;
                        if (gimbalOrientation) {
                            yaw = ("yaw" in gimbalOrientation) ? gimbalOrientation.yaw : gimbalOrientation.heading;
                            pitch = gimbalOrientation.pitch + 90;
                            roll = gimbalOrientation.roll;
                            switch (props.gimbalEulerAngleOrder) {
                                case GimbalEulerAngleOrder.YAW_PITCH_ROLL:
                                    Matrix3.multiply(camRot, Matrix3.fromRotationZ(yaw * DTR, rotM), camRot);
                                    Matrix3.multiply(camRot, Matrix3.fromRotationY(pitch * DTR, rotM), camRot);
                                    Matrix3.multiply(camRot, Matrix3.fromRotationX(roll * DTR, rotM), camRot);
                                    break;
                                case GimbalEulerAngleOrder.YAW_ROLL_PITCH:
                                    Matrix3.multiply(camRot, Matrix3.fromRotationZ(yaw * DTR, rotM), camRot);
                                    Matrix3.multiply(camRot, Matrix3.fromRotationX(roll * DTR, rotM), camRot);
                                    Matrix3.multiply(camRot, Matrix3.fromRotationY(pitch * DTR, rotM), camRot);
                                    break;
                                case GimbalEulerAngleOrder.PITCH_YAW_ROLL:
                                    Matrix3.multiply(camRot, Matrix3.fromRotationY(pitch * DTR, rotM), camRot);
                                    Matrix3.multiply(camRot, Matrix3.fromRotationZ(yaw * DTR, rotM), camRot);
                                    Matrix3.multiply(camRot, Matrix3.fromRotationX(roll * DTR, rotM), camRot);
                                    break;
                                case GimbalEulerAngleOrder.PITCH_ROLL_YAW:
                                    Matrix3.multiply(camRot, Matrix3.fromRotationY(pitch * DTR, rotM), camRot);
                                    Matrix3.multiply(camRot, Matrix3.fromRotationX(roll * DTR, rotM), camRot);
                                    Matrix3.multiply(camRot, Matrix3.fromRotationZ(yaw * DTR, rotM), camRot);
                                    break;
                                case GimbalEulerAngleOrder.ROLL_YAW_PITCH:
                                    Matrix3.multiply(camRot, Matrix3.fromRotationX(roll * DTR, rotM), camRot);
                                    Matrix3.multiply(camRot, Matrix3.fromRotationZ(yaw * DTR, rotM), camRot);
                                    Matrix3.multiply(camRot, Matrix3.fromRotationY(pitch * DTR, rotM), camRot);
                                    break;
                                case GimbalEulerAngleOrder.ROLL_PITCH_YAW:
                                    Matrix3.multiply(camRot, Matrix3.fromRotationX(roll * DTR, rotM), camRot);
                                    Matrix3.multiply(camRot, Matrix3.fromRotationY(pitch * DTR, rotM), camRot);
                                    Matrix3.multiply(camRot, Matrix3.fromRotationZ(yaw * DTR, rotM), camRot);
                                    break;
                            }
                        }
                        // transform to camera frame
                        Matrix3.fromRotationZ(90 * DTR, rotM);
                        Matrix3.multiply(camRot, rotM, camRot);
                        break;
                    }
                    case ImageDrapingPositionMode.ECEF_WITH_MATRICES: {
                        camPos = new Cartesian3(props.platformLocation.x, props.platformLocation.y, props.platformLocation.z);
                        if (props.platformOrientation) {
                            Matrix3.clone(props.platformOrientation, camRot);
                        }
                        else {
                            Matrix3.clone(Matrix3.IDENTITY, camRot);
                        }
                        if (props.gimbalOrientation) {
                            Matrix3.multiply(camRot, props.gimbalOrientation, camRot);
                        }
                        break;
                    }
                    case ImageDrapingPositionMode.ECEF_WITH_QUATERNIONS: {
                        camPos = new Cartesian3(props.platformLocation.x, props.platformLocation.y, props.platformLocation.z);
                        if (props.platformOrientation) {
                            Matrix3.fromQuaternion(props.platformOrientation, camRot);
                        }
                        else {
                            Matrix3.clone(Matrix3.IDENTITY, camRot);
                        }
                        if (props.gimbalOrientation) {
                            Matrix3.multiply(camRot, Matrix3.fromQuaternion(props.gimbalOrientation, new Matrix3()), camRot);
                        }
                        break;
                    }
                    default:
                        return [2 /*return*/];
                }
                camProj = props.cameraModel.camProj;
                camDistR = props.cameraModel.camDistR;
                camDistT = props.cameraModel.camDistT;
                imgSrc = props.imageSrc;
                snapshot = props.snapshot;
                // snapshot
                if (snapshot) {
                    ctx = this.captureCanvas.getContext('2d');
                    ctx.drawImage(imgSrc, 0, 0, this.captureCanvas.width, this.captureCanvas.height);
                    imgSrc = this.captureCanvas;
                }
                encCamPos = EncodedCartesian3.fromCartesian(camPos);
                appearance = new MaterialAppearance({
                    renderState: {
                        depthTest: {
                            enabled: false
                        }
                    },
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
                if (!isDefined(existingDrapedImagePrimitive) || snapshot) {
                    drapedImageGeometry = new RectangleGeometry({
                        ellipsoid: Ellipsoid.WGS84,
                        rectangle: Rectangle.fromDegrees(-180, -90, 180, 90)
                    });
                    drapedImagePrimitive = new Primitive({
                        geometryInstances: new GeometryInstance({ geometry: drapedImageGeometry }),
                        appearance: appearance,
                        show: props.visible
                    });
                    this.viewer.scene.primitives.add(drapedImagePrimitive, 0);
                    return [2 /*return*/, drapedImagePrimitive];
                }
                else {
                    existingDrapedImagePrimitive.appearance = appearance;
                    existingDrapedImagePrimitive.show = props.visible;
                    return [2 /*return*/, existingDrapedImagePrimitive];
                }
                return [2 /*return*/];
            });
        });
    };
    CesiumView.prototype.removeDrapedImageFromLayer = function (drapedImagePrimitive) {
        this.viewer.scene.primitives.remove(drapedImagePrimitive);
        this.render();
    };
    // -- Frustum
    CesiumView.prototype.updateFrustum = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var frustumPrimitiveCollection;
            return __generator(this, function (_a) {
                if (!isDefined(props.origin) || !isDefined(props.fov) || !isDefined(props.range)
                    || !isDefined(props.sensorOrientation) || !isDefined(props.platformOrientation)) {
                    return [2 /*return*/];
                }
                frustumPrimitiveCollection = this.getFrustum(props);
                if (isDefined(frustumPrimitiveCollection)) {
                    frustumPrimitiveCollection.removeAll();
                    this.viewer.scene.primitives.remove(frustumPrimitiveCollection);
                }
                this.addFrustumToLayer(props, this.addFrustum(props));
                this.render();
                return [2 /*return*/];
            });
        });
    };
    CesiumView.prototype.addFrustum = function (properties) {
        // bind the object to the callback property
        var id = properties.id + "$" + properties.frustumId;
        // Compute the geometry and orientation. This depends on the position
        // mode specified to the FrustumLayer constructor.
        var origin, quat;
        switch (properties.positionMode) {
            case FrustumPositionMode.LONLATALT_WITH_EULER_ANGLES:
                origin = Cartesian3.fromDegrees(properties.origin.x, properties.origin.y, properties.origin.z);
                Transforms.headingPitchRollQuaternion(origin, new HeadingPitchRoll(0, 0, 0), Ellipsoid.WGS84, Transforms.northEastDownToFixedFrame, this.nedQuat);
                // platform attitude w/r NED
                // see doc of Quaternion.fromHeadingPitchRoll, heading and roll are about negative z and y axes respectively
                var platformHPR = properties.platformOrientation;
                HeadingPitchRoll.fromDegrees(-platformHPR.heading, -platformHPR.pitch, platformHPR.roll, this.tmpHPR);
                Quaternion.fromHeadingPitchRoll(this.tmpHPR, this.platformQuat);
                // sensor orientation w/r platform
                var sensorYPR = properties.sensorOrientation;
                HeadingPitchRoll.fromDegrees(-sensorYPR.yaw, -sensorYPR.pitch, sensorYPR.roll, this.tmpHPR);
                Quaternion.fromHeadingPitchRoll(this.tmpHPR, this.sensorQuat);
                // compute combined transform
                // goal is to get orientation of frustum in ECEF directly, knowing that the frustum direction is along the Z axis
                Quaternion.multiply(this.nedQuat, this.platformQuat, this.platformQuat); // result is plaformQuat w/r ECEF
                Quaternion.multiply(this.platformQuat, this.sensorQuat, this.sensorQuat); // result is sensorQuat w/r ECEF
                quat = Quaternion.multiply(this.sensorQuat, this.camQuat, this.sensorQuat); // result is frustum quat w/r ECEF
                break;
            case FrustumPositionMode.ECEF_WITH_MATRICES:
                origin = properties.origin;
                Quaternion.fromRotationMatrix(properties.platformOrientation, this.platformQuat);
                Quaternion.fromRotationMatrix(properties.sensorOrientation, this.sensorQuat);
                quat = Quaternion.multiply(this.platformQuat, this.sensorQuat, new Quaternion());
                break;
            case FrustumPositionMode.ECEF_WITH_QUATERNIONS:
                origin = properties.origin;
                this.platformQuat = properties.platformOrientation;
                this.sensorQuat = properties.sensorOrientation;
                quat = Quaternion.multiply(this.platformQuat, this.sensorQuat, new Quaternion());
                break;
            default:
                return;
        }
        var frustum = new PerspectiveFrustum({
            fov: Math.toRadians(properties.fov),
            aspectRatio: properties.aspectRatio,
            near: properties.near,
            far: properties.range
        });
        var frustumInstance = new GeometryInstance({
            geometry: new FrustumGeometry({
                frustum: frustum,
                origin: origin,
                orientation: quat,
                vertexFormat: VertexFormat.POSITION_ONLY
            }),
            id: id,
        });
        var frustumPrimitive = new Primitive({
            geometryInstances: frustumInstance,
            appearance: new MaterialAppearance({
                material: new Material({
                    fabric: {
                        type: 'Color',
                        uniforms: {
                            color: Color.fromCssColorString(properties.color).withAlpha(properties.opacity)
                        }
                    }
                }),
            }),
            asynchronous: false,
            show: properties.visible
        });
        var collection = new PrimitiveCollection();
        collection.add(frustumPrimitive);
        this.viewer.scene.primitives.add(collection);
        return collection;
    };
    CesiumView.prototype.removeFrustumFromLayer = function (frustumPrimitiveCollection) {
        if (isDefined(frustumPrimitiveCollection)) {
            frustumPrimitiveCollection.removeAll();
            this.viewer.scene.primitives.remove(frustumPrimitiveCollection);
            this.render();
        }
    };
    return CesiumView;
}(MapView));
export default CesiumView;
//# sourceMappingURL=CesiumView.js.map