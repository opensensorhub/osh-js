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

/**
 * The abstract object to represent a view.
 */
import {
    assertArray,
    assertBoolean,
    assertDefined,
    assertString,
    assertTrue,
    isDefined,
    randomUUID
} from '../../utils/Utils.js';
import '../../resources/css/view.css';
import {DATASOURCE_DATA_TOPIC} from "../../Constants.js";
import {Status} from "../../protocol/Status.js";
import {EventType} from "../../event/EventType.js";
import DataLayer from "../layer/DataLayer";

class View {
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {string} properties.container - The div element to attach to
     * @param {string} properties.css - The css classes to set, can be multiple if separate by spaces
     * @param {string[]} properties.supportedLayers - List the supported layers of this View. It is corresponding to the the 'type' Layer property
     * @param {boolean} properties.visible - set the default behavior of the visibility of the view
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     */
    constructor(properties) {
        // list of layers
        this.layers = [];
        this.lastRec = {};
        this.dataSources = [];

        //this.divId = divId;
        this.id = "view-" + randomUUID();

        this.css = "";
        if (isDefined(properties) && isDefined(properties.css)) {
            this.css = properties.css;
        }

        assertDefined(properties && properties.supportedLayers, 'supportedLayers');
        assertArray(properties.supportedLayers, 'supportedLayers');
        assertTrue(properties.supportedLayers.length > 0, 'supportedLayers.length === 0');

        this.supportedLayers = properties.supportedLayers;

        // inits the view before adding the viewItem
        this.init(properties);
    }

    /**
     * Inits the view component.
     * @private
     */
    init(properties) {

        this.properties = properties;
        this.elementDiv = document.createElement("div");
        this.elementDiv.setAttribute("id", this.id);
        this.elementDiv.setAttribute("class", this.css+" osh-view");
        this.divId = this.id;

        let parentDivId = (isDefined(properties.container)? properties.container : document.body);

        let div = document.getElementById(parentDivId);

        if (!isDefined(div) || div === null) {
            document.body.appendChild(this.elementDiv);
            this.hide();
            this.container = document.body;
        } else {
            div.appendChild(this.elementDiv);
            this.container = div;
        }

        this.beforeAddingItems(properties);

        if(isDefined(properties)) {
            if (isDefined(properties.layers)) {
                for (let i = 0; i < properties.layers.length; i++) {
                    this.addLayer(properties.layers[i]);
                }
            }

            if(isDefined(properties.dataSourceId)) {
                this.addLayer(new DataLayer({
                    dataSourceId: properties.dataSourceId
                }));
            }

            if (isDefined(properties.visible)) {
                document.getElementById(this.divId).style.display = (properties.visible) ? "block" : "none";
            }

        }
        const that = this;
        // observes the event associated to the dataSourceId

        let observer = new MutationObserver((mutations) => {
            mutations.forEach(function (mutation) {
                // Was it the style attribute that changed? (Maybe a classname or other attribute change could do this too?
                // You might want to remove the attribute condition) Is display set to 'none'?
                if (mutation.attributeName === 'style') {
                    that.onResize();
                }
            });
        });
        // Attach the mutation observer to blocker, and only when attribute values change
        observer.observe(this.elementDiv, {attributes: true});

        const rootObserver = new MutationObserver(function(mutations) {
            // try to get the div element by the id to check if it is still owned by the document object
            if(!isDefined(document.getElementById(that.divId))){
                this.disconnect();
                that.destroy();
            }
        });
        rootObserver.observe(document.body, {
            childList: true,
        });
    }

    /**
     * Hide the view
     */
    hide() {
        this.elementDiv.style.display = "none";
    }

    /**
     * Callback called when the view is resized
     * @event
     */
    onResize() {
    }

    /**
     * Attach the view to a specific div. If the view has already been attached to a div, it will be removed
     * from its current parent and will be attached to new one.
     * Note: the onResize() is called at the end of the process.
     * @param {String} divId - The div element to attach to
     */
    attachTo(divId) {
        if (isDefined(this.elementDiv.parentNode)) {
            // detach from its parent
            this.elementDiv.parentNode.removeChild(this.elementDiv);
        }
        document.getElementById(divId).appendChild(this.elementDiv);
        if (this.elementDiv.style.display === "none") {
            this.elementDiv.style.display = "block";
        }

        this.onResize();
    }

    /**
     * This method is called before attaching any view items passed as arguments in the constructor of the view.
     * @event
     * @param {Object} options - A generic object to use
     */
    beforeAddingItems(options) {

    }

    /**
     * Gets the inner id of the view object.
     * @return {String} The id of the view
     */
    getId() {
        return this.id;
    }

    /**
     * Gets the div id of the DOM element.
     * @return {String} The div id of the view
     */
    getDivId() {
        return this.divId;
    }

    /**
     * Set the data to the view. Each view has to handle the kind of the data separately.
     * @param {String} dataSourceId - The dataSource id of the source providing the data
     * @param {any[]} data - The data array to set
     */
    setData(dataSourceId, data) {
    }

    /**
     * Show the view.
     * @param  {Object} properties - A generic object
     */
    show(properties) {
    }

    destroy()  {
    }
    /**
     * Adds a layer to the view. A broadcastChannel is going to listen the new dataSources
     * @param {Layer} layer - The layer object
     */
    addLayer(layer) {
        assertTrue(this.supportedLayers.includes(layer.type), 'this layer is not supported: '+layer.type+', should be '+this.supportedLayers);
        this.layers.push(layer);

        let ds = layer.getDataSourcesIds();
        for (let i = 0; i < ds.length; i++) {
            const dataSourceId = ds[i];
           // this.setData(dataSourceId, [layer.getProps()]);
            // observes the data come in
            let self = this;
            const broadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC+dataSourceId);
            broadcastChannel.onmessage = (event) => {
                // skip data reset events for now
                if (event.data.type === EventType.STATUS && event.data.status === Status.DISCONNECTED) {
                    self.reset(); // on data stream disconnection
                    return;
                }
                if(event.data.type === EventType.DATA) {

                    // transform the data
                    layer.setData(dataSourceId, event.data.values);

                    // set the transformed data to the view
                    this.setData(dataSourceId, layer.getProps());

                    // store as last record
                    self.lastRec[dataSourceId] = event.data;
                }
            };
        }
    }

    /**
     * Removes a Layer from the view.
     * @param {Layer} layer - The layer object
     */
    removeAllFromLayer(layer) {
        if(this.layers.includes(layer)) {
            // 1) remove from STYLER fn
            for(let ds in layer.dataSourcesToFn) {
                delete this.lastRec[ds];
            }
            layer.reset();
        }
    }

    /**
     * Removes all view item from the view.
     */
    removeAllFromLayers() {
        for(let layer of this.layers) {
            this.removeAllFromLayer(layer);
        }
    }

    /**
     * Gets the list of the dataSource ids contained into the view.
     * @return {String[]} The list of dataSource ids
     */
    getDataSourcesId() {
        let res = [];

        // check for layers
        for (let i = 0; i < this.layers.length; i++) {
            let layer = this.layers[i];
            res = res.concat(layer.getDataSourcesIds());
        }

        return res;
    }

    /**
     * Calls for resetting the view.
     */
    reset() {
    }
}

export default View;
