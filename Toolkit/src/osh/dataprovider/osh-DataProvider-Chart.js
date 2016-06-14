OSH.DataProvider.Chart = Class.create(OSH.DataProvider.DataProvider,{

  parseTimeStamp: function($super,data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    var t =  new Date(tokens[0]).getTime();
    return t - this.androidShift;
  },
  
  parseData: function($super,data){
    var rec = String.fromCharCode.apply(null, new Uint8Array(data));
    var tokens = rec.trim().split(",");
    return [tokens[1]];
  } 
});
