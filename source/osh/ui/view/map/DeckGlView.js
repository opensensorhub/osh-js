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
import {IconLayer, ScatterplotLayer} from '@deck.gl/layers';
import {isDefined, randomUUID} from "../../../utils/Utils";
import {BASEMAP} from '@deck.gl/carto';
import {TileLayer} from '@deck.gl/geo-layers';


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
        const INITIAL_VIEW_STATE = {
            latitude: 37.8,
            longitude: -122.45,
            zoom: 15
        };

        const deckgl = new Deck({
            initialViewState: INITIAL_VIEW_STATE,
            controller: true,
            layers: [
                new ScatterplotLayer({
                    data: [
                        {position: [-122.45, 37.8], color: [255, 0, 0], radius: 100}
                    ],
                    getColor: d => d.color,
                    getRadius: d => d.radius
                })
            ]
        });

        this.dataChunks = [];
    }

    /**
     * Updates the marker associated to the layer.
     * @param {PointMarker} layer - The layer allowing the update of the marker
     */
    updateMarker(layer) {
        /*let marker = this.getMarker(layer);
        if (!isDefined(marker)) {
            // adds a new marker to the leaflet renderer
            // const markerObject = this.addMarker(layer);
            // this.addMarkerToLayer(layer, markerObject);
            this.dataChunks.push( {"coordinates":[28.96,13.66033],"name":"Al Zarnkh","class":"LL5","mass":"700","year":2001});

            console.log('ici')
            // this.addMarkerToLayer(layer, iconLayer);
        }
        const ICON_MAPPING = {
            marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
        };
        const DATA_URL =
            'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/icon/meteorites.json'; // eslint-disable-line

        const l = new IconLayer({
            id: 'icon-layer',
            data: DATA_URL,
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
        this.deckgl.setProps({layers: [l]});

        // get the current marker corresponding to the current markerId value of the PointMarker
        marker = this.getMarker(layer);*/
        // this.onNewDataArrive([
        //     {
        //         position: [layer.location.x, layer.location.y],
        //     }]);
    }

    onNewDataArrive(chunk) {
        this.dataChunks.push(chunk);
        this.render();
    }

    render() {

        const layers = this.dataChunks.map((chunk, chunkIndex) => new ScatterplotLayer({
            // Important: each layer must have a consistent & unique id
            id: `chunk-${chunkIndex}`,
            // If we have 10 100,000-row chunks already loaded and a new one arrive,
            // the first 10 layers will see no prop change
            // only the 11th layer's buffers need to be generated
            data: chunk,
            getPosition: d => d.position, // [longitude, latitude] tuple
            getFillColor: [255, 0, 0],
            radiusMinPixels: 10,
        }));

        this.deckgl.setProps({layers});
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
