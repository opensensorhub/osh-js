<template>
  <div>
    <v-card
            color="#385F73"
            dark
    >
      <v-card-title class="tiny">
        {{ title }}
      </v-card-title>
      <v-container :id="id"></v-container>
    </v-card>
  </div>
</template>

<script>
  import CurveLayer from "osh-js/core/ui/layer/CurveLayer";
  import ChartJsView from "osh-js/core/ui/view/chart/ChartJsView";
  import {randomUUID} from "osh-js/core/utils/Utils";

  export default {
    name: "VCardViewElement",
    props: ['dataSource'],
    data: function () {
      return {
        title: 'Weather',
        id: randomUUID()
      }
    },
    mounted() {
        // build chart
        let windSpeedLayerCurve = new CurveLayer({
          getValues: {
            dataSourceIds: [this.dataSource.id],
            handler: function (rec, timeStamp) {
              return {
                x: timeStamp,
                y: rec.windSpeed
              };
            }
          },
          name: "WindSpeed"
        });

        // show it in video view
        new ChartJsView({
            container: this.id,
            layers: [windSpeedLayerCurve],
            css: "chart-view",
            chartjsProps: {
              chartProps: {
                legend: {
                  labels: {
                    // This more specific font property overrides the global property
                    fontColor: '#ffffff'
                  }
                },
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      labelString: "Wind Speed (m/s)",
                      fontColor: '#ffffff'
                    },
                    ticks: {
                      maxTicksLimit: 5,
                      fontColor: '#a5a5a5'
                    }
                  }],
                  xAxes: [{
                    scaleLabel: {
                      labelString: "Time",
                      fontColor: '#ffffff'
                    },
                    ticks: {
                      maxTicksLimit: 20,
                      fontColor: '#a5a5a5'
                    }
                  }]
                },
                maintainAspectRatio: false
              },
              datasetsProps: {
                backgroundColor: 'rgb(0,255,247, 0.1)'
              }
            }
          }
        );
    }
  }
</script>

<style scoped>
  .container {
    padding: 0px;
  }
</style>
