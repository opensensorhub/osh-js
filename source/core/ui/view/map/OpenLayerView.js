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

import {isDefined, randomUUID} from "../../../utils/Utils.js";
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
import {Icon, Style, Text} from 'ol/style.js';
import Select from "ol/interaction/Select";
import OSM from "ol/source/OSM";
import MouseWheelZoom from "ol/interaction/MouseWheelZoom";
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import MapView from "./MapView";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import LineString from "ol/geom/LineString";
import Polygon from "ol/geom/Polygon";
import {click, pointerMove} from "ol/events/condition";


/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the OpenLayer Map object.
 * @extends MapView
 */
class OpenLayerView extends MapView {
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
     * @param {Object[]} [properties.overlayLayers] - OpenLayers objects to use as overlay layer
     * @param {Object[]} [properties.baseLayers] - OpenLayers objects to use as base layer
     *
     */
    constructor(properties) {
        super({
            supportedLayers: ['marker', 'polyline','polygon'],
            ...properties
        });
    }

    beforeAddingItems(options) {
        // inits the map
        this.initMap(options);
    }


    /**
     * Updates the marker associated to the layer.
     * @param {PointMarkerLayer.props} props - The layer properties allowing the update of the marker
     */
    updateMarker(props) {
        let marker = this.getMarker(props);
        if (!isDefined(marker)) {
            // adds a new marker to the leaflet renderer
            const markerObj = this.addMarker(props);

            this.addMarkerToLayer(props, markerObj);
        }

        let markerFeature = this.getMarker(props);
        // updates position
        let lon = props.location.x;
        let lat = props.location.y;

        if (!isNaN(lon) && !isNaN(lat)) {
            let coordinates = transform([lon, lat], 'EPSG:4326', this.projection);
            markerFeature.getGeometry().setCoordinates(coordinates);
        }

        // updates orientation
        if (props.icon !== null) {
            // updates icon
            let iconStyle = new Style({
                image: new Icon({
                    opacity: 0.75,
                    anchor: props.iconAnchor,
                    anchorYUnits: 'pixels',
                    anchorXUnits: 'pixels',
                    src: props.icon,
                    rotation: props.orientation.heading * Math.PI / 180
                }),
                text: new Text({
                    text: props.label,
                    offsetX: props.labelOffset[0],
                    offsetY: props.labelOffset[1],
                }),
                zIndex: props.zIndex
            });
            markerFeature.setStyle(iconStyle);
        }
    }

    /**
     * Updates the polyline associated to the layer.
     * @param {PolylineLayer.properties} props - The layer allowing the update of the polyline
     */
    updatePolyline(props) {
        let polyline = this.getPolyline(props);
        if (!isDefined(polyline)) {
            // removes the layer
            polyline = this.addPolyline(props)
            this.addPolylineToLayer(props, polyline);
        } else {
            let vectorSource = polyline.getSource();

            // update locations
            let polylinePoints = [];
            const locations = props.locations[props.polylineId];

            if(isDefined(locations) && locations.length > 0) {
                for (let i = 0; i < locations.length; i++) {
                    polylinePoints.push(transform([locations[i].x, locations[i].y], 'EPSG:4326', this.projection))
                }
                vectorSource.getFeatures()[0].getGeometry().setCoordinates(polylinePoints)
            }

            // update style
            const style = polyline.getStyle();
            style.getStroke().setColor(props.color);
            style.getStroke().setWidth(props.weight);
            style.getFill().setColor(props.color);
        }
    }

    /**
     * Updates the polygon associated to the layer.
     * @param {Object} props - The layer allowing the update of the polygon
     */
    updatePolygon(props) {
        let polygon = this.getPolygon(props);
        if (!isDefined(polygon)) {
            // removes the layer
            polygon = this.addPolygon(props)
            this.addPolygonToLayer(props, polygon);
        } else {
            let vectorSource = polygon.getSource();

            // update locations
            let polygonPoints = [];
            const vertices = props.vertices[props.polygonId];
            if(isDefined(vertices) && vertices.length > 0) {
                for (let i = 0; i < vertices.length - 1; i = i + 2) {
                    polygonPoints.push(transform([vertices[i], vertices[i + 1]], 'EPSG:4326', this.projection))
                }

                vectorSource.getFeatures()[0].getGeometry().setCoordinates([polygonPoints])
            }
            // update style
            const style = polygon.getStyle();
            style.getStroke().setColor(props.outlineColor);
            style.getStroke().setWidth(props.outlineWidth);
            style.getFill().setColor(props.color);
        }
    }

