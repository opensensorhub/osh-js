var leafletMarkerNormalIcon = './images/cameralook.png';
var leafletMarkerSelectedIcon = './images/cameralook-selected.png';

OSH.UI.LeafletView = Class.create(OSH.UI.View,{
  initialize: function($super,divId,options) {
      $super(divId);
      // set up the map
      this.map = new L.Map(this.divId, {
         fullscreenControl: true
      });
      this.map.setView(new L.LatLng(0, 0), 15);
      this.initLayers();
      this.dataMarkers = [];
      this.first = true;
  },
  
  initLayers: function() {
    // create the tile layer with correct attribution
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {
          minZoom: 1,
          maxZoom: 17,
          attribution: osmAttrib
    });
    this.map.addLayer(osm);
  },
  
  addDataMarker: function(params) {
    if(!params.orientationDataViewId || !params.latLonDataViewId){
        return;
    }
    
    if(params.orientationDataViewId == null && params.latLonDataViewId == null) {
      return;
    }
    
    var dataMarker = new OSH.UI.LeafletMarkerView(this.divId);
    
    if(params.orientationDataViewId) {
      dataMarker.setOrientationDataViewId(params.orientationDataViewId);
    }
    
    if(params.latLonDataViewId) {
      dataMarker.setLatLonDataViewId(params.latLonDataViewId);
    }
    
    if(params.associatedDataViews) {
      dataMarker.addAssociatedDataViews(params.associatedDataViews);
    }
    this.dataMarkers.push(dataMarker);
    
    dataMarker.getMarker().addTo(this.map);
    if(params.displayPath != "undefined" && params.displayPath) {
      if(!this.tablePaths) {
        this.tablePaths = new Hashtable();
      }
      
      var pathCoordinates = [];
      //create path
      var path = new L.Polyline(pathCoordinates, {
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
      }).addTo(this.map);
    
      this.tablePaths.put(dataMarker.getId(), {path:path, coordinates:pathCoordinates});
    }
    
    dataMarker.onChangePosition = function(lat,lon) {
      //update path
      if(this.tablePaths.containsKey(dataMarker.getId())) {
        var pathData = this.tablePaths.get(dataMarker.getId());
        var pathCoordinates = pathData.coordinates;
        var path = pathData.path;
        
        if (pathCoordinates.length > 200) {
          pathCoordinates.shift();
        }
        // removes the layer
        this.map.removeLayer(path);
    
        // pushes new coordinates
        pathCoordinates.push(new L.LatLng(lat, lon));
        
        // adds the new layer
        var path = new L.Polyline(pathCoordinates, {
           color: 'blue',
           weight: 5,
           opacity: 0.5,
           smoothFactor: 1
        }).addTo(this.map);
        
        this.tablePaths.put(dataMarker.getId(), {path:path, coordinates:pathCoordinates});
        
        if(this.first) {
          this.map.setView(new L.LatLng(lat, lon), this.map.getZoom());
          this.first = false;
        }  
      }
    }.bind(this);
    
    //binds popup if any
    if(params.popupDivId) {
        //create popup 
        var popupDivId = "view-datamarker-popup-"+OSH.Utils.randomUUID();
        
        // creates div element to encapsulate img tag
        var div = document.createElement('div');
        div.setAttribute("id",popupDivId);
        
        div.appendChild(document.getElementById(params.popupDivId));        
        // binds the popup
        dataMarker.getMarker().bindPopup(div, {
          offset: new L.Point(0, -16),
          autoPan:false
        });
    }
  },
  
  hasDataView: function($super,dataViewId) {
      var hasDataView = false;
      for(var i =0; i < this.dataMarkers.length;i++) {
        if(this.dataMarkers[i].hasDataViews()) {
          hasDataView = true;
          break; 
        }
      }
      return hasDataView;
  },
  
  update: function($super,dataViewId, data) {
    for(var i=0;i < this.dataMarkers.length;i++) {
      this.dataMarkers[i].update(dataViewId,data);
    }
  },
  
  selectDataView: function($super,idArr) {
    for(var i=0;i < this.dataMarkers.length;i++) {
      this.dataMarkers[i].selectDataView(idArr);
    }
  }
});

