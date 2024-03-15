<template>
  <div id="app">
    <div class="container-last">
      <span id="last-video0"></span>
      <span id="last-video1"></span>
      <span id="last-video2"></span>
      <hr>
      <span id="current-time"></span>
    </div>
    <div id="container-control">
      <div class="container">
        <div class="text video">
          <label for="datasource-video0">Video datasource 0 (Only the 5 first values)</label>
          <textarea id="datasource-video0" disabled></textarea>
        </div>
        <div class="text video">
          <label for="datasource-video1">Video datasource 1 (Only the 5 first values)</label>
          <textarea id="datasource-video1" disabled></textarea>
        </div>
        <div class="text video">
          <label for="datasource-video2">Video datasource 2 (Only the 5 first values)</label>
          <textarea id="datasource-video2" disabled></textarea>
        </div>
        <div class="text error">
          <label for="error">Wrong timestamps (CurrentTimestamp < LastTimestamp)</label>
          <textarea id="error" disabled></textarea>
        </div>
      </div>
      <TimeController
          :dataSynchronizer="dataSynchronizer"
          @event='onControlEvent'
          :skipTimeStep="'1%'"
          v-if="dataSynchronizer"
      ></TimeController>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import TimeController from 'osh-js/vue/components/TimeController.vue';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {EventType} from "osh-js/core/event/EventType";
import {Mode} from "../../../../source/core/datasource/Mode";

export default {
  components: {
    TimeController
  },
  data: function () {
    return {
      dataSynchronizer: null,
      views: [],
      waitForTimeChangedEvent: false,
      lastTimestamp: 0
    }
  },
  mounted() {
    // setup video
    // create data source for UAV camera
    const START_TIME = '2015-12-19T21:04:29.231Z';
    const END_TIME = '2015-12-19T21:09:19.675Z';
    const REPLAY_SPEED = 6.2;

    const videoDataSource0 = new SosGetResult("Video 0", {
      endpointUrl: 'sensiasoft.net/sensorhub/sos',
      offeringID: 'urn:mysos:solo:video2',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      startTime: START_TIME,
      endTime: END_TIME,
      mode: Mode.REPLAY,
      tls: true
    });

    const videoDataSource1 = new SosGetResult("Video 1", {
      endpointUrl: 'sensiasoft.net/sensorhub/sos',
      offeringID: 'urn:mysos:solo:video2',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      startTime: START_TIME,
      endTime: END_TIME,
      mode: Mode.REPLAY,
      tls: true
    });

    const videoDataSource2 = new SosGetResult("Video 2", {
      endpointUrl: 'sensiasoft.net/sensorhub/sos',
      offeringID: 'urn:mysos:solo:video2',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      startTime: START_TIME,
      endTime: END_TIME,
      mode: Mode.REPLAY,
      tls: true
    });

    this.dataSynchronizer = new DataSynchronizer({
      replaySpeed: REPLAY_SPEED,
      startTime: START_TIME,
      endTime: END_TIME,
      dataSources: [videoDataSource0, videoDataSource1, videoDataSource2]
    })

  // connects each DataSource
      this.dataSynchronizer.connect();
    // setTimeout(() => videoDataSource0.connect(),700);
    // setTimeout(() => videoDataSource1.connect(),1800);
    // setTimeout(() => videoDataSource2.connect(),1900);

  // Data are received through Broadcast channel in a separate thread.
  // When you create a View object, it automatically subscribes to the corresponding datasource channel(s).
  // If you don't have view, or don't need, you can directly subscribe to the channel

    const video0DivElement = document.getElementById('datasource-video0');
    const video1DivElement = document.getElementById('datasource-video1');
    const video2DivElement = document.getElementById('datasource-video2');
    const errorDivElement = document.getElementById('error');

    const lastVideo0DivElement = document.getElementById('last-video0');
    const lastVideo1DivElement = document.getElementById('last-video1');
    const lastVideo2DivElement = document.getElementById('last-video2');
    const currentTimeDivElement = document.getElementById('current-time');

    let video0Count = 0;
    let video1Count = 0;
    let video2Count = 0;

    function displayVideo0(values) {
      video0Count += values.length;
      video0DivElement.value = video0Count;

      lastVideo0DivElement.innerText = new Date(values[values.length - 1].data.timestamp).toISOString() + ' - Video 0';

      video0DivElement.scrollTop = video0DivElement.scrollHeight;
    }

    function displayVideo1(values) {
      video1Count += values.length;
      video1DivElement.value = video1Count;

      lastVideo1DivElement.innerText = new Date(values[values.length - 1].data.timestamp).toISOString() + ' - Video 1';

      video1DivElement.scrollTop = video1DivElement.scrollHeight;
    }

    function displayVideo2(values) {
      video2Count += values.length;
      video2DivElement.value = video2Count;

      lastVideo2DivElement.innerText = new Date(values[values.length - 1].data.timestamp).toISOString() + ' - Video 2';
      video2DivElement.scrollTop = video2DivElement.scrollHeight;
    }

    let lastTimestamp;
    function displayError(timestamp) {
      if(timestamp < lastTimestamp) {
        errorDivElement.value += new Date(timestamp).toISOString() + ' < ' + new Date(lastTimestamp).toISOString()+ '\n';
      }
      lastTimestamp = timestamp;

    }

    videoDataSource0.subscribe((message) => displayVideo0(message.values), [EventType.DATA])
    videoDataSource1.subscribe((message) => displayVideo1(message.values), [EventType.DATA])
    videoDataSource2.subscribe((message) => displayVideo2(message.values), [EventType.DATA])
    this.dataSynchronizer.subscribe((message) => displayError(message.timestamp), [EventType.TIME]);

  },
  methods: {
    onControlEvent(eventName) {
      if (eventName === 'time-changed') {
        this.waitForTimeChangedEvent = true;
        this.lastTimestamp = 0;
      }
    }
  }
};
</script>
<style>
body, html {
  overflow-x: hidden;
  margin: 0;
  padding: 0px;
  background: aliceblue;
  width: 100%;
  height: 100%;
}

#container > div {
  margin: 5px;
  width: 45%;
}

#app {
  width: inherit;
  height: inherit;
  padding: 20px;
}

#container-control {
  display: flex;
  flex-direction: column;
  height: calc(100% - 96px);
  justify-content: space-between;
}

textarea {
  resize: none;
  height: 100%;
  overflow: scroll;
  white-space: pre;
  overflow-wrap: normal;
}

textarea:invalid {
  border: 2px dashed red;
}

textarea:valid {
  border: 2px solid lime;
}

.text {
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 50%;
}

.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  height: 100%;
}

label {
  font-weight: bold;
  padding: 10px;
}

.container-last {
  display: flex;
  flex-direction: column;
  border: solid 1px red;
  width: 280px;
  padding: 10px;
  margin: auto;
  align-content: center;
  height: 96px;
}

.error, .error > textarea {
  color: red;
}
</style>
