<template>
  <div>
    <v-card
            color="#385F73"
            dark
    >
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-container :id="id"></v-container>
    </v-card>
  </div>
</template>

<script>
  import CurveLayer from "../../../../../../source/core/ui/layer/CurveLayer";
  import ChartJsView from "../../../../../../source/core/ui/view/chart/ChartJsView";
  import {randomUUID} from "../../../../../../source/core/utils/Utils";

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
            name: "WindSpeed/Pressure chart",
            yLabel: 'Wind Speed (m/s)',
            xLabel: 'Time',
            css: "chart-view",
            gridLinesOpts: {
              color: '#FFF'
            },
            tickOpts: {
              fontColor: '#FFF',
              maxTicksLimit: 4
            },
            scaleLabelOpts: {
              fontColor: '#FFF',
              padding:1
            },
            datasetsOpts: {
              borderColor: '#a3a3a3',
              borderWidth:1
            },
            legendOpts: {
              labels: {
                fontColor: "white",
                fontSize: 14
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
