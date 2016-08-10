OSH.UI.CesiumView = Class.create(OSH.UI.View, {
	
	initialize : function($super, divId,viewItems, properties) {
		$super(divId,viewItems,properties);

		var cssClass = document.getElementById(this.divId).className;
		document.getElementById(this.divId).setAttribute("class", cssClass+" "+this.css);
		
		this.imageDrapingPrimitive = null;
		this.frameCount = 0;
	},

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
	
    updateDrapedImage: function(styler,timeStamp,options) {
		
    	var llaPos = styler.platformLocation;
    	var camPos = Cesium.Cartesian3.fromDegrees(llaPos.x, llaPos.y, llaPos.z);
    	
    	var DTR = Math.PI/180.;
    	var attitude = styler.platformOrientation;
    	var gimbal = styler.gimbalOrientation;
    	var camQuat = Cesium.Transforms.headingPitchRollQuaternion(camPos, (attitude.heading+gimbal.heading)*DTR, /*roll*DTR*/0.0, (-90.0+attitude.pitch+gimbal.pitch)*DTR);
    	//var camQuat = Cesium.Transforms.headingPitchRollQuaternion(camPos, (attitude.heading+gimbal.heading)*DTR, 0.0, (-90.0-42)*DTR);
        var camRot = Cesium.Matrix3.fromQuaternion(camQuat);
        
    	var camProj = styler.cameraModel.camProj;
    	var camDistR = styler.cameraModel.camDistR;
    	var camDistT = styler.cameraModel.camDistT;
    	
    	var videoElt = styler.imageSrc;
    	
    	//if (this.frameCount%60 == 0)
    	{
	    	var newImageDrapingPrimitive = this.viewer.scene.primitives.add(new Cesium.ImageDrapingPrimitive({
	            imageSrc: videoElt,
	            camPos: camPos,
	            camRot: camRot,
	            camProj: camProj,
	            camDistR: camDistR,
	            camDistT: camDistT,
	            asynchronous : false
	        }));
	    	
	    	// remove previous primitive
	    	/*if (this.imageDrapingPrimitive != null) {
	    		this.viewer.scene.primitives.remove(this.imageDrapingPrimitive);
	        }
	    	this.imageDrapingPrimitive = newImageDrapingPrimitive;*/
    	}
    	
    	this.frameCount++;
	},

	//---------- MAP SETUP --------------//
	beforeAddingItems: function ($super, options) {
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
					rotation : Cesium.Math.toRadians(-90),
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
    			var quat = Cesium.Transforms.headingPitchRollQuaternion(pos, heading*DTR, /*roll*DTR*/0.0, pitch*DTR); // inverse roll and pitch to go from NED to ENU
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
	
	getAltitude : function(lat, lon) {
		var position = Cesium.Cartesian3.fromDegrees(lon, lat, 0, this.viewer.scene.globe.ellipsoid, new Cesium.Cartesian3());
		var altitude = this.viewer.scene.globe.getHeight(Cesium.Ellipsoid.WGS84.cartesianToCartographic(position));

		if (altitude == 'undefined' || altitude <= 0)
			altitude = 0.1;
		return altitude;
	},
});