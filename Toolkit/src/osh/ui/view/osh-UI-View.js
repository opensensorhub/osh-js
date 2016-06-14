OSH.UI.View = Class.create({
    initialize:function(divId) {
      this.divId = divId;
      this.id = "view-"+OSH.Utils.randomUUID();
      
      var div = document.getElementById(divId);
      if(div == "undefined" || div == null) {
        var hiddenDiv = document.createElement("div");
        hiddenDiv.style.display = "none";
        
        document.body.appendChild(hiddenDiv);
        
        var elementDiv = document.createElement("div");
        elementDiv.setAttribute("id",divId);
        
        hiddenDiv.appendChild(elementDiv);
      }

      // list of stylers
      this.stylers = [];
      this.viewItems = [];
    },
    
    getId: function() {
      return this.id;
    },
    
    getDivId: function() {
      return this.divId;
    },
    
    selectDataView: function(dataSourceIds) {}
});
