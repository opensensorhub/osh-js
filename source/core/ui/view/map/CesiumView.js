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
    EllipseGeometry,
    BillboardCollection,
    LabelCollection,
    InfoBox,
    Entity,
    Quaternion,
    ColorBlendMode,
    PerspectiveFrustum,
    FrustumGeometry,
    VertexFormat,
    CoplanarPolygonGeometry,
    GroundPolylineGeometry,
    GroundPolylinePrimitive,
    PolylineGeometry,
    PolylineColorAppearance,
    LabelStyle
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
            supportedLayers: ['marker', 'drapedImage', 'polyline', 'ellipse', 'polygon', 'coplanarPolygon', 'frustum'],
            ...properties
        });

        let cssClass = document.getElementById(this.divId).className;
        document.getElementById(this.divId).setAttribute("class", cssClass + " " + this.css);

        this.captureCanvas = document.createElement('canvas');
        this.captureCanvas.width = 640;
        this.captureCanvas.height = 480;

        // for frustum
        this.tmpHPR = new HeadingPitchRoll();
        this.nedQuat = new Quaternion();
        this.platformQuat = new Quaternion(0,0,0,1);
        this.sensorQuat = new Quaternion(0,0,0,1);
        this.camQuat = Quaternion.fromRotationMatrix(Matrix3.fromRowMajorArray(
            [0, 0, 1,
                1, 0, 0,
                0, 1, 0])); // frustum is along Z
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
        this.viewer.scene.globe.depthTestAgainstTerrain = true;

        this.billboardCollection = new BillboardCollection();
        this.labelCollection = new LabelCollection();

        this.viewer.scene.primitives.add(this.billboardCollection);
        this.viewer.scene.primitives.add(this.labelCollection);

        // inits callbacks
        // Get default left click handler for when a feature is not picked on left click
        this.initCallbackEvents();
    }

    initCallbackEvents() {
        const that = this;
        const infoBoxContainer = document.createElement('div');
        infoBoxContainer.className = 'cesium-viewer-infoBoxContainer';
        this.viewer.container.appendChild(infoBoxContainer);

        const infoBox = new InfoBox(infoBoxContainer);

        const infoBoxViewModel = infoBox.viewModel;

        // https://groups.google.com/g/cesium-dev/c/rzLrPY5ERJs/m/VYfUj-fYCgAJ
        const onClick = (movement) => {
            try {
                // Pick a new feature
                let pickedFeature = that.viewer.scene.pick(movement.position);

                if (!isDefined(pickedFeature) || !isDefined(pickedFeature.id)) {
                    infoBoxViewModel.showInfo = false;
                    return;
                }

                let entity;
                let primitive;

                if(pickedFeature._id instanceof Entity) {
                    entity = pickedFeature._id;
                } else if(pickedFeature.id instanceof Entity) {
                    entity = pickedFeature.id;
                } else {
                    primitive = pickedFeature;
                }

                let featureId = entity && entity._id || primitive && primitive.id;

                const layerId = that.getLayerId(featureId);
                const layer = that.getLayer(layerId);

                if(isDefined(entity)) {
                    that.viewer.selectedEntity = entity;
                    pickedFeature.pixel = movement.position;
                    that.onMarkerRightClick(layerId, pickedFeature, layer.props, {});
                } else {
                    // is primitive
                    //TODO: support primitive selection using tracking tool

                    /* if (!isDefined(layer)) {
                         infoBoxViewModel.showInfo = false;
                         return;
                     }

                     infoBoxViewModel.showInfo = true;
                     infoBoxViewModel.titleText = layer.props.label || layer.props.name;
                     infoBoxViewModel.description = layer.props.description;
                 }

                 that.onMarkerLeftClick(layer.props.id, pickedFeature, layer.props, {});*/
                }
            }catch (exception) {
                infoBoxViewModel.showInfo = false;
                console.error(exception);
            }
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

    panToLayer(layer) {
        let marker = this.getMarker(layer.props);
        this.viewer.zoomTo(marker, new HeadingPitchRange(Math.toRadians(0),Math.toRadians(-90),2000));
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
    addMarker(properties, entity= undefined) {
        const id = properties.id + "$" + properties.markerId;
        const isModel = properties.icon && properties.icon.endsWith(".glb") || false;
        const label = properties.hasOwnProperty("label") && properties.label != null ? properties.label : '';
        const iconOffset = new Cartesian2(-properties.iconAnchor[0], -properties.iconAnchor[1]);
        const color =  isDefined(properties.color) ? Color.fromCssColorString(properties.color) : Color.YELLOW;

        let lonLatAlt = [0, 0, 0];

        if (isDefined(properties.location)) {
            lonLatAlt = [properties.location.x, properties.location.y, properties.location.z || 0];
        }

        // get ground altitude if non specified
        if (!isDefined(properties.location.z) || isNaN(properties.location.z)) {
            lonLatAlt[2] = this.getGroundAltitude(properties.location.x, properties.location.y);
            if (lonLatAlt[2] > 1)
                lonLatAlt[2] += 0.3;
        }

        let rot = 0;
        if (isDefined(properties.orientation) && isDefined(properties.orientation.heading)) {
            const heading = properties.orientation.heading;
            // const roll = 0.0;
            rot = Math.toRadians(heading);
        }

        // cartesian position
        let position = Cartesian3.fromDegrees(lonLatAlt[0], lonLatAlt[1], lonLatAlt[2]);

        let orientation = undefined;
        if(isDefined(properties.orientation) && isDefined(properties.orientation.heading)) {
            const DTR = Math.PI / 180.0;
            const heading = properties.orientation.heading;
            const pitch = 0.0;
            orientation = Transforms.headingPitchRollQuaternion(position, new HeadingPitchRoll(heading * DTR, /*roll*DTR*/0.0, pitch * DTR)); // inverse roll and pitch to go from NED to ENU;
        }

        let billboardOpts = undefined;
        let modelOpts = undefined;

        if(!isModel) {
            billboardOpts = {
                id: undefined,
                name: label,
                description: undefined,
                position: undefined,
                image: properties.icon,
                scaleByDistance: new NearFarScalar(1000, 1.0, 10e6, 0.0),
                alignedAxis: (this.viewer.camera.pitch < -Math.PI / 4) ? Cartesian3.UNIT_Z : Cartesian3.ZERO, // Z means rotation is from north
                rotation: rot,
                horizontalOrigin: HorizontalOrigin.LEFT,
                verticalOrigin: VerticalOrigin.TOP,
                pixelOffset: iconOffset,
                pixelOffsetScaleByDistance: new NearFarScalar(1000, 1.0, 10e6, 0.0),
                eyeOffset: new Cartesian3(0, 0, -1 * properties.zIndex), // make sure icon always displays in front,
                show: properties.visible,
                //default values
                heightReference: properties.defaultToTerrainElevation ? HeightReference.CLAMP_TO_GROUND : HeightReference.NONE,
                scale: 1.0,
                imageSubRegion: undefined,
                color: undefined,
                width: undefined,
                height: undefined,
                translucencyByDistance: undefined,
                sizeInMeters: undefined,
                distanceDisplayCondition: undefined,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
        } else {
            modelOpts = {
                id: undefined,
                uri: properties.icon,
                scale: properties.iconScale,
                modelM: Matrix4.IDENTITY.clone(),
                color: color,
                colorBlendMode: ColorBlendMode.MIX,
                colorBlendAmount: 0.5,
                silhouetteColor: color,
                // silhouetteSize: 1.0, // cause image draping crash
                minimumPixelSize: 20,
                maximumScale: 20000,
                show: properties.visible,
                heightReference: properties.defaultToTerrainElevation ? HeightReference.CLAMP_TO_GROUND : HeightReference.NONE,
                alpha: properties.opacity,
                colorBlendAmountEnabled: true,
                imageBasedLightingFactor: undefined,
                lightColor: undefined,
                distanceDisplayCondition: undefined,
                nodeTransformations: undefined,
                articulations: undefined,
                clippingPlanes: undefined,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
        }
        // Add Label primitive
        const labelColor = properties.labelColor || '#FFFFFF';
        const labelSize = properties.labelSize || 16;
        const labelOffset = new Cartesian2(properties.labelOffset[0], properties.labelOffset[1]);
        const labelBackgroundColor = properties.labelBackgroundColor && Color.fromCssColorString(properties.labelBackgroundColor);
        const labelOutlineColor = properties.labelOutlineColor && Color.fromCssColorString(properties.labelOutlineColor);

        const labelOpts = {
            backgroundColor: labelBackgroundColor || undefined,
            backgroundPadding: undefined,
            distanceDisplayCondition: undefined,
            eyeOffset: undefined,
            fillColor: Color.fromCssColorString(labelColor),
            font: labelSize + 'px sans-serif',
            heightReference: properties.defaultToTerrainElevation ? HeightReference.CLAMP_TO_GROUND : HeightReference.NONE,
            horizontalOrigin: HorizontalOrigin.CENTER,
            id: undefined,
            outlineColor: labelOutlineColor || undefined,
            outlineWidth: (labelOutlineColor && 1.0) || undefined,
            pixelOffset: labelOffset,
            pixelOffsetScaleByDistance: new NearFarScalar(150, 1.0, 1e6, 0.0),
            position: Cartesian3.fromDegrees(lonLatAlt[0], lonLatAlt[1], lonLatAlt[2]),
            scale: undefined,
            scaleByDistance: new NearFarScalar(150, 1.0, 1e6, 0.0),
            show: undefined,
            showBackground: (labelBackgroundColor && true) || false,
            style: LabelStyle.FILL_AND_OUTLINE,
            text: label,
            totalScale: undefined,
            translucencyByDistance: undefined,
            verticalOrigin: VerticalOrigin.TOP,
            disableDepthTestDistance: Number.POSITIVE_INFINITY
        }

        // zoom map if first marker update
        if (this.first) {
            this.viewer.camera.flyTo({
                destination : Cartesian3.fromDegrees(lonLatAlt[0], lonLatAlt[1], 1000),
                duration : 1.0
            });
            this.first = false;
        }

        const entityOpts = {
            description: properties.description,
            position: Cartesian3.fromDegrees(lonLatAlt[0], lonLatAlt[1], lonLatAlt[2]),
            orientation: orientation,
            id: id,
            billboard: billboardOpts,
            model: modelOpts,
            label: labelOpts
        };

        if(!isDefined(entity)) {
            const entity = this.viewer.entities.add(entityOpts)

            if (properties.selected) {
                this.viewer.selectedEntity = entity;
            }
            return entity;
        } else {
            // update only properties
            entity.billboard = billboardOpts && {...billboardOpts} || undefined;
            entity.model = modelOpts && {...modelOpts} || undefined;
            entity.label =  labelOpts && {...labelOpts} || undefined;

            entity.name = label;
            entity.position = entityOpts.position;
            entity.description = entityOpts.description;

            return entity;
        }
    }

    updateMarker(props) {
        if (!isDefined(props.location)) {
            return;
        }

        let marker = this.getMarker(props);

        // create one collection for marker entities
        // /!\ If we remove the marker every time such as Primitive, we loose selection tracking!
        // if (isDefined(marker)) {
        //     isSelected = this.viewer.selectedEntity === marker;
        // this.removeMarkerFromLayer(marker);
        // }
        this.addMarkerToLayer(props, this.addMarker(props,marker));
    }

    removeMarkerFromLayer(marker) {
        this.viewer.entities.remove(marker);
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

        const ellipsePrimitive = new GroundPrimitive({
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
            asynchronous: false,
            show: properties.visible
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

        const flatPositions = locations.map(element => Cartesian3.fromDegrees(element.x, element.y, element.z)).flat();

        // check if clamp to terrain
        let polylinePrimitive;

        if(properties.clampToGround) {
            const polylineInstance = new GeometryInstance({
                geometry: new GroundPolylineGeometry({
                    id: id,
                    positions: flatPositions,
                    width: properties.weight,
                    loop: false,
                }),
                id: id,
            });

            polylinePrimitive = new GroundPolylinePrimitive({
                geometryInstances: polylineInstance,
                appearance: new MaterialAppearance({
                    material: new Material({
                        fabric: {
                            type: 'Color',
                            uniforms: {
                                color: Color.fromCssColorString(properties.color)
                            }
                        }
                    }),
                }),
                asynchronous: false,
                show: properties.visible
            });
        } else {
            // use classic primitive
            const polylineInstance = new GeometryInstance({
                geometry: new PolylineGeometry({
                    id: id,
                    positions: flatPositions,
                    width: properties.weight,
                    loop: false,
                }),
                attributes: {
                    color: ColorGeometryInstanceAttribute.fromColor(Color.fromCssColorString(properties.color))
                },
                id: id,
            });

            polylinePrimitive = new Primitive({
                geometryInstances: polylineInstance,
                appearance: new PolylineColorAppearance(),
                asynchronous: false,
                show: properties.visible
            });
        }


        this.viewer.scene.primitives.add(polylinePrimitive);

        return polylinePrimitive;
    }

    /**
     * Updates a given polyline, or adds it if it does not currently exist
     * @param props The properties containing the updated data
     */
    updatePolyline(props) {
        if (!isDefined(props.locations) || props.locations[props.polylineId].length < 2) {
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
     * Adds a polygon to the polygon layer
     * @param {Object} properties the properties to use in constructing the polygon
     * @returns {PrimitiveCollection}
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
                },
            }),
            id: id,
        });

        const polygonPrimitive = new GroundPrimitive({
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
            asynchronous: false,
            show: properties.visible
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
            show: properties.visible
        });

        const collection = new PrimitiveCollection();

        collection.add(polygonPrimitive);
        collection.add(polygonOutlinePrimitive);

        this.viewer.scene.primitives.add(collection);

        return collection;
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

    /**
     * Retrieves the coplanar polygon and updates it or creates a new instance
     * and adds with the given properties the coplanar polygon to the layer
     * @param {Object} properties properties to apply in updating polygon
     */
    updateCoPlanarPolygon(props) {
        let polygonPrimitiveCollection = this.getPolygon(props);
        if (isDefined(polygonPrimitiveCollection)) {
            polygonPrimitiveCollection.removeAll();
            this.viewer.scene.primitives.remove(polygonPrimitiveCollection);
        }
        this.addPolygonToLayer(props, this.addCoPlanarPolygon(props));
    }

    /**
     * Adds a coplanar polygon to the coplanar polygon layer
     * @param {Object} properties the properties to use in constructing the coplanar polygon
     * @returns {Entity}
     */
    addCoPlanarPolygon(properties) {
        // bind the object to the callback property
        const id = properties.id + "$" + properties.polygonId;

        const polygonInstance = new GeometryInstance({
            geometry : new CoplanarPolygonGeometry({
                polygonHierarchy: new PolygonHierarchy(
                    Cartesian3.fromDegreesArrayHeights(
                        properties.vertices[properties.polygonId]
                    )),
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
            asynchronous: false,
            show: properties.visible
        });

        /* const polygonOutlineInstance = new GeometryInstance({
             geometry : new CoplanarPolygonOutlineGeometry({
                 polygonHierarchy: new PolygonHierarchy(Cartesian3.fromDegreesArrayHeights(properties.vertices[properties.polygonId])),
             }),
             attributes : {
                 color : ColorGeometryInstanceAttribute.fromColor(Color.fromRandom({alpha : 0.5}))
             },
             id: id,
         });

         const polygonOutlinePrimitive = new Primitive({
             geometryInstances : polygonOutlineInstance,
             appearance : new MaterialAppearance({
                 material: new Material({
                     fabric: {
                         type: 'Color',
                         uniforms: {
                             color:  Color.fromCssColorString(properties.outlineColor)
                         }
                     }
                 }),
             }),
             asynchronous: false
         });*/

        const collection = new PrimitiveCollection();

        collection.add(polygonPrimitive);
        // collection.add(polygonOutlinePrimitive);

        this.viewer.scene.primitives.add(collection);

        return collection;
    }

    // ----- IMAGE_DRAPING
    /**
     * Updates the image draping associated to the layer.
     * @param {ImageDrapingLayer.props} props - The layer properties allowing the update of the image draping
     */
    async updateDrapedImage(props) {
        if (!isDefined(props.platformLocation)) {
            return;
        }
        let drapedImagePrimitive = this.getDrapedImage(props);
        if (!isDefined(drapedImagePrimitive)) {
            this.addDrapedImageToLayer(props, await this.addDrapedImage(props));
        } else {
            await this.addDrapedImage(props, drapedImagePrimitive)
        }
    }

    async addDrapedImage(props, existingDrapedImagePrimitive) {
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

        let snapshot = false;
        if (props.getSnapshot !== null) {
            snapshot = props.getSnapshot();
        }
        // snapshot
        if (props.snapshot) {
            let ctx = this.captureCanvas.getContext('2d');
            ctx.drawImage(imgSrc, 0, 0, this.captureCanvas.width, this.captureCanvas.height);
            imgSrc = this.captureCanvas;
        }
        const encCamPos = EncodedCartesian3.fromCartesian(camPos);
        const appearance = new MaterialAppearance({
            renderState: {
                depthTest: {
                    enabled: false
                }
            },
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

        if (!isDefined(existingDrapedImagePrimitive) || snapshot) {
            const updatedPositions = await sampleTerrain(this.viewer.terrainProvider, 11, [Cartographic.fromDegrees(llaPos.x, llaPos.y)]);
            const imageDrapingPrimitive = this.viewer.scene.primitives.add(new Primitive({
                geometryInstances: new GeometryInstance({
                    geometry: new RectangleGeometry({
                        rectangle: Rectangle.fromDegrees(llaPos.x - 0.1, llaPos.y - 0.1, llaPos.x + 0.1, llaPos.y + 0.1),
                        height: updatedPositions[0].height,
                        extrudedHeight: llaPos.z - 1
                    })
                }),
                appearance: appearance,
                show: props.visible
            }));

            if (!snapshot) {
                this.viewer.scene.primitives.raiseToTop(imageDrapingPrimitive);
            }
            return imageDrapingPrimitive;
        } else {
            existingDrapedImagePrimitive.appearance = appearance;
            existingDrapedImagePrimitive.show = props.visible;
            return existingDrapedImagePrimitive;
        }
    }

    // -- Frustum
    updateFrustum(props) {
        if(!isDefined(props.origin) || !isDefined(props.fov) || !isDefined(props.range)
            || !isDefined(props.sensorOrientation) || !isDefined(props.platformOrientation)) {
            return;
        }
        let frustumPrimitiveCollection = this.getFrustum(props);
        if (isDefined(frustumPrimitiveCollection)) {
            frustumPrimitiveCollection.removeAll();
            this.viewer.scene.primitives.remove(frustumPrimitiveCollection);
        }

        this.addFrustumToLayer(props, this.addFrustum(props));
    }

    addFrustum(properties) {
        // bind the object to the callback property
        const id = properties.id + "$" + properties.frustumId;

        // NED rotation
        const origin = Cartesian3.fromDegrees(properties.origin.x, properties.origin.y, properties.origin.z);
        Transforms.headingPitchRollQuaternion(origin, new HeadingPitchRoll(0,0,0), Ellipsoid.WGS84, Transforms.northEastDownToFixedFrame, this.nedQuat);

        // platform attitude w/r NED
        // see doc of Quaternion.fromHeadingPitchRoll, heading and roll are about negative z and y axes respectively
        const platformHPR = properties.platformOrientation;
        HeadingPitchRoll.fromDegrees(-platformHPR.heading, -platformHPR.pitch, platformHPR.roll, this.tmpHPR);
        Quaternion.fromHeadingPitchRoll(this.tmpHPR, this.platformQuat);

        // sensor orientation w/r platform
        const sensorYPR = properties.sensorOrientation;
        HeadingPitchRoll.fromDegrees(-sensorYPR.yaw, -sensorYPR.pitch, sensorYPR.roll, this.tmpHPR);
        Quaternion.fromHeadingPitchRoll(this.tmpHPR, this.sensorQuat);

        // compute combined transform
        // goal is to get orientation of frustum in ECEF directly, knowing that the frustum direction is along the Z axis
        Quaternion.multiply(this.nedQuat, this.platformQuat, this.platformQuat); // result is plaformQuat w/r ECEF
        Quaternion.multiply(this.platformQuat, this.sensorQuat, this.sensorQuat); // result is sensorQuat w/r ECEF
        const quat = Quaternion.multiply(this.sensorQuat, this.camQuat, this.sensorQuat); // result is frustum quat w/r ECEF

        const frustum = new PerspectiveFrustum({
            fov : Math.toRadians(properties.fov),
            aspectRatio : 4 / 3,
            near : 1.0,
            far : properties.range
        });

        const frustumInstance = new GeometryInstance({
            geometry: new FrustumGeometry({
                frustum : frustum,
                origin : origin,
                orientation : quat,
                vertexFormat : VertexFormat.POSITION_ONLY
            }),
            id: id,
        });

        const frustumPrimitive = new Primitive({
            geometryInstances : frustumInstance,
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
            asynchronous: false,
            show: properties.visible
        });

        const collection = new PrimitiveCollection();
        collection.add(frustumPrimitive);
        this.viewer.scene.primitives.add(collection);
        return collection;
    }

    removeFrustumFromLayer(frustumPrimitiveCollection) {
        if (isDefined(frustumPrimitiveCollection)) {
            frustumPrimitiveCollection.removeAll();
            this.viewer.scene.primitives.remove(frustumPrimitiveCollection);
        }
    }
}

export default CesiumView;
