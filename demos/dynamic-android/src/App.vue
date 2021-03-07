<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <Map ref="map"></Map>
        <VideoContainer
            :dataSources="videos"
            v-if="videos.length > 0"
        ></VideoContainer>
      </v-app>
    </v-app>
  </div>
</template>

<script>

import Map from './components/Map.vue';
import './assets/app.css';
import VideoContainer from "./components/VideoContainer";
import Worker from './workers/check.offering.worker.js';
import SosGetResultJson from "core/datasource/SosGetResultJson.js";
import SosGetResultVideo from "core/datasource/SosGetResultVideo.js";
import SosGetResultVideoWithRoll from "core/datasource/SosGetResultVideoWithRoll.js";
import DataSynchronizer from 'core/timesync/DataSynchronizer.js';

export default {
  name: 'App',
  components: {
    VideoContainer,
    Map
  },
  props: {
    source: String,
  },
  data: function () {
    return {
      videos: [],
      map: [],
      dataSynchronizers: {}
    }
  },
  mounted() {
    // start observing the server to check offering check
    let worker = new Worker();
    worker.postMessage({
      url: "http://" + process.env.HOST,
      sos: "sos",
      baseUrl: "sensorhub"
    });

    worker.onmessage = (event) => {
      for (let item of event.data) {
        if (item.online) {
          this.addItem(item);
        } else {
          this.removeItem(item);
        }
      }
    }
  },
  methods: {
    addItem(item) {
      const dataSources = [];
      const mapItem = {};

      // if(item.startTime !== 'now') {
      //   item.startTime = '2020-08-13T19:28:50.052Z';
      // }
      if(item.location) {
        mapItem['location'] = new SosGetResultJson("android-GPS", {
          protocol: "ws",
          service: "SOS",
          endpointUrl: process.env.HOST + "/sensorhub/sos",
          offeringID: item.id,
          observedProperty: "http://sensorml.com/ont/swe/property/Location",
          startTime: item.startTime,
          endTime: item.endTime,
          bufferingTime: 0,
          timeOut: 1000,
          replaySpeed: 1
        });
        dataSources.push(mapItem['location']);
        if (item.heading) {
          mapItem['heading'] = new SosGetResultJson("android-Att", {
            protocol: "ws",
            service: "SOS",
            endpointUrl: process.env.HOST + "/sensorhub/sos",
            offeringID: item.id,
            observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
            startTime: item.startTime,
            endTime: item.endTime,
            bufferingTime: 0,
            timeShift: 0,
            timeOut: 1000,
            replaySpeed: 1
          });
          dataSources.push(mapItem['heading']);
        }
      }
      if(item.video) {
        let videoProperties = {
          protocol: "ws",
          service: "SOS",
          endpointUrl: process.env.HOST + "/sensorhub/sos",
          offeringID: item.id,
          observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
          startTime: item.startTime,
          endTime: item.endTime,
          bufferingTime: 0,
          timeOut: 1000,
          replaySpeed: 1,
          reconnectTimeout: 6000,
          codec: item.compression,
          // encoding: {
          //   scale: 0.5,
          //   bitrate: 60 * 8
          // },
          // responseFormat: 'video/H265'
        };
        let videoDataSource;
        if (item.roll) {
          videoDataSource = new SosGetResultVideoWithRoll(item.name, videoProperties);
        } else {
          videoDataSource = new SosGetResultVideo(item.name, videoProperties);
        }
        dataSources.push(videoDataSource);
        // add to videos
        this.videos.push(videoDataSource);
      }

      this.dataSynchronizers[item.id] = new DataSynchronizer({
        dataSources: dataSources
      });

      if('location' in mapItem) {
        this.map.push(mapItem);
        this.$refs['map'].add(mapItem);
      }

      this.dataSynchronizers[item.id].connect();
    },
    removeItem(item) {
      if (item.id in this.dataSynchronizers) {
        console.log('Remove datasync', item.id)
        // stop all others DS
        this.dataSynchronizers[item.id].terminate();
        // remove from map
        delete this.dataSynchronizers[item.id];
      }
      // update videos to remove the offline ones
      let index = 0;
      for(let videoDataSource of this.videos) {
        if(videoDataSource.properties.offeringID === item.id) {
          videoDataSource.terminate()
          this.videos.splice(index,1);
        }
        index++;
      }

      // update location/header to remove the offline ones
      index = 0;
      for(let mapItem of this.map) {
        let remove = false;

        if('location' in mapItem && mapItem['location'].properties.offeringID === item.id) {
          mapItem['location'].terminate();
          remove = true;
        }
        if('heading' in mapItem && mapItem['heading'].properties.offeringID === item.id) {
          mapItem['heading'].terminate();
          remove = true;
        }
        if(remove) {
            this.$refs['map'].remove(mapItem);
            this.map.splice(index, 1);
            break;
        }
        index++;
      }
    }
  }
}
</script>

<style>

</style>
