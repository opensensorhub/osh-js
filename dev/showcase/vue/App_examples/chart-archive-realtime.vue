<template>
  <div id="app">
    <div id="container">
    </div>
    <TimeController
        :dataSource="dataSource"
        @event='onControlEvent'
        :skipTimeStep="'60s'"
        :replaySpeedStep=0.1
        v-if="dataSource"
    ></TimeController>
  </div>
</template>
<script>
// @ is an alias to /src
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.js';
import TimeController from 'osh-js/vue/components/TimeController.vue';

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
      protocol: "ws",
      service: "SOS",
      endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
      offeringID: "urn:mysos:offering04",
      observedProperty: "http://sensorml.com/ont/swe/property/Weather",
      startTime: (new Date(Date.now() - 60 * 1000 * 60 * 1).toISOString()),
      endTime: (new Date(Date.now()).toISOString()),
      minTime: (new Date(Date.now() - 60 * 1000 * 60 * 1).toISOString()),
      maxTime: (new Date(Date.now()).toISOString()),
      replaySpeed: 1.5
    });

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

// #region snippet_curve_layer
    let windSpeedLayerCurve = new CurveLayer({
      dataSourceId: chartDataSource.id,
      getValues: (rec, timestamp) => {
        return {
          x: timestamp,
          y: rec.windSpeed
        }
      },
      lineColor: 'rgba(38,152,255,0.5)',
      getLineColor: (rec) => {
        const randomNumber = getRandomArbitrary(0,1);
        if(randomNumber > 0.5) {
          return 'rgba(255,0,0,0.5)';
        } else {
          return 'rgba(38,152,255,0.5)';
        }
      },
      fill: true,
      backgroundColor: 'rgba(169,212,255,0.5)',
      maxValues: 25,
      getBackgroundColor: (rec) => {
        const randomNumber = getRandomArbitrary(0,1);
        if(randomNumber > 0.5) {
          return 'rgba(255,0,0,0.5)';
        } else {
          return 'rgba(38,152,255,0.5)';
        }
      },
      name: 'Wind Speed (m/s)'
    });
// #endregion snippet_curve_layer

// show it in video view
    this.view = new ChartJsView({
      container: 'container',
      layers: [windSpeedLayerCurve],
      css: "chart-view",
      options: {
          scales: {
            y: {
              title: {
                display : true,
                text: "Wind Speed (m/s)s",
                padding: 20
              }
            },
          }
        },
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
