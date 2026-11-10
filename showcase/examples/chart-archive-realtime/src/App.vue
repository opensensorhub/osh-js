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
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {isDefined} from "osh-js/core/utils/Utils";
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource.js";


export default {
  components: {
    TimeController
  },
  data: function () {
    return {
      dataSynchronizer: null,
      view: null
    }
  },
  mounted() {

    const tls = true;

    const dsReplaySpeed = 1.0;

    const startTime = (new Date(Date.now() - 60 * 1000 * 2).toISOString());
    let endTime = (new Date(Date.now()).toISOString());

    const commonDatasourceOpts = {
      endpointUrl:  'api.georobotix.io/ogc/demo1/api',
      protocol: 'mqtt',
      mqttOpts: {
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/demo1'
      },
      tls: tls,
      startTime: startTime,
      endTime: endTime,
      mode: Mode.REPLAY,
      replaySpeed: dsReplaySpeed,
      prefetchBatchDuration: 10000,
      prefetchBatchSize: 250
    };

    const chartDataSource = new ConSysApi('Simulated Weather Sensor - weather', {
          ...commonDatasourceOpts,
          resource: '/datastreams/vadu2mqtbnrsa/observations',
          responseFormat: 'application/swe+json',
    });

   this.view = new ChartJsView({
         container: 'container',
         layers: [
             new CurveLayer({
             maxValues: 1000,
             dataSourceId: chartDataSource.id,
             getValues: (rec, timestamp) => {
               return {
                 x: rec.timestamp,
                 y: rec.windSpeed
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

   // start streaming
       const dataSynchronizer = new DataSynchronizer({
         replaySpeed: dsReplaySpeed,
         dataSources: [chartDataSource]
       })

       dataSynchronizer.connect();
       // connects each DataSource
       this.dataSynchronizer = dataSynchronizer;

       setInterval(() => {
         dataSynchronizer.setMaxTime(new Date().toISOString());
       }, 2000);
     },
     methods: {
       onControlEvent(eventName) {
         if(eventName === 'forward' || eventName === 'backward' || eventName === 'end'
             || eventName === 'replaySpeed'
             || (eventName === 'play')) {
           this.view.reset();
         }
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
