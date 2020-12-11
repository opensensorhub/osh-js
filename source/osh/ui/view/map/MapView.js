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
     * @param {PointMarker} layer - the Layer object
     * @param {Object} markerObject - the Map marker object
     */
    addMarkerToLayer(layer, markerObject) {
        // associate the list of markers owning by a specific marker
        if(!(layer.getId() in this.layerIdToMarkers)) {
            this.layerIdToMarkers[layer.getId()] = {};
        }
        this.layerIdToMarkers[layer.getId()][layer.markerId] = markerObject;
    }

    /**
     * Associate a polylineId to a Layer for a fast lookup
     * @param {Polyline} layer - the Layer object
     * @param {Object} polylineObject - the Map polyline object
     */
    addPolylineToLayer(layer, polylineObject) {
        // associate the list of markers owning by a specific marker
        if(!(layer.getId() in this.layerIdToPolylines)) {
            this.layerIdToPolylines[layer.getId()] = {};
        }
        this.layerIdToPolylines[layer.getId()][layer.polylineId] = polylineObject;
    }

    /**
     * Get the markerId associate to the Layer
     * @param {PointMarker} layer - the Layer Object
     */
    getMarker(layer) {
        if(!(layer.getId() in  this.layerIdToMarkers)) {
            return null;
        }
        return this.layerIdToMarkers[layer.getId()][layer.markerId];
    }

    /**
     * Get the markerId associate to the Layer
     * @param {Polyline} layer - the Layer Object
     */
    getPolyline(layer) {
        if(!(layer.getId() in  this.layerIdToPolylines)) {
            return null;
        }
        return this.layerIdToPolylines[layer.getId()][layer.polylineId];
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
     * @param {PointMarker} pointMarker - the layer to remove the markers from
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
     * @param {Object} marker - The Map marker object
     */
    removeMarkerFromLayer(marker) {}

    /**
     * Abstract method to remove a polyline from its corresponding layer.
     * This is library dependant.
     * @param {Object} polyline - The Map polyline object
     */
    removePolylineFromLayer(polyline) {}
}

export default MapView;
