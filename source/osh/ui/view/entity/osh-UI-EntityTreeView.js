/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import View from "../osh-UI-View.js";
import {isDefined} from "../../../osh-Utils.js";

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @param {Object} parentElement The parent html element to attach the view
 * @param {Array} entityItems The entity items array
 * @param {Object} options the {@link OSH.View} options
 * @example
 let entityTreeView = new OSH.UI.EntityTreeView(entityTreeDialog.popContentDiv.id,
     [{
        entity : androidEntity,
        path: "Sensors/Toulouse",
        treeIcon : "images/android_icon.png",
        contextMenuId: stackContextMenuId
     }],
     {
         css: "tree-container"
     }
 );
 */
export default class EntityTreeView extends View {
    constructor(parentElementDivId,entityItems,options) {
        super(parentElementDivId,[],options);
        this.entityItems = entityItems;
        this.initTree(options);
    }

    /**
     *
     * @param options
     * @instance
     * @memberof OSH.UI.EntityTreeView
     */
    initTree(options) {
        this.tree = createTree(this.divId,'white',null);

        // iterates over entities to create treeNode
        for(let i = 0;i < this.entityItems.length;i++) {
            let currentItem = this.entityItems[i];
            let entity = currentItem.entity;
            let path = currentItem.path;
            let treeIcon = currentItem.treeIcon;
            let contextMenuId = currentItem.contextMenuId;

            if(path.endsWith("/")) {
                path = path.substring(0,path.length-1);
            }

            // create intermediary folders or append to them as needed
            let folder = path.split("/");
            let nbNodes = folder.length;
            let currentNode = this.tree;
            let pos = 0;
            while(nbNodes > 0) {
                let existingChildNode = null;

                // scan child nodes to see if folder already exists
                for (n=0; n<currentNode.childNodes.length; n++) {
                    let node = currentNode.childNodes[n];
                    if (node.text === folder[pos]) {
                        existingChildNode = node;
                        break;
                    }
                }

                // if folder already exists, just use it as parent in next iteration
                // otherwise create a new node to use as new parent
                if (existingChildNode == null) {
                    if (currentNode === this.tree) {
                        currentNode = this.tree.createNode(folder[pos], false, '', this.tree, null, null);
                    } else {
                        currentNode = currentNode.createChildNode(folder[pos], false, '', null, null);
                    }
                } else {
                    currentNode = existingChildNode;
                }

                pos++;
                nbNodes--;
            }

            let entityNode;
            if(currentNode === this.tree) {
                entityNode = this.tree.createNode(entity.name,false,treeIcon,this.tree,entity,contextMenuId);
            } else {
                entityNode = currentNode.createChildNode(entity.name,false,treeIcon,entity,contextMenuId);
            }
            currentItem.node = entityNode;
        }

        //Rendering the tree
        this.tree.drawTree();
    }

    /**
     *
     * @param dataSourcesIds
     * @param entityId
     * @instance
     * @memberof OSH.UI.EntityTreeView
     */
    selectDataView(dataSourcesIds, entityId) {

        // when an entity is selected we find the corresponding node in the tree
        // we expand all its ancestors and we mark it as selected
        if (isDefined(entityId)) {
            for(let i = 0;i < this.entityItems.length;i++) {
                let currentItem = this.entityItems[i];
                if (currentItem.entity.id === entityId) {
                    this.tree.selectNode(currentItem.node, false);
                    let node = currentItem.node.parent;
                    while (node !== this.tree) {
                        this.tree.expandNode(node);
                        node = node.parent;
                    }
                    currentItem.node.elementLi.scrollIntoViewIfNeeded(true);
                }

            }
        }
    }
}
