L.SOS = L.FeatureGroup.extend({
    options: {
        debug: true,
        replaySpeed: 1,
        icon: new L.Icon.Default()
    },

    /* @section
	 * @aka SOS options
	 *
	 *
	 * @option style: Function = *
	 * A `Function` defining the `Path options` for styling primitives generated from SOS data,
	 * called internally when data is added.
	 * The default value is to not override any defaults:
	 * ```js
	 * function (geoJsonFeature) {
	 * 	return {}
	 * }
	 * ```
	 *
	 * @option onEachFeature: Function = *
	 * A `Function` that will be called once for each created `Feature`, after it has
	 * been created and styled. Useful for attaching events and popups to features.
	 * The default is to do nothing with the newly created layers:
	 * ```js
	 * function (feature, layer) {}
	 * ```
	 *
	 * @option filter: Function = *
	 * A `Function` that will be used to decide whether to show a feature or not.
	 * The default is to show all features:
	 * ```js
	 * function (geoJsonFeature) {
	 * 	return true;
	 * }
	 * ```
	 *
	 * @option coordsToLatLng: Function = *
	 * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
	 * The default is the `coordsToLatLng` static method.
	 */
    
    initialize: function (map, options) {
        L.Util.setOptions(this, options);
        this._layers = {};
        this._map = map;        
        this.loadOffering(map, options);
    },
    
    loadOffering: function(map, options) {
    	var controller = OSH.Controller.getSingleton();
    	
    	var url = options.url +
    	          "?service=SOS&version=2.0&request=GetResult&offering=" + options.offering +
    	          "&temporalFilter=phenomenonTime," + options.timeRange +
    	          "&replaySpeed=" + options.replaySpeed + 
    	          "&observedProperty=";
    		
    	// create marker
    	var markerOpts = {};
    	if (options.style)
    		markerOpts.icon = L.icon(options.style);
        var dataMarker = new OSH.LeafletDataMarker(map, this, markerOpts);

        // adds location, orientation and video stream for this marker
        controller.addDataSource(this, url + options.locationProp, options.id + "_loc", OSH.TimeStampParser.parseAndroidText, dataMarker.onUpdateLocationData.bind(dataMarker));
        controller.addDataSource(this, url + options.orientationProp, options.id + "_rot", OSH.TimeStampParser.parseAndroidText, dataMarker.onUpdateOrientationData.bind(dataMarker));
        controller.addDataSource(this, url + options.videoProp, options.id + "_vid", OSH.TimeStampParser.parseVideo, dataMarker.onUpdateVideoData.bind(dataMarker));
    },

    sosLayerGroup: L.layerGroup(),
    layer_ids: {}

});