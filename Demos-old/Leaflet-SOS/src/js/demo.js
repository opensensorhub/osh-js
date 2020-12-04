function init(){
  /***  little hack starts here ***/
  L.Map = L.Map.extend({
      openPopup: function(popup) {
          this._popup = popup;
          return this.addLayer(popup).fire('popupopen', {
              popup: this._popup
          });
      }
  }); /***  end of hack ***/
   
  //default options: bufferingTime = 0, replayFactor = 1
  var replayFactor = 10;
  var controller = OSH.Controller.getSingleton();

  // setup the controller. The synchronizedTime is turn to off because the data are the same but at different time
  controller.setOptions({
       bufferingTime:5*1000, // 5 seconds
       synchronizedTime: true, // disable synchronization for this set of data
       replayFactor: replayFactor
  });
  

  var map;
  // init the map
  function initmap() {
      // set up the map
      map = new L.Map('leafletMap', {
         fullscreenControl: true
      });

      // create the tile layer with correct attribution
      var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
      var osm = new L.TileLayer(osmUrl, {
          minZoom: 1,
          maxZoom: 17,
          attribution: osmAttrib
      });
      //,
      
      // create the SOS layer
      var sos = new L.SOS(map, {
    	id: 'sos1',
	    url: 'ws://sensiasoft.net:8181/sensorhub/sos',
	    //offering: 'urn:android:device:a0e0eac2fea3f614-sos',
	    //timeRange: '2016-04-27T16:54:53Z/2016-04-29Z',
	    offering: 'urn:android:device:060693280a28e015-sos',
	    timeRange: '2015-02-16T07:58:00Z/2015-02-16T08:09:00Z',
	    locationProp: 'http://sensorml.com/ont/swe/property/Location',
	    videoProp: 'http://sensorml.com/ont/swe/property/VideoFrame',
	    orientationProp: 'http://sensorml.com/ont/swe/property/OrientationQuaternion',
	    replaySpeed: replayFactor,
	    style: {
	    	iconUrl: 'images/cameralook.png',
	    	iconAnchor: [13, 26]	        
	    }
	  });

      map.setView(new L.LatLng(0, 0), 15);
      map.addLayer(osm);
      
      L.control.layers({'OSM': osm}, {"BodyCam": sos}).addTo(map);
  }

  // init the map
  initmap();
}
