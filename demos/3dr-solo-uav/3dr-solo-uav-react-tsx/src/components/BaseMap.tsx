import * as React from "react";
import {EllipsoidTerrainProvider, Matrix3,Cartesian3,Cartesian2,Ion } from "cesium";
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import PointMarkerLayer from "osh-js/core/ui/layer/PointMarkerLayer.js";
import CesiumView from "osh-js/core/ui/view/map/CesiumView.js";
import {randomUUID} from "osh-js/core/utils/Utils.js";
import ImageDrapingLayer from "osh-js/core/ui/layer/ImageDrapingLayer.js";
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";

type CustomValue = any;
interface Props {
  propA: CustomValue;
}
class BaseMap extends React.PureComponent {
  readonly token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
      'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';

  divId: string;

  constructor(props: Props) {
    super(props);
    this.divId = randomUUID();
    // @ts-ignore
    window.CESIUM_BASE_URL = './';
  }

  componentDidMount() {
    let videoCanvas = document.getElementById("video-container").getElementsByTagName("canvas")[0];

    let optsPlatform = {
      service: 'SOS',
      tls: true,
      endpointUrl: 'sensiasoft.net/sensorhub/sos',
      offeringID: 'urn:mysos:solo:nav2',
      observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      mode: Mode.REPLAY
    };

    let optsOrientation = {
      service: 'SOS',
      tls: true,
      endpointUrl: 'sensiasoft.net/sensorhub/sos',
      offeringID: 'urn:mysos:solo:nav2',
      observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      mode: Mode.REPLAY

    };

    let optsGimbal = {
      service: 'SOS',
      tls: true,
      endpointUrl: 'sensiasoft.net/sensorhub/sos',
      offeringID: 'urn:mysos:solo:nav2',
      observedProperty: 'http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation',
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      mode: Mode.REPLAY
    }
    // create data source for Android phone GPS
    // @ts-ignore
    let platformLocationDataSource = new SosGetResult('android-GPS', optsPlatform);
    // @ts-ignore
    let platformOrientationDataSource = new SosGetResult('android-Heading', optsOrientation);
    // @ts-ignore
    let gimbalOrientationDataSource = new SosGetResult('android-Heading', optsGimbal);

    // add 3D model marker to Cesium view
    let pointMarkerLayer = new PointMarkerLayer({
      label: "3DR Solo",
      getLocation: {
        // @ts-ignore
        dataSourceIds: [platformLocationDataSource.getId()],
        handler: function (rec) {
          return {
            x: rec.loc.lon,
            y: rec.loc.lat,
            z: rec.loc.alt - 184 // model offset
          };
        }
      },
      getOrientation: {
        // @ts-ignore
        dataSourceIds: [platformOrientationDataSource.getId()],
        handler: function (rec) {
          return {
            heading: rec.attitude.yaw
          };
        }
      },
      icon: "./models/Drone+06B.glb",
      name: 'Solo draping marker'
    });

    // style it with a moving point marker
    let imageDrapingLayer = new ImageDrapingLayer({
      getPlatformLocation: {
        // @ts-ignore
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
        // @ts-ignore
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
        // @ts-ignore
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
    Ion.defaultAccessToken = this.token;
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
    const dataSynchronizer = new DataSynchronizer({
      masterTimeRefreshRate: 250,
      replaySpeed: 1.0,
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      dataSources: [
        platformLocationDataSource,platformOrientationDataSource,gimbalOrientationDataSource
      ]
    });
    dataSynchronizer.connect()
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
