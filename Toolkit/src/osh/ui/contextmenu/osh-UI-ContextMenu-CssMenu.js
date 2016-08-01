OSH.UI.ContextMenu.CssMenu = Class.create(OSH.UI.ContextMenu, {
    initialize:function($super,properties,type) {
        $super(properties);

        this.items = [];
        if(typeof(type) != "undefined") {
            this.type = type;
        } else {
            this.type = "";
        }

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
                    htmlVar += "><span id =\""+elId+"\"class=\""+this.type+"-menu-label\">"+name+"</span><\/a>";

                    //htmlVar += "<label for=\""+elId+"\" class=\""+this.type+"-menu-label\">"+name+"</label></div>";

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
        htmlVar += "<div class=\""+this.type+"-menu\">";
        htmlVar += "  <div class=\""+this.type+"-menu-circle\">";
        // adds items
        for(var i = 0; i < this.items.length; i++) {
            htmlVar += this.items[i].html;
        }
        htmlVar += "  <\/div>";
        htmlVar += "  <a id=\""+closeId+"\"class=\""+this.type+"-menu-button fa fa-times fa-2x\"><\/a>";
        htmlVar += "<\/div>";

        this.rootTag = document.createElement("div");
        this.rootTag.setAttribute("class",""+this.type+"-menu-container");
        this.rootTag.innerHTML = htmlVar;

        document.body.appendChild(this.rootTag);

        var items = document.querySelectorAll('.'+this.type+'-menu-circle a');

        for(var i = 0, l = items.length; i < l; i++) {
            items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
            items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        }

        $(closeId).on("click",this.hide.bind(this));

        var offsetX = 0;
        var offsetY = 0;

        if(properties.offsetX) {
            offsetX = properties.offsetX;
        }

        if(properties.offsetY) {
            offsetY = properties.offsetY;
        }

        document.querySelector('.'+this.type+'-menu-circle').classList.toggle('open');

        if(typeof properties.x != "undefined") {
            this.rootTag.style.left = properties.x + offsetX;
        }
        if(typeof properties.y != "undefined") {
            this.rootTag.style.top = properties.y + offsetY;
        }

        // binds actions based on items
        this.bindEvents = {};
        for(var i = 0; i < this.items.length; i++) {
            var item =  this.items[i];
            this.bindEvents[item.id] = item.viewId;
            $(item.id).on("click",function(event){
                OSH.EventManager.fire(OSH.EventManager.EVENT.SHOW_VIEW, {
                    viewId: this.bindEvents[event.target.id]
                });
            }.bind(this));
        }
    },

    hide:function($super){
        document.querySelector('.'+this.type+'-menu-circle').classList.toggle('open');
        this.removeElement();
    },

    removeElement: function() {
        if(typeof(this.rootTag) != "undefined" && this.rootTag != null && typeof(this.rootTag.parentNode) != "undefined") {
            this.rootTag.parentNode.removeChild(this.rootTag);
            this.rootTag = null;
        }
    },

    getTransform: function(el) {
        var transform = el.style.transform;
        if(!transform || 0 === transform.length) {
            return "";
        }
        var regExp = /^\s*((\w+)\s*\(([^)]+)\))/;
        var matches = regExp.exec(transform);

        return matches[1];
    }
});