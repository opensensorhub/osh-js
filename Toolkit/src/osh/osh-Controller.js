OSH.Controller = Class.create({
  initialize: function() {
    this.views     = [];
    this.initEvents(); 
    this.dataSources = [];
    
  },
  
  initEvents: function() {
   document.observe("osh:select", function(event) {
	  var ds = this.getFullMemo(event.memo);
      for(var i = 0; i < this.views.length;i++) {
        this.views[i].selectDataView(ds);
      }
    }.bind(this));
  },
  
  addEntity: function(entity) {
	  if(typeof(entity.dataSources) != "undefined") {
		  //store for instance only dataSources group
		  this.dataSources.push(entity.dataSources);
	  }
  },
  
  addDataSource: function(dataSourceIds) {
	  this.dataSources.push(dataSourceIds);
  },
  
  addView: function(oshView) {
    this.views.push(oshView);
    if(oshView.divId) {
      /*var div = $(oshView.divId);
      if(div != null){
        $(oshView.divId).observe("click", function(event) {
        	console.log(event.target.id);
          if(event.target.id.startsWith("DataSource-")) {
        	// gets associated datasources
        	var ds = getFullMemo([event.target.id]);
            for(var i = 0; i < this.views.length;i++) {
              this.views[i].selectDataView(ds);
            }
          }
        }.bind(this));
      }*/
    }
  },
  
  getFullMemo: function(ids) {
	var ds = [];
	// gets associated datasources
  	for(var i =0; i < ids.length;i++) {
  		var currentDs = ids[i];
  		for(var j=0;j< this.dataSources.length;j++) {
  			var currentEntityDsArr = this.dataSources[j];
  			var indexOf = currentEntityDsArr.indexOf(currentDs);
  			if( indexOf > -1){
  				// adds every element except the event one
  				for(var k=0;k <currentEntityDsArr.length;k++) {
  					if(indexOf != k) {
  						ds.push(currentEntityDsArr[k]);
  					}
  				}
  			}
  		}
  		ds.push(currentDs);
  	}
  	return ds;
  }
});
