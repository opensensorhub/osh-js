OSH.DataProvider.VideoMp4 = Class.create(OSH.DataProvider.DataProvider,{
  initialize: function($super,name,properties,options) {
    $super(name,properties,options);
    this.absoluteTime = -1;
  },
  
  parseTimeStamp: function($super,data){
	// got the first box => MVDH
    if(this.absoluteTime == -1) {
        var infos = readMP4Info(data);
        
        //console.log("PTS : "+infos.pts);
        //console.log("timeScale : "+infos.timeScale);
        //console.log("duration : "+infos.duration);
        //console.log("rate : "+infos.rate);
        
        this.absoluteTime = infos.absoluteTime;
        this.timeScale = infos.timeScale;
        
        return this.absoluteTime;
    } else {
        // for debug only --> MVDH has already been calculated 
        // got the first box
        var infos = readMP4Info(data);
        //console.log("PTS : "+infos.pts);
        //console.log("timeScale : "+infos.timeScale);
        //console.log("duration : "+infos.duration);
        //console.log("rate : "+infos.rate);
        // end debug
        return ((infos.pts*1000)*this.timeScale)+this.absoluteTime; // FPS to FPMS
    }
  }
});

function readMP4Info(data) {
	var infos = {
      absoluteTime:0,
      pts:0,
      timeScale:0,
      duration:0,
      rate:0
    };
  
   var pos = 60; // 60 bytes
    // starts at 60 bytes length
   	//console.log(data.byteLength);
    infos.absoluteTime = new DataView(data,pos,pos+8).getUint32(0); //8 bytes length but takes the  last four
    infos.absoluteTime = (infos.absoluteTime - 2082844800)*1000;
    //console.log(new Date(infos.absoluteTime).toISOString());
    pos += 8;
    
    //modification time// 32 bits
    infos.pts = new DataView(data,pos,pos+4).getUint32(0); //4 bytes length
    pos += 4;
    
    //time scale // 32 bits
    infos.timeScale = new DataView(data,pos,pos+4).getUint32(0); //4 bytes length
    infos.timeScale = 1/(infos.timeScale); // FPS
    pos += 4;
    
    //duration // 32 bits
    infos.duration = new DataView(data,pos,pos+4).getUint32(0); //4 bytes length
    pos += 4;
    
    //rate  // 32 bits / 65536
    infos.rate = (new DataView(data,pos,pos+4).getUint32(0));
    
    return infos;
};

function readNCC(bytes,n) {
   var res = "";
   for (var i = 0; i < n; i++) {
     res += String.fromCharCode(bytes[i]);
   }
   return res;
};
