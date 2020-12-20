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
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import {AmbientLight, LightingEffect, PointLight} from "@deck.gl/core";
import {Deck, MapView as MapViewDeck} from '@deck.gl/core';
import {isDefined, randomUUID} from "../../../../source/osh/utils/Utils";
/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the Deck.gl Map object.
 * @extends MapView
 */
class DeckGlViewHexagon extends DeckGlView {
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
        this.hexagonLayers = [];
    }

    setData(dataSourceId, values) {
        const colorRange = [
            [1, 152, 189],
            [73, 227, 206],
            [216, 254, 181],
            [254, 237, 177],
            [254, 173, 84],
            [209, 55, 78]
        ];

        const material = {
            ambient: 0.64,
            diffuse: 0.6,
            shininess: 32,
            specularColor: [51, 51, 51]
        };

        const layer = new HexagonLayer({
            id: randomUUID(),
            data: values,
            extruded: true,
            getPosition: d => [d.data.longitude, d.data.latitude],
            colorRange,
            pickable: true,
            elevationRange: [100, 5000],
            elevationScale:  1000 ,
            radius: 10000,
            upperPercentile:100,
            coverage:1,
            onClick: this.onClick,
            material,
            transitions: {
                elevationScale: 3000
            }
        });
        this.hexagonLayers.push(layer);
        this.render({});
        this.onRender(values);
    }

    onClick(event) {}

    onRender(data) {}

    render(extraProps) {
        const props = {
            layers: [...this.deckLayers,...this.hexagonLayers]
        };
        this.deckgl.setProps({
            ...extraProps,
            ...props
        });
    }
}

export default DeckGlViewHexagon;
