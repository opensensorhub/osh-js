OSH.UI.ContextMenu.PointMarker = Class.create(OSH.UI.ContextMenu, {
    initialize:function($super,properties) {
        $super(properties);
    },

    show:function($super,properties) {
        this.removeElement();
        var closeId = OSH.Utils.randomUUID();

        var htmlVar="";
        htmlVar += "<div class=\"circular-menu\">";
        htmlVar += "  <div class=\"circular-menu-circle\">";
        htmlVar += "    <a  class=\"fa fa-home fa-3x\"><\/a>";
        htmlVar += "    <a  class=\"fa fa-video-camera fa-3x\"><\/a>";
        htmlVar += "    <a  class=\"fa fa-bar-chart fa-3x\"><\/a>";
        htmlVar += "    <a  class=\"fa fa-external-link-square fa-3x\"><\/a>";
        htmlVar += "    <a  class=\"fa fa-gear fa-3x\"><\/a>";
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
        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(transform);
        return "translate3d"+matches[0];
    }
});