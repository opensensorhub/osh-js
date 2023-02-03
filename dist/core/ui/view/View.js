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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * The abstract object to represent a view.
 */
import { assertArray, assertDefined, assertTrue, isDefined, randomUUID } from '../../utils/Utils.js';
import '../../resources/css/view.css';
import { DATASOURCE_DATA_TOPIC, DATASOURCE_TIME_TOPIC } from "../../Constants.js";
import { Status } from "../../connector/Status.js";
import { EventType } from "../../event/EventType.js";
var View = /** @class */ (function () {
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {string} properties.container - The div element to attach to
     * @param {string} properties.css - The css classes to set, can be multiple if separate by spaces
     * @param {string[]} properties.supportedLayers - List the supported layers of this View. It is corresponding to the the 'type' Layer property
     * @param {boolean} properties.visible - set the default behavior of the visibility of the view
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     */
    function View(properties) {
        // list of layers
        this.layers = [];
        this.lastRec = {};
        this.dataSources = [];
        this.broadcastChannels = [];
        //this.divId = divId;
        this.id = "view-" + randomUUID();
        this.css = "";
        if (isDefined(properties) && isDefined(properties.css)) {
            this.css = properties.css;
        }
        assertDefined(properties && properties.supportedLayers, 'supportedLayers');
        assertArray(properties.supportedLayers, 'supportedLayers');
        assertTrue(properties.supportedLayers.length > 0, 'supportedLayers.length === 0');
        this.supportedLayers = properties.supportedLayers;
        // inits the view before adding the viewItem
        this.init(properties);
    }
    /**
     * Inits the view component.
     * @private
     */
    View.prototype.init = function (properties) {
        this.properties = properties;
        this.elementDiv = document.createElement("div");
        this.elementDiv.setAttribute("id", this.id);
        this.elementDiv.setAttribute("class", this.css + " osh-view");
        this.divId = this.id;
        var parentDivId = (isDefined(properties.container) ? properties.container : document.body);
        var div = document.getElementById(parentDivId);
        if (!isDefined(div) || div === null) {
            document.body.appendChild(this.elementDiv);
            this.hide();
            this.container = document.body;
        }
        else {
            div.appendChild(this.elementDiv);
            this.container = div;
        }
        this.beforeAddingItems(properties);
        if (isDefined(properties)) {
            if (isDefined(properties.layers)) {
                for (var i = 0; i < properties.layers.length; i++) {
                    this.addLayer(properties.layers[i]);
                }
            }
            if (isDefined(properties.visible)) {
                document.getElementById(this.divId).style.display = (properties.visible) ? "block" : "none";
            }
        }
        var that = this;
        // observes the event associated to the dataSourceId
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // Was it the style attribute that changed? (Maybe a classname or other attribute change could do this too?
                // You might want to remove the attribute condition) Is display set to 'none'?
                if (mutation.attributeName === 'style') {
                    that.onResize();
                }
            });
        });
        // Attach the mutation observer to blocker, and only when attribute values change
        observer.observe(this.elementDiv, { attributes: true });
        var rootObserver = new MutationObserver(function (mutations) {
            // try to get the div element by the id to check if it is still owned by the document object
            if (!isDefined(document.getElementById(that.divId))) {
                this.disconnect();
                that.destroy();
            }
        });
        rootObserver.observe(document.body, {
            childList: true,
        });
    };
    /**
     * Hide the view
     */
    View.prototype.hide = function () {
        this.elementDiv.style.display = "none";
    };
    /**
     * Callback called when the view is resized
     * @event
     */
    View.prototype.onResize = function () {
    };
    /**
     * Attach the view to a specific div. If the view has already been attached to a div, it will be removed
     * from its current parent and will be attached to new one.
     * Note: the onResize() is called at the end of the process.
     * @param {String} divId - The div element to attach to
     */
    View.prototype.attachTo = function (divId) {
        if (isDefined(this.elementDiv.parentNode)) {
            // detach from its parent
            this.elementDiv.parentNode.removeChild(this.elementDiv);
        }
        document.getElementById(divId).appendChild(this.elementDiv);
        if (this.elementDiv.style.display === "none") {
            this.elementDiv.style.display = "block";
        }
        this.onResize();
    };
    /**
     * This method is called before attaching any view items passed as arguments in the constructor of the view.
     * @event
     * @param {Object} options - A generic object to use
     */
    View.prototype.beforeAddingItems = function (options) {
    };
    /**
     * Gets the inner id of the view object.
     * @return {String} The id of the view
     */
    View.prototype.getId = function () {
        return this.id;
    };
    /**
     * Gets the div id of the DOM element.
     * @return {String} The div id of the view
     */
    View.prototype.getDivId = function () {
        return this.divId;
    };
    /**
     * Set the data to the view. Each view has to handle the kind of the data separately.
     * @param {String} dataSourceId - The dataSource id of the source providing the data
     * @param {any[]} data - The data array to set
     */
    View.prototype.setData = function (dataSourceId, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Show the view.
     * @param  {Object} properties - A generic object
     */
    View.prototype.show = function (properties) {
    };
    View.prototype.destroy = function () {
        var _a;
        for (var _i = 0, _b = this.broadcastChannels; _i < _b.length; _i++) {
            var bc = _b[_i];
            bc.close();
        }
        this.broadcastChannels = [];
        // remove DOM element
        (_a = this.elementDiv) === null || _a === void 0 ? void 0 : _a.remove();
    };
    /**
     * Adds a layer to the view. A broadcastChannel is going to listen the new dataSources
     * @param {Layer} layer - The layer object
     */
    View.prototype.addLayer = function (layer) {
        var _this = this;
        assertTrue(this.supportedLayers.includes(layer.type), 'this layer is not supported: ' + layer.type + ', should be ' + this.supportedLayers);
        this.layers.push(layer);
        var ds = layer.getDataSourcesIds();
        var _loop_1 = function (i) {
            var dataSourceId = ds[i];
            // this.setData(dataSourceId, [layer.getProps()]);
            // observes the data come in
            var self_1 = this_1;
            var broadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + dataSourceId);
            broadcastChannel.onmessage = function (event) { return __awaiter(_this, void 0, void 0, function () {
                var that;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(event.data.type === EventType.STATUS && event.data.status === Status.CLOSED_ERROR)) return [3 /*break*/, 1];
                            self_1.reset();
                            return [3 /*break*/, 4];
                        case 1:
                            if (!(event.data.type === EventType.DATA)) return [3 /*break*/, 4];
                            that = this;
                            // transform the data
                            return [4 /*yield*/, layer.setData(dataSourceId, event.data.values)];
                        case 2:
                            // transform the data
                            _a.sent();
                            // set the transformed data to the view
                            return [4 /*yield*/, that.setData(dataSourceId, layer.getProps())];
                        case 3:
                            // set the transformed data to the view
                            _a.sent();
                            // store as last record
                            self_1.lastRec[dataSourceId] = event.data;
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            var timeBroadcastChannel = new BroadcastChannel(DATASOURCE_TIME_TOPIC + dataSourceId);
            timeBroadcastChannel.onmessage = function (event) {
                // skip data reset events for now
                if (event.data.type === EventType.TIME_CHANGED) {
                    self_1.reset(); // on time changed
                }
            };
            this_1.broadcastChannels.push(broadcastChannel);
            this_1.broadcastChannels.push(timeBroadcastChannel);
        };
        var this_1 = this;
        for (var i = 0; i < ds.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * Removes a Layer from the view.
     * @param {Layer} layer - The layer object
     */
    View.prototype.removeAllFromLayer = function (layer) {
        if (this.layers.includes(layer)) {
            // 1) remove from STYLER fn
            for (var ds in layer.dataSourcesToFn) {
                delete this.lastRec[ds];
            }
            layer.reset();
        }
    };
    /**
     * Removes all view item from the view.
     */
    View.prototype.removeAllFromLayers = function () {
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            this.removeAllFromLayer(layer);
        }
    };
    /**
     * Gets the list of the dataSource ids contained into the view.
     * @return {String[]} The list of dataSource ids
     */
    View.prototype.getDataSourcesId = function () {
        var res = [];
        // check for layers
        for (var i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            res = res.concat(layer.getDataSourcesIds());
        }
        return res;
    };
    /**
     * Calls for resetting the view.
     */
    View.prototype.reset = function () {
        this.removeAllFromLayers();
    };
    return View;
}());
export default View;
//# sourceMappingURL=View.js.map