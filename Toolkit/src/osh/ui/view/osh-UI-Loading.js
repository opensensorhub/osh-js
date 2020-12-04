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
 * @class
 * @classdesc
 */
OSH.UI.Loading = BaseClass.extend({
    initialize: function () {
        var loadingDiv = document.createElement("div");
        loadingDiv.setAttribute("class",'loading-container');

        OSH.EventManager.observe(OSH.EventManager.EVENT.LOADING_START,function(event){
            var htmlVar="";
            htmlVar += "	<div class=\"loading-dot-container\">";
            htmlVar += "	<div class=\"loading-dot-section-1\"><span class=\"loading-label\">Buffering<\/span><\/div>";
            htmlVar += "	<div class=\"loading-dot-section-2\">";
            htmlVar += "	<div class=\"loading-dot\"><\/div>";
            htmlVar += "	<div class=\"loading-dot\"><\/div>";
            htmlVar += "	<div class=\"loading-dot\"><\/div>";
            htmlVar += "	</div>";
            htmlVar += "	<\/div>";

            loadingDiv.innerHTML = htmlVar;
            document.body.appendChild(loadingDiv);
        });

        OSH.EventManager.observe(OSH.EventManager.EVENT.LOADING_STOP,function(event){
            document.body.removeChild(loadingDiv);
        });
    }
});

new OSH.UI.Loading();