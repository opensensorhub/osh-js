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
import mapboxgl from 'mapbox-gl';
import {Deck, MapView as MapViewDeck} from '@deck.gl/core';
import {IconLayer} from '@deck.gl/layers';
import {isDefined, randomUUID} from "../../../utils/Utils";
import {BASEMAP} from '@deck.gl/carto';


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
     *
     */
    constructor(parentElementDivId, viewItems, options) {
        super(parentElementDivId, viewItems, options);

        let cssClass = document.getElementById(this.divId).className;
        document.getElementById(this.divId).setAttribute("class", cssClass+" "+this.css);
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
        const mapElt = document.createElement('div');
        mapElt.setAttribute('id', randomUUID());
        mapElt.setAttribute('style','width:100%;height:100%;');
        let domNode = document.getElementById(this.divId);
        domNode.appendChild(mapElt);

        const INITIAL_VIEW_STATE = {
            latitude: 0,
            longitude: 0,
            zoom: 0,
            bearing: 0,
            pitch: 0
        };

        const MAP_STYLE = BASEMAP.VOYAGER;

        const map = new mapboxgl.Map({
            container: mapElt.id,
            style: MAP_STYLE,
            width: '100%',
            height: '100%',
            // Note: deck.gl will be in charge of interaction and event handling
            interactive: true,
            center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
            zoom: INITIAL_VIEW_STATE.zoom,
            bearing: INITIAL_VIEW_STATE.bearing,
            pitch: INITIAL_VIEW_STATE.pitch
        });
        map.on('load', function () {
            map.resize();
        });

        const canvasElt = document.createElement('canvas');
        canvasElt.setAttribute('id', randomUUID());

        domNode.appendChild(canvasElt);

        this.deckgl = new Deck({
            canvas: canvasElt.id,
            width: '100%',
            height: '100%',
            initialViewState: INITIAL_VIEW_STATE,
            controller: true,
            layers: [],
            views: [new MapViewDeck()],
        });

        this.dataChunks = [];
    }

    /**
     * Updates the marker associated to the layer.
     * @param {PointMarker} layer - The layer allowing the update of the marker
     */
    updateMarker(layer) {
        let marker = this.getMarker(layer);
        if (!isDefined(marker)) {
            // adds a new marker to the leaflet renderer
            // const markerObject = this.addMarker(layer);
            // this.addMarkerToLayer(layer, markerObject);
            const ICON_MAPPING = {
                marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
            };
            this.dataChunks.push( {"coordinates":[28.96,13.66033],"name":"Al Zarnkh","class":"LL5","mass":"700","year":2001});

            const layers = this.dataChunks.map((chunk, chunkIndex) => new IconLayer({
                id: layer.markerId,
                data: chunk,
                pickable: true,
                // iconAtlas and iconMapping are required
                // getIcon: return a string
                iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
                iconMapping: ICON_MAPPING,
                getIcon: d => 'marker',
                sizeScale: 15,
                getPosition: d => console.log(d),
                getSize: d => 5,
                getColor: d => [Math.sqrt(d.exits), 140, 0]
            }));

            console.log('ici')
            // this.addMarkerToLayer(layer, iconLayer);
            this.deckgl.setProps({layers});
        }

        // get the current marker corresponding to the current markerId value of the PointMarker
        marker = this.getMarker(layer);
    }

    /**
     * Add a marker to the map.
     * @param {Layer}  layer - The Layer object
     * @return {Object} the new icon layer
     */
    addMarker(layer) {
        const ICON_MAPPING = {
            marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
        };

        return new IconLayer({
            id: 'icon-layer',
            data:[],
            pickable: true,
            // iconAtlas and iconMapping are required
            // getIcon: return a string
            iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
            iconMapping: ICON_MAPPING,
            getIcon: d => 'marker',

            sizeScale: 15,
            getPosition: d => d.coordinates,
            getSize: d => 5,
            getColor: d => [Math.sqrt(d.exits), 140, 0]
        });
    }
}

export default DeckGlView;
