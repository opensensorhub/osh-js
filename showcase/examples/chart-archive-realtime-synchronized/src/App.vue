<template>
  <div id="app">
    <div id="container">
    </div>
    <TimeController
        :dataSynchronizer="dataSynchronizer"
        @event='onControlEvent'
        :skipTimeStep="'60s'"
        :trackRealtime="false"
        v-if="dataSynchronizer"
    ></TimeController>
  </div>
</template>
<script>
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import TimeController from 'osh-js/vue/components/TimeController.vue';

import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {Mode} from 'osh-js/core/datasource/Mode';
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
      mode: Mode.REPLAY,
      replaySpeed: dsReplaySpeed,
      prefetchBatchDuration: 10000,
      prefetchBatchSize: 250
    };

    const chartDataSource1 = new ConSysApi('Simulated Weather Sensor - weather', {
      ...commonDatasourceOpts,
      resource: '/datastreams/0tsop3f16nvp8/observations',
      responseFormat: 'application/om+json',
    });


    this.view = new ChartJsView({
      container: 'container',
      layers: [
        new CurveLayer({
          maxValues: 10,
          dataSourceId: chartDataSource1.id,
          getValues: (rec, timestamp) => {
            return {
              x: rec.timestamp,
              y: rec.result.temperature
            }
          },
          lineColor: 'rgba(0,220,204,0.5)',
          backgroundColor: 'rgba(0,220,204,0.5)',
          fill:true,
          getCurveId:(rec, timestamp) => 2,
          name: 'Temperature (°)'
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
      dataSources: [chartDataSource1]
    })

    dataSynchronizer.connect();
    // connects each DataSource
    this.dataSynchronizer = dataSynchronizer;

    let lastTime = Date.now();
    setInterval(() => {
      lastTime += 1000;
      dataSynchronizer.setMaxTime(new Date(lastTime).toISOString());
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
