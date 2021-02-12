<template>
  <div id="app">
    <div id="container">
    </div>
    <TimeController
        :dataSource="dataSource"
        @event='onControlEvent'
        :backward=5000
        :forward=5000
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
      endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
      offeringID: "urn:mysos:offering04",
      observedProperty: "http://sensorml.com/ont/swe/property/Weather",
      startTime: (new Date(Date.now() - 60 * 1000 * 10 * 1).toISOString()),
      endTime: (new Date(Date.now()).toISOString()),
      minTime: (new Date(Date.now() - 60 * 1000 * 10 * 1).toISOString()),
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
      if(eventName === 'forward' || eventName === 'backward' || eventName === 'end' || eventName === 'replaySpeed' ) {
        console.log('reset')
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
}
#app {
  width: inherit;
  height: inherit;
}
</style>
