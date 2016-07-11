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
    },

    test:function(options) {
        //Initializing Tree

        //Tree Context Menu Structure
        //Creating the tree
        tree = createTree(this.divId,'white',null);

        var node1 = tree.createNode('Level 0 - Node ',false,'images/tree/star.png',null,null,null,options.contextMenu);

        //Rendering the tree
        tree.drawTree();

        //Adding node after tree is already rendered
        /*var node = tree.createNode('Entity 1',false,'images/tree/leaf.png',null,null,'context1');
        node.createChildNode('Sub test 2',false,'images/tree/leaf.png',null,null,'context1');
        tree.createNode('Entity 3',false,'images/tree/leaf.png',null,null,'context1');
        tree.createNode('Entity 4',false,'images/tree/leaf.png',null,null,'context1');
        tree.createNode('Entity 5',false,'images/tree/leaf.png',null,null,'context1');*/
    }
});