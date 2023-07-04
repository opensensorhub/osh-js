var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import DataConnector from "./DataConnector";
/**
 * Defines the FileConnector to read a File content
 * @extends DataConnector
 * @example
 * import FileConnector from 'core/protocol/TopicConnector.js';
 *
 * let protocol = new TopicConnector(<topic_name>);
 *
 * // connect
 * protocol.connect();
 *
 * // disconnect
 * protocol.disconnect();
 *
 * // close
 * protocol.close();
 *
 */
var TopicConnector = /** @class */ (function (_super) {
    __extends(TopicConnector, _super);
    /**
     *
     * @param properties -
     */
    function TopicConnector(properties) {
        var _this = _super.call(this, properties) || this;
        _this.lastReceiveTime = -1;
        _this.interval = -1;
        _this.broadcastChannel = null;
        return _this;
    }
    /**
     * Connect to the broadcastChannel.
     */
    TopicConnector.prototype.connect = function () {
        var _this = this;
        if (this.broadcastChannel === null) {
            //creates broadcastChannel
            this.broadcastChannel = new BroadcastChannel(this.getUrl());
            this.broadcastChannel.onmessage = function (event) {
                _this.lastReceiveTime = Date.now();
                //callback data on message received
                _this.onMessage(event.data.data);
            };
            // closes socket if any errors occur
            this.broadcastChannel.onerror = function (event) {
                console.error('BroadcastChannel stream error: ' + event);
                _this.broadcastChannel.close();
                _this.init = false;
                _this.lastReceiveTime = -1;
                _this.opened = false;
            };
            this.opened = true;
            //init the reconnect handler
            if (this.interval === -1) {
                this.interval = setInterval(function () {
                    var delta = Date.now() - this.lastReceiveTime;
                    // -1 means the WS went in error
                    if (this.lastReceiveTime === -1 || (delta >= this.reconnectTimeout)) {
                        console.warn("trying to reconnect after ".concat(this.reconnectTimeout, " .."));
                        this.reconnect();
                    }
                }.bind(this), this.reconnectTimeout);
            }
        }
    };
    /**
     * Disconnects the websocket.
     */
    TopicConnector.prototype.disconnect = function () {
        this.fullDisconnect(true);
    };
    /**
     * Fully disconnect the websocket connection by sending a close message to the webWorker.
     * @param {Boolean} removeInterval  - force removing the interval
     */
    TopicConnector.prototype.fullDisconnect = function (removeInterval) {
        if (this.broadcastChannel != null) {
            this.broadcastChannel.close();
            this.broadcastChannel = null;
        }
        if (removeInterval) {
            clearInterval(this.interval);
        }
        this.opened = false;
    };
    /**
     * Try to reconnect if the connexion if closed
     */
    TopicConnector.prototype.reconnect = function () {
        this.onReconnect();
        if (this.init) {
            this.fullDisconnect(false);
        }
        this.connect();
    };
    /**
     * The onMessage method used by the websocket to callback the data
     * @param data the callback data
     * @event
     */
    TopicConnector.prototype.onMessage = function (data) {
    };
    /**
     * Closes the webSocket.
     */
    TopicConnector.prototype.close = function () {
        this.disconnect();
    };
    TopicConnector.prototype.isConnected = function () {
        return this.broadcastChannel !== null && this.opened;
    };
    return TopicConnector;
}(DataConnector));
export default TopicConnector;
//# sourceMappingURL=TopicConnector.js.map