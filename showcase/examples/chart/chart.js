import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';


let chartDataSource = new ConSysApi("weather", {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    protocol: 'mqtt',
    mqttOpts: {
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/t18'
    },
    tls: true,
    mode: Mode.REAL_TIME,
    resource: '/datastreams/0tsop3f16nvp8/observations',
    responseFormat: 'application/swe+json',
    startTime: "now",
    endTime: "2055-01-01Z"
});


// #region snippet_curve_layer
let windSpeedLayerCurve = new CurveLayer({
    maxValues: 1000,
    dataSourceId: chartDataSource.id,
    getValues: (rec) => {
        return {
            x: rec.timestamp || new Date(rec.phenomenonTime).getTime(),
            y: rec.windSpeed ?? rec?.result?.windSpeed
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
            x: {
                title: {
                    display : true,
                    text: "Time",
                    padding: 20
                }
            },
        }
    },
    datasetOptions: {
        tension: 0.2 // for 'line'
    }
});

chartDataSource.connect();
