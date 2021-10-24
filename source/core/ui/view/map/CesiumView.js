/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Sensia Software LLC. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>
 Author: Alex Robin <alex.robin@sensiasoft.com>

 ******************************* END LICENSE BLOCK ***************************/

import {isDefined, randomUUID} from "../../../utils/Utils.js";

import {
    when,
    Cartographic,
    Cartesian3,
    Cartesian2,
    Color,
    HorizontalOrigin,
    VerticalOrigin,
    HeightReference,
    Math,
    Transforms,
    Matrix3,
    Matrix4,
    MaterialAppearance,
    Material,
    sampleTerrain,
    GeometryInstance,
    PolygonGeometry,
    RectangleGeometry,
    Rectangle,
    Primitive,
    createDefaultImageryProviderViewModels,
    Viewer,
    WebMapServiceImageryProvider,
    EllipsoidTerrainProvider,
    NearFarScalar,
    HeadingPitchRoll,
    HeadingPitchRange,
    Ellipsoid,
    EncodedCartesian3,
    ScreenSpaceEventType,
    CallbackProperty,
    ColorGeometryInstanceAttribute,
    Scene, PolygonHierarchy, PerInstanceColorAppearance, GroundPrimitive,
    PolylineCollection,
    PrimitiveCollection,
    EllipseGeometry
} from 'cesium';

import ImageDrapingVS from "./shaders/ImageDrapingVS.js";
import ImageDrapingFS from "./shaders/ImageDrapingFS.js";
import "cesium/Build/Cesium/Widgets/widgets.css";
import MapView from "./MapView";

/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the Cesium object.
 * @extends MapView
 * @example

 import CesiumView from 'core/ui/view/map/CesiumView.js';

 // style it with a moving point marker
 let pointMarker = new PointMarkerLayer({
	dataSourceId: gpsDataSource.id,
	getLocation: (rec) => ({
		x: rec.location.lon,
		y: rec.location.lat
	}),
	orientation: {
		heading: 0
	},
	icon: 'images/car-location.png',
	iconAnchor: [16, 40]
});

 // #region snippet_cesium_location_view
 // create Cesium view
 let cesiumView = new CesiumView({
	container: 'cesium-container',
	layers: [pointMarker]
});
 */
