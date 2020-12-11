# Leaflet

The LeafletView is a way of showing data point on a map. Often, it is used to show GPS data, or fixed position of any sensor.
This View can also display path using the corresponding [Layer](../layers/layer).

The View is based on [LeafletJs](https://leafletjs.com/) framework.

<br/>
<DocumentationLoad path="/guide/api/LeafletView.html"/>

## Properties configuration

The ***initialView*** defines some properties for the creation of the inner
 [View](https://leafletjs.com/reference-1.7.1.html#map-setview).

The ***overlayLayers*** are [L.tileLayer](https://leafletjs.com/reference-1.7.1.html#tilelayer-l-tilelayer)
 Leaflet objects to use as overlay layer. 

The ***baseLayers*** are [L.tileLayer](https://leafletjs.com/reference-1.7.1.html#tilelayer-l-tilelayer)
 Leaflet objects to use as base layer.
 
The default [OSM](https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html) layer is provided
 
## Initial View

The initial View can be passed to override the default [View](https://leafletjs.com/reference-1.7.1.html#map-setview).

Here is the corresponding code that initializes the initial-view if none is passed in parameter:

<<< @/../../source/osh/ui/view/map/LeafletView.js#snippet_leafletview_initial_view

## Example

<<< @/../../showcase/examples/leaflet-location/leaflet-location.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/leaflet-location.html" style="border:none;width:100%;height: 500px" />
