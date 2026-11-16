<template>
  <div id="app">
    <div id="container">
    </div>
    <TimeController
        :dataSynchronizer="dataSynchronizer"
        @event='onControlEvent'
        :skipTimeStep="'60s'" 
        :replaySpeedStep=0.1
        v-if="dataSource"
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


export default {
  components: {
    TimeController
  },
  data: function () {
    return {
      dataSource: null,
      view: null
    }
  },
  mounted() {

    const tls = true;

    const dsReplaySpeed = 1.0;
    
    const commonDatasourceOpts = {
      endpointUrl:  'api.georobotix.io/ogc/t18/api',
      protocol: 'mqtt',
      mqttOpts: {
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/t18'
      },
      tls: tls,
      startTime: (new Date(Date.now() - 60 * 1000 * 60 * 24).toISOString()),
      endTime: (new Date(Date.now()).toISOString()),
      minTime: (new Date(Date.now() - 60 * 1000 * 60 * 24).toISOString()),
      maxTime: (new Date(Date.now()).toISOString()),
      mode: Mode.REAL_TIME,
      replaySpeed: dsReplaySpeed,
    };

    const chartDataSource = new ConSysApi('Simulated Weather Sensor - weather', {
          ...commonDatasourceOpts,
          resource: '/datastreams/0tsop3f16nvp8/observations',
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

    chartDataSource.connect();

    this.dataSource = chartDataSource;

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
