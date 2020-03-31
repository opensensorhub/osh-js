/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc The abstract object to represent a view.
 * @class
 * @param {Object} parentElementDivId - The parent html element div id to attach/or create the view.
 * @param {string} viewItems - The list of view items
 * @param {string} options - The options
 * @abstract
 */
import {isDefined, randomUUID} from '../../utils/Utils.js';
import EventManager from '../../events/EventManager.js';

export class View {
    constructor(parentElementDivId, viewItems, options) {
        // list of stylers
        this.stylers = [];
        this.contextMenus = [];
        this.viewItems = [];
        this.names = {};
        this.stylerToObj = {};
        this.stylerIdToStyler = {};
        this.lastRec = {};
        this.selectedDataSources = [];
        this.dataSources = [];

        //this.divId = divId;
        this.id = "view-" + randomUUID();

        this.dataSourceId = -1;
        // sets dataSourceId
        if (isDefined(options) && isDefined(options.dataSourceId)) {
            this.dataSourceId = options.dataSourceId;
        }

        if (isDefined(options) && isDefined(options.entityId)) {
            this.entityId = options.entityId;
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
        this.elementDiv.setAttribute("class", this.css);
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
        if (isDefined(options) && isDefined(options.dataSourceId)) {
            EventManager.observe(EventManager.EVENT.DATA + "-" + options.dataSourceId, (event) => {
                if (event.reset) {
                    that.reset(); // on data stream reset
                } else {
                    that.setData(options.dataSourceId, event.data);
                }
            });
        }

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
    }

    /**
     * @instance
     * @memberof View
     */
    hide() {
        this.elementDiv.style.display = "none";
    }

    /**
     * @instance
     * @memberof View
     */
    onResize() {
    }

    /**
     *
     * @param divId
     * @instance
     * @memberof View
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
     *
     * @param options
     * @instance
     * @memberof View
     */
    beforeAddingItems(options) {

    }

    /**
     *
     * @returns {string|*}
     * @instance
     * @memberof View
     */
    getId() {
        return this.id;
    }

    /**
     *
     * @returns {string|*}
     * @instance
     * @memberof View
     */
    getDivId() {
        return this.divId;
    }

    /**
     *
     * @param dataSourceId
     * @param data
     * @instance
     * @memberof View
     */
    setData(dataSourceId, data) {
    }

    /**
     * Show the view by removing display:none style if any.
     * @param properties
     * @instance
     * @memberof View
     */
    show(properties) {
    }

    /**
     *
     * @param properties
     * @instance
     * @memberof View
     */
    shows(properties) {
    }

    /**
     * Add viewItem to the view
     * @param viewItem
     * @instance
     * @memberof View
     */
    addViewItem(viewItem) {
        this.viewItems.push(viewItem);
        if (viewItem.hasOwnProperty("styler")) {
            let styler = viewItem.styler;
            this.stylers.push(styler);
            if (viewItem.hasOwnProperty("name")) {
                this.names[styler.getId()] = viewItem.name;
            }
            styler.viewItem = viewItem;
            styler.init(this);
            this.stylerIdToStyler[styler.id] = styler;
            if (viewItem.hasOwnProperty("contextmenu")) {
                this.contextMenus.push(viewItem.contextmenu);
            }
            //for(let dataSourceId in styler.dataSourceToStylerMap) {
            let ds = styler.getDataSourcesIds();
            for (let i = 0; i < ds.length; i++) {
                let dataSourceId = ds[i];
                // observes the data come in
                let self = this;
                (function (frozenDataSourceId) { // use a close here to no share the dataSourceId letiable

                    EventManager.observe(EventManager.EVENT.DATA + "-" + frozenDataSourceId, (event) => {

                        // skip data reset events for now
                        if (event.reset) {
                            return;
                        }

                        // we check selected dataSource only when the selected entity is not set
                        let selected = false;
                        if (isDefined(self.selectedEntity)) {
                            selected = (viewItem.entityId === self.selectedEntity);
                        } else {
                            selected = (self.selectedDataSources.indexOf(frozenDataSourceId) > -1);
                        }

                        //TODO: maybe done into the styler?
                        styler.setData(frozenDataSourceId, event.data, self, {
                            selected: selected
                        });
                        self.lastRec[frozenDataSourceId] = event.data;
                    });

                    EventManager.observe(EventManager.EVENT.SELECT_VIEW, (event) => {
                        // we check selected dataSource only when the selected entity is not set
                        let selected = false;
                        if (isDefined(event.entityId)) {
                            selected = (viewItem.entityId === event.entityId);
                        } else {
                            selected = (event.dataSourcesIds.indexOf(frozenDataSourceId) > -1);
                        }

                        if (frozenDataSourceId in self.lastRec) {
                            styler.setData(frozenDataSourceId, self.lastRec[frozenDataSourceId], self, {
                                selected: selected
                            });
                        }
                    });

                })(dataSourceId); //passing the letiable to freeze, creating a new closure
            }
        }
    }

    /**
     * @instance
     * @memberof View
     */
    handleEvents() {
        var that = this;
        // observes the selected event
        EventManager.observe(EventManager.EVENT.SELECT_VIEW, (event) =>
            that.selectDataView(event.dataSourcesIds, event.entityId));

        // observes the SHOW event
        EventManager.observe(EventManager.EVENT.SHOW_VIEW, (event) => that.show(event));

        EventManager.observe(EventManager.EVENT.ADD_VIEW_ITEM, (event) => {
            if (isDefined(event.viewId) && event.viewId === that.id) {
                that.addViewItem(event.viewItem);
            }
        });

        EventManager.observe(EventManager.EVENT.RESIZE + "-" + this.divId, (event) =>
            that.onResize());
    }

    /**
     * Should be called after receiving osh:SELECT_VIEW event
     * @param $super
     * @param dataSourcesIds
     * @param entitiesIds
     * @instance
     * @memberof View
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
     *
     * @returns {Array}
     * @instance
     * @memberof View
     */
    getDataSourcesId() {
        let res = [];
        if (this.dataSourceId !== -1) {
            res.push(this.dataSourceId);
        }

        // check for stylers
        for (let i = 0; i < this.viewItems.length; i++) {
            let viewItem = this.viewItems[i];
            if (viewItem.hasOwnProperty("styler")) {
                let styler = viewItem.styler;
                res = res.concat(styler.getDataSourcesIds());
            }
        }

        return res;
    }

    /**
     * @instance
     * @memberof View
     */
    reset() {
    }
}
