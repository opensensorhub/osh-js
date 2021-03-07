import * as React from "react";
import {EllipsoidTerrainProvider, Matrix3,Cartesian3,Cartesian2,Ion } from "cesium";
import SosGetResultJson from "osh/core/datasource/SosGetResultJson.js";
import PointMarkerLayer from "osh/core/ui/layer/PointMarkerLayer.js";
import CesiumView from "osh/core/ui/view/map/CesiumView.js";
import {randomUUID} from "osh/core/utils/Utils.js";
import ImageDrapingLayer from "osh/core/ui/layer/ImageDrapingLayer.js";

window.CESIUM_BASE_URL = './';

class BaseMap extends React.Component {
  constructor(props) {
    super(props);
    this.divId = randomUUID();
  }

  componentDidMount() {
    let videoCanvas = document.getElementById("video-container").getElementsByTagName("canvas")[0];

    // create data source for Android phone GPS
    let platformLocationDataSource = new SosGetResultJson('android-GPS', {
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
      offeringID: 'urn:mysos:solo:nav2',
      observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      replaySpeed: 1
    });

    let platformOrientationDataSource = new SosGetResultJson('android-Heading', {
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
      offeringID: 'urn:mysos:solo:nav2',
      observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      replaySpeed: 1
    });

    let gimbalOrientationDataSource = new SosGetResultJson('android-Heading', {
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
      offeringID: 'urn:mysos:solo:nav2',
      observedProperty: 'http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation',
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      replaySpeed: 1
    });

// add 3D model marker to Cesium view
    let pointMarkerLayer = new PointMarkerLayer({
      label: "3DR Solo",
      getLocation : {
        dataSourceIds : [platformLocationDataSource.getId()],
        handler : function(rec) {
          return {
            x : rec.loc.lon,
            y : rec.loc.lat,
            z : rec.loc.alt - 184 // model offset
          };
        }
      },
      getOrientation : {
        dataSourceIds : [platformOrientationDataSource.getId()],
        handler : function(rec) {
          return {
            heading : rec.attitude.yaw
          };
        }
      },
      icon: "./models/Drone+06B.glb",
      name: 'Solo draping marker'
    });

    // style it with a moving point marker
    let imageDrapingLayer = new ImageDrapingLayer({
      getPlatformLocation: {
        dataSourceIds: [platformLocationDataSource.getId()],
        handler: function (rec) {
          return {
            x: rec.loc.lon,
            y: rec.loc.lat,
            z: rec.loc.alt - 184
          };
        }
      },
      getPlatformOrientation: {
        dataSourceIds: [platformOrientationDataSource.getId()],
        handler: function (rec) {
          return {
            heading : rec.attitude.yaw,
            pitch: rec.attitude.pitch,
            roll: rec.attitude.roll
          };
        }
      },
      getGimbalOrientation: {
        dataSourceIds: [gimbalOrientationDataSource.getId()],
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
    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MjczNTA4NS1jNjBhLTQ3OGUtYTQz' +
        'Ni01ZjcxOTNiYzFjZGQiLCJpZCI6MzIzODMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTY4OTU3MjB9.hT6fWdvIqu4GIHR7' +
        '2WfIX0QHiZcOjVaXI92stjDh4fI';
    let cesiumView = new CesiumView({
      container: this.divId,
      layers: [pointMarkerLayer, imageDrapingLayer],
    });

    cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();
    cesiumView.viewer.scene.logarithmicDepthBuffer = false;
    cesiumView.viewer.camera.setView({
      destination : Cartesian3.fromDegrees(-86.5812,34.6904,1000)
    });

    // select bing maps as default imagery
    const baseLayerPickerViewModel = cesiumView.viewer.baseLayerPicker.viewModel;
    baseLayerPickerViewModel.selectedImagery = baseLayerPickerViewModel.imageryProviderViewModels[0];


// start streaming
    platformLocationDataSource.connect();
    platformOrientationDataSource.connect();
    gimbalOrientationDataSource.connect();
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
