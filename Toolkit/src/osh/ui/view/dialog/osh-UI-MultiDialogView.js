/**
 * @classdesc Display a dialog with multiple view attach to it.
 * @class
 * @type {OSH.UI.Dialog}
 * @augments OSH.UI.Dialog
 */
OSH.UI.MultiDialogView = Class.create(OSH.UI.DialogView,{

    initialize:function($super,divId, options) {
        $super(divId,options);
        // add extra part
        this.popExtraDiv = document.createElement("div");
        this.popExtraDiv.setAttribute("class","pop-extra");
        this.popExtraDiv.setAttribute("id","pop-extra-id-"+OSH.Utils.randomUUID());

        this.rootTag.appendChild(this.popExtraDiv);
    },

    /**
     * Appends a new view to the existing dialog.
     * @param divId
     * @instance
     * @memberof OSH.UI.MultiDialogView
     */
    appendView:function(divId,properties) {
        //console.log(this.popContentDiv);
        //remove from parent
        var divToAdd = document.getElementById(divId);

        /*var htmlExtra = "<ul><li><input type=\"checkbox\"/></li></ul>";
         htmlExtra += this.divToAdd.innerHTML;

         var extraDiv = document.createElement("div");
         extraDiv.innerHTML = htmlExtra;
         this.popExtraDiv.appendChild(extraDiv);*/

        // check the visibility of the div
        if(divToAdd.style.display === "none") {
            divToAdd.style.display = "block";
        }


        var extraDiv = document.createElement("div");
        extraDiv.setAttribute("class","pop-extra-el");

        var i = document.createElement("i");
        i.setAttribute("class","fa fa-caret-right pop-extra-collapse");

        i.onclick = function() {
            if(i.className.indexOf("fa-caret-down") == -1){
                i.className = "fa fa-caret-down pop-extra-show";
            } else {
                i.className = "fa fa-caret-right pop-extra-collapse";
            }
        };
        extraDiv.appendChild(i);
        extraDiv.appendChild(divToAdd);
        this.popExtraDiv.appendChild(extraDiv);

    },

    show: function($super,properties) {
        $super(properties);
        //if(!isUndefinedOrNull(this.divToAdd) && this.divToAdd.style.display === "none") {
        //   this.divToAdd.style.display = "block";
        //  }
    }
});