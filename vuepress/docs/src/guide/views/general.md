# General

The Views are components made for displaying any kind of data. Some are framework based such as Leaflet, Cesium, Openlayers, Charts.js etc.
or pure Javascript.

This is the list of actual supported Views in the Toolkit:
- Map
    - [Cesium](./map/cesium) 1.68 
    - [Leaflet](map/leafletcomp)  1.6
    - [OpenLayers](./map/ol)  6.2.1
- Chart
    - [Chart.js](./chart)   2.9.3
- TimeLine
    - [NoUiSlider](./ext/rangeslider)  14.2.0
- Video
    - [MJPEG](./video/mjpeg)  native osh view
    - [FFMPEG](./video/ffmpeg) native osh view based on emscripten 2.0 & FFMPEG.js 4.3
    - VideCodecApi native osh view

<DocumentationLoad path="/guide/api/View.html"/>

Some Views have to use [Layer](./layers/layer) to allow styling data.

The View does by default a lot of things to manage the interactions with the DOM, but also to manage the data itself.
It makes the best effort to facilitate the creation of new Views.

First, it provides properties common to all Views.

## Common properties

The View class is super class to provide common properties to other subclasses.
These properties are as follows:
- container
- css
- layers

### container

The container is the id on which the view will be attached. A new child element will be created in the DOM and will 
be attached to the element corresponding to the id passed as parameter.

Note that this class is DOM Ready, so the document needs to be loaded before being used. 
The View will therefore have a new auto-generated id (UUID) as identifier and will be accessible via its properties.

```html
<div id="container"></div>
```

```js
const myCustomView = new CustomView({
    container: 'container'
});
```

This will result in:

```html
<div id="container">
    <div id="view-1345-4678-7894-45461ab">...</div>
</div>
```

### layers

The Map views are composed by [Layers](../layers/general.md). The Layer allows to apply a particular style to each 
data that the view should display, it can be a point on a map, a polyline, a chart curve, a frame video etc...

#### Supported layers

Each view supports one or more layer types, the internal constructor of the view has a property to define which layer
types are supported or not. Native OSH views already define this property.

If we try to add a layer that is not supported by a view, an exception will be thrown.

The types are defined as follows:
- marker
- polyline
- curve
- draping

## Data handling

Views are used to represent data arriving from the DataSources in different forms. The only way to retrieve this data,
 and to subscribe to the BroadcastChannel corresponding to the DataSource, whether it is synchronized or not, the data will eventually arrive on this channel.

So the View takes a list of Layers as a parameter each containing an or several associated DataSource.

In this way, the View subscribes to the DataSource broadcast channel at initialization and calls the abstract
 method ***setData(dataSourceId, data)*** .

The subclasses of View have to therefore *override* the ***setData(dataSourceId, data)*** method to receive
 the data automatically.



