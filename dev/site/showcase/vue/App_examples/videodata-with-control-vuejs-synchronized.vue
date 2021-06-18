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
import SosGetResultVideo from 'osh-js/core/datasource/SosGetResultVideo.js';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {DATASOURCE_DATA_TOPIC, TIME_SYNCHRONIZER_TOPIC} from "osh-js/core/Constants";
import {EventType} from "osh-js/core/event/EventType";

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
    const BUFFERING_TIME = 1000;
    const TIMEOUT = 500;

    const videoDataSource0 = new SosGetResultVideo("Video 0", {
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
      offeringID: 'urn:mysos:solo:video2',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      startTime: START_TIME,
      endTime: END_TIME,
      replaySpeed: REPLAY_SPEED,
      bufferingTime: BUFFERING_TIME,
      timeOut: TIMEOUT
    });

    const videoDataSource1 = new SosGetResultVideo("Video 1", {
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
      offeringID: 'urn:mysos:solo:video2',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      startTime: START_TIME,
      endTime: END_TIME,
      replaySpeed: REPLAY_SPEED,
      bufferingTime: BUFFERING_TIME,
      timeOut: TIMEOUT
    });

    const videoDataSource2 = new SosGetResultVideo("Video 2", {
      protocol: 'ws',
      service: 'SOS',
      endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
      offeringID: 'urn:mysos:solo:video2',
      observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
      startTime: START_TIME,
      endTime: END_TIME,
      replaySpeed: REPLAY_SPEED,
      bufferingTime: BUFFERING_TIME,
      timeOut: TIMEOUT
    });

    this.dataSynchronizer = new DataSynchronizer({
      replaySpeed: REPLAY_SPEED,
      timerResolution: 5,
      dataSources: [videoDataSource0, videoDataSource1, videoDataSource2]
    })

  // connects each DataSource
  //     this.dataSynchronizer.connect();
    setTimeout(() => videoDataSource0.connect(),700);
    setTimeout(() => videoDataSource1.connect(),1800);
    setTimeout(() => videoDataSource2.connect(),1900);

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

      lastVideo0DivElement.innerText = new Date(values[values.length - 1].timeStamp).toISOString() + ' - Video 0';

      video0DivElement.scrollTop = video0DivElement.scrollHeight;
    }

    function displayVideo1(values) {
      video1Count += values.length;
      video1DivElement.value = video1Count;

      lastVideo1DivElement.innerText = new Date(values[values.length - 1].timeStamp).toISOString() + ' - Video 1';

      video1DivElement.scrollTop = video1DivElement.scrollHeight;
    }

    function displayVideo2(values) {
      video2Count += values.length;
      video2DivElement.value = video2Count;

      lastVideo2DivElement.innerText = new Date(values[values.length - 1].timeStamp).toISOString() + ' - Video 2';
      video2DivElement.scrollTop = video2DivElement.scrollHeight;
    }

    let errorCount = 0;
    const that = this;

    function displayError(dataSourceId, timestamp) {
      if (timestamp < that.lastTimestamp) {
        // get DS name
        let name = '';
        for (let i = 0; i < that.dataSynchronizer.dataSources.length; i++) {
          if (that.dataSynchronizer.dataSources[i].id === dataSourceId) {
            name = `(${that.dataSynchronizer.dataSources[i].name})`;
          }
        }
        errorCount++;
        if (errorCount % 200 === 0) {
          errorDivElement.value = new Date(timestamp).toISOString() + ' < ' + new Date(that.lastTimestamp).toISOString() + ' ' + name + '\n';
        } else {
          errorDivElement.value += new Date(timestamp).toISOString() + ' < ' + new Date(that.lastTimestamp).toISOString() + ' ' + name + '\n';
        }
      } else {
        currentTimeDivElement.innerText = new Date(timestamp).toISOString() + ' - Current';
        that.lastTimestamp = timestamp;
      }
      errorDivElement.scrollTop = errorDivElement.scrollHeight;

    }

    const video0BroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + videoDataSource0.id);
    const video1BroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + videoDataSource1.id);
    const video2BroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + videoDataSource2.id);

    const syncTimeBroadcastChannel = new BroadcastChannel(TIME_SYNCHRONIZER_TOPIC + this.dataSynchronizer.id);

    video0BroadcastChannel.onmessage = (message) => {
      if (message.data.type === 'data') {
        displayVideo0(message.data.values);
      }
    }

    video1BroadcastChannel.onmessage = (message) => {
      if (message.data.type === 'data') {
        displayVideo1(message.data.values);
      }
    }

    video2BroadcastChannel.onmessage = (message) => {
      if (message.data.type === 'data') {
        displayVideo2(message.data.values);
      }
    }

    syncTimeBroadcastChannel.onmessage = (message) => {
      if(that.waitForTimeChangedEvent) {
        if(message.data.type ===  EventType.DATA) {
          console.warn('Skip data, old version');
        } else if(message.data.type ===  EventType.TIME_CHANGED) {
          that.waitForTimeChangedEvent = false;
        }
        return;
      }
      displayError(message.data.dataSourceId, message.data.timestamp);
    }

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
