Technical
===

## EventManager

The EventManager is handled by the [OSH.EventManager](http://opensensorhub.github.io/osh-js/Toolkit/Documentation/OSH.EventManager.html) class.
It is used through the entire Toolkit. For example, the data are sent from the data receiver to the buffer using the callback function, and the
buffer forwards the events after processing them into the EventManager.

There are then many ways to use the OSH.EventManager. As it is used through the entire Toolkit, you can send/receive on events
directly by using the OSH.EventManager class.

Most of the events are defined by `OSH.EventManager.EVENT` :

```javascript
OSH.EventManager.EVENT = {
    DATA : "data",
    SYNC_DATA : "syncData",
    SELECT_VIEW : "selectView",
    CONTEXT_MENU : "contextMenu",
    SHOW_VIEW : "showView",
    CONNECT_DATASOURCE : "connectDataSource",
    DISCONNECT_DATASOURCE : "disconnectDataSource",
    DATASOURCE_UPDATE_TIME: "updateDataSourceTime",
    CURRENT_MASTER_TIME : "currentMasterTime",
    UAV_TAKEOFF : "uav:takeoff",
    UAV_GOTO: "uav:goto",
    UAV_LOOKAT : "uav:lookat",
    UAV_LAND: "uav:land",
    UAV_ORBIT: "uav:orbit",
    LOADING_START: "loading:start",
    LOADING_STOP: "loading:stop",
    ADD_VIEW_ITEM: "addViewItem",
    RESIZE:"resize",
    PTZ_SEND_REQUEST:"ptzSendRequest"
};
```

In some situations, the events are postfixed by an id. For example, in the case of sending data from data receivers,
the data is sent as a JSON object with an event `DATA-<id>`. 
 
### DATA

Once the data received and splitted by the data source, they are sent to the buffer as:

```javascript
dataSource.onData = function (data) {
      this.buffer.push({dataSourceId: dataSource.getId(), data: data});

}.bind(this);
```

We don't use message passing here to not overload Event manager. Then the buffer processes the data and sent them back to EventManager:

```javascript
...
OSH.EventManager.fire(OSH.EventManager.EVENT.DATA+"-"+dataSourceId, {data : data});
...
```
Every data is postfixed with its datasource id. This is to optmize the observation process.

If one is interested in getting the data, it can observe the corresponding data by listening to the EventManager:
```javascript
...
OSH.EventManager.observe(OSH.EventManager.EVENT.DATA + "-" + <datasourceId>, function (event) {
...
}
```

### CURRENT_MASTER_TIME

The `CURRENT_MASTER_TIME` allows to send the current timestamp being processed. This is sent by the buffer after processing (at the same time as the DATA event) and it is observed
by the `OSH.UI.RangeSlider` view to move the slider cursor.

### SELECT_VIEW

The `SELECT_VIEW` event is sent to select a view. It contains a data source id array and an entity id:

```javascript
 OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW,{
    dataSourcesIds: [...],
    entityId: [...],				    
});
```
Every implemented view observes this event and apply the `css selected` style when the data source ids are matching. For example, if you want to select a particular view, 
you have to send this event with the data source ids concerned.

### CONTEXT_MENU

The Toolkit offers the ability to create and display different types of menus. See the [Context menus](architecture/#archi-context-menus). The event
manager provides the `EVENT.CONTEXT_MENU` event to send/receive messages.
The event is postfixed with the `contextMenuId` like:

```javascript
OSH.EventManager.fire(OSH.EventManager.EVENT.CONTEXT_MENU+"-"+<contextMenuId>,{
...
});
```

and it is observed by the corresponding `OSH.ContextMenu` class:

```javascript
OSH.EventManager.observe(OSH.EventManager.EVENT.CONTEXT_MENU+"-"+this.id,function(event) {
...
}
```

The supported actions are:

 * show: show the context menu
 
 * hide: hide the context menu
 
```javascript
OSH.EventManager.fire(OSH.EventManager.EVENT.CONTEXT_MENU+"-"+<contextMenuId>,{
   ...  
   action:"show" // or hide
});
``` 
*note: this part should be improved in a future release*


The viewItem has been designed to have a `contextMenuId` property. See the tutorial for more details about creating a Context menu [Tutorial](/tutos/osh-by-example/#osh-by-example-context-menu)

### CONNECT_DATASOURCE/DISCONNECT_DATASOURCE

The current implementation allows to send Connect/disconnect event to disconnect a current running data source. It works only if your data sources have been attached to a 
`OSH.DataReceiver.DataReceiverController`.

```javascript
OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE, {dataSourcesId: <dataSourceId to connect>});
```
```javascript
OSH.EventManager.fire(OSH.EventManager.EVENT.DISCONNECT_DATASOURCE, {dataSourcesId: <dataSourceId to disconnect>});
```

### CURRENT_MASTER_TIME

This event is internally used to send event from the buffer to any component wanting get the current synchronized time. This is currenlty used by the 
`OSH.UI.RangeSlider` view.

### ADD_VIEW_ITEM

There are two ways to add a view item to your view:

 * as an array argument when you instantiate your class (See tutorials to have working examples)
 
 * send an event through the EventManager
 
 Adding a view item using the EventManager is quite simple and can be summarized as follows:
 
```javascript
...
OSH.EventManager.fire(OSH.EventManager.EVENT.ADD_VIEW_ITEM,{viewItem:viewItem,viewId:viewId});
...
```

You have to pass as a property of your freshly created viewItem and the viewId of the target view.

If you have created a new view, the abstract `OSH.UI.View` already observe this event.

### PTZ_SEND_REQUEST

This event allows one to send PTZ request to the `OSH.DataSender.DataSink` through the Event Manager. 
The generic `OSH.UI.PtzTaskingView` already fire this event. If you want to use your own view:

```javascript
 OSH.EventManager.fire(OSH.EventManager.EVENT.PTZ_SEND_REQUEST+"-"+<data sender id>,{
    cmdData : {rpan:<rpan>,rtilt:<rtitl>,rzoom:<rzoom>,preset:<preset>},
    onSuccess:function(event){console.log("Failed to send request: "+event);},
    onError:function(event){console.log("Request sent successfully: "+event);}
});
```
This is a fast way to communicate between your tasking view and the HttpConnector without taking into consideration internal processes.

## DataReceiver

In theory we have to create a different data receiver for every different streams we can use. OSH provides some generic re-usable data receiver which can be used with your existing data.

### DataReceiver JSON

Most of the time, one can use the Generic DataReceiver described above to support text-encoded data streams. In cases where the data is not textual (such as binary, audio etc..), one may need to create a custom data receiver. The way to do this is described below.

The [OSH.DataReceiver. JSON](http://opensensorhub.github.io/osh-js/Toolkit/Documentation/jsdoc/OSH.DataReceiver.JSON.html) is a generic JSON datareceiver to parse JSON response. It connects to a JSON stream and 
parses the *"data"* and *"time"* properties.

For example, for the following GetResult request:

```html
http://sensiasoft.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetResult&offering=urn:mysos:offering03&observedProperty=http://sensorml.com/ont/swe/property/Weather&temporalFilter=phenomenonTime,now&responseFormat=application/json
```

*Note: the request contains "&responseFormat=application/json" to get a json response*

the response would be:
```json
[
  {"time": "2017-05-23T08:37:30.893Z", "temperature": 22.919639646486733, "pressure": 1012.3488597792292, "windSpeed": 2.4516089709735143, "windDirection": 318.18582382006787}
]
```

As described in the architecture part, the data receiver has to parse the time and the data. 

The JSON one will also take the "time" property and create a new object containing the others fields *temperature*, *pressure*, *windSpeed*, *windDirection*.
The result after parsing is then:

```json
{
  "timeStamp": "2017-05-23T08:37:30.893Z",
  "data": {
    "temperature" : 22.919639646486733,
    "pressure": 1012.3488597792292, 
    "windSpeed": 2.4516089709735143, 
    "windDirection": 318.18582382006787
  }
}
```

The timeStamp property is then used to synchronize the data and the data part contains all the data values.

## Requests

### SOS (--x2js third party library)

The Toolkit provides tools to get information about your OSH server:

 * GetCapabilities
 
 * GetResultTemplate
 
 * GetFeatureOfInterest
 
 * describeSensor
 
In order to achieve the call, it will make request using HttpAjaxConnector and use `x2js` to parse XML response into JSON object.
A wrapper class class has been implemented to simplify some part of the process:

First, instantiate the wrapper class:

```javascript
var server = new OSH.Server({
    url:"<endpoint url>",
    sos: "sos", // change this if different
    sps: "sps", // change this if different
    baseUrl: "sensorhub" // change this if different
});
```

Then make the appropriate calls:

```javascript
// GetCapabilities
server.getCapabilities(function(jsonResp){
    // do something
},function(error) {
    // do something
});
```

```javascript
// GetFeatureOfInterest
server.getFeatureOfInterest(function(jsonResp){
    // do something
},function(error) {
    // do something
});
```

```javascript
// getResultTemplate
server.getResultTemplate(<offering>,<observedProperty>,function(jsonResp){
    // do something
},function(error) {
    // do something
});
```

```javascript
// describeSensor
server.getDescribeSensor(<procedure>,function(jsonResp){
    // do something
},function(error) {
    // do something
});
```

A working example can be found at [Server test](https://github.com/opensensorhub/osh-js/tree/master/Toolkit/tests/server)

### SPS 

You can either get stream from SOS service or make request to SPS service. An abstract class can be inherited. It handles a part of the logic such as
the http connector, send the request to the connector etc..
Some implementation are available:

 * [OSH.DataSender.PtzTasking](http://opensensorhub.github.io/osh-js/Toolkit/Documentation/OSH.DataSender.PtzTasking.html): generic ptz tasking using rpan,rtilt,rzoom command
 
 * `OSH.FoscamPtzTasking`: send ptz request to Foscam camera
 
 * [OSH.DataSender.UavMapTasking](http://opensensorhub.github.io/osh-js/Toolkit/Documentation/OSH.DataSender.UavMapTasking.html): send command to drone
 
 To task your hardware with PTZ command, you have either to use one the generic above class or create a new one. What you need is to inherit the `OSH.DataSender.DataSink` class 
 and override the `getCommandData`:
 
```javascript
getCommandData: function (values) {...}
```

The [OSH.UI.PtzTaskingView](http://opensensorhub.github.io/osh-js/Toolkit/Documentation/OSH.UI.PtzTaskingView.html) is a generic view allowing to task any kind of component.
It offers a control panel sending events observed by the `OSH.DataSender.PtzTasking`.
The `onChange` function of the PtzTaskingView can be overrided by another view to add more control on the command sent:

```javascript
onChange: function(rpan, rtilt, rzoom,preset) {
    OSH.EventManager.fire(OSH.EventManager.EVENT.PTZ_SEND_REQUEST+"-"+this.dataSenderId,{
        cmdData : {rpan:rpan,rtilt:rtilt,rzoom:rzoom,preset:preset},
        onSuccess:function(event){console.log("Failed to send request: "+event);},
        onError:function(event){console.log("Request sent successfully: "+event);}
    });
}
```
The rpan, rtilt, rzoom and preset arguments are taking values from the click event. This should stay generic as much as possible and you should modify only the DataSink.
The `OSH.DataSender.PtzTasking` offers generic rtitl, rpan, rzoom and preset parameters. But in some cases, your camera driver will not match to these values, you can 
inherit from the `OSH.DataSender.PtzTasking` and override the getCommandData to handle and return the needed values to the abstract DataSink class.

You can take a look at the `OSH.DataSender.FoscamPtzTasking` source code to get a full working example since the Foscam OSH driver is waiting for "Bottom, Top,Right, Left" 
values instead of relative rpan/rzoom/rtilt values.

## Dialog

The dialog window is an useful tool to display your view into floating dialog. The toolkit provides a simple and nice way to create/interact with your dialog:

```javascript
var someDialog    = new OSH.UI.DialogView(<dialog layout div id>,{
    css: <your css dialog>,
    name: "DialogName",
    show:false, // default show the dialog
    draggable:true, // is the dialog is draggable?
    dockable: false, // is the dialog is draggable?
    closeable: true // is the dialog is closeable?,
    connectionIds : dataSources // the array of attached data source
    swapId: <div id of the swap window>
});
```

* &lt;dialog layout div id&gt;: the div where the dialog will be attached. 

* css: the dialog has a default style which can be overrided, this css will be added to the existing dialog css

* show: you can show/hide the dialog

* draggable: you would want to fix the dialog position
 
* dockable: the dialog can be set to div, and can be move inside this div. If you undock the dialog, it will be attached directly to the document.body and not 
in the div anymore

* closeable: display a button to close the dialog

* connectionIds: since you can display a disconnect/connect button at the top of the dialog, this array is the link between the button and the data source concerned.
When you click onto the disconnect button, the list of data source contains in this array will be disconnected (using DISCONNECT event of the Event Manager)

* swapId: you can swap the content of the dialog with another div (body for example)

To set a view into a dialog, you can specify the div id of the dialog as argument div view Id such as:

```javascript
var someDialog    = new OSH.UI.DialogView(<dialog layout div id>,{
    css: <your css dialog>,
    name: "DialogName",
    show:false, // default show the dialog
    draggable:true, // is the dialog is draggable?
    dockable: false, // is the dialog is draggable?
    closeable: true // is the dialog is closeable?,
    connectionIds : dataSources // the array of attached data source
    swapId: <div id of the swap window>
});

var someView = new OSH.UI.SomeView(someDialog.popContentDiv.id, [{...}],{...});
```

Thus the view will be automatically attached to the popContentDiv which is the dialog content. The best way to do that is to use the `attachTo()` function:

```javascript
var someDialog    = new OSH.UI.DialogView(<dialog layout div id>,{
    css: <your css dialog>,
    name: "DialogName",
    show:false, // default show the dialog
    draggable:true, // is the dialog is draggable?
    dockable: false, // is the dialog is draggable?
    closeable: true // is the dialog is closeable?,
    connectionIds : dataSources // the array of attached data source
    swapId: <div id of the swap window>
});

var someView = new OSH.UI.SomeView("", [{...}],{...}); // it's important here to let the div id empty !!!
someView.attachTo(someDialog.popContentDiv.id);
```

This will automatically set the view into the dialog. Note that it is very important in that case to let the view divId empty because we don't want to attach it to something.

## Workers

The workers are pushed into a default location while they are compiled using Gulp. The default location is "js/workers".

This location can be overriden using the `window.OSH.BASE_WORKER_URL` variable:

```javascript
window.OSH.BASE_WORKER_URL = "a/b/c/d/workers";
```

Thus you have to put the workers files into the `a/b/c/d/workers` directories.

### MultiDialogView

The multi dialog view is an extension of the Dialog view. It allows one to append div to an existing dialog:

```javascript
var multiDialog    =  new OSH.UI.MultiDialogView("<some container>", {
            draggable: true,
            css: "dialog-multidialog",
            name: "Multi dialog",
            show:true,
            dockable: false,
            closeable: false,
            connectionIds : [...]
});

var someView = new OSH.UI.SomeView("", [{...}],{...}); // it's important here to let the div id empty !!!
var someView2 = new OSH.UI.SomeView("", [{...}],{...}); // it's important here to let the div id empty !!!
var someView3 = new OSH.UI.SomeView("", [{...}],{...}); // it's important here to let the div id empty !!!

// attach the div view to the dialog
someView.attachTo(multiDialog.popContentDiv.id);

multiDialog.appendView(someView2.divId);
multiDialog.appendView(someView3.divId);
...
```

The someView 2 & 3 will be appended to the dialog. See the [Multi dialog + tasking example](http://opensensorhub.github.io/osh-js/Showcase/) of the Showcase

## Cesium (--cesium third party library)

As we have seen, one can directly built Cesium in osh vendor using Gulp. One specific one has to take care is the Cesium global property:

```javascript
window.CESIUM_BASE_URL = 'vendor/';
```

Since Cesium will try to load by default the Cesium library from the *js* folder, if this one is located into another folder, you have to specify the *CESIUM_BASE_URL* to get it work. 

## FFMPEG (--ffmpeg third party library)

The FFMPEG library is a pure native Javascript library. It is used decode video frame in native javascript code.
 
*"The original ffmpeg.js project provides FFmpeg builds ported to JavaScript using Emscripten project. Builds are optimized for in-browser use: minimal size for faster loading, asm.js, performance tunings, etc. Though they work in Node as well."*

[Source](https://github.com/sensiasoft/ffmpeg.js)

By using this library, one can decode H264 video frame in the browser without using any additional plugins.
A wrapper has been implemented within the Toolkit and provides some useful functionnalities such as:

- Define canvas size
- use webworker
- increase performance by using transferable objects

One can use the [OSH.UI.FFMPEGView](http://opensensorhub.github.io/osh-js/Toolkit/Documentation/jsdoc/OSH.UI.FFMPEGView.html) and build the library using --ffmpeg argument to Gulp such as:

```bash
$ gulp build --ffmpeg
```

There are the default options of the View:

``` 
dataSourceId: videoDataSource.id,
css: "<your css>",
cssSelected: "<you css after selecting the view>",
name: "<view name>",
useWorker:<true|false>,
useWebWorkerTransferableData: <true|false> // this is because you can speed up the data transfert between main script and web worker
                                            by using transferable data. Note that can cause problems if you data is attempted to use anywhere else.
                                            See the not below for more details(*).
```

One can use the WebWorker which increases performance significantly since the decoding part is executed into a separated thread. It is very useful if several FFmpeg View are declared at the same time.

Another tip is to use the *useWebWorkerTransferableData* which allows to use transferable object directly between the main thread and the WebWorker.

This property can cause trouble if you share the same data into different view because the pointer is transferred to the webworker and becomes then unavailable in the main thread.

Without transferable object:

Data --> VIEW (data copied into)--> WebWorker

With transferable object:

Data --> VIEW (pointer transferred to)--> WebWorker

Not to copy the data increases the performance since transfert is much more faster.

If the data is only associated to one view, you should enable this parameter.


__External resources:__ 

- [https://developer.mozilla.org/en-US/docs/Web/API/Transferable](https://developer.mozilla.org/en-US/docs/Web/API/Transferable)
- [https://developer.mozilla.org/en/docs/Web/API/Worker/postMessage](https://developer.mozilla.org/en/docs/Web/API/Worker/postMessage)

If the webworker property is enabled, the view will also spawn a WebWorker. Since the WebWorker has to load the FFmpeg.js library separately, the worker library is placed in the *workers*
folder built by the *Gulp build* command such as:

```bash
... 

├── js
│   ├── osh.js
│   └── workers
│       ├── ffmpeg-h264.js
│       └── osh-UI-FFMPEGViewWorker.js

...       
```
Using the WebWorker is meaning you have to keep this structure to get it work. The *workers* folder has to be right next to the *osh.js* file. The worker and the library are located at the same place.
The worker is loaded from the view as:

```javascript
js/workers/osh-UI-FFMPEGViewWorker.js
```