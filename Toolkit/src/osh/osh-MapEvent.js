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

OSH.MapEvent = BaseClass.extend({

    initialize:function() {
        this.mapEvents = {};
    },

    observe:function(eventName, fnCallback) {
        if(typeof(eventName) == "undefined" || typeof(fnCallback) == "undefined") {
            return;
        }
        if(!(eventName in this.mapEvents)) {
            this.mapEvents[eventName] = [];
        }
        this.mapEvents[eventName].push(fnCallback);
    },

    fire: function(eventName, properties) {
        if(typeof(eventName) == "undefined") {
            return;
        }
        if(eventName in this.mapEvents) {
            var fnCallbackArr = this.mapEvents[eventName];
            for(var i = 0; i < fnCallbackArr.length;i++){
                // callback the properties to the current callback
                fnCallbackArr[i](properties);
            }
        }
    }
});