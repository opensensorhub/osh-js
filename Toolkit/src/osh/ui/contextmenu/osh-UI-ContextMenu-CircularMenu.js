/**
 * @classdesc A circular context menu
 * @class
 * @type {OSH.UI.ContextMenu.CssMenu}
 * @augments OSH.UI.ContextMenu.CssMenu
 * @example
 * var menuItems = [{
        name: "Item 1",
        viewId: viewId,
        css: "someCssClass"
   },{
        name: "Item 2",
        viewId: viewId2,
        css: "someCssClass"
   }];

  var contextCircularMenu = new OSH.UI.ContextMenu.CircularMenu({id : randomId,groupId: randomGroupId,items : menuItems});
 */
OSH.UI.ContextMenu.CircularMenu = OSH.UI.ContextMenu.CssMenu.extend({
    initialize:function(properties) {
        this._super(properties,"circular");
    }
});