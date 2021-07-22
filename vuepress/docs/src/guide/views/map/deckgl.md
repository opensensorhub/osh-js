# Deck.gl

The DeckGlView is a way of showing data point on a map. Often, it is used to show GPS data, or fixed position of any sensor.
This View can also display path using the corresponding [Layer](../../layers/general).

The View is based on [https://deck.gl/](https://deck.gl/) framework.

<br/>
<DocumentationLoad path="/guide/api/DeckGlView.html"/>

## Properties configuration

This View is highly configurable. Deck.gl is built using a property object. This object can be directly passed,
in part or in full, depending on what you want to configure, to the DeckGlView which will in turn forward it to the Deck object.

By default, Deck.gl is only an overlay, it is possible to display it without Map, with its integrated Map or with an
external Map like OpenLayer, MapBox or Leaflet. It is a `<canvas></canvas>` tag that is set on top of the others.

By default, DeckGlView instantiates a TileLayer Layer to display a default map based on OpenStreetMap data and OpenSource
OpenStreetMap server.

It is possible to override this by defining a TileLayer object in **deckprops**, which will display this default TileLayer
instead of the OSM TileLayer.

## Supported layers

The view supports type layers:
- marker
- polyline

## Example

<<< @/../../showcase/examples/deckgl-location/deckgl-location.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/deckgl-location.html" style="border:none;width:100%;height: 500px" />
