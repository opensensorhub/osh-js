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
import View from "../View";
import { isDefined } from "../../../utils/Utils";
/**
 * This class is an abstract class in charge of handling common Map operations.
 * @extends View
 */
var MapView = /** @class */ (function (_super) {
    __extends(MapView, _super);
    function MapView(properties) {
        var _this = _super.call(this, properties) || this;
        // map Layer id to array of corresponding markers
        _this.layerIdToMarkers = {};
        // map Layer id to array of corresponding polylines
        _this.layerIdToPolylines = {};
        // map Layer id to array of corresponding polylines
        _this.layerIdToEllipsoids = {};
        // map Layer id to array of corresponding polygons
        _this.layerIdToPolygon = {};
        // map Layer id to array of corresponding frustums
        _this.layerIdToFrustum = {};
        // map Layer id to array of corresponding draping
        _this.layerIdToDrapedImage = {};
        return _this;
    }
    MapView.prototype.setData = function (dataSourceId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var values, i, d;
            return __generator(this, function (_a) {
                values = data.values;
                for (i = 0; i < values.length; i++) {
                    d = values[i];
                    if (data.type === 'marker') {
                        this.updateMarker(d);
                    }
                    else if (data.type === 'polyline') {
                        this.updatePolyline(d);
                    }
                    else if (data.type === 'drapedImage') {
                        this.updateDrapedImage(d);
                    }
                    else if (data.type === 'ellipse') {
                        this.updateEllipse(d);
                    }
                    else if (data.type === 'polygon') {
                        this.updatePolygon(d);
                    }
                    else if (data.type === 'coplanarPolygon') {
                        this.updateCoPlanarPolygon(d);
                    }
                    else if (data.type === 'frustum') {
                        this.updateFrustum(d);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    MapView.prototype.addPolygonToLayer = function (props, polygon) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.layerIdToPolygon[props.polygonId] = polygon;
                return [2 /*return*/];
            });
        });
    };
    /**
     * Associate a markerId to a Layer for a fast lookup
     * @protected
     * @param {PointMarkerLayer.props} layer - the Layer object
     * @param {Object} markerObject - the Map marker object
     */
    MapView.prototype.addMarkerToLayer = function (props, markerObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.layerIdToMarkers[props.markerId] = markerObject;
                return [2 /*return*/];
            });
        });
    };
    /**
     * Associate a polylineId to a Layer for a fast lookup
     * @protected
     * @param {Polyline.props} layer - the Layer object
     * @param {Object} polylineObject - the Map polyline object
     */
    MapView.prototype.addPolylineToLayer = function (props, polylineObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.layerIdToPolylines[props.polylineId] = polylineObject;
                return [2 /*return*/];
            });
        });
    };
    /**
     * Associate a ellipseId to a Layer for a fast lookup
     * @protected
     * @param {Ellipse.props} layer - the Layer object
     * @param {Object} ellipseObject - the Map ellipse object
     */
    MapView.prototype.addEllipseToLayer = function (props, ellipseObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.layerIdToEllipsoids[props.ellipseId] = ellipseObject;
                return [2 /*return*/];
            });
        });
    };
    /**
     * Associate a drapedImageId to a Layer for a fast lookup
     * @protected
     * @param {ImageDraping.props} layer - the Layer object
     * @param {Object} drapedImageObject - the Map drapedImage object
     */
    MapView.prototype.addDrapedImageToLayer = function (props, drapedImageObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.layerIdToDrapedImage[props.drapedImageId] = drapedImageObject;
                return [2 /*return*/];
            });
        });
    };
    MapView.prototype.addFrustumToLayer = function (props, frustum) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.layerIdToFrustum[props.frustumId] = frustum;
                return [2 /*return*/];
            });
        });
    };
    MapView.prototype.getPolygons = function () {
        var array = [];
        for (var id in this.layerIdToPolygon) {
            array.push(this.layerIdToPolygon[id]);
        }
        return array;
    };
    MapView.prototype.getPolygon = function (props) {
        if (!(props.polygonId in this.layerIdToPolygon)) {
            return null;
        }
        return this.layerIdToPolygon[props.polygonId];
    };
    /**
     * Get the markerId associate to the Layer
     * @protected
     * @param {PointMarkerLayer.props} props - the Layer Object
     */
    MapView.prototype.getMarker = function (props) {
        if (!(props.markerId in this.layerIdToMarkers)) {
            return null;
        }
        return this.layerIdToMarkers[props.markerId];
    };
    /**
     * Get all markers contained in this view
     * @protected
     */
    MapView.prototype.getMarkers = function () {
        var array = [];
        for (var id in this.layerIdToMarkers) {
            array.push(this.layerIdToMarkers[id]);
        }
        return array;
    };
    /**
     * Get all polylines contained in this view
     * @protected
     */
    MapView.prototype.getPolylines = function () {
        var array = [];
        for (var id in this.layerIdToPolylines) {
            array.push(this.layerIdToPolylines[id]);
        }
        return array;
    };
    /**
     * Get all ellpsoids contained in this view
     * @protected
     */
    MapView.prototype.getEllipsoids = function () {
        var array = [];
        for (var id in this.layerIdToEllipsoids) {
            array.push(this.layerIdToEllipsoids[id]);
        }
        return array;
    };
    /**
     * Get the ellipse associate to the Layer
     * @protected
     * @param {Ellipse.props} layer - the Layer Object
     */
    MapView.prototype.getPolyline = function (props) {
        if (!(props.polylineId in this.layerIdToEllipsoids)) {
            return null;
        }
        return this.layerIdToPolylines[props.polylineId];
    };
    /**
     * Get the ellipse associate to the Layer
     * @protected
     * @param {Ellipse.props} layer - the Layer Object
     */
    MapView.prototype.getEllipse = function (props) {
        if (!(props.ellipseId in this.layerIdToEllipsoids)) {
            return null;
        }
        return this.layerIdToEllipsoids[props.ellipseId];
    };
    /**
     * Get the polyline associate to the Layer
     * @protected
     * @param {Polyline.props} layer - the Layer Object
     */
    MapView.prototype.getPolyline = function (props) {
        if (!(props.polylineId in this.layerIdToPolylines)) {
            return null;
        }
        return this.layerIdToPolylines[props.polylineId];
    };
    /**
     * Get the draped image associate to the Layer
     * @protected
     * @param {ImageDrapingLayer.props} layer - the Layer Object
     */
    MapView.prototype.getDrapedImage = function (props) {
        if (!(props.drapedImageId in this.layerIdToDrapedImage)) {
            return null;
        }
        return this.layerIdToDrapedImage[props.drapedImageId];
    };
    MapView.prototype.getFrustums = function () {
        var array = [];
        for (var id in this.layerIdToFrustum) {
            array.push(this.layerIdToFrustum[id]);
        }
        return array;
    };
    MapView.prototype.getFrustum = function (props) {
        if (!(props.frustumId in this.layerIdToFrustum)) {
            return null;
        }
        return this.layerIdToFrustum[props.frustumId];
    };
    /**
     * Get the Layer associated to its id
     * @param {String} layerId - the id of the Layer
     * @return {Layer} - the corresponding layer, null otherwise
     */
    MapView.prototype.getLayer = function (layerId) {
        // find corresponding layer
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var currentLayer = _a[_i];
            if (currentLayer.props.id === layerId) {
                return currentLayer;
            }
        }
        return null;
    };
    /**
     * Remove Corresponding Layer
     * @param {Layer} layer - The layer object
     */
    MapView.prototype.removeAllFromLayer = function (layer) {
        // check for marker
        this.removeMarkers(layer);
        // check for polylines
        this.removePolylines(layer);
        this.removeEllipsoids(layer);
        this.removePolygons(layer);
        this.removeDrapedImages(layer);
        this.removeFrustums(layer);
        _super.prototype.removeAllFromLayer.call(this, layer);
    };
    MapView.prototype.removePolygons = function (layer) {
        var ids = layer.getIds() || [];
        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
            var id = ids_1[_i];
            var polygon = this.layerIdToPolygon[id];
            if (isDefined(polygon)) {
                this.removePolygonFromLayer(polygon);
            }
            // remove markers ids from Layer map
            delete this.layerIdToPolygon[id];
        }
    };
    /**
     * Remove the markers corresponding to a PointMarker Layer
     * @param {PointMarkerLayer} layer - the layer to remove the markers from
     */
    MapView.prototype.removeMarkers = function (layer) {
        var ids = layer.getIds() || [];
        for (var _i = 0, ids_2 = ids; _i < ids_2.length; _i++) {
            var id = ids_2[_i];
            var marker = this.layerIdToMarkers[id];
            if (isDefined(marker)) {
                this.removeMarkerFromLayer(marker);
            }
            // remove markers ids from Layer map
            delete this.layerIdToMarkers[id];
        }
    };
    /**
     * Remove the ellipsoids corresponding to a EllipseLayer Layer
     * @param {Ellipse} ellipse - the layer to remove the ellipsoids from
     */
    MapView.prototype.removeEllipsoids = function (ellipse) {
        var ids = ellipse.getIds() || [];
        for (var _i = 0, ids_3 = ids; _i < ids_3.length; _i++) {
            var id = ids_3[_i];
            var ellipse_1 = this.layerIdToEllipsoids[id];
            if (isDefined(ellipse_1)) {
                this.removeEllipseFromLayer(ellipse_1);
            }
            // remove polylines ids from Layer map
            delete this.layerIdToEllipsoids[id];
        }
    };
    /**
     * Remove the polylines corresponding to a PolylineLayer Layer
     * @param {Polyline} polyline - the layer to remove the polylines from
     */
    MapView.prototype.removePolylines = function (polyline) {
        var ids = polyline.getIds() || [];
        for (var _i = 0, ids_4 = ids; _i < ids_4.length; _i++) {
            var id = ids_4[_i];
            var polyline_1 = this.layerIdToPolylines[id];
            if (isDefined(polyline_1)) {
                this.removePolylineFromLayer(polyline_1);
            }
            // remove polylines ids from Layer map
            delete this.layerIdToPolylines[id];
        }
    };
    /**
     * Remove the drapedImage corresponding to a ImageDraping Layer
     * @param {ImageDraping} imageDraping - the layer to remove the drapedImage from
     */
    MapView.prototype.removeDrapedImages = function (drapedImage) {
        var ids = drapedImage.getIds() || [];
        for (var _i = 0, ids_5 = ids; _i < ids_5.length; _i++) {
            var id = ids_5[_i];
            var drapedImage_1 = this.layerIdToDrapedImage[id];
            if (isDefined(drapedImage_1)) {
                this.removeDrapedImageFromLayer(drapedImage_1);
            }
            // remove drapedImage ids from Layer map
            delete this.layerIdToDrapedImage[id];
        }
    };
    /**
     * Remove the frustums corresponding to a Frustum Layer
     * @param {FrustumLayer} polyline - the layer to remove the Frustum from
     */
    MapView.prototype.removeFrustums = function (layer) {
        var ids = layer.getIds() || [];
        for (var _i = 0, ids_6 = ids; _i < ids_6.length; _i++) {
            var id = ids_6[_i];
            var frustum = this.layerIdToFrustum[id];
            if (isDefined(frustum)) {
                this.removeFrustumFromLayer(frustum);
            }
            // remove markers ids from Layer map
            delete this.layerIdToFrustum[id];
        }
    };
    /**
     * Abstract method to remove a marker from its corresponding layer.
     * This is library dependant.
     * @protected
     * @param {Object} marker - The Map marker object
     */
    MapView.prototype.removeMarkerFromLayer = function (marker) { };
    /**
     * Abstract method to remove a polyline from its corresponding layer.
     * This is library dependant.
     * @protected
     * @param {Object} polyline - The Map polyline object
     */
    MapView.prototype.removePolylineFromLayer = function (polyline) { };
    /**
     * Abstract method to remove a draped image from its corresponding layer.
     * This is library dependant.
     * @protected
     * @param {Object} drapedImage - The Map drapedImage object
     */
    MapView.prototype.removeDrapedImageFromLayer = function (drapedImage) { };
    /**
     * Abstract method to remove a polygon from its corresponding layer.
     * This is library dependant.
     * @protected
     * @param {Object} polygon - The Map polygon object
     */
    MapView.prototype.removePolygonFromLayer = function (marker) { };
    /**
     * Method to call onLeftClick Layer method if exists
     * @param {String} markerId - the Layer markerId
     * @param {Object} markerObject - the View marker object
     * @param {PointMarkerLayer} layer - the Layer object
     * @param {Object} event - the original Map View event
     */
    MapView.prototype.onMarkerLeftClick = function (markerId, markerObject, layer, event) {
        if (isDefined(layer.onLeftClick)) {
            layer.onLeftClick.call(layer, markerId, markerObject, event);
        }
    };
    /**
     * Method to call onRightClick Layer method if exists
     * @param {String} markerId - the Layer markerId
     * @param {Object} markerObject - the View marker object
     * @param {PointMarkerLayer} layer - the Layer object
     * @param {Object} event - the original Map View event
     */
    MapView.prototype.onMarkerRightClick = function (markerId, markerObject, layer, event) {
        if (isDefined(layer.onRightClick)) {
            layer.onRightClick.call(layer, markerId, markerObject, event);
        }
    };
    /**
     * Method to call onMove Layer method if exists
     * @param {String} markerId - the Layer markerId
     * @param {Object} markerObject - the View marker object
     * @param {PointMarkerLayer} layer - the Layer object
     * @param {Object} event - the original Map View event
     */
    MapView.prototype.onMarkerMove = function (markerId, markerObject, layer, event) {
        if (isDefined(layer.onMove)) {
            layer.onMove.call(layer, markerId, markerObject, event);
        }
    };
    /**
     * Method to call onHover Layer method if exists
     * @param {String} markerId - the Layer markerId
     * @param {Object} markerObject - the View marker object
     * @param {PointMarkerLayer} layer - the Layer object
     * @param {Object} event - the original Map View event
     */
    MapView.prototype.onMarkerHover = function (markerId, markerObject, layer, event) {
        if (isDefined(layer.onHover)) {
            layer.onHover.call(layer, markerId, markerObject, event);
        }
    };
    /**
     * Gets the the Layer id from  a concatenated id
     * @param {String} id - the concatenated such as layerId$markerId
     * @return {null|String} the Layer id
     */
    MapView.prototype.getLayerId = function (id) {
        var split = id.split('$');
        if (isDefined(split) && split.length === 2) {
            return split[0];
        }
        return null;
    };
    /**
     * Gets the the Marker id from  a concatenated id
     * @param {String} id - the concatenated such as layerId$markerId
     * @return {null|String} the marker id
     */
    MapView.prototype.getMarkerId = function (id) {
        if (!isDefined(id)) {
            return null;
        }
        var split = id.split('$');
        if (isDefined(split) && split.length === 2) {
            return split[1];
        }
        return null;
    };
    MapView.prototype.updateMarker = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    MapView.prototype.updatePolyline = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    MapView.prototype.updatePolygon = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    MapView.prototype.updateEllipse = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    MapView.prototype.updateCoPlanarPolygon = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    MapView.prototype.updateDrapedImage = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return MapView;
}(View));
export default MapView;
//# sourceMappingURL=MapView.js.map