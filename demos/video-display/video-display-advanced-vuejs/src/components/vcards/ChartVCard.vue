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
        handler: function (rec, timestamp) {
          return {
            x: timestamp,
            y: rec.windSpeed
          };
        }
      },
      name: "WindSpeed",
      maxValues: 4
    });

    // show it in video view
    new ChartJsView({
          container: this.id,
          layers: [windSpeedLayerCurve],
          css: "chart-view",
          datasetOptions: {
            backgroundColor: 'rgb(0,255,247, 0.1)'
          },
          options: {
            plugins: {
              legend: {
                labels: {
                  // This more specific font property overrides the global property
                  color: 'rgba(255,255,255,0.78)'
                }
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'Wind Speed (m/s)',
                  color: 'rgba(255,255,255,0.78)'
                },
                ticks: {
                  color: 'rgba(255,255,255,0.35)'
                },
              },
              x: {
                ticks: {
                  color: 'rgba(255,255,255,0.35)',
                  autoSkip: false,
                  crossAlign: 'center'
                },
                title: {
                  display: true,
                  text: 'Time',
                  color: 'rgba(255,255,255,0.78)'
                },
              }
            },
            maintainAspectRatio: false
          },
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
