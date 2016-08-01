OSH.UI.Loading = Class.create({
    initialize: function () {
        var htmlVar="";
        htmlVar += "	<div class=\"loading-dot-container\">";
        htmlVar += "	<div class=\"loading-dot\"><\/div>";
        htmlVar += "	<div class=\"loading-dot\"><\/div>";
        htmlVar += "	<div class=\"loading-dot\"><\/div>";
        htmlVar += "	<div><span class=\"loading-label\">Buffering<\/span><\/div>";
        htmlVar += "	<\/div>";

        var loadingDiv = document.createElement("div");
        loadingDiv.setAttribute("class",'loading-container');
        loadingDiv.innerHTML = htmlVar;

        OSH.EventManager.observe(OSH.EventManager.EVENT.LOADING_START,function(event){
            document.body.appendChild(loadingDiv);
        });

        OSH.EventManager.observe(OSH.EventManager.EVENT.LOADING_STOP,function(event){
            document.body.removeChild(loadingDiv);
        });
    }
});

new OSH.UI.Loading();