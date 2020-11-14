---
title: LeafletView
---

# LeafletView

<a name="LeafletView"></a>

## LeafletView ⇐ <code>View</code>
This class is in charge of displaying GPS/orientation data by adding a marker to the Leaflet Map object.

**Kind**: global class  
**Extends**: <code>View</code>  

* [LeafletView](#LeafletView) ⇐ <code>View</code>
    * [new LeafletView(parentElementDivId, viewItems, options)](#new_LeafletView_new)
    * [.getDefaultLayers()](#LeafletView+getDefaultLayers) ⇒ <code>Array</code>
    * [.addMarker(properties)](#LeafletView+addMarker) ⇒ <code>string</code>
    * [.addPolyline(properties)](#LeafletView+addPolyline) ⇒ <code>string</code>
    * [.updateMarker(styler)](#LeafletView+updateMarker)
    * [.updatePolyline(styler)](#LeafletView+updatePolyline)

<a name="new_LeafletView_new"></a>

### new LeafletView(parentElementDivId, viewItems, options)
Create a View.


| Param | Type | Description |
| --- | --- | --- |
| parentElementDivId | <code>String</code> | The div element to attach to |
| viewItems | <code>Array.&lt;Object&gt;</code> | The initial view items to add |
| viewItems.name | <code>String</code> | The name of the view item |
| viewItems.styler | <code>Styler</code> | The styler object representing the view item |
| options | <code>Object</code> | the properties of the view |
| options.autoZoomOnFirstMarker | <code>Boolean</code> | auto zoom on the first added marker |
| options.follow | <code>Boolean</code> | follow the marker |
| options.initialView | <code>Object</code> | {lon:.., lat:..} |
| options.overlayLayers | <code>Array.&lt;Object&gt;</code> | OpenLayers objects to use as overlay layer |
| options.baseLayers | <code>Array.&lt;Object&gt;</code> | OpenLayers objects to use as base layer |

**Example**  
```js
import LeafletView from 'osh/ui/view/map/LeafletView.js';

 let leafletMapView = new LeafletView("",
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
<a name="LeafletView+getDefaultLayers"></a>

### leafletView.getDefaultLayers() ⇒ <code>Array</code>
Gets the list of default layers.

**Kind**: instance method of [<code>LeafletView</code>](#LeafletView)  
<a name="LeafletView+addMarker"></a>

### leafletView.addMarker(properties) ⇒ <code>string</code>
Add a marker to the map.

**Kind**: instance method of [<code>LeafletView</code>](#LeafletView)  
**Returns**: <code>string</code> - the id of the new created marker  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> |  |
| properties.lon | <code>Number</code> |  |
| properties.lat | <code>Number</code> |  |
| properties.icon | <code>String</code> | the icon path |
| properties.iconAnchor | <code>Array.&lt;Integer&gt;</code> | offset of the icon ex:[10,10] |
| properties.label | <code>String</code> | label of the tooltip |
| properties.description | <code>String</code> | description of the marker to display into the tooltip |
| properties.labelOffset | <code>String</code> | offset of the label of the tooltip |
| properties.orientation | <code>Number</code> | orientation of the icon in degree |

<a name="LeafletView+addPolyline"></a>

### leafletView.addPolyline(properties) ⇒ <code>string</code>
Add a polyline to the map.

**Kind**: instance method of [<code>LeafletView</code>](#LeafletView)  
**Returns**: <code>string</code> - the id of the new created polyline  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> |  |
| properties.locations | <code>Array.&lt;Object&gt;</code> | [{x, y}] |
| properties.color | <code>String</code> |  |
| properties.weight | <code>Number</code> |  |
| properties.opacity | <code>Number</code> | * @param {Number} properties.smoothFactor |

<a name="LeafletView+updateMarker"></a>

### leafletView.updateMarker(styler)
Updates the marker associated to the styler.

**Kind**: instance method of [<code>LeafletView</code>](#LeafletView)  

| Param | Type | Description |
| --- | --- | --- |
| styler | <code>PointMarker</code> | The styler allowing the update of the marker |

<a name="LeafletView+updatePolyline"></a>

### leafletView.updatePolyline(styler)
Updates the polyline associated to the styler.

**Kind**: instance method of [<code>LeafletView</code>](#LeafletView)  

| Param | Type | Description |
| --- | --- | --- |
| styler | <code>Polyline</code> | The styler allowing the update of the polyline |