    //---------- MAP SETUP --------------//
    /**
     * @private
     */
    initMap(options) {

        this.map = null;
        this.first = true;
        let overlays = [];

        let baseLayers = this.getDefaultLayers();
        let maxZoom = 19;

        let view = new OlView({
            center: [0, 0],
            zoom: 0
        });

        if (isDefined(options)) {

            //if the user passed in a map then use that one, don't make a new one
            if (options.map) {
                this.map = options.map;
            }

            // checks autoZoom
            if (!options.autoZoomOnFirstMarker) {
                this.first = false;
            }

            if (options.maxZoom) {
                maxZoom = options.maxZoom;
            }

            // checks overlayers
            if (options.overlayLayers) {
                overlays = options.overlayLayers;
            }

            // checks baseLayer
            if (options.baseLayers) {
                baseLayers = options.baseLayers;
            }

            if (options.initialView) {
                view = options.initialView;
            }
        }

        if (!isDefined(this.map)) {
            // sets layers to map
            //create map
            // #region snippet_openlayerview_initial_map
            this.map = new Map();

            this.map.addInteraction(new DragRotateAndZoom());
            this.map.addInteraction(new MouseWheelZoom({
                constrainResolution: true, // force zooming to a integer zoom,
                duration: 200
            }));

            this.map.addControl(new FullScreen());
            const layerSwitcher = new LayerSwitcher({
                tipLabel: 'Legend', // Optional label for button
                groupSelectStyle: 'children' // Can be 'children' [default], 'group' or 'none'
            });
            this.map.addControl(layerSwitcher);
            this.map.addControl(new ZoomSlider());

            // #endregion snippet_openlayerview_initial_map

        }

        this.map.setTarget(this.divId);

        if (!isDefined(this.map.getView())) {
            this.map.setView(view);
        }

        this.map.getView().setMaxZoom(maxZoom);

        // only if the map was not created with default layers
        if(this.map.getLayers().getLength()  === 0) {
            this.map.addLayer(new Group({
                'title': 'Base maps',
                layers: baseLayers
            }));
            this.map.addLayer(new Group({
                title: 'Overlays',
                layers: overlays
            }));
        }

        // inits onLeftClick events
        // select interaction working on "click"
        const selectClick = new Select({
            condition: click,
            style: null
        });

        const selectRightClick = new Select({
            condition: function(e) {
                return (e.type === 'contextmenu');
            },
            style: null
        });

        // select interaction working on "pointermove"
        const selectPointerMove = new Select({
            condition: pointerMove,
            style: null
        });

        this.map.addInteraction(selectClick);
        this.map.addInteraction(selectRightClick);
        this.map.addInteraction(selectPointerMove);
        this.projection = this.map.getView().getProjection();

        const that = this;

        selectRightClick.on('select', function (e) {
            if(e.selected.length > 0 ) {
                let feature = e.selected[0]; //the feature selected
                const mId = that.getMarkerId(feature.getId());
                if (!isDefined(mId)) {
                    return;
                }
                const sId = that.getLayerId(feature.getId());
                if (!isDefined(sId)) {
                    return;
                }
                const layer = that.getLayer(sId);
                if (!isDefined(layer)) {
                    return;
                }
                that.onMarkerRightClick(mId, feature, layer.props, e);
            }
        });
        selectClick.on('select', function (e) {
            if(e.selected.length > 0 ) {
                let feature = e.selected[0]; //the feature selected
                const mId = that.getMarkerId(feature.getId());
                if (!isDefined(mId)) {
                    return;
                }
                const sId = that.getLayerId(feature.getId());
                if (!isDefined(sId)) {
                    return;
                }
                const layer = that.getLayer(sId);
                if (!isDefined(layer)) {
                    return;
                }
                that.onMarkerLeftClick(mId, feature, layer.props, e);
            }
        });

        selectPointerMove.on('select', function (e) {
            if(e.selected.length > 0 ) {
                let feature = e.selected[0]; //the feature selected
                const mId = that.getMarkerId(feature.getId());
                if (!isDefined(mId)) {
                    return;
                }
                const sId = that.getLayerId(feature.getId());
                if (!isDefined(sId)) {
                    return;
                }
                const layer = that.getLayer(sId);
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

        let vectorMarkerLayer = new VectorLayer({
            source: this.vectorSource,
        });

        vectorMarkerLayer.setZIndex(1);

        this.map.addLayer(vectorMarkerLayer);
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
     * @param {String} properties.id - the id of the new created marker: layer.id$layer.markerId
     * @return {Object} the new marker object
     */
    addMarker(properties) {
        //create marker
        if(isDefined(this.map) &&  this.map !== null) {
            let marker = new Point(transform([properties.location.x, properties.location.y], 'EPSG:4326', this.projection));
            let markerFeature = new Feature({
                geometry: marker,
                name: 'Marker' //TODO
            });

            if (isDefined(properties.icon) && properties.icon !== null) {
                let iconStyle = new Style({
                    image: new Icon({
                        opacity: 0.75,
                        src: properties.icon,
                        rotation: properties.orientation.heading * Math.PI / 180
                    }),
                    zIndex: properties.zIndex,
                    text: new Text({
                        text: properties.label,
                        offsetX: properties.labelOffset[0],
                        offsetY: properties.labelOffset[1],
                    })
                });
                markerFeature.setStyle(iconStyle);
            }

            markerFeature.setId(properties.id+"$"+properties.markerId);
            this.vectorSource.addFeature(markerFeature);

            if (this.first) {
                this.first = false;
                this.map.getView().setCenter(transform([properties.location.x, properties.location.y], 'EPSG:4326', this.projection));
                this.map.getView().setZoom(12);
            }

            return markerFeature;
        }
        this.onResize();
        //TODO: exception
        return null;
    }

    /**
     * Abstract method to remove a marker from its corresponding layer.
     * This is library dependent.
     * @param {Object} marker - The Map marker object
     */
    removeMarkerFromLayer(marker) {
        this.vectorSource.removeFeature(marker);
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
     * Abstract method to remove a polygon from its corresponding layer.
     * This is library dependant.
     * @param {Object} polygon - The Map polygon object
     */
    removePolygonFromLayer(polygon) {
        this.map.removeLayer(polygon);
    }

    /**
     * Add a polyline to the map.
     * @param {Object} properties
     */
    addPolyline(properties) {
        let polylinePoints = [];

        const locations = properties.locations[properties.polylineId];

        for (let i = 0; i < locations.length; i++) {
            polylinePoints.push(transform([locations[i].x, locations[i].y], 'EPSG:4326', this.projection))
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

        vectorPathLayer.setZIndex(0);
        this.map.addLayer(vectorPathLayer);

        return vectorPathLayer;
    }

    /**
     * Add a polygon to the map.
     * @param {Object} properties
     */
    addPolygon(properties) {
        let polygonPoints = [];

        const vertices = properties.vertices[properties.polygonId];

        for (let i = 0; i < vertices.length - 1; i = i +2) {
            polygonPoints.push(transform([vertices[i], vertices[i + 1]], 'EPSG:4326', this.projection))
        }
        //create path
        let pathGeometry = new Polygon([polygonPoints]);
        let feature = new Feature({
            geometry: pathGeometry,
            name: 'Polygon'
        });
        let source = new VectorSource({
            features: [feature]
        });

        let vectorPolygonLayer = new VectorLayer({
            title: properties.name,
            source: source,
            style: new Style({
                fill: new Fill({
                    color: properties.color
                }),
                stroke: new Stroke({
                    color: properties.color,
                    width: properties.outlineWidth
                })
            })
        });

        vectorPolygonLayer.setZIndex(0);
        this.map.addLayer(vectorPolygonLayer);

        return vectorPolygonLayer;
    }

    onResize() {
        super.onResize();
        if(isDefined(this.map) && this.map !== null) {
            this.map.updateSize();
        }
    }
}

export default  OpenLayerView;
