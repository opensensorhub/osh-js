// create data source for Android phone camera
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';

function createChart(dataSource, divId, title) {

    let windSpeedLayerCurve = new CurveLayer({
        dataSourceId: dataSource.id,
        getValues:  (rec, timeStamp) => ({
            x: timeStamp,
            y: rec.windSpeed
        }),
        name: "WindSpeed"
    });

// show it in video view
    let chartView = new ChartJsView({
        container: divId,
        layers: [windSpeedLayerCurve],
        css: "chart-view",
        chartjsProps: {
            datasetsProps: {
                backgroundColor: 'rgba(141,242,246, 0.1)'
            },
            chartProps: {
                title: {
                    display: true,
                    text: title
                },
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


let chartDataSource0 = new SosGetResultJson("weather0", {
    ...genericOpts,
    replaySpeed: 1,
    batchSize: 10
});

let chartDataSource1 = new SosGetResultJson("weather1", {
    ...genericOpts,
    replaySpeed: 1
});

let chartDataSource2 = new SosGetResultJson("weather2", {
    ...genericOpts,
    batchSize: 1000
});

let chartDataSource3 = new SosGetResultJson("weather3", {
    ...genericOpts
});

let chartDataSource4 = new SosGetResultJson("weather4", {
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
