import * as React from "react";
import {EllipsoidTerrainProvider, Matrix3,Cartesian3,Cartesian2,Ion } from "cesium";
import PointMarkerLayer from "osh/core/ui/layer/PointMarkerLayer.js";
import PolygonLayer from "osh/core/ui/layer/PolygonLayer.js";
import CoPlanarPolygonLayer from "osh/core/ui/layer/CoPlanarPolygonLayer.js";

import CesiumView from "osh/core/ui/view/map/CesiumView.js";
import {randomUUID} from "osh/core/utils/Utils.js";
import ImageDrapingLayer from "osh/core/ui/layer/ImageDrapingLayer.js";

window.CESIUM_BASE_URL = './';

class BaseMap extends React.Component {
  constructor(props) {
    super(props);
    this.divId = randomUUID();
    this.platformLocationDataSource = props.platformLocationDataSource;
    this.platformOrientationDataSource = props.platformOrientationDataSource;
    this.gimbalOrientationDataSource = props.gimbalOrientationDataSource;
  }

  componentDidMount() {
    let videoCanvas = document.getElementById("video-container").getElementsByTagName("canvas")[0];

    // add 3D model marker to Cesium view
    let pointMarkerLayer = new PointMarkerLayer({
      dataSourceIds: [this.platformLocationDataSource.id, this.platformOrientationDataSource.id],
      label: "3DR Solo",
      getLocation : {
        dataSourceIds : [this.platformLocationDataSource.getId()],
        handler : function(rec) {
          return {
            x : rec.loc.lon,
            y : rec.loc.lat,
            z : rec.loc.alt - 184 // model offset
          };
        }
      },
      getOrientation : {
        dataSourceIds : [this.platformOrientationDataSource.getId()],
        handler : function(rec) {
          return {
            heading : rec.attitude.yaw
          };
        }
      },
      icon: "./models/Drone+06B.glb",
      iconScale: 12.0,
      name: 'Solo draping marker'
    });

    let polygonLayer = new PolygonLayer({
      dataSourceId: this.platformLocationDataSource.id,
      getVertices: (rec) => {
          return [
              rec.loc.lon-0.001,
              rec.loc.lat,
              rec.loc.lon,
              rec.loc.lat+0.001,
              rec.loc.lon+0.001,
              rec.loc.lat,
              rec.loc.lon,
              rec.loc.lat-0.001,
              rec.loc.lon-0.001,
              rec.loc.lat,
          ]
      },
      getPolygonId: (rec) =>  "my-id",
      color: 'rgba(0,157,255,0.5)',
      opacity: 0.5,
      outlineWidth: 1,
      outlineColor: 'rgba(255,169,17,0.5)',
    });

    let coplanarPolygonLayer = new CoPlanarPolygonLayer({
      dataSourceId: this.platformLocationDataSource.id,
      getVertices: (rec) => {
        // (lon, lat, alt)
        let p0 = [rec.loc.lon-0.001,rec.loc.lat,0];
        let p1 = [rec.loc.lon, rec.loc.lat+0.001,0];
        let p2 = [rec.loc.lon+0.001,rec.loc.lat,0];
        let p3 = [rec.loc.lon,rec.loc.lat-0.001,0];
        let c = [rec.loc.lon, rec.loc.lat, rec.loc.alt-180];

        return [...p0,...p1,...p2,...p3,...p0,...c,]
      },
      getPolygonId: (rec) =>  "my-id",
      color: 'rgba(233,244,255,0.2)',
      opacity: 0.5,
      outlineWidth: 1,
      outlineColor: 'rgba(255,169,17,0.5)',
    });

    // style it with a moving point marker
    let imageDrapingLayer = new ImageDrapingLayer({
      dataSourceIds: [this.platformLocationDataSource.id, this.platformOrientationDataSource.id, this.gimbalOrientationDataSource.id],
      getPlatformLocation: {
        dataSourceIds: [this.platformLocationDataSource.getId()],
        handler: function (rec) {
          return {
            x: rec.loc.lon,
            y: rec.loc.lat,
            z: rec.loc.alt - 184
          };
        }
      },
      getPlatformOrientation: {
        dataSourceIds: [this.platformOrientationDataSource.getId()],
        handler: function (rec) {
          return {
            heading : rec.attitude.yaw,
            pitch: rec.attitude.pitch,
            roll: rec.attitude.roll
          };
        }
      },
      getGimbalOrientation: {
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
      icon: 'images/car-location.png',
      iconAnchor: [16, 40],
      imageSrc: videoCanvas,
      name: 'Solo draping'
    });

    // create Cesium view
    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
        'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';

    let cesiumView = new CesiumView({
      container: this.divId,
      layers: [pointMarkerLayer, polygonLayer, coplanarPolygonLayer, imageDrapingLayer],
    });

    cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();
    cesiumView.viewer.scene.logarithmicDepthBuffer = false;
    cesiumView.viewer.camera.setView({
      destination : Cartesian3.fromDegrees(-86.5812,34.6904,1000)
    });

    // select bing maps as default imagery
    const baseLayerPickerViewModel = cesiumView.viewer.baseLayerPicker.viewModel;
    baseLayerPickerViewModel.selectedImagery = baseLayerPickerViewModel.imageryProviderViewModels[0];
  }

  render() {
    const mystyle = {
      width: "100%",
      height: "100%",
    };
    return <div id={this.divId} style={mystyle}></div>;
  }
}

export default BaseMap;
