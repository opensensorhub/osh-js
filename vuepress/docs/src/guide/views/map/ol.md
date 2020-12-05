# OpenLayers

The OpenLayerView is a way of showing data point on a map. Often, it is used to show GPS data, or fixed position of any sensor.
This View can also display path using the corresponding [Layer](../layers/layer).

The View is based on [OpenLayers](https://openlayers.org/) framework.

<br/>
<DocumentationLoad path="/guide/api/OpenLayerView.html"/>

## Properties configuration

The ***map*** property can override the default map. This is the [Map](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html)
OpenLayers object.

The ***initialView*** defines some properties for the creation of the inner
 [View](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html).

The ***overlayLayers*** are [TileLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html) 
OpenLayers objects to use as overlay layer. 

The ***baseLayers*** are [TileLayer](https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html)
 OpenLayers objects to use as base layer.
The default [OSM](https://openlayers.org/en/latest/apidoc/module-ol_source_OSM-OSM.html) layer is provided
 
## Initial View

The initial View can be passed to override the default [View](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html).

Here is the corresponding code that initializes the initial-view if none is passed in parameter:

<<< @/../../source/osh/ui/view/map/OpenLayerView.js#snippet_openlayerview_initial_view

## Example

<<< @/../../showcase/examples/openlayers-location/openlayers-location.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/openlayers-location.html" style="border:none;width:100%;height: 500px" />
