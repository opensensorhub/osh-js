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


import DeckGlView from "osh-js/core/ui/view/map/DeckGlView";
import {randomUUID} from "osh-js/core/utils/Utils";
import {ColumnLayer} from '@deck.gl/layers';

/**
 * This class is in charge of displaying Earthquake data using Deck.gl column layer
 * @extends DeckGlView
 */
class DeckGlViewColumn extends DeckGlView {
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
            ...properties,
            supportedLayers: ['data']
        });

        this.colorRange = [
            [255, 195, 0],
            [255, 169, 0],
            [255, 148, 0],
            [255, 139, 0],
            [255, 122, 0],
            [255, 73, 0],
            [255,44, 0],
            [205,18,0],
            [125,0,0]
        ];

        this.columnLayers = [];
        this.min = -1;
        this.max = -1;
    }

    setData(dataSourceId, data) {
        const values = data.values;
        if(values.length > 0 ) {
            const material = {
                ambient: 0.64,
                diffuse: 0.6,
                shininess: 32,
                specularColor: [51, 51, 51]
            };

            const layer = new ColumnLayer({
                id: randomUUID(),
                data: values,
                material,
                diskResolution: 20,
                radius: 10000,
                extruded: true,
                pickable: true,
                autoHighlight: true,
                highlightColor: [46, 204, 113],
                getPosition: d => [d.data.longitude, d.data.latitude],
                getFillColor: d => this.colorRange[parseInt(d.data.mag)],
                getLineColor: [0, 0, 0],
                getElevation: d => Math.exp(d.data.mag),
                coverage: 1,
                elevationScale: 1000,
                transitions: {
                    getLineColor: 10000,
                    getLineWidth: 10000,
                    getElevation: 10000
                }
            });

            this.columnLayers.push(layer);
            this.render(this.columnLayers, {});
            this.onRender(layer, values);
        }
    }

    onClick(event) {}

    /**
     * Filter the current layers based on time range
     * @param {Object} props - define properties of the filtering
     * @param {Number} props.start - start time
     * @param {Number} props.end - end time
     * @param {string[]} props.idx - list of matching deck layer id
     */
    renderFilter(props) {
        const filteredColumnLayer = [];
        for(let i=0;i < this.columnLayers.length;i++) {
           filteredColumnLayer.push(this.columnLayers[i].clone({
               visible:(props.idx.indexOf(this.columnLayers[i].id) >= 0)
           }));
        }
        this.min = props.start;
        this.max = props.start;
        this.render(filteredColumnLayer,{});

    }

    onRender(layer, data) {}

    render(columnLayers, extraProps) {
        const props = {
            layers: [...this.deckLayers,...columnLayers]
        };
        this.deckgl.setProps({
            ...extraProps,
            ...props
        });
    }
}

export default DeckGlViewColumn;
