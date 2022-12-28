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
                this.updateMarker(d);
            } else if(data.type === 'polyline') {
                this.updatePolyline(d);
            } else if(data.type === 'drapedImage') {
                this.updateDrapedImage(d);
            } else if(data.type === 'ellipse') {
                this.updateEllipse(d);
            } else if (data.type === 'polygon') {
                this.updatePolygon(d);
            } else if (data.type === 'coplanarPolygon') {
                this.updateCoPlanarPolygon(d);
            } else if(data.type === 'frustum') {
                this.updateFrustum(d);
            }
        }
    }

    async addPolygonToLayer(props, polygon) {
        this.layerIdToPolygon[props.polygonId] = polygon;
    }

    /**
     * Associate a markerId to a Layer for a fast lookup
     * @protected
     * @param {PointMarkerLayer.props} layer - the Layer object
     * @param {Object} markerObject - the Map marker object
     */
    async addMarkerToLayer(props, markerObject) {
        this.layerIdToMarkers[props.markerId] = markerObject;
    }

    /**
     * Associate a polylineId to a Layer for a fast lookup
     * @protected
     * @param {Polyline.props} layer - the Layer object
     * @param {Object} polylineObject - the Map polyline object
     */
    async addPolylineToLayer(props, polylineObject) {
        this.layerIdToPolylines[props.polylineId] = polylineObject;
    }

    /**
     * Associate a ellipseId to a Layer for a fast lookup
     * @protected
     * @param {Ellipse.props} layer - the Layer object
     * @param {Object} ellipseObject - the Map ellipse object
     */
    async addEllipseToLayer(props, ellipseObject) {
        this.layerIdToEllipsoids[props.ellipseId] = ellipseObject;
    }

    /**
     * Associate a drapedImageId to a Layer for a fast lookup
     * @protected
     * @param {ImageDraping.props} layer - the Layer object
     * @param {Object} drapedImageObject - the Map drapedImage object
     */
    async addDrapedImageToLayer(props, drapedImageObject) {
        this.layerIdToDrapedImage[props.drapedImageId] = drapedImageObject;
    }

    async addFrustumToLayer(props, frustum) {
        this.layerIdToFrustum[props.frustumId] = frustum;
    }

    getPolygons() {
        const array = [];
        for(let id in this.layerIdToPolygon) {
            array.push(this.layerIdToPolygon[id]);
        }
        return array;
    }

    getPolygon(props) {
        if(!(props.polygonId in  this.layerIdToPolygon)) {
            return null;
        }
        return this.layerIdToPolygon[props.polygonId];
    }

    /**
     * Get the markerId associate to the Layer
     * @protected
     * @param {PointMarkerLayer.props} props - the Layer Object
     */
    getMarker(props) {
        if(!(props.markerId in  this.layerIdToMarkers)) {
            return null;
        }
        return this.layerIdToMarkers[props.markerId];
    }

    /**
     * Get all markers contained in this view
     * @protected
     */
    getMarkers() {
        const array = [];
        for(let id in this.layerIdToMarkers) {
            array.push(this.layerIdToMarkers[id]);
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
            array.push(this.layerIdToPolylines[id]);
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
            array.push(this.layerIdToEllipsoids[id]);
        }
        return array;
    }

    /**
     * Get the ellipse associate to the Layer
     * @protected
     * @param {Ellipse.props} layer - the Layer Object
     */
    getPolyline(props) {
        if(!(props.polylineId in  this.layerIdToEllipsoids)) {
            return null;
        }
        return this.layerIdToPolylines[props.polylineId];
    }

    /**
     * Get the ellipse associate to the Layer
     * @protected
     * @param {Ellipse.props} layer - the Layer Object
     */
    getEllipse(props) {
        if(!(props.ellipseId in  this.layerIdToEllipsoids)) {
            return null;
        }
        return this.layerIdToEllipsoids[props.ellipseId];
    }

    /**
     * Get the polyline associate to the Layer
     * @protected
     * @param {Polyline.props} layer - the Layer Object
     */
    getPolyline(props) {
        if(!(props.polylineId in  this.layerIdToPolylines)) {
            return null;
        }
        return this.layerIdToPolylines[props.polylineId];
    }

    /**
     * Get the draped image associate to the Layer
     * @protected
     * @param {ImageDrapingLayer.props} layer - the Layer Object
     */
    getDrapedImage(props) {
        if(!(props.drapedImageId in  this.layerIdToDrapedImage)) {
            return null;
        }
        return this.layerIdToDrapedImage[props.drapedImageId];
    }

    getFrustums() {
        const array = [];
        for(let id in this.layerIdToFrustum) {
            array.push(this.layerIdToFrustum[id]);
        }
        return array;
    }

    getFrustum(props) {
        if(!(props.frustumId in  this.layerIdToFrustum)) {
            return null;
        }
        return this.layerIdToFrustum[props.frustumId];
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
        // check for marker
        this.removeMarkers(layer);

        // check for polylines
        this.removePolylines(layer);

        this.removeEllipsoids(layer);

        this.removePolygons(layer);

        this.removeDrapedImages(layer);

        this.removeFrustums(layer);

        super.removeAllFromLayer(layer);

    }

    removePolygons(layer) {
        const ids = layer.getIds() || [];
        for(let id of ids) {
            const polygon = this.layerIdToPolygon[id];
            if (isDefined(polygon)) {
                this.removePolygonFromLayer(polygon);
            }

            // remove markers ids from Layer map
            delete this.layerIdToPolygon[id];
        }
    }

    /**
     * Remove the markers corresponding to a PointMarker Layer
     * @param {PointMarkerLayer} layer - the layer to remove the markers from
     */
    removeMarkers(layer) {
        const ids = layer.getIds() || [];
        for(let id of ids) {
            const marker = this.layerIdToMarkers[id];
            if (isDefined(marker)) {
                this.removeMarkerFromLayer(marker);
            }

            // remove markers ids from Layer map
            delete this.layerIdToMarkers[id];
        }
    }

    /**
     * Remove the ellipsoids corresponding to a EllipseLayer Layer
     * @param {Ellipse} ellipse - the layer to remove the ellipsoids from
     */
    removeEllipsoids(ellipse) {
        const ids = ellipse.getIds() || [];
        for(let id of ids) {
            const ellipse = this.layerIdToEllipsoids[id];
            if(isDefined(ellipse)) {
                this.removeEllipseFromLayer(ellipse);
            }

            // remove polylines ids from Layer map
            delete this.layerIdToEllipsoids[id];
        }
    }

    /**
     * Remove the polylines corresponding to a PolylineLayer Layer
     * @param {Polyline} polyline - the layer to remove the polylines from
     */
    removePolylines(polyline) {
        const ids = polyline.getIds() || [];
        for(let id of ids) {
            const polyline = this.layerIdToPolylines[id];
            if(isDefined(polyline)) {
                this.removePolylineFromLayer(polyline);
            }

            // remove polylines ids from Layer map
            delete this.layerIdToPolylines[id];
        }
    }

    /**
     * Remove the drapedImage corresponding to a ImageDraping Layer
     * @param {ImageDraping} imageDraping - the layer to remove the drapedImage from
     */
    removeDrapedImages(drapedImage) {
        const ids = drapedImage.getIds() || [];
        for(let id of ids) {
            const drapedImage = this.layerIdToDrapedImage[id];
            if(isDefined(drapedImage)) {
                this.removeDrapedImageFromLayer(drapedImage);
            }

            // remove drapedImage ids from Layer map
            delete this.layerIdToDrapedImage[id];
        }
    }

    /**
     * Remove the frustums corresponding to a Frustum Layer
     * @param {FrustumLayer} polyline - the layer to remove the Frustum from
     */
    removeFrustums(layer) {
        const ids = layer.getIds() || [];
        for(let id of ids) {
            const frustum = this.layerIdToFrustum[id];
            if(isDefined(frustum)) {
                this.removeFrustumFromLayer(frustum);
            }

            // remove markers ids from Layer map
            delete this.layerIdToFrustum[id];
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
