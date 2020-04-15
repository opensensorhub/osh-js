/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Sensia Software LLC. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>
 Author: Alex Robin <alex.robin@sensiasoft.com>

 ******************************* END LICENSE BLOCK ***************************/

import {View} from "../View.js";
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
  EncodedCartesian3
} from 'cesium';

import ImageDrapingVS from "./shaders/ImageDrapingVS.js";
import ImageDrapingFS from "./shaders/ImageDrapingFS.js";
import "cesium/Build/Cesium/Widgets/widgets.css";

/**
 * @classdesc
 * @class
 * @type {View}
 * @augments View
 * @example
 let cesiumMapView = new CesiumView("",
 [{
	styler :  pointMarker,
	contextMenuId: circularContextMenuId,
	name : "Android Phone GPS",
	entityId : androidEntity.id
 },
 {
    styler : new Polyline({
        locationFunc : {
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
export default class CesiumView extends View {

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
   *
   * @param styler
   * @param timeStamp
   * @param options
   * @instance
   * @memberof CesiumView
   */
  updateMarker(styler, timeStamp, options) {
    let markerId = 0;

    if (!(styler.getId() in this.stylerToObj)) {
      markerId = this.addMarker({
        lat: styler.location.y,
        lon: styler.location.x,
        alt: styler.location.z,
        orientation: styler.orientation,
        icon: styler.icon,
        iconAnchor: styler.iconAnchor,
        label: styler.label,
        labelColor: styler.labelColor,
        labelSize: styler.labelSize,
        labelOffset: styler.labelOffset,
        name: styler.viewItem.name,
        description: styler.viewItem.description,
        timeStamp: timeStamp,
        selected: ((isDefined(options.selected)) ? options.selected : false)
      });

      this.stylerToObj[styler.getId()] = markerId;
    } else {
      markerId = this.stylerToObj[styler.getId()];
    }

    this.updateMapMarker(markerId, {
      lat: styler.location.y,
      lon: styler.location.x,
      alt: styler.location.z,
      orientation: styler.orientation,
      icon: styler.icon,
      label: styler.label,
      labelColor: styler.labelColor,
      labelSize: styler.labelSize,
      timeStamp: timeStamp,
      defaultToTerrainElevation: styler.defaultToTerrainElevation,
      selected: ((isDefined(options.selected)) ? options.selected : false)
    });
  }

  /**
   *
   * @param styler
   * @param timeStamp
   * @param options
   * @instance
   * @memberof CesiumView
   *
   */
  updateDrapedImage(styler, timeStamp, options, snapshot) {

    var llaPos = styler.platformLocation;
    var camPos = Cartesian3.fromDegrees(llaPos.x, llaPos.y, llaPos.z);

    var DTR = Math.PI/180;
    var attitude = styler.platformOrientation;
    var gimbal = styler.gimbalOrientation;

    ///////////////////////////////////////////////////////////////////////////////////
    // compute rotation matrix to transform lookrays from camera frame to ECEF frame //
    ///////////////////////////////////////////////////////////////////////////////////
    var nedTransform = Transforms.northEastDownToFixedFrame(camPos);
    var camRot = new Matrix3();
    Matrix4.getMatrix3(nedTransform, camRot);
    var rotM = new Matrix3();

    // UAV heading, pitch, roll (given in NED frame)
    var uavHeading = Matrix3.fromRotationZ(attitude.heading * DTR, rotM);
    Matrix3.multiply(camRot, uavHeading, camRot);
    var uavPitch = Matrix3.fromRotationY(attitude.pitch * DTR, rotM);
    Matrix3.multiply(camRot, uavPitch, camRot);
    var uavRoll = Matrix3.fromRotationX(attitude.roll * DTR, rotM);
    Matrix3.multiply(camRot, uavRoll, camRot);

    // gimbal angles (on solo gimbal, order is yaw, roll, pitch!)
    var gimbalYaw = Matrix3.fromRotationZ(gimbal.heading * DTR, rotM);
    Matrix3.multiply(camRot, gimbalYaw, camRot);
    var gimbalRoll = Matrix3.fromRotationX(gimbal.roll * DTR, rotM);
    Matrix3.multiply(camRot, gimbalRoll, camRot);
    var gimbalPitch = Matrix3.fromRotationY((90 + gimbal.pitch) * DTR, rotM);
    Matrix3.multiply(camRot, gimbalPitch, camRot);

    // transform to camera frame
    var img2cam = Matrix3.fromRotationZ(90 * DTR, rotM);
    Matrix3.multiply(camRot, img2cam, camRot);

    ////////////////////////////////////////////////////////////////////////////////////

    var camProj = styler.cameraModel.camProj;
    var camDistR = styler.cameraModel.camDistR;
    var camDistT = styler.cameraModel.camDistT;

    var imgSrc = styler.imageSrc;

    {
      // snapshot
      if (snapshot) {
        var ctx = this.captureCanvas.getContext('2d');
        ctx.drawImage(imgSrc, 0, 0, this.captureCanvas.width, this.captureCanvas.height);
        imgSrc = this.captureCanvas;
      }

      var encCamPos = EncodedCartesian3.fromCartesian(camPos);
      var appearance = new MaterialAppearance({
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
        if (this.imageDrapingPrimitive === null) {
          this.imageDrapingPrimitive = {};
        }

        var promise = sampleTerrain(this.viewer.terrainProvider, 11, [Cartographic.fromDegrees(llaPos.x, llaPos.y)]);
        var that = this;
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

          if (!snapshot) {
            that.imageDrapingPrimitive = newImageDrapingPrimitive;
          }

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
  /**
   *
   * @param options
   * @instance
   * @memberof CesiumView
   */
  beforeAddingItems(options) {
    this.markers = {};
    this.first = true;

    let imageryProviders = createDefaultImageryProviderViewModels();
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

    let self = this;
    knockout.getObservable(this.viewer, '_selectedEntity').subscribe(function (entity) {
      //change icon
      if (defined(entity)) {
        let dataSrcIds = [];
        let entityId;
        for (let stylerId in self.stylerToObj) {
          if (self.stylerToObj[stylerId] === entity._dsid) {
            for (let i = 0; i < self.stylers.length; i++) {
              if (self.stylers[i].getId() === stylerId) {
                dataSrcIds = dataSrcIds.concat(self.stylers[i].getDataSourcesIds());
                entityId = self.stylers[i].viewItem.entityId;
                break;
              }
            }
          }
        }

        EventManager.fire(EventManager.EVENT.SELECT_VIEW, {
          dataSourcesIds: dataSrcIds,
          entityId: entityId
        });
      } else {
        EventManager.fire(EventManager.EVENT.SELECT_VIEW, {
          dataSourcesIds: [],
          entityId: null
        });
      }
    }.bind(this));
  }

  /**
   *
   * @param properties
   * @returns {string}
   * @instance
   * @memberof CesiumView
   */
  addMarker(properties) {

    let imgIcon = 'images/cameralook.png';
    if(properties.icon !== null) {
      imgIcon = properties.icon;
    }
    let isModel = imgIcon.endsWith('.glb');
    let name = properties.label ? properties.label : 'Selected Marker';
    let geom;
    let color = properties.color ? Color.fromCssColorString(properties.color) : Color.YELLOW;
    let description = (properties.description) ? properties.description : null;

    if (isModel)
    {
      geom = {
        name: name,
        description: description,
        position: Cartesian3.fromDegrees(0, 0, 0),
        model: {
          uri: imgIcon,
          scale: 4,
          modelM: Matrix4.IDENTITY.clone(),
          color: color
        }
      };
    }
    else
    {
      let rot = 0;
      if (properties.orientation !== 'undefined') {
        rot = properties.orientation.heading;
      }
      geom = {
        name: name,
        description: description,
        position : Cartesian3.fromDegrees(0, 0, 0),
        billboard : {
          image : imgIcon,
          alignedAxis : Cartesian3.UNIT_Z, // axis is in ENU frame, Z means rotation is from north
          rotation : Math.toRadians(rot),
          scaleByDistance : new NearFarScalar(4, 1, 5e5, 0.2), // set icon scale by distance in meters (near distance, near scale, far distance, far scale)
          horizontalOrigin : HorizontalOrigin.CENTER,
          eyeOffset : new Cartesian3(0,0,-1) // make sure icon always displays in front
        }
      };
    }

    if (properties.hasOwnProperty('description')) {
      geom.description = properties.description;
    }

    let entity = this.viewer.entities.add(geom);
    let id = 'view-marker-'+randomUUID();
    entity._dsid = id;
    this.markers[id] = entity;

    return id;
  }

  /**
   *
   * @param id
   * @param properties
   * @instance
   * @memberof CesiumView
   */
  updateMapMarker(id, properties) {
    let lon = properties.lon;
    let lat = properties.lat;
    let alt = properties.alt;
    let orient = properties.orientation;
    let imgIcon = properties.icon;
    let defaultToTerrainElevation = properties.defaultToTerrainElevation;

    if (!isNaN(lon) && !isNaN(lat)) {
      let marker = this.markers[id];

      // get ground altitude if non specified
      if (typeof (alt) === "undefined" || isNaN(alt)) {
        alt = this.getAltitude(lat, lon);
        if (alt > 1)
          alt += 0.3;
      }

      // update position
      let pos = Cartesian3.fromDegrees(lon, lat, alt);
      marker.position = pos;

      // update orientation
      if (typeof(orient) !== 'undefined') {
        let DTR = Math.PI/180.0;
        let heading = orient.heading;
        let pitch = 0.0;
        let roll = 0.0;
        let quat = Transforms.headingPitchRollQuaternion(pos, new HeadingPitchRoll(heading*DTR, /*roll*DTR*/0.0, pitch*DTR)); // inverse roll and pitch to go from NED to ENU
        marker.orientation = quat;
        if (marker.billboard) {
          marker.billboard.rotation = Math.toRadians(heading);
        }
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
   * @param lat
   * @param lon
   * @returns {Number|undefined}
   * @instance
   * @memberof CesiumView
   */
  getAltitude(lat, lon) {
    let position = Cartesian3.fromDegrees(lon, lat, 0, this.viewer.scene.globe.ellipsoid, new Cartesian3());
    let altitude = this.viewer.scene.globe.getHeight(Ellipsoid.WGS84.cartesianToCartographic(position));

    if (isDefined(altitude) || altitude <= 0) {
      altitude = 0.1;
    }
    return altitude;
  }

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
