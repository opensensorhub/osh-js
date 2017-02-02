OSH.MapEvent = BaseClass.extend({

    initialize:function() {
        this.mapEvents = {};
    },

    observe:function(eventName, fnCallback) {
        if(typeof(eventName) == "undefined" || typeof(fnCallback) == "undefined") {
            return;
        }
        if(!(eventName in this.mapEvents)) {
            this.mapEvents[eventName] = [];
        }
        this.mapEvents[eventName].push(fnCallback);
    },

    fire: function(eventName, properties) {
        if(typeof(eventName) == "undefined") {
            return;
        }
        if(eventName in this.mapEvents) {
            var fnCallbackArr = this.mapEvents[eventName];
            for(var i = 0; i < fnCallbackArr.length;i++){
                // callback the properties to the current callback
                fnCallbackArr[i](properties);
            }
        }
    }
});