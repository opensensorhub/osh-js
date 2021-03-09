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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import MapView from "./MapView";
import { Deck, MapView as MapViewDeck } from '@deck.gl/core';
import { IconLayer } from '@deck.gl/layers';
import { hex2rgb, isDefined, randomUUID } from "../../../utils/Utils";
import { BitmapLayer, PathLayer } from '@deck.gl/layers';
import { TileLayer } from '@deck.gl/geo-layers';
import '../../../resources/css/deck.css';
/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the Deck.gl Map object.
 * @extends MapView
 */
var DeckGlView = /** @class */ (function (_super) {
    __extends(DeckGlView, _super);
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Boolean} [properties.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     * @param {Object} [properties.deckProps={}] - the properties of the [Deck]{@link https://deck.gl/docs/api-reference/core/deck} object
     *
     */
    function DeckGlView(properties) {
        var _this = _super.call(this, __assign({ supportedLayers: ['marker', 'polyline'] }, properties)) || this;
        var cssClass = document.getElementById(_this.divId).className;
        document.getElementById(_this.divId).setAttribute("class", cssClass + " " + _this.css);
        _this.autoZoomOnFirstMarker = false;
        if (isDefined(properties) && isDefined(properties.autoZoomOnFirstMarker)) {
            _this.autoZoomOnFirstMarker = properties.autoZoomOnFirstMarker;
        }
        return _this;
    }
    DeckGlView.prototype.beforeAddingItems = function (options) {
        // inits the map
        this.initMap(options);
    };
    //---------- MAP SETUP --------------//
    /**
     *
     * @private
     */
    DeckGlView.prototype.initMap = function (options) {
        this.INITIAL_VIEW_STATE = {
            longitude: 0,
            latitude: 0,
            zoom: 2,
            bearing: 0,
            pitch: 0
        };
        var canvasElt = document.createElement('canvas');
        canvasElt.setAttribute('id', randomUUID());
        canvasElt.setAttribute('style', 'width:100%;height:100%;position:relative;');
        var domNode = document.getElementById(this.divId);
        domNode.appendChild(canvasElt);
        // https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}
        // https://c.tile.openstreetmap.org/{z}/{x}/{y}.png
        this.deckLayers = [];
        if (isDefined(options) && isDefined(options.deckProps) && isDefined(options.deckProps.layers)) {
            for (var i = 0; i < options.deckProps.layers.length; i++) {
                var id = options.deckProps.layers[i].id ? options.deckProps.layers[i].id : 'base_' + id;
                this.deckLayers.push(options.deckProps.layers[i]);
            }
        }
        else {
            this.deckLayers.push(new TileLayer({
                id: 'base',
                // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
                data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
                minZoom: 0,
                maxZoom: 19,
                tileSize: 256,
                renderSubLayers: function (props) {
                    var _a = props.tile.bbox, west = _a.west, south = _a.south, east = _a.east, north = _a.north;
                    return new BitmapLayer(props, {
                        data: null,
                        image: props.data,
                        bounds: [west, south, east, north]
                    });
                }
            }));
        }
        var deckProps = {
            canvas: canvasElt.id,
            width: '100%',
            height: '100%',
            controller: true,
            views: [new MapViewDeck()],
            initialViewState: this.INITIAL_VIEW_STATE,
            onViewStateChange: function (_a) {
                var viewState = _a.viewState;
            },
            layers: this.deckLayers
        };
        // overrides default conf by user defined one
        if (isDefined(options) && isDefined(deckProps)) {
            deckProps = __assign(__assign({}, deckProps), options.deckProps);
        }
        this.INITIAL_VIEW_STATE = deckProps.initialViewState;
        this.deckgl = new Deck(deckProps);
    };
    /**
     * Updates the marker associated to the layer.
     * @param {PointMarkerLayer.props} props - The layer properties allowing the update of the marker
     */
    DeckGlView.prototype.updateMarker = function (props) {
        var _this = this;
        var id = props.id + '$' + props.markerId;
        var mId = props.markerId;
        // in deck we create a new layer everytime => reactive programming
        var iconLayer = new IconLayer({
            id: id,
            data: [{
                    position: [props.location.x, props.location.y]
                }],
            pickable: true,
            // iconAtlas and iconMapping are required
            // getIcon: return a string
            iconAtlas: props.icon,
            iconMapping: {
                marker: {
                    x: 0,
                    y: 0,
                    anchorX: props.iconAnchor[0],
                    anchorY: props.iconAnchor[1],
                    width: props.iconSize[0],
                    height: props.iconSize[1],
                    mask: props.iconColor !== '#000000'
                }
            },
            getIcon: function (d) { return 'marker'; },
            sizeScale: props.iconScale,
            getPosition: function (d) { return d.position; },
            getSize: function (d) { return props.iconScale; },
            getColor: function (d) { return hex2rgb(props.iconColor); },
            onHover: function (info, event) { return _this.onMarkerHover(mId, info, props, event); },
            onClick: function (info, event) { return event.leftButton ? _this.onMarkerLeftClick(mId, info, props, event) :
                _this.onMarkerRightClick(mId, info, props, event); }
        });
        // is going to create or update the current entry into the layer map
        this.addMarkerToLayer(props, iconLayer);
        var extraProps = {};
        if (this.autoZoomOnFirstMarker) {
            this.autoZoomOnFirstMarker = false;
            // Zoom to the object
            extraProps.initialViewState = __assign(__assign({}, this.INITIAL_VIEW_STATE), { longitude: props.location.x, latitude: props.location.y, zoom: props.zoomLevel });
        }
        this.render(extraProps);
    };
    /**
     * Updates the marker associated to the layer.
     * @param {Polyline} layer - The layer allowing the update of the marker
     */
    DeckGlView.prototype.updatePolyline = function (layer) {
        var id = layer.id + '$' + layer.polylineId;
        var path = layer.locations[layer.polylineId].map(function (coordinate) {
            return [coordinate.x, coordinate.y, coordinate.z];
        });
        var PATH_DATA = [
            {
                weight: layer.weight,
                "name": layer.id,
                "color": layer.color,
                "path": path
            }
        ];
        var pathLayer = new PathLayer({
            id: id,
            data: PATH_DATA,
            widthUnits: 'pixels',
            widthMinPixels: 5,
            getPath: function (d) { return d.path; },
            getColor: function (d) { return d.color; },
            getWidth: function (d) { return d.weight; }
        });
        this.addPolylineToLayer(layer, pathLayer);
        this.render({});
    };
    /**
     * Override super method to render() at the end
     * @param {Object} marker - The Map marker object
     */
    DeckGlView.prototype.removeMarker = function (marker) {
        _super.prototype.removeMarkers.call(this, marker);
        this.render({});
    };
    /**
     * Override super method to render() at the end
     * @param {Object} polyline - The Map polyline object
     */
    DeckGlView.prototype.removePolylines = function (polyline) {
        _super.prototype.removePolylines.call(this, polyline);
        this.render({});
    };
    /**
     * Inner method to render in the order the different deck.gl layers
     * @private
     * @param {Object} extraProps - Extra deck props
     */
    DeckGlView.prototype.render = function (extraProps) {
        var markers = this.getMarkers();
        var polylines = this.getPolylines();
        // draw in order base -> polylines -> markers
        var props = {
            layers: __spreadArray(__spreadArray(__spreadArray([], this.deckLayers), polylines), markers)
        };
        this.deckgl.setProps(__assign(__assign({}, extraProps), props));
    };
    return DeckGlView;
}(MapView));
export default DeckGlView;
//# sourceMappingURL=DeckGlView.js.map