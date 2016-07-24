OSH.UI.EntityTreeView = Class.create(OSH.UI.View,{
    initialize:function($super,divId,entityItems, options) {
        $super(divId,[],options);

        document.getElementById(this.divId).setAttribute("class",this.css);
        //this.divId = divId;
        this.entityItems = entityItems;
        this.initTree(options);
        //this.test(options);
    },

    initTree:function(options) {
        this.tree = createTree(this.divId,'white',null);

        // iterates over entities to create treeNode
        for(var i = 0;i < this.entityItems.length;i++) {
            var currentItem = this.entityItems[i];
            var entity = currentItem.entity;
            var path = currentItem.path;
            var treeIcon = currentItem.treeIcon;
            var contextMenuId = currentItem.contextMenuId;

            if(path.endsWith("/")) {
                path = path.substring(0,path.length-1);
            }
            var folder = path.split("/");
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
                var leaf = currentNode.createChildNode(entity.name, false, treeIcon, null, contextMenuId);
            } else {
                this.tree.createNode(entity.name,false,treeIcon,null, contextMenuId);
            }
        }

        //Rendering the tree
        this.tree.drawTree();
    }
});