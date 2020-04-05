//@ sourceURL=leaflet-location.html.js

// create data source for Android phone GPS
import Json from "osh/datareceiver/Json.js";
import PointMarker from "osh/ui/styler/PointMarker.js";
import LeafletView from "osh/ui/view/map/LeafletView.js";
import VideoMjpeg from "osh/datareceiver/VideoMjpeg";
import MjpegView from "osh/ui/view/video/MjpegView";
import {randomUUID} from "osh/utils/Utils";
import EntityTreeView from "osh/ui/view/entity/EntityTreeView.js";

let gpsDataSource = new Json("android-GPS", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:060693280a28e015-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/Location",
  startTime: "2015-02-16T07:58:32Z",
  endTime: "2015-02-16T08:09:00Z",
  replaySpeed: 2
});

// style it with a moving point marker
let pointMarker = new PointMarker({
  locationFunc: {
    dataSourceIds: [gpsDataSource.getId()],
    handler: function (rec) {
      return {
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
      };
    }
  },
  icon: './images/car-location.png',
  iconAnchor: [16, 65]
});

// create Leaflet view
let leafletMapView = new LeafletView("leafletMap",
    [{
      styler: pointMarker,
      name: "Android Phone GPS"
    }]
);

let videoDataSource = new VideoMjpeg("android-Video", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:060693280a28e015-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
  startTime: "2015-02-16T07:58:35Z",
  endTime: "2015-02-16T08:09:00Z",
  replaySpeed: 3
});

// show it in video view
let videoView = new MjpegView("video-container", {
  dataSourceId: videoDataSource.id,
  css: "video-mjpeg",
  name: "Android Video",
  keepRatio: true,
  showTime: true
});

let androidEntity = {
  id : "entity-"+randomUUID(),
  name: "Android Phone",
  dataSources: [gpsDataSource, videoDataSource]
};

let stackContextMenuId = 0;

let entityTreeView = new EntityTreeView("tree-container",
    [{
      entity : androidEntity,
      path: "Sensors/Toulouse",
      treeIcon : "images/android_icon.png",
      contextMenuId: stackContextMenuId
    }],
    {
      css: "tree-container"
    }
);
