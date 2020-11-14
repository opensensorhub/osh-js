---
title: RangeSliderView
---

# RangeSliderView

<a name="RangeSliderView"></a>

## RangeSliderView ⇐ <code>View</code>
**Kind**: global class  
**Extends**: <code>View</code>  

* [RangeSliderView](#RangeSliderView) ⇐ <code>View</code>
    * [new RangeSliderView(parentElementDivId, options)](#new_RangeSliderView_new)
    * [.deactivate()](#RangeSliderView+deactivate)
    * [.activate()](#RangeSliderView+activate)

<a name="new_RangeSliderView_new"></a>

### new RangeSliderView(parentElementDivId, options)
Create the discoveryView


| Param | Type | Description |
| --- | --- | --- |
| parentElementDivId | <code>string</code> | The div element to attach to |
| options | <code>Object</code> | The properties defining the view |
| options.startTime | <code>Number</code> | The start time |
| options.endTime | <code>Number</code> | The end time |
| options.dataSourcesId | <code>String</code> | The dataSource id which are sync with master time |
| options.dataSourceId | <code>String</code> | The dataSource id which is not sync with master time |
| options.disabled | <code>Boolean</code> | disabled the range slider |
| options.dataSynchronizer | <code>Object</code> | a data synchronizer to get current data time for this set of datasources |

**Example**  
```js
import RangeSliderView from 'osh-ext/view/RangeSliderView.js';

let rangeSlider = new RangeSliderView("rangeSlider",{
    dataSourceId: dataSource.id,
    startTime: "2015-12-19T21:04:30Z",
    endTime: "2015-12-19T21:09:19Z"
});
```
<a name="RangeSliderView+deactivate"></a>

### rangeSliderView.deactivate()
Deactivate the timeline bar

**Kind**: instance method of [<code>RangeSliderView</code>](#RangeSliderView)  
<a name="RangeSliderView+activate"></a>

### rangeSliderView.activate()
Activate the timeline nar

**Kind**: instance method of [<code>RangeSliderView</code>](#RangeSliderView)  
