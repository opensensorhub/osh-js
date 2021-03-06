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
import { isDefined, randomUUID } from "../../../utils/Utils.js";
import 'ol/css.js';
import 'ol/ol.css';
import { Map, View as OlView } from 'ol';
import TileLayer from 'ol/layer/Tile.js';
import { Group } from "ol/layer.js";
import { transform } from "ol/proj.js";
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction.js';
import { defaults as defaultControls, FullScreen } from 'ol/control.js';
import { ZoomSlider } from 'ol/control.js';
import VectorSource from "ol/source/Vector.js";
import VectorLayer from "ol/layer/Vector.js";
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import { Icon, Style } from 'ol/style.js';
import Select from "ol/interaction/Select";
import OSM from "ol/source/OSM";
import MouseWheelZoom from "ol/interaction/MouseWheelZoom";
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import MapView from "./MapView";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import LineString from "ol/geom/LineString";
import { click, pointerMove } from "ol/events/condition";
/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the OpenLayer Map object.
 * @extends MapView
 */
var OpenLayerView = /** @class */ (function (_super) {
    __extends(OpenLayerView, _super);
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Boolean} [properties.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     * @param {Object} [properties.map] - the [Map]{@link https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html} object to use
     * @param {Number} [properties.maxZoom=19] - the max zoom value
     * @param {Boolean} [properties.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     * @param {Object} [properties.initialView] - The initial View can be passed to override the default [View]{@link https://openlayers.org/en/latest/apidoc/module-ol_View-View.html}
     * @param {Object} properties.initialView.lon - the corresponding longitude in EPSG:4326
     * @param {Object} properties.initialView.lat - the corresponding latitude in EPSG:4326
     * @param {Object} properties.initialView.zoom - the default level zoom
     * @param {Object[]} [properties.overlayLayers] - OpenLayers objects to use as overlay layer
     * @param {Object[]} [properties.baseLayers] - OpenLayers objects to use as base layer
     *
     */
    function OpenLayerView(properties) {
        return _super.call(this, __assign({ supportedLayers: ['marker', 'polyline'] }, properties)) || this;
    }
    OpenLayerView.prototype.beforeAddingItems = function (options) {
        // inits the map
        this.initMap(options);
    };
    /**
     * Updates the marker associated to the layer.
     * @param {PointMarkerLayer.props} props - The layer properties allowing the update of the marker
     */
    OpenLayerView.prototype.updateMarker = function (props) {
        var marker = this.getMarker(props);
        if (!isDefined(marker)) {
            // adds a new marker to the leaflet renderer
            var markerObj = this.addMarker({
                lat: props.location.y,
                lon: props.location.x,
                orientation: props.orientation.heading,
                color: props.color,
                icon: props.icon,
                anchor: props.iconAnchor,
                name: props.name,
                id: props.id + "$" + props.markerId
            });
            this.addMarkerToLayer(props, markerObj);
        }
        var markerFeature = this.getMarker(props);
        // updates position
        var lon = props.location.x;
        var lat = props.location.y;
        if (!isNaN(lon) && !isNaN(lat)) {
            var coordinates = transform([lon, lat], 'EPSG:4326', 'EPSG:900913');
            markerFeature.getGeometry().setCoordinates(coordinates);
        }
        // updates orientation
        if (props.icon !== null) {
            // updates icon
            var iconStyle = new Style({
                image: new Icon({
                    opacity: 0.75,
                    anchor: props.iconAnchor,
                    anchorYUnits: 'pixels',
                    anchorXUnits: 'pixels',
                    src: props.icon,
                    rotation: props.orientation.heading * Math.PI / 180
                })
            });
            markerFeature.setStyle(iconStyle);
        }
    };
    /**
     * Updates the polyline associated to the layer.
     * @param {Polyline.props} props - The layer allowing the update of the polyline
     */
    OpenLayerView.prototype.updatePolyline = function (props) {
        var polyline = this.getPolyline(props);
        if (isDefined(polyline)) {
            // removes the layer
            this.removePolylineFromLayer(polyline);
        }
        var polylineObj = this.addPolyline(props.locations[props.polylineId], {
            color: props.color,
            weight: props.weight,
            locations: props.locations,
            maxPoints: props.maxPoints,
            opacity: props.opacity,
            smoothFactor: props.smoothFactor,
            name: props.name
        });
        this.addPolylineToLayer(props, polylineObj);
        //TODO: handle opacity, smoothFactor, color and weight
        // if (polylineId in this.polylines) {
        //     let geometry = this.polylines[polylineId];
        //
        //     let polylinePoints = [];
        //     for (let i = 0; i < layer.locations.length; i++) {
        //         polylinePoints.push(transform([layer.locations[i].x, layer.locations[i].y], 'EPSG:4326', 'EPSG:900913'))
        //     }
        //
        //     geometry.setCoordinates(polylinePoints);
        // }
    };
    //---------- MAP SETUP --------------//
    /**
     * @private
     */
    OpenLayerView.prototype.initMap = function (options) {
        this.map = null;
        var initialView = null;
        this.first = true;
        var overlays = [];
        var baseLayers = this.getDefaultLayers();
        var maxZoom = 19;
        if (isDefined(options)) {
            //if the user passed in a map then use that one, don't make a new one
            if (options.map) {
                this.map = options.map;
                return;
            }
            if (options.maxZoom) {
                maxZoom = options.maxZoom;
            }
            if (options.initialView) {
                initialView = new OlView({
                    center: transform([options.initialView.lon, options.initialView.lat], 'EPSG:4326', 'EPSG:900913'),
                    zoom: options.initialView.zoom,
                    maxZoom: maxZoom
                });
            }
            // checks autoZoom
            if (!options.autoZoomOnFirstMarker) {
                this.first = false;
            }
            // checks overlayers
            if (options.overlayLayers) {
                overlays = options.overlayLayers;
            }
            // checks baseLayer
            if (options.baseLayers) {
                baseLayers = options.baseLayers;
            }
        }
        // #region snippet_openlayerview_initial_view
        if (initialView === null) {
            // loads the default one
            initialView = new OlView({
                center: transform([0, 0], 'EPSG:4326', 'EPSG:900913'),
                zoom: 5,
                maxZoom: maxZoom
            });
        }
        // #endregion snippet_openlayerview_initial_view
        // sets layers to map
        //create map
        this.map = new Map({
            target: this.divId,
            controls: defaultControls().extend([
                new FullScreen()
            ]),
            interactions: defaultInteractions({ mouseWheelZoom: false }).extend([
                new DragRotateAndZoom(),
                new MouseWheelZoom({
                    constrainResolution: true,
                    duration: 200
                })
            ]),
            layers: [
                new Group({
                    'title': 'Base maps',
                    layers: baseLayers
                }),
                new Group({
                    title: 'Overlays',
                    layers: overlays
                })
            ],
            view: initialView,
        });
        var layerSwitcher = new LayerSwitcher({
            tipLabel: 'Legend',
            groupSelectStyle: 'children' // Can be 'children' [default], 'group' or 'none'
        });
        this.map.addControl(layerSwitcher);
        this.map.addControl(new ZoomSlider());
        // inits onLeftClick events
        // select interaction working on "click"
        var selectClick = new Select({
            condition: click,
            style: null
        });
        var selectRightClick = new Select({
            condition: function (e) {
                return (e.type === 'contextmenu');
            },
            style: null
        });
        // select interaction working on "pointermove"
        var selectPointerMove = new Select({
            condition: pointerMove,
            style: null
        });
        this.map.addInteraction(selectClick);
        this.map.addInteraction(selectRightClick);
        this.map.addInteraction(selectPointerMove);
        var that = this;
        selectRightClick.on('select', function (e) {
            if (e.selected.length > 0) {
                var feature = e.selected[0]; //the feature selected
                var mId = that.getMarkerId(feature.getId());
                if (!isDefined(mId)) {
                    return;
                }
                var sId = that.getLayerId(feature.getId());
                if (!isDefined(sId)) {
                    return;
                }
                var layer = that.getLayer(sId);
                if (!isDefined(layer)) {
                    return;
                }
                that.onMarkerRightClick(mId, feature, layer.props, e);
            }
        });
        selectClick.on('select', function (e) {
            if (e.selected.length > 0) {
                var feature = e.selected[0]; //the feature selected
                var mId = that.getMarkerId(feature.getId());
                if (!isDefined(mId)) {
                    return;
                }
                var sId = that.getLayerId(feature.getId());
                if (!isDefined(sId)) {
                    return;
                }
                var layer = that.getLayer(sId);
                if (!isDefined(layer)) {
                    return;
                }
                that.onMarkerLeftClick(mId, feature, layer.props, e);
            }
        });
        selectPointerMove.on('select', function (e) {
            if (e.selected.length > 0) {
                var feature = e.selected[0]; //the feature selected
                var mId = that.getMarkerId(feature.getId());
                if (!isDefined(mId)) {
                    return;
                }
                var sId = that.getLayerId(feature.getId());
                if (!isDefined(sId)) {
                    return;
                }
                var layer = that.getLayer(sId);
                if (!isDefined(layer)) {
                    return;
                }
                that.onMarkerHover(mId, feature, layer.props, e);
            }
        });
        this.vectorSource = new VectorSource({
            wrapX: false,
            features: []
        });
        var vectorMarkerLayer = new VectorLayer({
            source: this.vectorSource,
        });
        this.map.addLayer(vectorMarkerLayer);
        this.map.updateSize();
    };
    /**
     * Gets the list of default layers.
     * @return {Array}
     */
    OpenLayerView.prototype.getDefaultLayers = function () {
        var osm = new TileLayer({
            source: new OSM()
        });
        return [osm];
    };
    /**
     * Add a marker to the map.
     * @param {Object} properties
     * @param {Number} properties.lon
     * @param {Number} properties.lat
     * @param {String} properties.icon - path of the icon
     * @param {Number} properties.orientation - orientation in degree
     * @param {String} properties.id - the id of the new created marker: layer.id$layer.markerId
     * @return {Object} the new marker object
     */
    OpenLayerView.prototype.addMarker = function (properties) {
        //create marker
        if (isDefined(this.map) && this.map !== null) {
            var marker = new Point(transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
            var markerFeature = new Feature({
                geometry: marker,
                name: 'Marker' //TODO
            });
            var style = {
                symbol: {
                    symbolType: 'image',
                    size: [16, 16],
                    color: 'lightyellow',
                    rotateWithView: false,
                    offset: [0, 9]
                }
            };
            if (isDefined(properties.icon) && properties.icon !== null) {
                var iconStyle = new Style({
                    image: new Icon({
                        opacity: 0.75,
                        src: properties.icon,
                        rotation: properties.orientation * Math.PI / 180
                    }),
                });
                markerFeature.setStyle(iconStyle);
            }
            markerFeature.setId(properties.id);
            this.vectorSource.addFeature(markerFeature);
            if (this.first) {
                this.first = false;
                this.map.getView().setCenter(transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
                this.map.getView().setZoom(12);
            }
            return markerFeature;
        }
        this.onResize();
        //TODO: exception
        return null;
    };
    /**
     * Abstract method to remove a marker from its corresponding layer.
     * This is library dependent.
     * @param {Object} marker - The Map marker object
     */
    OpenLayerView.prototype.removeMarkerFromLayer = function (marker) {
        this.vectorSource.removeFeature(marker);
    };
    /**
     * Abstract method to remove a polyline from its corresponding layer.
     * This is library dependant.
     * @param {Object} polyline - The Map polyline object
     */
    OpenLayerView.prototype.removePolylineFromLayer = function (polyline) {
        this.map.removeLayer(polyline);
    };
    /**
     *
     * @private
     * @param layer
     * @return {string} the id of the newly created marker, or the id of the marker if it already exists from the current layer
     */
    OpenLayerView.prototype.createMarkerFromLayer = function (layer) {
        //This method is intended to create a marker object only for the OpenLayerView. It does not actually add it
        //to the view or map to give the user more control
        var marker = this.getMarker(layer);
        if (!isDefined(marker)) {
            var properties = {
                lat: layer.location.y,
                lon: layer.location.x,
                orientation: layer.orientation.heading,
                color: layer.color,
                icon: layer.icon,
                name: this.names[layer.markerId]
            };
            //create marker
            var markerPoint = new Point(transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
            marker = new Feature({
                geometry: markerPoint,
                name: 'Marker' //TODO
            });
            if (properties.icon !== null) {
                var iconStyle = new Style({
                    image: new Icon({
                        opacity: 0.75,
                        src: properties.icon,
                        rotation: properties.orientation * Math.PI / 180
                    })
                });
                marker.setStyle(iconStyle);
            }
            var id = "view-marker-" + randomUUID();
            marker.setId(id);
        }
        return this.getMarker(layer);
    };
    /**
     * Add a polyline to the map.
     * @param {locations} locations - the coordinates [{x, y}]
     * @param {Object} properties
     * @param {String} properties.color
     * @param {Number} properties.weight
     * @param {String} properties.name
     * @return {string} the id of the new created polyline
     */
    OpenLayerView.prototype.addPolyline = function (locations, properties) {
        var polylinePoints = [];
        for (var i = 0; i < locations.length; i++) {
            polylinePoints.push(transform([locations[i].x, locations[i].y], 'EPSG:4326', 'EPSG:900913'));
        }
        //create path
        var pathGeometry = new LineString(polylinePoints);
        var feature = new Feature({
            geometry: pathGeometry,
            name: 'Line'
        });
        var source = new VectorSource({
            features: [feature]
        });
        var vectorPathLayer = new VectorLayer({
            title: properties.name,
            source: source,
            style: new Style({
                fill: new Fill({
                    color: properties.color
                }),
                stroke: new Stroke({
                    color: properties.color,
                    width: properties.weight
                })
            })
        });
        this.map.addLayer(vectorPathLayer);
        return vectorPathLayer;
    };
    OpenLayerView.prototype.onResize = function () {
        _super.prototype.onResize.call(this);
        if (isDefined(this.map) && this.map !== null) {
            this.map.updateSize();
        }
    };
    return OpenLayerView;
}(MapView));
export default OpenLayerView;
//# sourceMappingURL=OpenLayerView.js.map