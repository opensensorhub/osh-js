/**
 * @classdesc A stack context menu
 * @class
 * @type {OSH.UI.ContextMenu.CssMenu}
 * @augments OSH.UI.ContextMenu.CssMenu
 * @example
 * var menuItems = [{
        name: "Item 1",
        viewId: viewId,
        css: "someCssClass"
   },{
        name: "Item 2",
        viewId: viewId2,
        css: "someCssClass"
   }];

   var contextStackMenu = new OSH.UI.ContextMenu.StackMenu({id : randomId,groupId: randomGroupId,items : menuItems});
 */
OSH.UI.ContextMenu.StackMenu = Class.create(OSH.UI.ContextMenu.CssMenu, {
    initialize:function($super,properties) {
        $super(properties,"stack");
    },

    /**
     * Shows the context menu.
     * @param $super
     * @param properties
     * @instance
     * @memberof OSH.UI.ContextMenu.StackMenu
     */
    show:function($super,properties) {
        this.removeElement();
        var htmlVar="";
        htmlVar += "  <div class=\""+this.type+"-menu-circle\">";
        // adds items
        for(var i = 0; i < this.items.length; i++) {
            htmlVar += this.items[i].html;
        }
        htmlVar += "  <\/div>";

        this.rootTag = document.createElement("div");
        this.rootTag.setAttribute("class",""+this.type+"-menu-container");
        this.rootTag.innerHTML = htmlVar;

        if(typeof properties.div != "undefined") {
            properties.div.appendChild(this.rootTag);
        } else {
            document.body.appendChild(this.rootTag);
        }

        var offsetX = 0;
        var offsetY = 0;

        if(properties.offsetX) {
            offsetX = properties.offsetX;
        }

        if(properties.offsetY) {
            offsetY = properties.offsetY;
        }

        if(typeof properties.x != "undefined") {
            this.rootTag.style.left = properties.x + offsetX;
        }
        if(typeof properties.y != "undefined") {
            this.rootTag.style.top = properties.y + offsetY;
        }

        document.querySelector('.'+this.type+'-menu-circle').classList.toggle('open');

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