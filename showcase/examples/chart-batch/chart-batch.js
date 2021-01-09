// create data source for Android phone camera
import ChartJsView from "osh/ui/view/chart/ChartJsView.js";
import CurveLayer from "osh/ui/layer/CurveLayer.js";
import SweJson from "osh/datareceiver/SweJson.js";

function createChart(dataSource, divId, title) {

    let windSpeedLayerCurve = new CurveLayer({
        getValues: {
            dataSourceIds: [dataSource.id],
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
    let chartView = new ChartJsView({
        container: divId,
        layers: [windSpeedLayerCurve],
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
            title: {
                display: true,
                text: title
            }
        }
    });
}

// #region snippet_chart_batch
const genericOpts = {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:mysos:offering03",
    observedProperty: "http://sensorml.com/ont/swe/property/Weather",
    startTime: "2016-08-11T19:58:00Z",
    endTime: "2016-08-11T20:58:00Z",
    bufferingTime: 0,
};


let chartDataSource0 = new SweJson("weather0", {
    ...genericOpts,
    replaySpeed: 1,
    batchSize: 10
});

let chartDataSource1 = new SweJson("weather1", {
    ...genericOpts,
    replaySpeed: 1
});

let chartDataSource2 = new SweJson("weather2", {
    ...genericOpts,
    batchSize: 1000
});

let chartDataSource3 = new SweJson("weather3", {
    ...genericOpts
});

let chartDataSource4 = new SweJson("weather4", {
    ...genericOpts,
    startTime: "now",
    endTime: "2055-01-01Z"
});

// #endregion snippet_chart_batch
//create views
createChart(chartDataSource0, "char-container0", 'replaySpeed=1, batchSize=10');
createChart(chartDataSource1, "char-container1", 'replaySpeed=1');
createChart(chartDataSource2, "char-container2", 'batchSize=1000');
createChart(chartDataSource3, "char-container3", '-');
createChart(chartDataSource4, "char-container4", 'real time');

// start streaming
chartDataSource0.connect();
chartDataSource1.connect();
chartDataSource2.connect();
chartDataSource3.connect();
chartDataSource4.connect();
