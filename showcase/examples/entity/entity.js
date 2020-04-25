import EntityTreeView from "osh/ui/view/entity/EntityTreeView.js";

let entityTreeView = new EntityTreeView("tree-container",
    [{
      entity : {
        name: 'Sensor'
      },
      path: "Sensors/Toulouse",
      treeIcon : "images/android_icon.png"
    }],
    {
      css: "tree-container"
    }
);
