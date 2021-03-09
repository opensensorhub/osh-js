// create data source for Android phone camera
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';

let chartDataSource = new SosGetResultJson("weather", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:mysos:offering03",
    observedProperty: "http://sensorml.com/ont/swe/property/Weather",
    startTime: "now",
    endTime: "2055-01-01Z"
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
let chartView = new ChartJsView({
    container: 'char-container',
    layers: [ windSpeedLayerCurve],
    css: "chart-view",
    chartjsProps: {
        chartProps: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        labelString: "Wind Speed (m/s)"
                    },
                    ticks: {
                        maxTicksLimit: 10
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        labelString: "Time"
                    },
                    ticks: {
                        maxTicksLimit: 20
                    }
                }],
            }
        },
        datasetsProps: {
            backgroundColor: 'rgba(141,242,246, 0.1)'
        }
    }
});

// start streaming
chartDataSource.connect();
