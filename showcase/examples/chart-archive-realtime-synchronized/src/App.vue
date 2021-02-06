<template>
  <div id="app">
    <div id="container">
    </div>
    <TimeController
        :dataSynchronizer="dataSynchronizer"
        @event='onControlEvent'
        :backward=5000
        :forward=5000
        :parseTime='parseTime'
        v-if="dataSynchronizer"
    ></TimeController>
  </div>
</template>
<script>
import ChartJsView from "osh/ui/view/chart/ChartJsView.js";
import CurveLayer from "osh/ui/layer/CurveLayer.js";
import SosGetResultJson from "osh/datareceiver/SosGetResultJson.js";
import TimeController from 'osh-vue/components/TimeController.vue';

import DataSynchronizer from 'osh/datasynchronizer/DataSynchronizer';

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

    let chartDataSource1 = new SosGetResultJson("weather", {
      protocol: "ws",
      service: "SOS",
      endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
      offeringID: "urn:mysos:offering03",
      observedProperty: "http://sensorml.com/ont/swe/property/Weather",
      startTime: (new Date(Date.now() - 60 * 1000 * 5).toISOString()),
      endTime: (new Date(Date.now()).toISOString()),
      batchSize: 1,
      replaySpeed: 2,
      minTime: (new Date(Date.now() - 60 * 1000 * 5).toISOString()),
      maxTime: (new Date(Date.now()).toISOString()),
      bufferingTime: 100,
      timeOut: 100
    });

    let chartDataSource2 = new SosGetResultJson("weather", {
      protocol: "ws",
      service: "SOS",
      endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
      offeringID: "urn:mysos:offering03",
      observedProperty: "http://sensorml.com/ont/swe/property/Weather",
      startTime: (new Date(Date.now() - 60 * 1000 * 5).toISOString()),
      endTime: (new Date(Date.now()).toISOString()),
      batchSize: 1,
      replaySpeed: 2,
      minTime: (new Date(Date.now() - 60 * 1000 * 5).toISOString()),
      maxTime: (new Date(Date.now()).toISOString()),
      bufferingTime: 50,
      timeOut: 100
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
      name: "WindSpeed/Pressure chart",
      yLabel: 'Wind Speed (m/s)',
      xLabel: 'Time',
      css: "chart-view",
      tickOpts: {
        maxTicksLimit: 10,
        fontColor: 'gray',
      },
      gridLinesOpts: {
        color: 'lightgray'
      },
      scaleLabelOpts: {
        fontColor: 'gray',
        padding: 1
      },
      legendOpts: {
        labels: {
          fontColor: "gray",
          fontSize: 14
        }
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });

// start streaming
    const dataSynchronizer = new DataSynchronizer({
      replaySpeed: 1.0,
      intervalRate: 5,
      dataSources: [chartDataSource1, chartDataSource2]
    })

// connects each DataSource
    dataSynchronizer.connect();
    this.dataSynchronizer = dataSynchronizer;
  },
  methods: {
    onControlEvent(eventName) {
      if (eventName === 'forward' || eventName === 'backward' || eventName === 'slide' || eventName === 'replaySpeed') {
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
}
#app {
  width: inherit;
  height: inherit;
}
</style>
