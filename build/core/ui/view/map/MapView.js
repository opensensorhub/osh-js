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
        return _this;
    }
    MapView.prototype.setData = function (dataSourceId, data) {
        var values = data.values;
        for (var i = 0; i < values.length; i++) {
            var d = values[i];
            if (data.type === 'marker') {
                this.updateMarker(d);
            }
            else if (data.type === 'polyline') {
                this.updatePolyline(d);
            }
            else if (data.type === 'draping') {
                this.updateDrapedImage(d);
            }
        }
    };
    /**
     * Associate a markerId to a Layer for a fast lookup
     * @protected
     * @param {PointMarkerLayer.props} layer - the Layer object
     * @param {Object} markerObject - the Map marker object
     */
    MapView.prototype.addMarkerToLayer = function (props, markerObject) {
        var currentLayer = this.getLayer(props);
        // associate the list of markers owning by a specific marker
        if (!(props.id in this.layerIdToMarkers)) {
            this.layerIdToMarkers[props.id] = {};
        }
        this.layerIdToMarkers[props.id][props.markerId] = markerObject;
    };
    /**
     * Associate a polylineId to a Layer for a fast lookup
     * @protected
     * @param {Polyline.props} layer - the Layer object
     * @param {Object} polylineObject - the Map polyline object
     */
    MapView.prototype.addPolylineToLayer = function (props, polylineObject) {
        // associate the list of markers owning by a specific marker
        if (!(props.id in this.layerIdToPolylines)) {
            this.layerIdToPolylines[props.id] = {};
        }
        this.layerIdToPolylines[props.id][props.polylineId] = polylineObject;
    };
    /**
     * Get the markerId associate to the Layer
     * @protected
     * @param {PointMarkerLayer.props} props - the Layer Object
     */
    MapView.prototype.getMarker = function (props) {
        if (!(props.id in this.layerIdToMarkers)) {
            return null;
        }
        return this.layerIdToMarkers[props.id][props.markerId];
    };
    /**
     * Get all markers contained in this view
     * @protected
     */
    MapView.prototype.getMarkers = function () {
        var array = [];
        for (var id in this.layerIdToMarkers) {
            for (var markerId in this.layerIdToMarkers[id]) {
                array.push(this.layerIdToMarkers[id][markerId]);
            }
        }
        return array;
    };
    /**
     * Get all marker contained in this view
     * @protected
     */
    MapView.prototype.getPolylines = function () {
        var array = [];
        for (var id in this.layerIdToPolylines) {
            for (var polylineId in this.layerIdToPolylines[id]) {
                array.push(this.layerIdToPolylines[id][polylineId]);
            }
        }
        return array;
    };
    /**
     * Get the markerId associate to the Layer
     * @protected
     * @param {Polyline.props} layer - the Layer Object
     */
    MapView.prototype.getPolyline = function (props) {
        if (!(props.id in this.layerIdToPolylines)) {
            return null;
        }
        return this.layerIdToPolylines[props.id][props.polylineId];
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
        _super.prototype.removeAllFromLayer.call(this, layer);
        // check for marker
        this.removeMarkers(layer);
        // check for polylines
        this.removePolylines(layer);
    };
    /**
     * Remove the markers corresponding to a PointMarker Layer
     * @param {PointMarkerLayer} layer - the layer to remove the markers from
     */
    MapView.prototype.removeMarkers = function (layer) {
        if (isDefined(layer.props.markerId)) {
            var markersMap = this.layerIdToMarkers[layer.props.id];
            if (isDefined(markersMap)) {
                for (var markerId in markersMap) {
                    var marker = markersMap[markerId];
                    this.removeMarkerFromLayer(marker);
                }
            }
            // remove markers ids from Layer map
            delete this.layerIdToMarkers[layer.props.id];
        }
    };
    /**
     * Remove the polylines corresponding to a PolylineLayer Layer
     * @param {Polyline} polyline - the layer to remove the polylines from
     */
    MapView.prototype.removePolylines = function (polyline) {
        if (isDefined(polyline.props.polylineId)) {
            var polylinesMap = this.layerIdToPolylines[polyline.props.id];
            if (isDefined(polylinesMap)) {
                for (var polylineId in polylinesMap) {
                    var polyline_1 = polylinesMap[polylineId];
                    this.removePolylineFromLayer(polyline_1);
                }
            }
            // remove polylines ids from Layer map
            delete this.layerIdToPolylines[polyline.props.id];
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
    return MapView;
}(View));
export default MapView;
//# sourceMappingURL=MapView.js.map