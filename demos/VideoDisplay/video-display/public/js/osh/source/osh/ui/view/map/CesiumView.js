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
	Cartesian3,
	Cartesian2,
	knockout,
	Color,
	HorizontalOrigin,
	VerticalOrigin,
	Math,
	Transforms,
	Matrix3,
	MaterialAppearance,
	Material,
	sampleTerrain,
	GeometryInstance,
	RectangleGeometry,
	Primitive,
	createDefaultImageryProviderViewModels,
	Viewer,
	EllipsoidTerrainProvider,
	NearFarScalar,
	HeadingPitchRoll,
	HeadingPitchRange,
	Ellipsoid, defined,

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

	constructor(parentElementDivId,viewItems, properties) {
		super(parentElementDivId,viewItems,properties);

		let cssClass = document.getElementById(this.divId).className;
		document.getElementById(this.divId).setAttribute("class", cssClass+" "+this.css);

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
	updateMarker(styler,timeStamp,options) {
		let markerId = 0;

		if (!(styler.getId() in this.stylerToObj)) {
			markerId = this.addMarker({
				lat : styler.location.y,
				lon : styler.location.x,
				alt : styler.location.z,
				orientation : styler.orientation,
				icon : styler.icon,
				iconAnchor : styler.iconAnchor,
				label : styler.label,
				labelColor : styler.labelColor,
				labelSize : styler.labelSize,
				labelOffset : styler.labelOffset,
				name : styler.viewItem.name,
				description : styler.viewItem.description,
				timeStamp: timeStamp,
				selected: ((isDefined(options.selected))? options.selected : false)
			});

			this.stylerToObj[styler.getId()] = markerId;
		} else {
			markerId = this.stylerToObj[styler.getId()];
		}

		this.updateMapMarker(markerId, {
			lat : styler.location.y,
			lon : styler.location.x,
			alt : styler.location.z,
			orientation : styler.orientation,
			icon : styler.icon,
			label : styler.label,
			labelColor : styler.labelColor,
			labelSize : styler.labelSize,
			timeStamp: timeStamp,
			defaultToTerrainElevation: styler.defaultToTerrainElevation,
			selected:((isDefined(options.selected))? options.selected : false)
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
	updateDrapedImage(styler,timeStamp,options,snapshot) {

		let llaPos = styler.platformLocation;
		let camPos = Cartesian3.fromDegrees(llaPos.x, llaPos.y, llaPos.z);

		let DTR = Math.PI/180;
		let attitude = styler.platformOrientation;
		let gimbal = styler.gimbalOrientation;

		///////////////////////////////////////////////////////////////////////////////////
		// compute rotation matrix to transform lookrays from camera frame to ECEF frame //
		///////////////////////////////////////////////////////////////////////////////////
		let nedTransform = Transforms.northEastDownToFixedFrame(camPos);
		let camRot = new Matrix3();
		Matrix4.getRotation(nedTransform, camRot);
		let rotM = new Matrix3();

		// UAV heading, pitch, roll (given in NED frame)
		let uavHeading = Matrix3.fromRotationZ(attitude.heading*DTR, rotM);
		Matrix3.multiply(camRot, uavHeading, camRot);
		let uavPitch = Matrix3.fromRotationY(attitude.pitch*DTR, rotM);
		Matrix3.multiply(camRot, uavPitch, camRot);
		let uavRoll = Matrix3.fromRotationX(attitude.roll*DTR, rotM);
		Matrix3.multiply(camRot, uavRoll, camRot);

		// gimbal angles (on solo gimbal, order is yaw, roll, pitch!)
		let gimbalYaw = Matrix3.fromRotationZ(gimbal.heading*DTR, rotM);
		Matrix3.multiply(camRot, gimbalYaw, camRot);
		let gimbalRoll = Matrix3.fromRotationX(gimbal.roll*DTR, rotM);
		Matrix3.multiply(camRot, gimbalRoll, camRot);
		let gimbalPitch = Matrix3.fromRotationY((90+gimbal.pitch)*DTR, rotM);
		Matrix3.multiply(camRot, gimbalPitch, camRot);

		// transform to camera frame
		let img2cam = Matrix3.fromRotationZ(90*DTR, rotM);
		Matrix3.multiply(camRot, img2cam, camRot);

		////////////////////////////////////////////////////////////////////////////////////

		let camProj = styler.cameraModel.camProj;
		let camDistR = styler.cameraModel.camDistR;
		let camDistT = styler.cameraModel.camDistT;

		let imgSrc = styler.imageSrc;

		//if (this.frameCount%60 == 0)
		{
			/*let newImageDrapingPrimitive = this.viewer.scene.primitives.add(new ImageDrapingPrimitive({
                imageSrc: videoElt,
                camPos: camPos,
                camRot: camRot,
                camProj: camProj,
                camDistR: camDistR,
                camDistT: camDistT,
                asynchronous : true
            }));

            // remove previous primitive
            if (styler.snapshotFunc == null) {
                if (this.imageDrapingPrimitive != null) {
                    this.viewer.scene.primitives.remove(this.imageDrapingPrimitive);
                }
                this.imageDrapingPrimitive = newImageDrapingPrimitive;
            }*/

			// snapshot
			if (snapshot) {
				let ctx = this.captureCanvas.getContext('2d');
				ctx.drawImage(imgSrc, 0, 0, this.captureCanvas.width, this.captureCanvas.height);
				imgSrc = this.captureCanvas;
			}

			let encCamPos = EncodedCartesian3.fromCartesian(camPos);
			let appearance = new MaterialAppearance({
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

			/*appearance = new MaterialAppearance({
                material : new Material({
                    fabric : {
                        type: 'Color',
                        uniforms : {
                            color : new Color(1.0, 0.0, 0.0, 0.5)
                        }
                    }
                })
            });*/

			if (this.imageDrapingPrimitive === null || snapshot) {
				if (this.imageDrapingPrimitive === null) {
					this.imageDrapingPrimitive = {};
				}

				let promise = sampleTerrain(this.viewer.terrainProvider, 11, [Cartographic.fromDegrees(llaPos.x, llaPos.y)]);
				let that = this;
				when(promise, function(updatedPositions) {
					//console.log(updatedPositions[0]);
					let newImageDrapingPrimitive = that.viewer.scene.primitives.add(new Primitive({
						geometryInstances: new GeometryInstance({
							geometry: new RectangleGeometry({
								rectangle: Rectangle.fromDegrees(llaPos.x-0.1, llaPos.y-0.1, llaPos.x+0.1, llaPos.y+0.1),
								height: updatedPositions[0].height-100,
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
		knockout.getObservable(this.viewer, '_selectedEntity').subscribe(function(entity) {
			//change icon
			if (defined(entity)) {
				let dataSrcIds = [];
				let entityId;
				for (let stylerId in self.stylerToObj) {
					if(self.stylerToObj[stylerId] === entity._dsid) {
						for(let i=0;i < self.stylers.length;i++) {
							if(self.stylers[i].getId() === stylerId) {
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

		let imgIcon = 'images/pin.png';
		if (properties.icon !== null) {
			imgIcon = properties.icon;
		}
		let isModel = imgIcon.endsWith(".glb");

		let label = properties.hasOwnProperty("label") && properties.label !== null ? properties.label : null;
		let fillColor = properties.labelColor;
		let labelSize = properties.labelSize;
		let labelOffset = properties.labelOffset;

		let name = properties.hasOwnProperty("name") && properties.name !== null ? properties.name :
			label !== null ? label : "Selected Marker";
		let desc = properties.hasOwnProperty("description") && properties.description !== null ? properties.description : null;

		let geom;
		if (isModel)
		{
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
					modelM: Matrix4.IDENTITY.clone()
				}
			};
		}
		else
		{
			let rot = properties.orientation.heading;
			let iconOffset = new Cartesian2(-properties.iconAnchor[0], -properties.iconAnchor[1]);
			let labelOffset = new Cartesian2(properties.labelOffset[0], properties.labelOffset[1]);

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

		let entity = this.viewer.entities.add(geom);
		let id = "view-marker-"+randomUUID();
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
		let label = properties.label;

		let defaultToTerrainElevation = properties.defaultToTerrainElevation;

		if (!isNaN(lon) && !isNaN(lat)) {
			let marker =  this.markers[id];

			// get ground altitude if non specified
			if (typeof(alt) === "undefined" || isNaN(alt) || defaultToTerrainElevation === true) {
				alt = this.getAltitude(lat, lon);
				if (alt > 1) {
					alt += 0.3;
				}
			}

			// update position
			let pos = Cartesian3.fromDegrees(lon, lat, alt);
			marker.position = pos;

			// update orientation
			if (typeof(orient) !== "undefined") {
				let DTR = Math.PI/180.;
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
				marker.billboard.image = imgIcon;
			} else if (marker.model) {
				marker.model.uri = imgIcon;
			}

			// update label
			//marker.label = properties.label;
			//if (properties.labelColor != null)
			//	marker.label.fillColor = Color.fromCssColorString(properties.labelColor);

			// update billboard aligned axis depending on camera angle
			if (this.viewer.camera.pitch < -Math.PI/4) {
				marker.billboard.alignedAxis = Cartesian3.UNIT_Z;
			} else {
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
}
