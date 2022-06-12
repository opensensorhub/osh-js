<template>
  <div
          id="cesium-container"
          class="map" />
</template>

<script>
  import CesiumView from "osh-js/core/ui/view/map/CesiumView";

  window.CESIUM_BASE_URL = './';
  import {EllipsoidTerrainProvider,Matrix3,Cartesian3,Cartesian2,Ion} from "cesium";
  // @ is an alias to /src
  import ImageDrapingLayer from "osh-js/core/ui/layer/ImageDrapingLayer.js";
  import PointMarkerLayer from "osh-js/core/ui/layer/PointMarkerLayer.js";
  import EllipseLayer from "osh-js/core/ui/layer/EllipseLayer.js";
  import PolygonLayer from "osh-js/core/ui/layer/PolygonLayer";
  import FrustumLayer from "osh-js/core/ui/layer/FrustumLayer";
  import {isDefined} from "osh-js/core/utils/Utils";


  const altitudeOffset = -193;
  const DTR = Math.PI / 180;

  // Init cesium token
  Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
      'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';

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
    props: [
      'droneLocationDataSource',
      'droneOrientationDataSource',
      'droneCameraOrientationDataSource',
      'droneGeoRefImageFrameDataSource',
      'targetLocationDataSource',
      'droneHFovDataSource',
      'droneVFovDataSource',
    ],
    computed: {
      isVisibleImageDraping() {
        return this.$store.state.ui.draping;
      },
      getVideoView() {
        return this.$store.state.ui.videoView;
      }
    },
    methods: {
      createDroneMarkerLayer() {
        return new PointMarkerLayer({
          label: "MISB UAS",
          labelColor: "#FFFFFF",
          labelOffset: [0, -20],
          getLocation : {
            dataSourceIds : [this.droneLocationDataSource.id],
            handler : function(rec) {
              const pos = {
                x : rec.location.lon,
                y : rec.location.lat,
                z : rec.location.alt + altitudeOffset
              };

              return pos;
            }
          },
          getOrientation : {
            dataSourceIds : [this.droneOrientationDataSource.getId()],
            handler : function(rec) {
              return {
                heading : rec.attitude.heading + 180 // model is reversed
              };
            }
          },
          //icon: "./models/Drone+06B.glb",
          icon: "./models/predator2.glb",
          iconScale: 0.1
        });
      },
      createDroneImageDrapingLayer() {
        const that = this;

        return new ImageDrapingLayer({
          getVisible: {
            dataSourceIds: [this.droneLocationDataSource.getId()],
            handler: () => this.isVisibleImageDraping
          },
          getPlatformLocation: {
            dataSourceIds: [this.droneLocationDataSource.getId()],
            handler: function (rec) {
              return {
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt + altitudeOffset
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
          getCameraModel: {
            dataSourceIds: [this.droneHFovDataSource.getId()],
            handler: function (rec) {
              let fx = 1. / (2. * Math.tan(rec.params.hfov * DTR / 2));
              let fy = fx * 640. / 480.;
              return {
                camProj: new Matrix3(
                    fx, 0.0, 0.5,
                    0.0,  fy, 0.5,
                    0.0, 0.0, 1.0),
                camDistR: new Cartesian3(0,0,0),
                camDistT: new Cartesian2(0,0)
              };
            }
          },
          cameraModel: {
            camProj: new Matrix3(
                1.0, 0.0, 0.5,
                0.0, 1.0, 0.5,
                0.0, 0.0, 1.0),
            camDistR: new Cartesian3(0,0,0),
            camDistT: new Cartesian2(0,0)
          },
          dataSourceId: this.droneLocationDataSource.id, // TODO: should not associated a datasource to get it working
          getImageSrc: async () => this.getVideoView.getVideoCanvas(),
        });
      },
      createDronePolygonFootprintLayer() {
        const that = this;
        return new PolygonLayer({
          dataSourceId: this.droneGeoRefImageFrameDataSource.id,
          getVisible: () => that.$store.state.ui.footprint, // link state application to
          getVertices: (rec) => {
            return [
              rec.geoRef.ulc.lon,
              rec.geoRef.ulc.lat,
              rec.geoRef.urc.lon,
              rec.geoRef.urc.lat,
              rec.geoRef.lrc.lon,
              rec.geoRef.lrc.lat,
              rec.geoRef.llc.lon,
              rec.geoRef.llc.lat,
              rec.geoRef.ulc.lon,
              rec.geoRef.ulc.lat,
            ]
          },
          getPolygonId: (rec) =>  "drone-polygon-id",
          color: 'rgba(65,183,255,0.4)',
          opacity: 0.5,
          outlineWidth: 1,
          outlineColor: 'rgba(255,195,100,0.3)'
        });
      },
      createDroneFrustumLayer() {
        const that = this;
        return new FrustumLayer({
          getOrigin: {
            dataSourceIds: [this.droneLocationDataSource.getId()],
            handler: function(rec) {
              return {
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt + altitudeOffset
              };
            }
          },
          getFov: {
            dataSourceIds: [this.droneHFovDataSource.getId()],
            handler: function(rec) {
              return rec.params.hfov;
            }
          },
          getRange: {
            dataSourceIds: [this.droneLocationDataSource.getId()],
            handler: function(rec) {
              return rec.location.alt*5;
            }
          },
          getPlatformOrientation: {
            dataSourceIds: [this.droneOrientationDataSource.getId()],
            handler: function(rec) {
              return rec.attitude;
            }
          },
          getSensorOrientation: {
            dataSourceIds: [this.droneCameraOrientationDataSource.getId()],
            handler: function(rec) {
              return rec.attitude;
            }
          },
          getVisible: {
            dataSourceIds: [this.droneHFovDataSource.getId()],
            handler: function(rec) {
              return  that.$store.state.ui.fov; // link state application to
            }
          },
          color: 'rgba(255,246,246,0.24)',
          opacity: 0.25,
        });
      },
      createTargetPointMarkerLayer() {
        return new PointMarkerLayer({
          label: "Tracked Vehicle",
          labelColor: "#FFFFFF",
          labelOffset: [0, 10],
          dataSourceId: this.targetLocationDataSource.id,
          getLocation: (rec) => ({
            x: rec.location.lon,
            y: rec.location.lat
          }),
          orientation: {
            heading: 90
          },
          // icon: "models/pickup.glb",
          iconScale: 1.0
        });
      },
      // createBiologicalSensorMarkersLayer() {
      //   return new PointMarkerLayer({
      //     dataSourceId: this.biologicalSensorsDataSource.id,
      //     getLocation: (f) => {
      //       let pos = f.shape.pos.split(" ");
      //       return {
      //         x: parseFloat(pos[1]),
      //         y: parseFloat(pos[0]),
      //         z: 5
      //       }
      //     },
      //     getDescription:(f) => {
      //       let pos = f.shape.pos.split(" ");
      //       return  f.description + "<br/>" +
      //           "Latitude: " + pos[0] + "°<br/>" +
      //           "Longitude: " + pos[1] + "°"
      //     },
      //     getMarkerId:(f) => f.id,
      //     icon: 'images/bio-32.png',
      //     // iconAnchor: [12, 41],
      //     getLabel: (f) =>  f.id,
      //     labelColor: '#ffffff',
      //     labelSize: 18,
      //     labelOffset: [0, 10],
      //     onLeftClick: (markerId, billboard, event) => {
      //       if(markerId.startsWith("FOI_ATM")) {
      //         console.log(markerId);
      //       }
      //     }
      //   });
      // },
      createBiologicalSensorMarkersRadiusLayer() {
        return new EllipseLayer({
          dataSourceId: this.biologicalSensorsDataSource.id,
          getEllipseID:(f) => f.id,
          getPosition: (f) => {
            let pos = f.shape.pos.split(" ");
            return {
              x: parseFloat(pos[1]),
              y: parseFloat(pos[0]),
              z: 5
            }
          },
          color: 'rgba(255,74,22, 0.5)',
          getSemiMajorAxis:(rec) => parseFloat(rec.radius),
          getSemiMinorAxis:(rec) => parseFloat(rec.radius),
          filter: (rec) => isDefined(rec.radius)
        });
      },
      init() {
        // add 3D model marker to Cesium view
        let dronePointMarkerLayer = this.createDroneMarkerLayer();

        // style it with a moving point marker
        let droneImageDrapingLayer = this.createDroneImageDrapingLayer();

        let dronePolygonFootprintLayer = this.createDronePolygonFootprintLayer();

        let droneFrustumLayer = this.createDroneFrustumLayer();

        let targetPointMarkerLayer = this.createTargetPointMarkerLayer();

        // let biologicalSensorMarkersLayer = this.createBiologicalSensorMarkersLayer();

        // let biologicalSensorMarkersRadiusLayer =  this.createBiologicalSensorMarkersRadiusLayer();

        // create Cesium view
        let cesiumView = new CesiumView({
          container: "cesium-container",
          layers: [
            dronePointMarkerLayer,
            droneImageDrapingLayer,
            dronePolygonFootprintLayer,
            droneFrustumLayer,
            // targetPointMarkerLayer,
            // biologicalSensorMarkersRadiusLayer,
            // biologicalSensorMarkersLayer
          ]
        });

        //cesium custom param
        cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();
        cesiumView.viewer.camera.setView({
          destination: new Cartesian3(305721.4585559864, -5239510.338378854, 3615622.5459225853),
          orientation: {
            heading: 3.3910351920692143,
            pitch: -0.35343571662519757,
            roll: 0.000021768997500615228
          }
        });
        cesiumView.first = false;

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
