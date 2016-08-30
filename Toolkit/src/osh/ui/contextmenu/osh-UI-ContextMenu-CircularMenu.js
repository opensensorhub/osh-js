/**
 * @classdesc A circular context menu
 * @class
 * @type {OSH.UI.ContextMenu.CssMenu}
 */
OSH.UI.ContextMenu.CircularMenu = Class.create(OSH.UI.ContextMenu.CssMenu, {
    initialize:function($super,properties) {
        $super(properties,"circular");
    }
});