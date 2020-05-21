import SweJson from 'osh/datareceiver/SweJson';
import CesiumView from 'osh/ui/view/map/CesiumView';
import {EllipsoidTerrainProvider} from 'cesium';
import PointMarker from 'osh/ui/styler/PointMarker';

window.CESIUM_BASE_URL = './';

// create data source for Android phone GPS
let gpsDataSource = new SweJson('android-GPS', {
    protocol: 'ws',
    service: 'SOS',
    endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
    offeringID: 'urn:android:device:060693280a28e015-sos',
    observedProperty: 'http://sensorml.com/ont/swe/property/Location',
    startTime: '2015-02-16T07:58:30Z',
    endTime: '2015-02-16T08:09:00Z',
    replaySpeed: 2
});

let count = 0;

// style it with a moving point marker
let pointMarker = new PointMarker({
    locationFunc: {
        dataSourceIds: [gpsDataSource.getId()],
        handler: function (rec) {
            return {
                x: rec.location.lon,
                y: rec.location.lat
            };
        }
    },
    orientation: {
        heading: 0
    },
    icon: 'images/car-location.png',
    iconAnchor: [16, 40],
    label: 'car',
    labelFunc: {
        dataSourceIds: [gpsDataSource.getId()],
        handler : (rec) => {
           return 'test_label_Func_change_'+(count++);
        }
    },
    labelColor: '#123456',
    labelColorFunc: {
        dataSourceIds: [gpsDataSource.getId()],
        handler: function (rec) {
            return '#' + Math.floor(Math.random() * 9) +
                '' + Math.floor(Math.random() * 9)+
                '' + Math.floor(Math.random() * 9) +
                '' + Math.floor(Math.random() * 9) +
                '' + Math.floor(Math.random() * 9) +
                '' + Math.floor(Math.random() * 9);
        }
    },
    labelOffset: [0,32]
});

// create Cesium view
let cesiumView = new CesiumView('cesium-container',
    [{
        styler: pointMarker,
        name: 'Android Phone GPS'
    }]
);
cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();
// select bing maps as default imagery
const baseLayerPickerViewModel = cesiumView.viewer.baseLayerPicker.viewModel;
baseLayerPickerViewModel.selectedImagery = baseLayerPickerViewModel.imageryProviderViewModels[2];

// start streaming
gpsDataSource.connect();
