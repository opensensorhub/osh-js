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
import {IconLayer} from '@deck.gl/layers';
import {hex2rgb, isDefined, randomUUID} from "../../../utils/Utils";
import {BitmapLayer, PathLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import '../../../resources/css/deck.css';

/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the Deck.gl Map object.
 * @extends MapView
 */
class DeckGlView extends MapView {
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Boolean} [properties.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     * @param {Object} [properties.deckProps={}] - the properties of the [Deck]{@link https://deck.gl/docs/api-reference/core/deck} object
     *
     */
    constructor(properties) {
        super({
            supportedLayers: ['marker', 'polyline'],
            ...properties,
        });

        let cssClass = document.getElementById(this.divId).className;
        document.getElementById(this.divId).setAttribute("class", cssClass+" "+this.css);

        this.autoZoomOnFirstMarker = false;
        if(isDefined(properties) && isDefined(properties.autoZoomOnFirstMarker)) {
            this.autoZoomOnFirstMarker = properties.autoZoomOnFirstMarker;
        }
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
        this.INITIAL_VIEW_STATE = {
            longitude: 0,
            latitude: 0,
            zoom: 2,
            bearing: 0,
            pitch: 0
        };

        const canvasElt = document.createElement('canvas');
        canvasElt.setAttribute('id', randomUUID());
        canvasElt.setAttribute('style', 'width:100%;height:100%;position:relative;');

        let domNode = document.getElementById(this.divId);
        domNode.appendChild(canvasElt);

        // https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}
        // https://c.tile.openstreetmap.org/{z}/{x}/{y}.png
        this.deckLayers = [];
        if(isDefined(options) && isDefined(options.deckProps) && isDefined(options.deckProps.layers)) {
            for(let i =0;i <options.deckProps.layers.length;i++) {
                const id = options.deckProps.layers[i].id? options.deckProps.layers[i].id : 'base_'+id;
                this.deckLayers.push(options.deckProps.layers[i]);
            }
        } else {
            this.deckLayers.push(new TileLayer({
                id: 'base',
                // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
                data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
                minZoom: 0,
                maxZoom: 19,
                tileSize: 256,

                renderSubLayers: props => {
                    const {
                        bbox: {west, south, east, north}
                    } = props.tile;

                    return new BitmapLayer(props, {
                        data: null,
                        image: props.data,
                        bounds: [west, south, east, north]
                    });
                }
            }))
        }

        let deckProps = {
            canvas: canvasElt.id,
            width: '100%',
            height: '100%',
            controller: true,
            views: [new MapViewDeck()],
            initialViewState: this.INITIAL_VIEW_STATE,
            onViewStateChange: ({viewState}) => {
            },
            layers: this.deckLayers
        };

        // overrides default conf by user defined one
        if(isDefined(options) && isDefined(deckProps)) {
            deckProps = {
                ...deckProps,
                ...options.deckProps
            };
        }

        this.INITIAL_VIEW_STATE = deckProps.initialViewState;
        this.deckgl = new Deck(deckProps);
    }

    /**
     * Updates the marker associated to the layer.
     * @param {PointMarkerLayer.props} props - The layer properties allowing the update of the marker
     */
    updateMarker(props) {
        const id = props.id+'$'+props.markerId;

        const mId = props.markerId;
        // in deck we create a new layer everytime => reactive programming
        const iconLayer = new IconLayer({
            id: id,
            data: [{
                position: [props.location.x, props.location.y, 1]
            }],
            pickable: true,
            // iconAtlas and iconMapping are required
            // getIcon: return a string
            iconAtlas: props.icon,
            iconMapping: {
                marker: {
                    x:0,
                    y:0,
                    anchorX:  props.iconAnchor[0],
                    anchorY:  props.iconAnchor[1],
                    width: props.iconSize[0],
                    height: props.iconSize[1],
                    mask: props.iconColor !== '#000000'
                }
            },
            getIcon: d => 'marker',
            sizeScale: props.iconScale,
            getPosition: d => d.position,
            getSize: d => props.iconScale,
            getColor: d =>  hex2rgb(props.iconColor),
            onHover: (info, event) => this.onMarkerHover(mId,info, props, event),
            onClick: (info, event) => event.leftButton ?  this.onMarkerLeftClick(mId,info, props, event) :
                this.onMarkerRightClick(mId,info, props, event),
            zIndex: props.zIndex
        });

        // is going to create or update the current entry into the layer map
        this.addMarkerToLayer(props, iconLayer);

        const extraProps = {};

        if(this.autoZoomOnFirstMarker) {
            this.autoZoomOnFirstMarker = false;
            // Zoom to the object
            extraProps.initialViewState = {
                ...this.INITIAL_VIEW_STATE,
                longitude: props.location.x,
                latitude: props.location.y,
                zoom: props.zoomLevel
            };
        }

        this.render(extraProps);
    }

    /**
     * Updates the marker associated to the layer.
     * @param {Polyline} layer - The layer allowing the update of the marker
     */
    updatePolyline(layer) {
        const id = layer.id+'$'+layer.polylineId;
        const path = layer.locations[layer.polylineId].map((coordinate) => {
            return [coordinate.x, coordinate.y, 1]
        });

        const PATH_DATA =[
            {
                weight: layer.weight,
                "name": layer.id,
                "color": layer.color,
                "path": path
            }
        ];

        const pathLayer = new PathLayer({
            id: id,
            data: PATH_DATA,
            widthUnits: 'pixels',
            widthMinPixels: 5,
            getPath: d => d.path,
            getColor: d => d.color,
            getWidth: d => d.weight
        });

        this.addPolylineToLayer(layer, pathLayer);

        this.render({});
    }

    /**
     * Override super method to render() at the end
     * @param {Object} marker - The Map marker object
     */
    removeMarker(marker) {
        super.removeMarkers(marker);
        this.render({});
    }

    /**
     * Override super method to render() at the end
     * @param {Object} polyline - The Map polyline object
     */
    removePolylines(polyline) {
        super.removePolylines(polyline);
        this.render({});
    }

    /**
     * Inner method to render in the order the different deck.gl layers
     * @private
     * @param {Object} extraProps - Extra deck props
     */
    render(extraProps) {
        const markers = this.getMarkers();
        const polylines = this.getPolylines();

        // draw in order base -> polylines -> markers
        markers.sort((a,b) => (a.props.zIndex > b.props.zIndex) ? 1 : ((b.props.zIndex > a.props.zIndex) ? -1 : 0))

        const props = {
            layers: [...this.deckLayers,...polylines,...markers]
        };
        this.deckgl.setProps({
            ...extraProps,
            ...props
        });
    }
}

export default DeckGlView;
