# OpenLayers

The OpenLayerView is a way of showing data point on a map. Often, it is used to show GPS data, or fixed position of any sensor.
This View can also display path using the corresponding [Layer](../../layers/general).

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
 
## Initial Map

The initial Map & View can be passed to override the default [Map](https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html)  / [View](https://openlayers.org/en/latest/apidoc/module-ol_View-View.html).

Here is the corresponding code that initializes the initial-view if none is passed in parameter:

<<< @/../../source/core/ui/view/map/OpenLayerView.js#snippet_openlayerview_initial_map

## Supported layers

The view supports type layers:
- marker
- polyline

## Example

<<< @/../../showcase/examples/openlayers-location/openlayers-location.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/openlayers-location.html" style="border:none;width:100%;height: 500px" />
