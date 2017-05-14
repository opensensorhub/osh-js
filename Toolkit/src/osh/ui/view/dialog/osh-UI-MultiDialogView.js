/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @classdesc Display a dialog with multiple view attach to it.
 * @class
 * @type {OSH.UI.Dialog}
 * @augments OSH.UI.Dialog
 */
OSH.UI.MultiDialogView = OSH.UI.DialogView.extend({

    initialize:function(parentElementDivId, options) {
        this._super(parentElementDivId,options);
        // add extra part
        this.popExtraDiv = document.createElement("div");
        this.popExtraDiv.setAttribute("class","pop-extra");
        this.popExtraDiv.setAttribute("id","pop-extra-id-"+OSH.Utils.randomUUID());

        this.flexDiv.appendChild(this.popExtraDiv);
    },

    /**
     * Appends a new view to the existing dialog.
     * @param parentElement
     * @instance
     * @memberof OSH.UI.MultiDialogView
     */
    appendView:function(parentElement,properties) {
        //console.log(this.popContentDiv);
        //remove from parent
        var divToAdd = document.getElementById(parentElement);

        // check the visibility of the div
        if(divToAdd.style.display === "none") {
            divToAdd.style.display = "block";
        }


        var extraDiv = document.createElement("div");
        extraDiv.setAttribute("class","pop-extra-el");

        var i = document.createElement("i");
        i.setAttribute("class","fa fa-caret-right pop-extra-collapse fa-2x");

        i.onclick = function() {
            if(i.className.indexOf("fa-caret-down") == -1){
                i.className = "fa fa-caret-down pop-extra-show fa-2x";
            } else {
                i.className = "fa fa-caret-right pop-extra-collapse fa-2x";
            }
        };
        extraDiv.appendChild(i);
        extraDiv.appendChild(divToAdd);
        this.popExtraDiv.appendChild(extraDiv);

    },

    swap:function() {
        var currentSwapValue = this.swapped;
        this._super();

        // hide extra stuff
        if(!currentSwapValue) {
            this.popExtraDiv.style.display = "none";
        } else {
            this.popExtraDiv.style.display = "block";
        }
    },

    show: function(properties) {
        this._super(properties);
        //if(!isUndefinedOrNull(this.divToAdd) && this.divToAdd.style.display === "none") {
        //   this.divToAdd.style.display = "block";
        //  }
    }
});