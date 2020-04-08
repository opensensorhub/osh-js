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
  import Curve from "osh/ui/styler/Curve";
  import ChartJsView from "osh/ui/view/chart/ChartJsView";
  import MjpegView from "osh/ui/view/video/MjpegView";
  import {randomUUID} from "osh/utils/Utils";

  export default {
    name: "VCardViewElement",
    props: ['dataSource'],
    data: function () {
      return {
        title: 'Viewer',
        id: randomUUID()
      }
    },
    mounted() {
      if(this.dataSource.constructor.name === 'Chart') {
        // build chart
        let windSpeedStylerCurve = new Curve({
          valuesFunc: {
            dataSourceIds: [this.dataSource.id],
            handler: function (rec, timeStamp) {
              return {
                x: timeStamp,
                y: rec[0]
              };
            }
          }
        });

        // show it in video view
        let chartView = new ChartJsView(this.id,
          [{
            styler: windSpeedStylerCurve,
            name: "WindSpeed"
          }],
          {
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
        this.title = "Weather";
      } else if(this.dataSource.constructor.name === 'VideoMjpeg'){
        // build video
        // show it in video view
        let videoView = new MjpegView(this.id, {
          dataSourceId: this.dataSource.id,
          css: "video-mjpeg",
          name: "Android Video",
          keepRatio: true,
          showTime: true
        });
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 0px;
  }

</style>
<style>
  .container > div.video-mjpeg {
    width: 100%;
    padding: 8px;
    overflow: hidden;
  }
  .container > div.video-mjpeg img {
    width: 100%;
  }
</style>