/***  little hack starts here ***/
L.Map = L.Map.extend({
    openPopup: function(popup) {
        this._popup = popup;
        return this.addLayer(popup).fire('popupopen', {
            popup: this._popup
        });
    }
}); 

// Defines rotated marker
(function() {
  // save these original methods before they are overwritten
  var proto_initIcon = L.Marker.prototype._initIcon;
  var proto_setPos = L.Marker.prototype._setPos;

  var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');

  L.Marker.addInitHook(function () {
      var iconAnchor = this.options.icon.options.iconAnchor;
      if (iconAnchor) {
          iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
      }
      this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom' ;
      this.options.rotationAngle = this.options.rotationAngle || 0;
  });

  L.Marker.include({
      _initIcon: function() {
          proto_initIcon.call(this);
      },

      _setPos: function (pos) {
          proto_setPos.call(this, pos);

          if(this.options.rotationAngle) {
              this._icon.style[L.DomUtil.TRANSFORM+'Origin'] = this.options.rotationOrigin;

              if(oldIE) {
                  // for IE 9, use the 2D rotation
                  this._icon.style[L.DomUtil.TRANSFORM] = ' rotate(' + this.options.rotationAngle + 'deg)';
              } else {
                  // for modern browsers, prefer the 3D accelerated version
                  this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
              }
          }
      },

      setRotationAngle: function(angle) {
          this.options.rotationAngle = angle;
          this.update();
          return this;
      },

      setRotationOrigin: function(origin) {
          this.options.rotationOrigin = origin;
          this.update();
          return this;
      }
  });
})();

/***  end of hack ***/
  
OSH.UI.LeafletMarkerView = Class.create(OSH.UI.View,{
  initialize: function($super,divId,options) {
    $super(divId);
    
    //create marker
    this.markerIcon = L.icon({
        iconAnchor: [16, 16],
        iconUrl: leafletMarkerNormalIcon
    });

    this.markerSelectedIcon = L.icon({
        iconAnchor: [16, 16],
        iconUrl: leafletMarkerSelectedIcon
    });
    
    this.marker = L.marker([0, 0], {
        icon: this.markerIcon
    });
    
    this.marker.on('click',this.onClick.bind(this));
  },
  
  setOrientationDataViewId: function(dataViewId) {
    this.orientationDataViewId = dataViewId;
  },
  
  setLatLonDataViewId: function(dataViewId) {
    this.latLonDataViewId = dataViewId;
  },
  
  onClick: function() {
    var memo = [];
    
    if(this.latLonDataViewId && this.latLonDataViewId != null) {
        memo.push(this.latLonDataViewId);
    }
    
    if(this.orientationDataViewId && this.orientationDataViewId != null) {
       memo.push(this.orientationDataViewId);
    }
    
     $(this.divId).fire("osh:dataView",memo);
  },
  update: function($super,dataViewId, data) {
    if(this.orientationDataViewId == dataViewId) {
        // updates direction
        this.marker.setRotationAngle(data.data.yaw);
        this.onChangeOrientation(lat,lon);
    } else if(this.latLonDataViewId == dataViewId) {
        // updates position
        var lon = data.data.lon;
        var lat = data.data.lat;
        
        if (!isNaN(lon) && !isNaN(lat)) {
            var newLatLng = new L.LatLng(lat, lon);
            this.marker.setLatLng(newLatLng);
            this.onChangePosition(lat,lon);
        }
    }
  },
  
  hasDataView: function($super,dataViewId) {
      return this.orientationDataViewId == dataViewId ||
         this.latLonDataViewId == dataViewId ||
         this.associatedViews.indexOf(dataViewId) >= 0;
  },
  
  getMarker: function() {
    return this.marker;
  },
  
  selectDataView: function($super,idArr) {
    this.marker.setIcon(this.markerIcon);
    for(var j=0; j < idArr.length; j++) {
      if(this.hasDataView(idArr[j])) {
        this.marker.setIcon(this.markerSelectedIcon);
        break;
      }
    }
  },
  
  onChangePosition:function(lat,lon) {},
  
  onChangeOrientation:function(yaw) {} 
});
