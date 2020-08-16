<template>
  <div
      id="map"
      class="map"/>
</template>

<script>
import LeafletView from "osh/ui/view/map/LeafletView.js";
import PointMarker from "osh/ui/styler/PointMarker.js";
import {isDefined} from "osh/utils/Utils.js";

export default {
  name: "Map",
  data: function () {
    return {
      viewItems: []
    }
  },
  mounted() {
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

      let locationStyler = {
        // location: {
        //   y:43.600541,
        //   x:1.4267618,
        //   z:0
        // }
      };
      let headingStyler  = {};

      let viewItem = {
        name: item.name
      };

      if('location' in item) {
        locationStyler = {
          ...locationStyler,
          locationFunc: {
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
        headingStyler  = {
          orientationFunc : {
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
        ...locationStyler,
        ...headingStyler
      });

      viewItem = {
        ...viewItem,
        styler: marker
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
</style>
