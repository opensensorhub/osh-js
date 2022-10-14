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
// @ is an alias to /src
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import TimeController from 'osh-js/vue/components/TimeController.vue';
import {isDefined} from 'osh-js/core/utils/Utils';
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "../../../../source/core/timesync/DataSynchronizer";

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

    let chartDataSource = new SosGetResult("weather", {
      endpointUrl: "sensiasoft.net/sensorhub/sos",
      offeringID: "urn:mysos:offering04",
      observedProperty: "http://sensorml.com/ont/swe/property/Weather",
      startTime: (new Date(Date.now() - 60 * 1000 * 60 * 1).toISOString()),
      endTime: (new Date(Date.now()).toISOString()),
      minTime: (new Date(Date.now() - 60 * 1000 * 60 * 1).toISOString()),
      maxTime: (new Date(Date.now()).toISOString()),
      mode: Mode.BATCH,
      tls: true
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
      name: 'Wind Speed (m/s)'
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
