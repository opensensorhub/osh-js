OSH.UI.ContextMenu.StackMenu = Class.create(OSH.UI.ContextMenu, {
    initialize: function ($super, properties) {
        $super(properties);

        this.items = [];

        if(typeof(properties) != "undefined") {
            if (typeof (properties.items) != "undefined") {
                for (var i = 0; i < properties.items.length; i++) {
                    var elId = OSH.Utils.randomUUID();
                }
            }
        }
    },

    show:function($super,properties) {

    },

    hide:function($super){

    }
});