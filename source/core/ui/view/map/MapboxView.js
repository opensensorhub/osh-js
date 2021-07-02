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
import {isDefined} from "../../../utils/Utils";
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
            supportedLayers: ['marker', 'polyline'],
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
    updateMarker(props) {
        if(!this.loaded) {
            // map is not loaded yet
            return;
        }
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

        markerFeature.setLngLat([lon, lat])
    }

    /**
     * Updates the polyline associated to the layer.
     * @param {Polyline.props} props - The layer allowing the update of the polyline
     */
    updatePolyline(props) {
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
        }

        let polylineFeature = this.getPolyline(props);

        const mercatorArrays = [];
        let currentLonLat;
        for(let i=0;i < props.locations.polyline.length;i++) {
            currentLonLat = MercatorCoordinate.fromLngLat({
                lng: props.locations.polyline[i].x,
                lat: props.locations.polyline[i].y
            });
            mercatorArrays.push(currentLonLat.x, currentLonLat.y);
        }

        polylineFeature.onAdd = function (map, gl) {
            // create GLSL source for vertex shader
            var vertexSource =
                '' +
                'uniform mat4 u_matrix;' +
                'attribute vec2 a_pos;' +
                'void main() {' +
                '    gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);' +
                '}';

            // create GLSL source for fragment shader
            var fragmentSource =
                '' +
                'void main() {' +
                '    gl_FragColor = vec4(0.0, 0.0, 1.0, 0.8);' +
                '}';

            // create a vertex shader
            var vertexShader = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vertexShader, vertexSource);
            gl.compileShader(vertexShader);

            // create a fragment shader
            var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fragmentShader, fragmentSource);
            gl.compileShader(fragmentShader);

            // link the two shaders into a WebGL program
            this.program = gl.createProgram();
            gl.attachShader(this.program, vertexShader);
            gl.attachShader(this.program, fragmentShader);
            gl.linkProgram(this.program);

            this.aPos = gl.getAttribLocation(this.program, 'a_pos');
        };

        polylineFeature.render = function (gl, matrix) {
            gl.useProgram(this.program);

            // create and initialize a WebGLBuffer to store vertex and color data
            this.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array(mercatorArrays),
                gl.STATIC_DRAW
            );

            gl.uniformMatrix4fv(
                gl.getUniformLocation(this.program, 'u_matrix'),
                false,
                matrix
            );
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.enableVertexAttribArray(this.aPos);
            gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, 0, 0);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.drawArrays(gl.LINE_STRIP, 0, mercatorArrays.length/2);

            // call render()
            that.map.triggerRepaint();
        };
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

        const marker = new Marker()
            .setLngLat([properties.location.x, properties.location.y])
            .setPopup(new Popup().setHTML(`<strong>${name}</strong>`))
            .addTo(this.map);

        marker.id = properties.id+"$"+properties.markerId;
        if(!this.first && this.properties.autoZoomOnFirstMarker) {
            this.map.flyTo({
                center: [properties.location.x, properties.location.y],
                zoom: properties.zoomLevel,
                speed: 2.0,
                curve: 1,
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
        if(!this.loaded) {
            // map is not loaded yet
            return;
        }
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
        // create a custom style layer to implement the WebGL content
        var highlightLayer = {
            id: properties.id+"$"+properties.polylineId,
            type: 'custom',

            // method called when the layer is added to the map
            // https://docs.mapbox.com/mapbox-gl-js/api/#styleimageinterface#onadd
            onAdd: function (map, gl) {
                // create GLSL source for vertex shader
                var vertexSource =
                    '' +
                    'uniform mat4 u_matrix;' +
                    'attribute vec2 a_pos;' +
                    'void main() {' +
                    '    gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);' +
                    '}';

                // create GLSL source for fragment shader
                var fragmentSource =
                    '' +
                    'void main() {' +
                    '    gl_FragColor = vec4(0.0, 0.0, 1.0, 0.8);' +
                    '}';

                // create a vertex shader
                var vertexShader = gl.createShader(gl.VERTEX_SHADER);
                gl.shaderSource(vertexShader, vertexSource);
                gl.compileShader(vertexShader);

                // create a fragment shader
                var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
                gl.shaderSource(fragmentShader, fragmentSource);
                gl.compileShader(fragmentShader);

                // link the two shaders into a WebGL program
                this.program = gl.createProgram();
                gl.attachShader(this.program, vertexShader);
                gl.attachShader(this.program, fragmentShader);
                gl.linkProgram(this.program);

                this.aPos = gl.getAttribLocation(this.program, 'a_pos');
            },

            // method fired on each animation frame
            // https://docs.mapbox.com/mapbox-gl-js/api/#map.event:render
            render: function (gl, matrix) {
                gl.useProgram(this.program);

                // create and initialize a WebGLBuffer to store vertex and color data
                this.buffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

                gl.uniformMatrix4fv(
                    gl.getUniformLocation(this.program, 'u_matrix'),
                    false,
                    matrix
                );
                gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
                gl.enableVertexAttribArray(this.aPos);
                gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, 0, 0);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                gl.drawArrays(gl.LINES, 0, 2);
            }
        };
       this.map.addLayer(highlightLayer, 'building');
        return highlightLayer;
    }

    onResize() {
    }
}

export default  MapboxView;
