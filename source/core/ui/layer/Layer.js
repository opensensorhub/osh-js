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

import {
    assertArray,
    assertDefined,
    assertFunction,
    hasValue,
    isDefined,
    isFunction,
    randomUUID,
    capitalizeFirstLetter
} from "../../utils/Utils.js";

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
     * @param {boolean} properties.visible - defines if the layer is visible
     * @param {Number} properties.timestamp - defines the timestamp of the data
     * @param {Function} properties.getTimestamp - function which defines the timestamp of the data
     * @param {Function} properties.onLeftClick - trigger onLeftClick marker event
     * @param {Function} properties.onRightClick - trigger onRightClick marker event
     * @param {Function} properties.onHover - trigger onHover marker event
     */
    constructor(properties) {
        this.properties = properties;
        this.init(properties);
    }

    /**
     * Inits the layer.
     */
    init(properties=this.properties) {
        this.data = [];
        this.propsById = {};
        this.dataSourcesToFn = undefined;

        this.props = {
            id: "layer-" + randomUUID(),
            filter: true,
            name: '',
            description: '',
            visible: true,
            timestamp: true
        }
        this.dataSourceIds = undefined;

        if(isDefined(properties.name)) {
            this.props.name = properties.name;
        }
        if(isDefined(properties.description)) {
            this.props.description = properties.description;
        }

        if(isDefined(properties.dataSourceId)) {
            this.dataSourceIds = [properties.dataSourceId];
        }

        if(isDefined(properties.dataSourceIds)) {
            this.dataSourceIds = properties.dataSourceIds;
        }

        if(!this.dataSourceIds) {
            this.dataSourceIds = [];
        }
        // assertDefined(this.dataSourceIds, '[Layer] dataSourceIds[] or dataSourceId');

        if(isDefined(properties.visible)) {
            this.props.visible = properties.visible;
        }

        if (isDefined(properties.timestamp)){
            this.props.timestamp = properties.timestamp;
        }

        if (isDefined(properties.onLeftClick) && assertFunction(properties.onLeftClick)) {
            this.props.onLeftClick = properties.onLeftClick;
        }

        if (isDefined(properties.onRightClick) && assertFunction(properties.onRightClick)) {
            this.props.onRightClick = properties.onRightClick;
        }

        if (isDefined(properties.onHover) && assertFunction(properties.onHover)) {
            this.props.onHover = properties.onHover;
        }

        this.initEvents();

        if (this.checkFn("filter")) {
            let fn = (rec,timestamp,options) => {
                this.props.filter = this.getFunc('filter')(rec,timestamp,options);
            };
            this.addFn(this.getDataSourcesIdsByProperty('filter'),fn);
        } else {
            this.properties.filter = function(rec,timestamp,options) {
                return true;
            };

            let fn = async (rec, timestamp, options) => {
                this.props.filter = await this.getFunc('filter')(rec, timestamp, options);
            };

            this.addFn(this.getDataSourcesIdsByProperty('filter'),fn);
        }

        if (this.checkFn("getVisible")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('visible',await this.getFunc('getVisible')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getVisible'),fn);
        }

        if (this.checkFn("getTimestamp")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('timestamp',await this.getFunc('getTimestamp')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getTimestamp'), fn);
        }

        if (this.checkFn("getName")) {
            let fn = async (rec,timestamp,options) => {
                this.updateProperty('name',await this.getFunc('getName')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getName'),fn);
        }

        if (this.checkFn("getDescription")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('description',await this.getFunc('getDescription')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getDescription'), fn);
        }
    }

    getFunc(funcName) {
        return this.properties[funcName].handler || this.properties[funcName];
    }

    /**
     * @private
     * @param funcName
     * @return {*}
     */
    checkFn(funcName) {
        let func = this.properties[funcName];
        if(isFunction(func)) {
            assertDefined(this.dataSourceIds, 'dataSourceIds');
            return true;
        } else {
            let isSet = hasValue(func);
            if (isSet) {
                assertArray(func.dataSourceIds, funcName + ".dataSourceIds");
                assertFunction(func.handler, funcName + ".handler");
            }
            return isSet;
        }
    }

    /**
     * @private
     */
    initEvents() {
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
        return this.props.id;
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
     * @param {Boolean} [first=false] - set at the first position
     */
    addFn(dataSourceIds, fn, first = false) {
        if (!isDefined(this.dataSourcesToFn)) {
            this.dataSourcesToFn = {};
        }
        for (let i = 0; i < dataSourceIds.length; i++) {
            let dataSourceId = dataSourceIds[i];
            if (!isDefined(this.dataSourcesToFn[dataSourceId])) {
                this.dataSourcesToFn[dataSourceId] = [];
            }
            if(first) {
                this.dataSourcesToFn[dataSourceId].unshift(fn);
            } else {
                this.dataSourcesToFn[dataSourceId].push(fn);
            }
        }
    }

    /**
     *
     * @param dataSourceId
     * @param {Object[]} records
     * @param options
     */
    async setData(dataSourceId, records, options={}) {
        // store data into data props
        this.data = [];
        options.dataSourceId = dataSourceId;
        if (isDefined(this.dataSourcesToFn)) {
            if (dataSourceId in this.dataSourcesToFn) {
                let fnArr = this.dataSourcesToFn[dataSourceId];
                this.props.filter = true;
                for (let j = 0; j < records.length; j++) {
                    for (let i = 0; i < fnArr.length; i++) {
                        await fnArr[i](records[j].data, records[j].data.timestamp, options);
                        if (!this.props.filter) {
                            break;
                        }
                    }
                    if(this.props.filter) {
                        this.data.push({
                            ...this.props,
                            ...this.propsById[this.getId()]
                        });
                    }
                }
            }
        }
    }

    /**
     *
     * @return {String[]} The list of dataSource ids
     */
    getDataSourcesIds() {
        if(isDefined(this.dataSourcesToFn)) {
            let res = [];
            for (let i in this.dataSourcesToFn) {
                res.push(i);
            }
            return res;
        } else {
            assertDefined(this.dataSourceIds, 'dataSourceId must be defined');
            return this.dataSourceIds;
        }
    }

    getDataSourcesIdsByProperty(name) {
        return this.properties[name].dataSourceIds || this.dataSourceIds;
    }

    /**
     * Clone current layer properties
     * @return {Object} a shallow copy of current properties
     */
    getProps() {
        return {
            type: this.type,
            values: this.data
        };
    }

    /**
     * Reset to default Layer values
     */
    reset() {
        this.init(this.properties);
    }

    updateProperty(propertyName, value) {
        this.propsById[this.getId()][propertyName] = value;
    }

    checkExistingProps(id) {
        return (id in this.propsById);
    }
    setProps(id, props) {
        this.propsById[id] = props;
    }

    setId(id, defaultProps) {
        this.props.id = id;
        if(!this.checkExistingProps(id)) {
            this.setProps(id, defaultProps());
        }
    }

    definedId(idName, props) {
        if (this.checkFn(`get${capitalizeFirstLetter(idName)}`)) {
            let fn = async (rec, timestamp, options) => {
                const id = await this.getFunc(`get${capitalizeFirstLetter(idName)}`)(rec, timestamp, options);
                this.setId(id, () => ({...props, [idName]: id}));
            };
            // must be first to assign correctly the first location to the right id if it is defined
            this.addFn(this.getDataSourcesIdsByProperty(`get${capitalizeFirstLetter(idName)}`), fn, true);
        } else {
            this.setId(this.getId(), () => ({...props, [idName]: this.getId()}));
        }
    }

    getCurrentProps() {
        return  this.propsById[this.getId()];
    }

    getIds() {
        return Object.keys(this.propsById);
    }
}

export default Layer;
