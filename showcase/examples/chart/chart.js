// create data source for Android phone camera
import ChartJsView from "osh/ui/view/chart/ChartJsView.js";
import CurveLayer from "osh/ui/layer/CurveLayer.js";
import SweJson from "osh/datareceiver/SweJson.js";

let chartDataSource = new SweJson("weather", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:mysos:offering03",
    observedProperty: "http://sensorml.com/ont/swe/property/Weather",
    startTime: "now",
    endTime: "2055-01-01Z"
});
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

// show it in video view
let chartView = new ChartJsView({
    container: 'char-container',
    layers: [ windSpeedLayerCurve],
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
        padding:1
    },
    datasetsOpts: {
        borderColor: '#a3a3a3',
        borderWidth:1,
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
