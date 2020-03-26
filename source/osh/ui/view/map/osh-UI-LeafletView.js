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

import {View} from "../osh-UI-View.js";
import {isDefined} from "../../../osh-Utils.js";
import {randomUUID} from "../../../osh-Utils.js";
import EventManager from "../../../osh-EventManager.js";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
 let leafletMapView = new OSH.UI.LeafletView("",
 [{
            styler :  pointMarker,
            contextMenuId: circularContextMenuId,
            name : "Android Phone GPS",
            entityId : androidEntity.id
        },
 {
     styler : new OSH.UI.Styler.Polyline({
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
export default class LeafletView extends View {
    constructor(parentElementDivId, viewItems, options) {
        super(parentElementDivId, viewItems, options);

        let cssClass = document.getElementById(this.divId).className;
        document.getElementById(this.divId).setAttribute("class", cssClass+" "+this.css);
    }

    /**
     *
     * @param $super
     * @param options
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    beforeAddingItems(options) {
        // inits the map
        this.initMap(options);
        this.initEvents();
    }

    /**
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    initEvents() {
        // removes default right click
        document.getElementById(this.divId).oncontextmenu = (e) => {
            let evt = new Object({keyCode: 93});
            if (isDefined(e.preventDefault)) {
                e.preventDefault();
            }
            if (isDefined(e.stopPropagation)) {
                e.stopPropagation();
            }
        };
    }

    //---------- MAP SETUP --------------//
    /**
     *
     * @param options
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    initMap(options) {
        let initialView = {
            location: new L.LatLng(0, 0),
            zoom: 3
        };
        this.first = true;
        this.watch = false;
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
            if (!isDefined(options.autoZoomOnFirstMarker)) {
                this.first = false;
            }

            if(isDefined(options.watch)) {
                this.watch = options.watch;
            }
            // checks overlayers
            if (isDefined(options.overlayLayers)) {
                overlays = options.overlayLayers;
            }

            // checks baseLayer
            if (isDefined(options.baseLayers)) {
                baseLayers = options.baseLayers;
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
     *
     * @returns {{}}
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    getDefaultBaseLayers() {
        return {};
    }

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
     * @instance
     * @memberof OSH.UI.LeafletView
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

    //---------- FEATURES SETUP --------------//
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
                permanent: true,
                direction: 'center',
                offset: point(properties.labelOffset[0], properties.labelOffset[1])
            });
        }

        let name = properties.hasOwnProperty("name") && properties.name != null ? properties.name : "";
        let desc = properties.hasOwnProperty("description") && properties.description != null ? properties.description : "";
        if (name.length > 0 || desc.length > 0) {
            marker.bindPopup(name + '<div>' + desc + '</div>');
        }

        marker.addTo(this.map);
        marker.setRotationAngle(properties.orientation);

        let id = "view-marker-" + randomUUID();
        this.markers[id] = marker;

        if (this.first === true) {
          this.map.setView(new L.LatLng(properties.lat, properties.lon), 19);
          this.first = false;
        }
        let self = this;

        marker._icon.id = id;

        // adds onclick event
        marker.on('click', function () {
            let dataSourcesIds = [];
            let entityId;
            for (let stylerId in self.stylerToObj) {
                if (self.stylerToObj[stylerId] === id) {
                    let styler = self.stylerIdToStyler[stylerId];
                    EventManager.fire(EventManager.EVENT.SELECT_VIEW,{
                        dataSourcesIds: dataSourcesIds.concat(styler.getDataSourcesIds()),
                        entityId : styler.viewItem.entityId
                    });
                    break;
                }
            }
        });

        document.getElementById(id).oncontextmenu = function (e) {
            let evt = new Object({keyCode: 93});

            if (isDefined(e.preventDefault)) {
                e.preventDefault();
            }
            if (isDefined(e.stopPropagation)) {
                e.stopPropagation();
            }

            // gets the corresponding styler
            for(let stylerId in self.stylerToObj) {
                if(self.stylerToObj[stylerId] === id) {
                    EventManager.fire(EventManager.EVENT.CONTEXT_MENU+"-"+self.stylerIdToStyler[stylerId].viewItem.contextMenuId,{
                        //TODO: values have to be provided by properties
                        offsetX: -70,
                        offsetY: -70,
                        action : "show",
                        x:OSH.Utils.getXCursorPosition(),
                        y:OSH.Utils.getYCursorPosition(),
                        drawLineTo:id
                    });
                    break;
                }
            }
        };
        return id;
    }

    /**
     *
     * @param properties
     * @returns {string}
     * @instance
     * @memberof OSH.UI.LeafletView
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
     *
     * @param styler
     * @instance
     * @memberof OSH.UI.LeafletView
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
                label : styler.label,
                labelColor : styler.labelColor,
                labelSize : styler.labelSize,
                labelOffset : styler.labelOffset,
                name : styler.viewItem.name,
				description : styler.viewItem.description
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
            if(this.watch) {
                this.map.panTo(newLatLng);
            }
        }


        // updates orientation
        if(isDefined(styler.orientation)) {
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
     *
     * @param styler
     * @instance
     * @memberof OSH.UI.LeafletView
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

    /**
     *
     * @param parentElement
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    attachTo(parentElement) {
        super.attachTo(parentElement);
        // Fix leaflet bug when resizing the div parent container
        this.map.invalidateSize();
    }

    /**
     *
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    onResize() {
        super.onResize();
        this.map.invalidateSize();
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
