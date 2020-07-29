<template>
  <div
          id="cesium-container"
          class="map" />
</template>

<script>
  window.CESIUM_BASE_URL = './';
  import {EllipsoidTerrainProvider, Matrix3,Cartesian3,Cartesian2 } from "cesium";
  import CesiumView from "osh/ui/view/map/CesiumView.js";
  // @ is an alias to /src
  import ImageDraping from "osh/ui/styler/ImageDraping.js";
  import SweJson from "osh/datareceiver/SweJson.js";
  import PointMarker from "osh/ui/styler/PointMarker.js";

  export default {
    name: "Globe",
    components: {},
    mounted() {
      this.init();
    },
    props: ['platformLocationDataSource','platformOrientationDataSource','gimbalOrientationDataSource'],
    methods: {
      init() {
        let videoCanvas = document.getElementById("video-container").getElementsByTagName("canvas")[0];
        // add 3D model marker to Cesium view
        let pointMarker = new PointMarker({
          label: "3DR Solo",
          locationFunc : {
            dataSourceIds : [this.platformLocationDataSource.id],
            handler : function(rec) {
              return {
                x : rec.loc.lon,
                y : rec.loc.lat,
                z : rec.loc.alt - 184 // model offset
              };
            }
          },
          orientationFunc : {
            dataSourceIds : [this.platformOrientationDataSource.getId()],
            handler : function(rec) {
              return {
                heading : rec.attitude.yaw
              };
            }
          },
          icon: "./models/Drone+06B.glb"
        });

        // style it with a moving point marker
        let imageDrapingMarker = new ImageDraping({
          platformLocationFunc: {
            dataSourceIds: [this.platformLocationDataSource.getId()],
            handler: function (rec) {
              return {
                x: rec.loc.lon,
                y: rec.loc.lat,
                z: rec.loc.alt - 184
              };
            }
          },
          platformOrientationFunc: {
            dataSourceIds: [this.platformOrientationDataSource.getId()],
            handler: function (rec) {
              return {
                heading : rec.attitude.yaw,
                pitch: rec.attitude.pitch,
                roll: rec.attitude.roll
              };
            }
          },
          gimbalOrientationFunc: {
            dataSourceIds: [this.gimbalOrientationDataSource.getId()],
            handler: function (rec) {
              return {
                heading : rec.attitude.yaw,
                pitch: rec.attitude.pitch,
                roll: rec.attitude.roll
              };
            }
          },
          cameraModel: {
            camProj: new Matrix3(747.963/1280.,     0.0,       650.66/1280.,
                    0.0,        769.576/738.,  373.206/738.,
                    0.0,            0.0,          1.0),
            camDistR: new Cartesian3(-2.644e-01, 8.4e-02, 0.0),
            camDistT: new Cartesian2(-8.688e-04, 6.123e-04)
          },
          imageSrc: videoCanvas
        });

        // create Cesium view
        let cesiumView = new CesiumView("cesium-container",
          [{
            styler: pointMarker,
            name: 'Solo draping marker'
          },{
            styler: imageDrapingMarker,
            name: 'Solo draping'
          }]
        );
        cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();
        cesiumView.viewer.scene.logarithmicDepthBuffer = false;
        cesiumView.viewer.camera.setView({
          destination : Cartesian3.fromDegrees(-86.5812,34.6904,1000)
        });

        // select bing maps as default imagery
        const baseLayerPickerViewModel = cesiumView.viewer.baseLayerPicker.viewModel;
        baseLayerPickerViewModel.selectedImagery = baseLayerPickerViewModel.imageryProviderViewModels[3];

      }
    }
  };
</script>
<style>
  .map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 5;
  }

  .leaflet-container {
    height: 100%;
  }
</style>
