OSH.DataConnector.DataConnector = Class.create({
  initialize: function(url) {
    this.url = url;
    this.id = "DataConnector-"+OSH.Utils.randomUUID();
  },
  
  getId: function() {
    return this.id;
  },
  
  getUrl: function() {
    return this.url;
  },
  
  onMessage: function(data) {} 
});
