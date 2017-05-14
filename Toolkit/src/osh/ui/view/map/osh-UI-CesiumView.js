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

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
 var cesiumMapView = new OSH.UI.CesiumView("",
 [{
	styler :  pointMarker,
	contextMenuId: circularContextMenuId,
	name : "Android Phone GPS",
	entityId : androidEntity.id
 },
 {
    styler : new OSH.UI.Styler.Polyline({
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
OSH.UI.CesiumView = OSH.UI.View.extend({
	
	initialize : function(parentElementDivId,viewItems, properties) {
		this._super(parentElementDivId,viewItems,properties);

		var cssClass = document.getElementById(this.divId).className;
		document.getElementById(this.divId).setAttribute("class", cssClass+" "+this.css);
		
		this.imageDrapingPrimitive = null;
		this.imageDrapingPrimitiveReady = false;		
		this.frameCount = 0;
		
		this.captureCanvas = document.createElement('canvas');
		this.captureCanvas.width = 640;
		this.captureCanvas.height = 480;
	},

	/**
	 *
	 * @param styler
	 * @param timeStamp
	 * @param options
	 * @instance
	 * @memberof OSH.UI.CesiumView
	 */
	updateMarker : function(styler,timeStamp,options) {
		var markerId = 0;

		if (!(styler.getId() in this.stylerToObj)) {
			markerId = this.addMarker({
				lat : styler.location.y,
				lon : styler.location.x,
				alt : styler.location.z,
				orientation : styler.orientation,
				color : styler.color,
				icon : styler.icon,
				label : styler.label,
				timeStamp: timeStamp,
				selected: ((typeof(options.selected) != "undefined")? options.selected : false)
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
			color : styler.color,
			icon : styler.icon,
			timeStamp: timeStamp,
			selected:((typeof(options.selected) != "undefined")? options.selected : false)
		});
	},

	/**
	 *
	 * @param styler
	 * @param timeStamp
	 * @param options
	 * @instance
	 * @memberof OSH.UI.CesiumView
	 *
	 */
    updateDrapedImage: function(styler,timeStamp,options,snapshot) {
		
    	var llaPos = styler.platformLocation;
    	var camPos = Cesium.Cartesian3.fromDegrees(llaPos.x, llaPos.y, llaPos.z);
    	
    	var DTR = Math.PI/180.;
    	var attitude = styler.platformOrientation;
    	var gimbal = styler.gimbalOrientation;
    	
    	///////////////////////////////////////////////////////////////////////////////////
    	// compute rotation matrix to transform lookrays from camera frame to ECEF frame //
    	///////////////////////////////////////////////////////////////////////////////////
    	var nedTransform = Cesium.Transforms.northEastDownToFixedFrame(camPos);
    	var camRot = new Cesium.Matrix3();
    	Cesium.Matrix4.getRotation(nedTransform, camRot);    	
    	var rotM = new Cesium.Matrix3();
    	
        // UAV heading, pitch, roll (given in NED frame)
    	var uavHeading = Cesium.Matrix3.fromRotationZ(attitude.heading*DTR, rotM);
    	Cesium.Matrix3.multiply(camRot, uavHeading, camRot);    	
        var uavPitch = Cesium.Matrix3.fromRotationY(attitude.pitch*DTR, rotM);
        Cesium.Matrix3.multiply(camRot, uavPitch, camRot);
        var uavRoll = Cesium.Matrix3.fromRotationX(attitude.roll*DTR, rotM);
        Cesium.Matrix3.multiply(camRot, uavRoll, camRot);
        
        // gimbal angles (on solo gimbal, order is yaw, roll, pitch!)
        var gimbalYaw = Cesium.Matrix3.fromRotationZ(gimbal.heading*DTR, rotM);
        Cesium.Matrix3.multiply(camRot, gimbalYaw, camRot);
        var gimbalRoll = Cesium.Matrix3.fromRotationX(gimbal.roll*DTR, rotM);
        Cesium.Matrix3.multiply(camRot, gimbalRoll, camRot);
        var gimbalPitch = Cesium.Matrix3.fromRotationY((90+gimbal.pitch)*DTR, rotM);
        Cesium.Matrix3.multiply(camRot, gimbalPitch, camRot);
        
        // transform to camera frame
        var img2cam = Cesium.Matrix3.fromRotationZ(90*DTR, rotM);
        Cesium.Matrix3.multiply(camRot, img2cam, camRot);

        ////////////////////////////////////////////////////////////////////////////////////
        
    	var camProj = styler.cameraModel.camProj;
    	var camDistR = styler.cameraModel.camDistR;
    	var camDistT = styler.cameraModel.camDistT;
    	
    	var imgSrc = styler.imageSrc;
    	
    	//if (this.frameCount%60 == 0)
    	{
	    	/*var newImageDrapingPrimitive = this.viewer.scene.primitives.add(new Cesium.ImageDrapingPrimitive({
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
                var ctx = this.captureCanvas.getContext('2d');
                ctx.drawImage(imgSrc, 0, 0, this.captureCanvas.width, this.captureCanvas.height);
                imgSrc = this.captureCanvas;                
            }
    	    
    	    var encCamPos = Cesium.EncodedCartesian3.fromCartesian(camPos);
    	    var appearance = new Cesium.MaterialAppearance({
                material : new Cesium.Material({
                    fabric : {
                        type : 'Image',
                        uniforms : {
                            image : imgSrc,
                            camPosHigh : encCamPos.high,
                            camPosLow : encCamPos.low,
                            camAtt: Cesium.Matrix3.toArray(Cesium.Matrix3.transpose(camRot, new Cesium.Matrix3())),
                            camProj: Cesium.Matrix3.toArray(camProj),
                            camDistR: camDistR,
                            camDistT: camDistT
                        }
                    }
                }),
                vertexShaderSource: Cesium._shaders.ImageDrapingVS,
                fragmentShaderSource: Cesium._shaders.ImageDrapingFS
            });
    	    
    	    /*appearance = new Cesium.MaterialAppearance({
                material : new Cesium.Material({
                    fabric : {
                        type: 'Color',
                        uniforms : {
                            color : new Cesium.Color(1.0, 0.0, 0.0, 0.5)
                        }
                    }
                })
            });*/
    	    
    	    if (this.imageDrapingPrimitive == null || snapshot) {    	        
    	        if (this.imageDrapingPrimitive == null)
    	            this.imageDrapingPrimitive = {};
    	        
    	        var promise = Cesium.sampleTerrain(this.viewer.terrainProvider, 11, [Cesium.Cartographic.fromDegrees(llaPos.x, llaPos.y)]);
    	        var that = this;
                Cesium.when(promise, function(updatedPositions) {
                    //console.log(updatedPositions[0]);
                    var newImageDrapingPrimitive = that.viewer.scene.primitives.add(new Cesium.Primitive({
                        geometryInstances: new Cesium.GeometryInstance({
                            geometry: new Cesium.RectangleGeometry({
                                rectangle: Cesium.Rectangle.fromDegrees(llaPos.x-0.1, llaPos.y-0.1, llaPos.x+0.1, llaPos.y+0.1),
                                height: updatedPositions[0].height-100,
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
	},

	//---------- MAP SETUP --------------//
	/**
	 *
	 * @param $super
	 * @param options
	 * @instance
	 * @memberof OSH.UI.CesiumView
	 */
	beforeAddingItems: function (options) {
		this.markers = {};
	    this.first = true;
	    
	    var imageryProviders = Cesium.createDefaultImageryProviderViewModels();
	    this.viewer = new Cesium.Viewer(this.divId, {
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
			targetFrameRate: 10
	    });
	    
	    this.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
	        url : '//assets.agi.com/stk-terrain/world'
	    });
	    
	    this.viewer.scene.copyGlobeDepth = true;
	    this.viewer.scene._environmentState.useGlobeDepthFramebuffer = true;
	    
	    var self = this;
	    Cesium.knockout.getObservable(this.viewer, '_selectedEntity').subscribe(function(entity) {
	        //change icon
	        if (Cesium.defined(entity)) {
	        	var dataSrcIds = [];
	        	var entityId;
		    	for (var stylerId in self.stylerToObj) {
		    		if(self.stylerToObj[stylerId] == entity._dsid) {
		    			for(var i=0;i < self.stylers.length;i++) {
			    			if(self.stylers[i].getId() == stylerId) {
			    				dataSrcIds = dataSrcIds.concat(self.stylers[i].getDataSourcesIds());
			    				entityId = self.stylers[i].viewItem.entityId;
				    			break;
			    			}
		    			}
		    		}
		    	}
		    	OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
                    dataSourcesIds: dataSrcIds,
                    entityId : entityId
                });
	        }
	    }.bind(this));
	},

	/**
	 *
	 * @param properties
	 * @returns {string}
	 * @instance
	 * @memberof OSH.UI.CesiumView
	 */
	addMarker : function(properties) {
		
		var imgIcon = 'images/cameralook.png';
		if(properties.icon != null) {
			imgIcon = properties.icon;
		}
		var isModel = imgIcon.endsWith(".glb");
		var name = properties.label;
		var geom;
		
		if (isModel)
		{
			geom = {
				name: name,
				position : Cesium.Cartesian3.fromDegrees(0, 0, 0),
				model : {
					uri: imgIcon,
					scale: 4,
					modelM: Cesium.Matrix4.IDENTITY.clone()
				}
			};
		}
		else
		{
			geom = {
				//name: properties.label,
				position : Cesium.Cartesian3.fromDegrees(0, 0, 0),
				billboard : {
					image : imgIcon,
					rotation : Cesium.Math.toRadians(0),
					horizontalOrigin : Cesium.HorizontalOrigin.CENTER
				}
			};
		}
		
		var entity = this.viewer.entities.add(geom);
		var id = "view-marker-"+OSH.Utils.randomUUID();
		entity._dsid = id;
		this.markers[id] = entity;
		
		return id;
	},

	/**
	 *
	 * @param id
	 * @param properties
	 * @instance
	 * @memberof OSH.UI.CesiumView
	 */
	updateMapMarker: function(id, properties) {
		var lon = properties.lon;
        var lat = properties.lat;
        var alt = properties.alt;
        var orient = properties.orientation;
        var imgIcon = properties.icon;
        
        if (!isNaN(lon) && !isNaN(lat)) {
        	var marker =  this.markers[id];
        	
        	// get ground altitude if non specified
        	if (typeof(alt) == "undefined" || isNaN(alt))
        	{
	    		alt = this.getAltitude(lat, lon);
	    		if (alt > 1)
	    			alt += 0.3;
    		}

    		// update position
        	var pos = Cesium.Cartesian3.fromDegrees(lon, lat, alt);
    		marker.position = pos
    		    		
    		// update orientation
    		if (typeof(orient) != "undefined")
    	    {
    			var DTR = Math.PI/180.;
    			var heading = orient.heading;
	    		var pitch = 0.0;
	    		var roll = 0.0;
	    		var quat = Cesium.Transforms.headingPitchRollQuaternion(pos, new Cesium.HeadingPitchRoll(heading*DTR, /*roll*DTR*/0.0, pitch*DTR)); // inverse roll and pitch to go from NED to ENU
	    		marker.orientation = quat;
    	    }
    		
    		// update icon or models
    		//marker.billboard.image = imgIcon;
    		
    		// zoom map if first marker update
    		if (this.first) {
    			this.viewer.zoomTo(this.viewer.entities, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 2000));
    			this.first = false;
    		}
    		
    		if (properties.selected) {
    			 this.viewer.selectedEntity = marker;
    		}
        }
	},

	/**
	 *
	 * @param lat
	 * @param lon
	 * @returns {Number|undefined}
	 * @instance
	 * @memberof OSH.UI.CesiumView
	 */
	getAltitude : function(lat, lon) {
		var position = Cesium.Cartesian3.fromDegrees(lon, lat, 0, this.viewer.scene.globe.ellipsoid, new Cesium.Cartesian3());
		var altitude = this.viewer.scene.globe.getHeight(Cesium.Ellipsoid.WGS84.cartesianToCartographic(position));

		if (altitude == 'undefined' || altitude <= 0)
			altitude = 0.1;
		return altitude;
	},
});