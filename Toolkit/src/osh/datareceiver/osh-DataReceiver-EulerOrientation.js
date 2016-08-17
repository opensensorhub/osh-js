OSH.DataReceiver.EulerOrientation = Class.create(OSH.DataReceiver.DataSource,{

  parseTimeStamp: function($super,data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var t =  new Date(tokens[0]).getTime();
    return t;
  },
  
  parseData: function($super,data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var yaw = parseFloat(tokens[1]);    
    var pitch = parseFloat(tokens[2]);
    var roll = parseFloat(tokens[3]);
    
    return {
      pitch : pitch,
      roll : roll,
      heading: yaw
    };
  } 
});
