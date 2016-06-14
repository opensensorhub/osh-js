OSH.UI.LeafletView = Class.create(OSH.UI.View,{
	initialize:function($super,divId, properties) {
		$super(divId);
		this.stylerToObj = {};
		this.initMap();
		this.lastRec = {};
		this.selectedDataSources = [];
		this.dataSources = [];
		
		//todelete
		this.names = {};
	},
	
	/**
	 * Add viewItem to the view
	 */
	addViewItem: function(viewItem) {
		if(viewItem.hasOwnProperty("styler")) {
			this.viewItems.push(viewItem);
			var styler = viewItem.styler;
			this.stylers.push(styler);
			
			if(viewItem.hasOwnProperty("name")) {
				this.names[styler.getId()] = viewItem.name;
			}
		}
	},
	
	updateMarker: function(styler) {
		var markerId = 0;
		
		if(!(styler.getId() in this.stylerToObj)) {
			// adds a new marker to the leaflet renderer
			markerId = this.addMarker({
				lat:styler.location.y,
				lon:styler.location.x,
				orientation:styler.orientation.heading,
				color:styler.color,
				icon:styler.icon,
				name: this.names[styler.getId()]
			});
			
			this.stylerToObj[styler.getId()] = markerId;
		} else {
			markerId = this.stylerToObj[styler.getId()];
		}
		
		this.updateMapMarker(markerId,{
			lat:styler.location.y,
			lon:styler.location.x,
			orientation:styler.orientation.heading,
			color:styler.color,
			icon:styler.icon
		});
	},
	
	updatePolyline: function(styler) {
		var polylineId = 0;
		
		if(!(styler.getId() in this.stylerToObj)) {
			// adds a new marker to the leaflet renderer
			polylineId = this.addPolyline({
				color:styler.color,
				weight:styler.weight,
				locations:styler.locations,
				maxPoints:styler.maxPoints,
				opacity:styler.opacity,
				smoothFactor:styler.smoothFactor
			});
			
			this.stylerToObj[styler.getId()] = polylineId;
		} else {
			polylineId = this.stylerToObj[styler.getId()];
		}
		
		this.updateMapPolyline(polylineId,{
			color:styler.color,
			weight:styler.weight,
			locations:styler.locations,
			maxPoints:styler.maxPoints,
			opacity:styler.opacity,
			smoothFactor:styler.smoothFactor
		});
	},
	
	setData: function(dataSourceId,data) {
		if(this.dataSources.indexOf(dataSourceId) == -1) {
			this.dataSources.push(dataSourceId);
		}
		var selected = (this.selectedDataSources.indexOf(dataSourceId) > -1);
		
		for(var i=0;i < this.stylers.length;i++) {
			this.stylers[i].setData(dataSourceId,data,this,{
				selected:selected
			});
			this.lastRec[dataSourceId] = data;
		}
	},
	
	selectDataView: function($super,dataSourceIds) {
		this.selectedDataSources = dataSourceIds;
		for(var j=0; j < this.dataSources.length;j++) {
			this.setData(this.dataSources[j],this.lastRec[this.dataSources[j]]);
		}
	},
	
	//---------- MAP SETUP --------------//
	initMap:function() {
		  this.map = new L.Map(this.divId, {
	         fullscreenControl: true
	      });
	      this.map.setView(new L.LatLng(0, 0), 10);
	      this.initLayers();
	      this.markers = {};
	      this.first = true;
	      this.polylines = {};
	},
	
	initLayers: function() {
	   // create the tile layer with correct attribution
	   var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	   var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	   var osm = new L.TileLayer(osmUrl, {
	         minZoom: 1,
	         maxZoom: 22,
	         attribution: osmAttrib
	   });
	   this.map.addLayer(osm);
	},
	
	addMarker: function(properties) {
		 //create marker
		var marker = null;
		if(properties.icon != null) {
		    var markerIcon = L.icon({
		        iconAnchor: [16, 16],
		        iconUrl: properties.icon
		    });
		    
		    marker = L.marker([properties.lat, properties.lon], {
		        icon: markerIcon
		    });
		} else {
			marker = L.marker([properties.lat, properties.lon]);
		}
	    
		marker.bindPopup(properties.name);
		
	    //TODO:for selected marker event
	    //this.marker.on('click',this.onClick.bind(this));
	    
	    marker.addTo(this.map);
	    marker.setRotationAngle(properties.orientation);
	    
	    var id = "view-marker-"+OSH.Utils.randomUUID();
	    this.markers[id] = marker;
	    
	    var self = this;
	    
	    // adds onclick event
	    marker.on('click',function(){
	    	var memo = [];
	    	for (var styler in self.stylerToObj) {
	    		if(self.stylerToObj[styler] == id) {
	    			for(var i=0;i < self.stylers.length;i++) {
		    			if(self.stylers[i].getId() == styler) {
			    			memo = memo.concat(self.stylers[i].getDataSourceIds());
			    			break;
		    			}
	    			}
	    		}
	    	}
	    	$(self.divId).fire("osh:select", memo);
	    });
	    
	    return id;
	},
	
	updateMapMarker: function(id,properties) {
		var marker =  this.markers[id];
		// updates position
        var lon = properties.lon;
        var lat = properties.lat;
        
        if (!isNaN(lon) && !isNaN(lat)) {
            var newLatLng = new L.LatLng(lat, lon);
            marker.setLatLng(newLatLng);
        }
        
        // updates orientation
        marker.setRotationAngle(properties.orientation);
        
        if(properties.icon != null && marker._icon.iconUrl != properties.icon) {
        	// updates icon
        	var markerIcon = L.icon({
		        iconAnchor: [16, 16],
		        iconUrl: properties.icon
		    });
        	marker.setIcon(markerIcon);
        }
        
        if(this.first) {
            this.map.setView(new L.LatLng(lat, lon), this.map.getZoom());
            this.first = false;
        }  
	},
	
	addPolyline: function(properties) {
		var polylinePoints = [];
		
		for(var i=0;i < properties.locations.length;i++) {
			polylinePoints.push(new L.LatLng(properties.locations[i].y, properties.locations[i].x));
        }
		
		//create path
		var polyline = new L.Polyline(polylinePoints, {
			color: properties.color,
			weight: properties.weight,
			opacity: properties.opacity,
			smoothFactor: properties.smootFactor
		}).addTo(this.map);
		
		var id = "view-polyline-"+OSH.Utils.randomUUID();
		this.polylines[id] = polyline;
		
		return id;
	},
	
	updateMapPolyline: function(id,properties) {
		if(id in this.polylines) {
			var polyline = this.polylines[id];
			
			// removes the layer
	        this.map.removeLayer(polyline);
	        
	        var polylinePoints = [];
	        for(var i=0;i < properties.locations.length;i++) {
	        	polylinePoints.push(new L.LatLng(properties.locations[i].y, properties.locations[i].x));
	        }
	        
	        //create path
			var polyline = new L.Polyline(polylinePoints, {
				color: properties.color,
				weight: properties.weight,
				opacity: properties.opacity,
				smoothFactor: properties.smoothFactor
			}).addTo(this.map);
			
			this.polylines[id]= polyline;
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