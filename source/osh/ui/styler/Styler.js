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
 * This class is in charge of defining a Styler object.
 */
class Styler {
    /**
     *
     * @param {Object[]} jsonProperties - contains a list of Functions
     */
    constructor(jsonProperties) {
        this.properties = jsonProperties;
        this.id = "styler-" + randomUUID();
        this.dataSourceToStylerMap = {};
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
     * Clear the styler.
     */
    clear() {
    }

    /**
     * Gets the styler id.
     * @return {String} the styler id
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
     * @return {Boolean}
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
     * @return {String[]} The list of dataSource ids
     */
    getDataSourcesIds() {
        let res = [];
        for (let i in this.dataSourceToStylerMap) {
            res.push(i);
        }
        return res;
    }

    /**
     * Inits the styler.
     */
    init() {
    }
}

export default Styler;
