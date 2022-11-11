import React from 'react';
import './App.css';
import BaseMap from "./components/BaseMap";
import {SoloVideoComponent} from "./components/SoloVideo";
import DataSynchronizer from "osh/core/timesync/DataSynchronizer";
import SosGetResult from "osh/core/datasource/sos/SosGetResult.datasource.js";
import {Mode} from "osh/core/datasource/Mode";

function App() {
    let START_TIME = '2015-12-19T21:04:29.231Z';
    let END_TIME = '2015-12-19T21:09:19.675Z';

    // create data source for Android phone GPS
    let platformLocationDataSource = new SosGetResult('android-GPS', {
        endpointUrl: 'sensiasoft.net/sensorhub/sos',
        offeringID: 'urn:mysos:solo:nav2',
        observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
        startTime: START_TIME,
        endTime: END_TIME,
        mode: Mode.REPLAY,
        tls: true
    });

    let platformOrientationDataSource = new SosGetResult('android-Heading', {
        endpointUrl: 'sensiasoft.net/sensorhub/sos',
        offeringID: 'urn:mysos:solo:nav2',
        observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
        startTime: START_TIME,
        endTime: END_TIME,
        mode: Mode.REPLAY,
        tls: true
    });

    let gimbalOrientationDataSource = new SosGetResult('android-Heading', {
        endpointUrl: 'sensiasoft.net/sensorhub/sos',
        offeringID: 'urn:mysos:solo:nav2',
        observedProperty: 'http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation',
        startTime: START_TIME,
        endTime: END_TIME,
        mode: Mode.REPLAY,
        tls: true
    });

    // create data source for UAV camera
    let videoDataSource = new SosGetResult("drone-Video", {
        endpointUrl: 'sensiasoft.net/sensorhub/sos',
        offeringID: 'urn:mysos:solo:video2',
        observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
        startTime: '2015-12-19T21:04:29.231Z',
        endTime: '2015-12-19T21:09:19.675Z',
        mode: Mode.REPLAY,
        tls: true
    });

    const dataSynchronizer = new DataSynchronizer({
        masterTimeRefreshRate: 250,
        replaySpeed: 1.0,
        startTime: START_TIME,
        endTime: END_TIME,
        dataSources: [platformLocationDataSource, platformOrientationDataSource, gimbalOrientationDataSource, videoDataSource]
    });
  const component = (
    <div className="App">
      <SoloVideoComponent
          videoDataSource={videoDataSource}
      />
      <BaseMap
          platformLocationDataSource={platformLocationDataSource}
          platformOrientationDataSource={platformOrientationDataSource}
          gimbalOrientationDataSource={gimbalOrientationDataSource}
      />
    </div>
  );
    // start streaming
    dataSynchronizer.connect();
    return component;
}

export default App;
