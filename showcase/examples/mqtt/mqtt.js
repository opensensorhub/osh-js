// create data source for Android phone GPS
import SweApiFetch from 'osh-js/core/datasource/sweapi/SweApi.datasource.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView';
import CurveLayer from "osh-js/core/ui/layer/CurveLayer";
import {Mode} from "osh-js/core/datasource/Mode";

// #region snippet_datasource_mqttswejson

const mqttProps = {
    prefix: '/api',
    endpointUrl: 'api.georobotix.io:443/ogc/t18',
    username: 'uxs-team',
    password: 'WR6zlso9h#'
};

let gpsDataSource = new SweApiFetch("android-GPS", {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    resource: '/datastreams/fled6eics1cl4/observations',
    tls: true,
    protocol: 'mqtt',
    mqttOpts: mqttProps,
    mode: Mode.REAL_TIME
});

const isaDataSource = new SweApiFetch("ISA-bio-sensor", {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    resource: '/datastreams/b4runsn23q66o/observations',
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
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
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
            dataSourceId: isaDataSource.id,
            getValues: (rec, timeStamp) => {
                return {
                    x: timeStamp,
                    y: rec.density
                }
            },
            lineColor: 'rgba(0,220,204,0.5)',
            getLineColor: (rec) => {
                if(rec.material_class === 'NEUROTOXIN') {
                    return 'rgba(0,220,204,0.5)';
                } else if(rec.material_class === 'UNKNOWN') {
                    return 'rgba(101,118,41,0.5)';
                } else if(rec.material_class === 'CYTOTOXIN') {
                    return 'rgba(197,24,64,0.5)';
                } else if(rec.material_class === 'RIC') {
                    return 'rgba(85,255,0,0.78)';
                } else if(rec.material_class === 'PATHOGEN') {
                    return 'rgba(0,54,189,0.78)';
                } else if(rec.material_class === 'BIOREGULATOR') {
                    return 'rgb(189,35,0, 0.8)';
                } else if(rec.material_class === 'VIRAL') {
                    return 'rgba(0,255,246,0.78)';
                } else {
                    return 'rgba(255,206,0,0.94)';
                }
            },
            getCurveId:(rec, timeStamp) => rec.material_class,
            getName: (rec) =>  rec.material_class
        })
    ],
    css: "chart-view",
    options: {
        plugins: {
            title: {
                display: true,
                text: 'ISA Biological Sensor density',
            }
        },
        responsive: true,
        scales: {
            y : {
                display: true,
                title: {
                    display: true,
                    text: 'Density',
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
isaDataSource.connect();

