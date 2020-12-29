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

import {assertArray, assertFunction, hasValue, isDefined, randomUUID} from "../../utils/Utils.js";
import EventManager from "../../events/EventManager.js";

/**
 * This class is in charge of defining a Layer object.
 */
class Layer {
    /**
     *
     * @param {Object} properties - contains a list of properties
     * @param {string} properties.name - default name
     * @param {string} properties.description - default description
     * @param {string} properties.dataSourceId - default dataSourceId
     */
    constructor(properties) {
        this.properties = properties;
        this.id = "layer-" + randomUUID();
        this.dataSourceToLayerMap = {};
        this.data = [];

        this.props = {};
        this.props.name = '';
        this.props.description = '';
        this.props.dataSourceId = '';


        if(isDefined(properties.name)) {
            this.props.name = properties.name;
        }
        if(isDefined(properties.description)) {
            this.props.description = properties.description;
        }

        if(isDefined(properties.dataSourceId)) {
            this.props.dataSourceId = properties.dataSourceId;
        }

        this.initEvents();
    }

    /**
     * @private
     * @param funcName
     * @return {*}
     */
    checkFn(funcName) {
        let func = this.properties[funcName];
        let isSet = hasValue(func);
        if (isSet) {
            assertArray(func.dataSourceIds, funcName + ".dataSourceIds");
            assertFunction(func.handler, funcName + ".handler");
        }
        return isSet;
    }

    /**
     * @private
     */
    initEvents() {
        var that = this;
        EventManager.observe(EventManager.EVENT.DATASOURCE_UPDATE_TIME, (event) => that.clear());
    }

    /**
     * Clear the layer.
     */
    clear() {
    }

    /**
     * Gets the layer id.
     * @return {String} the layer id
     */
    getId() {
        return this.id;
    }

    /**
     * Selects the datasource contained into the list
     * @param {Array} dataSourceIds the list of datasources
     */
    select(dataSourceIds) {
    }

    /**
     * Adds a function associated to a list of dataSource ids
     * @param {String[]} dataSourceIds - the list of datasources
     * @param {Function} fn - the function to add
     */
    addFn(dataSourceIds, fn) {
        for (let i = 0; i < dataSourceIds.length; i++) {
            let dataSourceId = dataSourceIds[i];
            if (!isDefined(this.dataSourceToLayerMap[dataSourceId])) {
                this.dataSourceToLayerMap[dataSourceId] = [];
            }
            this.dataSourceToLayerMap[dataSourceId].push(fn);
        }
    }

    /**
     *
     * @param dataSourceId
     * @param {Object[]} records
     * @param options
     */
    setData(dataSourceId, records, options) {
        // store data into data props
        this.data = [];
        if (dataSourceId in this.dataSourceToLayerMap) {
            let fnArr = this.dataSourceToLayerMap[dataSourceId];
            for(let j=0;j < records.length;j++) {
                for (let i = 0; i < fnArr.length; i++) {
                    fnArr[i](records[j].data, records[j].timeStamp, options);
                }
                this.data.push({
                    ...this.props
                });
            }
        }
    }

    /**
     *
     * @return {String[]} The list of dataSource ids
     */
    getDataSourcesIds() {
        let res = [];
        for (let i in this.dataSourceToLayerMap) {
            res.push(i);
        }
        if(isDefined(this.props.dataSourceId)) {
            res.push(this.props.dataSourceId);
        }
        return res;
    }

    /**
     * Inits the layer.
     */
    init() {
    }

    /**
     * Clone current layer properties
     * @return {Object} a shallow copy of current properties
     */
    getProps() {
        return {
            type: this.type,
            values: this.data
        }
    }
}

export default Layer;
