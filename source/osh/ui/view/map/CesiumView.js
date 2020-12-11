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

import View from "../View.js";
import {isDefined, randomUUID} from "../../../utils/Utils.js";
import EventManager from "../../../events/EventManager.js";

import {
  when,
  Cartographic,
  Cartesian3,
  Cartesian2,
  knockout,
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
  Ellipsoid, defined,
  EncodedCartesian3, CesiumTerrainProvider
} from 'cesium';

import ImageDrapingVS from "./shaders/ImageDrapingVS.js";
import ImageDrapingFS from "./shaders/ImageDrapingFS.js";
import "cesium/Build/Cesium/Widgets/widgets.css";
import MapView from "./MapView";

/**
 * This class is in charge of displaying GPS/orientation data by adding a marker to the Cesium object.
 * @extends MapView
 * @example

 import CesiumView from 'osh/ui/view/map/CesiumView.js';

 let cesiumMapView = new CesiumView("",
 [{
	layer :  pointMarker,
	name : "Android Phone GPS",
	entityId : androidEntity.id
 },
 {
    layer : new Polyline({
        getLocation : {
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
class CesiumView extends MapView {

  /**
   * Create a View.
   * @param {String} parentElementDivId - The div element to attach to
   * @param {Object[]} viewItems - The initial view items to add
   * @param {String} viewItems.name - The name of the view item
   * @param {Layer} viewItems.layer - The layer object representing the view item
   * @param {Object} options - the properties of the view
   *
   */
  constructor(parentElementDivId, viewItems, properties) {
    super(parentElementDivId, viewItems, properties);

    let cssClass = document.getElementById(this.divId).className;
    document.getElementById(this.divId).setAttribute("class", cssClass + " " + this.css);

    this.imageDrapingPrimitive = null;
    this.imageDrapingPrimitiveReady = false;
    this.frameCount = 0;

    this.captureCanvas = document.createElement('canvas');
    this.captureCanvas.width = 640;
    this.captureCanvas.height = 480;
  }

  /**
   * Updates the marker associated to the layer.
   * @param {Layer} layer - The layer allowing the update of the marker
   * @param {Object} options -
   * @param {Object} options.location -
   * @param {Number} options.location.x -
   * @param {Number} options.location.y -
   * @param {Number} options.location.z -
   * @param {Number} options.orientation -
   * @param {String} options.icon -
   * @param {Number[]} options.iconAnchor - [OffsetX, OffsetY] ex: [10,10]
   * @param {String} options.label -
   * @param {String} options.labelColor -
   * @param {Number} options.labelOffset -
   * @param {Boolean} options.selected -
   * @param {Number} timeStamp -
   *
   */
  updateMarker(layer,timeStamp,options) {
    let marker = this.getMarker(layer);
    if (!isDefined(marker)) {
      const markerObj = this.addMarker({
        lat : layer.location.y,
        lon : layer.location.x,
        alt : layer.location.z,
        orientation : layer.orientation,
        icon : layer.icon,
        iconAnchor : layer.iconAnchor,
        label : layer.label,
        labelColor : layer.labelColor,
        labelSize : layer.labelSize,
        labelOffset : layer.labelOffset,
        name : layer.viewItem.name,
        description : layer.viewItem.description,
        timeStamp: timeStamp,
        selected: ((typeof(options.selected) !== "undefined")? options.selected : false)
      });

      this.addMarkerToLayer(layer, markerObj);
    }

    this.updateMapMarker(layer, {
      lat : layer.location.y,
      lon : layer.location.x,
      alt : layer.location.z,
      orientation : layer.orientation,
      icon : layer.icon,
      label : layer.label,
      labelColor : layer.labelColor,
      labelSize : layer.labelSize,
      timeStamp: timeStamp,
      defaultToTerrainElevation: layer.defaultToTerrainElevation,
      selected:((typeof(options.selected) !== "undefined")? options.selected : false)
    });
  }

  /**
   * Updates the marker associated to the layer.
   * @param {ImageDraping} layer - The layer allowing the update of the marker
   *
   */
  updateDrapedImage(layer,timeStamp,options,snapshot) {

    const llaPos = layer.platformLocation;
    const camPos = Cartesian3.fromDegrees(llaPos.x, llaPos.y, llaPos.z);

    const DTR = Math.PI/180;
    const attitude = layer.platformOrientation;
    const gimbal = layer.gimbalOrientation;

    ///////////////////////////////////////////////////////////////////////////////////
    // compute rotation matrix to transform lookrays from camera frame to ECEF frame //
    ///////////////////////////////////////////////////////////////////////////////////
    const nedTransform = Transforms.northEastDownToFixedFrame(camPos);
    const camRot = new Matrix3();
    Matrix4.getMatrix3(nedTransform, camRot);
    const rotM = new Matrix3();

    // UAV heading, pitch, roll (given in NED frame)
    const uavHeading = Matrix3.fromRotationZ(attitude.heading * DTR, rotM);
    Matrix3.multiply(camRot, uavHeading, camRot);
    const uavPitch = Matrix3.fromRotationY(attitude.pitch * DTR, rotM);
    Matrix3.multiply(camRot, uavPitch, camRot);
    const uavRoll = Matrix3.fromRotationX(attitude.roll * DTR, rotM);
    Matrix3.multiply(camRot, uavRoll, camRot);

    // gimbal angles (on solo gimbal, order is yaw, roll, pitch!)
    const gimbalYaw = Matrix3.fromRotationZ(gimbal.heading * DTR, rotM);
    Matrix3.multiply(camRot, gimbalYaw, camRot);
    const gimbalRoll = Matrix3.fromRotationX(gimbal.roll * DTR, rotM);
    Matrix3.multiply(camRot, gimbalRoll, camRot);
    const gimbalPitch = Matrix3.fromRotationY((90 + gimbal.pitch) * DTR, rotM);
    Matrix3.multiply(camRot, gimbalPitch, camRot);

    // transform to camera frame
    var img2cam = Matrix3.fromRotationZ(90 * DTR, rotM);
    Matrix3.multiply(camRot, img2cam, camRot);

    ////////////////////////////////////////////////////////////////////////////////////

    const camProj = layer.cameraModel.camProj;
    const camDistR = layer.cameraModel.camDistR;
    const camDistT = layer.cameraModel.camDistT;

    let imgSrc = layer.imageSrc;

    {
      // snapshot
      if (snapshot) {
        var ctx = this.captureCanvas.getContext('2d');
        ctx.drawImage(imgSrc, 0, 0, this.captureCanvas.width, this.captureCanvas.height);
        imgSrc = this.captureCanvas;
      }

      const encCamPos = EncodedCartesian3.fromCartesian(camPos);
      const appearance = new MaterialAppearance({
        material : new Material({
          fabric : {
            type : 'Image',
            uniforms : {
              image : imgSrc,
              camPosHigh : encCamPos.high,
              camPosLow : encCamPos.low,
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
        when(promise, function(updatedPositions) {
          //console.log(updatedPositions[0]);
          var newImageDrapingPrimitive = that.viewer.scene.primitives.add(new Primitive({
            geometryInstances: new GeometryInstance({
              geometry: new RectangleGeometry({
                rectangle: Rectangle.fromDegrees(llaPos.x-0.1, llaPos.y-0.1, llaPos.x+0.1, llaPos.y+0.1),
                height: updatedPositions[0].height,
                extrudedHeight: llaPos.z-1
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

  //---------- MAP SETUP --------------//
  beforeAddingItems(options) {
    this.first = true;

    const imageryProviders = createDefaultImageryProviderViewModels();
    this.viewer = new Viewer(this.divId, {
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
      scene3DOnly: true // for draw layer
    });

    this.viewer.terrainProvider = new EllipsoidTerrainProvider();
    this.viewer.scene.copyGlobeDepth = true;
    this.viewer.scene._environmentState.useGlobeDepthFramebuffer = true;

    const self = this;
    knockout.getObservable(this.viewer, '_selectedEntity').subscribe(function(entity) {
      //change icon
    }.bind(this));
  }

  /**
   * Abstract method to remove a marker from its corresponding layer.
   * This is library dependent.
   * @param {Object} marker - The Map marker object
   */
  removeMarkerFromLayer(marker) {
    this.viewer.entities.remove(marker);
  }

  /**
   * Add a marker to the map.
   * @param {Object} properties
   * @param {Number} properties.lon
   * @param {Number} properties.lat
   * @param {String} properties.icon - the icon path
   * @param {String} properties.label - label of the tooltip
   * @param {String} properties.description - description of the marker to display into the tooltip
   * @param {Object} properties.orientation.heading - orientation of the icon in degree
   * @return {string} the id of the new created marker
   */
  addMarker(properties) {

    let imgIcon = 'images/cameralook.png';
    if (properties.icon !== null) {
      imgIcon = properties.icon;
    }
    const isModel = imgIcon.endsWith(".glb");
    const label = properties.hasOwnProperty("label") && properties.label != null ? properties.label : null;
    const fillColor = properties.labelColor;
    const labelSize = properties.labelSize;
    const iconOffset = new Cartesian2(-properties.iconAnchor[0], -properties.iconAnchor[1]);
    const labelOffset = new Cartesian2(properties.labelOffset[0], properties.labelOffset[1]);

    const name = properties.hasOwnProperty("name") && properties.name != null ? properties.name :
        label != null ? label : "Selected Marker";
    const desc = properties.hasOwnProperty("description") && properties.description != null ? properties.description : null;
    const color = properties.hasOwnProperty("color") && isDefined(properties.color) ?
        Color.fromCssColorString(properties.color) : Color.YELLOW;

    var geom;
    if (isModel) {
      geom = {
        name: name,
        description: desc,
        position : Cartesian3.fromDegrees(0, 0, 0),
        label: {
          text: label,
          font: labelSize + 'px sans-serif',
          scaleByDistance: new NearFarScalar(150, 1.0, 1e6, 0.0),
          fillColor: Color.fromCssColorString(fillColor),
          horizontalOrigin: HorizontalOrigin.CENTER,
          verticalOrigin: VerticalOrigin.TOP,
          pixelOffset : labelOffset
        },
        model : {
          uri: imgIcon,
          scale: 4,
          modelM: Matrix4.IDENTITY.clone(),
          color: color
        }
      };
    } else {
      let rot = 0;
      if (properties.orientation !== 'undefined') {
        rot = properties.orientation.heading;
      }

      geom = {
        name: name,
        description: desc,
        position : Cartesian3.fromDegrees(0, 0, 0),
        label: {
          text: label,
          font: labelSize + 'px sans-serif',
          scaleByDistance: new NearFarScalar(150, 1.0, 1e6, 0.0),
          fillColor: Color.fromCssColorString(fillColor),
          horizontalOrigin: HorizontalOrigin.CENTER,
          verticalOrigin: VerticalOrigin.TOP,
          pixelOffset : labelOffset,
          pixelOffsetScaleByDistance: new NearFarScalar(150, 1.0, 1e6, 0.0)
        },
        billboard : {
          image : imgIcon,
          scaleByDistance: new NearFarScalar(1000, 1.0, 10e6, 0.0),
          alignedAxis : Cartesian3.UNIT_Z, // Z means rotation is from north
          rotation : Math.toRadians(rot),
          horizontalOrigin : HorizontalOrigin.LEFT,
          verticalOrigin: VerticalOrigin.TOP,
          pixelOffset : iconOffset,
          pixelOffsetScaleByDistance: new NearFarScalar(1000, 1.0, 10e6, 0.0),
          eyeOffset : new Cartesian3(0, 0, -1) // make sure icon always displays in front
        }
      };
    }

    if (properties.hasOwnProperty('description')) {
      geom.description = properties.description;
    }

    let entity = this.viewer.entities.add(geom);
    let id = 'view-marker-'+randomUUID();
    entity._dsid = id;

    return entity;
  }

  /**
   * Updates the marker associated to the layer.
   * @param {Layer} layer - The layer allowing the update of the marker
   * @param {Object} properties -
   * @param {Object} properties.lon -
   * @param {Object} properties.lat -
   * @param {Object} properties.alt -
   * @param {Object} properties.orientation -
   * @param {Object} properties.icon -
   * @param {Object} properties.defaultToTerrainElevation -
   * @param {Object} properties.selected -
   */
  updateMapMarker(layer, properties) {
    const lon = properties.lon;
    const lat = properties.lat;
    let alt = properties.alt;
    const orient = properties.orientation;
    const labelColor = properties.labelColor;
    const imgIcon = properties.icon;
    var label = properties.label;
    let defaultToTerrainElevation = properties.defaultToTerrainElevation;

    if (!isNaN(lon) && !isNaN(lat)) {
      let marker = this.getMarker(layer);

      // get ground altitude if non specified
      if (isDefined(alt) || isNaN(alt)) {
        alt = this.getAltitude(lat, lon);
        if (alt > 1)
          alt += 0.3;
      }

      // update position
      const pos = Cartesian3.fromDegrees(lon, lat, alt);
      marker.position = pos;

      // update orientation
      if (isDefined(orient)) {
        const DTR = Math.PI/180.;
        const heading = orient.heading;
        const pitch = 0.0;
        const roll = 0.0;
        const quat = Transforms.headingPitchRollQuaternion(pos, new HeadingPitchRoll(heading*DTR, /*roll*DTR*/0.0, pitch*DTR)); // inverse roll and pitch to go from NED to ENU
        marker.orientation = quat;
        if (marker.billboard)
          marker.billboard.rotation = Math.toRadians(heading);
      }

      if (isDefined(label)) {
        marker.label.text = label;
      }

      if (isDefined(labelColor)) {
        marker.label.fillColor = Color.fromCssColorString(labelColor);
      }
      // update icon or model
      if (marker.billboard) {
        if (defaultToTerrainElevation) {
          marker.billboard.heightReference = HeightReference.CLAMP_TO_GROUND;
        }
        marker.billboard.image = imgIcon;
      }
      else if (marker.model)  {
        if (defaultToTerrainElevation) {
          marker.model.heightReference = HeightReference.CLAMP_TO_GROUND;
        }
        marker.model.uri = imgIcon;
      }

      // update label
      //marker.label = properties.label;
      //if (properties.labelColor != null)
      //	marker.label.fillColor = Cesium.Color.fromCssColorString(properties.labelColor);

      // update billboard aligned axis depending on camera angle
      if (marker.billboard) {
        if (this.viewer.camera.pitch < -Math.PI / 4)
          marker.billboard.alignedAxis = Cartesian3.UNIT_Z;
        else
          marker.billboard.alignedAxis = Cartesian3.ZERO;
      }
      // zoom map if first marker update
      if (this.first) {
        this.viewer.zoomTo(this.viewer.entities, new HeadingPitchRange(Math.toRadians(0), Math.toRadians(-90), 2000));
        this.first = false;
      }

      if (properties.selected) {
        this.viewer.selectedEntity = marker;
      }
    }
  }

  /**
   *
   * @private
   */
  getAltitude(lat, lon) {
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

    if (options.hasOwnProperty('minLOD')){
      minLOD = options.minLOD;
    }
    if (options.hasOwnProperty('maxLOD')){
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
}

export default  CesiumView;
