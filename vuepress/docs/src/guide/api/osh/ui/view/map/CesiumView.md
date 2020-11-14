---
title: CesiumView
---

# CesiumView

<a name="CesiumView"></a>

## CesiumView ⇐ <code>View</code>
This class is in charge of displaying GPS/orientation data by adding a marker to the Cesium object.

**Kind**: global class  
**Extends**: <code>View</code>  

* [CesiumView](#CesiumView) ⇐ <code>View</code>
    * [new CesiumView(parentElementDivId, viewItems, options)](#new_CesiumView_new)
    * [.updateMarker(styler, options, timeStamp)](#CesiumView+updateMarker)
    * [.updateDrapedImage(styler)](#CesiumView+updateDrapedImage)
    * [.removeViewItem(viewItem)](#CesiumView+removeViewItem)
    * [.addMarker(properties)](#CesiumView+addMarker) ⇒ <code>string</code>
    * [.updateMapMarker(id, properties)](#CesiumView+updateMapMarker)
    * [.addImageryProvider(type, url, layers, imageFormat, options)](#CesiumView+addImageryProvider) ⇒ <code>\*</code>

<a name="new_CesiumView_new"></a>

### new CesiumView(parentElementDivId, viewItems, options)
Create a View.


| Param | Type | Description |
| --- | --- | --- |
| parentElementDivId | <code>String</code> | The div element to attach to |
| viewItems | <code>Array.&lt;Object&gt;</code> | The initial view items to add |
| viewItems.name | <code>String</code> | The name of the view item |
| viewItems.styler | <code>Styler</code> | The styler object representing the view item |
| options | <code>Object</code> | the properties of the view |

**Example**  
```js
import CesiumView from 'osh/ui/view/map/CesiumView.js';

 let cesiumMapView = new CesiumView("",
 [{
	styler :  pointMarker,
	name : "Android Phone GPS",
	entityId : androidEntity.id
 },
 {
    styler : new Polyline({
        locationFunc : {
            dataSourceIds : [androidPhoneGpsDataSource.getId()],
            handler : function(rec) {
                return {
                    x : rec.lon,
                    y : rec.lat,
                    z : rec.alt
                };
            }
        },
        color : 'rgba(0,0,255,0.5)',
        weight : 10,
        opacity : .5,
        smoothFactor : 1,
        maxPoints : 200
    }),
    name : "Android Phone GPS Path",
    entityId : androidEntity.id
 }]
 );
```
<a name="CesiumView+updateMarker"></a>

### cesiumView.updateMarker(styler, options, timeStamp)
Updates the marker associated to the styler.

**Kind**: instance method of [<code>CesiumView</code>](#CesiumView)  

| Param | Type | Description |
| --- | --- | --- |
| styler | <code>Styler</code> | The styler allowing the update of the marker |
| options | <code>Object</code> | - |
| options.location | <code>Object</code> | - |
| options.location.x | <code>Number</code> | - |
| options.location.y | <code>Number</code> | - |
| options.location.z | <code>Number</code> | - |
| options.orientation | <code>Number</code> | - |
| options.icon | <code>String</code> | - |
| options.iconAnchor | <code>Array.&lt;Number&gt;</code> | [OffsetX, OffsetY] ex: [10,10] |
| options.label | <code>String</code> | - |
| options.labelColor | <code>String</code> | - |
| options.labelOffset | <code>Number</code> | - |
| options.selected | <code>Boolean</code> | - |
| timeStamp | <code>Number</code> | - |

<a name="CesiumView+updateDrapedImage"></a>

### cesiumView.updateDrapedImage(styler)
Updates the marker associated to the styler.

**Kind**: instance method of [<code>CesiumView</code>](#CesiumView)  

| Param | Type | Description |
| --- | --- | --- |
| styler | <code>ImageDraping</code> | The styler allowing the update of the marker |

<a name="CesiumView+removeViewItem"></a>

### cesiumView.removeViewItem(viewItem)
Removes a view item from the view.

**Kind**: instance method of [<code>CesiumView</code>](#CesiumView)  

| Param | Type | Description |
| --- | --- | --- |
| viewItem | <code>Object</code> | The initial view items to add |
| viewItem.name | <code>String</code> | The name of the view item |
| viewItem.styler | <code>Styler</code> | The styler object representing the view item |

<a name="CesiumView+addMarker"></a>

### cesiumView.addMarker(properties) ⇒ <code>string</code>
Add a marker to the map.

**Kind**: instance method of [<code>CesiumView</code>](#CesiumView)  
**Returns**: <code>string</code> - the id of the new created marker  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> |  |
| properties.lon | <code>Number</code> |  |
| properties.lat | <code>Number</code> |  |
| properties.icon | <code>String</code> | the icon path |
| properties.label | <code>String</code> | label of the tooltip |
| properties.description | <code>String</code> | description of the marker to display into the tooltip |
| properties.orientation.heading | <code>Object</code> | orientation of the icon in degree |

<a name="CesiumView+updateMapMarker"></a>

### cesiumView.updateMapMarker(id, properties)
Updates the marker associated to the styler.

**Kind**: instance method of [<code>CesiumView</code>](#CesiumView)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The styler allowing the update of the marker |
| properties | <code>Object</code> | - |
| properties.lon | <code>Object</code> | - |
| properties.lat | <code>Object</code> | - |
| properties.alt | <code>Object</code> | - |
| properties.orientation | <code>Object</code> | - |
| properties.icon | <code>Object</code> | - |
| properties.defaultToTerrainElevation | <code>Object</code> | - |
| properties.selected | <code>Object</code> | - |

<a name="CesiumView+addImageryProvider"></a>

### cesiumView.addImageryProvider(type, url, layers, imageFormat, options) ⇒ <code>\*</code>
**Kind**: instance method of [<code>CesiumView</code>](#CesiumView)  

| Param |
| --- |
| type | 
| url | 
| layers | 
| imageFormat | 
| options | 

