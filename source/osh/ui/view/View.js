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
 * @param {Object} parentElementDivId - The parent html element div id to attach/or create the view.
 * @param {String} viewItems - The list of view items
 * @param {String} options - The options
 */
import {isDefined, randomUUID} from '../../utils/Utils.js';
import EventManager from '../../events/EventManager.js';
import '../../resources/css/view.css';
import {DATASOURCE_DATA_TOPIC} from "../../Constants.js";
import {Status} from "../../dataconnector/Status.js";
import {EventType} from "../../event/EventType.js";

class View {
    /**
     * Create a View.
     * @param {String} parentElementDivId - The div element to attach to
     * @param {Object[]}  [viewItems=[]] - The initial view items to add
     * @param {String} [viewItems.name] - The name of the view item
     * @param {Layer} viewItems.layer - The layer object representing the view item
     * @param {Object} [options={}] - the properties of the view
     * @param {String} [options.dataSourceId] - The dataSource id of the dataSource providing data to the view
     * @param {Entity} [options.entity] - The entity to which the view belongs to
     */
    constructor(parentElementDivId, viewItems, options) {
        // list of layers
        this.layers = [];
        this.viewItems = [];
        this.names = {};
        this.lastRec = {};
        this.selectedDataSources = [];
        this.dataSources = [];
        this.entity = null;

        //this.divId = divId;
        this.id = "view-" + randomUUID();

        this.entity = null;
        this.dataSourceId = -1;
        // sets dataSourceId
        if (isDefined(options) && isDefined(options.dataSourceId)) {
            this.dataSourceId = options.dataSourceId;
        }

        if (isDefined(options) && isDefined(options.entity)) {
            this.entity = options.entity;
        }
        this.css = "";

        this.cssSelected = "";

        if (isDefined(options) && isDefined(options.css)) {
            this.css = options.css;
        }

        if (isDefined(options) && isDefined(options.cssSelected)) {
            this.cssSelected = options.cssSelected;
        }

        // inits the view before adding the viewItem
        this.init(parentElementDivId, viewItems, options);
    }

