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

import View from "../View";
import {isDefined, randomUUID} from "../../../utils/Utils";
import EventManager from "../../../events/EventManager";
import 'ol/css.js';
import 'ol/ol.css';
import {Map, View as OlView} from 'ol';
import TileLayer from 'ol/layer/Tile.js';
import {Group} from "ol/layer.js";
import {transform} from "ol/proj.js";
import {defaults as defaultInteractions, DragRotateAndZoom} from 'ol/interaction.js';
import {defaults as defaultControls, FullScreen} from 'ol/control.js';
import {ZoomSlider} from 'ol/control.js';
import VectorSource from "ol/source/Vector.js";
import VectorLayer from "ol/layer/Vector.js";
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import {Icon, Style} from 'ol/style.js';
import Select from "ol/interaction/Select";
import OSM from "ol/source/OSM";

/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the OpenLayer Map object.
 * @extends View
 */
class OpenLayerView extends View {
    /**
     * Create a View.
     * @param {String} parentElementDivId - The div element to attach to
     * @param {Object[]} viewItems - The initial view items to add
     * @param {String} viewItems.name - The name of the view item
     * @param {Styler} viewItems.styler - The styler object representing the view item
     * @param {Object} options - the properties of the view
     * @param {Object} options.map - the map object to use
     * @param {Integer} [options.zoom=11]
     * @param {Integer} [options.maxZoom=19]
     * @param {Boolean} options.autoZoomOnFirstMarker - auto zoom on the first added marker
     * @param {Object} options.initialView - {lon:.., lat:..}
     * @param {Object[]} options.overlayLayers - OpenLayers objects to use as overlay layer
     * @param {Object[]} options.baseLayers - OpenLayers objects to use as base layer
     *
     */
    constructor(parentElementDivId, viewItems, options) {
        super(parentElementDivId, viewItems, options);
    }

