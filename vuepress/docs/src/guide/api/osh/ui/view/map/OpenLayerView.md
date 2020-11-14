---
title: OpenLayerView
---

# OpenLayerView

<a name="OpenLayerView"></a>

## OpenLayerView ⇐ <code>View</code>
This class is in charge of displaying GPS/orientation data by adding a marker to the OpenLayer Map object.

**Kind**: global class  
**Extends**: <code>View</code>  

* [OpenLayerView](#OpenLayerView) ⇐ <code>View</code>
    * [new OpenLayerView(parentElementDivId, viewItems, options)](#new_OpenLayerView_new)
    * [.updateMarker(styler)](#OpenLayerView+updateMarker)
    * [.updatePolyline(styler)](#OpenLayerView+updatePolyline)
    * [.getDefaultLayers()](#OpenLayerView+getDefaultLayers) ⇒ <code>Array</code>
    * [.addMarker(properties)](#OpenLayerView+addMarker) ⇒ <code>String</code>
    * [.removeViewItem(viewItem)](#OpenLayerView+removeViewItem)
    * [.addPolyline(properties)](#OpenLayerView+addPolyline) ⇒ <code>string</code>

<a name="new_OpenLayerView_new"></a>

### new OpenLayerView(parentElementDivId, viewItems, options)
Create a View.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| parentElementDivId | <code>String</code> |  | The div element to attach to |
| viewItems | <code>Array.&lt;Object&gt;</code> |  | The initial view items to add |
| viewItems.name | <code>String</code> |  | The name of the view item |
| viewItems.styler | <code>Styler</code> |  | The styler object representing the view item |
| options | <code>Object</code> |  | the properties of the view |
| options.map | <code>Object</code> |  | the map object to use |
| [options.maxZoom] | <code>Integer</code> | <code>19</code> |  |
| options.autoZoomOnFirstMarker | <code>Boolean</code> |  | auto zoom on the first added marker |
| options.initialView | <code>Object</code> |  | {lon:.., lat:..} |
| options.overlayLayers | <code>Array.&lt;Object&gt;</code> |  | OpenLayers objects to use as overlay layer |
| options.baseLayers | <code>Array.&lt;Object&gt;</code> |  | OpenLayers objects to use as base layer |

<a name="OpenLayerView+updateMarker"></a>

### openLayerView.updateMarker(styler)
Updates the marker associated to the styler.

**Kind**: instance method of [<code>OpenLayerView</code>](#OpenLayerView)  

| Param | Type | Description |
| --- | --- | --- |
| styler | <code>PointMarker</code> | The styler allowing the update of the marker |

<a name="OpenLayerView+updatePolyline"></a>

### openLayerView.updatePolyline(styler)
Updates the polyline associated to the styler.

**Kind**: instance method of [<code>OpenLayerView</code>](#OpenLayerView)  

| Param | Type | Description |
| --- | --- | --- |
| styler | <code>Polyline</code> | The styler allowing the update of the polyline |

<a name="OpenLayerView+getDefaultLayers"></a>

### openLayerView.getDefaultLayers() ⇒ <code>Array</code>
Gets the list of default layers.

**Kind**: instance method of [<code>OpenLayerView</code>](#OpenLayerView)  
<a name="OpenLayerView+addMarker"></a>

### openLayerView.addMarker(properties) ⇒ <code>String</code>
Add a marker to the map.

**Kind**: instance method of [<code>OpenLayerView</code>](#OpenLayerView)  
**Returns**: <code>String</code> - the id of the new created marker  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> |  |
| properties.lon | <code>Number</code> |  |
| properties.lat | <code>Number</code> |  |
| properties.icon | <code>String</code> | path of the icon |
| properties.orientation | <code>Number</code> | orientation in degree |

<a name="OpenLayerView+removeViewItem"></a>

### openLayerView.removeViewItem(viewItem)
Removes a view item from the view.

**Kind**: instance method of [<code>OpenLayerView</code>](#OpenLayerView)  

| Param | Type | Description |
| --- | --- | --- |
| viewItem | <code>Object</code> | The initial view items to add |
| viewItem.name | <code>String</code> | The name of the view item |
| viewItem.styler | <code>Styler</code> | The styler object representing the view item |

<a name="OpenLayerView+addPolyline"></a>

### openLayerView.addPolyline(properties) ⇒ <code>string</code>
Add a polyline to the map.

**Kind**: instance method of [<code>OpenLayerView</code>](#OpenLayerView)  
**Returns**: <code>string</code> - the id of the new created polyline  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> |  |
| properties.locations | <code>Array.&lt;Object&gt;</code> | [{x, y}] |
| properties.color | <code>String</code> |  |
| properties.weight | <code>Number</code> |  |
| properties.name | <code>String</code> |  |

