<template>
  <div id="app">
    <div id="container">
    </div>
    <TimeController
        :dataSource="dataSource"
        @event='onControlEvent'
        :backward=5000
        :forward=5000
        :parseTime='parseTime'
        v-if="dataSource"
    ></TimeController>
  </div>
</template>
<script>
// @ is an alias to /src
import ChartJsView from "osh/ui/view/chart/ChartJsView.js";
import CurveLayer from "osh/ui/layer/CurveLayer.js";
import SosGetResultJson from "osh/datareceiver/SosGetResultJson.js";
import TimeController from 'osh-vue/components/TimeController.vue';

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

    let chartDataSource = new SosGetResultJson("weather", {
      protocol: "ws",
      service: "SOS",
      // endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
      endpointUrl: "localhost:8181/sensorhub/sos",
      offeringID: "urn:mysos:offering03",
      observedProperty: "http://sensorml.com/ont/swe/property/Weather",
      // startTime: (new Date(Date.now() - 60 * 1000).toISOString()), // get the last minute of archive data
      // endTime: 'now',
      startTime: 'now',
      endTime: '2055-01-01T00:00:00Z',
      batchSize: 1,
      replaySpeed: 2,
      minTime: (new Date(Date.now() - 60 * 1000).toISOString()),
      maxTime: (new Date(Date.now()).toISOString())
    });

// #region snippet_curve_layer
    let windSpeedLayerCurve = new CurveLayer({
      dataSourceId: chartDataSource.id,
      getValues: (rec, timeStamp) => {
        return {
          x: timeStamp,
          y: rec.windSpeed
        }
      },
      name: 'Wind Speed (m/s)'
    });
// #endregion snippet_curve_layer

// show it in video view
    this.view = new ChartJsView({
      container: 'container',
      layers: [windSpeedLayerCurve],
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
      datasetsOpts: {
        borderColor: '#a3a3a3',
        borderWidth: 1,
        backgroundColor: 'rgba(188,221,255,0.5)'
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
    chartDataSource.connect();

    this.dataSource = chartDataSource;
  },
  methods: {
    onControlEvent(eventName) {
      if(eventName === 'forward' || eventName === 'backward' || eventName === 'slide' || eventName === 'replaySpeed') {
        this.view.reset();
      }
    },
    parseTime(timestamp) {
      const date = new Date(timestamp);
      return '<i><small>('+this.withLeadingZeros(date.getUTCFullYear()) + '-'+this.withLeadingZeros(date.getUTCMonth())
          + '-'+this.withLeadingZeros(date.getUTCDay())
          + ')</small></i> <strong>'+ this.withLeadingZeros(date.getUTCHours()) + ":" + this.withLeadingZeros(date.getUTCMinutes()) + ":"
          + this.withLeadingZeros(date.getUTCSeconds())+ '</strong>';
    },
    withLeadingZeros(dt) {
      return (dt < 10 ? '0' : '') + dt;
    }
  }
};
</script>
<style>
body {
  overflow-x: hidden;
  margin: 0;
  padding: 0px;
  background: aliceblue;
}

#container  {
  margin-bottom: 10px;
}

#container {
  width:100%;
  height:500px;
}
</style>
