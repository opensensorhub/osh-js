/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

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
import 'ol/css.js';
import 'ol/ol.css';
import { Map, View as OlView } from 'ol';
import TileLayer from 'ol/layer/Tile.js';
import { Group } from "ol/layer.js";
import { transform } from "ol/proj.js";
import { DragRotateAndZoom } from 'ol/interaction.js';
import { FullScreen } from 'ol/control.js';
import { ZoomSlider } from 'ol/control.js';
import VectorSource from "ol/source/Vector.js";
import VectorLayer from "ol/layer/Vector.js";
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import { Icon, Style, Text } from 'ol/style.js';
import Select from "ol/interaction/Select";
import OSM from "ol/source/OSM";
import MouseWheelZoom from "ol/interaction/MouseWheelZoom";
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import MapView from "./MapView";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import LineString from "ol/geom/LineString";
import { click, pointerMove } from "ol/events/condition";
import Polygon from "ol/geom/Polygon";
/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the OpenLayer Map object.
 * @extends MapView
 */
var OpenLayerView = /** @class */ (function (_super) {
    __extends(OpenLayerView, _super);
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Boolean} [properties.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     * @param {Object} [properties.map] - the [Map]{@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html} object to use
     * @param {Number} [properties.maxZoom=19] - the max zoom value
     * @param {Boolean} [properties.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     * @param {Object} [properties.initialView] - The initial View can be passed to override the default [View]{@link https://openlayers.org/en/latest/apidoc/module-ol_View-View.html}
     * @param {Object[]} [properties.overlayLayers] - OpenLayers objects to use as overlay layer
     * @param {Object[]} [properties.baseLayers] - OpenLayers objects to use as base layer
     *
     */
    function OpenLayerView(properties) {
        return _super.call(this, __assign({ supportedLayers: ['marker', 'polyline', 'polygon', 'ellipse'] }, properties)) || this;
    }
    OpenLayerView.prototype.beforeAddingItems = function (options) {
        // inits the map
        this.initMap(options);
    };
    //---------- MAP SETUP --------------//
    /**
     * @private
     */
    OpenLayerView.prototype.initMap = function (options) {
        this.map = null;
        this.first = true;
        var overlays = [];
        var baseLayers = this.getDefaultLayers();
        var maxZoom = 19;
        var view = new OlView({
            center: [0, 0],
            zoom: 0
        });
        if (isDefined(options)) {
            //if the user passed in a map then use that one, don't make a new one
            if (options.map) {
                this.map = options.map;
            }
            // checks autoZoom
            if (!options.autoZoomOnFirstMarker) {
                this.first = false;
            }
            if (options.maxZoom) {
                maxZoom = options.maxZoom;
            }
            // checks overlayers
            if (options.overlayLayers) {
                overlays = options.overlayLayers;
            }
            // checks baseLayer
            if (options.baseLayers) {
                baseLayers = options.baseLayers;
            }
            if (options.initialView) {
                view = options.initialView;
            }
        }
        if (!isDefined(this.map)) {
            // sets layers to map
            //create map
            // #region snippet_openlayerview_initial_map
            this.map = new Map();
            this.map.addInteraction(new DragRotateAndZoom());
            this.map.addInteraction(new MouseWheelZoom({
                constrainResolution: true,
                duration: 200
            }));
            this.map.addControl(new FullScreen());
            var layerSwitcher = new LayerSwitcher({
                tipLabel: 'Legend',
                groupSelectStyle: 'children' // Can be 'children' [default], 'group' or 'none'
            });
            this.map.addControl(layerSwitcher);
            this.map.addControl(new ZoomSlider());
            // #endregion snippet_openlayerview_initial_map
            this.map.setTarget(this.divId);
            if (!isDefined(this.map.getView())) {
                this.map.setView(view);
            }
            this.map.getView().setMaxZoom(maxZoom);
            // only if the map was not created with default layers
            if (this.map.getLayers().getLength() === 0) {
                this.map.addLayer(new Group({
                    'title': 'Base maps',
                    layers: baseLayers
                }));
                this.map.addLayer(new Group({
                    title: 'Overlays',
                    layers: overlays
                }));
            }
        }
        // inits onLeftClick events
        // select interaction working on "click"
        var selectClick = new Select({
            condition: click,
            style: null
        });
        var selectRightClick = new Select({
            condition: function (e) {
                return (e.type === 'contextmenu');
            },
            style: null
        });
        // select interaction working on "pointermove"
        var selectPointerMove = new Select({
            condition: pointerMove,
            style: null
        });
        this.map.addInteraction(selectClick);
        this.map.addInteraction(selectRightClick);
        this.map.addInteraction(selectPointerMove);
        this.projection = this.map.getView().getProjection();
        var that = this;
        selectRightClick.on('select', function (e) {
            if (e.selected.length > 0) {
                var feature = e.selected[0]; //the feature selected
                var mId = that.getMarkerId(feature.getId());
                if (!isDefined(mId)) {
                    return;
                }
                var sId = that.getLayerId(feature.getId());
                if (!isDefined(sId)) {
                    return;
                }
                var layer = that.getLayer(sId);
                if (!isDefined(layer)) {
                    return;
                }
                that.onMarkerRightClick(mId, feature, layer.props, e);
            }
        });
        selectClick.on('select', function (e) {
            if (e.selected.length > 0) {
                var feature = e.selected[0]; //the feature selected
                var mId = that.getMarkerId(feature.getId());
                if (!isDefined(mId)) {
                    return;
                }
                var sId = that.getLayerId(feature.getId());
                if (!isDefined(sId)) {
                    return;
                }
                var layer = that.getLayer(sId);
                if (!isDefined(layer)) {
                    return;
                }
                that.onMarkerLeftClick(mId, feature, layer.props, e);
            }
        });
        selectPointerMove.on('select', function (e) {
            if (e.selected.length > 0) {
                var feature = e.selected[0]; //the feature selected
                var mId = that.getMarkerId(feature.getId());
                if (!isDefined(mId)) {
                    return;
                }
                var sId = that.getLayerId(feature.getId());
                if (!isDefined(sId)) {
                    return;
                }
                var layer = that.getLayer(sId);
                if (!isDefined(layer)) {
                    return;
                }
                that.onMarkerHover(mId, feature, layer.props, e);
            }
        });
        this.vectorSource = new VectorSource({
            wrapX: false,
            features: []
        });
        this.vectorMarkerLayer = new VectorLayer({
            source: this.vectorSource,
        });
        this.vectorMarkerLayer.setZIndex(1);
        this.map.addLayer(this.vectorMarkerLayer);
        this.map.updateSize();
    };
    /**
     * Gets the list of default layers.
     * @return {Array}
     */
    OpenLayerView.prototype.getDefaultLayers = function () {
        var osm = new TileLayer({
            source: new OSM()
        });
        return [osm];
    };
    OpenLayerView.prototype.onResize = function () {
        _super.prototype.onResize.call(this);
        if (isDefined(this.map) && this.map !== null) {
            this.map.updateSize();
        }
    };
    // ----------------------------------------------------//
    // ---------------------- LAYERS ---------------------//
    // --------------------------------------------------//
    /**
     * Add a marker to the map.
     * @param {Object} properties
     * @param {Number} properties.lon
     * @param {Number} properties.lat
     * @param {String} properties.icon - path of the icon
     * @param {Number} properties.orientation - orientation in degree
     * @param {String} properties.id - the id of the new created marker: layer.id$layer.markerId
     * @return {Object} the new marker object
     */
    OpenLayerView.prototype.addMarker = function (properties) {
        //create marker
        if (isDefined(this.map) && this.map !== null) {
            var marker = new Point(transform([properties.location.x, properties.location.y], 'EPSG:4326', this.projection));
            var markerFeature = new Feature({
                geometry: marker,
                name: 'Marker' //TODO
            });
            if (isDefined(properties.icon) && properties.icon !== null) {
                var iconStyle = new Style({
                    image: new Icon({
                        opacity: properties.iconOpacity,
                        src: properties.icon,
                        anchor: properties.iconAnchor,
                        anchorYUnits: 'pixels',
                        anchorXUnits: 'pixels',
                        rotation: properties.orientation.heading * Math.PI / 180,
                        scale: properties.iconScale,
                        size: properties.iconSize,
                        color: properties.iconColor
                    }),
                    zIndex: properties.zIndex,
                    text: new Text({
                        text: properties.label,
                        offsetX: properties.labelOffset[0],
                        offsetY: properties.labelOffset[1],
                        scale: properties.labelScale,
                        fill: new Fill({
                            color: properties.labelColor
                        }),
                    })
                });
                markerFeature.setStyle(iconStyle);
            }
            markerFeature.setId(properties.id + "$" + properties.markerId);
            this.vectorSource.addFeature(markerFeature);
            if (this.first) {
                this.first = false;
                this.map.getView().setCenter(transform([properties.location.x, properties.location.y], 'EPSG:4326', this.projection));
                this.map.getView().setZoom(12);
            }
            this.vectorMarkerLayer.setZIndex(properties.zIndex);
            return markerFeature;
        }
        this.onResize();
        //TODO: exception
        return null;
    };
    /**
     * Updates the marker associated to the layer.
     * @param {PointMarkerLayer.props} props - The layer properties allowing the update of the marker
     */
    OpenLayerView.prototype.updateMarker = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var markerFeature, markerObj, lon, lat, coordinates, style, iconOpts;
            return __generator(this, function (_a) {
                if (!isDefined(props.location)) {
                    return [2 /*return*/];
                }
                markerFeature = this.getMarker(props);
                if (!isDefined(markerFeature)) {
                    markerObj = this.addMarker(props);
                    this.addMarkerToLayer(props, markerObj);
                }
                else {
                    lon = props.location.x;
                    lat = props.location.y;
                    if (!isNaN(lon) && !isNaN(lat)) {
                        coordinates = transform([lon, lat], 'EPSG:4326', this.projection);
                        markerFeature.getGeometry().setCoordinates(coordinates);
                    }
                    style = markerFeature.getStyle();
                    // updates orientation
                    if (props.icon !== null) {
                        // ol.style.Icon doesn't have a setSrc method so you would need to create one for each source.
                        // Then either set that in your ol.style.Style as required
                        if ((style.getImage().getSrc() !== props.icon) || style.getImage().color !== props.iconColor) {
                            iconOpts = {
                                anchorYUnits: 'pixels',
                                anchorXUnits: 'pixels',
                                src: props.icon,
                                color: props.iconColor
                            };
                            style.setImage(new Icon(iconOpts));
                        }
                        // console.log(style.getImage().iconImage_)
                        // updates icon
                        style.getImage().setOpacity(props.iconOpacity);
                        style.getImage().setScale(props.iconScale);
                        style.getText().setText(props.label);
                        style.getText().setOffsetX(props.labelOffset[0]);
                        style.getText().setOffsetY(props.labelOffset[1]);
                        style.getText().setScale(props.labelScale);
                        style.getText().getFill().setColor(props.labelColor);
                        style.setZIndex(props.zIndex);
                        style.getImage().setAnchor(props.iconAnchor);
                        style.getImage().setRotation(props.orientation.heading * Math.PI / 180);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Abstract method to remove a marker from its corresponding layer.
     * This is library dependent.
     * @param {Object} marker - The Map marker object
     */
    OpenLayerView.prototype.removeMarkerFromLayer = function (marker) {
        this.vectorSource.removeFeature(marker);
    };
    /**
     * Add a polyline to the map.
     * @param {Object} properties
     */
    OpenLayerView.prototype.addPolyline = function (properties) {
        var polylinePoints = [];
        var locations = properties.locations;
        for (var i = 0; i < locations.length; i++) {
            polylinePoints.push(transform([locations[i].x, locations[i].y], 'EPSG:4326', this.projection));
        }
        //create path
        var pathGeometry = new LineString(polylinePoints);
        var feature = new Feature({
            geometry: pathGeometry,
            name: 'Line'
        });
        var source = new VectorSource({
            features: [feature]
        });
        var vectorPathLayer = new VectorLayer({
            title: properties.name,
            source: source,
            style: new Style({
                fill: new Fill({
                    color: properties.color
                }),
                stroke: new Stroke({
                    color: properties.color,
                    width: properties.weight
                })
            })
        });
        vectorPathLayer.setZIndex(0);
        this.map.addLayer(vectorPathLayer);
        return vectorPathLayer;
    };
    /**
     * Updates the polyline associated to the layer.
     * @param {PolylineLayer.properties} props - The layer allowing the update of the polyline
     */
    OpenLayerView.prototype.updatePolyline = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var polyline, vectorSource, polylinePoints, locations, i, style;
            return __generator(this, function (_a) {
                if (!isDefined(props.locations) || props.locations.length < 2) {
                    return [2 /*return*/];
                }
                polyline = this.getPolyline(props);
                if (!isDefined(polyline)) {
                    // removes the layer
                    polyline = this.addPolyline(props);
                    this.addPolylineToLayer(props, polyline);
                }
                else {
                    vectorSource = polyline.getSource();
                    polylinePoints = [];
                    locations = props.locations;
                    if (isDefined(locations) && locations.length > 0) {
                        for (i = 0; i < locations.length; i++) {
                            polylinePoints.push(transform([locations[i].x, locations[i].y], 'EPSG:4326', this.projection));
                        }
                        vectorSource.getFeatures()[0].getGeometry().setCoordinates(polylinePoints);
                    }
                    style = polyline.getStyle();
                    style.getStroke().setColor(props.color);
                    style.getStroke().setWidth(props.weight);
                    style.getFill().setColor(props.color);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Abstract method to remove a polyline from its corresponding layer.
     * This is library dependant.
     * @param {Object} polyline - The Map polyline object
     */
    OpenLayerView.prototype.removePolylineFromLayer = function (polyline) {
        this.map.removeLayer(polyline);
    };
    /**
     * Add a polygon to the map.
     * @param {Object} properties
     */
    OpenLayerView.prototype.addPolygon = function (properties) {
        var polygonPoints = [];
        var vertices = properties.vertices;
        for (var i = 0; i < vertices.length - 1; i = i + 2) {
            polygonPoints.push(transform([vertices[i], vertices[i + 1]], 'EPSG:4326', this.projection));
        }
        //create path
        var pathGeometry = new Polygon([polygonPoints]);
        var feature = new Feature({
            geometry: pathGeometry,
            name: 'Polygon'
        });
        var source = new VectorSource({
            features: [feature]
        });
        var vectorPolygonLayer = new VectorLayer({
            title: properties.name,
            source: source,
            style: new Style({
                fill: new Fill({
                    color: properties.color
                }),
                stroke: new Stroke({
                    color: properties.color,
                    width: properties.outlineWidth
                })
            })
        });
        vectorPolygonLayer.setZIndex(0);
        this.map.addLayer(vectorPolygonLayer);
        return vectorPolygonLayer;
    };
    /**
     * Updates the polygon associated to the layer.
     * @param {Object} props - The layer allowing the update of the polygon
     */
    OpenLayerView.prototype.updatePolygon = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var polygon, vectorSource, polygonPoints, vertices, i, style;
            return __generator(this, function (_a) {
                polygon = this.getPolygon(props);
                if (!isDefined(polygon)) {
                    // removes the layer
                    polygon = this.addPolygon(props);
                    this.addPolygonToLayer(props, polygon);
                }
                else {
                    vectorSource = polygon.getSource();
                    polygonPoints = [];
                    vertices = props.vertices;
                    if (isDefined(vertices) && vertices.length > 0) {
                        for (i = 0; i < vertices.length - 1; i = i + 2) {
                            polygonPoints.push(transform([vertices[i], vertices[i + 1]], 'EPSG:4326', this.projection));
                        }
                        vectorSource.getFeatures()[0].getGeometry().setCoordinates([polygonPoints]);
                    }
                    style = polygon.getStyle();
                    style.getStroke().setColor(props.outlineColor);
                    style.getStroke().setWidth(props.outlineWidth);
                    style.getFill().setColor(props.color);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Abstract method to remove a polygon from its corresponding layer.
     * This is library dependant.
     * @param {Object} polygon - The Map polygon object
     */
    OpenLayerView.prototype.removePolygonFromLayer = function (polygon) {
        this.map.removeLayer(polygon);
    };
    OpenLayerView.prototype.addEllipse = function (properties) {
        var position = properties.position;
        var semiMajorAxis = properties.semiMajorAxis;
        var semiMinorAxis = properties.semiMinorAxis;
        var projPosition = transform([position.x, position.y], 'EPSG:4326', this.projection);
        var coordinates = [];
        var radinas = Math.PI / 180;
        for (var angle = 1; angle <= 360; angle++) {
            var px = semiMajorAxis * Math.cos(radinas * angle);
            var py = semiMinorAxis * Math.sin(radinas * angle);
            var pxii = projPosition[0] + px;
            var pyii = projPosition[1] + py;
            coordinates.push([pxii, pyii]);
        }
        //create path
        var pathGeometry = new Polygon([coordinates]);
        var feature = new Feature({
            geometry: pathGeometry,
            name: 'Ellipse'
        });
        feature.setId(properties.id + "$" + properties.markerId);
        var source = new VectorSource({
            features: [feature]
        });
        var vectorEllipseLayer = new VectorLayer({
            title: properties.name,
            source: source,
            style: new Style({
                fill: new Fill({
                    color: properties.color
                }),
                stroke: new Stroke({
                    color: properties.color,
                    width: 1
                })
            })
        });
        vectorEllipseLayer.setZIndex(properties.zIndex);
        this.map.addLayer(vectorEllipseLayer);
        return vectorEllipseLayer;
    };
    OpenLayerView.prototype.updateEllipse = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var ellipse, vectorSource, position, semiMajorAxis, semiMinorAxis, projPosition, coordinates, radinas, nbPoints, precision, angle, px, py, pxii, pyii, ellipseFeature, style;
            return __generator(this, function (_a) {
                if (!isDefined(props.position)) {
                    return [2 /*return*/];
                }
                ellipse = this.getEllipse(props);
                if (!isDefined(ellipse)) {
                    // removes the layer
                    ellipse = this.addEllipse(props);
                    this.addEllipseToLayer(props, ellipse);
                }
                else {
                    // updates position
                    if (!isNaN(props.position.x) && !isNaN(props.position.y)) {
                        vectorSource = ellipse.getSource();
                        position = props.position;
                        semiMajorAxis = props.semiMajorAxis;
                        semiMinorAxis = props.semiMinorAxis;
                        projPosition = transform([position.x, position.y], 'EPSG:4326', this.projection);
                        coordinates = [];
                        radinas = Math.PI / 180;
                        nbPoints = 100;
                        precision = 360 / nbPoints;
                        for (angle = 1; angle <= 360; angle += precision) {
                            px = semiMajorAxis * Math.cos(radinas * angle);
                            py = semiMinorAxis * Math.sin(radinas * angle);
                            pxii = projPosition[0] + px;
                            pyii = projPosition[1] + py;
                            coordinates.push([pxii, pyii]);
                        }
                        ellipseFeature = vectorSource.getFeatures()[0];
                        ellipseFeature.getGeometry().setCoordinates([coordinates]);
                        style = ellipse.getStyle();
                        style.getStroke().setColor(props.color);
                        style.getStroke().setWidth(1);
                        style.getFill().setColor(props.color);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    OpenLayerView.prototype.removeEllipseFromLayer = function (ellipse) {
        this.map.removeLayer(ellipse);
    };
    return OpenLayerView;
}(MapView));
export default OpenLayerView;
//# sourceMappingURL=OpenLayerView.js.map