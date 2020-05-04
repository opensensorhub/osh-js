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

import EventMap from './EventMap';

const eventMap = new EventMap();

/**
 * This class is response for handling events and acts as an event bus.
 */
class EventManager {

    /**
     * Fires an event
     * @param {String} eventName -
     * @param {Object} properties -
     */
    static fire(eventName, properties) {
        properties.name = eventName;
        eventMap.fire('osh:' + eventName, properties);
    }

    /**
     * Observes any eventName and calls the callback when the event is fired.
     * @param {String} eventName -
     * @param {Function} fnCallback -
     */
    static observe(eventName, fnCallback) {
        eventMap.observe('osh:' + eventName, fnCallback);
    }

    /**
     * Observes eventName attached to a div element  and calls the callback when the event is fired.
     * @param {String} divId -
     * @param {String} eventName -
     * @param {Function} fnCallback -
     */
    static observeDiv(divId, eventName, fnCallback) {
        let elem = document.getElementById(divId);
        // use native dom event listener
        elem.addEventListener(eventName, fnCallback);
    }

    /**
     * This part defines the events used INTO the API
     * @const
     * @type {{DATA: string, SYNC_DATA: string, SELECT_VIEW: string, CONTEXT_MENU: string, SHOW_VIEW: string, CONNECT_DATASOURCE: string, DISCONNECT_DATASOURCE: string, DATASOURCE_UPDATE_TIME: string, CURRENT_MASTER_TIME: string, UAV_TAKEOFF: string, UAV_GOTO: string, UAV_LOOKAT: string, UAV_LAND: string, UAV_ORBIT: string, LOADING_START: string, LOADING_STOP: string, ADD_VIEW_ITEM: string}}
     */
    static get EVENT() {
        return {
            DATA: "data",
            SYNC_DATA: "syncData",
            SELECT_VIEW: "selectView",
            SHOW_VIEW: "showView",
            CONNECT_DATASOURCE: "connectDataSource",
            DISCONNECT_DATASOURCE: "disconnectDataSource",
            DATASOURCE_UPDATE_TIME: "updateDataSourceTime",
            CURRENT_MASTER_TIME: "currentMasterTime",
            UAV_TAKEOFF: "uav:takeoff",
            UAV_GOTO: "uav:goto",
            UAV_LOOKAT: "uav:lookat",
            UAV_LAND: "uav:land",
            UAV_ORBIT: "uav:orbit",
            LOADING_START: "loading:start",
            LOADING_STOP: "loading:stop",
            ADD_VIEW_ITEM: "addViewItem",
            RESIZE: "resize",
            PTZ_SEND_REQUEST: "ptzSendRequest"
        };
    }
}

export default EventManager;