    /**
     * Inits the view component.
     * @param parentElementDivId The parent html element object to attach/create the view
     * @param viewItems the list of items to add
     * @param options [TODO]
     * @memberof View
     */
    init(parentElementDivId, viewItems, options) {
        this.elementDiv = document.createElement("div");
        this.elementDiv.setAttribute("id", this.id);
        this.elementDiv.setAttribute("class", this.css+" osh-view");
        this.divId = this.id;

        let div = document.getElementById(parentElementDivId);

        if (!isDefined(div) || div === null) {
            document.body.appendChild(this.elementDiv);
            this.hide();
            this.container = document.body;
        } else {
            div.appendChild(this.elementDiv);
            this.container = div;
        }

        this.beforeAddingItems(options);

        if (isDefined(viewItems)) {
            for (let i = 0; i < viewItems.length; i++) {
                this.addViewItem(viewItems[i]);
            }
        }

        if (isDefined(options)) {
            if (isDefined(options.show)) {
                document.getElementById(this.divId).style.display = (options.show) ? "block" : "none";
            }
        }
        this.handleEvents();

        var that = this;
        // observes the event associated to the dataSourceId
        this.registerCallback();

        let observer = new MutationObserver((mutations) => {
            mutations.forEach(function (mutation) {
                // Was it the style attribute that changed? (Maybe a classname or other attribute change could do this too? You might want to remove the attribute condition) Is display set to 'none'?
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

    registerCallback() {
        if (isDefined(this.dataSourceId) || isDefined(this.entity)) {
            const that = this;
            function registerDs(dataSourceId) {
                const broadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + dataSourceId);
                broadcastChannel.onmessage = (event) => {
                    if (event.data.message && event.data.message === 'reset') {
                        that.reset(); // on data stream reset
                    } else {
                        if(event.data.type === EventType.DATA) {
                            that.setData(dataSourceId, event.data.values);
                        } else if(event.data.type === EventType.STATUS && event.data.status === Status.DISCONNECTED)  {
                                that.reset();
                        }
                    }
                };
            }
            if(this.entity !== null) {
                for(let dataSource of this.entity.getDataSources()) {
                    registerDs(dataSource.id);
                }
            } else {
                registerDs(this.dataSourceId);
            }
        }
    }

    /**
     * @private
     */
    unregisterCallback() {
        EventManager.removeById(this.divId);
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
        this.unregisterCallback();
    }
    /**
     * Adds a viewItem to the view. A broadcastChannel is going to listen the new dataSources
     * and EventManager.EVENT.SELECT_VIEW are then observed using the
     * dataSource(s) contained into the layer.
     * @param {Object} viewItem - The initial view items to add
     * @param {String} viewItem.name - The name of the view item
     * @param {Layer} viewItem.layer - The layer object representing the view item
     */
    addViewItem(viewItem) {
        this.viewItems.push(viewItem);
        if (viewItem.hasOwnProperty("layer")) {
            let layer = viewItem.layer;
            this.layers.push(layer);
            if (viewItem.hasOwnProperty("name")) {
                this.names[layer.markerId] = viewItem.name;
            }
            layer.viewItem = viewItem;
            layer.init(this);
            //for(let dataSourceId in layer.dataSourceToLayerMap) {
            let ds = layer.getDataSourcesIds();
            for (let i = 0; i < ds.length; i++) {
                const dataSourceId = ds[i];
                // observes the data come in
                let self = this;
                const broadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC+dataSourceId);
                broadcastChannel.onmessage = (event) => {
                    // skip data reset events for now
                    if (event.data.type === EventType.STATUS && event.data.status === Status.DISCONNECTED) {
                        return;
                    }
                    //TODO: maybe done into the layer?
                    if(event.data.type === EventType.DATA) {
                        layer.setData(dataSourceId, event.data, self);
                        self.lastRec[dataSourceId] = event.data;
                    }
                };
            }
        }
    }

    /**
     * Removes a view item from the view.
     * @param {Object} viewItem - The initial view items to add
     * @param {String} viewItem.name - The name of the view item
     * @param {Layer} viewItem.layer - The layer object representing the view item
     */
    removeViewItem(viewItem) {
        if(this.viewItems.includes(viewItem)) {
            // 1) remove from STYLER fn
            for(let ds in viewItem.layer.dataSourceToLayerMap) {
                delete this.lastRec[ds];
            }
            this.viewItems = this.viewItems.filter(currentViewItem => currentViewItem !== viewItem);
        }
        this.layers = this.layers.filter(currentLayer => currentLayer.id !== viewItem.layer.id);
        delete this.names[viewItem.layer.markerId];
    }

    /**
     * Removes all view item from the view.
     */
    removeViewItems() {
        for(const viewItem of this.viewItems) {
            this.removeViewItem(viewItem);
        }
    }

    /**
     * @private
     */
    handleEvents() {
        var that = this;
        // observes the selected event
        EventManager.observe(EventManager.EVENT.SELECT_VIEW, (event) =>
            that.selectDataView(event.dataSourcesIds, event.entityId),this.divId);

        // observes the SHOW event
        EventManager.observe(EventManager.EVENT.SHOW_VIEW, (event) => that.show(event),this.divId);
        //
        EventManager.observe(EventManager.EVENT.ADD_VIEW_ITEM, (event) => {
            if (isDefined(event.viewId) && event.viewId === that.id) {
                that.addViewItem(event.viewItem);
            }
        },this.divId);

        EventManager.observe(EventManager.EVENT.RESIZE + "-" + this.divId, (event) =>
            that.onResize(),this.divId);
    }

    /**
     * Selects the view by setting the current selected entity and dataSource.
     * @param  {String} dataSourcesIds - The dataSource id
     * @param {String} entityId - The entity id
     */
    selectDataView(dataSourcesIds, entityId) {
        if (isDefined(this.dataSources)) {
            this.selectedDataSources = dataSourcesIds;
            // set the selected entity even if it is undefined
            // this is handled by the setData function
            this.selectedEntity = entityId;
            for (let j = 0; j < this.dataSources.length; j++) {
                this.setData(this.dataSources[j], this.lastRec[this.dataSources[j]]);
            }
        }
    }

    /**
     * Gets the list of the dataSource ids contained into the view.
     * @return {String[]} The list of dataSource ids
     */
    getDataSourcesId() {
        let res = [];
        if (this.dataSourceId !== -1) {
            res.push(this.dataSourceId);
        }

        // check for layers
        for (let i = 0; i < this.viewItems.length; i++) {
            let viewItem = this.viewItems[i];
            if (viewItem.hasOwnProperty("layer")) {
                let layer = viewItem.layer;
                res = res.concat(layer.getDataSourcesIds());
            }
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
