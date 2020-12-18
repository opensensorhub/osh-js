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

import MapView from "./MapView";
import {Deck, MapView as MapViewDeck} from '@deck.gl/core';
import mapboxgl from 'mapbox-gl';
import {ScatterplotLayer, TextLayer, IconLayer} from '@deck.gl/layers';
import {isDefined, randomUUID} from "../../../utils/Utils";


/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the Deck.gl Map object.
 * @extends MapView
 */
class DeckGlView extends MapView {
    /**
     * Create a View.
     * @param {String} parentElementDivId - The div element to attach to
     * @param {Object[]} viewItems - The initial view items to add
     * @param {String} viewItems.name - The name of the view item
     * @param {Layer} viewItems.layer - The layer object representing the view item
     * @param {Object} [options] - the properties of the view
     * @param {Boolean} [options.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     *
     */
    constructor(parentElementDivId, viewItems, options) {
        super(parentElementDivId, viewItems, options);

        let cssClass = document.getElementById(this.divId).className;
        document.getElementById(this.divId).setAttribute("class", cssClass+" "+this.css);

        this.layers = {};
    }

    beforeAddingItems(options) {
        // inits the map
        this.initMap(options);
    }

    //---------- MAP SETUP --------------//
    /**
     *
     * @private
     */
    initMap(options) {
        this.autoZoomOnFirstMarker = false;

        if (isDefined(options)) {
            // checks autoZoom
            if (isDefined(options.autoZoomOnFirstMarker)) {
                this.autoZoomOnFirstMarker = options.autoZoomOnFirstMarker;
            }
        }
        const mapElt = document.createElement('div');
        mapElt.setAttribute('id', randomUUID());
        mapElt.setAttribute('style','width:100%;height:100%;position:absolute;');

        const canvasElt = document.createElement('canvas');
        canvasElt.setAttribute('id', randomUUID());
        canvasElt.setAttribute('style','width:100%;height:100%;position:absolute;');

        const containerElt = document.createElement('div');
        containerElt.setAttribute('id', randomUUID());
        containerElt.setAttribute('style','width:100%;height:100%;position:fixed;');

        containerElt.appendChild(mapElt);
        containerElt.appendChild(canvasElt);

        let domNode = document.getElementById(this.divId);
        domNode.appendChild(containerElt);

        const INITIAL_VIEW_STATE = {
            longitude: 0,
            latitude: 0,
            zoom: 1,
            bearing: 0,
            pitch: 0
        };

        const BASEMAP = {
            VOYAGER: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
            POSITRON: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
            DARK_MATTER: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        };

        this.map = new mapboxgl.Map({
            container: mapElt.id,
            style: BASEMAP.VOYAGER,
            // Note: deck.gl will be in charge of interaction and event handling
            interactive: false,
            center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
            zoom: INITIAL_VIEW_STATE.zoom,
            bearing: INITIAL_VIEW_STATE.bearing,
            pitch: INITIAL_VIEW_STATE.pitch
        });
        this.deckgl = new Deck({
            canvas: canvasElt.id,
            width: '100%',
            height: '100%',
            initialViewState: INITIAL_VIEW_STATE,
            controller: true,
            onViewStateChange: ({viewState}) => {
                this.map.flyTo({
                    center: [viewState.longitude, viewState.latitude],
                    zoom: viewState.zoom,
                    bearing: viewState.bearing,
                    pitch: viewState.pitch
                });
            },
            getTooltip: d => d.object &&  d.object.tooltip,
            layers: [
            ]
        });
    }

    /**
     * Updates the marker associated to the layer.
     * @param {PointMarker} layer - The layer allowing the update of the marker
     */
    updateMarker(layer) {
        const id = layer.id+'$'+layer.markerId;

        this.layers[id] = new IconLayer({
            id: id,
            data: [{
                position: [layer.location.x, layer.location.y],
                icon: {
                    url: layer.icon,
                    height: layer.iconSize[1],
                    width:  layer.iconSize[0],
                    anchorX: layer.iconAnchor[0],
                    anchorY: layer.iconAnchor[1],
                },
                tooltip: layer.label
            }],
            pickable: true,
            getIcon: d => d.icon,
            getPosition: d => d.position,
            sizeMinPixels: Math.min(layer.iconSize[0], layer.iconSize[1])
        });

        if(this.autoZoomOnFirstMarker) {
            this.deckgl.setProps({
                layers: Object.keys(this.layers).map((key) => [Number(key), this.layers[key]]),
                viewState:

            });
        } else {
            this.deckgl.setProps({layers: Object.keys(this.layers).map((key) => [Number(key), this.layers[key]])});
        }
    }
}

export default DeckGlView;
