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
 * @namespace {object} OSH
 */
var OSH = {
	version: '1.2'
};

window.OSH = OSH;

/**
 * @namespace {object} OSH.Video
 * @memberof OSH
 */
window.OSH.Video = {};

/**
 * @namespace {object} OSH.UI
 * @memberof OSH
 */
window.OSH.UI = {};

/**
 * @namespace {object} OSH.UI.View
 * @memberof OSH.UI
 */
window.OSH.UI.View = {};

/**
 * @namespace {object} OSH.UI.Styler
 * @memberof OSH.UI
 */
window.OSH.Styler = {};

/**
 * @namespace {object} OSH.UI.ContextMenu
 * @memberof OSH.UI
 */
window.OSH.ContextMenu = {};

/**
 * @namespace {object} OSH.DataReceiver
 * @memberof OSH
 */
window.OSH.DataReceiver = {};

/**
 * @namespace {object} OSH.DataConnector
 * @memberof OSH
 */
window.OSH.DataConnector = {};

/**
 * @namespace {object} OSH.Utils
 * @memberof OSH
 */
window.OSH.Utils = {};

/**
 * @namespace {object} OSH.DataSender
 * @memberof OSH
 */
window.OSH.DataSender = {};

window.OSH.BASE_WORKER_URL = "js/workers";

// HELPER FUNCTION
function isUndefined(object) {
	return typeof(object) == "undefined";
}

function isUndefinedOrNull(object) {
	return typeof(object) === "undefined" || object === null;
}