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
 * @classdesc This class creates a log view. It catches "osh:log" events and display them into a internal dialog.
 * This view creates a dialog view
 * @class
 * @deprecated
 */
export default class Log {
    constructor(){
        this.logDiv = document.createElement("TEXTAREA");
        this.logDiv.setAttribute("class", "osh-log popup-content");
        this.logDiv.setAttribute("wrap","off");
        this.first = true;
        // appends <div> tag to <body>
        document.observe("dom:loaded", function() {
            let dialog = new OSH.UI.DialogView({
                title: "Logging console"
            });
            /*dialog.appendContent(this.logDiv);
            dialog.setContentSize("300px","400px");

            this.logDiv.value = "[osh-log]> \n";*/
        }.bind(this));

        document.observe("osh:log", function(event) {
            if(this.first) {
                this.logDiv.value = "[osh-log]> " + event.memo + "\n";
                this.first = false;
            } else {
                this.logDiv.value += "[osh-log]> " + event.memo + "\n";
            }
        }.bind(this));
    }
}

//var log = new OSH.Log();
