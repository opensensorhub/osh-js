import DiscoveryView, {DiscoveryType} from "osh-ext/ui/view/discovery/DiscoveryView.js";
import LeafletView from "osh/ui/view/map/LeafletView.js";
import FFMPEGView from "osh/ui/view/video/FFMPEGView.js";
import MjpegView from "osh/ui/view/video/MjpegView.js";
import ChartJsView from "osh/ui/view/chart/ChartJsView.js";

// create Leaflet view
let leafletMapView = new LeafletView("map-container");

function onSubmit(dataSource, type, styler) {
    if(type === DiscoveryType.VIDEO_MJPEG) {
        // show it in video view
        let videoView = new MjpegView("video-mjpeg-container", {
            dataSourceId: dataSource.id,
            css: "video-mjpeg",
            name: "Android Video",
            keepRatio: true,
            showTime: true
        });
        dataSource.connect();
    } else if(type === DiscoveryType.VIDEO_H264) {
        // show it in video view using FFMPEG JS decoder
        let videoView = new FFMPEGView("video-h264-container", {
            dataSourceId: dataSource.id,
            css: "video-h264",
            name: "UAV Video",
            framerate:25,
            showTime: true
        });
        dataSource.connect();
    } else if(type === DiscoveryType.MARKER_GPS && styler !== null) {
        leafletMapView.addViewItem({
            styler: styler,
            name: 'GPS'
        });
        dataSource.connect();
    } else if(type === DiscoveryType.CHART) {
        let chartView = new ChartJsView("chart-container",
          [{
              styler: styler,
              name: dataSource.name
          }],
          {
              name:  dataSource.name,
              yLabel: 'Y',
              xLabel: 'X',
              css: "chart-view",
              maxPoints: 30
          }
        );
        dataSource.connect();
    }
}

let discoveryView = new DiscoveryView("discovery-container",{
    callback: onSubmit,
    css: "discovery-style",
    services: ["http://sensiasoft.net:8181"],
    views: [{
        name: 'Video',
        type : DiscoveryType.VIDEO_H264
    },{
        name: 'Video',
        type : DiscoveryType.VIDEO_MJPEG
    },{
        name: 'Chart',
        type : DiscoveryType.CHART
    },{
        name: 'Gps',
        type : DiscoveryType.MARKER_GPS
    }
    ]
});

// init map view
