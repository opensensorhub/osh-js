OSH.UI.CesiumView = Class.create(OSH.UI.View,{
  initialize: function($super,divId,options) {
      $super(divId);
      this.first = true;
      
      this.init();
  },
  
  init: function() {
    this.viewer = new Cesium.Viewer(this.divId, {
            targetFrameRate: 10,
            timeline: false,
            homeButton: false,
            navigationInstructionsInitiallyVisible: false,
            navigationHelpButton: false,
            geocoder: false,
            fullscreenButton: false,
            showRenderLoopErrors: false

    });

    var west = Cesium.Math.toRadians(0);
    var south = Cesium.Math.toRadians(0);
    var east = Cesium.Math.toRadians(0);
    var north = Cesium.Math.toRadians(0);
    var rect = new Cesium.Rectangle(west, south, east, north);
    this.camPos = new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-10), Cesium.Math.toRadians(-30), 5000.0);

    var targetEntities = [];

    //viewer.clock.shouldAnimate = true;
    this.viewer.clock.multiplier = 5;
    //viewer.scene.globe.depthTestAgainstTerrain = true;

    var terrainProvider = new Cesium.CesiumTerrainProvider({
        url: 'http://assets.agi.com/stk-terrain/world'
    });
    this.viewer.terrainProvider = terrainProvider;
    //viewer.scene.globe.depthTestAgainstTerrain = true;
    
    this.dataMarkers = [];
    
    this.selectedDataMarker = null;
    Cesium.knockout.getObservable(this.viewer, '_selectedEntity').subscribe(function(entity) {
        if(this.selectedDataMarker != null) 
        {
          this.selectedDataMarker.entity.billboard.image = 'images/cameralook.png';
        }
        //change icon
        if (Cesium.defined(entity)) {
            var dataMarker = null;
            for(var i = 0; i < this.dataMarkers.length;i++) {
              if(this.dataMarkers[i].entity.id == entity.id) {
                dataMarker = this.dataMarkers[i];
                break;
              } 
            }
            var memo = [];
    
            if(dataMarker.latLonDataViewId && dataMarker.latLonDataViewId != null) {
                memo.push(dataMarker.latLonDataViewId);
            }
            
            if(dataMarker.orientationDataViewId && dataMarker.orientationDataViewId != null) {
               memo.push(dataMarker.orientationDataViewId);
            }
            
            //change icon
            dataMarker.entity.billboard.image = 'images/cameralook-selected.png';
            this.selectedDataMarker = dataMarker;
            $(this.divId).fire("osh:dataView",memo);
        }
    }.bind(this));
  },
  
  addDataMarker: function(params) {
    if(!params.orientationDataViewId || !params.latLonDataViewId){
        return;
    }
    
    if(params.orientationDataViewId == null && params.latLonDataViewId == null) {
      return;
    }
    
    // gps position
    var entity = this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(0, 0, 0),
        billboard : {
            image : 'images/cameralook.png',
            rotation: Cesium.Math.toRadians(-90),
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER
        }
    });
    
    var dataMarker= {
      orientationDataViewId: '',
      latLonDataViewId:'',
      associatedDataViews: [],
      entity: entity
    };
    
    if(params.orientationDataViewId && params.orientationDataViewId != null) {
      dataMarker.orientationDataViewId = params.orientationDataViewId;
    }
    
    if(params.latLonDataViewId && params.latLonDataViewId != null) {
       dataMarker.latLonDataViewId = params.latLonDataViewId;
    }
    
    if(params.associatedDataViews) {
      dataMarker.associatedDataViews = params.associatedDataViews;
    }
    
    this.dataMarkers.push(dataMarker);
    
  },
  
  getAltitude: function(lat,lon) {
    var position = Cesium.Cartesian3.fromDegrees(lon, lat, 0, this.viewer.scene.globe.ellipsoid, new Cesium.Cartesian3());
    var altitude = this.viewer.scene.globe.getHeight(Cesium.Ellipsoid.WGS84.cartesianToCartographic(position));

    if (altitude == 'undefined' || altitude <= 0) altitude = 0.1;
    return altitude;
  },
  
  hasDataView: function($super,dataViewId) {
  },
  
  update: function($super,dataViewId, data) {
    for(var i=0;i < this.dataMarkers.length;i++) {
      var dataMarker = this.dataMarkers[i];
      if(dataMarker.orientationDataViewId == dataViewId) {
        this.updateDataMarkerOrientation(dataMarker,data);
      } else if(dataMarker.latLonDataViewId == dataViewId) {
        this.updateDataMarkerPosition(dataMarker, data);
      }
    }
  },
  
  updateDataMarkerPosition: function(dataMarker, data) {
    var julianDate = Cesium.JulianDate.fromIso8601(new Date(data.timeStamp).toISOString());
    // set clock to GPS time
    this.viewer.clock.currentTime = julianDate;
    
    // update sensor position marker
    var lon = data.data.lon;
    var lat = data.data.lat;
    var alt = data.data.alt;
    
    var rfPos = [lon, lat, alt];
    var altitude = this.getAltitude(lat, lon);
    if (altitude > 1) {
        altitude += 0.3;
    }

    dataMarker.entity.position = Cesium.Cartesian3.fromDegrees(lon, lat, altitude);

    if (this.first && this.viewer.trackedEntity != 'undefined') {
        this.viewer.zoomTo(this.viewer.entities, this.camPos);
        this.first = false;
    }
  },
  
  updateDataMarkerOrientation: function(dataMarker, data) {
    //TODO
  },
  
  selectDataView: function($super,idArr) {
    var select = false;
    for(var i=0;i < this.dataMarkers.length; i++) {
      var dataMarker = this.dataMarkers[i];
      if(idArr.indexOf(dataMarker.latLonDataViewId) >=0 ||
         idArr.indexOf(dataMarker.orientationDataViewId) >=0) {
         select = true;
      } else {
        for(var j= 0 ; j < dataMarker.associatedDataViews.length;j++) {
          var associatedView = dataMarker.associatedDataViews[j];
          if(idArr.indexOf(associatedView) >=0) {
            select = true;
            break;
          }
        }
      }
      if(select) {
        break;
      }
    }
    if(select) {
      //select entity
      this.viewer.selectedEntity =  dataMarker.entity;                                      
      //this.viewer.trackedEntity =  dataMarker.entity;
    }
  }
});
