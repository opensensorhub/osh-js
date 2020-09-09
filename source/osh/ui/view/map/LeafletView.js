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

import View from "../View.js";
import {isDefined, randomUUID} from "../../../utils/Utils.js";
import EventManager from "../../../events/EventManager.js";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {bind} from "leaflet/dist/leaflet-src.esm";

/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the Leaflet Map object.
 * @extends View
 * @example

 import LeafletView from 'osh/ui/view/map/LeafletView.js';

 let leafletMapView = new LeafletView("",
 [{
            styler :  pointMarker,
            name : "Android Phone GPS",
            entityId : androidEntity.id
        },
 {
     styler : new Polyline({
         locationFunc : {
             dataSourceIds : [androidPhoneGpsDataSource.getId()],
             handler : function(rec) {
                 return {
                     x : rec.lon,
                     y : rec.lat,
                     z : rec.alt
                 };
             }
         },
         color : 'rgba(0,0,255,0.5)',
         weight : 10,
         opacity : .5,
         smoothFactor : 1,
         maxPoints : 200
     }),
     name : "Android Phone GPS Path",
     entityId : androidEntity.id
 }]
 );
 */
class LeafletView extends View {
    /**
     * Create a View.
     * @param {String} parentElementDivId - The div element to attach to
     * @param {Object[]} viewItems - The initial view items to add
     * @param {String} viewItems.name - The name of the view item
     * @param {Styler} viewItems.styler - The styler object representing the view item
     * @param {Object} options - the properties of the view
     * @param {Boolean} options.autoZoomOnFirstMarker - auto zoom on the first added marker
     * @param {Boolean} options.follow - follow the marker
     * @param {Object} options.initialView - {lon:.., lat:..}
     * @param {Object[]} options.overlayLayers - OpenLayers objects to use as overlay layer
     * @param {Object[]} options.baseLayers - OpenLayers objects to use as base layer
     *
     */
    constructor(parentElementDivId, viewItems, options) {
        super(parentElementDivId, viewItems, options);

        let cssClass = document.getElementById(this.divId).className;
        document.getElementById(this.divId).setAttribute("class", cssClass + " " + this.css);
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
        let initialView = {
            location: new L.LatLng(0, 0),
            zoom: 3
        };
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
        this.markers = {};
        this.polylines = {};

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
     * @param {Object} properties
     * @param {Number} properties.lon
     * @param {Number} properties.lat
     * @param {String} properties.icon - the icon path
     * @param {Integer[]} properties.iconAnchor - offset of the icon ex:[10,10]
     * @param {String} properties.label - label of the tooltip
     * @param {String} properties.description - description of the marker to display into the tooltip
     * @param {String} properties.labelOffset - offset of the label of the tooltip
     * @param {Number} properties.orientation - orientation of the icon in degree
     * @param {function} properties.contextMenuFunction - function to be called when a marker icon is right clicked
     * @return {string} the id of the new created marker
     */
    addMarker(properties) {
        //create marker
        let marker = null;
        if (properties.icon !== null) {
            let markerIcon = L.icon({
                iconAnchor: properties.iconAnchor,
                iconUrl: properties.icon
            });

            marker = L.marker([properties.lat, properties.lon], {
                icon: markerIcon
            });
        } else {
            marker = L.marker([properties.lat, properties.lon]);
        }

        if (properties.label !== null) {
            marker.bindTooltip(properties.label, {
                permanent: false,
                direction: 'center',
                offset: L.point(properties.labelOffset[0], properties.labelOffset[1])
            });
        }

        let name = properties.hasOwnProperty("name") && properties.name != null ? properties.name : "";
        let desc = properties.hasOwnProperty("description") && properties.description != null ? properties.description : "";
        if (name.length > 0 || desc.length > 0) {
            marker.bindPopup(name + '<div>' + desc + '</div>');
        }

        // OOT Modifications
        marker.bubblingMouseEvents = false;
        // marker.on('click', (evt)=>{
        //     alert(`Clicked on marker ${name}`);
        // });
        console.log(properties);
        if (properties.hasOwnProperty('contextMenuFunction') && properties.contextMenuFunction !== undefined) {
            console.log('Adding Context Menu Function');
            let ctxtMFunc = properties.contextMenuFunction.handler.bind(this);
            // this.ctxtMFunc = properties.contextMenuFunction;
            marker.on('contextmenu', (evt) => {
                // alert(`Clicked on marker ${name}`);
                // properties.contextMenuFunction.handler();
                ctxtMFunc(evt);
            });
        }
        // END OOT Mods

        marker.addTo(this.map);
        marker.setRotationAngle(properties.orientation);

        let id = "view-marker-" + randomUUID();
        this.markers[id] = marker;
        let self = this;

        marker._icon.id = id;

        // adds onclick event
        marker.on('click', function () {
            let dataSourcesIds = [];
            let entityId;
            for (let stylerId in self.stylerToObj) {
                if (self.stylerToObj[stylerId] === id) {
                    let styler = self.stylerIdToStyler[stylerId];
                    EventManager.fire(EventManager.EVENT.SELECT_VIEW, {
                        dataSourcesIds: dataSourcesIds.concat(styler.getDataSourcesIds()),
                        entityId: styler.viewItem.entityId
                    });
                    break;
                }
            }
        });
        return id;
    }

    removeViewItem(viewItem) {
        const markerId = this.stylerToObj[viewItem.styler.id];
        super.removeViewItem(viewItem);
        if (isDefined(markerId)) {
            let marker = this.markers[markerId];
            if (isDefined(marker)) {
                this.map.removeLayer(marker);
            }

            delete this.markers[markerId];
        }
    }

    /**
     * Add a polyline to the map.
     * @param {Object} properties
     * @param {Object[]} properties.locations - [{x, y}]
     * @param {String} properties.color
     * @param {Number} properties.weight
     * @param {Number} properties.opacity
     * * @param {Number} properties.smoothFactor
     * @return {string} the id of the new created polyline
     */
    addPolyline(properties) {
        let polylinePoints = [];

        for (let i = 0; i < properties.locations.length; i++) {
            polylinePoints.push(new L.LatLng(properties.locations[i].y, properties.locations[i].x));
        }

        //create path
        let polyline = new L.Polyline(polylinePoints, {
            color: properties.color,
            weight: properties.weight,
            opacity: properties.opacity,
            smoothFactor: properties.smoothFactor
        }).addTo(this.map);

        let id = "view-polyline-" + randomUUID();
        this.polylines[id] = polyline;

        return id;
    }

    /**
     * Updates the marker associated to the styler.
     * @param {PointMarker} styler - The styler allowing the update of the marker
     */
    updateMarker(styler) {
        let markerId = 0;
        if (!(styler.getId() in this.stylerToObj)) {
            // adds a new marker to the leaflet renderer
            markerId = this.addMarker({
                lat: styler.location.y,
                lon: styler.location.x,
                orientation: styler.orientation.heading,
                color: styler.color,
                icon: styler.icon,
                iconAnchor: styler.iconAnchor,
                label: styler.label,
                labelColor: styler.labelColor,
                labelSize: styler.labelSize,
                labelOffset: styler.labelOffset,
                name: styler.viewItem.name,
                description: styler.viewItem.description,
                contextMenuFunction: styler.contextMenuFunction
            });
            this.stylerToObj[styler.getId()] = markerId;
        } else {
            markerId = this.stylerToObj[styler.getId()];
        }

        let marker = this.markers[markerId];
        // updates position
        let lon = styler.location.x;
        let lat = styler.location.y;

        if (!isNaN(lon) && !isNaN(lat)) {
            let newLatLng = new L.LatLng(lat, lon);
            marker.setLatLng(newLatLng);
            if ((this.first && this.autoZoomOnFirstMarker) || this.follow) {
                const markerBounds = L.latLngBounds([newLatLng]);
                this.map.fitBounds(markerBounds, {
                    maxZoom: styler.zoomLevel
                });
                if (this.first) {
                    this.first = false;
                }
            }
        }


        // updates orientation
        if (isDefined(styler.orientation)) {
            marker.setRotationAngle(styler.orientation.heading);
        }

        if (styler.icon !== null && marker._icon.iconUrl !== styler.icon) {
            // updates icon
            let markerIcon = L.icon({
                iconAnchor: styler.iconAnchor,
                iconUrl: styler.icon
            });
            marker.setIcon(markerIcon);
        }
    }

    /**
     * Updates the polyline associated to the styler.
     * @param {Polyline} styler - The styler allowing the update of the polyline
     */
    updatePolyline(styler) {
        let polylineId = 0;

        if (!(styler.getId() in this.stylerToObj)) {
            // adds a new marker to the leaflet renderer
            polylineId = this.addPolyline({
                color: styler.color,
                weight: styler.weight,
                locations: styler.locations,
                maxPoints: styler.maxPoints,
                opacity: styler.opacity,
                smoothFactor: styler.smoothFactor
            });

            this.stylerToObj[styler.getId()] = polylineId;
        } else {
            polylineId = this.stylerToObj[styler.getId()];
        }

        if (polylineId in this.polylines) {
            let polyline = this.polylines[polylineId];

            // removes the layer
            this.map.removeLayer(polyline);

            let polylinePoints = [];
            for (let i = 0; i < styler.locations.length; i++) {
                polylinePoints.push(new L.LatLng(styler.locations[i].y, styler.locations[i].x));
            }

            //create path
            polyline = new L.Polyline(polylinePoints, {
                color: styler.color,
                weight: styler.weight,
                opacity: styler.opacity,
                smoothFactor: styler.smoothFactor
            }).addTo(this.map);

            this.polylines[polylineId] = polyline;
        }
    }

    attachTo(parentElement) {
        super.attachTo(parentElement);
        // Fix leaflet bug when resizing the div parent container
        this.map.invalidateSize();
    }

    onResize() {
        super.onResize();
        let that = this;
        setTimeout(function () {
            that.map.invalidateSize()
        }, 100);

    }

    onChange(data) {
    }


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

export default LeafletView;
