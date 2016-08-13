OSH.UI.EntityTreeView = Class.create(OSH.UI.View,{
    initialize:function($super,divId,entityItems, options) {
        $super(divId,[],options);

        this.entityItems = entityItems;
        this.initTree(options);
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
            
            // create intermediary folders or append to them as needed 
            var folder = path.split("/");
            var nbNodes = folder.length;
            var currentNode = this.tree;
            var pos = 0;
            while(nbNodes > 0) {
            	var existingChildNode = null;
            	
            	// scan child nodes to see if folder already exists
            	for (n=0; n<currentNode.childNodes.length; n++) {
            		var node = currentNode.childNodes[n];
            		if (node.text === folder[pos]) {
            			existingChildNode = node;
            		    break;
            		}
                }
            	
            	// if folder already exists, just use it as parent in next iteration
            	// otherwise create a new node to use as new parent
            	if (existingChildNode == null) {
            		if (currentNode === this.tree)
            			currentNode = this.tree.createNode(folder[pos],false,'',null,null);
            		else
            			currentNode = currentNode.createChildNode(folder[pos],false,'',null,null);    
                } else {
                	currentNode = existingChildNode;
                }
            	
                pos++;
                nbNodes--;
            }
            if(currentNode === this.tree) {
            	this.tree.createNode(entity.name,false,treeIcon,null, contextMenuId);
            } else {
            	currentNode.createChildNode(entity.name, false, treeIcon, null, contextMenuId);
            }
        }

        //Rendering the tree
        this.tree.drawTree();
    }
});