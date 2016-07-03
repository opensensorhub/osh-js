OSH.UI.ContextMenu.PointMarker = Class.create(OSH.UI.ContextMenu, {
    initialize:function($super,properties) {
        $super(properties);

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

        document.body.appendChild(this.rootTag);
        var items = document.querySelectorAll('.circular-menu-circle a');

        for(var i = 0, l = items.length; i < l; i++) {
            items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
            items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
        }

        this.rootTag.style.display = "none";
        this.isVisible = false;

        $(closeId).on("click",this.hide.bind(this));
    },

    show:function($super,x,y) {
        if(!this.isVisible) {
            this.isVisible = true;
            this.rootTag.style.display = "block";
            document.querySelector('.circular-menu-circle').classList.toggle('open');
            this.rootTag.style.left = x - 125;
            this.rootTag.style.top = y - 125;
        }
    },

    hide:function($super){
        if(this.isVisible) {
            this.rootTag.style.display = "none";
            this.isVisible = false;
        }
    }
});