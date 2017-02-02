/**
 * @classdesc This datasource provides parsing to Orientation Quaternion.
 * Data: ISODATE,Qx,Qy,Qz,Qw.
 * @class OSH.DataReceiver.OrientationQuaternion
 * @augments OSH.DataReceiver.DataSource
 * @example
 * var androidPhoneOrientationDataSource = new OSH.DataReceiver.OrientationQuaternion("android-Orientation", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        replaySpeed: replayFactor+"",
        syncMasterTime: true,
        bufferingTime: 1000
    });
 */
OSH.DataReceiver.OrientationQuaternion = OSH.DataReceiver.DataSource.extend({

  /**
   * Extracts timestamp from the message. The timestamp is the first token got from split(',')
   * @param {function} $super the parseTimeStamp super method
   * @param {string} data the data to parse
   * @returns {number} the extracted timestamp
   * @memberof OSH.DataReceiver.OrientationQuaternion
   * @instance
   */
  parseTimeStamp: function(data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    return new Date(tokens[0]).getTime();
  },

  /**
   * Extract data from the message. The data are got such as:<p><ul><li>qx: tokens[1]</li><li>qy: tokens [2]</li><li>qz: tokens[3]</li><li>qw: tokens[4]</li></ul></p>.
   * @param {function} $super the parseData super method
   * @param {Object} data the data to parse
   * @returns {Object} the parsed data
   * @example
   * {
   *   pitch:10,
   *   roll: 11,
   *   heading:12
   * }
   * @memberof OSH.DataReceiver.OrientationQuaternion
   * @instance
   */
  parseData: function(data){
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
