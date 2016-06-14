OSH.DataProvider.LatLonAlt = Class.create(OSH.DataProvider.DataProvider,{

  parseTimeStamp: function($super,data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var t =  new Date(tokens[0]).getTime();
    return t - this.androidShift;
  },
  
  parseData: function($super,data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var lat = parseFloat(tokens[1]);
    var lon = parseFloat(tokens[2]);
    var alt = parseFloat(tokens[3]);
    
    return {
      lat : lat,
      lon : lon,
      alt : alt
    };
  } 
});
