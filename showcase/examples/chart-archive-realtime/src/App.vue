<template>
  <div id="app">
    <div id="container">
    </div>
    <TimeController
        :dataSynchronizer="dataSynchronizer"
        @event='onControlEvent'
        :skipTimeStep="'60s'"
        :replaySpeedStep=0.1
        v-if="dataSynchronizer"
    ></TimeController>
  </div>
</template>
<script>
// @ is an alias to /src.
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import TimeController from 'osh-js/vue/components/TimeController.vue';
import {Mode} from 'osh-js/core/datasource/Mode';
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource.js";
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';


export default {
  components: {
    TimeController
  },
  data: function () {
    return {
      dataSynchronizer: null
    }
  },
  mounted() {

    const tls = true;
    const dsReplaySpeed = 5.0;

    const TEN_MINUTE_MS = 2 * 60 * 1000;
    const minTime = new Date(Date.now() - TEN_MINUTE_MS).toISOString();
    const commonDatasourceOpts = {
      endpointUrl:  'api.georobotix.io/ogc/t18/api',
      protocol: 'mqtt',
      mqttOpts: {
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/t18'
      },
      tls: tls,
      startTime: minTime,
      endTime: (new Date(Date.now()).toISOString()),
      minTime: minTime,
      maxTime: (new Date(Date.now()).toISOString()),
      mode: Mode.REPLAY,
      replaySpeed: dsReplaySpeed,
    };

    const chartDataSource = new ConSysApi('Simulated Weather Sensor - weather', {
          ...commonDatasourceOpts,
          resource: '/datastreams/0tsop3f16nvp8/observations',
          responseFormat: 'application/om+json',
    });

   this.view = new ChartJsView({
         container: 'container',
         layers: [
             new CurveLayer({
             maxValues: 10,
             dataSourceId: chartDataSource.id,
             getValues: (rec, timestamp) => {
               return {
                 x: rec.timestamp || new Date(rec.phenomenonTime).getTime(),
                 y: rec.windSpeed ?? rec.result.windSpeed
               }
             },
             lineColor: 'rgba(0,220,204,0.5)',
             backgroundColor: 'rgba(0,220,204,0.5)',
             fill:true,
             getCurveId:(rec, timestamp) => 2,
             name: 'Wind Speed (m/s)s'
           })
         ],
         css: "chart-view",
         datasetOptions: {
          tension: 0.2 // for 'line'
         },
         refreshRate: 1000
       });

    const dataSynchronizer = new DataSynchronizer({
      replaySpeed: dsReplaySpeed,
      dataSources: [chartDataSource],
      masterTimeRefreshRate: 250
    });

    this.dataSynchronizer = dataSynchronizer;

     },
     methods: {
       onControlEvent(eventName) {
       },
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

   #container {
     height: 80%;
     margin-bottom: 50px;
   }
   #app {
     width: inherit;
     height: inherit;
   }
   </style>
