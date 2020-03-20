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

import {isDefined} from './osh-Utils.js';

export default class EventMap {

    constructor() {
        this.eventMap = {};
    }

    observe(eventName, fnCallback) {
        if(!isDefined(eventName) || !isDefined(fnCallback)) {
            return;
        }
        if(!(eventName in this.eventMap)) {
            this.eventMap[eventName] = [];
        }
        this.eventMap[eventName].push(fnCallback);
    }

    fire(eventName, properties) {
        if(!isDefined(eventName)) {
            return;
        }
        if(eventName in this.eventMap) {
            let fnCallbackArr = this.eventMap[eventName];
            for(let i = 0; i < fnCallbackArr.length;i++){
                // callback the properties to the current callback
                fnCallbackArr[i](properties);
            }
        }
    }
}
