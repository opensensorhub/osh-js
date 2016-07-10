OSH.UI.ContextMenu.CircularPointMarker = Class.create(OSH.UI.ContextMenu, {
    initialize:function($super,properties) {
        $super(properties);

        this.items = [];

        if(typeof(properties) != "undefined") {
            if(typeof (properties.items) != "undefined") {
                for(var i = 0;i < properties.items.length;i++) {
                    var elId = OSH.Utils.randomUUID();
                    var htmlVar = "<a  id=\""+elId+"\" ";
                    if(typeof (properties.items[i].css) != "undefined"){
                        htmlVar += "class=\""+properties.items[i].css+"\" ";
                    }
                    var name = "";
                    if(typeof (properties.items[i].name) != "undefined") {
                        name = properties.items[i].name;
                    }
                    htmlVar += "title=\""+name+"\"";
                    htmlVar += "><\/a>";

                    var action = "";
                    if(typeof (properties.items[i].action) != "undefined") {
                        action = properties.items[i].action;
                    }
                    var viewId = "";
                    if(typeof (properties.items[i].viewId) != "undefined") {
                        viewId = properties.items[i].viewId;
                    }
                    this.items.push({
                        html : htmlVar,
                        id : elId,
                        action : action,
                        viewId : viewId
                    })
                }
            }
        }
    },

    show:function($super,properties) {
        this.removeElement();
        var closeId = OSH.Utils.randomUUID();
        var videoId = OSH.Utils.randomUUID();

        var htmlVar="";
        htmlVar += "<div class=\"circular-menu\">";
        htmlVar += "  <div class=\"circular-menu-circle\">";
        /*htmlVar += "    <a  class=\"fa fa-home fa-3x\"><\/a>";
        htmlVar += "    <a  id=\""+videoId+"\" class=\"fa fa-video-camera fa-3x\"><\/a>";
        htmlVar += "    <a  class=\"fa fa-bar-chart fa-3x\"><\/a>";
        htmlVar += "    <a  class=\"fa fa-external-link-square fa-3x\"><\/a>";
        htmlVar += "    <a  class=\"fa fa-gear fa-3x\"><\/a>";*/
        // adds items
        for(var i = 0; i < this.items.length; i++) {
            htmlVar += this.items[i].html;
        }
        htmlVar += "  <\/div>";
        htmlVar += "  <a id=\""+closeId+"\"class=\"menu-button fa fa-times fa-2x\"><\/a>";
        htmlVar += "<\/div>";

        this.rootTag = document.createElement("div");
        this.rootTag.setAttribute("class","circular-menu-container");
        this.rootTag.innerHTML = htmlVar;

        properties.div.parentNode.appendChild(this.rootTag);
        var items = document.querySelectorAll('.circular-menu-circle a');

        for(var i = 0, l = items.length; i < l; i++) {
            items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
            items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        }

        $(closeId).on("click",this.hide.bind(this));

        document.querySelector('.circular-menu-circle').classList.toggle('open');
        this.rootTag.style.top = properties.div.style.top;
        this.rootTag.style.left = properties.div.style.left;
        this.rootTag.style.transform = this.getTransform(properties.div);

        var self = this;
        // observes style event
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if(typeof(self.rootTag) != "undefined" && self.rootTag != null) {
                    self.rootTag.style.top = properties.div.style.top;
                    self.rootTag.style.left = properties.div.style.left;
                    self.rootTag.style.transform = self.getTransform(properties.div);
                }
            });
        });

        this.observer.observe(properties.div, { attributes : true, attributeFilter : ['style'] });


        // binds actions based on items
        this.bindEvents = {};
        for(var i = 0; i < this.items.length; i++) {
            var item =  this.items[i];
            this.bindEvents[item.id] = item.viewId;
            $(item.id).on("click",function(event){
                document.fire("osh:"+item.action, {
                    viewId: this.bindEvents[event.srcElement.id]
                });
            }.bind(this));
        }
    },

    hide:function($super){
        document.querySelector('.circular-menu-circle').classList.toggle('open');
        this.removeElement();
    },

    removeElement: function() {
        if(typeof(this.rootTag) != "undefined" && this.rootTag != null) {
            this.rootTag.parentNode.removeChild(this.rootTag);
            this.rootTag = null;
            this.observer.disconnect();
        }
    },

    getTransform: function(el) {
       /* var transform = el.style.transform;
        console.log(transform);
        var results = transform.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/);

        if(!results) return [0, 0, 0];
        if(results[1] == '3d') return results.slice(2,5);

        results.push(0);
        return results.slice(5, 8); // returns the [X,Y,Z,1] values*/
        var transform = el.style.transform;
        var regExp = /^\s*((\w+)\s*\(([^)]+)\))/;
        var matches = regExp.exec(transform);

        return matches[1];
    }
});