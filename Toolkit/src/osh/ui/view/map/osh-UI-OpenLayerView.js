OSH.UI.OpenLayerView = Class.create(OSH.UI.View,{
	initialize:function($super,divId, options) {
		$super(divId);
		this.stylerToObj = {};
		this.lastRec = {};
		this.selectedDataSources = [];
		this.dataSources = [];
		
		// inits the map
		this.initMap(options);
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
				smoothFactor:styler.smoothFactor,
				name: this.names[styler.getId()]
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
	initMap:function(options) {
		
		 var initialView = null;
		 this.first = true;
		 var overlays = [];
		 var defaultLayer = null;
		 
		 var baseLayers = this.getDefaultLayers();
		 
		 if(typeof(options) != "undefined") {
			 var maxZoom = 19;
			 if(options.maxZoom) {
				 maxZoom = options.maxZoom;
			 }
			 if(options.initialView) {
				 initialView = new ol.View({
					    center: ol.proj.transform([options.initialView.lon, options.initialView.lat], 'EPSG:4326', 'EPSG:900913'),
					    zoom: options.initialView.zoom,
					    maxZoom: maxZoom
					});
			 } else {
				 // loads the default one
				 initialView = new ol.View({
					    center: ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:900913'),
					    zoom: 11,
					    maxZoom: maxZoom
					});
			 }
			 
			 // checks autoZoom
			 if(!options.autoZoomOnFirstMarker) {
				this.first = false;
			 }
			 
			 // checks overlayers
			 if(options.overlayLayers){
				 overlays = options.overlayLayers;
			 } 
			 
			 // checks baseLayer
			 if(options.baseLayers){
				 baseLayers = options.baseLayers;
			 }
			 
			 // checks defaultLayer
			 if(options.defaultLayer) {
				 defaultLayer = options.defaultLayer;
			 } 
		 }
		 
		 // sets layers to map
		//create map
		 this.map = new ol.Map({
		     target: this.divId,
		     controls: ol.control.defaults({
		         attributionOptions: ({
		             collapsible: false
		         })
		     }).extend([
		         new ol.control.ZoomSlider(),
		         new ol.control.Rotate(),
		         new ol.control.ScaleLine(),
		     ]),
		     // interactions and controls are seperate entities in ol3
		     // we extend the default navigation with a hover select interaction
		     interactions: ol.interaction.defaults().extend([
		         new ol.interaction.Select({
		             condition: ol.events.condition.mouseMove
		         })
		     ]),
		     layers: [
		         new ol.layer.Group({
		             'title': 'Base maps',
		             layers: baseLayers
		         }),
		         new ol.layer.Group({
		             title: 'Overlays',
		             layers: overlays
		         })
		     ],
		     view: initialView,

		 });

		 var layerSwitcher = new ol.control.LayerSwitcher({
		     tipLabel: 'Layers' // Optional label for button
		 });

		 this.map.addControl(layerSwitcher);
		 
		 // inits onClick events
		 var select_interaction = new ol.interaction.Select();

		 var self = this;
	     select_interaction.getFeatures().on("add", function (e) { 
	        var feature = e.element; //the feature selected
	        var memo = [];
	    	for (var styler in self.stylerToObj) {
	    		if(self.stylerToObj[styler] == feature.getId()) {
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

		 this.map.addInteraction(select_interaction);
		    
	     //this.initLayers();
	     this.markers = {};
	     this.polylines = {};
	},
	
	getDefaultBaseLayers: function() {
		return {};
	},
	
	
	getDefaultLayers: function() {
		var osm =  new ol.layer.Tile({
            title: 'OSM',
            type: 'base',
            visible: true,
            source: new ol.source.OSM()
        });
		return [osm];
	},
	
	addMarker: function(properties) {
		 //create marker
		var marker =  new ol.geom.Point(ol.proj.transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
		var markerFeature = new ol.Feature({
	        geometry: marker,
	        name: 'Marker' //TODO
	    });
		
		if(properties.icon != null) {
		    var iconStyle = new ol.style.Style({
		        image: new ol.style.Icon(({
		            opacity: 0.75,
		            src: properties.icon,
		            rotation: properties.orientation * Math.PI / 180
		        }))
		    });
		    markerFeature.setStyle(iconStyle);
		} 
	    
		
	    //TODO:for selected marker event
	    //this.marker.on('click',this.onClick.bind(this));
		var vectorMarkerLayer =
		    new ol.layer.Vector({
		        title: properties.name,
		        source: new ol.source.Vector({
		            features: [markerFeature]
		        })
		 });
		
		this.map.addLayer(vectorMarkerLayer);
		
	    var id = "view-marker-"+OSH.Utils.randomUUID();
	    markerFeature.setId(id);
	    this.markers[id] = markerFeature;
	    
	    if(this.first) {
	    	this.first = false;
	    	this.map.getView().setCenter(ol.proj.transform([properties.lon, properties.lat], 'EPSG:4326', 'EPSG:900913'));
	    	this.map.getView().setZoom(19);
	    }
	    
	    return id;
	},
	
	updateMapMarker: function(id,properties) {
		var markerFeature =  this.markers[id];
		// updates position
        var lon = properties.lon;
        var lat = properties.lat;
        
        if (!isNaN(lon) && !isNaN(lat)) {
            var coordinates = ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:900913');
            markerFeature.getGeometry().setCoordinates(coordinates);
        }
        
        // updates orientation
        if(properties.icon != null) {
        	// updates icon
        	var iconStyle = new ol.style.Style({
		        image: new ol.style.Icon(({
		            opacity: 0.75,
		            src: properties.icon,
		            rotation:properties.orientation * Math.PI / 180
		        }))
		    });
		    markerFeature.setStyle(iconStyle);
        }
	},
	
	addPolyline: function(properties) {
		var polylinePoints = [];
		
		for(var i=0;i < properties.locations.length;i++) {
			polylinePoints.push(ol.proj.transform([properties.locations[i].x, properties.locations[i].y], 'EPSG:4326', 'EPSG:900913'))
        }
		
		//create path
		var pathGeometry = new ol.geom.LineString(polylinePoints);
		var feature = new ol.Feature({
            geometry: pathGeometry,
            name: 'Line'
        });
		var source = new ol.source.Vector({
	        features: [feature]
	    });
		
		var vectorPathLayer = new ol.layer.Vector({
		    title: properties.name,
		    source: source,
		    style: new ol.style.Style({
		        fill: new ol.style.Fill({
		            color: properties.color
		        }),
		        stroke: new ol.style.Stroke({
		            color: properties.color,
		            width: properties.weight
		        })
		    })
		});
		
		this.map.addLayer(vectorPathLayer);
		var id = "view-polyline-"+OSH.Utils.randomUUID();
		this.polylines[id] = pathGeometry;
		
		return id;
	},
	
	updateMapPolyline: function(id,properties) {
		if(id in this.polylines) {
			var geometry = this.polylines[id];
			
	        var polylinePoints = [];
	        for(var i=0;i < properties.locations.length;i++) {
	        	polylinePoints.push(ol.proj.transform([properties.locations[i].x, properties.locations[i].y], 'EPSG:4326', 'EPSG:900913'))
	        }
	        
	        geometry.setCoordinates(polylinePoints);
		}
	}
});