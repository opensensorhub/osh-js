<template>
  <div id="app">
    <div id="container">
    </div>
    <TimeController
        :dataSynchronizer="dataSynchronizer"
        @event='onControlEvent'
        :skipTimeStep="'60s'"
        :parseTime='parseTime'
        v-if="dataSynchronizer"
    ></TimeController>
  </div>
</template>
<script>
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import TimeController from 'osh-js/vue/components/TimeController.vue';

import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {isDefined} from 'osh-js/core/utils/Utils';
import {Mode} from 'osh-js/core/datasource/Mode';

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

    let startTime = (new Date(Date.now() - 60 * 1000 * 60 * 24).toISOString());
    let endTime = (new Date(Date.now()).toISOString());

    const opts = {
      endpointUrl: "sensiasoft.net/sensorhub/sos",
      offeringID: "urn:mysos:offering04",
      observedProperty: "http://sensorml.com/ont/swe/property/Weather",
      startTime: startTime,
      endTime: endTime,
      minTime: (new Date(Date.now() - 60 * 1000 * 60 * 24).toISOString()),
      maxTime: (new Date(Date.now()).toISOString()),
      timeOut: 100,
      mode: Mode.REPLAY,
      tls: true
    };

    let chartDataSource1 = new SosGetResult("weather", {
      ...opts
    });

    let chartDataSource2 = new SosGetResult("weather", {
      ...opts
    });

    this.view = new ChartJsView({
      container: 'container',
      layers: [
          new CurveLayer({
          dataSourceId: chartDataSource1.id,
          getValues: (rec, timestamp) => {
            return {
              x: timestamp,
              y: rec.windSpeed
            }
          },
          lineColor: 'rgba(0,220,204,0.5)',
          backgroundColor: 'rgba(0,220,204,0.5)',
          fill:true,
          getCurveId:(rec, timestamp) => 2,
          name: 'Wind Speed 1 (m/s)'
        }),
        new CurveLayer({
          dataSourceId: chartDataSource2.id,
          getValues: (rec, timestamp) => {
            return {
              x: timestamp,
              y: rec.windSpeed - 0.02

            }
          },
          lineColor: 'rgba(59,210,29,0.5)',
          backgroundColor: 'rgba(59,210,29,0.5)',
          fill:true,
          getCurveId:(rec, timestamp) => 1,
          name: 'Wind Speed 2 (m/s)'
        })
      ],
      css: "chart-view",
      datasetOptions: {
       tension: 0.2 // for 'line'
      }
    });

// start streaming
    const dataSynchronizer = new DataSynchronizer({
      replaySpeed: 1.0,
      startTime: startTime,
      endTime: endTime,
      dataSources: [chartDataSource1, chartDataSource2]
    })

    dataSynchronizer.connect();
    // connects each DataSource
    this.dataSynchronizer = dataSynchronizer;
  },
  methods: {
    onControlEvent(eventName) {
      if(eventName === 'forward' || eventName === 'backward' || eventName === 'end'
          || eventName === 'replaySpeed'
          || (eventName === 'play' && (!isDefined(this.dataSynchronizer.properties.replaySpeed)))) {
        this.view.reset();
      }
    },
    parseTime(timestamp) {
      const date = new Date(timestamp);
      const smallDate =  this.withLeadingZeros(date.getUTCFullYear()) + '-' + this.withLeadingZeros(date.getUTCMonth())
          + '-' + this.withLeadingZeros(date.getUTCDay());

      const smallTime =  this.withLeadingZeros(date.getUTCHours()) + ":" + this.withLeadingZeros(date.getUTCMinutes()) + ":"
          + this.withLeadingZeros(date.getUTCSeconds());

      return '<div class="box-time"><div><strong>' + smallTime + '</strong></div><div><i><small>(' + smallDate+ ')</small></i></div></div>';
    },
    withLeadingZeros(dt) {
      return (dt < 10 ? '0' : '') + dt;
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
