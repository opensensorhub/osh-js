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

import {View as OshView} from "../osh-UI-View.js";
import {isDefined} from "../../../osh-Utils.js";
import EventManager from "../../../osh-EventManager.js";
import {transform} from 'ol/proj.js';
import View from "ol/View.js";
import {defaults} from "ol/control.js";
import mouseMove from "ol/events/condition.js";
import Select from "ol/interaction/Select.js";
import {defaults as defaultInteraction} from "ol/interaction.js";
import {Group} from "ol/layer.js";
import Tile from "ol/Tile.js";
import OSM from "ol/source/OSM.js";
import {Point} from "ol/geom.js";
import Feature from "ol/Feature.js";
import {Vector as VectorLayer} from "ol/layer.js";
import {Vector as VectorSource} from "ol/source.js";
import {getXCursorPosition, getYCursorPosition, randomUUID} from "../../../osh-Utils.js";
import LineString from "ol/geom/LineString.js";
import Fill from "ol/style/Fill.js";
import ZoomSlider from "ol/control/ZoomSlider.js";
import Rotate from "ol/control/Rotate";
import ScaleLine from "ol/control/ScaleLine";
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import Style from 'ol/style/Style.js';
import  Icon from 'ol/style/Icon.js';
import LayerSwitcher from 'ol-layerswitcher/dist/ol-layerswitcher.js';

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 */
export default class OpenLayerView extends OshView {
    constructor(parentElementDivId, viewItems, options) {
        super(parentElementDivId, viewItems, options);
        this.onResize();
    }

    /**
     *
     * @param $super
     * @param options
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    beforeAddingItems(options) {
        // inits the map
        this.initMap(options);

        //events will NOT automatically be added to the map, if one is provided by the user
        // if(isDefined(options) || !options.map) {
        //     this.initEvents();
        // }
    }


    /**
     * @instance
     * @memberof OSH.UI.OpenLayerView
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

        let self = this;

        this.map.getViewport().addEventListener('contextmenu', (e) => {
            e.preventDefault();

            let feature = self.map.forEachFeatureAtPixel(self.map.getEventPixel(e),
                function (feature, layer) {
                    return feature;
                });
            if (feature) {
                let id = feature.ha;

                // gets the corresponding styler
                for(let stylerId in self.stylerToObj) {
                    if(self.stylerToObj[stylerId] === id) {
                        EventManager.fire(EventManager.EVENT.CONTEXT_MENU+"-"+self.stylerIdToStyler[stylerId].viewItem.contextMenuId,{
                            //TODO: values have to be provided by properties
                            offsetX: -70,
                            offsetY: -70,
                            action : "show",
                            x:getXCursorPosition(),
                            y:getYCursorPosition()
                        });
                        break;
                    }
                }
            }
        });

        this.map.on("click", (e) => {
            self.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                let id = feature.ha;
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
        });
    }

    /**
     *
     * @param styler
     * @instance
     * @memberof OSH.UI.OpenLayerView
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
                    src: styler.icon,
                    rotation: styler.orientation.heading * Math.PI / 180
                })
            });
            markerFeature.setStyle(iconStyle);
        }
    }

    /**
     *
     * @param styler
     * @instance
     * @memberof OSH.UI.OpenLayerView
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
     *
     * @param options
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    initMap(options) {

        let initialView = null;
        this.first = true;
        let overlays = [];
        let defaultLayer = null;
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
                initialView = new View({
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

            // checks defaultLayer
            if (options.defaultLayer) {
                defaultLayer = options.defaultLayer;
            }
        } else {
            // loads the default one
            initialView = new View({
                center: transform([0, 0], 'EPSG:4326', 'EPSG:900913'),
                zoom: 11,
                maxZoom: maxZoom
            });

        }

        console.log(initialView);
        // sets layers to map
        //create map
       this.map = new Map({
            target: this.divId,
            controls: defaults({
                attributionOptions: ({
                    collapsible: false
                })
            }).extend([
                new ZoomSlider(),
                new Rotate(),
                new ScaleLine(),
            ]),
            // interactions and controls are seperate entities in ol3
            // we extend the default navigation with a hover select interaction
            interactions: defaultInteraction().extend([
                new Select({
                    condition: mouseMove
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

        let layerSwitcher = new LayerSwitcher({
            tipLabel: 'Layers' // Optional label for button
        });

        this.map.addControl(layerSwitcher);

        // inits onClick events
        // let select_interaction = new Select();
        //
        // let self = this;
        // select_interaction.getFeatures().on("add", function (e) {
        //     let feature = e.element; //the feature selected
        //     let dataSourcesIds = [];
        //     let entityId;
        //     for (let stylerId in self.stylerToObj) {
        //         if (self.stylerToObj[stylerId] == feature.getId()) {
        //             let styler = self.stylerIdToStyler[stylerId];
        //             EventManager.fire(EventManager.EVENT.SELECT_VIEW,{
        //                 dataSourcesIds: dataSourcesIds.concat(styler.getDataSourcesIds()),
        //                 entityId : styler.viewItem.entityId
        //             });
        //             break;
        //         }
        //     }
        // });
        //
        // this.map.addInteraction(select_interaction);
    }

    /**
     *
     * @returns {Object}
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    getDefaultBaseLayers() {
        return {};
    }


    /**
     *
     * @returns {Array}
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    getDefaultLayers() {
        let osm = new Tile({
            title: 'OSM',
            type: 'base',
            visible: true,
            source: new OSM()
        });
        return [osm];
    }

    /**
     *
     * @param properties
     * @returns {string}
     * @instance
     * @memberof OSH.UI.OpenLayerView
     */
    addMarker(properties) {
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


        //TODO:for selected marker event
        //this.marker.on('click',this.onClick.bind(this));
        let vectorMarkerLayer =
            new VectorLayer({
                title: properties.name,
                source: new VectorSource({
                    features: [markerFeature]
                })
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

    /**
     *
     * @param styler
     * @returns {string} the id of the newly created marker, or the id of the marker if it already exists from the current styler
     * @instance
     * @memberof OSH.UI.OpenLayerView
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
     *
     * @param properties
     * @returns {string}
     * @instance
     * @memberof OSH.UI.OpenLayerView
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

    /**
     *
     * @instance
     * @memberof OSH.UI.LeafletView
     */
    onResize() {
        super.onResize();
        this.map.updateSize();
    }
}
