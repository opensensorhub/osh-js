---
title: EntityTreeView
---

# EntityTreeView

<a name="EntityTreeView"></a>

## EntityTreeView ⇐ <code>View</code>
This class is in charge of displaying the entities in a tree structure.

**Kind**: global class  
**Extends**: <code>View</code>  
<a name="new_EntityTreeView_new"></a>

### new EntityTreeView(parentElementDivId, entityItems, options)
Create a View.


| Param | Type | Description |
| --- | --- | --- |
| parentElementDivId | <code>String</code> | The div element to attach to |
| entityItems | <code>Array.&lt;Object&gt;</code> | The initial view items to add |
| options | <code>Object</code> | the properties of the view |

**Example**  
```js
import EntityTreeView from 'osh/ui/view/entity/EntityTreeView.js';
 import EntityTreeView from 'osh/entity/Entity.js';

 let entityTreeView = new EntityTreeView(divId,
     [{
        entity : new Entity('android entity',[dataSource]),
        path: "Sensors/Toulouse",
        treeIcon : "images/android_icon.png"
     }],
     {
         css: "tree-container"
     }
 );
```