class CesiumView extends MapView {

    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Boolean} [properties.autoZoomOnFirstMarker=false] - auto zoom on the first added marker
     * @param {Object} [properties.cesiumProps={}] - Properties which can override the default framework ones
     * @param {Object} [properties.cesiumProps.viewerProps={}] - the properties of the [Cesium]{@link https://cesium.com/docs/cesiumjs-ref-doc/Viewer.html?classFilter=Viewer} Viewer object
     *
     */
    constructor(properties) {
        super({
            supportedLayers: ['marker', 'draping', 'polyline', 'ellipse', 'polygon'],
            ...properties
        });

        let cssClass = document.getElementById(this.divId).className;
        document.getElementById(this.divId).setAttribute("class", cssClass + " " + this.css);

        this.imageDrapingPrimitive = null;
        this.imageDrapingPrimitiveReady = false;
        this.frameCount = 0;

        this.captureCanvas = document.createElement('canvas');
        this.captureCanvas.width = 640;
        this.captureCanvas.height = 480;
    }

    //---------- MAP SETUP
    beforeAddingItems(options) {
        this.first = true;

        // #region snippet_cesiumview_default_cesiumprops_viewer_props

        const imageryProviders = createDefaultImageryProviderViewModels();
        let viewerProps = {
            baseLayerPicker: true,
            imageryProviderViewModels: imageryProviders,
            selectedImageryProviderViewModel: imageryProviders[6],
            timeline: false,
            homeButton: false,
            navigationInstructionsInitiallyVisible: false,
            navigationHelpButton: false,
            geocoder: true,
            fullscreenButton: false,
            showRenderLoopErrors: true,
            animation: false,
            scene3DOnly: true, // for draw layer
        };

        // #endregion snippet_cesiumview_default_cesiumprops_viewer_props

        if (isDefined(options)) {
            if (options.hasOwnProperty('cesiumProps') && options.cesiumProps.hasOwnProperty('viewerProps')) {
                viewerProps = {
                    ...viewerProps,
                    ...options.cesiumProps.viewerProps
                };
            }
        }

        this.viewer = new Viewer(this.divId, viewerProps);

        this.viewer.terrainProvider = new EllipsoidTerrainProvider();
        this.viewer.scene.copyGlobeDepth = true;
        this.viewer.scene._environmentState.useGlobeDepthFramebuffer = true;

        // inits callbacks
        // Get default left click handler for when a feature is not picked on left click
        const that = this;
        const onClick = (movement) => {
            // Pick a new feature
            const pickedFeature = that.viewer.scene.pick(movement.position);
            if (!isDefined(pickedFeature) || !isDefined(pickedFeature.id)) {
                return;
            }
            const mId = that.getMarkerId(pickedFeature.id.id);
            if (!isDefined(mId)) {
                return;
            }
            const sId = that.getLayerId(pickedFeature.id.id);
            if (!isDefined(sId)) {
                return;
            }
            const layer = that.getLayer(sId);
            if (!isDefined(layer)) {
                return;
            }

            that.viewer.selectedEntity = pickedFeature.id;
            that.viewer.selectedEntity.name = mId;
            pickedFeature.pixel = movement.position;
            that.onMarkerLeftClick(mId, pickedFeature, layer.props, {});
        };

        const onRightClick = (movement) => {
            // Pick a new feature
            const pickedFeature = that.viewer.scene.pick(movement.position);
            if (!isDefined(pickedFeature) || !isDefined(pickedFeature.id)) {
                return;
            }
            const mId = that.getMarkerId(pickedFeature.id.id);
            if (!isDefined(mId)) {
                return;
            }
            const sId = that.getLayerId(pickedFeature.id.id);
            if (!isDefined(sId)) {
                return;
            }
            const layer = that.getLayer(sId);
            if (!isDefined(layer)) {
                return;
            }

            that.viewer.selectedEntity = pickedFeature.id;
            that.viewer.selectedEntity.name = mId;
            pickedFeature.pixel = movement.position;
            that.onMarkerRightClick(mId, pickedFeature, layer.props, {});
        };

        const onHover = (movement) => {
            const pickedFeature = that.viewer.scene.pick(movement.endPosition);
            if (!isDefined(pickedFeature) || !isDefined(pickedFeature.id)) {
                return;
            }
            const mId = that.getMarkerId(pickedFeature.id.id);
            if (!isDefined(mId)) {
                return;
            }
            const sId = that.getLayerId(pickedFeature.id.id);
            if (!isDefined(sId)) {
                return;
            }
            const layer = that.getLayer(sId);
            if (!isDefined(layer)) {
                return;
            }
            pickedFeature.pixel = movement.endPosition;
            that.onMarkerHover(mId, pickedFeature, layer.props, {});
        };

        this.viewer.screenSpaceEventHandler.setInputAction(onClick, ScreenSpaceEventType.LEFT_CLICK);
        this.viewer.screenSpaceEventHandler.setInputAction(onRightClick, ScreenSpaceEventType.RIGHT_CLICK);
        this.viewer.screenSpaceEventHandler.setInputAction(onHover, ScreenSpaceEventType.MOUSE_MOVE);

    }

    /**
     *
     * @private
     */
    getGroundAltitude(lat, lon) {
        var position = Cartesian3.fromDegrees(lon, lat, 0, this.viewer.scene.globe.ellipsoid, new Cartesian3());
        var altitude = this.viewer.scene.globe.getHeight(Ellipsoid.WGS84.cartesianToCartographic(position));

        if (altitude === 'undefined' || altitude <= 0)
            altitude = 0.1;
        return altitude;
    }

    /**
     *
     * @param type
     * @param url
     * @param layers
     * @param imageFormat
     * @param options
     * @return {*}
     */
    addImageryProvider(type, url, layers, imageFormat, options) {
        let minLOD = 0;
        let maxLOD;

        if (options.hasOwnProperty('minLOD')) {
            minLOD = options.minLOD;
        }
        if (options.hasOwnProperty('maxLOD')) {
            maxLOD = options.maxLOD;
        }

        let imageryProvider;
        if (type === 'wms') {
            imageryProvider = new WebMapServiceImageryProvider({
                url: url,
                layers: layers,
                minimumLevel: minLOD,
                maximumLevel: maxLOD,
                parameters: {
                    transparent: 'true',
                    format: 'image/' + imageFormat
                }
            });
        }
        // imageryProvider.alpha = 0.5;
        this.viewer.imageryLayers.addImageryProvider(imageryProvider);
        return imageryProvider;
    }

    // ----------------------------------------------------//
    // ---------------------- LAYERS ---------------------//
    // --------------------------------------------------//

    // ----- MARKER
    addMarker(properties) {

    }

    updateMarker(props) {
        if (!isDefined(props.position)) {
            return;
        }
        const marker = this.getEllipse(props);
        if (isDefined(marker)) {
            this.removeMarkerFromLayer(marker);
        }
        this.addMarkerToLayer(props, this.addMarker(props));
    }

    removeMarkerFromLayer(marker) {
        this.viewer.scene.entities.remove(marker);
    }

    // ----- ELLIPSE
    /**
     * Add an Ellipse to the view
     * @param properties
     * @param properties.id The id of the ellipse
     * @param properties.name The assigned name of the ellipse
     * @param properties.position [] The ellipse's center point in the fixed frame.
     * @param properties.semiMajorAxis {Number} The length of the ellipse's semi-major axis in meters.
     * @param properties.semiMinorAxis {Number} The length of the ellipse's semi-minor axis in meters.
     * @param properties.height {Number} 0.0 optionalThe distance in meters between the ellipse and the ellipsoid surface.
     * @param properties.extrudedHeight {Number} optionalThe distance in meters between the ellipse's extruded face and the ellipsoid surface.
     * @param properties.rotation {Number} 0.0 optionalThe angle of rotation counter-clockwise from north.
     * @param properties.stRotation {Number} 0.0 optionalThe rotation of the texture coordinates counter-clockwise from north.
     * @param properties.granularity {Number}    CesiumMath.RADIANS_PER_DEGREE optionalThe angular distance between points on the ellipse in radians.
     * @param properties.clampToGround {boolean} Flag to indicate if ellipse needs to be clamped to ground
     * @param properties.color The color of the ellipse
     * @param properties.transparency The level of transparency or alpha value
     * @returns {Entity}
     */
    addEllipse(properties) {
        // bind the object to the callback property
        const id = properties.id + "$" + properties.ellipseId;

        const position = properties.position;
        const semiMajorAxis = properties.semiMajorAxis;
        const semiMinorAxis = properties.semiMinorAxis;
        const height = isDefined(properties.height) ? properties.height : 0.0;
        const extrudedHeight = isDefined(properties.extrudedHeight) ? properties.extrudedHeight : 0.0;
        const rotation = isDefined(properties.rotation) ? properties.rotation : 0.0;
        const stRotation = isDefined(properties.stRotation) ? properties.stRotation : 0.0;
        const color = properties.color;
        const alpha = isDefined(properties.transparency) ? properties.transparency : 0.5;

        const ellipseInstance = new GeometryInstance({
            geometry: new EllipseGeometry({
                center: Cartesian3.fromDegrees(position.x, position.y),
                semiMajorAxis: semiMajorAxis,
                semiMinorAxis: semiMinorAxis,
                height: height,
                extrudedHeight: extrudedHeight,
                rotation: rotation,
                stRotation: stRotation
            }),
            id: id,
        });

        const ellipsePrimitive = new Primitive({
            geometryInstances : ellipseInstance,
            appearance : new MaterialAppearance({
                material: new Material({
                    fabric: {
                        type: 'Color',
                        uniforms: {
                            color:  Color.fromCssColorString(color).withAlpha(alpha)
                        }
                    }
                }),
            }),
            asynchronous: false
        });

        this.viewer.scene.primitives.add(ellipsePrimitive);

        return ellipsePrimitive;
    }

    /**
     * Updates an Ellipse if it exists or adds a new one to the view
     * @param props
     * @param props.ellipseId
     * @param props.id The id of the ellipse
     * @param props.position [] The ellipse's center point in the fixed frame.
     * @param props.semiMajorAxis {Number} The length of the ellipse's semi-major axis in meters.
     * @param props.semiMinorAxis {Number} The length of the ellipse's semi-minor axis in meters.
     * @param props.height {Number} 0.0 optionalThe distance in meters between the ellipse and the ellipsoid surface.
     * @param props.extrudedHeight {Number} optionalThe distance in meters between the ellipse's extruded face and the ellipsoid surface.
     * @param props.rotation {Number} 0.0 optionalThe angle of rotation counter-clockwise from north.
     * @param props.stRotation {Number} 0.0 optionalThe rotation of the texture coordinates counter-clockwise from north.
     * @param props.granularity {Number}    CesiumMath.RADIANS_PER_DEGREE optionalThe angular distance between points on the ellipse in radians.
     * @param props.clampToGround {boolean} Flag to indicate if ellipse needs to be clamped to ground
     * @param props.transparency The level of transparency or alpha value
     * @param props.color The color of the ellipse
     */
    updateEllipse(props) {
        if (!isDefined(props.position)) {
            return;
        }
        const ellipse = this.getEllipse(props);
        if (isDefined(ellipse)) {
            this.removeEllipseFromLayer(ellipse);
        }
        this.addEllipseToLayer(props, this.addEllipse(props));
    }

    /**
     * Removes an ellipse
     * @param ellipse The ellipse to remove
     */
    removeEllipseFromLayer(ellipse) {
        this.viewer.scene.primitives.remove(ellipse);
    }

    // ----- POLYLINE
    /**
     * Add a polyline to the map.
     * @param {Object} properties
     * @return {Object} the new created polyline
     */
    addPolyline(properties) {
        const id = properties.id + "$" + properties.polylineId;
        const locations = properties.locations[properties.polylineId];

        const polylineCollection = new PolylineCollection();
        polylineCollection.add({
            id: id,
            positions: locations.map(element => Cartesian3.fromDegrees(element.x, element.y, element.z)).flat(),
            width: properties.weight,
            loop: false,
            material: new Material({
                fabric: {
                    type: 'Color',
                    uniforms: {
                        color:  Color.fromCssColorString(properties.color)
                    }
                }
            }),
        });
        this.viewer.scene.primitives.add(polylineCollection);
        return polylineCollection;
    }

    /**
     * Updates a given polyline, or adds it if it does not currently exist
     * @param props The properties containing the updated data
     */
    updatePolyline(props) {

        if (!isDefined(props.locations)) {
            return;
        }
        const polyline = this.getPolyline(props);
        if (isDefined(polyline)) {
            this.removePolylineFromLayer(polyline);
        }
        this.addPolylineToLayer(props, this.addPolyline(props));
    }

    /**
     * Abstract method to remove a polyline from its corresponding layer.
     * This is library dependent.
     * @param {Object} polyline - The Map marker object
     */
    removePolylineFromLayer(polyline) {
        this.viewer.scene.primitives.remove(polyline);
    }

    // ----- POLYGON
    /**
     * Adds a polygon to the polygon layer
     * @param {Object} properties the properties to use in constructing the polygon
     * @returns {Entity}
     */
    addPolygon(properties) {
        // bind the object to the callback property
        const id = properties.id + "$" + properties.polygonId;
        // return this.viewer.entities.add(polygonObj);
        const polygonInstance = new GeometryInstance({
            geometry: new PolygonGeometry({
                polygonHierarchy: new PolygonHierarchy(Cartesian3.fromDegreesArray(properties.vertices[properties.polygonId])),
                attributes : {
                    color : ColorGeometryInstanceAttribute.fromColor(Color.fromRandom({alpha : 0.5}))
                }
            }),
            id: id,
        });

        const polygonPrimitive = new Primitive({
            geometryInstances : polygonInstance,
            appearance : new MaterialAppearance({
                material: new Material({
                    fabric: {
                        type: 'Color',
                        uniforms: {
                            color:  Color.fromCssColorString(properties.color).withAlpha(properties.opacity)
                        }
                    }
                }),
            }),
            asynchronous: false
        });

        // according to this example: https://sandcastle.cesium.com/?#c=pVRNj9MwEP0rVi9JpeIulAWU7VZULVrQLlq0IC6EgzeZthaOHY2dVAH1v2MncZq05YQPbebjzbw38aRkSEoOe0BySyTsyQo0LzL6vfaFQVKbKyUN4xIwGN/EMpalRSVKYaot6kcsiT0v3r6iVxPy+sr+eo97JrPrnue69pzn9Dxv3vk6sfx5bMfQWC5M2o4tx5V3zegGVbaGLQLoJSKrwoZdn61Q2IM6k66XT/dPH9Y3TYoqjLAaV5cy7x4f1l2tXIlqq+QX5Bk3vITh5Dp3+KcRtAWVgcHqk9SGSTvQqJ9+dxL1KHd4GpGg7RZMjn5fMep6Njm+Fk0QmAFvhkekO32uQ1y/tz9t+48ckGGyq6IL+C4Ydm9pPKx06Nnt42HcKmJ5Dgyd9kHtz1YBciaWXbhPL2ujFyH1dfhW5RAG9esLJuREWX0doubvGDmcUdOVTHaopCrsW9swoSGWh/HgJrg786+r0IYtCQGJ4UqGDnuGoixNvbhcae4ybb9umC2bPU/NLiKzblWEUnlEDBbQOv5jKu1E+kvghzGU7Em71W++HFQnIIEeI05jZ9TiTldmfDllMBWXM5qM5tpUAhYNmfc8yxUaUqAIKZ0ayHJh5enpc5H8AkMTXe/8fOpB85SXdo9u49HJlywekUQwrW1kUwjxlf+GeLSYT23+ACYUS7ncPpaAglUuZfdy8dA4KaXzqTXPUUYp8cywV/Ev
        var polygonOutlinePrimitive = new PolylineCollection();
        polygonOutlinePrimitive.add({
            positions: Cartesian3.fromDegreesArray(properties.vertices[properties.polygonId]),
            width: properties.outlineWidth,
            loop: true,
            material: new Material({
                fabric: {
                    type: 'Color',
                    uniforms: {
                        color:  Color.fromCssColorString(properties.outlineColor)
                    }
                }
            }),
        });

        const collection = new PrimitiveCollection();

        collection.add(polygonPrimitive);
        collection.add(polygonOutlinePrimitive);

        this.viewer.scene.primitives.add(collection);

        return collection;
    }

    /**
     * Retrieves the polygon and updates it or creates a new instance
     * and adds with the given properties the polygon to the layer
     * @param {Object} properties properties to apply in updating polygon
     */
    updatePolygon(props) {
        let polygonPrimitiveCollection = this.getPolygon(props);
        if (isDefined(polygonPrimitiveCollection)) {
            this.removePolygonFromLayer(polygonPrimitiveCollection);
        }
        this.addPolygonToLayer(props, this.addPolygon(props));
    }

    /**
     * Abstract method to remove a polygon from its corresponding layer.
     * This is library dependent.
     * @param {Object} polygon - The Map polygon object
     */
    removePolygonFromLayer(polygonPrimitiveCollection) {
        polygonPrimitiveCollection.removeAll();
        this.viewer.scene.primitives.remove(polygonPrimitiveCollection);
    }

    // ----- IMAGE_DRAPING
    /**
     * Updates the image draping associated to the layer.
     * @param {ImageDrapingLayer.props} props - The layer properties allowing the update of the image draping
     */
    updateDrapedImage(props) {
        if (!isDefined(props.platformLocation)) {
            return;
        }

        const llaPos = props.platformLocation;
        const DTR = Math.PI / 180;
        const attitude = props.platformOrientation;
        const gimbal = props.gimbalOrientation;

        ///////////////////////////////////////////////////////////////////////////////////
        // compute rotation matrix to transform lookrays from camera frame to ECEF frame //
        ///////////////////////////////////////////////////////////////////////////////////
        const camPos = Cartesian3.fromDegrees(llaPos.x, llaPos.y, llaPos.z);
        const nedTransform = Transforms.northEastDownToFixedFrame(camPos);
        const camRot = new Matrix3();
        Matrix4.getMatrix3(nedTransform, camRot);
        const rotM = new Matrix3();

        if (isDefined(attitude)) {
            // UAV heading, pitch, roll (given in NED frame)
            const uavHeading = Matrix3.fromRotationZ(attitude.heading * DTR, rotM);
            Matrix3.multiply(camRot, uavHeading, camRot);
            const uavPitch = Matrix3.fromRotationY(attitude.pitch * DTR, rotM);
            Matrix3.multiply(camRot, uavPitch, camRot);
            const uavRoll = Matrix3.fromRotationX(attitude.roll * DTR, rotM);
            Matrix3.multiply(camRot, uavRoll, camRot);
        }

        // gimbal angles (on solo gimbal, order is yaw, roll, pitch!)
        if (isDefined(gimbal)) {
            const gimbalYaw = Matrix3.fromRotationZ(gimbal.heading * DTR, rotM);
            Matrix3.multiply(camRot, gimbalYaw, camRot);
            const gimbalRoll = Matrix3.fromRotationX(gimbal.roll * DTR, rotM);
            Matrix3.multiply(camRot, gimbalRoll, camRot);
            const gimbalPitch = Matrix3.fromRotationY((90 + gimbal.pitch) * DTR, rotM);
            Matrix3.multiply(camRot, gimbalPitch, camRot);
        }

        // transform to camera frame
        var img2cam = Matrix3.fromRotationZ(90 * DTR, rotM);
        Matrix3.multiply(camRot, img2cam, camRot);

        ////////////////////////////////////////////////////////////////////////////////////

        const camProj = props.cameraModel.camProj;
        const camDistR = props.cameraModel.camDistR;
        const camDistT = props.cameraModel.camDistT;

        let imgSrc = props.imageSrc;

        {
            let snapshot = false;
            if (props.getSnapshot !== null) {
                snapshot = props.getSnapshot();
            }
            // snapshot
            if (props.snapshot) {
                var ctx = this.captureCanvas.getContext('2d');
                ctx.drawImage(imgSrc, 0, 0, this.captureCanvas.width, this.captureCanvas.height);
                imgSrc = this.captureCanvas;
            }

            const encCamPos = EncodedCartesian3.fromCartesian(camPos);
            const appearance = new MaterialAppearance({
                material: new Material({
                    fabric: {
                        type: 'Image',
                        uniforms: {
                            image: imgSrc,
                            camPosHigh: encCamPos.high,
                            camPosLow: encCamPos.low,
                            camAtt: Matrix3.toArray(Matrix3.transpose(camRot, new Matrix3())),
                            camProj: Matrix3.toArray(camProj),
                            camDistR: camDistR,
                            camDistT: camDistT
                        }
                    }
                }),
                vertexShaderSource: ImageDrapingVS,
                fragmentShaderSource: ImageDrapingFS
            });

            if (this.imageDrapingPrimitive === null || snapshot) {
                if (this.imageDrapingPrimitive === null)
                    this.imageDrapingPrimitive = {};

                const promise = sampleTerrain(this.viewer.terrainProvider, 11, [Cartographic.fromDegrees(llaPos.x, llaPos.y)]);
                const that = this;
                when(promise, function (updatedPositions) {
                    //console.log(updatedPositions[0]);
                    var newImageDrapingPrimitive = that.viewer.scene.primitives.add(new Primitive({
                        geometryInstances: new GeometryInstance({
                            geometry: new RectangleGeometry({
                                rectangle: Rectangle.fromDegrees(llaPos.x - 0.1, llaPos.y - 0.1, llaPos.x + 0.1, llaPos.y + 0.1),
                                height: updatedPositions[0].height,
                                extrudedHeight: llaPos.z - 1
                            })
                        }),
                        appearance: appearance
                    }));

                    if (!snapshot)
                        that.imageDrapingPrimitive = newImageDrapingPrimitive;

                    that.viewer.scene.primitives.raiseToTop(that.imageDrapingPrimitive);
                    that.imageDrapingPrimitiveReady = true;
                });

            } else if (this.imageDrapingPrimitiveReady) {
                this.imageDrapingPrimitive.appearance = appearance;
            }
        }

        this.frameCount++;
    }
}

export default CesiumView;
