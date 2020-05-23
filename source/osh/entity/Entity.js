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


import {randomUUID} from "../utils/Utils.js";

/**
 * The Entity class is in charge to group multiple logic sensors together within a same object.
 *
 */
class Entity {
    constructor(name= 'entity_' , dataSources = []) {
        /** @private @const {!String} */
        this.name_ = name;
        /** @private @const {!String} */
        this.id_ = name + '_'+ randomUUID();
        /** @private @const {!Array} */
        this.dataSources_ = dataSources;
    }

    /**
     * Gets the name of the entity
     * @return {string}
     */
    getName() {
        return this.name_;
    }

    /**
     * Gets the id of the entity
     * @return {string}
     */
    getId() {
        return this.id_;
    }

    /**
     * Gets the list of dataSources
     * @return {Array}
     */
    getDataSources() {
        return this.dataSources_;
    }
}
export default Entity;
