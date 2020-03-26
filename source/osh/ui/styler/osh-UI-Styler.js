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

import {randomUUID} from "../../osh-Utils.js";
import {assertArray, assertFunction, hasValue, isDefined} from "../../osh-Utils.js";
import EventManager from "../../osh-EventManager.js";

/**
 * @classdesc
 * @class Styler
 * @abstract
 */
export default class Styler {
    constructor(jsonProperties) {
        this.properties = jsonProperties;
        this.id = "styler-" + randomUUID();
        this.dataSourceToStylerMap = {};
        this.initEvents();
    }

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
     * @memberof Styler
     * @instance
     */
    initEvents() {
        var that = this;
        EventManager.observe(EventManager.EVENT.DATASOURCE_UPDATE_TIME, (event) => that.clear());
    }

    /**
     * @memberof Styler
     * @instance
     */
    clear() {
    }

    /**
     * Gets the styler id.
     * @returns {string} the styler id
     * @memberof Styler
     * @instance
     */
    getId() {
        return this.id;
    }

    /**
     * Selects the datasource contained into the list
     * @param {Array} dataSourceIds the list of datasources
     * @memberof Styler
     * @instance
     */
    select(dataSourceIds) {
    }

    /**
     * Adds a function
     * @param {Array} dataSourceIds the list of datasources
     * @param {function} fn the function to apply
     * @memberof Styler
     * @instance
     */
    addFn(dataSourceIds, fn) {
        for (let i = 0; i < dataSourceIds.length; i++) {
            let dataSourceId = dataSourceIds[i];
            if (!isDefined(this.dataSourceToStylerMap[dataSourceId])) {
                this.dataSourceToStylerMap[dataSourceId] = [];
            }
            this.dataSourceToStylerMap[dataSourceId].push(fn);
        }
    }

    /**
     *
     * @param dataSourceId
     * @param rec
     * @param view
     * @param options
     * @returns {boolean}
     * @memberof Styler
     * @instance
     */
    setData(dataSourceId, rec, view, options) {
        if (dataSourceId in this.dataSourceToStylerMap) {
            let fnArr = this.dataSourceToStylerMap[dataSourceId];
            for (let i = 0; i < fnArr.length; i++) {
                fnArr[i](rec.data, rec.timeStamp, options);
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     *
     * @returns {Array}
     * @memberof Styler
     * @instance
     */
    getDataSourcesIds() {
        let res = [];
        for (let i in this.dataSourceToStylerMap) {
            res.push(i);
        }
        return res;
    }

    /**
     * @memberof Styler
     * @instance
     */
    init() {
    }
}
