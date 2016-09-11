var first = true;

OSH.LeafletDataMarker = function(map, group, options) {
    this.map = map;
    this.group = group;
    this.pathCoordinates = [];
    
    //create marker
    this.marker = L.marker([0, 0], options);
    group.addLayer(this.marker);
    
    this.id = this.marker._leaflet_id;
    
    //create path
    this.path = new L.Polyline(this.pathCoordinates, {
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    });
    group.addLayer(this.path);
    
    // creates and binds a popup
    this.bindPopup();
}

/**
 * Callback after receiving location values
 */ 
OSH.LeafletDataMarker.prototype.onUpdateLocationData = function(data) {
  var self = this;
  var rec = String.fromCharCode.apply(null, new Uint8Array(data));
  var tokens = rec.trim().split(",");
  var lat = parseFloat(tokens[1]);
  var lon = parseFloat(tokens[2]);
  var alt = parseFloat(tokens[3]);

  if (!isNaN(lon) && !isNaN(lat)) {
      var newLatLng = new L.LatLng(lat, lon);
      self.marker.setLatLng(newLatLng);

      if (first) {
          self.map.setView(self.marker.getLatLng(), self.map.getZoom());
          first = false;
      }
  }
  
  if (self.pathCoordinates.length > 200) {
     self.pathCoordinates.shift();
  }

  // removes the layer
  self.group.removeLayer(self.path);
  
  // pushes new coordinates
  self.pathCoordinates.push(new L.LatLng(lat, lon));
  
  // adds the new layer
  var path = new L.Polyline(self.pathCoordinates, {
     color: 'blue',
     weight: 5,
     opacity: 0.5,
     smoothFactor: 1
  });
  self.group.addLayer(path);
  
}

/**
 * Callback after receiving orientation values
 */ 
OSH.LeafletDataMarker.prototype.onUpdateOrientationData = function(data) {
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var qx = parseFloat(tokens[1]);
    var qy = parseFloat(tokens[2]);
    var qz = parseFloat(tokens[3]);
    var qw = parseFloat(tokens[4]);

    //var q = new THREE.Quaternion(qx, qy, qz, qw);
    //var look = new THREE.Vector3( 0, 0, -1 );
    //look.applyQuaternion(q);
    
    // look dir vector
    var x = 0;
	var y = 0;
	var z = -1;

	// calculate quat * vector
	var ix =  qw * x + qy * z - qz * y;
	var iy =  qw * y + qz * x - qx * z;
	var iz =  qw * z + qx * y - qy * x;
	var iw = - qx * x - qy * y - qz * z;

	// calculate result * inverse quat
	xp = ix * qw + iw * - qx + iy * - qz - iz * - qy;
	yp = iy * qw + iw * - qy + iz * - qx - ix * - qz;
	zp = iz * qw + iw * - qz + ix * - qy - iy * - qx;
    
    var yaw = 90 - (180/Math.PI*Math.atan2(yp, xp));

    this.marker.setRotationAngle(yaw);    
};

OSH.LeafletDataMarker.prototype.bindPopup = function() {
  //create popup 
  var videoDivId = "video-"+this.id;
  
  // creates div element to encapsulate img tag
  var div = document.createElement('div');
  // creates img tag
  var videoElt = '<img id="'+videoDivId+'" class="popup-video" width="250px" height="200px"></img>';
  div.innerHTML = videoElt;
  
  // binds the popup
  this.marker.bindPopup(div, {
    offset: new L.Point(0, -16),
    autoPan:false
  });

  // saves the imgTag  
  this.imgTag = div.firstChild;
  
  //unbind popup and open a new dialog providing the video content
  $(this.imgTag).click(function() {
    var closeFn = function(event,ui)  {
      this.bindPopup();
    }.bind(this);
    
    // opens a dialog based on the popup div
    $("#"+videoDivId).dialog({
        height:'auto', 
        width:'auto',
        close: closeFn,
        dialogClass:"popup-video"  
    });
    
    // close the current popup
    this.marker.closePopup();
    this.marker.unbindPopup();
  }.bind(this));
};

/**
 * Get binary video data
 */ 
OSH.LeafletDataMarker.prototype.onUpdateVideoData = function(data) {
  var imgBlob = new Blob([data]);
  var blobURL = window.URL.createObjectURL(imgBlob.slice(12));
  var oldBlobURL = this.imgTag.src;
  this.imgTag.src = blobURL;
  window.URL.revokeObjectURL(oldBlobURL);
};
