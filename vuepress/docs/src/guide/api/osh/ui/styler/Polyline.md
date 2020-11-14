---
title: Polyline
---

# Polyline

<a name="Polyline"></a>

## Polyline ⇐ <code>Styler</code>
**Kind**: global class  
**Extends**: <code>Styler</code>  
<a name="new_Polyline_new"></a>

### new Polyline(properties)
Creates the Polyline


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| properties | <code>Object</code> |  |  |
| properties.locations | <code>Array.&lt;Object&gt;</code> |  | [lat, lon] |
| [properties.color] | <code>String</code> | <code>&#x27;red&#x27;</code> |  |
| [properties.weight] | <code>Number</code> | <code>1</code> |  |
| [properties.opacity] | <code>Number</code> | <code>1</code> |  |
| [properties.smoothFactor] | <code>Number</code> | <code>1</code> |  |
| [properties.maxPoints] | <code>Number</code> | <code>10</code> |  |
| properties.locationFunc | <code>function</code> |  | - |
| properties.colorFunc | <code>function</code> |  | - |
| properties.weightFunc | <code>function</code> |  | - |
| properties.opacityFunc | <code>function</code> |  | - |
| properties.smoothFactorFunc | <code>function</code> |  | - |

**Example**  
```js
import Polyline from 'osh/ui/styler/Polyline.js';

let polylineStyler = new Polyline({
		locationFunc : {
			dataSourceIds : [datasource.getId()],
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
	});
```
