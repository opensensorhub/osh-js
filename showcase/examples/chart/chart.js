import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";

const REPLAY_SPEED = 0.5;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

let chartDataSource = new ConSysApi("weather", {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    protocol: 'mqtt',
    mqttOpts: {
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/t18'
    },
    tls: true,
    startTime: (new Date(Date.now() - 60 * 1000 * 60 * 24).toISOString()),
    endTime: (new Date(Date.now()).toISOString()),
    minTime: (new Date(Date.now() - 60 * 1000 * 60 * 24).toISOString()),
    maxTime: (new Date(Date.now()).toISOString()),
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/0tsop3f16nvp8/observations',
    responseFormat: 'application/swe+json',
});

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: REPLAY_SPEED,
    dataSources: [chartDataSource],
});


// #region snippet_curve_layer
let windSpeedLayerCurve = new CurveLayer({
    maxValues: 1000,
    dataSourceId: chartDataSource.id,
    getValues: (rec, timestamp) => {
        return {
            x: rec.timestamp,
            y: rec.windSpeed
        };
    },
    lineColor: 'rgba(0,220,204,0.5)',
    backgroundColor: 'rgba(0,220,204,0.5)',
    fill:true,
    getCurveId:(rec, timestamp) => 2,
    name: 'Wind Speed (m/s)s'
});
// #endregion snippet_curve_layer

// show it in video view
let chartView = new ChartJsView({
    container: 'char-container',
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

dataSynchronizer.connect();
