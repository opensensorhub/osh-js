<template>
  <div
      id="map"
      class="map"/>
</template>

<script>
// import OpenLayerView from "core/ui/view/map/OpenLayerView.js";
import PointMarker from "core/ui/layer/PointMarker.js";
// import TileLayer from 'ol/layer/Tile';
// import XYZ from 'ol/source/XYZ';
// import OSM from "ol/source/OSM";
import LeafletView from "core/ui/view/map/LeafletView.js";

export default {
  name: "Map",
  data: function () {
    return {
      viewItems: []
    }
  },
  mounted() {
    //Stadia_Outdoors
    // const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
    //   maxZoom: 20,
    //   attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, ' +
    //       '&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
    //       '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    // });

    // let baseLayer = new TileLayer({
    //   source: new XYZ({
    //     url: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}.png',
    //     tilePixelRatio: 2
    //   }),
    //   title: 'Stadia',
    //   visible: true
    // });

    // let overlay = new TileLayer({
    //   source: new XYZ({
    //     url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
    //     tilePixelRatio: 2
    //   }),
    //   title: 'Esri Sat',
    //   visible: false
    // });
    // create Leaflet view
    // this.view = new OpenLayerView("map",
    //     [],
    //     {
    //       watch: false,
    //       autoZoomOnFirstMarker: true,
    //       baseLayers: [baseLayer],
    //       overlayLayers: [
    //           overlay,
    //       ]
    //     });

    // LEAFLET PART
    //Stadia_Outdoors
    const layer = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, ' +
          '&copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
          '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });

    const baseLayers = {
      "OSM Bright" : layer
    };

    // create Leaflet view
    this.view = new LeafletView("map",
        [],
        {
          watch: false,
          autoZoomOnFirstMarker: true,
          baseLayers: baseLayers,
          defaultLayer: layer
        });
  },
  methods: {
    add(item) {
      console.log('add to map',item)

      let locationLayer = {
        // location: {
        //   y:43.600541,
        //   x:1.4267618,
        //   z:0
        // }
      };
      let headingLayer  = {};

      let viewItem = {
        name: item.name
      };

      if('location' in item) {
        locationLayer = {
          ...locationLayer,
          getLocation: {
            dataSourceIds: [item['location'].id],
            handler: function (rec) {
              return {
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt
              };
            }
          }
        };
        viewItem['locationId'] = item['location'].id;
      }
      if('heading' in item) {
        headingLayer  = {
          getOrientation : {
            dataSourceIds :  [item['heading'].id],
            handler : function(rec) {
              let qx = rec.orient.qx;
              let qy = rec.orient.qy;
              let qz = rec.orient.qz;
              let qw = rec.orient.q0;

              // look dir vector
              let x = 0;
              let y = 0;
              let z = -1;

              // compute quat * vector
              let ix =  qw * x + qy * z - qz * y;
              let iy =  qw * y + qz * x - qx * z;
              let iz =  qw * z + qx * y - qy * x;
              let iw = - qx * x - qy * y - qz * z;

              // compute result * inverse quat
              let xp = ix * qw + iw * - qx + iy * - qz - iz * - qy;
              let yp = iy * qw + iw * - qy + iz * - qx - ix * - qz;
              let zp = iz * qw + iw * - qz + ix * - qy - iy * - qx;

              let yaw = 90 - (180/Math.PI*Math.atan2(yp, xp));

              return {
                heading : yaw
              };
            }
          }
        };
        viewItem['headingId'] = item['heading'].id;
      }
      // style it with a moving point marker
      let marker = new PointMarker({
        icon: './images/cameralook3.png',
        iconAnchor: [13, 45],
        labelOffset: [10, 10],
        ...locationLayer,
        ...headingLayer
      });

      viewItem = {
        ...viewItem,
        layer: marker
      };

      this.view.addViewItem(viewItem);
      this.viewItems.push(viewItem);
    },
    remove(item) {
      let index = 0;
      for(let viewItem of this.viewItems) {
        let remove = false;
        if(('locationId' in viewItem) && ('location' in item) && (viewItem['locationId'] === item['location'].id)) {
          remove = true;
        }  else if(('headingId' in viewItem) && ('heading' in item) && (viewItem['headingId'] === item['heading'].id)) {
          remove = true;
        }

        if(remove) {
          this.view.removeViewItem(viewItem);
          this.viewItems.splice(index,1);
          break;
        }
        index++;
      }
      console.log('remove from map',item)
    }
  }
}
</script>

<style scoped>
.map {
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
</style>
<style>
.v-application .map a {
  color: unset;
}

.leaflet-left .leaflet-control {
  margin-left: 0px;
  right: 14px;
  top: 70px;
}

.leaflet-left {
  left:unset;
  right:0;
}
</style>
