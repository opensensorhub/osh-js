---
title: MjpegView
---

# MjpegView

<a name="MjpegView"></a>

## MjpegView ⇐ <code>View</code>
**Kind**: global class  
**Extends**: <code>View</code>  
<a name="new_MjpegView_new"></a>

### new MjpegView(parentElementDivId, options)
Create a View.


| Param | Type | Description |
| --- | --- | --- |
| parentElementDivId | <code>String</code> | The div element to attach to |
| options | <code>Object</code> | the properties of the view |
| options.dataSourceId | <code>String</code> | The dataSource id of the dataSource providing data to the view |
| options.entityId | <code>String</code> | The entity id to which the view belongs to |
| options.showTime | <code>String</code> | Display or not the time onto the view |
| options.rotation | <code>String</code> | Allow to define a rotation in degree |

**Example**  
```js
import MjpegView from 'osh/ui/view/video/MjpegView.js';

var videoView = new MjpegView("containerId", {
    dataSourceId: datasource.id,
    entity : entity,
    css: "video",
    cssSelected: "video-selected",
    name: "Video"
});
```
