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

import {isDefined, assert, assertDefined} from "../../../utils/Utils.js";
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
class LeafletView extends MapView {
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
    constructor(properties) {
        super({
            supportedLayers: ['marker','draping', 'polyline', 'polygon'],
            ...properties,
        });

        let cssClass = document.getElementById(this.divId).className;
        document.getElementById(this.divId).setAttribute("class", cssClass+" "+this.css);
    }

    beforeAddingItems(options) {
        // inits the map
        this.initMap(options);
    }

    //---------- MAP SETUP --------------//
    /**
     *
     * @private
     */
    initMap(options) {
        // #region snippet_leafletview_initial_view
        let initialView = {
            location: new L.LatLng(0, 0),
            zoom: 3
        };
        // #endregion snippet_leafletview_initial_view
        this.first = true;
        this.follow = false;
        this.autoZoomOnFirstMarker = false;
        let defaultLayers = this.getDefaultLayers();

        let defaultLayer = defaultLayers[0].layer;

        let baseLayers = {};
        let overlays = {};

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
    }

    /**
     * Gets the list of default layers.
     * @return {Array}
     */
    getDefaultLayers(options) {
        let maxZoom = 22;
        if (isDefined(options) && options.maxZoom) {
            maxZoom = options.maxZoom;
        }
        // copyrights
        let mbAttr = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            mbUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

        let esriLink = '<a href="http://www.esri.com/">Esri</a>';
        let esriWholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

        // leaflet layers
        let esriLayer = L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: '&copy; ' + esriLink + ', ' + esriWholink,
                maxZoom: maxZoom,
                maxNativeZoom: 19
            });

        let streets = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr, maxZoom: maxZoom});

        return [{
            name: "OSM Streets",
            layer: streets
        }, {
            name: "Esri Satellite",
            layer: esriLayer
        }];
    }

    /**
     * @private
     */
    initLayers() {
        // create the tile layer with correct attribution
        let osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        let osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        let osm = new L.tileLayer(osmUrl, {
            minZoom: 1,
            maxZoom: 22,
            attribution: osmAttrib
        });
        this.map.addLayer(osm);
    }

    /**
     * Add a marker to the map.
     * @param {PointMarkerLayer.properties} properties - the layer properties
     * @return {Object} the the new created marker
     */
    addMarker(properties) {
        assertDefined(properties.location,'location');
        //create marker
        let marker = null;
        if (properties.icon !== null) {
            let markerIcon = L.icon({
                iconAnchor: properties.iconAnchor,
                iconUrl: properties.icon,
                iconSize: properties.iconSize
            });

            marker = L.marker([properties.location.y, properties.location.x], {
                icon: markerIcon
            });
        } else {
            marker = L.marker([properties.location.y, properties.location.x]);
        }

        if (properties.label !== null) {
            marker.bindTooltip(properties.label, {
                permanent: false,
                direction: 'center',
                offset: L.point(properties.labelOffset[0], properties.labelOffset[1])
            });
        }

        let name = properties.hasOwnProperty("name") && properties.label != null ? properties.label : "";
        let desc = properties.hasOwnProperty("description") && properties.description != null ? properties.description : "";
        if (!isDefined(properties.onLeftClick) && (name.length > 0 || desc.length > 0)) {
            marker.bindPopup(name + '<div>' + desc + '</div>',{
                offset: L.point(properties.labelOffset[0], properties.labelOffset[1])
            });
        }

        marker.setZIndexOffset(properties.zIndex);
        marker.id = properties.id+"$"+properties.markerId;
        marker.addTo(this.map);
        if(properties.hasOwnProperty(properties.orientation)) {
            marker.setRotationAngle(properties.orientation.heading);
        }

        return marker;
    }

    /**
     * Add a polyline to the map.
     * @param {Object} properties
     */
    addPolyline(properties) {
        const locations = properties.locations;
        let polylinePoints = [];

        if(isDefined(locations) && locations.length > 0) {
            for (let i = 0; i < locations.length; i++) {
                polylinePoints.push(new L.LatLng(
                    locations[i].y,
                    locations[i].x)
                );
            }
        }

        //create path
        let polyline = new L.Polyline(polylinePoints, {
            color: properties.color,
            weight: properties.weight,
            opacity: properties.opacity,
            smoothFactor: properties.smoothFactor
        }).addTo(this.map);

        return polyline;
    }

    /**
     * Updates the marker associated to the layer.
     * @param {PointMarkerLayer.props} props - The layer properties allowing the update of the marker
     */
    async updateMarker(props) {
        let marker = this.getMarker(props);
        if (!isDefined(marker)) {
            // adds a new marker to the leaflet renderer
            marker = this.addMarker(props);
            this.addMarkerToLayer(props, marker);
            const mId = props.markerId; //need to freeze
            marker.on('click', (event) => this.onMarkerLeftClick(mId,marker, props, event));
            marker.on('contextmenu', (event) => this.onMarkerRightClick(mId,marker, props, event));
            marker.on('mouseover', (event) => this.onMarkerHover(mId,marker, props, event));
        }

        // get the current marker corresponding to the current markerId value of the PointMarker
        // updates position
        let lon = props.location.x;
        let lat = props.location.y;

        if (!isNaN(lon) && !isNaN(lat)) {
            let newLatLng = new L.LatLng(lat, lon);
            marker.setLatLng(newLatLng);
            if((this.first && this.autoZoomOnFirstMarker) || this.follow) {
                const markerBounds = L.latLngBounds([newLatLng ]);
                this.map.fitBounds(markerBounds, {
                    maxZoom: props.zoomLevel
                });
                if(this.first) {
                    this.first = false;
                }
            }
        }

        // updates orientation
        if(isDefined(props.orientation)) {
            marker.setRotationAngle(props.orientation.heading);
        }

        if (props.icon !== null && marker._icon.iconUrl !== props.icon) {
            // updates icon
            let markerIcon = L.icon({
                iconAnchor: props.iconAnchor,
                iconUrl: props.icon
            });
            marker.setIcon(markerIcon);
        }
        marker.setZIndexOffset(props.zIndex);
    }

    /**
     * Abstract method to remove a marker from its corresponding layer.
     * This is library dependant.
     * @param {Object} marker - The Map marker object
     */
    removeMarkerFromLayer(marker) {
        this.map.removeLayer(marker);
    }

    /**
     * Abstract method to remove a polyline from its corresponding layer.
     * This is library dependant.
     * @param {Object} polyline - The Map polyline object
     */
    removePolylineFromLayer(polyline) {
        this.map.removeLayer(polyline);
    }

    /**
     * Updates the polyline associated to the layer.
     * @param {PolylineLayer.props} props - The layer properties allowing the update of the polyline
     */
    async updatePolyline(props) {
        let polyline = this.getPolyline(props);
        if (!isDefined(polyline)) {
            // adds a new polygon to the leaflet renderer
            const polylineObj = this.addPolyline(props);
            this.addPolylineToLayer(props, polylineObj);
        } else {
            let polylinePoints = [];
            const locations = props.locations;

            if(isDefined(locations) && locations.length > 0) {
                for (let i = 0; i < locations.length; i++) {
                    polylinePoints.push(new L.LatLng(
                        locations[i].y,
                        locations[i].x)
                    );
                }
            }
            polyline.setLatLngs(polylinePoints);

            // update style
            polyline.setStyle({
                color: props.color,
                weight: props.weight,
                opacity: props.opacity
            });
        }
    }

    /**
     * Updates the polygon associated to the layer.
     * @param {Polygon.props} props - The layer properties allowing the update of the polygon
     */
    async updatePolygon(props) {
        let polygon = this.getPolygon(props);
        if (!isDefined(polygon)) {
            // adds a new polygon to the leaflet renderer
            const polygonObj = this.addPolygon(props);
            this.addPolygonToLayer(props, polygonObj);
        } else {
            // update location
            const vertices = props.vertices;

            let polygonPoints = [];

            if(isDefined(vertices) && vertices.length > 0) {
                for (let i = 0; i < vertices.length - 1; i = i + 2) {
                    let latLon = new L.LatLng(vertices[i + 1 ], vertices[i]);
                    polygonPoints.push([latLon.lat,latLon.lng]);
                }
            }
            polygon.setLatLngs(polygonPoints);

            // update style
            polygon.setStyle({
                color: props.outlineColor,
                weight: props.outlineWidth,
                fillColor: props.color,
                fill : true,
                fillOpacity: props.opacity
            });
        }
    }

    /**
     * Abstract method to remove a polygon from its corresponding layer.
     * This is library dependant.
     * @param {Object} polygon - The Map polygon object
     */
    removePolygonFromLayer(polygon) {
        this.map.removeLayer(polygon);
    }

    /**
     * Add a polygon to the map.
     * @param {Object} properties
     */
    addPolygon(properties) {
        const vertices = properties.vertices;

        let polygonPoints = [];

        if(isDefined(vertices) && vertices.length > 0) {
            for (let i = 0; i < vertices.length - 1; i = i + 2) {
                let latLon = new L.LatLng(vertices[i + 1 ], vertices[i]);
                polygonPoints.push([latLon.lat,latLon.lng]);
            }
        }

        //create polygon
        let polygon = new L.polygon(polygonPoints, {
            color: properties.outlineColor,
            weight: properties.outlineWidth,
            fillColor: properties.color,
            fill : true,
            fillOpacity: properties.opacity
        }).addTo(this.map);
        return polygon;
    }

    attachTo(parentElement) {
        super.attachTo(parentElement);
        // Fix leaflet bug when resizing the div parent container
        this.map.invalidateSize();
    }

    onResize() {
        super.onResize();
        let that = this;
        setTimeout(function(){ that.map.invalidateSize()}, 100);

    }

    onChange(data) {}
}

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
    let proto_initIcon = L.Marker.prototype._initIcon;
    let proto_setPos = L.Marker.prototype._setPos;

    let oldIE = (L.DomUtil.TRANSFORM === 'msTransform');

    L.Marker.addInitHook(function () {
        let iconAnchor = this.options.icon.options.iconAnchor;
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
                } else {
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

export default  LeafletView;
