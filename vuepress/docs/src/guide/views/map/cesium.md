# Cesium


The CesiumView is a way of showing data point on a map. Often, it is used to show GPS data, or fixed position of any sensor.
This View can also display path using the corresponding [Styler](../stylers/styler).

The View is based on [CesiumJS](https://cesium.com/cesiumjs/) framework.

<br/>
<DocumentationLoad path="/guide/api/CesiumView.html"/>

Cesium needs to specify the CESIUM_BASE_URL, either using webpack, or inside the code:

```js
window.CESIUM_BASE_URL = './';
```

To setup webpack, you can use the osh-js examples and/or read [this article](https://cesium.com/docs/tutorials/cesium-and-webpack/).

## Example

<<< @/../../showcase/examples/cesium-location/cesium-location.js

<hr class="demo-hr"/>
<br/><br/>

<iframe src="../../../showcase/cesium-location.html" style="border:none;width:100%;height: 500px" />
