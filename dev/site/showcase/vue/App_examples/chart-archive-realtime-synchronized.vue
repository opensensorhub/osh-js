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
        :key="key"
    ></TimeController>
  </div>
</template>
<script>
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';
import TimeController from 'osh-js/vue/components/TimeController.vue';

import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {isDefined} from 'osh-js/core/utils/Utils';

export default {
  components: {
    TimeController
  },
  data: function () {
    return {
      dataSynchronizer: null,
      view: null,
      key: 0
    }
  },
  mounted() {

    const opts = {
      protocol: "ws",
      service: "SOS",
      endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
      offeringID: "urn:mysos:offering04",
      observedProperty: "http://sensorml.com/ont/swe/property/Weather",
      startTime: (new Date(Date.now() - 60 * 1000 * 60 * 24).toISOString()),
      endTime: (new Date(Date.now()).toISOString()),
      minTime: (new Date(Date.now() - 60 * 1000 * 60 * 24).toISOString()),
      maxTime: (new Date(Date.now()).toISOString()),
      bufferingTime: 100,
      timeOut: 100,
      replaySpeed: 2.0
    };

    let chartDataSource1 = new SosGetResultJson("weather", {
      ...opts
    });

    let chartDataSource2 = new SosGetResultJson("weather", {
      ...opts
    });

    this.view = new ChartJsView({
      container: 'container',
      layers: [
          new CurveLayer({
          dataSourceId: chartDataSource1.id,
          getValues: (rec, timeStamp) => {
            return {
              x: timeStamp,
              y: rec.windSpeed
            }
          },
          color: 'rgba(0,220,204,0.5)',
          getCurveId:(rec, timeStamp) => 2,
          name: 'Wind Speed 1 (m/s)'
        }),
        new CurveLayer({
          dataSourceId: chartDataSource2.id,
          getValues: (rec, timeStamp) => {
            return {
              x: timeStamp,
              y: rec.windSpeed - 0.02

            }
          },
          color: 'rgba(59,210,29,0.5)',
          getCurveId:(rec, timeStamp) => 1,
          name: 'Wind Speed 2 (m/s)'
        })
      ],
      css: "chart-view",
      chartjsProps: {
        chartProps: {
          scales: {
            yAxes: [{
              scaleLabel: {
                labelString: "Wind Speed (m/s)"
              },
              ticks: {
                maxTicksLimit: 10
              }
            }],
            xAxes: [{
              scaleLabel: {
                labelString: "Time"
              },
              ticks: {
                maxTicksLimit: 20
              }
            }],
          },
          maintainAspectRatio: false
        }
      }
    });

// start streaming
    const dataSynchronizer = new DataSynchronizer({
      replaySpeed: 1.0,
      timerResolution: 5,
      dataSources: []
    })

    const that = this;
    setTimeout(() => {
      dataSynchronizer.addDataSource(chartDataSource1);
      dataSynchronizer.addDataSource(chartDataSource2);
      dataSynchronizer.reset();
      dataSynchronizer.connect();
      that.key = 1;
    },5000);
// connects each DataSource
    dataSynchronizer.connect();
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
