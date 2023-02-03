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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import MapView from "./MapView";
import { Deck, MapView as MapViewDeck } from '@deck.gl/core';
import { IconLayer } from '@deck.gl/layers';
import { hex2rgb, isDefined, randomUUID, rgbaToArray } from "../../../utils/Utils";
import { BitmapLayer, PathLayer, PolygonLayer } from '@deck.gl/layers';
import { TileLayer } from '@deck.gl/geo-layers';
import '../../../resources/css/deck.css';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { registerLoaders } from "@loaders.gl/core";
import { GLTFLoader } from "@loaders.gl/gltf";
/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the Deck.gl Map object.
 * @extends MapView
 */
var DeckGlView = /** @class */ (function (_super) {
    __extends(DeckGlView, _super);
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Boolean} [properties.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     * @param {Object} [properties.deckProps={}] - the properties of the [Deck]{@link https://deck.gl/docs/api-reference/core/deck} object
     *
     */
    function DeckGlView(properties) {
        var _this = _super.call(this, __assign({ supportedLayers: ['marker', 'polyline', 'polygon'] }, properties)) || this;
        registerLoaders(GLTFLoader);
        var cssClass = document.getElementById(_this.divId).className;
        document.getElementById(_this.divId).setAttribute("class", cssClass + " " + _this.css);
        _this.autoZoomOnFirstMarker = false;
        if (isDefined(properties) && isDefined(properties.autoZoomOnFirstMarker)) {
            _this.autoZoomOnFirstMarker = properties.autoZoomOnFirstMarker;
        }
        return _this;
    }
    DeckGlView.prototype.beforeAddingItems = function (options) {
        // inits the map
        this.initMap(options);
    };
    //---------- MAP SETUP --------------//
    /**
     *
     * @private
     */
    DeckGlView.prototype.initMap = function (options) {
        this.INITIAL_VIEW_STATE = {
            longitude: 0,
            latitude: 0,
            zoom: 2,
            bearing: 0,
            pitch: 0
        };
        var canvasElt = document.createElement('canvas');
        canvasElt.setAttribute('id', randomUUID());
        canvasElt.setAttribute('style', 'width:100%;height:100%;position:relative;');
        var domNode = document.getElementById(this.divId);
        domNode.appendChild(canvasElt);
        // https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}
        // https://c.tile.openstreetmap.org/{z}/{x}/{y}.png
        this.deckLayers = [];
        if (isDefined(options) && isDefined(options.deckProps) && isDefined(options.deckProps.layers)) {
            for (var i = 0; i < options.deckProps.layers.length; i++) {
                var id = options.deckProps.layers[i].id ? options.deckProps.layers[i].id : 'base_' + id;
                this.deckLayers.push(options.deckProps.layers[i]);
            }
        }
        else {
            this.deckLayers.push(new TileLayer({
                id: 'base',
                // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
                data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
                minZoom: 0,
                maxZoom: 19,
                tileSize: 256,
                renderSubLayers: function (props) {
                    var _a = props.tile.bbox, west = _a.west, south = _a.south, east = _a.east, north = _a.north;
                    return new BitmapLayer(props, {
                        data: null,
                        image: props.data,
                        bounds: [west, south, east, north]
                    });
                }
            }));
        }
        var deckProps = {
            canvas: canvasElt.id,
            width: '100%',
            height: '100%',
            controller: true,
            views: [new MapViewDeck()],
            initialViewState: this.INITIAL_VIEW_STATE,
            onViewStateChange: function (_a) {
                var viewState = _a.viewState;
            },
            layers: this.deckLayers
        };
        // overrides default conf by user defined one
        if (isDefined(options) && isDefined(deckProps)) {
            deckProps = __assign(__assign({}, deckProps), options.deckProps);
        }
        this.INITIAL_VIEW_STATE = deckProps.initialViewState;
        this.deckgl = new Deck(deckProps);
    };
    /**
     * Updates the marker associated to the layer.
     * @param {PointMarkerLayer.props} props - The layer properties allowing the update of the marker
     */
    DeckGlView.prototype.updateMarker = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var id, mId, iconColor, iconLayer, extraProps;
            var _this = this;
            return __generator(this, function (_a) {
                id = props.id + '$' + props.markerId;
                mId = props.markerId;
                iconColor = props.iconColor;
                if (isDefined(iconColor)) {
                    iconColor = hex2rgb(props.iconColor);
                }
                else {
                    iconColor = "#000000";
                }
                if (props.icon.endsWith('glb')) {
                    iconLayer = new ScenegraphLayer({
                        id: id,
                        data: [{
                                position: [props.location.x, props.location.y, props.location.z]
                            }],
                        pickable: true,
                        scenegraph: props.icon,
                        getPosition: function (d) { return d.position; },
                        getOrientation: function (d) { return [0, props.orientation.yaw, 90]; },
                        _animations: {
                            '*': { speed: 5 }
                        },
                        sizeScale: props.iconScale,
                        _lighting: 'pbr'
                    });
                }
                else {
                    // in deck we create a new layer everytime => reactive programming
                    iconLayer = new IconLayer({
                        id: id,
                        data: [{
                                position: [props.location.x, props.location.y, props.location.z]
                            }],
                        pickable: true,
                        // iconAtlas and iconMapping are required
                        // getIcon: return a string
                        iconAtlas: props.icon,
                        iconMapping: {
                            marker: {
                                x: 0,
                                y: 0,
                                anchorX: props.iconAnchor[0],
                                anchorY: props.iconAnchor[1],
                                width: props.iconSize[0],
                                height: props.iconSize[1],
                                mask: isDefined(props.iconColor) && props.iconColor !== '#000000'
                            }
                        },
                        getIcon: function (d) { return 'marker'; },
                        getPosition: function (d) { return d.position; },
                        sizeScale: props.iconScale,
                        getSize: function (d) { return props.iconSize[1]; },
                        getColor: function (d) { return iconColor; },
                        onHover: function (info, event) { return _this.onMarkerHover(mId, info, props, event); },
                        onClick: function (info, event) { return event.leftButton ? _this.onMarkerLeftClick(mId, info, props, event) :
                            _this.onMarkerRightClick(mId, info, props, event); },
                        zIndex: props.zIndex
                    });
                }
                // is going to create or update the current entry into the layer map
                this.addMarkerToLayer(props, iconLayer);
                extraProps = {};
                if (this.autoZoomOnFirstMarker) {
                    this.autoZoomOnFirstMarker = false;
                    // Zoom to the object
                    extraProps.initialViewState = __assign(__assign({}, this.INITIAL_VIEW_STATE), { longitude: props.location.x, latitude: props.location.y, zoom: props.zoomLevel });
                }
                this.render(extraProps);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Updates the polyline associated to the layer.
     * @param {Polyline} layer - The layer allowing the update of the polyline
     */
    DeckGlView.prototype.updatePolyline = function (layer) {
        return __awaiter(this, void 0, void 0, function () {
            var id, path, PATH_DATA, pathLayer;
            return __generator(this, function (_a) {
                id = layer.id + '$' + layer.polylineId;
                path = layer.locations.map(function (coordinate) {
                    return [coordinate.x, coordinate.y, coordinate.z || 1];
                });
                PATH_DATA = [
                    {
                        weight: layer.weight,
                        "name": layer.id,
                        "color": this.rgbaToArray(layer.color),
                        "path": path
                    }
                ];
                pathLayer = new PathLayer({
                    id: id,
                    data: PATH_DATA,
                    widthUnits: 'pixels',
                    widthMinPixels: 5,
                    getPath: function (d) { return d.path; },
                    getColor: function (d) { return d.color; },
                    getWidth: function (d) { return d.weight; }
                });
                this.addPolylineToLayer(layer, pathLayer);
                this.render({});
                return [2 /*return*/];
            });
        });
    };
    /**
     * Updates the polyline associated to the layer.
     * @param {Polyline} layer - The layer allowing the update of the polyline
     */
    DeckGlView.prototype.updatePolygon = function (layer) {
        return __awaiter(this, void 0, void 0, function () {
            var id, polygonPoints, vertices, i, outlineColor, color, PATH_DATA, pathLayer;
            return __generator(this, function (_a) {
                id = layer.id + '$' + layer.polygonId;
                polygonPoints = [];
                vertices = layer.vertices;
                if (isDefined(vertices) && vertices.length > 0) {
                    for (i = 0; i < vertices.length - 1; i = i + 2) {
                        polygonPoints.push([vertices[i], vertices[i + 1]]);
                    }
                }
                outlineColor = rgbaToArray(layer.outlineColor).map(function (val, index, arr) {
                    if (index >= 3) {
                        return parseInt(val * 255);
                    }
                    else {
                        return val;
                    }
                });
                color = rgbaToArray(layer.color).map(function (val, index, arr) {
                    if (index >= 3) {
                        return parseInt(val * 255);
                    }
                    else {
                        return val;
                    }
                });
                PATH_DATA = [
                    {
                        outlineWidth: layer.outlineWidth,
                        outlineColor: outlineColor,
                        name: layer.label,
                        color: color,
                        contour: [
                            polygonPoints
                        ]
                    }
                ];
                pathLayer = new PolygonLayer({
                    id: id,
                    data: PATH_DATA,
                    widthUnits: 'pixels',
                    lineWidthMinPixels: 1,
                    stroked: true,
                    filled: true,
                    getPolygon: function (d) { return d.contour; },
                    getFillColor: function (d) { return d.color; },
                    getLineWidth: function (d) { return d.outlineWidth; },
                    getLineColor: function (d) { return d.outlineColor; }
                });
                this.addPolygonToLayer(layer, pathLayer);
                this.render({});
                return [2 /*return*/];
            });
        });
    };
    /**
     * Override super method to render() at the end
     * @param {Object} marker - The Map marker object
     */
    DeckGlView.prototype.removeMarker = function (marker) {
        _super.prototype.removeMarkers.call(this, marker);
        this.render({});
    };
    /**
     * Override super method to render() at the end
     * @param {Object} polyline - The Map polyline object
     */
    DeckGlView.prototype.removePolylines = function (polyline) {
        _super.prototype.removePolylines.call(this, polyline);
        this.render({});
    };
    /**
     * Override super method to render() at the end
     * @param {Object} polygon - The Map polygon object
     */
    DeckGlView.prototype.removePolygons = function (polygon) {
        _super.prototype.removePolygons.call(this, polygon);
        this.render({});
    };
    /**
     * Inner method to render in the order the different deck.gl layers
     * @private
     * @param {Object} extraProps - Extra deck props
     */
    DeckGlView.prototype.render = function (extraProps) {
        var markers = this.getMarkers();
        var polylines = this.getPolylines();
        var polygons = this.getPolygons();
        // draw in order base -> polygons -> polylines -> markers
        markers.sort(function (a, b) { return (a.props.zIndex > b.props.zIndex) ? 1 : ((b.props.zIndex > a.props.zIndex) ? -1 : 0); });
        var props = {
            layers: __spreadArray(__spreadArray(__spreadArray(__spreadArray([], this.deckLayers, true), polygons, true), polylines, true), markers, true)
        };
        this.deckgl.setProps(__assign(__assign({}, extraProps), props));
    };
    DeckGlView.prototype.rgbaToArray = function (str) {
        if (Array.isArray(str)) {
            return str;
        }
        var startIdxValue = str.indexOf('(') + 1;
        var endIdxValue = str.indexOf(')');
        var values = str.substr(startIdxValue, endIdxValue - startIdxValue);
        var rgba = values.split(',').map(Number);
        rgba[3] = parseInt(rgba[3] * 100);
        return rgba;
    };
    return DeckGlView;
}(MapView));
export default DeckGlView;
//# sourceMappingURL=DeckGlView.js.map