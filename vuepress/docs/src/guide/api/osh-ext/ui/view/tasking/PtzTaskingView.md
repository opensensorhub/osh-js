---
title: PtzTaskingView
---

# PtzTaskingView

<a name="PtzTaskingView"></a>

## PtzTaskingView ⇐ <code>View</code>
This class is in charge of creating the Ptz tasking View.

**Kind**: global class  
**Extends**: <code>View</code>  

* [PtzTaskingView](#PtzTaskingView) ⇐ <code>View</code>
    * [new PtzTaskingView(divId, options)](#new_PtzTaskingView_new)
    * ["onSelectedPresets" (event)](#PtzTaskingView+event_onSelectedPresets)
    * ["onChange" (rpan, rtilt, rzoom)](#PtzTaskingView+event_onChange)

<a name="new_PtzTaskingView_new"></a>

### new PtzTaskingView(divId, options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| divId | <code>String</code> |  | - |
| options | <code>Object</code> |  | - |
| [options.width] | <code>String</code> | <code>&quot;640&quot;</code> | - |
| [options.height] | <code>String</code> | <code>&quot;480&quot;</code> | - |
| [options.css] | <code>String</code> | <code>&#x27;tasking&#x27;</code> | - |
| options.cssSelected | <code>String</code> |  | the css to apply when selected |
| options.dataSenderId | <code>String</code> |  | - |

<a name="PtzTaskingView+event_onSelectedPresets"></a>

### "onSelectedPresets" (event)
**Kind**: event emitted by [<code>PtzTaskingView</code>](#PtzTaskingView)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | HTML event |

<a name="PtzTaskingView+event_onChange"></a>

### "onChange" (rpan, rtilt, rzoom)
Event caught after clicking onto control buttons.

**Kind**: event emitted by [<code>PtzTaskingView</code>](#PtzTaskingView)  

| Param | Type | Description |
| --- | --- | --- |
| rpan | <code>Number</code> | - |
| rtilt | <code>Number</code> | - |
| rzoom | <code>Number</code> | - |

