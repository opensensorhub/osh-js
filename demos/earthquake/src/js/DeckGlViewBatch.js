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


import DeckGlView from "osh/ui/view/map/DeckGlView";
import {hex2rgb, isDefined} from "osh/utils/Utils";
import {IconLayer} from "@deck.gl/layers";

/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the Deck.gl Map object.
 * @extends MapView
 */
class DeckGlViewOptimized extends DeckGlView {
    /**
     * Create a View.
     * @param {String} parentElementDivId - The div element to attach to
     * @param {Object[]} viewItems - The initial view items to add
     * @param {String} viewItems.name - The name of the view item
     * @param {Layer} viewItems.layer - The layer object representing the view item
     * @param {Object} [options] - the properties of the view
     * @param {Boolean} [options.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     * @param {Object} [options.deckProps] - the properties of the [Deck]{@link https://deck.gl/docs/api-reference/core/deck} object
     *
     */
    constructor(parentElementDivId, viewItems, options) {
        super(parentElementDivId, viewItems, options);
        this.batchId = 0;
        this.batchMarkers = [];
    }

    /**
     * Add icon layer.
     * @param {PointMarker} layer
     * @param {Object[]} values -
      */
    updateMarkers(layer, values) {

       const id = layer.id+'$'+layer.markerId+'_'+this.batchId;
       this.batchId++;

        const mId = layer.markerId;
        // in deck we create a new layer everytime => reactive programming
        const iconLayer = new IconLayer({
            id: id,
            data: values,
            pickable: true,
            // iconAtlas and iconMapping are required
            // getIcon: return a string
            iconAtlas: layer.icon,
            iconMapping: {
                marker: {
                    x:0,
                    y:0,
                    anchorX:  layer.iconAnchor[0],
                    anchorY:  layer.iconAnchor[1],
                    width: layer.iconSize[0],
                    height: layer.iconSize[1],
                    mask: layer.iconColor !== '#000000'
                }
            },
            getIcon: d => 'marker',
            sizeScale: layer.iconScale,
            getPosition: d => [d.longitude, d.latitude],
            getSize: d =>  layer.iconScale,
            getColor: d =>  hex2rgb(layer.iconColor),
            onHover: (info, event) => this.onMarkerHover(mId,info, layer, event),
            onClick: (info, event) => event.leftButton ?  this.onMarkerLeftClick(mId,info, layer, event) :
                this.onMarkerRightClick(mId,info, layer, event)
        });

        this.batchMarkers.push(iconLayer);

        const extraProps = {};

        if(this.autoZoomOnFirstMarker) {
            this.autoZoomOnFirstMarker = false;
            // Zoom to the object
            extraProps.initialViewState = {
                ...this.INITIAL_VIEW_STATE,
                longitude: layer.location.x,
                latitude: layer.location.y,
                zoom: layer.zoomLevel
            };
        }

        this.render(extraProps);
    }

    render(extraProps) {

        // draw in order base -> polylines -> markers
        const props = {
            layers: [...this.deckLayers,...this.batchMarkers]
        };
        this.deckgl.setProps({
            ...extraProps,
            ...props
        });
    }
}

export default DeckGlViewOptimized;
