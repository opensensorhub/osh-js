<template>
  <div
          id="cesium-container"
          class="map" />
</template>

<script>
  import CustomCesiumView from "../views/CustomCesiumView";

  window.CESIUM_BASE_URL = './';
  import {EllipsoidTerrainProvider, Matrix3,Cartesian3,Cartesian2,Ion } from "cesium";
  // @ is an alias to /src
  import ImageDrapingLayer from "osh-js/core/ui/layer/ImageDrapingLayer.js";
  import PointMarkerLayer from "osh-js/core/ui/layer/PointMarkerLayer.js";
  import PolygonLayer from "osh-js/core/ui/layer/PolygonLayer";
  import FrustrumLayer from "../views/FrustrumLayer";

  export default {
    name: "Globe",
    components: {},
    mounted() {
      this.init();
      this.$root.$on('pan_to_drone', () => {
        this.cesiumView.panToLayer(this.dronePointMarkerLayer);
      });
      this.$root.$on('pan_to_target', () => {
        this.cesiumView.panToLayer(this.targetPointMarkerLayer);
      });
    },
    props: ['droneLocationDataSource','droneOrientationDataSource',
      'droneCameraOrientationDataSource', 'droneGeoRefImageFrameDataSource','targetLocationDataSource','lastDroneLocation',
      'droneHFovDataSource','droneVFovDataSource'
    ],
    methods: {
      init() {
        const that = this;
        let videoCanvas = document.getElementById("video-container").getElementsByTagName("canvas")[0];
        // add 3D model marker to Cesium view
        let dronePointMarkerLayer = new PointMarkerLayer({
          label: "MISB UAS",
          getLocation : {
            dataSourceIds : [this.droneLocationDataSource.id],
            handler : function(rec) {
              const pos = {
                x : rec.location.lon,
                y : rec.location.lat,
                z : rec.location.alt - 184 // model offset
              };

              return pos;
            }
          },
          getOrientation : {
            dataSourceIds : [this.droneOrientationDataSource.getId()],
            handler : function(rec) {
              return {
                heading : rec.attitude.heading
              };
            }
          },
          icon: "./models/Drone+06B.glb",
        });


        // style it with a moving point marker
        let droneImageDrapingLayer = new ImageDrapingLayer({
          getVisible: {
            dataSourceIds: [this.droneLocationDataSource.getId()],
            handler: function(rec) {
             return !that.$store.state.drone.footprint;
            }
          },
          getPlatformLocation: {
            dataSourceIds: [this.droneLocationDataSource.getId()],
            handler: function (rec) {
              return {
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt - 184
              };
            }
          },
          getPlatformOrientation: {
            dataSourceIds: [this.droneOrientationDataSource.getId()],
            handler: function (rec) {
              return {
                heading : rec.attitude.heading,
                pitch: rec.attitude.pitch,
                roll: rec.attitude.roll
              };
            }
          },
          getGimbalOrientation: {
            dataSourceIds: [this.droneCameraOrientationDataSource.getId()],
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
          imageSrc: videoCanvas,
        });

        let dronePolygonFootprintLayer = new PolygonLayer({
          dataSourceId: this.droneGeoRefImageFrameDataSource.id,
          getVisible: () => this.$store.state.drone.footprint, // link state application to
          getVertices: (rec) => {
            return [
              rec.ulc.lon,
              rec.ulc.lat,
              rec.urc.lon,
              rec.urc.lat,
              rec.lrc.lon,
              rec.lrc.lat,
              rec.llc.lon,
              rec.llc.lat,
              rec.ulc.lon,
              rec.ulc.lat,
            ]
          },
          getPolygonId: (rec) =>  "drone-polygon-id",
          color: 'rgba(65,183,255,0.4)',
          opacity: 0.5,
          outlineWidth: 1,
          outlineColor: 'rgba(255,195,100,0.3)'
        });


        let droneFrustrumLayer = new FrustrumLayer({
          getOrigin: {
            dataSourceIds: [this.droneLocationDataSource.getId()],
            handler: function(rec) {
              return {
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt - 184
              };
            }
          },
          getFov: {
            dataSourceIds: [this.droneHFovDataSource.getId()],
            handler: function(rec) {
              return rec.params.hfov;
            }
          },
          getFrame: {
            dataSourceIds: [this.droneGeoRefImageFrameDataSource.getId()],
            handler: function(rec) {
              return [rec.ulc.lon, rec.ulc.lat, 0];
            }
          },
          getOrientation: {
            dataSourceIds: [this.droneCameraOrientationDataSource.getId()],
            handler: function(rec) {
              return {
                heading : rec.attitude.yaw,
                pitch: rec.attitude.pitch,
                roll: rec.attitude.roll
              };
            }
          },
          getVisible: {
            dataSourceIds: [this.droneLocationDataSource.getId()],
            handler: function(rec) {
              return  that.$store.state.drone.footprint; // link state application to
            }
          },
          color: 'rgba(65,183,255,0.4)',
          opacity: 0.5,
        });
        /*
        const MODEL_CORRECTION = -170;
        let droneFootPrintCoPlanarLayer0 = new CoPlanarPolygonLayer({
          dataSourceId: this.droneGeoRefImageFrameDataSource.id,
          getVisible: () => this.$store.state.drone.footprint, // link state application to
          getVertices: (rec) => {
            // (lon, lat, alt)
            let p0 = [rec.ulc.lon, rec.ulc.lat, 0];
            let p1 = [rec.urc.lon, rec.urc.lat, 0];
            let p2 = [rec.lrc.lon, rec.lrc.lat, 0];
            let p3 = [rec.llc.lon, rec.llc.lat, 0];


            if(isDefined(that.lastDroneLocation)) {

              let c = [that.lastDroneLocation.location.lon, that.lastDroneLocation.location.lat, that.lastDroneLocation.location.alt + MODEL_CORRECTION];
              return [...p0, ...p1, ...p2, ...c]
            } else {
              return [...p0, ...p1, ...p2, ...p3, ...p0]
            }
          },
          getPolygonId: (rec) =>  "my-id-0",
          color: 'rgba(233,244,255,0.1)',
          opacity: 0.2,
          outlineWidth: 1,
          outlineColor: 'rgba(255,169,17,0.5)',
        });

        let droneFootPrintCoPlanarLayer1 = new CoPlanarPolygonLayer({
          dataSourceId: this.droneGeoRefImageFrameDataSource.id,
          getVisible: () => this.$store.state.drone.footprint, // link state application to
          getVertices: (rec) => {
            // (lon, lat, alt)
            let p0 = [rec.ulc.lon, rec.ulc.lat, 0];
            let p1 = [rec.urc.lon, rec.urc.lat, 0];
            let p2 = [rec.lrc.lon, rec.lrc.lat, 0];
            let p3 = [rec.llc.lon, rec.llc.lat, 0];


            if(isDefined(that.lastDroneLocation)) {

              let c = [that.lastDroneLocation.location.lon, that.lastDroneLocation.location.lat, that.lastDroneLocation.location.alt + MODEL_CORRECTION];
              return [...p2, ...p3, ...p0, ...c]
            } else {
              return [...p0, ...p1, ...p2, ...p3, ...p0]
            }
          },
          getPolygonId: (rec) =>  "my-id-1",
          color: 'rgba(233,244,255,0.1)',
          opacity: 0.2,
          outlineWidth: 1,
          outlineColor: 'rgba(255,169,17,0.5)',
        });*/

        let targetPointMarkerLayer = new PointMarkerLayer({
          dataSourceId: this.targetLocationDataSource.id,
          getLocation: (rec) => ({
            x: rec.location.lon,
            y: rec.location.lat
          }),
          orientation: {
            heading: 0
          },
          icon: 'images/marker-icon.png',
          iconAnchor: [16, 40]
        });

        // Init cesium token
        Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MjczNTA4NS1jNjBhLTQ3OGUtYTQz' +
            'Ni01ZjcxOTNiYzFjZGQiLCJpZCI6MzIzODMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTY4OTU3MjB9.hT6fWdvIqu4GIHR7' +
            '2WfIX0QHiZcOjVaXI92stjDh4fI';

        // create Cesium view
        let cesiumView = new CustomCesiumView({
          container: "cesium-container",
          layers: [dronePointMarkerLayer, droneImageDrapingLayer, dronePolygonFootprintLayer,
            /*droneFootPrintCoPlanarLayer0,droneFootPrintCoPlanarLayer1,*/ droneFrustrumLayer, targetPointMarkerLayer]
        });

        //cesium custom param
        cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();
        cesiumView.viewer.scene.logarithmicDepthBuffer = false;
        cesiumView.viewer.camera.setView({
          destination : Cartesian3.fromDegrees(-86.5812,34.6904,1000)
        });

        // select bing maps as default imagery
        const baseLayerPickerViewModel = cesiumView.viewer.baseLayerPicker.viewModel;
        baseLayerPickerViewModel.selectedImagery = baseLayerPickerViewModel.imageryProviderViewModels[0];

        this.dronePointMarkerLayer = dronePointMarkerLayer;
        this.targetPointMarkerLayer = targetPointMarkerLayer;
        this.cesiumView = cesiumView;
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
