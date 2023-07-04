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
import MapView from "./MapView";
import { isDefined, randomUUID } from "../../../utils/Utils";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map, Marker, Popup } from 'mapbox-gl/dist/mapbox-gl';
/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the Mapbox-gl.js framework.
 * @extends MapView
 */
var MapboxView = /** @class */ (function (_super) {
    __extends(MapboxView, _super);
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Object} [properties.mapProperties] - the [map properties]{@link https://docs.mapbox.com/mapbox-gl-js/api/map/}
     * @param {String} [properties.mapProperties.container='map'] - the default div container
     * @param {String} [properties.mapProperties.style='https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'] - the default style URL
     * @param {Number} [properties.mapProperties.zoom=7] - the default zoom value
     * @param {Number[]} [properties.mapProperties.center=[0,0]] - the default center value
     * @param {Number[]} [properties.mapProperties.antialias=true] - create the gl context with MSAA antialiasing, so custom layers are antialiased
     * @param {Boolean} [properties.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     *
     */
    function MapboxView(properties) {
        var _this = _super.call(this, __assign({ supportedLayers: ['marker', 'polyline', 'polygon'] }, properties)) || this;
        _this.loaded = false;
        _this.first = false;
        return _this;
    }
    //---------- MAP SETUP --------------//
    /**
     * @private
     */
    MapboxView.prototype.initMap = function (options) {
        this.map = new Map(__assign({ container: 'map', style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json', center: [0, 0], zoom: 2, antialias: true }, options.mapProperties));
        var that = this;
        this.map.on('load', function () {
            that.loaded = true;
        });
    };
    MapboxView.prototype.beforeAddingItems = function (options) {
        // inits the map
        this.initMap(options);
    };
    /**
     * Updates the marker associated to the layer.
     * @param {PointMarkerLayer.props} props - The layer properties allowing the update of the marker
     */
    MapboxView.prototype.updateMarker = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var marker, markerObj, marker_1, lon, lat, name_1;
            return __generator(this, function (_a) {
                if (!this.loaded) {
                    // map is not loaded yet
                    return [2 /*return*/];
                }
                marker = this.getMarker(props);
                if (!isDefined(marker)) {
                    markerObj = this.addMarker(props);
                    this.addMarkerToLayer(props, markerObj);
                }
                else {
                    marker_1 = this.getMarker(props);
                    lon = props.location.x;
                    lat = props.location.y;
                    marker_1.setLngLat([lon, lat]).setRotation(props.orientation.heading);
                    // update style
                    marker_1.getElement().style.backgroundImage = "url(".concat(props.icon, ")");
                    marker_1.getElement().style.width = props.iconSize[0] + 'px';
                    marker_1.getElement().style.height = props.iconSize[1] + 'px';
                    if (isDefined(props.orientation)) {
                        marker_1.setRotation(props.orientation.heading);
                    }
                    name_1 = 'Marker';
                    if (isDefined(props.name) && props.name !== '') {
                        name_1 = props.name;
                    }
                    else if (isDefined(props.label) && props.label !== '') {
                        name_1 = props.label;
                    }
                    marker_1.getPopup().setHTML("<strong>".concat(name_1, "</strong>"));
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Updates the polyline associated to the layer.
     * @param {Polyline.props} props - The layer allowing the update of the polyline
     */
    MapboxView.prototype.updatePolyline = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var that, polyline, polylineObj, sourceId, layerId, polylineFeature, dataId, locationsPts, locations, i;
            return __generator(this, function (_a) {
                that = this;
                if (!this.loaded) {
                    // map is not loaded yet
                    return [2 /*return*/];
                }
                polyline = this.getPolyline(props);
                if (!isDefined(polyline)) {
                    polylineObj = this.addPolyline(props);
                    this.addPolylineToLayer(props, polylineObj);
                }
                else {
                    sourceId = polyline.source;
                    layerId = polyline.id;
                    polylineFeature = this.map.getSource(sourceId);
                    dataId = polylineFeature.id;
                    locationsPts = [];
                    locations = props.locations;
                    for (i = 0; i < locations.length; i++) {
                        locationsPts.push([locations[i].x, locations[i].y]);
                    }
                    polylineFeature.setData({
                        'id': dataId,
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'LineString',
                                    'coordinates': locationsPts
                                }
                            }
                        ]
                    });
                    this.map.setPaintProperty(layerId, 'line-color', props.color);
                    this.map.setPaintProperty(layerId, 'line-width', props.weight);
                    this.map.setPaintProperty(layerId, 'line-opacity', props.opacity);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Gets the list of default layers.
     * @return {Array}
     */
    MapboxView.prototype.getDefaultLayers = function () {
    };
    /**
     * Add a marker to the map.
     * @param {Object} properties
     * @param {Number} properties.lon
     * @param {Number} properties.lat
     * @param {Number} properties.label
     * @param {String} properties.icon - path of the icon
     * @param {Number} properties.orientation - orientation in degree
     * @param {String} properties.id - the id of the new created marker: layer.id$layer.markerId
     * @return {Object} the new marker object
     */
    MapboxView.prototype.addMarker = function (properties) {
        if (!this.loaded) {
            // map is not loaded yet
            return;
        }
        var name = 'Marker';
        if (isDefined(properties.name)) {
            name = properties.name;
        }
        else if (isDefined(properties.label)) {
            name = properties.label;
        }
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = "url(".concat(properties.icon, ")");
        el.style.width = properties.iconSize[0] + 'px';
        el.style.height = properties.iconSize[1] + 'px';
        el.style.backgroundSize = '100%';
        var marker = new Marker({
            element: el
        })
            .setLngLat([properties.location.x, properties.location.y])
            .setRotation(properties.orientation.heading)
            .setPopup(new Popup().setHTML("<strong>".concat(name, "</strong>")))
            .addTo(this.map);
        marker.id = properties.id + "$" + properties.markerId;
        if (!this.first && this.properties.autoZoomOnFirstMarker) {
            this.map.flyTo({
                center: [properties.location.x, properties.location.y],
                zoom: properties.zoomLevel,
                speed: 3.5,
                curve: 2,
                easing: function (t) {
                    return t;
                }
            });
            this.first = false;
        }
        return marker;
    };
    /**
     * Abstract method to remove a marker from its corresponding layer.
     * This is library dependent.
     * @param {Object} marker - The Map marker object
     */
    MapboxView.prototype.removeMarkerFromLayer = function (marker) {
        if (!this.loaded) {
            // map is not loaded yet
            return;
        }
        marker.remove();
    };
    /**
     * Abstract method to remove a polyline from its corresponding layer.
     * This is library dependant.
     * @param {Object} polyline - The Map polyline object
     */
    MapboxView.prototype.removePolylineFromLayer = function (polyline) {
        this.map.removeLayer(polyline.id).removeSource(polyline.source);
    };
    /**
     * Abstract method to remove a polygon from its corresponding layer.
     * This is library dependant.
     * @param {Object} polygon - The Map polygon object
     */
    MapboxView.prototype.removePolygonFromLayer = function (polygon) {
        this.map.removeLayer(polygon.id + '-outline');
        this.map.removeLayer(polygon.id).removeSource(polygon.source);
    };
    /**
     * Add a polyline to the map.
     * @param {locations} locations - the coordinates [{x, y}]
     * @param {Object} properties
     * @param {String} properties.color
     * @param {Number} properties.weight
     * @param {String} properties.name
     * @return {string} the id of the new created polyline
     */
    MapboxView.prototype.addPolyline = function (properties) {
        if (!this.loaded) {
            // map is not loaded yet
            return;
        }
        var layerId = randomUUID();
        var dataId = randomUUID();
        var sourceId = randomUUID();
        var geojson = {
            'id': dataId,
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[0, 0]]
                    }
                }
            ]
        };
        this.map.addSource(sourceId, {
            'type': 'geojson',
            'data': geojson
        });
        // add the line which will be modified in the animation
        var layer = {
            'id': layerId,
            'type': 'line',
            'source': sourceId,
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': properties.color,
                'line-width': properties.weight,
                'line-opacity': properties.opacity
            }
        };
        this.map.addLayer(layer);
        return layer;
    };
    /**
     * Updates the polygon associated to the layer.
     * @param {Polygon.props} props - The layer allowing the update of the polygon
     */
    MapboxView.prototype.updatePolygon = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var polygon, sourceId, layerId, polygonFeature, dataId, polygonPoints, vertices, i;
            return __generator(this, function (_a) {
                if (!this.loaded) {
                    // map is not loaded yet
                    return [2 /*return*/];
                }
                polygon = this.getPolygon(props);
                if (!isDefined(polygon)) {
                    // adds a new marker to the leaflet renderer
                    polygon = this.addPolygon(props);
                    this.addPolygonToLayer(props, polygon);
                }
                else {
                    sourceId = polygon.source;
                    layerId = polygon.id;
                    polygonFeature = this.map.getSource(sourceId);
                    dataId = polygonFeature.id;
                    polygonPoints = [];
                    vertices = props.vertices;
                    if (isDefined(vertices) && vertices.length > 0) {
                        for (i = 0; i < vertices.length - 1; i = i + 2) {
                            polygonPoints.push([vertices[i], vertices[i + 1]]);
                        }
                    }
                    polygonFeature.setData({
                        'id': dataId,
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Polygon',
                                    'coordinates': [polygonPoints]
                                }
                            }
                        ]
                    });
                    this.map.setPaintProperty(layerId, 'fill-color', props.color);
                    this.map.setPaintProperty(layerId, 'fill-opacity', props.opacity);
                    // change outline
                    this.map.setPaintProperty(layerId + '-outline', 'line-color', props.outlineColor);
                    this.map.setPaintProperty(layerId + '-outline', 'line-width', props.outlineWidth);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Add a polygon to the map.
     * @param {Object} properties
     */
    MapboxView.prototype.addPolygon = function (properties) {
        var id = properties.id + "$" + properties.polygonId;
        // update locations
        var polygonPoints = [];
        var vertices = properties.vertices;
        if (isDefined(vertices) && vertices.length > 0) {
            for (var i = 0; i < vertices.length - 1; i = i + 2) {
                polygonPoints.push([vertices[i], vertices[i + 1]]);
            }
        }
        var layerId = randomUUID();
        var dataId = randomUUID();
        var sourceId = randomUUID();
        var geojson = {
            'id': dataId,
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [polygonPoints]
                    }
                }
            ]
        };
        this.map.addSource(sourceId, {
            'type': 'geojson',
            'data': geojson
        });
        // add the line which will be modified in the animation
        var layer = {
            'id': layerId,
            'type': 'fill',
            'source': sourceId,
            'layout': {},
            'paint': {
                'fill-color': properties.color,
                'fill-opacity': properties.opacity
            }
        };
        // Add an outline around the polygon.
        this.map.addLayer(layer);
        // Add an outline around the polygon.
        this.map.addLayer({
            'id': layerId + '-outline',
            'type': 'line',
            'source': sourceId,
            'layout': {},
            'paint': {
                'line-color': properties.outlineColor,
                'line-width': properties.outlineWidth
            }
        });
        return layer;
    };
    MapboxView.prototype.onResize = function () {
    };
    return MapboxView;
}(MapView));
export default MapboxView;
//# sourceMappingURL=MapboxView.js.map