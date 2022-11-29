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

import MapView from "./MapView";
import {isDefined, randomUUID} from "../../../utils/Utils";
import 'mapbox-gl/dist/mapbox-gl.css';
import {Map, Marker, Popup, MercatorCoordinate} from 'mapbox-gl/dist/mapbox-gl';

/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the Mapbox-gl.js framework.
 * @extends MapView
 */
class MapboxView extends MapView {
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Object} [properties.mapProperties] - the [map properties]{@link https://docs.mapbox.com/mapbox-gl-js/api/map/}
     * @param {String} [properties.mapProperties.container='map'] - the default div container
     * @param {String} [properties.mapProperties.style='https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'] - the default style URL
     * @param {Number} [properties.mapProperties.zoom=7] - the default zoom value
     * @param {Number[]} [properties.mapProperties.center=[0,0]] - the default center value
     * @param {Number[]} [properties.mapProperties.antialias=true] - create the gl context with MSAA antialiasing, so custom layers are antialiased
     * @param {Boolean} [properties.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     *
     */
    constructor(properties) {
        super({
            supportedLayers: ['marker', 'polyline', 'polygon'],
            ...properties
        });
        this.loaded = false;
        this.first = false;
    }

    //---------- MAP SETUP --------------//
    /**
     * @private
     */
    initMap(options) {
        this.map = new Map({
            container: 'map',
            style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            center: [0, 0],
            zoom: 2,
            antialias: true, // create the gl context with MSAA antialiasing, so custom layers are antialiase
            ...options.mapProperties
        });
        const that = this;
        this.map.on('load', function () {
            that.loaded = true;
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
    async updateMarker(props) {
        if(!this.loaded) {
            // map is not loaded yet
            return;
        }
        let marker = this.getMarker(props);
        if (!isDefined(marker)) {
            // adds a new marker to the leaflet renderer
            const markerObj = this.addMarker(props);
            this.addMarkerToLayer(props, markerObj);
        } else {
            let marker = this.getMarker(props);
            // updates position
            let lon = props.location.x;
            let lat = props.location.y;

            marker.setLngLat([lon, lat]).setRotation(props.orientation.heading)

            // update style
            marker.getElement().style.backgroundImage = `url(${props.icon})`;
            marker.getElement().style.width = props.iconSize[0] + 'px';
            marker.getElement().style.height = props.iconSize[1] + 'px';
            if(isDefined(props.orientation)) {
                marker.setRotation(props.orientation.heading)
            }
            let name = 'Marker';
            if(isDefined(props.name) && props.name !== '') {
                name = props.name;
            } else if(isDefined(props.label) && props.label !== '') {
                name = props.label;
            }

            marker.getPopup().setHTML(`<strong>${name}</strong>`)
        }
    }

    /**
     * Updates the polyline associated to the layer.
     * @param {Polyline.props} props - The layer allowing the update of the polyline
     */
    async updatePolyline(props) {
        const that = this;

        if(!this.loaded) {
            // map is not loaded yet
            return;
        }
        let polyline = this.getPolyline(props);
        if (!isDefined(polyline)) {
            // adds a new marker to the leaflet renderer
            const polylineObj = this.addPolyline(props);
            this.addPolylineToLayer(props, polylineObj);
        } else {
            const sourceId = polyline.source;
            const layerId = polyline.id;

            let  polylineFeature = this.map.getSource(sourceId);
            const dataId = polylineFeature.id;

            const locationsPts = [];
            // update locations
            const locations = props.locations;
            for(let i=0;i < locations.length;i++) {
                locationsPts.push([locations[i].x, locations[i].y]);
            }

            polylineFeature.setData({
                'id': dataId,
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': locationsPts
                        }
                    }
                ]
            });
            this.map.setPaintProperty(layerId, 'line-color',props.color);
            this.map.setPaintProperty(layerId, 'line-width',props.weight);
            this.map.setPaintProperty(layerId, 'line-opacity',props.opacity);
        }
    }

    /**
     * Gets the list of default layers.
     * @return {Array}
     */
    getDefaultLayers() {
    }

    /**
     * Add a marker to the map.
     * @param {Object} properties
     * @param {Number} properties.lon
     * @param {Number} properties.lat
     * @param {Number} properties.label
     * @param {String} properties.icon - path of the icon
     * @param {Number} properties.orientation - orientation in degree
     * @param {String} properties.id - the id of the new created marker: layer.id$layer.markerId
     * @return {Object} the new marker object
     */
    addMarker(properties) {
        if(!this.loaded) {
            // map is not loaded yet
            return;
        }
        let name = 'Marker';
        if(isDefined(properties.name)) {
            name = properties.name;
        } else if(isDefined(properties.label)) {
            name = properties.label;
        }

        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url(${properties.icon})`;
        el.style.width = properties.iconSize[0] + 'px';
        el.style.height = properties.iconSize[1] + 'px';
        el.style.backgroundSize = '100%';
        const marker = new Marker({
            element: el
        })
            .setLngLat([properties.location.x, properties.location.y])
            .setRotation(properties.orientation.heading)
            .setPopup(new Popup().setHTML(`<strong>${name}</strong>`))
            .addTo(this.map);

        marker.id = properties.id+"$"+properties.markerId;
        if(!this.first && this.properties.autoZoomOnFirstMarker) {
            this.map.flyTo({
                center: [properties.location.x, properties.location.y],
                zoom: properties.zoomLevel,
                speed: 3.5,
                curve: 2,
                easing(t) {
                    return t;
                }
            });
            this.first = false;
        }
        return marker;
    }

    /**
     * Abstract method to remove a marker from its corresponding layer.
     * This is library dependent.
     * @param {Object} marker - The Map marker object
     */
    removeMarkerFromLayer(marker) {
        if(!this.loaded) {
            // map is not loaded yet
            return;
        }
        marker.remove();
    }

    /**
     * Abstract method to remove a polyline from its corresponding layer.
     * This is library dependant.
     * @param {Object} polyline - The Map polyline object
     */
    removePolylineFromLayer(polyline) {
        this.map.removeLayer(polyline.id).removeSource(polyline.source);
    }

    /**
     * Abstract method to remove a polygon from its corresponding layer.
     * This is library dependant.
     * @param {Object} polygon - The Map polygon object
     */
    removePolygonFromLayer(polygon) {
        this.map.removeLayer(polygon.id+'-outline');
        this.map.removeLayer(polygon.id).removeSource(polygon.source);
    }

    /**
     * Add a polyline to the map.
     * @param {locations} locations - the coordinates [{x, y}]
     * @param {Object} properties
     * @param {String} properties.color
     * @param {Number} properties.weight
     * @param {String} properties.name
     * @return {string} the id of the new created polyline
     */
    addPolyline(properties) {
        if(!this.loaded) {
            // map is not loaded yet
            return;
        }
        const layerId = randomUUID();
        const dataId = randomUUID();
        const sourceId = randomUUID();

        const geojson = {
            'id': dataId,
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [[0, 0]]
                    }
                }
            ]
        };

        this.map.addSource(sourceId, {
            'type': 'geojson',
            'data': geojson
        });

        // add the line which will be modified in the animation
        const layer = {
            'id': layerId,
            'type': 'line',
            'source': sourceId,
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': properties.color,
                'line-width': properties.weight,
                'line-opacity': properties.opacity
            }
        };
        this.map.addLayer(layer);
        return layer;
    }

    /**
     * Updates the polygon associated to the layer.
     * @param {Polygon.props} props - The layer allowing the update of the polygon
     */
    async updatePolygon(props) {
        if(!this.loaded) {
            // map is not loaded yet
            return;
        }

        let polygon = this.getPolygon(props);
        if (!isDefined(polygon)) {
            // adds a new marker to the leaflet renderer
            polygon = this.addPolygon(props);
            this.addPolygonToLayer(props, polygon);
        } else {
            const sourceId = polygon.source;
            const layerId = polygon.id;

            let  polygonFeature = this.map.getSource(sourceId);
            const dataId = polygonFeature.id;

            // update locations
            let polygonPoints = [];
            const vertices = props.vertices;
            if(isDefined(vertices) && vertices.length > 0) {
                for (let i = 0; i < vertices.length - 1; i = i + 2) {
                    polygonPoints.push([vertices[i], vertices[i + 1]]);
                }
            }
            polygonFeature.setData({
                'id': dataId,
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': [polygonPoints]
                        }
                    }
                ]
            });

            this.map.setPaintProperty(layerId, 'fill-color',props.color);
            this.map.setPaintProperty(layerId, 'fill-opacity',props.opacity);

            // change outline
            this.map.setPaintProperty(layerId+'-outline', 'line-color',props.outlineColor);
            this.map.setPaintProperty(layerId+'-outline', 'line-width',props.outlineWidth);
        }
    }

    /**
     * Add a polygon to the map.
     * @param {Object} properties
     */
    addPolygon(properties) {
        const id = properties.id+"$"+properties.polygonId;

        // update locations
        let polygonPoints = [];
        const vertices = properties.vertices;
        if(isDefined(vertices) && vertices.length > 0) {
            for (let i = 0; i < vertices.length - 1; i = i + 2) {
                polygonPoints.push([vertices[i], vertices[i + 1]]);
            }
        }

        const layerId = randomUUID();
        const dataId = randomUUID();
        const sourceId = randomUUID();

        const geojson = {
            'id': dataId,
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [polygonPoints]
                    }
                }
            ]
        };

        this.map.addSource(sourceId, {
            'type': 'geojson',
            'data': geojson
        });

        // add the line which will be modified in the animation
        const layer = {
            'id': layerId,
            'type': 'fill',
            'source':  sourceId,
            'layout': {},
            'paint': {
                'fill-color': properties.color,
                'fill-opacity': properties.opacity
            }
        };

        // Add an outline around the polygon.
        this.map.addLayer(layer);

        // Add an outline around the polygon.
        this.map.addLayer({
            'id': layerId +'-outline',
            'type': 'line',
            'source':  sourceId,
            'layout': {},
            'paint': {
                'line-color': properties.outlineColor,
                'line-width': properties.outlineWidth
            }
        });

        return layer;
    }
    onResize() {
    }
}

export default  MapboxView;
