---
title: ChartJsView
---

# ChartJsView

<a name="ChartJsView"></a>

## ChartJsView ⇐ <code>View</code>
**Kind**: global class  
**Extends**: <code>View</code>  

* [ChartJsView](#ChartJsView) ⇐ <code>View</code>
    * [new ChartJsView(parentElementDivId, viewItems, options)](#new_ChartJsView_new)
    * [.updateCurve(styler, values, options)](#ChartJsView+updateCurve)

<a name="new_ChartJsView_new"></a>

### new ChartJsView(parentElementDivId, viewItems, options)
Create a View.


| Param | Type | Description |
| --- | --- | --- |
| parentElementDivId | <code>String</code> | The div element to attach to |
| viewItems | <code>Array.&lt;Object&gt;</code> | The initial view items to add |
| viewItems.name | <code>String</code> | The name of the view item |
| viewItems.styler | <code>Styler</code> | The styler object representing the view item |
| options | <code>Object</code> | the properties of the view |
| options.datasetsOpts | <code>Object</code> | chart.js dataset options |
| options.gridLinesOpts | <code>Object</code> | chart.js gridline options |
| options.scaleLabelOpts | <code>Object</code> | chart.js scaleLabel options |
| options.tickOpts | <code>Object</code> | chart.js tick options |
| options.legendOpts | <code>Object</code> | chart.js legend options |
| options.maxPoints | <code>Number</code> | max points to display before shifting |

<a name="ChartJsView+updateCurve"></a>

### chartJsView.updateCurve(styler, values, options)
**Kind**: instance method of [<code>ChartJsView</code>](#ChartJsView)  

| Param | Type | Description |
| --- | --- | --- |
| styler | <code>Curve</code> | - |
| values | <code>Array</code> | The values values to set. Each value is composed of raw data and timeStamp |
| options | <code>Object</code> | - |

