// create data source for Android phone GPS
import SweApiMqttJson from 'osh-js/ext/datasource/SweApiMqttJson.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView';
import CurveLayer from "osh-js/core/ui/layer/CurveLayer";

// #region snippet_datasource_mqttswejson
import mqtt from 'mqtt';

let gpsDataSource = new SweApiMqttJson("android-GPS", {
    protocol: 'mqtt', // or mqtts
    endpoint: 'ogct17.georobotix.io:8083',
    topic: '/api/datastreams/m1isar991e9i/observations'
});

const isaDataSource = new SweApiMqttJson("ISA-bio-sensor", {
    protocol: 'mqtt', // or mqtts
    endpoint: 'ogct17.georobotix.io:8083',
    topic: '/api/datastreams/1lppw59ger1py/observations'
});

// #endregion snippet_datasource_mqttswejson


// style it with a moving point marker
const pointMarkerLayer = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.platformLocation.lon,
        y: rec.platformLocation.lat,
        z: rec.platformLocation.alt
    }),
    icon: './images/car-location.png',
    iconSize: [32, 64],
    iconAnchor: [16, 65],
    name: 'Car',
    description: 'GPS car Toulouse'
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
            color: 'rgba(0,220,204,0.5)',
            getColor: (rec) => {
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
    chartjsProps: {
        chartProps: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        labelString: "Density"
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
            },
            title: {
                display: true,
                text: 'ISA Biological Sensor density'
            },
            maintainAspectRatio: false
        },
        datasetsProps: {
            fill: false
        }
    }
});

// start streaming
gpsDataSource.connect();
isaDataSource.connect();
