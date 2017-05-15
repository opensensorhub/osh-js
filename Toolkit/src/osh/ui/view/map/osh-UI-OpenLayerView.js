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

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 */
OSH.UI.OpenLayerView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, viewItems, options) {
        this._super(parentElementDivId, viewItems, options);
        this.onResize();
    },

    /**
     *
     * @param $super
     * @param options
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    beforeAddingItems: function (options) {
        // inits the map
        this.initMap(options);

        //events will NOT automatically be added to the map, if one is provided by the user
        if(typeof(options) == "undefined" || !options.map)
            this.initEvents();
    },


    /**
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    initEvents: function () {
        // removes default right click
        document.getElementById(this.divId).oncontextmenu = function (e) {
            var evt = new Object({keyCode: 93});
            if (e.preventDefault != undefined)
                e.preventDefault();
            if (e.stopPropagation != undefined)
                e.stopPropagation();
        };

        var self = this;

        this.map.getViewport().addEventListener('contextmenu', function (e) {
            e.preventDefault();

            var feature = self.map.forEachFeatureAtPixel(self.map.getEventPixel(e),
                function (feature, layer) {
                    return feature;
                });
            if (feature) {
                var id = feature.ha;

                // gets the corresponding styler
                for(var stylerId in self.stylerToObj) {
                    if(self.stylerToObj[stylerId] == id) {
                        OSH.EventManager.fire(OSH.EventManager.EVENT.CONTEXT_MENU+"-"+self.stylerIdToStyler[stylerId].viewItem.contextMenuId,{
                            //TODO: values have to be provided by properties
                            offsetX: -70,
                            offsetY: -70,
                            action : "show",
                            x:OSH.Utils.getXCursorPosition(),
                            y:OSH.Utils.getYCursorPosition()
                        });
                        break;
                    }
                }
            }
        });

        this.map.on("click", function(e) {
            self.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                var id = feature.ha;
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
        });
    },

    /**
     *
     * @param styler
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    updateMarker: function (styler) {
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

            this.stylerToObj[styler.getId()] = markerId;
        } else {
            markerId = this.stylerToObj[styler.getId()];
        }

        var markerFeature = this.markers[markerId];
        // updates position
        var lon = styler.location.x;
        var lat = styler.location.y;

        if (!isNaN(lon) && !isNaN(lat)) {
            var coordinates = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:900913');
            markerFeature.getGeometry().setCoordinates(coordinates);
        }

        // updates orientation
        if (styler.icon != null) {
            // updates icon
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(({
                    opacity: 0.75,
                    src: styler.icon,
                    rotation: styler.orientation.heading * Math.PI / 180
                }))
            });
            markerFeature.setStyle(iconStyle);
        }
    },

    /**
     *
     * @param styler
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
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
                smoothFactor: styler.smoothFactor,
                name: this.names[styler.getId()]
            });

            this.stylerToObj[styler.getId()] = polylineId;
        } else {
            polylineId = this.stylerToObj[styler.getId()];
        }

        //TODO: handle opacity, smoothFactor, color and weight
        if (polylineId in this.polylines) {
            var geometry = this.polylines[polylineId];

            var polylinePoints = [];
            for (var i = 0; i < styler.locations.length; i++) {
                polylinePoints.push(ol.proj.transform([styler.locations[i].x, styler.locations[i].y], 'EPSG:4326', 'EPSG:900913'))
            }

            geometry.setCoordinates(polylinePoints);
        }
    },

    //---------- MAP SETUP --------------//
    /**
     *
     * @param options
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    initMap: function (options) {

        var initialView = null;
        this.first = true;
        var overlays = [];
        var defaultLayer = null;
        this.markers = {};
        this.polylines = {};

        var baseLayers = this.getDefaultLayers();

        if (typeof(options) != "undefined") {
            var maxZoom = 19;

            //if the user passed in a map then use that one, don't make a new one
            if(options.map) {
                this.map = options.map;
                return;
            }

            if (options.maxZoom) {
                maxZoom = options.maxZoom;
            }
            if (options.initialView) {
                initialView = new ol.View({
                    center: ol.proj.transform([options.initialView.lon, options.initialView.lat], 'EPSG:4326', 'EPSG:900913'),
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

            // checks defaultLayer
            if (options.defaultLayer) {
                defaultLayer = options.defaultLayer;
            }
        } else {
            // loads the default one
            initialView = new ol.View({
                center: ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:900913'),
                zoom: 11,
                maxZoom: maxZoom
            });
        }

        // sets layers to map
        //create map
        this.map = new ol.Map({
            target: this.divId,
            controls: ol.control.defaults({
                attributionOptions: ({
                    collapsible: false
                })
            }).extend([
                new ol.control.ZoomSlider(),
                new ol.control.Rotate(),
                new ol.control.ScaleLine(),
            ]),
            // interactions and controls are seperate entities in ol3
            // we extend the default navigation with a hover select interaction
            interactions: ol.interaction.defaults().extend([
                new ol.interaction.Select({
                    condition: ol.events.condition.mouseMove
                })
            ]),
            layers: [
                new ol.layer.Group({
                    'title': 'Base maps',
                    layers: baseLayers
                }),
                new ol.layer.Group({
                    title: 'Overlays',
                    layers: overlays
                })
            ],
            view: initialView,

        });

        var layerSwitcher = new ol.control.LayerSwitcher({
            tipLabel: 'Layers' // Optional label for button
        });

        this.map.addControl(layerSwitcher);

        // inits onClick events
        var select_interaction = new ol.interaction.Select();

        var self = this;
        select_interaction.getFeatures().on("add", function (e) {
            var feature = e.element; //the feature selected
            var dataSourcesIds = [];
            var entityId;
            for (var stylerId in self.stylerToObj) {
                if (self.stylerToObj[stylerId] == feature.getId()) {
                    var styler = self.stylerIdToStyler[stylerId];
                    OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW,{
                        dataSourcesIds: dataSourcesIds.concat(styler.getDataSourcesIds()),
                        entityId : styler.viewItem.entityId
                    });
                    break;
                }
            }
        });

        this.map.addInteraction(select_interaction);
    },

    /**
     *
     * @returns {Object}
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    getDefaultBaseLayers: function () {
        return {};
    },


    /**
     *
     * @returns {Array}
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    getDefaultLayers: function () {
        var osm = new ol.layer.Tile({
            title: 'OSM',
            type: 'base',
            visible: true,
            source: new ol.source.OSM()
        });
        return [osm];
    },

    /**
     *
     * @param properties
     * @returns {string}
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    addMarker: function (properties) {
        //create marker
        var marker = new ol.geom.Point(ol.proj.transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
        var markerFeature = new ol.Feature({
            geometry: marker,
            name: 'Marker' //TODO
        });

        if (properties.icon != null) {
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(({
                    opacity: 0.75,
                    src: properties.icon,
                    rotation: properties.orientation * Math.PI / 180
                }))
            });
            markerFeature.setStyle(iconStyle);
        }


        //TODO:for selected marker event
        //this.marker.on('click',this.onClick.bind(this));
        var vectorMarkerLayer =
            new ol.layer.Vector({
                title: properties.name,
                source: new ol.source.Vector({
                    features: [markerFeature]
                })
            });

        this.map.addLayer(vectorMarkerLayer);

        var id = "view-marker-" + OSH.Utils.randomUUID();
        markerFeature.setId(id);
        this.markers[id] = markerFeature;

        if (this.first) {
            this.first = false;
            this.map.getView().setCenter(ol.proj.transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
            this.map.getView().setZoom(19);
        }

        return id;
    },

    /**
     *
     * @param styler
     * @returns {string} the id of the newly created marker, or the id of the marker if it already exists from the current styler
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    createMarkerFromStyler: function (styler) {
        //This method is intended to create a marker object only for the OpenLayerView. It does not actually add it
        //to the view or map to give the user more control
        if (!(styler.getId() in this.stylerToObj)) {

            var properties = {
                lat: styler.location.y,
                lon: styler.location.x,
                orientation: styler.orientation.heading,
                color: styler.color,
                icon: styler.icon,
                name: this.names[styler.getId()]
            }

            //create marker
            var marker = new ol.geom.Point(ol.proj.transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
            var markerFeature = new ol.Feature({
                geometry: marker,
                name: 'Marker' //TODO
            });

            if (properties.icon != null) {
                var iconStyle = new ol.style.Style({
                    image: new ol.style.Icon({
                        opacity: 0.75,
                        src: properties.icon,
                        rotation: properties.orientation * Math.PI / 180
                    })
                });
                markerFeature.setStyle(iconStyle);
            }
            var id = "view-marker-" + OSH.Utils.randomUUID();
            markerFeature.setId(id);
            this.markers[id] = markerFeature;
            this.stylerToObj[styler.getId()] = id;
            return id;

        } else {
            return this.stylerToObj[styler.getId()];
        }
    },


    /**
     *
     * @param properties
     * @returns {string}
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    addPolyline: function (properties) {
        var polylinePoints = [];

        for (var i = 0; i < properties.locations.length; i++) {
            polylinePoints.push(ol.proj.transform([properties.locations[i].x, properties.locations[i].y], 'EPSG:4326', 'EPSG:900913'))
        }

        //create path
        var pathGeometry = new ol.geom.LineString(polylinePoints);
        var feature = new ol.Feature({
            geometry: pathGeometry,
            name: 'Line'
        });
        var source = new ol.source.Vector({
            features: [feature]
        });

        var vectorPathLayer = new ol.layer.Vector({
            title: properties.name,
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: properties.color
                }),
                stroke: new ol.style.Stroke({
                    color: properties.color,
                    width: properties.weight
                })
            })
        });

        this.map.addLayer(vectorPathLayer);
        var id = "view-polyline-" + OSH.Utils.randomUUID();
        this.polylines[id] = pathGeometry;

        return id;
    },

    /**
     *
     * @param $super
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    onResize:function($super) {
        this._super();
        this.map.updateSize();
    },
});