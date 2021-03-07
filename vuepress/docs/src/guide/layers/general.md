# General

The Layers allow styling and filter data. They are generic and can be applied to any View that support them.

For example, the data can be displayed as:
- text
- icon
- line
- map point
- ...

## Use

There are two types of properties of a layer:
- static properties
- dynamic properties

Static properties are defined at creation and cannot be modified. Depending on the property, it can be a number, 
a string, an object etc.

Dynamic properties are defined as a function. Thus, each data can be modified individually by going through these functions.

The function can take two forms:
- the simple form as an arrow function ([example here](../views/map/leaflet.md#example))
- the complex form defining a dataSource and a separate handler

Thus, for a given layer, we can define a dataSourceId for the entire layer or define a specific dataSourceId for each function.

### Example

<<< @/../../showcase/examples/leaflet-location/leaflet-location.js#snippet_leaflet_location_marker

or

<<< @/../../showcase/examples/video-map-multiple-datasource/video-map-multiple-datasource.js#snippet_multiple_layer_datasources

In the first case we use directly ***getLocation: (rec) => {}*** and in the second case we can define a specific dataSource using 
the field ***dataSourceIds: [platformLocationDataSource.getId()]***
