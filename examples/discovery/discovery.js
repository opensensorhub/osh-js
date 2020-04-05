import DiscoveryView, {DiscoveryType} from "ext/osh/ui/discovery/DiscoveryView";

let discoveryView = new DiscoveryView("discovery-container",{
    dialogContainer: "dialog-container",
    services: ["http://sensiasoft.net:8181"],
    views: [{
        name: 'Video',
        type : DiscoveryType.DIALOG_VIDEO_H264
    },{
        name: 'Video',
        type : DiscoveryType.DIALOG_VIDEO_MJPEG
    },{
        name: 'Chart',
        type : DiscoveryType.DIALOG_CHART
    },{
        name: 'Gps',
        type : DiscoveryType.MARKER_GPS
    }
    ]
});
