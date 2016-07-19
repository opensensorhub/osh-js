OSH.UI.EntityTreeView = Class.create(OSH.UI.View,{
    initialize:function($super,divId,entityItems, options) {
        //$super(divId,viewItems,options);
        this.divId = divId;
        this.entityItems = entityItems;
        this.init(options);
        //this.test(options);
    },

    init:function(options) {
        this.tree = createTree(this.divId,'white',null);

        // iterates over entities to create treeNode
        for(var i = 0;i < this.entityItems.length;i++) {
            var currentEntity = this.entityItems[i];
            // splits path into node folder
            var path = currentEntity.path;
            if(path.endsWith("/")) {
                path = path.substring(0,path.length-1);
            }
            var folder = currentEntity.path.split("/");
            var nbNodes = folder.length;
            var currentNode = null;
            var pos = 0;
            while(nbNodes > 0) {
                if(currentNode == null) {
                    currentNode = this.tree.createNode(folder[pos],false,'',null,null);
                } else {
                    currentNode = currentNode.createChildNode(folder[pos],false,'',null,null);
                }
                pos++;
                nbNodes--;
            }
            if(currentNode != null) {
                var leaf = currentNode.createChildNode(currentEntity.name, false, currentEntity.treeIcon, null, currentEntity.contextMenu);
            } else {
                this.tree.createNode(currentEntity.name,false,currentEntity.treeIcon,null, currentEntity.contextMenu);
            }
        }

        //Rendering the tree
        this.tree.drawTree();
    }
});