OSH.UI.LeafletView = Class.create(OSH.UI.View, {
    initialize: function ($super, divId, viewItems, options) {
        $super(divId, viewItems, options);
    },

    beforeAddingItems: function ($super, options) {
        // inits the map
        this.initMap(options);
        this.initEvents();
    },

    initEvents: function () {
        // removes default right click
        document.getElementById(this.divId).oncontextmenu = function (e) {
            var evt = new Object({keyCode: 93});
            if (e.preventDefault != undefined)
                e.preventDefault();
            if (e.stopPropagation != undefined)
                e.stopPropagation();
        };
    },

    //---------- MAP SETUP --------------//
    initMap: function (options) {

        var initialView = {
            location: new L.LatLng(0, 0),
            zoom: 3
        };
        this.first = true;
        var defaultLayers = this.getDefaultLayers();

        var defaultLayer = defaultLayers[0].layer;

        var baseLayers = {};
        var overlays = {};

        baseLayers[defaultLayers[0].name] = defaultLayers[0].layer;
        overlays[defaultLayers[1].name] = defaultLayers[1].layer;

        if (typeof(options) != "undefined") {
            if (options.initialView) {
                initialView = {
                    location: new L.LatLng(options.initialView.lat, options.initialView.lon),
                    zoom: options.initialView.zoom
                }
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

            // checks defaultLayer
            if (options.defaultLayer) {
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
    },

    getDefaultBaseLayers: function () {
        return {};
    },

    getDefaultLayers: function (options) {
        var maxZoom = 22;
        if (typeof(options) != "undefined" && options.maxZoom) {
            maxZoom = options.maxZoom;
        }
        // copyrights
        var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

        var esriLink = '<a href="http://www.esri.com/">Esri</a>';
        var esriWholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';

        // leaflet layers
        var esriLayer = L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: '&copy; ' + esriLink + ', ' + esriWholink,
                maxZoom: maxZoom,
            });

        var streets = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr, maxZoom: maxZoom});

        return [{
            name: "MapBox Streets",
            layer: streets
        }, {
            name: "Esri Satellite",
            layer: esriLayer
        }];
    },

    initLayers: function () {
        // create the tile layer with correct attribution
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new L.tileLayer(osmUrl, {
            minZoom: 1,
            maxZoom: 22,
            attribution: osmAttrib
        });
        this.map.addLayer(osm);
    },

    //---------- FEATURES SETUP --------------//
    addMarker: function (properties) {
        //create marker
        var marker = null;
        if (properties.icon != null) {
            var markerIcon = L.icon({
                iconAnchor: [16, 16],
                iconUrl: properties.icon
            });

            marker = L.marker([properties.lat, properties.lon], {
                icon: markerIcon
            });
        } else {
            marker = L.marker([properties.lat, properties.lon]);
        }

        marker.bindPopup(properties.name);

        //TODO:for selected marker event
        //this.marker.on('click',this.onClick.bind(this));

        marker.addTo(this.map);
        marker.setRotationAngle(properties.orientation);

        var id = "view-marker-" + OSH.Utils.randomUUID();
        this.markers[id] = marker;

        if (this.first) {
            this.first = false;
            this.map.setView(new L.LatLng(properties.lat, properties.lon), 19);
        }
        var self = this;

        // adds onclick event
        marker.on('click', function () {
            var dataSourcesIds = [];
            var entityId;
            for (var stylerId in self.stylerToObj) {
                if (self.stylerToObj[stylerId] == id) {
                    var styler = self.stylerIdToStyler[stylerId];
                    OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW,{
                        dataSourcesIds: dataSourcesIds.concat(styler.getDataSourcesIds()),
                        entityId : styler.viewItem.entityId
                    });
                    break;
                }
            }
        });

        marker._icon.id = id;

        return id;
    },

    addPolyline: function (properties) {
        var polylinePoints = [];

        for (var i = 0; i < properties.locations.length; i++) {
            polylinePoints.push(new L.LatLng(properties.locations[i].y, properties.locations[i].x));
        }

        //create path
        var polyline = new L.Polyline(polylinePoints, {
            color: properties.color,
            weight: properties.weight,
            opacity: properties.opacity,
            smoothFactor: properties.smoothFactor
        }).addTo(this.map);

        var id = "view-polyline-" + OSH.Utils.randomUUID();
        this.polylines[id] = polyline;

        return id;
    },

    updateMarker: function (styler, contextmenu) {
        var markerId = 0;
        if (!(styler.getId() in this.stylerToObj)) {
            // adds a new marker to the leaflet renderer
            markerId = this.addMarker({
                lat: styler.location.y,
                lon: styler.location.x,
                orientation: styler.orientation.heading,
                color: styler.color,
                icon: styler.icon,
                name: this.names[styler.getId()]
            });

            // TODO: debugging
            // gets contextmenu
            for (var i in this.viewItems) {
                if (this.viewItems[i].styler.getId() == styler.getId()) {
                    if (typeof(this.viewItems[i].contextMenuId) != "undefined") {
                        // overrides default right click
                        $(markerId).oncontextmenu = function (e) {
                            var evt = new Object({keyCode: 93});

                            if (e.preventDefault != undefined)
                                e.preventDefault();
                            if (e.stopPropagation != undefined)
                                e.stopPropagation();

                            OSH.EventManager.fire(OSH.EventManager.EVENT.CONTEXT_MENU+"-"+this.viewItems[i].contextMenuId,{
                                //TODO: values have to be provided by properties
                                offsetX: -70,
                                offsetY: -70,
                                action : "show",
                                x:OSH.Utils.getXCursorPosition(),
                                y:OSH.Utils.getYCursorPosition()
                            });
                        }.bind(this);
                    }
                    break;
                }
            }
            //END debugging
            this.stylerToObj[styler.getId()] = markerId;
        } else {
            markerId = this.stylerToObj[styler.getId()];
        }

        var marker = this.markers[markerId];
        // updates position
        var lon = styler.location.x;
        var lat = styler.location.y;

        if (!isNaN(lon) && !isNaN(lat)) {
            var newLatLng = new L.LatLng(lat, lon);
            marker.setLatLng(newLatLng);
        }


        // updates orientation
        if(typeof styler.orientation != "undefined") {
            marker.setRotationAngle(styler.orientation.heading);
        }

        if (styler.icon != null && marker._icon.iconUrl != styler.icon) {
            // updates icon
            var markerIcon = L.icon({
                iconAnchor: [16, 16],
                iconUrl: styler.icon
            });
            marker.setIcon(markerIcon);
        }
    },

    updatePolyline: function (styler) {
        var polylineId = 0;

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
            var polyline = this.polylines[polylineId];

            // removes the layer
            this.map.removeLayer(polyline);

            var polylinePoints = [];
            for (var i = 0; i < styler.locations.length; i++) {
                polylinePoints.push(new L.LatLng(styler.locations[i].y, styler.locations[i].x));
            }

            //create path
            var polyline = new L.Polyline(polylinePoints, {
                color: styler.color,
                weight: styler.weight,
                opacity: styler.opacity,
                smoothFactor: styler.smoothFactor
            }).addTo(this.map);

            this.polylines[polylineId] = polyline;
        }
    }

});

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