    beforeAddingItems(options) {
        // inits the map
        this.initMap(options);
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
                anchor: styler.iconAnchor,
                name: this.names[styler.getId()]
            });

            this.stylerToObj[styler.getId()] = markerId;
        } else {
            markerId = this.stylerToObj[styler.getId()];
        }

        let markerFeature = this.markers[markerId];
        // updates position
        let lon = styler.location.x;
        let lat = styler.location.y;

        if (!isNaN(lon) && !isNaN(lat)) {
            let coordinates = transform([lon, lat], 'EPSG:4326', 'EPSG:900913');
            markerFeature.getGeometry().setCoordinates(coordinates);
        }

        // updates orientation
        if (styler.icon !== null) {
            // updates icon
            let iconStyle = new Style({
                image: new Icon({
                    opacity: 0.75,
                    anchor: styler.iconAnchor,
                    anchorYUnits: 'pixels',
                    anchorXUnits: 'pixels',
                    src: styler.icon,
                    rotation: styler.orientation.heading * Math.PI / 180
                })
            });
            markerFeature.setStyle(iconStyle);
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
                smoothFactor: styler.smoothFactor,
                name: this.names[styler.getId()]
            });

            this.stylerToObj[styler.getId()] = polylineId;
        } else {
            polylineId = this.stylerToObj[styler.getId()];
        }

        //TODO: handle opacity, smoothFactor, color and weight
        if (polylineId in this.polylines) {
            let geometry = this.polylines[polylineId];

            let polylinePoints = [];
            for (let i = 0; i < styler.locations.length; i++) {
                polylinePoints.push(transform([styler.locations[i].x, styler.locations[i].y], 'EPSG:4326', 'EPSG:900913'))
            }

            geometry.setCoordinates(polylinePoints);
        }
    }

    //---------- MAP SETUP --------------//
    /**
     * @private
     */
    initMap(options) {

        this.map = null;
        let initialView = null;
        this.first = true;
        let overlays = [];
        this.markers = {};
        this.polylines = {};

        let baseLayers = this.getDefaultLayers();
        let maxZoom = 19;

        if (isDefined(options)) {

            //if the user passed in a map then use that one, don't make a new one
            if(options.map) {
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
        } else {
            // loads the default one
            initialView = new OlView({
                center: transform([0, 0], 'EPSG:4326', 'EPSG:900913'),
                zoom: 11,
                maxZoom: maxZoom
            });

        }

        // sets layers to map
        //create map
       this.map = new Map({
            target: this.divId,
            controls: defaultControls().extend([
                new FullScreen()
            ]),
           interactions: defaultInteractions().extend([
               new DragRotateAndZoom()
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

        this.map.addControl( new ZoomSlider());

        // inits onClick events
        let select_interaction = new Select();

        let self = this;
        select_interaction.getFeatures().on("add", function (e) {
            let feature = e.element; //the feature selected
            let dataSourcesIds = [];
            let entityId;
            for (let stylerId in self.stylerToObj) {
                if (self.stylerToObj[stylerId] === feature.getId()) {
                    let styler = self.stylerIdToStyler[stylerId];
                    EventManager.fire(EventManager.EVENT.SELECT_VIEW,{
                        dataSourcesIds: dataSourcesIds.concat(styler.getDataSourcesIds()),
                        entityId : styler.viewItem.entityId
                    });
                    break;
                }
            }
        });

        this.map.addInteraction(select_interaction);
        this.map.updateSize();
    }

    /**
     * Gets the list of default layers.
     * @return {Array}
     */
    getDefaultLayers() {
        let osm = new TileLayer({
            source: new OSM()
        });
        return [osm];
    }

    /**
     * Add a marker to the map.
     * @param {Object} properties
     * @param {Number} properties.lon
     * @param {Number} properties.lat
     * @param {String} properties.icon - path of the icon
     * @param {Number} properties.orientation - orientation in degree
     * @return {String} the id of the new created marker
     */
    addMarker(properties) {
        //create marker
        if(isDefined(this.map) &&  this.map !== null) {
            let marker = new Point(transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
            let markerFeature = new Feature({
                geometry: marker,
                name: 'Marker' //TODO
            });

            let style = {
                symbol: {
                    symbolType: 'image',
                    size: [16, 16],
                    color: 'lightyellow',
                    rotateWithView: false,
                    offset: [0, 9]
                }
            };

            if (isDefined(properties.icon) && properties.icon !== null) {
                let iconStyle = new Style({
                    image: new Icon({
                        opacity: 0.75,
                        src: properties.icon,
                        rotation: properties.orientation * Math.PI / 180
                    }),
                });
                markerFeature.setStyle(iconStyle);
            }

            let source = new VectorSource({
                wrapX: false,
                features: [markerFeature]
            });

            let vectorMarkerLayer = new VectorLayer({
                source: source,
            });

            this.map.addLayer(vectorMarkerLayer);

            let id = "view-marker-" + randomUUID();
            markerFeature.setId(id);
            this.markers[id] = markerFeature;

            if (this.first) {
                this.first = false;
                this.map.getView().setCenter(transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
                this.map.getView().setZoom(19);
            }

            return id;
        }
        this.onResize();
        //TODO: exception
        return null;
    }

    /**
     *
     * @private
     * @param styler
     * @return {string} the id of the newly created marker, or the id of the marker if it already exists from the current styler
     */
    createMarkerFromStyler(styler) {
        //This method is intended to create a marker object only for the OpenLayerView. It does not actually add it
        //to the view or map to give the user more control
        if (!(styler.getId() in this.stylerToObj)) {

            let properties = {
                lat: styler.location.y,
                lon: styler.location.x,
                orientation: styler.orientation.heading,
                color: styler.color,
                icon: styler.icon,
                name: this.names[styler.getId()]
            }

            //create marker
            let marker = new Point(transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
            let markerFeature = new Feature({
                geometry: marker,
                name: 'Marker' //TODO
            });

            if (properties.icon !== null) {
                let iconStyle = new Style({
                    image: new Icon({
                        opacity: 0.75,
                        src: properties.icon,
                        rotation: properties.orientation * Math.PI / 180
                    })
                });
                markerFeature.setStyle(iconStyle);
            }
            let id = "view-marker-" + randomUUID();
            markerFeature.setId(id);
            this.markers[id] = markerFeature;
            this.stylerToObj[styler.getId()] = id;
            return id;

        } else {
            return this.stylerToObj[styler.getId()];
        }
    }


    /**
     * Add a polyline to the map.
     * @param {Object} properties
     * @param {Object[]} properties.locations - [{x, y}]
     * @param {String} properties.color
     * @param {Number} properties.weight
     * @param {String} properties.name
     * @return {string} the id of the new created polyline
     */
    addPolyline(properties) {
        let polylinePoints = [];

        for (let i = 0; i < properties.locations.length; i++) {
            polylinePoints.push(transform([properties.locations[i].x, properties.locations[i].y], 'EPSG:4326', 'EPSG:900913'))
        }

        //create path
        let pathGeometry = new LineString(polylinePoints);
        let feature = new Feature({
            geometry: pathGeometry,
            name: 'Line'
        });
        let source = new VectorSource({
            features: [feature]
        });

        let vectorPathLayer = new VectorLayer({
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
        let id = "view-polyline-" + randomUUID();
        this.polylines[id] = pathGeometry;

        return id;
    }

    onResize() {
        super.onResize();
        if(isDefined(this.map) && this.map !== null) {
            this.map.updateSize();
        }
    }
}

export default  OpenLayerView;
