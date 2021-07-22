# Cesium


The CesiumView is a way of showing data point on a map. Often, it is used to show GPS data, or fixed position of any sensor.
This View can also display path using the corresponding [Layer](../../layers/general).

The View is based on [CesiumJS](https://cesium.com/cesiumjs/) framework.

<br/>
<DocumentationLoad path="/guide/api/CesiumView.html"/>

Cesium needs to specify the CESIUM_BASE_URL, either using webpack, or inside the code:

```js
window.CESIUM_BASE_URL = './';
```

To setup webpack, you can use the osh-js examples and/or read [this article](https://cesium.com/docs/tutorials/cesium-and-webpack/).

## Supported layers

The view supports type layers:
- marker
- draping
- polyline

## Properties configuration

You can override the [default viewer properties](https://cesium.com/docs/cesiumjs-ref-doc/Viewer.html?classFilter=Viewer)
using the ***cesiumProps.viewerProps*** object.

The default viewer properties are:

```javascript
const imageryProviders = createDefaultImageryProviderViewModels();
let viewerProps = {
  baseLayerPicker: true,
  imageryProviderViewModels: imageryProviders,
  selectedImageryProviderViewModel: imageryProviders[6],
  timeline: false,
  homeButton: false,
  navigationInstructionsInitiallyVisible: false,
  navigationHelpButton: false,
  geocoder: true,
  fullscreenButton: false,
  showRenderLoopErrors: true,
  animation: false,
  scene3DOnly: true, // for draw layer
  terrainProvider: new EllipsoidTerrainProvider(),
};
```

## Example

<<< @/../../showcase/examples/cesium-location-opts/cesium-location-opts.js

<hr class="demo-hr"/>
<br/><br/>

<Example path="/showcase/cesium-location-opts.html" style="border:none;width:100%;height: 500px" />
