OSH.UI.ContextMenu.StackMenu = Class.create(OSH.UI.ContextMenu.CssMenu, {
    initialize:function($super,properties) {
        $super(properties,"stack");
    },

    show:function($super,properties) {
        this.removeElement();
        var closeId = OSH.Utils.randomUUID();
        var videoId = OSH.Utils.randomUUID();

        var htmlVar="";
        htmlVar += "  <div class=\""+this.type+"-menu-circle\">";
        // adds items
        for(var i = 0; i < this.items.length; i++) {
            htmlVar += this.items[i].html;
        }
        htmlVar += "  <a id=\""+closeId+"\"class=\""+this.type+"-menu-button fa fa-times\" title=\"close\"><\/a>";
        htmlVar += "  <\/div>";

        this.rootTag = document.createElement("div");
        this.rootTag.setAttribute("class",""+this.type+"-menu-container");
        this.rootTag.innerHTML = htmlVar;



        var hasParentDiv = (typeof (properties) != "undefined" && typeof (properties.div) !="undefined");
        if(hasParentDiv) {
            //properties.div.parentNode.appendChild(this.rootTag);
            document.body.appendChild(this.rootTag);
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
        if(hasParentDiv) {
            this.rootTag.style.top = properties.div.style.top + offsetY;
            this.rootTag.style.left = properties.div.style.left + offsetX;
            this.rootTag.style.transform = this.getTransform(properties.div);

            var self = this;
            // observes style event
            this.observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutationRecord) {
                    if(typeof(self.rootTag) != "undefined" && self.rootTag != null) {

                        self.rootTag.style.top = properties.div.style.top + offsetY;
                        self.rootTag.style.left = properties.div.style.left + offsetX;
                        self.rootTag.style.transform = self.getTransform(properties.div);
                    }
                });
            });

            this.observer.observe(properties.div, { attributes : true, attributeFilter : ['style'] });
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
    }
});