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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { assertArray, assertDefined, assertFunction, hasValue, isDefined, isFunction, randomUUID } from "../../utils/Utils.js";
/**
 * This class is in charge of defining a Layer object.
 */
var Layer = /** @class */ (function () {
    /**
     *
     * @param {Object} properties - contains a list of properties
     * @param {string} properties.name - default name
     * @param {string} properties.description - default description
     * @param {string} properties.dataSourceId - default dataSourceId
     */
    function Layer(properties) {
        this.properties = properties;
        this.dataSourcesToFn = undefined;
        this.data = [];
        this.props = {};
        this.props.id = "layer-" + randomUUID();
        this.props.name = '';
        this.props.description = '';
        this.props.dataSourceId = '';
        if (isDefined(properties.name)) {
            this.props.name = properties.name;
        }
        if (isDefined(properties.description)) {
            this.props.description = properties.description;
        }
        if (isDefined(properties.dataSourceId)) {
            this.props.dataSourceId = properties.dataSourceId;
        }
        this.initEvents();
    }
    Layer.prototype.saveState = function () {
        this.initialState = __assign({}, this.props);
    };
    Layer.prototype.restoreState = function () {
        this.props = __assign({}, this.initialState);
    };
    Layer.prototype.getFunc = function (funcName) {
        return this.properties[funcName].handler || this.properties[funcName];
    };
    /**
     * @private
     * @param funcName
     * @return {*}
     */
    Layer.prototype.checkFn = function (funcName) {
        var func = this.properties[funcName];
        if (isFunction(func)) {
            assertDefined(this.properties.dataSourceId, 'dataSourceId');
            return true;
        }
        else {
            var isSet = hasValue(func);
            if (isSet) {
                assertArray(func.dataSourceIds, funcName + ".dataSourceIds");
                assertFunction(func.handler, funcName + ".handler");
            }
            return isSet;
        }
    };
    /**
     * @private
     */
    Layer.prototype.initEvents = function () {
    };
    /**
     * Clear the layer.
     */
    Layer.prototype.clear = function () {
    };
    /**
     * Gets the layer id.
     * @return {String} the layer id
     */
    Layer.prototype.getId = function () {
        return this.id;
    };
    /**
     * Selects the datasource contained into the list
     * @param {Array} dataSourceIds the list of datasources
     */
    Layer.prototype.select = function (dataSourceIds) {
    };
    /**
     * Adds a function associated to a list of dataSource ids
     * @param {String[]} dataSourceIds - the list of datasources
     * @param {Function} fn - the function to add
     */
    Layer.prototype.addFn = function (dataSourceIds, fn) {
        if (!isDefined(this.dataSourcesToFn)) {
            this.dataSourcesToFn = {};
        }
        for (var i = 0; i < dataSourceIds.length; i++) {
            var dataSourceId = dataSourceIds[i];
            if (!isDefined(this.dataSourcesToFn[dataSourceId])) {
                this.dataSourcesToFn[dataSourceId] = [];
            }
            this.dataSourcesToFn[dataSourceId].push(fn);
        }
    };
    /**
     *
     * @param dataSourceId
     * @param {Object[]} records
     * @param options
     */
    Layer.prototype.setData = function (dataSourceId, records, options) {
        // store data into data props
        this.data = [];
        if (dataSourceId in this.dataSourcesToFn) {
            var fnArr = this.dataSourcesToFn[dataSourceId];
            for (var j = 0; j < records.length; j++) {
                for (var i = 0; i < fnArr.length; i++) {
                    fnArr[i](records[j].data, records[j].timeStamp, options);
                }
                this.data.push(__assign({}, this.props));
            }
        }
    };
    /**
     *
     * @return {String[]} The list of dataSource ids
     */
    Layer.prototype.getDataSourcesIds = function () {
        if (isDefined(this.dataSourcesToFn)) {
            var res = [];
            for (var i in this.dataSourcesToFn) {
                res.push(i);
            }
            return res;
        }
        else {
            assertDefined(this.properties.dataSourceId, 'dataSourceId must be defined');
            return [this.properties.dataSourceId];
        }
    };
    Layer.prototype.getDataSourcesIdsByProperty = function (name) {
        return this.properties[name].dataSourceIds || [this.properties.dataSourceId];
    };
    /**
     * Inits the layer.
     */
    Layer.prototype.init = function () {
    };
    /**
     * Clone current layer properties
     * @return {Object} a shallow copy of current properties
     */
    Layer.prototype.getProps = function () {
        return {
            type: this.type,
            values: this.data
        };
    };
    /**
     * Reset to default Layer values
     */
    Layer.prototype.reset = function () {
        this.restoreState();
    };
    return Layer;
}());
export default Layer;
//# sourceMappingURL=Layer.js.map