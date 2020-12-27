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

import View from "../View";
import {isDefined} from "../../../utils/Utils";

/**
 * This class is an abstract class in charge of handling common Map operations.
 * @extends View
 */
class MapView extends View {
    constructor(parentElementDivId, viewItems, options) {
        super(parentElementDivId, viewItems,options);

        // map Layer id to array of corresponding markers
        this.layerIdToMarkers = {};

        // map Layer id to array of corresponding polylines
        this.layerIdToPolylines= {};

    }

    /**
     * Associate a markerId to a Layer for a fast lookup
     * @protected
     * @param {PointMarkerLayer} layer - the Layer object
     * @param {Object} markerObject - the Map marker object
     */
    addMarkerToLayer(layer, markerObject) {
        // associate the list of markers owning by a specific marker
        if(!(layer.id in this.layerIdToMarkers)) {
            this.layerIdToMarkers[layer.id] = {};
        }
        this.layerIdToMarkers[layer.id][layer.markerId] = markerObject;
    }

    /**
     * Associate a polylineId to a Layer for a fast lookup
     * @protected
     * @param {Polyline} layer - the Layer object
     * @param {Object} polylineObject - the Map polyline object
     */
    addPolylineToLayer(layer, polylineObject) {
        // associate the list of markers owning by a specific marker
        if(!(layer.id in this.layerIdToPolylines)) {
            this.layerIdToPolylines[layer.id] = {};
        }
        this.layerIdToPolylines[layer.id][layer.polylineId] = polylineObject;
    }

    /**
     * Get the markerId associate to the Layer
     * @protected
     * @param {PointMarkerLayer} layer - the Layer Object
     */
    getMarker(layer) {
        if(!(layer.id in  this.layerIdToMarkers)) {
            return null;
        }
        return this.layerIdToMarkers[layer.id][layer.markerId];
    }

    /**
     * Get all markers contained in this view
     * @protected
     */
    getMarkers() {
        const array = [];
        for(let id in this.layerIdToMarkers) {
            for(let markerId in this.layerIdToMarkers[id]) {
                array.push(this.layerIdToMarkers[id][markerId])
            }
        }
        return array;
    }

    /**
     * Get all marker contained in this view
     * @protected
     */
    getPolylines() {
        const array = [];
        for(let id in this.layerIdToPolylines) {
            for(let polylineId in this.layerIdToPolylines[id]) {
                array.push(this.layerIdToPolylines[id][polylineId])
            }
        }
        return array;
    }

    /**
     * Get the markerId associate to the Layer
     * @protected
     * @param {Polyline} layer - the Layer Object
     */
    getPolyline(layer) {
        if(!(layer.id in  this.layerIdToPolylines)) {
            return null;
        }
        return this.layerIdToPolylines[layer.id][layer.polylineId];
    }

    /**
     * Get the Layer associated to its id
     * @param {String} layerId - the id of the Layer
     * @return {Layer} - the corresponding layer, null otherwise
     */
    getLayer(layerId) {
        // find corresponding layer
        for (let currentLayer of this.layers) {
            if (currentLayer.id === layerId) {
                return currentLayer;
            }
        }
        return null;
    }

    /**
     * Remove Corresponding ViewItem
     * @param {Object} viewItem - The viewItem object
     */
    removeViewItem(viewItem) {
        super.removeViewItem(viewItem);
        // check for marker
        this.removeMarkers(viewItem.layer);

        // check for polylines
        this.removePolylines(viewItem.layer);
    }

    /**
     * Remove the markers corresponding to a PointMarker Layer
     * @param {PointMarkerLayer} pointMarker - the layer to remove the markers from
     */
    removeMarkers(pointMarker) {
        if(isDefined(pointMarker.markerId)) {
            const markersMap = this.layerIdToMarkers[pointMarker.id];
            if(isDefined(markersMap)) {
                for(let markerId in markersMap) {
                    const marker = markersMap[markerId];
                    this.removeMarkerFromLayer(marker)
                }
            }

            // remove markers ids from Layer map
            delete this.layerIdToMarkers[pointMarker.id];
        }
    }

    /**
     * Remove the polylines corresponding to a Polyline Layer
     * @param {Polyline} polyline - the layer to remove the polylines from
     */
    removePolylines(polyline) {
        if(isDefined(polyline.polylineId)) {
            const polylinesMap = this.layerIdToPolylines[polyline.id];
            if(isDefined(polylinesMap)) {
                for(let polylineId in polylinesMap) {
                    const polyline = polylinesMap[polylineId];
                    this.removePolylineFromLayer(polyline)
                }
            }

            // remove polylines ids from Layer map
            delete this.layerIdToPolylines[polyline.id];
        }
    }

    /**
     * Abstract method to remove a marker from its corresponding layer.
     * This is library dependant.
     * @protected
     * @param {Object} marker - The Map marker object
     */
    removeMarkerFromLayer(marker) {}

    /**
     * Abstract method to remove a polyline from its corresponding layer.
     * This is library dependant.
     * @protected
     * @param {Object} polyline - The Map polyline object
     */
    removePolylineFromLayer(polyline) {}

    /**
     * Method to call onLeftClick Layer method if exists
     * @param {String} markerId - the Layer markerId
     * @param {Object} markerObject - the View marker object
     * @param {PointMarkerLayer} layer - the Layer object
     * @param {Object} event - the original Map View event
     */
    onMarkerLeftClick(markerId, markerObject, layer, event) {
        if (isDefined(layer.onLeftClick)) {
            layer.onLeftClick.call(layer,markerId, markerObject, event);
        }
    }

    /**
     * Method to call onRightClick Layer method if exists
     * @param {String} markerId - the Layer markerId
     * @param {Object} markerObject - the View marker object
     * @param {PointMarkerLayer} layer - the Layer object
     * @param {Object} event - the original Map View event
     */
    onMarkerRightClick(markerId, markerObject, layer, event) {
        if (isDefined(layer.onRightClick)) {
            layer.onRightClick.call(layer,markerId, markerObject, event);
        }
    }

    /**
     * Method to call onMove Layer method if exists
     * @param {String} markerId - the Layer markerId
     * @param {Object} markerObject - the View marker object
     * @param {PointMarkerLayer} layer - the Layer object
     * @param {Object} event - the original Map View event
     */
    onMarkerMove(markerId, markerObject, layer, event) {
        if (isDefined(layer.onMove)) {
            layer.onMove.call(layer,markerId, markerObject, event);
        }
    }

    /**
     * Method to call onHover Layer method if exists
     * @param {String} markerId - the Layer markerId
     * @param {Object} markerObject - the View marker object
     * @param {PointMarkerLayer} layer - the Layer object
     * @param {Object} event - the original Map View event
     */
    onMarkerHover(markerId, markerObject, layer, event) {
        if (isDefined(layer.onHover)) {
            layer.onHover.call(layer,markerId, markerObject, event);
        }
    }

    /**
     * Gets the the Layer id from  a concatenated id
     * @param {String} id - the concatenated such as layerId$markerId
     * @return {null|String} the Layer id
     */
    getLayerId(id) {
        const split = id.split('$');

        if(isDefined(split) && split.length === 2) {
           return  split[0];
        }
        return null;
    }

    /**
     * Gets the the Marker id from  a concatenated id
     * @param {String} id - the concatenated such as layerId$markerId
     * @return {null|String} the marker id
     */
    getMarkerId(id) {
        if(!isDefined(id)) {
            return null;
        }
        const split = id.split('$');

        if(isDefined(split) && split.length === 2) {
            return  split[1];
        }
        return null;
    }
}

export default MapView;
