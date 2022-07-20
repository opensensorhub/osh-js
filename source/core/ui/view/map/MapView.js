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
    constructor(properties) {
        super(properties);

        // map Layer id to array of corresponding markers
        this.layerIdToMarkers = {};

        // map Layer id to array of corresponding polylines
        this.layerIdToPolylines= {};

        // map Layer id to array of corresponding polylines
        this.layerIdToEllipsoids= {};

        // map Layer id to array of corresponding polygons
        this.layerIdToPolygon= {};

        // map Layer id to array of corresponding frustums
        this.layerIdToFrustum= {};

        // map Layer id to array of corresponding draping
        this.layerIdToDrapedImage= {};
    }

    async setData(dataSourceId, data) {
        const values = data.values;
        for(let i=0;i < values.length;i++) {
            const d = values[i];
            if(data.type === 'marker') {
                return this.updateMarker(d);
            } else if(data.type === 'polyline') {
                return this.updatePolyline(d);
            } else if(data.type === 'drapedImage') {
                return this.updateDrapedImage(d);
            } else if(data.type === 'ellipse') {
                return this.updateEllipse(d);
            } else if (data.type === 'polygon') {
                return this.updatePolygon(d);
            } else if (data.type === 'coplanarPolygon') {
                return this.updateCoPlanarPolygon(d);
            } else if(data.type === 'frustum') {
                return this.updateFrustum(d);
            }
        }
    }

    async addPolygonToLayer(props, polygon) {
        const currentLayer = this.getLayer(props);
        // associate the list of markers owning by a specific marker
        if(!(props.id in this.layerIdToPolygon)) {
            this.layerIdToPolygon[props.id] = {};
        }
        this.layerIdToPolygon[props.id][props.polygonId] = polygon;
    }

    /**
     * Associate a markerId to a Layer for a fast lookup
     * @protected
     * @param {PointMarkerLayer.props} layer - the Layer object
     * @param {Object} markerObject - the Map marker object
     */
    async addMarkerToLayer(props, markerObject) {
        const currentLayer = this.getLayer(props);
        // associate the list of markers owning by a specific marker
        if(!(props.id in this.layerIdToMarkers)) {
            this.layerIdToMarkers[props.id] = {};
        }
        this.layerIdToMarkers[props.id][props.markerId] = markerObject;
    }

    /**
     * Associate a polylineId to a Layer for a fast lookup
     * @protected
     * @param {Polyline.props} layer - the Layer object
     * @param {Object} polylineObject - the Map polyline object
     */
    async addPolylineToLayer(props, polylineObject) {
        // associate the list of markers owning by a specific marker
        if(!(props.id in this.layerIdToPolylines)) {
            this.layerIdToPolylines[props.id] = {};
        }
        this.layerIdToPolylines[props.id][props.polylineId] = polylineObject;
    }

    /**
     * Associate a ellipseId to a Layer for a fast lookup
     * @protected
     * @param {Ellipse.props} layer - the Layer object
     * @param {Object} ellipseObject - the Map ellipse object
     */
    async addEllipseToLayer(props, ellipseObject) {
        // associate the list of markers owning by a specific marker
        if(!(props.id in this.layerIdToEllipsoids)) {
            this.layerIdToEllipsoids[props.id] = {};
        }
        this.layerIdToEllipsoids[props.id][props.ellipseId] = ellipseObject;
    }

    /**
     * Associate a drapedImageId to a Layer for a fast lookup
     * @protected
     * @param {ImageDraping.props} layer - the Layer object
     * @param {Object} drapedImageObject - the Map drapedImage object
     */
    async addDrapedImageToLayer(props, drapedImageObject) {
        // associate the list of markers owning by a specific marker
        if(!(props.id in this.layerIdToDrapedImage)) {
            this.layerIdToDrapedImage[props.id] = {};
        }
        this.layerIdToDrapedImage[props.id][props.drapedImageId] = drapedImageObject;
    }

    async addFrustumToLayer(props, frustum) {
        const currentLayer = this.getLayer(props);
        // associate the list of markers owning by a specific marker
        if(!(props.id in this.layerIdToFrustum)) {
            this.layerIdToFrustum[props.id] = {};
        }
        this.layerIdToFrustum[props.id][props.frustumId] = frustum;
    }

    getPolygons() {
        const array = [];
        for(let id in this.layerIdToPolygon) {
            for(let polygonId in this.layerIdToPolygon[id]) {
                array.push(this.layerIdToPolygon[id][polygonId]);
            }
        }
        return array;
    }

    getPolygon(props) {
        if(!(props.id in  this.layerIdToPolygon)) {
            return null;
        }
        return this.layerIdToPolygon[props.id][props.polygonId];
    }

    /**
     * Get the markerId associate to the Layer
     * @protected
     * @param {PointMarkerLayer.props} props - the Layer Object
     */
    getMarker(props) {
        if(!(props.id in  this.layerIdToMarkers)) {
            return null;
        }
        return this.layerIdToMarkers[props.id][props.markerId];
    }

    /**
     * Get all markers contained in this view
     * @protected
     */
    getMarkers() {
        const array = [];
        for(let id in this.layerIdToMarkers) {
            for(let markerId in this.layerIdToMarkers[id]) {
                array.push(this.layerIdToMarkers[id][markerId]);
            }
        }
        return array;
    }

    /**
     * Get all polylines contained in this view
     * @protected
     */
    getPolylines() {
        const array = [];
        for(let id in this.layerIdToPolylines) {
            for(let polylineId in this.layerIdToPolylines[id]) {
                array.push(this.layerIdToPolylines[id][polylineId]);
            }
        }
        return array;
    }

    /**
     * Get all ellpsoids contained in this view
     * @protected
     */
    getEllipsoids() {
        const array = [];
        for(let id in this.layerIdToEllipsoids) {
            for(let ellipseId in this.layerIdToEllipsoids[id]) {
                array.push(this.layerIdToEllipsoids[id][ellipseId]);
            }
        }
        return array;
    }

    /**
     * Get the ellipse associate to the Layer
     * @protected
     * @param {Ellipse.props} layer - the Layer Object
     */
    getPolyline(props) {
        if(!(props.id in  this.layerIdToEllipsoids)) {
            return null;
        }
        return this.layerIdToEllipsoids[props.id][props.ellipseId];
    }

    /**
     * Get the ellipse associate to the Layer
     * @protected
     * @param {Ellipse.props} layer - the Layer Object
     */
    getEllipse(props) {
        if(!(props.id in  this.layerIdToEllipsoids)) {
            return null;
        }
        return this.layerIdToEllipsoids[props.id][props.ellipseId];
    }

    /**
     * Get the polyline associate to the Layer
     * @protected
     * @param {Polyline.props} layer - the Layer Object
     */
    getPolyline(props) {
        if(!(props.id in  this.layerIdToPolylines)) {
            return null;
        }
        return this.layerIdToPolylines[props.id][props.polylineId];
    }

    /**
     * Get the draped image associate to the Layer
     * @protected
     * @param {ImageDrapingLayer.props} layer - the Layer Object
     */
    getDrapedImage(props) {
        if(!(props.id in  this.layerIdToDrapedImage)) {
            return null;
        }
        return this.layerIdToDrapedImage[props.id][props.drapedImageId];
    }

    getFrustums() {
        const array = [];
        for(let id in this.layerIdToFrustum) {
            for(let frustumId in this.layerIdToFrustum[id]) {
                array.push(this.layerIdToFrustum[id][frustumId]);
            }
        }
        return array;
    }

    getFrustum(props) {
        if(!(props.id in  this.layerIdToFrustum)) {
            return null;
        }
        return this.layerIdToFrustum[props.id][props.frustumId];
    }

    /**
     * Get the Layer associated to its id
     * @param {String} layerId - the id of the Layer
     * @return {Layer} - the corresponding layer, null otherwise
     */
    getLayer(layerId) {
        // find corresponding layer
        for (let currentLayer of this.layers) {
            if (currentLayer.props.id === layerId) {
                return currentLayer;
            }
        }
        return null;
    }

    /**
     * Remove Corresponding Layer
     * @param {Layer} layer - The layer object
     */
    removeAllFromLayer(layer) {
        super.removeAllFromLayer(layer);
        // check for marker
        this.removeMarkers(layer);

        // check for polylines
        this.removePolylines(layer);

        this.removeEllipsoids(layer);

        this.removePolygons(layer);

        this.removeFrustums(layer);
    }

    removePolygons(layer) {
        if(isDefined(layer.props.polygonId)) {
            const polygonMap = this.layerIdToPolygon[layer.props.id];
            if(isDefined(polygonMap)) {
                for(let polygonId in polygonMap) {
                    const polygon = polygonMap[polygonId];
                    this.removePolygonFromLayer(polygon);
                }
            }

            // remove markers ids from Layer map
            delete this.layerIdToPolygon[layer.props.id];
        }
    }

    /**
     * Remove the markers corresponding to a PointMarker Layer
     * @param {PointMarkerLayer} layer - the layer to remove the markers from
     */
    removeMarkers(layer) {
        if(isDefined(layer.props.markerId)) {
            const markersMap = this.layerIdToMarkers[layer.props.id];
            if(isDefined(markersMap)) {
                for(let markerId in markersMap) {
                    const marker = markersMap[markerId];
                    this.removeMarkerFromLayer(marker);
                }
            }

            // remove markers ids from Layer map
            delete this.layerIdToMarkers[layer.props.id];
        }
    }

    /**
     * Remove the ellipsoids corresponding to a EllipseLayer Layer
     * @param {Ellipse} ellipse - the layer to remove the ellipsoids from
     */
    removeEllipsoids(ellipse) {
        if(isDefined(ellipse.props.ellipseId)) {
            const ellipseMap = this.layerIdToEllipsoids[ellipse.props.id];
            if(isDefined(ellipseMap)) {
                for(let ellipseId in ellipseMap) {
                    const ellipse = ellipseMap[ellipseId];
                    this.removeEllipseFromLayer(ellipse);
                }
            }

            // remove polylines ids from Layer map
            delete this.layerIdToEllipsoids[ellipse.props.id];
        }
    }

    /**
     * Remove the polylines corresponding to a PolylineLayer Layer
     * @param {Polyline} polyline - the layer to remove the polylines from
     */
    removePolylines(polyline) {
        if(isDefined(polyline.props.polylineId)) {
            const polylinesMap = this.layerIdToPolylines[polyline.props.id];
            if(isDefined(polylinesMap)) {
                for(let polylineId in polylinesMap) {
                    const polyline = polylinesMap[polylineId];
                    this.removePolylineFromLayer(polyline);
                }
            }

            // remove polylines ids from Layer map
            delete this.layerIdToPolylines[polyline.props.id];
        }
    }

    /**
     * Remove the drapedImage corresponding to a ImageDraping Layer
     * @param {ImageDraping} imageDraping - the layer to remove the drapedImage from
     */
    removeDrapedImages(drapedImage) {
        if(isDefined(drapedImage.props.drapedImageId)) {
            const drapedImageMap = this.layerIdToDrapedImage[drapedImage.props.id];
            if(isDefined(drapedImageMap)) {
                for(let drapedImageId in drapedImageMap) {
                    const drapedImage = drapedImageMap[drapedImageId];
                    this.removeDrapedImageFromLayer(drapedImage);
                }
            }

            // remove drapedImage ids from Layer map
            delete this.layerIdToDrapedImage[drapedImage.props.id];
        }
    }

    /**
     * Remove the frustums corresponding to a Frustum Layer
     * @param {FrustumLayer} polyline - the layer to remove the Frustum from
     */
    removeFrustums(layer) {
        if(isDefined(layer.props.frustumId)) {
            const frustumMap = this.layerIdToFrustum[layer.props.id];
            if(isDefined(frustumMap)) {
                for(let frustumId in frustumMap) {
                    const frustum = frustumMap[frustumId];
                    this.removeFrustumFromLayer(frustum);
                }
            }

            // remove markers ids from Layer map
            delete this.layerIdToFrustum[layer.props.id];
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
     * Abstract method to remove a draped image from its corresponding layer.
     * This is library dependant.
     * @protected
     * @param {Object} drapedImage - The Map drapedImage object
     */
    removeDrapedImageFromLayer(drapedImage) {}

    /**
     * Abstract method to remove a polygon from its corresponding layer.
     * This is library dependant.
     * @protected
     * @param {Object} polygon - The Map polygon object
     */
    removePolygonFromLayer(marker) {}

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

    async updateMarker() {}
    async updatePolyline() {}
    async updatePolygon() {}
    async updateEllipse() {}
    async updateCoPlanarPolygon() {}
    async updateDrapedImage() {}

}

export default MapView;
