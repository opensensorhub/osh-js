import * as React from "react";
import {EllipsoidTerrainProvider, Matrix3,Cartesian3,Cartesian2,Ion } from "cesium";
import SweJson from "osh/datareceiver/SweJson.js";
import PointMarker from "osh/ui/styler/PointMarker.js";
import CesiumView from "osh/ui/view/map/CesiumView.js";
import {randomUUID} from "osh/utils/Utils.js";
import ImageDraping from "osh/ui/styler/ImageDraping.js";

window.CESIUM_BASE_URL = './';

class BaseMap extends React.Component {
  constructor(props) {
    super(props);
    this.divId = randomUUID();
  }

  componentDidMount() {
    let videoCanvas = document.getElementById("video-container").getElementsByTagName("canvas")[0];

    // create data source for Android phone GPS
    let platformLocationDataSource = new SweJson('android-GPS', {
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
      offeringID: 'urn:mysos:solo:nav2',
      observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      replaySpeed: 1
    });

    let platformOrientationDataSource = new SweJson('android-Heading', {
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
      offeringID: 'urn:mysos:solo:nav2',
      observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
      startTime: '2015-12-19T21:04:29.231Z',
      endTime: '2015-12-19T21:09:19.675Z',
      replaySpeed: 1
    });

    let gimbalOrientationDataSource = new SweJson('android-Heading', {
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
    let pointMarker = new PointMarker({
      label: "3DR Solo",
      locationFunc : {
        dataSourceIds : [platformLocationDataSource.getId()],
        handler : function(rec) {
          return {
            x : rec.loc.lon,
            y : rec.loc.lat,
            z : rec.loc.alt - 184 // model offset
          };
        }
      },
      orientationFunc : {
        dataSourceIds : [platformOrientationDataSource.getId()],
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
        dataSourceIds: [platformLocationDataSource.getId()],
        handler: function (rec) {
          return {
            x: rec.loc.lon,
            y: rec.loc.lat,
            z: rec.loc.alt - 184
          };
        }
      },
      platformOrientationFunc: {
        dataSourceIds: [platformOrientationDataSource.getId()],
        handler: function (rec) {
          return {
            heading : rec.attitude.yaw,
            pitch: rec.attitude.pitch,
            roll: rec.attitude.roll
          };
        }
      },
      gimbalOrientationFunc: {
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
      imageSrc: videoCanvas
    });

    // create Cesium view
    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MjczNTA4NS1jNjBhLTQ3OGUtYTQz' +
        'Ni01ZjcxOTNiYzFjZGQiLCJpZCI6MzIzODMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTY4OTU3MjB9.hT6fWdvIqu4GIHR7' +
        '2WfIX0QHiZcOjVaXI92stjDh4fI';
    let cesiumView = new CesiumView(this.divId,
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
