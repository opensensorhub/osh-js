OSH.UI.EntityTreeView = Class.create(OSH.UI.View,{
    initialize:function($super,divId,viewItems, options) {
        //$super(divId,viewItems,options);
        this.divId = divId;
        //this.init(options);
        this.test(options);
    },

    init:function() {

    },

    test:function(options) {
        //Initializing Tree

        //Tree Context Menu Structure
        var contex_menu = {
            'context1' : {
                elements : [
                    {
                        text: 'Camera',
                        icon: '',
                        class: 'fa fa-video-camera',
                        action: function (node) {

                        }
                    },
                    {
                        text: 'Node Actions',
                        icon: 'images/tree/leaf.png',
                        action: function (node) {

                        }
                    },
                    {
                        text: 'Node Actions',
                        icon: 'images/tree/leaf.png',
                        action: function (node) {

                        }
                    },
                    {
                        text: 'Node Actions',
                        icon: 'images/tree/leaf.png',
                        action: function (node) {

                        }
                    }
                ]
            }
        };

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