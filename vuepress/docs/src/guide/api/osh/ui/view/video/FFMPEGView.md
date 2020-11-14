---
title: FFMPEGView
---

# FFMPEGView

<a name="FFMPEGView"></a>

## FFMPEGView ⇐ <code>View</code>
This class is in charge of displaying H264 data by decoding ffmpeg.js library and displaying into them a YUV canvas.

**Kind**: global class  
**Extends**: <code>View</code>  

* [FFMPEGView](#FFMPEGView) ⇐ <code>View</code>
    * [new FFMPEGView(divId, options)](#new_FFMPEGView_new)
    * [.reset()](#FFMPEGView+reset)
    * ["onAfterDecoded"](#FFMPEGView+event_onAfterDecoded)

<a name="new_FFMPEGView_new"></a>

### new FFMPEGView(divId, options)
Create a View.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| divId | <code>String</code> |  | The div element to attach to |
| options | <code>Object</code> |  | the properties of the view |
| [options.framerate] | <code>Number</code> | <code>29.67</code> | The framerate to play 1s/framerate and get smooth display |
| [options.directPlay] | <code>Boolean</code> | <code>false</code> | Enable or ignore the framerate play |
| [options.showTime] | <code>Boolean</code> | <code>false</code> | Enable or ignore the show timestamp text onto the canvas |
| [options.showStats] | <code>Boolean</code> | <code>false</code> | Enable or ignore the display stats (FPS number) onto the canvas |
| [options.codec] | <code>String</code> | <code>&#x27;h264&#x27;</code> | Video codec |

**Example**  
```js
import FFMPEGView from 'osh/ui/view/video/FFMPEGView.js';

 let videoView = new FFMPEGView("videoContainer-id", {
    dataSourceId: videoDataSource.id,
    css: "video",
    cssSelected: "video-selected",
    name: "Video",
    framerate: 25,
    directPlay: false
});
```
<a name="FFMPEGView+reset"></a>

### ffmpegView.reset()
Reset the view by drawing no data array into the YUV canvas.

**Kind**: instance method of [<code>FFMPEGView</code>](#FFMPEGView)  
<a name="FFMPEGView+event_onAfterDecoded"></a>

### "onAfterDecoded"
Called after each decoded frame.

**Kind**: event emitted by [<code>FFMPEGView</code>](#FFMPEGView)  
