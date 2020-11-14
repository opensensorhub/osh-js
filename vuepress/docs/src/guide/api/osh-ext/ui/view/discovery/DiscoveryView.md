---
title: DiscoveryView
---

# DiscoveryView

## Modules

<dl>
<dt><a href="#DiscoveryView+module_DiscoveryView">DiscoveryView</a> : <code>Object</code></dt>
<dd><p>The different type of discovery.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#DiscoveryView">DiscoveryView</a> ⇐ <code>View</code></dt>
<dd><p>Class representing a Discovery View. The discovery view is a helper class to
select dynamically an offering provided by a server.</p>
</dd>
</dl>

<a name="DiscoveryView+module_DiscoveryView"></a>

## DiscoveryView : <code>Object</code>
The different type of discovery.

<a name="DiscoveryView"></a>

## DiscoveryView ⇐ <code>View</code>
Class representing a Discovery View. The discovery view is a helper class to
select dynamically an offering provided by a server.

**Kind**: global class  
**Extends**: <code>View</code>  
<a name="new_DiscoveryView_new"></a>

### new DiscoveryView(parentElementDivId, properties)
Create the discoveryView


| Param | Type | Description |
| --- | --- | --- |
| parentElementDivId | <code>string</code> | The div element to attach to |
| properties | <code>Object</code> | The properties defining the view |
| properties.dataReceiverController | <code>Object</code> | An optional data receiver controller |
| properties.swapId | <code>string</code> | The div to switch element with |
| properties.callback | <code>function</code> | The callback called when the submit button is pressed |
| properties.views | <code>Array.&lt;Object&gt;</code> | The supported view types |
| properties.services | <code>Array.&lt;string&gt;</code> | The supported remote or local services to explore |
| properties.css | <code>string</code> | The CSS class |
| properties.entities | <code>Array.&lt;Object&gt;</code> | The entities to attach the new selected element |

**Example**  
```js
import DiscoveryView from 'osh-ext/ui/view/DiscoveryView.js';

 let discoveryView = new DiscoveryView("discovery-container",{
    callback: onSubmit,
    css: "discovery-style",
    services: ["http://sensiasoft.net:8181"],
    views: [{
        name: 'Video',
        type : DiscoveryType.VIDEO_H264
    },{
        name: 'Video',
        type : DiscoveryType.VIDEO_MJPEG
    },{
        name: 'Chart',
        type : DiscoveryType.CHART
    },{
        name: 'Gps',
        type : DiscoveryType.MARKER_GPS
    }]
});
```
