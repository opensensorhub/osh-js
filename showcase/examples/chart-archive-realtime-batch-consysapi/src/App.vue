<template>
  <div id="app">
    <div id="container"></div>
    <TimeController
        :dataSource="dataSource"
        @event='onControlEvent'
        :skipTimeStep="'60s'"
        v-if="dataSource"
    ></TimeController>
  </div>
</template>
<script>
// @ is an alias to /src hi
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import TimeController from 'osh-js/vue/components/TimeController.vue';
import {isDefined} from 'osh-js/core/utils/Utils';
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "../../../../source/core/timesync/DataSynchronizer";
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
      endpointUrl:  'api.georobotix.io/ogc/demo1/api',
      protocol: 'mqtt',
      mqttOpts: {
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/demo1'
      },
      tls: tls,
      startTime: (new Date(Date.now() - 60 * 1000 * 60 * 1).toISOString()),
      endTime: (new Date(Date.now()).toISOString()),
      minTime: (new Date(Date.now() - 60 * 1000 * 60 * 1).toISOString()),
      maxTime: (new Date(Date.now()).toISOString()),
      mode: Mode.BATCH,
      replaySpeed: dsReplaySpeed,
      prefetchBatchDuration: 10000,
      prefetchBatchSize: 250
    };

    const chartDataSource = new ConSysApi('Simulated Weather Sensor - weather', {
          ...commonDatasourceOpts,
          resource: '/datastreams/vadu2mqtbnrsa/observations',
          responseFormat: 'application/swe+json',
    });

// #region snippet_curve_layer
    let windSpeedLayerCurve = new CurveLayer({
      dataSourceId: chartDataSource.id,
      getValues: (rec, timestamp) => {
        return {
          x: timestamp,
          y: rec.windSpeed
        }
      },
      backgroundColor: 'rgba(141,242,246, 0.5)',
      lineColor: 'rgba(183,183,183,0.83)',
      fill: true,
      name: 'Wind Speed (m/s)',
      maxValues: 2500000
    });
// #endregion snippet_curve_layer

// show it in video view
    this.view = new ChartJsView({
      container: 'container',
      layers: [windSpeedLayerCurve],
      css: "chart-view",
      datasetOptions: {
       tension: 0.2 // for 'line'
      }
    });

// start streaming
    chartDataSource.connect();
    this.dataSource = chartDataSource;

  },
  methods: {
    onControlEvent(eventName) {
      if(eventName === 'forward' || eventName === 'backward' || eventName === 'end'
          || eventName === 'replaySpeed'
          || (eventName === 'play' && (!isDefined(this.dataSource.properties.replaySpeed)))) {
        this.view.reset();
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

#container {
  height: 80%;
  margin-bottom: 50px;
}
#app {
  width: inherit;
  height: inherit;
}
</style>
