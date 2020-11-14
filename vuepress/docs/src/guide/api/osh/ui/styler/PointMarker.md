---
title: PointMarker
---

# PointMarker

<a name="PointMarker"></a>

## PointMarker ⇐ <code>Styler</code>
**Kind**: global class  
**Extends**: <code>Styler</code>  
<a name="new_PointMarker_new"></a>

### new PointMarker(properties)
Create the PointMarker


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| properties | <code>Object</code> |  |  |
| properties.location | <code>Array.&lt;Number&gt;</code> |  | [x,y,z] |
| [properties.orientation] | <code>Number</code> | <code>0</code> | - |
| properties.icon | <code>String</code> |  | - |
| [properties.iconAnchor] | <code>Array.&lt;Number&gt;</code> | <code>[16,16]</code> | - |
| [properties.iconSize] | <code>Array.&lt;Number&gt;</code> | <code>[16,16]</code> | - |
| properties.label | <code>String</code> |  | - |
| [properties.labelColor] | <code>String</code> | <code>&quot;#000000&quot;</code> | HTML color |
| [properties.labelSize] | <code>Number</code> | <code>16</code> | - |
| [properties.labelOffset] | <code>Array.&lt;Number&gt;</code> | <code>[0,0]</code> | - |
| properties.locationFunc | <code>function</code> |  | - |
| properties.orientationFunc | <code>function</code> |  | - |
| properties.iconFunc | <code>function</code> |  | - |
| properties.labelFunc | <code>function</code> |  | - |
| properties.labelColorFunc | <code>function</code> |  | - |
| properties.labelSizeFunc | <code>function</code> |  | - |
| [properties.zoomLevel] | <code>Number</code> | <code>15</code> | - |

**Example**  
```js
import PointMarker from 'osh/ui/styler/PointMarker.js';

let pointMarker = new PointMarker({
        location : {
            x : 1.42376557,
            y : 43.61758626,
            z : 100
        },
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
        orientationFunc : {
            dataSourceIds : [androidPhoneOrientationDataSource.getId()],
            handler : function(rec) {
                return {
                    heading : rec.heading
                };
            }
        },
        icon : 'images/cameralook.png',
        iconFunc : {
            dataSourceIds: [androidPhoneGpsDataSource.getId()],
            handler : function(rec,timeStamp,options) {
                if(options.selected) {
                    return 'images/cameralook-selected.png'
                } else {
                    return 'images/cameralook.png';
                };
            }
        }
    });
```
