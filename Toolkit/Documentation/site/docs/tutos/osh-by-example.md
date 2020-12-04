Create the client "Drone Real-time Video Draping onto Terrain"
===

## 1) Get information reading GetCapabilities
 
The first thing you have to do is to gather all the necessary information about your connection. The OSH server allows
one to get information through SOS, SOS-T etc. 

What we need is:
 
 1) Offering id
 
 2) ObservedProperty
 
 3) The time: can be a time range or real-time. A specific notation is used for real-time data
 
 This [link](http://docs.opensensorhub.org/user/sos/intro/) will provide you more details about SOS.
 
 Let's say the endpoint is `localhost:8181` and the sos server `sensorhub/sos`.
 
 A getCapabitilies request would be
 
 ```
 http://localhost.net:8181/sensorhub/sos?service=SOS&version=2.0&request=GetCapabilities
 ```
 
 The next step is to extract the offeringId corresponding to our sensor:
 
```xml
 <swes:offering>
    <sos:ObservationOffering>
        <swes:description>Archive data from Solo Nav DataStore</swes:description>
        <swes:identifier>urn:osh:solo-nav</swes:identifier>
        <swes:name>Solo Nav DataStore</swes:name>
        <swes:procedure>urn:osh:sensor:mavlink:solo:S115A5800419</swes:procedure>
        <swes:observableProperty>http://www.opengis.net/def/property/OGC/0/PlatformOrientation</swes:observableProperty>
        <swes:observableProperty>http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation</swes:observableProperty>
        <swes:observableProperty>http://www.opengis.net/def/property/OGC/0/PlatformLocation</swes:observableProperty>
        <sos:phenomenonTime>
            <gml:TimePeriod gml:id="T4">
                <gml:beginPosition>2016-08-30T18:58:46.180Z</gml:beginPosition>
                <gml:endPosition>2016-08-30T19:20:17.002Z</gml:endPosition>
            </gml:TimePeriod>
        </sos:phenomenonTime>
        ...
</swes:offering>
 ```
 
and

```xml
<swes:offering>
    <sos:ObservationOffering>
        <swes:description>Archive data from Solo Video DataStore</swes:description>
        <swes:identifier>urn:osh:solo-video</swes:identifier>
        <swes:name>Solo Video DataStore</swes:name>
        <swes:procedure>urn:osh:sensor:rtpcam:solo:S115A5800419</swes:procedure>
        <swes:observableProperty>http://sensorml.com/ont/swe/property/VideoFrame</swes:observableProperty>
        <swes:observableProperty>http://sensorml.com/ont/swe/property/Image</swes:observableProperty>
        <sos:phenomenonTime>
            <gml:TimePeriod gml:id="T5">
                <gml:beginPosition>2016-08-30T18:59:03.009Z</gml:beginPosition>
                <gml:endPosition>2016-08-30T19:20:16.402Z</gml:endPosition>
            </gml:TimePeriod>
        </sos:phenomenonTime>
        ...
</swes:offering>
```

Then the relevant information is:

 * OfferingId: `urn:osh:solo-nav`

 * ObservedProperty:
    
    * `http://www.opengis.net/def/property/OGC/0/PlatformOrientation`
    
    * `http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation`
    
    * `http://www.opengis.net/def/property/OGC/0/PlatformLocation`
    
 * Time range: from `2016-08-30T18:58:46.180Z` to `2016-08-30T19:20:17.002Z`
 
 For the second sensor:
 
 * OfferingId: `urn:osh:solo-video`
 
 * ObservedProperty:
    
    * `http://sensorml.com/ont/swe/property/VideoFrame`
    
    * `http://sensorml.com/ont/swe/property/Image`
    
 * Time range: from `2016-08-30T18:59:03.009Z` to `2016-08-30T19:20:16.402Z`
 
 
## 2) Use the right Javascript mappers
 
Once you have got the information, you have to use the Toolkit to build your client.
You have to choose the corresponding data receivers and the corresponding views:

### DataReceivers

 * PlatformLocation => LatLon => textual including timestamp => [OSH.DataReceiver.JSON](http://opensensorhub.github.io/osh-js/Toolkit/Documentation/OSH.DataReceiver.JSON.html). The generic
  JSON parser is able to parse any textual data and separate the timestamp from the others

 * GimbalOrientation => EulerOrientation => textual including timestamp => [OSH.DataReceiver.JSON](http://opensensorhub.github.io/osh-js/Toolkit/Documentation/OSH.DataReceiver.JSON.html)

 * Video (H264) => VideoH264 => binary data => [OSH.DataReceiver. VideoH264](http://opensensorhub.github.io/osh-js/Toolkit/Documentation/OSH.DataReceiver.VideoH264.html)
 
### Views
 
 To represent the data, we will choose in this example:
 
 * CesiumView => 3D map 

 * DialogView => encapsulates video + chart viewers

 * RangeSlider => control time

 * Nvd3CurveChartView => Chart

 * FFMPEGView => Display Video using FFMPEG JS

 * EntityTreeView => display entities

 * StackMenu => for Tree


The views are not dependent of the data sources, many views can be used to represent the same data using a data receiver.
Obvioulsy, some views are more appropriate such as the FFmpegView which is only used to display H264 encoded frames.

## 3) Define your HTML layout

We need three containers to render the views:

```html
<body>
 <div id="videoViewDivId" class="mini-view"></div> <!-- Video View -->
 <div id="chartViewDivId" class="mini-view"></div> <!-- Chart View -->
 <div id="cesiumViewId" class="mini-view"></div> <!-- Cesium View -->
</body>
```

## 4) Create your JS code - DataReceivers

```javascript
// DEFINE TIME
var startTime = "2016-08-30T19:00:40Z";
var endTime = "2016-08-30T19:22:00Z";
var replaySpeed = "1";

// LatLon DataReceiver	
var soloGPS = new OSH.DataReceiver.JSON("Solo GPS", {
    protocol : "ws",
    service: "SOS",
    endpointUrl: hostname + "/sensorhub/sos",
    offeringID: "urn:osh:solo-nav",
    observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformLocation",
    startTime: startTime,
    endTime: endTime,
    replaySpeed: replaySpeed,
    syncMasterTime: true // This specify to synchronize the data
});

// Orientation DataReceiver
var soloAttitude = new OSH.DataReceiver.JSON("Solo Attitude", {
    protocol : "ws",
    service: "SOS",
    endpointUrl: hostname + "/sensorhub/sos",
    offeringID: "urn:osh:solo-nav",
    observedProperty: "http://www.opengis.net/def/property/OGC/0/PlatformOrientation",
    startTime: startTime,
    endTime: endTime,
    replaySpeed: replaySpeed,
    syncMasterTime: true
});

// Gimbal orientation DataReceiver
var soloGimbal = new OSH.DataReceiver.JSON("Solo Gimbal", {
    protocol : "ws",
    service: "SOS",
    endpointUrl: hostname + "/sensorhub/sos",
    offeringID: "urn:osh:solo-nav",
    observedProperty: "http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation",
    startTime: startTime,
    endTime: endTime,
    replaySpeed: replaySpeed,
    syncMasterTime: true
});



// Video H264 DataReceiver
var soloVideo = new OSH.DataReceiver.VideoH264("Solo Video", {
    protocol : "ws",
    service: "SOS",
    endpointUrl: hostname + "/sensorhub/sos",
    offeringID: "urn:osh:solo-video",
    observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
    startTime: startTime,
    endTime: endTime,
    replaySpeed: replaySpeed,
    timeShift: -100,
    syncMasterTime: true
});
```

We define here a time range corresponding to the GetCapabilities information. As described above, we instantiate 
three JSON generic data receiver and one binary.

The `syncMasterTime` is an advanced tool provided by the Toolkit which allows to synchronize the data sources between them.
That means for every data received, the timestamp will be checked and ordered to be sure that for a given time `t`, the data 
is synchronized. In the case of the H264 binary data, the timeStamp is extracted from the first bytes of the stream, the raw data is then
extracted by shifting the bytes of the timeStamp length.

The `offering`, `observedProperty` and `endpoint` are the ones extracted from the GetCap request.

### Entity

Another useful tool is the entity. You can associate sensors between them. For example, if you know that 
sensors are from the same hardware, it can be useful to associate one sensor to each other.
The entity is a simple way to do that:

```javascript
//--------------------------------------------------------------//
//-------------------------- Entities --------------------------//
//--------------------------------------------------------------//
var soloEntity = {
    id: "solo1",
    name: "3DR Solo",
    dataSources: [soloGPS, soloAttitude, soloGimbal, soloVideo]
};
```
The data sources are associated together.

### Video view (--ffmpeg third party library)

To display the Video, you can use the FFMpeg view which has been specially created for displaying H264
encoded frames.

```javascript
//--------------------------------------------------------------//
//--------------------------- Views  ---------------------------//
//--------------------------------------------------------------//

    
var soloVideoView = new OSH.UI.FFMPEGView("videoViewDivId", {
    dataSourceId: soloVideo.getId(),
    entityId : soloEntity.id,
    css: "video",
    cssSelected: "video-selected",
    useWorker: true,
    width: 1280,
    height: 720
});
```

The view is then associated to a data source and an entity. It will create a div into the `videoViewDivId`.
The css passed as argument will be used by the inner hidden created div of the view. The `cssSelected` properties
correspond to a css which is applied when you click onto your view. For example, you can decide to highlight the border 
of your div with large width.

This view has a special property `useWorker` which allows multithreading. The frame decoding will be processed 
into a separate thread (using a WebWorker).

### Chart view (--nvd3 third party library)

To display the altitude of the drone, you can use the simple chart view. By default, the toolkit provide a NDV3 view allowing 
to display curve chart:

```javascript
//--------------------------------------------------------------//
//--------------------------- Views  ---------------------------//
//--------------------------------------------------------------//

    
var altChartView = new OSH.UI.Nvd3CurveChartView("chartViewDivId",
[{
    styler: new OSH.UI.Styler.Curve({
        valuesFunc: {
            dataSourceIds: [soloGPS.getId()],
            handler: function (rec, timeStamp) {
            	if (rec.alt < 1)
            	    rec.alt *= 1e4; // *10^4 due to bug in Toulouse dataset
                return {
                    x: timeStamp,
                    y: rec.alt+mslToWgs84
                };
            }
        }
    })
}],
{
    dataSourceId: soloGPS.getId(),
    yLabel: 'Altitude (m)',
    xLabel: 'Time',
    maxPoints: 100,
    css:"chart-view",
    cssSelected: "video-selected"
});
```
In this example, there are two interesting parts:
 
 1) the styler which is used to apply an altitude rectification
 
 2) the graph view properties (provided by the view itself)
 

The styler is fed directly by the OSH.EventManager. It is built from a dataSourceId array. When the
data have processed by the buffer, the `OSH.EventManager` will fire an event. The view will get
this event (if the data source id matches) and forward the data to the styler if it exists.
Then the style acts like a filter, in this example, it is useful to rectify the data before displaying into the chart.

The `valuesFunc` means `for each data..do`. Each styler has a different way to handle data and has a different function 
signature. Check the documentation for more details about them. You can use pre-existed styler or create yours.
([Styler documentation](http://opensensorhub.github.io/osh-js/Toolkit/Documentation/OSH.UI.Styler.html))

### Other stylers

Now you can define point marker styler to style Lat,Lon, Alt textual data:

```javascript
//--------------------------------------------------------------//
//--------------------------- Views  ---------------------------//
//--------------------------------------------------------------//

// common point marker
var pointMarker = new OSH.UI.Styler.PointMarker({
	label: "3DR Solo",
    locationFunc : {
        dataSourceIds : [soloGPS.getId()],
        handler : function(rec) {
        	if (rec.alt < 1)
        	    rec.alt *= 1e4; // *10^4 due to bug in Toulouse dataset
            return {
                x : rec.lon,
                y : rec.lat,
                z : rec.alt+mslToWgs84-5. // model offset
            };
        }
    },
    orientationFunc : {
        dataSourceIds : [soloAttitude.getId()],
        handler : function(rec) {
            return {
                heading : rec.heading
            };
        }
    },
    icon: "./models/Drone+06B.glb"
});
```

This styler contains two functions, one for location and another one for orientation. Two different
data sources are needed to get this information.
the `locationFunc` add MSL to LatLon data whereas the `orientationFunc` extracts heading from altitude.

Depending on the `observeProperty`, the data can be provided in various ways. For example, let's suppose
the `http://sensorml.com/ont/swe/property/OrientationQuaternion` instead, this would have as result:

```javascript
var pointMarker = new OSH.UI.Styler.PointMarker({
	label: "3DR Solo",
    locationFunc : {
        dataSourceIds : [soloGPS.getId()],
        handler : function(rec) {
        	if (rec.alt < 1)
        	    rec.alt *= 1e4; // *10^4 due to bug in Toulouse dataset
            return {
                x : rec.lon,
                y : rec.lat,
                z : rec.alt+mslToWgs84-5. // model offset
            };
        }
    },
    orientationFunc : {
        dataSourceIds : [soloAttitude.getId()],
        handler : function(rec) {
            var qx = rec.orient.qx;
            var qy = rec.orient.qy;
            var qz = rec.orient.qz;
            var qw = rec.orient.q0;

            // look dir vector
            var x = 0;
            var y = 0;
            var z = -1;

            // calculate quat * vector
            var ix =  qw * x + qy * z - qz * y;
            var iy =  qw * y + qz * x - qx * z;
            var iz =  qw * z + qx * y - qy * x;
            var iw = - qx * x - qy * y - qz * z;

            // calculate result * inverse quat
            xp = ix * qw + iw * - qx + iy * - qz - iz * - qy;
            yp = iy * qw + iw * - qy + iz * - qx - ix * - qz;
            zp = iz * qw + iw * - qz + ix * - qy - iy * - qx;

            var yaw = 90 - (180/Math.PI*Math.atan2(yp, xp));

            return {
                heading : yaw
            };
        }
    },
    icon: "./models/Drone+06B.glb"
});
```

The `ImageDraping` styler looks like:

```javascript
var imageDrapingStyler = new OSH.UI.Styler.ImageDraping({
    platformLocationFunc: {
        dataSourceIds: [soloGPS.getId()],
        handler: function(rec) {
            if (rec.alt < 1)
                rec.alt *= 1e4; // *10^4 due to bug in Toulouse dataset
            return {
                x: rec.lon,
                y: rec.lat,
                z: rec.alt + mslToWgs84
            };
        }
    },
    platformOrientationFunc: {
        dataSourceIds: [soloAttitude.getId()],
        handler: function(rec) {
            return {
                heading: rec.heading,
                pitch: 0, //rec.pitch,
                roll: 0, //rec.roll
            };
        }
    },
    gimbalOrientationFunc: {
        dataSourceIds: [soloGimbal.getId()],
        handler: function(rec) {
            return {
                heading: rec.heading,
                pitch: -92, //rec.pitch,
                roll: 0, //rec.roll
            };
        }
    },
    /*GoPro*/
    cameraModel: {
        camProj: new Cesium.Matrix3(747.963 / 1280., 0.0, 650.66 / 1280.,
            0.0, 769.576 / 738., 373.206 / 738.,
            0.0, 0.0, 1.0),
        camDistR: new Cesium.Cartesian3(-2.644e-01, 8.4e-02, 0.0),
        camDistT: new Cesium.Cartesian2(-8.688e-04, 6.123e-04)
    },
    imageSrc: $$('#' + soloVideoView.getId() + ' canvas')[0]
});
```

### Cesium view (--cesium third party library)

Now you have setup the 3D view:

```javascript
 var mapView = new OSH.UI.CesiumView("cesiumViewId", [
{
     name: "3DR Solo",
     entityId: soloEntity.id,
     styler: pointMarkerStyler
 }, {
     name: "Geolocated Imagery",
     entityId: soloEntity.id,
     styler: imageDrapingStyler
 }]);
```

Most of the views are composed from `ViewItems`. They are passed as array argument to the view.
A `viewItem` contains a `name`,`entityId` and a  `styler`.


### Data receiver controller

As described above, you can use a data receiver controller to wrap and abstract some logic. The data source
can be connected/disconnected directly by calling the `connect`/`disconnect` function as well.

```javascript
var dataSourceController = new OSH.DataReceiver.DataReceiverController({
        replayFactor: 1.0
});

dataSourceController.addEntity(soloEntity);
dataSourceController.connectAll();
// or fire an event
//OSH.EventManager.fire(OSH.EventManager.EVENT.CONNECT_DATASOURCE, {dataSourcesId:[videoDataSource.id]});
```

### Extras features

The Toolkit provides a set of extra features that help you to simplify the way to develop your Application such as:

 * Decorate container using floating dialog windows

 * Add contextual menu

 * Add entity tree viewer

 * Add range slider
 
#### Dialog Window

The Dialog window can decorate any div. It's a floating window with useful actions:

 * dock: can dock the window
 
 * drag: can drag the window
 
 * close: can close the window
 
 * swap: swap the inner content with another div (background for example)
 
 * show/hide
 
 * connect/disconnect: can disconnect/disconnect associated data source
 
For that, you need a HTML layout:
 
```html
<div id="main-container" class="main-view"></div>
<div id="dialog-main-container" class="video-main-container"></div>
```

If you want to decorate a view, you have to put the viewId into the dialog:

```javascript
// video view    
var soloVideoDialog = new OSH.UI.DialogView("dialog-main-container", { // put the dialog to the main container
    draggable: false,
    css: "video-dialog",
    name: "UAV Video",
    show: true,
    dockable: true,
    closeable: true,
    canDisconnect : false,
    swapId: "main-container"
});

var soloVideoView = new OSH.UI.FFMPEGView(soloVideoDialog.popContentDiv.id, { // put the view into the dialog
    dataSourceId: soloVideo.getId(),
    entityId : soloEntity.id,
    css: "video",
    cssSelected: "video-selected",
    useWorker: true,
    width: 1280,
    height: 720
});

// chart view
var altChartDialog = new OSH.UI.DialogView("dialog-main-container", {
    draggable: false,
    css: "dialog",
    name: "Solo Altitude",
    show: false,
    dockable: true,
    closeable: true,
    canDisconnect : false,
    swapId: "main-container"
});

var altChartView = new OSH.UI.Nvd3CurveChartView(altChartDialog.popContentDiv.id, ...);

// Cesium view is plugged as background 
var mapView = new OSH.UI.CesiumView("main-container",...)
```
 
#### <a id="osh-by-example-context-menu"></a>Context Menu 

Another useful is the context menu. They add a contextual menu onto some views and can be associated with actions.
They receive and send events using the EventManager. They are built from `menuItem` and can be grouped by a `groupId`.

The `viewItem` of a view has a property to associate a context menu,for example:

```javascript
// menu ids
var soloTreeMenuId = "solo-tree-menu";
var soloMarkerMenuId = "solo-marker-menu";
var menuGroupId = "allmenus";

// cesium map view
var mapView = new OSH.UI.CesiumView("main-container", [{
  name: "3DR Solo",
  entityId: soloEntity.id,
  styler: pointMarker,
  contextMenuId: soloMarkerMenuId // adds context menu to cesiumView
}
[...]
```

Now you have to define your `menuItem`:

```javascript
var menuItems = [{
    name: "Show Video",
    viewId: soloVideoDialog.getId(),
    css: "fa fa-video-camera",
    action: "show" //Can also use EventManager: OSH.EventManager.EVENT.SHOW_VIEW
}, {
    name: "Show Altitude Chart",
    viewId: altChartDialog.getId(),
    css: "fa fa-bar-chart",
    action: "show"
}, {
    name: "TakeOff",
    viewId: "",
    css: "fa fa-upload",
    action: "uav:takeoff"
}, {
    name: "Land",
    viewId: "",
    css: "fa fa-download",
    action: "uav:land"
}];

var markerMenu = new OSH.UI.ContextMenu.CircularMenu({
    id: soloMarkerMenuId,
    groupId: menuGroupId,
    items: menuItems
});
```
In this example, we use an existing CircularMenu displaying a circle with some actions.

#### Entity Tree viewer (--tree third party library) 

The Entity Tree viewer (provided by the external `tree` library) shows the whole list of entities and their 
associated data receivers. It has a stack menu to perform actions and inherit from the `OSH.UI.View`.
Moreover, you can render the tree into a Dialog:

```javascript
 // tree view
var entityTreeDialog = new OSH.UI.DialogView(document.body.id, {
    css: "tree-dialog",
    name: "Entities",
    show: true,
    draggable: true,
    dockable: false,
    closeable: true
});

var entityTreeView = new OSH.UI.EntityTreeView(entityTreeDialog.popContentDiv.id,
    [{
        entity : soloEntity,
        path: "Sensors/Solo",
        treeIcon : "images/drone.png",
        contextMenuId: soloTreeMenuId
    }],
    {
        css: "tree-container"
    }
);    
```

#### Range Slider (--nouislider third party library)

The range slider allows one to control change the time period. It sends events to change dynamically DataReceiver request  and
also use the EventManager to listen to data.

It supports playback data as well as real-time data (time period cannot be changed in that mode).

Let's take an example:

Html Layout:
```html
<div class="rangeSlider-container">
    <div id="rangeSlider" class="rangeSlider"></div>
</div>
```
Since it uses EventManager to communicate, you have only to instantiate a new Object

```javascript
 var rangeSlider = new OSH.UI.RangeSlider("rangeSlider",{
    startTime: "2015-02-16T07:58:00Z",
    endTime: "2015-02-16T08:09:00Z",
    refreshRate:1
});
```
For real-time we would set:
```javascript
 var rangeSlider = new OSH.UI.RangeSlider("rangeSlider");
```