// create data source for Android phone camera
import ChartJsView from "osh/ui/view/chart/ChartJsView";
import Curve from "osh/ui/styler/Curve";
import SweJsonDataSource from "osh/datareceiver/SweJson";

let chartDataSource = new SweJsonDataSource("weather", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:mysos:offering03",
    observedProperty: "http://sensorml.com/ont/swe/property/Weather",
    startTime: "now",
    endTime: "2055-01-01Z",
    syncMasterTime: false,
    bufferingTime: 0
});

let windSpeedStylerCurve = new Curve({
    valuesFunc: {
        dataSourceIds: [chartDataSource.id],
        handler: function (rec, timeStamp) {
            return {
                x: timeStamp,
                y: rec.windSpeed
            };
        }
    }
});

// show it in video view
let chartView = new ChartJsView("char-container",
    [{
        styler: windSpeedStylerCurve,
        name: "WindSpeed"
    }],
    {
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
    }
);

// start streaming
chartDataSource.connect();
