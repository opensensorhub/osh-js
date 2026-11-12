// create data source for Android phone GPS
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView';
import CurveLayer from "osh-js/core/ui/layer/CurveLayer";
import {Mode} from "osh-js/core/datasource/Mode";

// #region snippet_datasource_mqttswejson

const mqttProps = {
    shared: true,
    prefix: '/api',
    endpointUrl: 'api.georobotix.io:443/ogc/t18',
};

let gpsDataSource = new ConSysApi("simUav-GPS", {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    resource: '/datastreams/rbnag2hrc04mm/observations',
    tls: true,
    protocol: 'mqtt',
    mqttOpts: mqttProps,
    mode: Mode.REAL_TIME
});

let weatherDataSource = new ConSysApi("weather", {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    resource: '/datastreams/0tsop3f16nvp8/observations',
    tls: true,
    protocol: 'mqtt',
    mqttOpts: mqttProps,
    mode: Mode.REAL_TIME
});

// #endregion snippet_datasource_mqttswejson


// style it with a moving point marker
const pointMarkerLayer = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.pos.lon,
        y: rec.pos.lat,
        z: rec.pos.alt
    }),
    icon: './images/drone-mqtt.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    name: 'drone',
    description: 'Drone'
});


// create Leaflet view
const leafletMapView = new LeafletView({
    container: 'leafletMap',
    layers: [pointMarkerLayer],
    autoZoomOnFirstMarker: true
});

const chartView = new ChartJsView({
    container: 'chart-container',
    layers: [
        new CurveLayer({
            dataSourceId: weatherDataSource.id,
            getValues: (rec, timeStamp) => {
                return {
                    x: timeStamp,
                    y: rec.temperature
                };
            },
            lineColor: 'rgba(0,220,204,0.5)',
            backgroundColor: 'rgba(0,220,204,0.5)',
            getCurveId:(rec, timeStamp) => 'temperature',
            name: "Temperature"
        }),
        new CurveLayer({
            dataSourceId: weatherDataSource.id,
            getValues: (rec, timeStamp) => {
                return {
                    x: timeStamp,
                    y: rec.pressure
                };
            },
            lineColor: 'rgba(220,66,0,0.5)',
            backgroundColor: 'rgba(220,66,0,0.5)',
            getCurveId:(rec, timeStamp) => 'pressure',
            name: "Pressure"
        }),
        new CurveLayer({
            dataSourceId: weatherDataSource.id,
            getValues: (rec, timeStamp) => {
                return {
                    x: timeStamp,
                    y: rec.windSpeed
                };
            },
            lineColor: 'rgba(172,0,220,0.5)',
            backgroundColor: 'rgba(172,0,220,0.5)',
            getCurveId:(rec, timeStamp) => 'windSpeed',
            name: "Wind Speed"
        }),
    ],
    css: "chart-view",
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Weather',
            }
        },
        responsive: true,
        scales: {
            y : {
                display: true,
                title: {
                    display: true,
                    text: 'Value',
                    padding: 10
                }
            },
            x : {
                display: true,
                title: {
                    display: true,
                    text: 'Time',
                    padding: 10
                }
            }
        }
    },
    datasetOptions: {
        tension: 0.2 // for 'line'
    }
});

// start streaming
gpsDataSource.connect();
weatherDataSource.connect();

