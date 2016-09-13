/**
 * @namespace {object} OSH
 */
var OSH = {
	version: 'dev'
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

// HELPER FUNCTION
function isUndefined(object) {
	return typeof(object) == "undefined";
}