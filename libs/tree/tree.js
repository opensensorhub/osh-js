///// Creating the tree component
// p_div: ID of the div where the tree will be rendered;
// p_backColor: Background color of the region where the tree is being rendered;
// p_contextMenu: Object containing all the context menus. Set null for no context menu;
import {randomUUID} from "../../source/core/utils/Utils.js";
import EventManager from "../../source/core/events/EventManager.js";
import './tree.css';

export function createTree(p_div, p_backColor, p_contextMenu) {
    var tree = {
        name: 'tree',
        div: p_div,
        ulElement: null,
        childNodes: [],
        backcolor: p_backColor,
        contextMenu: p_contextMenu,
        selectedNode: null,
        nodeCounter: 0,
        contextMenuDiv: null,
        rendered: false,
        ///// Creating a new node
        // p_text: Text displayed on the node;
        // p_expanded: True or false, indicating wether the node starts expanded or not;
        // p_icon: Relative path to the icon displayed with the node. Set null if the node has no icon;
        // p_parentNode: Reference to the parent node. Set null to create the node on the root;
        // p_tag: Tag is used to store additional information on the node. All node attributes are visible when programming events and context menu actions;
        // p_contextmenu: Name of the context menu, which is one of the attributes of the p_contextMenu object created with the tree;
        createNode: function(p_text, p_expanded, p_icon, p_parentNode, p_tag, p_contextmenu) {
            let v_tree = this;
            let node = {
                id: 'node_' + randomUUID(),
                text: p_text,
                icon: p_icon,
                parent: p_parentNode,
                expanded : p_expanded,
                childNodes : [],
                tag : p_tag,
                contextMenu: p_contextmenu,
                elementLi: null,
                ///// Removing the node and all its children
                removeNode: function() { v_tree.removeNode(this); },
                ///// Expanding or collapsing the node, depending on the expanded value
                toggleNode: function(p_event) { v_tree.toggleNode(this); },
                ///// Expanding the node
                expandNode: function(p_event) { v_tree.expandNode(this); },
                ///// Expanding the node and its children recursively
                expandSubtree: function() { v_tree.expandSubtree(this); },
                ///// Changing the node text
                // p_text: New text;
                setText: function(p_text) { v_tree.setText(this,p_text); },
                ///// Collapsing the node
                collapseNode: function() { v_tree.collapseNode(this); },
                ///// Collapsing the node and its children recursively
                collapseSubtree: function() { v_tree.collapseSubtree(this); },
                ///// Deleting all child nodes
                removeChildNodes: function() { v_tree.removeChildNodes(this); },
                ///// Creating a new child node;
                // p_text: Text displayed;
                // p_expanded: True or false, indicating wether the node starts expanded or not;
                // p_icon: Icon;
                // p_tag: Tag;
                // p_contextmenu: Context Menu;
                createChildNode: function(p_text,p_expanded,p_icon,p_tag,p_contextmenu) { return v_tree.createNode(p_text,p_expanded,p_icon,this,p_tag,p_contextmenu); }
            }

            this.nodeCounter++;

            if (this.rendered) {
                if (p_parentNode==undefined) {
                    this.drawNode(this.ulElement,node);
                    this.adjustLines(this.ulElement,false);
                }
                else {
                    var v_ul = p_parentNode.elementLi.getElementsByTagName("ul")[0];
                    if (p_parentNode.childNodes.length==0) {
                        if (p_parentNode.expanded) {
                            p_parentNode.elementLi.getElementsByTagName("ul")[0].style.display = 'block';
                            v_img = p_parentNode.elementLi.getElementsByTagName("img")[0];
                            v_img.style.visibility = "visible";
                            v_img.src = './images/tree/collapse.png';
                            v_img.id = 'toggle_off';
                        }
                        else {
                            p_parentNode.elementLi.getElementsByTagName("ul")[0].style.display = 'none';
                            v_img = p_parentNode.elementLi.getElementsByTagName("img")[0];
                            v_img.style.visibility = "visible";
                            v_img.src = './images/tree/expand.png';
                            v_img.id = 'toggle_on';
                        }
                    }
                    this.drawNode(v_ul,node);
                    this.adjustLines(v_ul,false);
                }
            }

            if (p_parentNode==undefined) {
                this.childNodes.push(node);
                node.parent=this;
            }
            else
                p_parentNode.childNodes.push(node);

            return node;
        },
        ///// Render the tree;
        drawTree: function() {

            this.rendered = true;

            var div_tree = document.getElementById(this.div);
            div_tree.innerHTML = '';

            let ulElement = createSimpleElement('ul',this.name,'tree');
            this.ulElement = ulElement;

            for (var i=0; i<this.childNodes.length; i++) {
                this.drawNode(ulElement,this.childNodes[i]);
            }

            div_tree.appendChild(ulElement);

            this.adjustLines(document.getElementById(this.name),true);

        },
        ///// Drawing the node. This function is used when drawing the Tree and should not be called directly;
        // p_ulElement: Reference to the UL tag element where the node should be created;
        // p_node: Reference to the node object;
        drawNode: function(p_ulElement,p_node) {

            let v_tree = this;

            var v_icon = null;

            if (p_node.icon!=null) {
                if(p_node.icon != undefined && p_node.icon != "") {
                    v_icon = createImgElement(null, 'icon_tree', p_node.icon);
                } else {
                    v_icon = createImgElement(null, 'icon_tree', "./images/tree/folder.gif");
                }
            }

            var v_li = document.createElement('li');
            p_node.elementLi = v_li;

            var v_span = createSimpleElement('span',null,'node');

            var v_exp_col = null;

            if (p_node.childNodes.length == 0) {
                v_exp_col = createImgElement('toggle_off','exp_col','./images/tree/collapse.png');
                v_exp_col.style.visibility = "hidden";
            }
            else {
                if (p_node.expanded) {
                    v_exp_col = createImgElement('toggle_off','exp_col','./images/tree/collapse.png');
                }
                else {
                    v_exp_col = createImgElement('toggle_on','exp_col','./images/tree/expand.png');
                }
            }

            v_span.ondblclick = function() {
                v_tree.doubleClickNode(p_node);
            };

            v_exp_col.onclick = function() {
                v_tree.toggleNode(p_node);
            };

            v_span.onclick = function() {
                v_tree.selectNode(p_node, true);
            };

            v_span.oncontextmenu = function(e) {
                v_tree.selectNode(p_node, false);
                v_tree.nodeContextMenu(e,p_node);
            };

            if (v_icon!=undefined)
                v_span.appendChild(v_icon);

            let v_a = createSimpleElement('a',p_node.id,null);
            v_a.innerHTML=p_node.text;
            v_span.appendChild(v_a);
            v_li.appendChild(v_exp_col);
            v_li.appendChild(v_span);

            p_ulElement.appendChild(v_li);

            var v_ul = createSimpleElement('ul','ul_' + p_node.id,null);
            v_li.appendChild(v_ul);

            if (p_node.childNodes.length > 0) {

                if (!p_node.expanded)
                    v_ul.style.display = 'none';

                for (var i=0; i<p_node.childNodes.length; i++) {
                    this.drawNode(v_ul,p_node.childNodes[i]);
                }
            }
        },
        ///// Changing node text
        // p_node: Reference to the node that will have its text updated;
        // p_text: New text;
        setText: function(p_node,p_text) {
            p_node.elementLi.getElementsByTagName('span')[0].lastChild.innerHTML = p_text;
            p_node.text = p_text;
        },
        ///// Expanding all tree nodes
        expandTree: function() {
            for (var i=0; i<this.childNodes.length; i++) {
                if (this.childNodes[i].childNodes.length>0) {
                    this.expandSubtree(this.childNodes[i]);
                }
            }
        },
        ///// Expanding all nodes inside the subtree that have parameter 'p_node' as root
        // p_node: Subtree root;
        expandSubtree: function(p_node) {
            this.expandNode(p_node);
            for (var i=0; i<p_node.childNodes.length; i++) {
                if (p_node.childNodes[i].childNodes.length>0) {
                    this.expandSubtree(p_node.childNodes[i]);
                }
            }
        },
        ///// Collapsing all tree nodes
        collapseTree: function() {
            for (var i=0; i<this.childNodes.length; i++) {
                if (this.childNodes[i].childNodes.length>0) {
                    this.collapseSubtree(this.childNodes[i]);
                }
            }
        },
        ///// Collapsing all nodes inside the subtree that have parameter 'p_node' as root
        // p_node: Subtree root;
        collapseSubtree: function(p_node) {
            this.collapseNode(p_node);
            for (var i=0; i<p_node.childNodes.length; i++) {
                if (p_node.childNodes[i].childNodes.length>0) {
                    this.collapseSubtree(p_node.childNodes[i]);
                }
            }
        },
        ///// Expanding node
        // p_node: Reference to the node;
        expandNode: function(p_node) {
            if (p_node.childNodes.length>0 && p_node.expanded==false) {
                if (this.nodeBeforeOpenEvent!=undefined)
                    this.nodeBeforeOpenEvent(p_node);

                var img=p_node.elementLi.getElementsByTagName("img")[0];

                p_node.expanded = true;

                img.id="toggle_off";
                img.src = './images/tree/collapse.png';
                let elem_ul = img.parentElement.getElementsByTagName("ul")[0];
                elem_ul.style.display = 'block';

                if (this.nodeAfterOpenEvent!=undefined)
                    this.nodeAfterOpenEvent(p_node);

                // check for default folden icon
                var divNode = document.getElementById(p_node.id);
                divNode.previousElementSibling.src = "./images/tree/folderopen.gif";
            }
        },
        ///// Collapsing node
        // p_node: Reference to the node;
        collapseNode: function(p_node) {
            if (p_node.childNodes.length>0 && p_node.expanded==true) {
                var img=p_node.elementLi.getElementsByTagName("img")[0];

                p_node.expanded = false;
                if (this.nodeBeforeCloseEvent!=undefined)
                    this.nodeBeforeCloseEvent(p_node);

                img.id="toggle_on";
                img.src = './images/tree/expand.png';
                let elem_ul = img.parentElement.getElementsByTagName("ul")[0];
                elem_ul.style.display = 'none';

                var divNode = document.getElementById(p_node.id);
                divNode.previousElementSibling.src = "./images/tree/folder.gif";

            }
        },
        ///// Toggling node
        // p_node: Reference to the node;
        toggleNode: function(p_node) {
            if (p_node.childNodes.length>0) {
                if (p_node.expanded)
                    p_node.collapseNode();
                else
                    p_node.expandNode();
            }
        },
        ///// Double clicking node
        // p_node: Reference to the node;
        doubleClickNode: function(p_node) {
            this.toggleNode(p_node);
        },
        ///// Selecting node
        // p_node: Reference to the node;
        selectNode: function(p_node, send_event) {
            var span = p_node.elementLi.getElementsByTagName("span")[0];
            span.className = 'node_selected';
            if (this.selectedNode!=null && this.selectedNode!=p_node)
                this.selectedNode.elementLi.getElementsByTagName("span")[0].className = 'node';
            this.selectedNode = p_node;

            // if node is an entity, send selected event
            if (send_event && p_node.tag !== null && typeof(p_node.tag.id) != "undefined") {
                EventManager.fire(EventManager.EVENT.SELECT_VIEW,{
                    dataSourcesIds: ["none"],
                    entityId: p_node.tag.id,
                });
            }
        },
        ///// Deleting node
        // p_node: Reference to the node;
        removeNode: function(p_node) {
            var index = p_node.parent.childNodes.indexOf(p_node);

            if (p_node.elementLi.className=="last" && index!=0) {
                p_node.parent.childNodes[index-1].elementLi.className += "last";
                p_node.parent.childNodes[index-1].elementLi.style.backgroundColor = this.backcolor;
            }

            p_node.elementLi.parentNode.removeChild(p_node.elementLi);
            p_node.parent.childNodes.splice(index, 1);

            if (p_node.parent.childNodes.length==0) {
                var v_img = p_node.parent.elementLi.getElementsByTagName("img")[0];
                v_img.style.visibility = "hidden";
            }

        },
        ///// Deleting all node children
        // p_node: Reference to the node;
        removeChildNodes: function(p_node) {

            if (p_node.childNodes.length>0) {
                var v_ul = p_node.elementLi.getElementsByTagName("ul")[0];

                var v_img = p_node.elementLi.getElementsByTagName("img")[0];
                v_img.style.visibility = "hidden";

                p_node.childNodes = [];
                v_ul.innerHTML = "";
            }
        },
        ///// Rendering context menu when mouse right button is pressed over a node. This function should no be called directly
        // p_event: Event triggered when right clicking;
        // p_node: Reference to the node;
        nodeContextMenu: function(p_event,p_node) {
            if (p_event.button==2) {
                p_event.preventDefault();
                p_event.stopPropagation();
                if (p_node.contextMenu!=undefined) {

                    let v_tree = this;

                    var v_left = p_event.pageX;
                    var v_right = p_event.pageY;

                    var divTree = document.getElementById(v_tree.div);

                    v_tree.currentContextMenu = p_node.contextMenu;
                    EventManager.fire(EventManager.EVENT.CONTEXT_MENU+"-"+p_node.contextMenu,{
                        //TODO: values have to be provided by properties
                        offsetX: 10,
                        offsetY: 10,
                        action : "show",
                        x:v_left,
                        y:v_right
                    });
                }
            }
        },
        ///// Recursive function called when rendering context menu submenus. This function should no be called directly
        // p_submenu: Reference to the submenu object;
        // p_ul: Reference to the UL tag;
        // p_node: Reference to the node;
        contextMenuLi : function(p_submenu,p_ul,p_node) {

            let v_tree = this;

            for (var i=0; i<p_submenu.elements.length; i++) (function(i){

                var v_li = createSimpleElement('li',null,null);

                var v_span = createSimpleElement('span',null,null);
                v_span.onclick = function () {  p_submenu.elements[i].action(p_node) };

                var v_a = createSimpleElement('a',p_node.id,null);
                var v_ul = createSimpleElement('ul',null,'sub-menu');

                v_a.appendChild(document.createTextNode(p_submenu.elements[i].text));

                v_li.appendChild(v_span);

                if (p_submenu.elements[i].icon!=undefined) {
                    var v_img = createImgElement('null','null',p_submenu.elements[i].icon);
                    v_li.appendChild(v_img);
                }

                v_li.appendChild(v_a);
                v_li.appendChild(v_ul);
                p_ul.appendChild(v_li);

                if (p_submenu.elements[i].p_submenu!=undefined) {
                    var v_span_more = createSimpleElement('div',null,null);
                    v_span_more.appendChild(createImgElement(null,'menu_img','./images/tree/right.png'));
                    v_li.appendChild(v_span_more);
                    v_tree.contextMenuLi(p_submenu.elements[i].p_submenu,v_ul,p_node);
                }

            })(i);
        },
        ///// Adjusting tree dotted lines. This function should not be called directly
        // p_node: Reference to the node;
        adjustLines: function(p_ul,p_recursive) {
            var tree = p_ul;

            var lists = [];

            if (tree.childNodes.length>0) {
                lists = [ tree ];

                if (p_recursive) {
                    for (var i = 0; i < tree.getElementsByTagName("ul").length; i++) {
                        var check_ul = tree.getElementsByTagName("ul")[i];
                        if (check_ul.childNodes.length!=0)
                            lists[lists.length] = check_ul;
                    }
                }

            }

            for (var i = 0; i < lists.length; i++) {
                var item = lists[i].lastChild;

                while (!item.tagName || item.tagName.toLowerCase() != "li") {
                    item = item.previousSibling;
                }

                item.className += "last";
                item.style.backgroundColor = this.backcolor;

                item = item.previousSibling;

                if (item!=null)
                    if (item.tagName.toLowerCase() == "li") {
                        item.className = "";
                        item.style.backgroundColor = 'transparent';
                    }
            }
        }
    }

    window.onmousedown = function() {
        if(typeof tree.currentContextMenu != "undefined") {
            EventManager.fire(EventManager.EVENT.CONTEXT_MENU+"-"+tree.currentContextMenu,{
                action : "hide"
            });
            tree.currentContextMenu = undefined;
        }
    }

    window.onclick = function() {
        if(typeof tree.currentContextMenu != "undefined") {
            EventManager.fire(EventManager.EVENT.CONTEXT_MENU+"-"+tree.currentContextMenu,{
                action : "hide"
            });
            tree.currentContextMenu = undefined;
        }
    }
    return tree;
}

// Helper Functions

//Create a HTML element specified by parameter 'p_type'
export function createSimpleElement(p_type,p_id,p_class) {
    let element = document.createElement(p_type);
    if (p_id!=undefined)
        element.id = p_id;
    if (p_class!=undefined)
        element.className = p_class;
    return element;
}

//Create img element
export function createImgElement(p_id,p_class,p_src) {
    let element = document.createElement('img');
    if (p_id!=undefined)
        element.id = p_id;
    if (p_class!=undefined)
        element.className = p_class;
    if (p_src !=undefined) {
        element.src = p_src;
    }
    return element;
}
