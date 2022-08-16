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

import WebSocketConnector from "./WebSocketConnector";

/**
 * Defines the WebSocketTemporalConnector to connect to a remote server by creating a WebSocket channel.
 * @extends DataConnector
 * @example
 * import WebSocketConnector from 'osh-js/dataconnector/WebSocketTemporalConnector.js';
 *
 * let url = ...;
 * let connector = new WebSocketTemporalConnector(url);
 *
 * // connect
 * connector.connect();
 *
 * // disconnect
 * connector.disconnect();
 *
 * // close
 * connector.close();
 *
 */


class WebSocketTemporalConnector extends WebSocketConnector {

    /**
     * Disconnects and close the websocket.
     */
    async disconnect() {
       // super.disconnect();
       this.init = false;
       this.closed = true;
       if (this.ws != null && this.ws.readyState !== WebSocket.CLOSED) {
           this.ws.close();
       }
    }
}

export default WebSocketTemporalConnector;
