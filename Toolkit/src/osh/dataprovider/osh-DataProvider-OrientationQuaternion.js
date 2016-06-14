OSH.DataProvider.OrientationQuaternion = Class.create(OSH.DataProvider.DataProvider,{

  parseTimeStamp: function($super,data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    return new Date(tokens[0]).getTime() - this.androidShift;
  },
  
  parseData: function($super,data){
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
    
    //TODO: computes roll & pitch values
    return { heading: yaw, roll: null, pitch:null};
  } 
});
