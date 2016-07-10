OSH.UI.EntityTreeView = Class.create(OSH.UI.View,{
    initialize:function($super,divId,viewItems, options) {
        //$super(divId,viewItems,options);
        this.divId = divId;
        this.test();
    },

    test:function() {
        //Initializing Tree

        //Tree Context Menu Structure
        var contex_menu = {
            'context1' : {
                elements : [
                    {
                        text : 'Node Actions',
                        icon: 'images/tree/blue_key.png',
                        action : function(node) {

                        },
                        submenu: {
                            elements : [
                                {
                                    text : 'Toggle Node',
                                    icon: 'images/tree/leaf.png',
                                    action : function(node) {
                                        node.toggleNode();
                                    }
                                },
                                {
                                    text : 'Expand Node',
                                    icon: 'images/tree/leaf.png',
                                    action : function(node) {
                                        node.expandNode();
                                    }
                                },
                                {
                                    text : 'Collapse Node',
                                    icon: 'images/tree/leaf.png',
                                    action : function(node) {
                                        node.collapseNode();
                                    }
                                },
                                {
                                    text : 'Expand Subtree',
                                    icon: 'images/tree/tree.png',
                                    action : function(node) {
                                        node.expandSubtree();
                                    }
                                },
                                {
                                    text : 'Collapse Subtree',
                                    icon: 'images/tree/tree.png',
                                    action : function(node) {
                                        node.collapseSubtree();
                                    }
                                },
                                {
                                    text : 'Delete Node',
                                    icon: 'images/tree/delete.png',
                                    action : function(node) {
                                        node.removeNode();
                                    }
                                },
                            ]
                        }
                    },
                    {
                        text : 'Child Actions',
                        icon: 'images/tree/blue_key.png',
                        action : function(node) {

                        },
                        submenu: {
                            elements : [
                                {
                                    text : 'Create Child Node',
                                    icon: 'images/tree/add1.png',
                                    action : function(node) {
                                        node.createChildNode('Created',false,'images/tree/folder.png',null,'context1');
                                    }
                                },
                                {
                                    text : 'Create 1000 Child Nodes',
                                    icon: 'images/tree/add1.png',
                                    action : function(node) {
                                        for (var i=0; i<1000; i++)
                                            node.createChildNode('Created -' + i,false,'images/tree/folder.png',null,'context1');
                                    }
                                },
                                {
                                    text : 'Delete Child Nodes',
                                    icon: 'images/tree/delete.png',
                                    action : function(node) {
                                        node.removeChildNodes();
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        };

        //Creating the tree
        tree = createTree(this.divId,'white',contex_menu);

        //Rendering the tree
        tree.drawTree();

        //Adding node after tree is already rendered
        var node = tree.createNode('Entity 1',false,'images/tree/leaf.png',null,null,'context1');
        node.createChildNode('Sub test 2',false,'images/tree/leaf.png',null,null,'context1');
        tree.createNode('Entity 3',false,'images/tree/leaf.png',null,null,'context1');
        tree.createNode('Entity 4',false,'images/tree/leaf.png',null,null,'context1');
        tree.createNode('Entity 5',false,'images/tree/leaf.png',null,null,'context1');
    }
});