// create data source for Android phone camera
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

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
let chartView = new ChartJsView({
    container: 'char-container',
    layers: [ windSpeedLayerCurve],
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
    }
});

// start streaming
chartDataSource.connect();
