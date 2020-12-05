# Usage

osh-js can be used with ES6 modules, plain JavaScript and module loaders.

## Visualize GPS data

To visualize a data, we need to instantiate a `DataSource`, `View` and `Layer` classes  and a `HTML tag` to render the result.

### Create the HTML element

The HTML element is the html anchor of your View.

```html
<div id="leafletMap"></div>
```
### Import modules

First import your modules:

<<< @/../../showcase/examples/leaflet-location/leaflet-location.js#snippet_leaflet_location_import

### Create the DataSource instance

The DataSource is used to define the properties allowing connecting to a OSH server and define the data parser
to use.

<<< @/../../showcase/examples/leaflet-location/leaflet-location.js#snippet_leaflet_location_datasource

### Create the Layer instance

The Layer is used to style dynamically your data before rendering.

<<< @/../../showcase/examples/leaflet-location/leaflet-location.js#snippet_leaflet_location_marker

### Create the View instance
The View defines the kind of visualization you want for your DataSource. In this example, a map render based on leaflet is used.

<<< @/../../showcase/examples/leaflet-location/leaflet-location.js#snippet_leaflet_location_view

### Start the Stream

Finally, you can start the connection by executing:

<<< @/../../showcase/examples/leaflet-location/leaflet-location.js#snippet_leaflet_location_connect




