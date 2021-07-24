# General

The map views are a way of showing data point on a map. Often, it is used to show GPS data, or fixed position of any sensor.
This View can also display path using the corresponding [Layer](../../layers/general).

## Example

The code is pretty similar between each view. Depending on what we want to display, we can have the same code or add
options specific to a View, for example, the ImageDrapingLayer to the Cesium one.

Here is an example of common and specific code for the View:

<<< @/../../showcase/examples/leaflet-location/leaflet-location.js#snippet_leaflet_location_import
<<< @/../../showcase/examples/leaflet-location/leaflet-location.js#snippet_leaflet_location_datasource
<<< @/../../showcase/examples/leaflet-location/leaflet-location.js#snippet_leaflet_location_marker

Now, for the same piece of code, we can create the view:

:::: tabs type:board-card
::: tab OpenLayers lazy
<<< @/../../showcase/examples/openlayers-location/openlayers-location.js#snippet_ol_location_view
:::
::: tab Leaflet lazy
<<< @/../../showcase/examples/leaflet-location/leaflet-location.js#snippet_leaflet_location_view
:::
::: tab Cesium lazy
<<< @/../../showcase/examples/cesium-location/cesium-location.js#snippet_cesium_location_view
:::
::::




