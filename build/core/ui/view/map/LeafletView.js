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
import { isDefined, assertDefined } from "../../../utils/Utils.js";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapView from "./MapView";
/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the Leaflet Map object.
 * @extends MapView
 * @example

 import LeafletView from 'core/ui/view/map/LeafletView.js';

 let leafletMapView = new LeafletView({
    container: 'leafletMap',
    layers: [
      new PointMarkerLayer({
      dataSourceId: gpsDataSource.id,
      getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
      }),
      icon: './images/car-location.png',
      iconSize: [32, 64],
      iconAnchor: [16, 65],
      name: 'Car',
      description: 'GPS car Toulouse'
    })
  ],
    autoZoomOnFirstMarker: true
});
 */
var LeafletView = /** @class */ (function (_super) {
    __extends(LeafletView, _super);
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Boolean} [properties.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     * @param {Boolean} [properties.follow=false] - follow the marker
     * @param {Object} [properties.initialView] - Sets the view of the map (geographical center and zoom) with the given animation options. [See details]{@link https://leafletjs.com/reference-1.7.1.html#map-setview}
     * @param {Object[]} [properties.overlayLayers] - [L.tileLayer]{@link https://leafletjs.com/reference-1.7.1.html#tilelayer-l-tilelayer} objects to use as overlay layer
     * @param {Object[]} [properties.baseLayers] - [L.tileLayer]{@link https://leafletjs.com/reference-1.7.1.html#tilelayer-l-tilelayer} objects to use as base layer
     *
     */
    function LeafletView(properties) {
        var _this = _super.call(this, __assign({ supportedLayers: ['marker', 'draping', 'polyline'] }, properties)) || this;
        var cssClass = document.getElementById(_this.divId).className;
        document.getElementById(_this.divId).setAttribute("class", cssClass + " " + _this.css);
        return _this;
    }
    LeafletView.prototype.beforeAddingItems = function (options) {
        // inits the map
        this.initMap(options);
    };
    //---------- MAP SETUP --------------//
    /**
     *
     * @private
     */
    LeafletView.prototype.initMap = function (options) {
        // #region snippet_leafletview_initial_view
        var initialView = {
            location: new L.LatLng(0, 0),
            zoom: 3
        };
        // #endregion snippet_leafletview_initial_view
        this.first = true;
        this.follow = false;
        this.autoZoomOnFirstMarker = false;
        var defaultLayers = this.getDefaultLayers();
        var defaultLayer = defaultLayers[0].layer;
        var baseLayers = {};
        var overlays = {};
        baseLayers[defaultLayers[0].name] = defaultLayers[0].layer;
        overlays[defaultLayers[1].name] = defaultLayers[1].layer;
        if (isDefined(options)) {
            if (isDefined(options.initialView)) {
                initialView = {
                    location: new L.LatLng(options.initialView.lat, options.initialView.lon),
                    zoom: options.initialView.zoom
                };
            }
            // checks autoZoom
            if (isDefined(options.autoZoomOnFirstMarker)) {
                this.autoZoomOnFirstMarker = options.autoZoomOnFirstMarker;
            }
            // checks overlayers
            if (isDefined(options.overlayLayers)) {
                overlays = options.overlayLayers;
            }
            // checks baseLayer
            if (isDefined(options.baseLayers)) {
                baseLayers = options.baseLayers;
            }
            if (isDefined(options.follow)) {
                this.follow = options.follow;
            }
            // checks defaultLayer
            if (isDefined(options.defaultLayer)) {
                defaultLayer = options.defaultLayer;
            }
        }
        // sets layers to map
        this.map = new L.Map(this.divId, {
            fullscreenControl: true,
            layers: defaultLayer
        });
        L.control.layers(baseLayers, overlays).addTo(this.map);
        this.map.setView(initialView.location, initialView.zoom);
        //this.initLayers();
    };
    /**
     * Gets the list of default layers.
     * @return {Array}
     */
    LeafletView.prototype.getDefaultLayers = function (options) {
        var maxZoom = 22;
        if (isDefined(options) && options.maxZoom) {
            maxZoom = options.maxZoom;
        }
        // copyrights
        var mbAttr = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors', mbUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var esriLink = '<a href="http://www.esri.com/">Esri</a>';
        var esriWholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
        // leaflet layers
        var esriLayer = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; ' + esriLink + ', ' + esriWholink,
            maxZoom: maxZoom,
            maxNativeZoom: 19
        });
        var streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr, maxZoom: maxZoom });
        return [{
                name: "OSM Streets",
                layer: streets
            }, {
                name: "Esri Satellite",
                layer: esriLayer
            }];
    };
    /**
     * @private
     */
    LeafletView.prototype.initLayers = function () {
        // create the tile layer with correct attribution
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new L.tileLayer(osmUrl, {
            minZoom: 1,
            maxZoom: 22,
            attribution: osmAttrib
        });
        this.map.addLayer(osm);
    };
    /**
     * Add a marker to the map.
     * @param {PointMarkerLayer.properties} properties - the layer properties
     * @return {Object} the the new created marker
     */
    LeafletView.prototype.addMarker = function (properties) {
        assertDefined(properties.location, 'location');
        //create marker
        var marker = null;
        if (properties.icon !== null) {
            var markerIcon = L.icon({
                iconAnchor: properties.iconAnchor,
                iconUrl: properties.icon,
                iconSize: properties.iconSize
            });
            marker = L.marker([properties.location.y, properties.location.x], {
                icon: markerIcon
            });
        }
        else {
            marker = L.marker([properties.location.y, properties.location.x]);
        }
        if (properties.label !== null) {
            marker.bindTooltip(properties.label, {
                permanent: false,
                direction: 'center',
                offset: L.point(properties.labelOffset[0], properties.labelOffset[1])
            });
        }
        var name = properties.hasOwnProperty("name") && properties.label != null ? properties.label : "";
        var desc = properties.hasOwnProperty("description") && properties.description != null ? properties.description : "";
        if (!isDefined(properties.onLeftClick) && (name.length > 0 || desc.length > 0)) {
            marker.bindPopup(name + '<div>' + desc + '</div>', {
                offset: L.point(properties.labelOffset[0], properties.labelOffset[1])
            });
        }
        marker.id = properties.id + "$" + properties.markerId;
        marker.addTo(this.map);
        if (properties.hasOwnProperty(properties.orientation)) {
            marker.setRotationAngle(properties.orientation.heading);
        }
        return marker;
    };
    /**
     * Add a polyline to the map.
     * @param {locations} locations - the coordinates [{x, y}]
     * @param {Object} properties
     * @param {String} properties.color
     * @param {Number} properties.weight
     * @param {Number} properties.opacity
     * @param {Number} properties.smoothFactor
     * @return {string} the id of the new created polyline
     */
    LeafletView.prototype.addPolyline = function (locations, properties) {
        var polylinePoints = [];
        if (isDefined(locations) && locations.length > 0) {
            for (var i = 0; i < locations.length; i++) {
                polylinePoints.push(new L.LatLng(locations[i].y, locations[i].x));
            }
        }
        //create path
        var polyline = new L.Polyline(polylinePoints, {
            color: properties.color,
            weight: properties.weight,
            opacity: properties.opacity,
            smoothFactor: properties.smoothFactor
        }).addTo(this.map);
        return polyline;
    };
    /**
     * Updates the marker associated to the layer.
     * @param {PointMarkerLayer.props} props - The layer properties allowing the update of the marker
     */
    LeafletView.prototype.updateMarker = function (props) {
        var _this = this;
        var marker = this.getMarker(props);
        if (!isDefined(marker)) {
            // adds a new marker to the leaflet renderer
            var markerObject_1 = this.addMarker(props);
            this.addMarkerToLayer(props, markerObject_1);
            var mId_1 = props.markerId; //need to freeze
            markerObject_1.on('click', function (event) { return _this.onMarkerLeftClick(mId_1, markerObject_1, props, event); });
            markerObject_1.on('contextmenu', function (event) { return _this.onMarkerRightClick(mId_1, markerObject_1, props, event); });
            markerObject_1.on('mouseover', function (event) { return _this.onMarkerHover(mId_1, markerObject_1, props, event); });
        }
        // get the current marker corresponding to the current markerId value of the PointMarker
        marker = this.getMarker(props);
        // updates position
        var lon = props.location.x;
        var lat = props.location.y;
        if (!isNaN(lon) && !isNaN(lat)) {
            var newLatLng = new L.LatLng(lat, lon);
            marker.setLatLng(newLatLng);
            if ((this.first && this.autoZoomOnFirstMarker) || this.follow) {
                var markerBounds = L.latLngBounds([newLatLng]);
                this.map.fitBounds(markerBounds, {
                    maxZoom: props.zoomLevel
                });
                if (this.first) {
                    this.first = false;
                }
            }
        }
        // updates orientation
        if (isDefined(props.orientation)) {
            marker.setRotationAngle(props.orientation.heading);
        }
        if (props.icon !== null && marker._icon.iconUrl !== props.icon) {
            // updates icon
            var markerIcon = L.icon({
                iconAnchor: props.iconAnchor,
                iconUrl: props.icon
            });
            marker.setIcon(markerIcon);
        }
    };
    /**
     * Abstract method to remove a marker from its corresponding layer.
     * This is library dependant.
     * @param {Object} marker - The Map marker object
     */
    LeafletView.prototype.removeMarkerFromLayer = function (marker) {
        this.map.removeLayer(marker);
    };
    /**
     * Abstract method to remove a polyline from its corresponding layer.
     * This is library dependant.
     * @param {Object} polyline - The Map polyline object
     */
    LeafletView.prototype.removePolylineFromLayer = function (polyline) {
        this.map.removeLayer(polyline);
    };
    /**
     * Updates the polyline associated to the layer.
     * @param {PolylineLayer.props} props - The layer properties allowing the update of the polyline
     */
    LeafletView.prototype.updatePolyline = function (props) {
        var polyline = this.getPolyline(props);
        if (isDefined(polyline)) {
            // removes the layer
            this.removePolylineFromLayer(polyline);
        }
        // adds a new polyline to the leaflet renderer
        var polylineObj = this.addPolyline(props.locations[props.polylineId], {
            color: props.color,
            weight: props.weight,
            locations: props.locations,
            maxPoints: props.maxPoints,
            opacity: props.opacity,
            smoothFactor: props.smoothFactor
        });
        this.addPolylineToLayer(props, polylineObj);
    };
    LeafletView.prototype.attachTo = function (parentElement) {
        _super.prototype.attachTo.call(this, parentElement);
        // Fix leaflet bug when resizing the div parent container
        this.map.invalidateSize();
    };
    LeafletView.prototype.onResize = function () {
        _super.prototype.onResize.call(this);
        var that = this;
        setTimeout(function () { that.map.invalidateSize(); }, 100);
    };
    LeafletView.prototype.onChange = function (data) { };
    return LeafletView;
}(MapView));
/***  little hack starts here ***/
L.Map = L.Map.extend({
    openPopup: function (popup) {
        this._popup = popup;
        return this.addLayer(popup).fire('popupopen', {
            popup: this._popup
        });
    }
});
// Defines rotated marker
(function () {
    // save these original methods before they are overwritten
    var proto_initIcon = L.Marker.prototype._initIcon;
    var proto_setPos = L.Marker.prototype._setPos;
    var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');
    L.Marker.addInitHook(function () {
        var iconAnchor = this.options.icon.options.iconAnchor;
        if (iconAnchor) {
            iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
        }
        this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom';
        this.options.rotationAngle = this.options.rotationAngle || 0;
    });
    L.Marker.include({
        _initIcon: function () {
            proto_initIcon.call(this);
        },
        _setPos: function (pos) {
            proto_setPos.call(this, pos);
            if (this.options.rotationAngle) {
                this._icon.style[L.DomUtil.TRANSFORM + 'Origin'] = this.options.rotationOrigin;
                if (oldIE) {
                    // for IE 9, use the 2D rotation
                    this._icon.style[L.DomUtil.TRANSFORM] = ' rotate(' + this.options.rotationAngle + 'deg)';
                }
                else {
                    // for modern browsers, prefer the 3D accelerated version
                    this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
                }
            }
        },
        setRotationAngle: function (angle) {
            this.options.rotationAngle = angle;
            this.update();
            return this;
        },
        setRotationOrigin: function (origin) {
            this.options.rotationOrigin = origin;
            this.update();
            return this;
        }
    });
})();
/***  end of hack ***/
export default LeafletView;
//# sourceMappingURL=LeafletView.js.map