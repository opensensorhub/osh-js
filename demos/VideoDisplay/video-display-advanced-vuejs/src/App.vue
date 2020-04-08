<template>
  <v-app id="inspire"
    dark
  >
    <v-navigation-drawer
            v-model="left"
            app
            width="220"
            clipped
            dark
    >
      <v-container>
        <v-treeview
                v-model="selection"
                :items="items"
                :selection-type="selectionType"
                selectable
                selected-color="#ef7245"
                dark
                return-object
                open-all
                @input="onSelect"
        ></v-treeview>
        <v-spacer style="height: 15px;"></v-spacer>
        <v-divider
                class="mx-4"
                dark
        ></v-divider>
        <v-spacer style="height: 15px;"></v-spacer>

        <template v-if="!selection.length">
          No nodes selected.
        </template>
        <template v-else>
          <div v-for="node in selection"
               :key="node.id">
            {{ node.name }}
          </div>
        </template>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar app clipped-left dense dark>
      <v-app-bar-nav-icon @click.stop="left = !left" />
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="right = !right" />
    </v-app-bar>

    <v-content app>
      <v-container
              class="fill-height"
              fluid
              dark
      >
        <v-row
                align="center"
                justify="center"
        >
          <Map :location-data-source="locationDataSource"
               :heading-data-source="headingDataSource"
          ></Map>
        </v-row>
      </v-container>
    </v-content>
    <v-navigation-drawer
            v-model="right"
            app
            right
            dark
            width="340"
    >
        <v-container>
          <v-row dense>
            <v-col cols="25">
              <v-container v-for="item in selection" :key="item.dataSource.id">
                 <VCardViewElement v-if="item.type == 'vcard'"
                                   :data-source="item.dataSource"
                 ></VCardViewElement>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
    </v-navigation-drawer>
    <v-footer app>
      <span>
        <img
                src="images/logo.png"
                style="height:30px;">
      </span>
      <span>OpenSensorHub &copy; 2020</span>
    </v-footer>
  </v-app>
</template>
<script>
  // @ is an alias to /src
  import Map from '@/components/Map.vue';
  import VCardViewElement from "./components/VCardViewElement";
  import Json from "osh/datareceiver/Json";
  import VideoMjpeg from "../../../../source/osh/datareceiver/VideoMjpeg";
  import Chart from "../../../../source/osh/datareceiver/Chart";

  export default {
    components: {
      Map,
      VCardViewElement
    },
    data: function () {
      return {
        mini: true,
        left: null,
        right: null,
        selectionType: 'leaf',
        selection: [],
        selectionIds: [],
        dataSources: {},
        items: [],
        locationDataSource: new Json("android-GPS", {
          protocol: "ws",
          service: "SOS",
          endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
          offeringID: "urn:android:device:060693280a28e015-sos",
          observedProperty: "http://sensorml.com/ont/swe/property/Location",
          startTime: "2015-02-16T07:58:32Z",
          endTime: "2015-02-16T08:09:00Z",
          replaySpeed: 2
        }),
        headingDataSource: new Json("android-Att", {
          protocol: "ws",
          service: "SOS",
          endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
          offeringID: "urn:android:device:060693280a28e015-sos",
          observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
          startTime: "2015-02-16T07:58:35Z",
          endTime: "2015-02-16T08:09:00Z",
          replaySpeed: 2
        }),
        videoDataSource: new VideoMjpeg("android-Video", {
          protocol: "ws",
          service: "SOS",
          endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
          offeringID: "urn:android:device:060693280a28e015-sos",
          observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
          startTime: "2015-02-16T07:58:35Z",
          endTime: "2015-02-16T08:09:00Z",
          replaySpeed: 3
        }),
        weatherDataSource: new Chart("weather", {
          protocol: "ws",
          service: "SOS",
          endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
          offeringID: "urn:mysos:offering03",
          observedProperty: "http://sensorml.com/ont/swe/property/Weather",
          startTime: "now",
          endTime: "2055-01-01Z",
          syncMasterTime: false,
          bufferingTime: 0
        })
      }
    },
    computed: {
    },
    mounted() {
      this.items.push({
        id: 1,
          name: 'Android Phone',
        children: [
        { id: 2, name: 'GPS', dataSource: this.locationDataSource, type: 'center' },
        { id: 3, name: 'Video',type: 'vcard', dataSource: this.videoDataSource },
        { id: 4, name: 'Heading', dataSource: this.headingDataSource, type: 'center' },
      ],
      });
      this.items.push({ id: 5, name: 'Weather',type: 'vcard',  dataSource: this.weatherDataSource });

      this.dataSources['2'] = this.locationDataSource;
      this.dataSources['3'] = this.videoDataSource;
      this.dataSources['4'] = this.headingDataSource;
      this.dataSources['5'] = this.weatherDataSource;
    },
    methods: {
      onSelect(nodes) {
        let bIds = [];
        if(Array.isArray(nodes)) {
          for (let i = 0; i < nodes.length; i++) {
            bIds.push(nodes[i].id);
          }
        } else {
          bIds.push(nodes.id);
        }


        // symmetrical difference
        let   idsToDisConnect= this.selectionIds.filter(x => !bIds.includes(x));
        let dataSource;
        let idsToConnect = bIds.filter(x => !this.selectionIds.includes(x));

        if(idsToConnect.length > 0) {
          this.dataSources[idsToConnect[0]].connect();
        }
        if(idsToDisConnect.length > 0) {
          this.dataSources[idsToDisConnect[0]].disconnect();
        }
        this.selectionIds = bIds;
      }
    },
    created () {
      this.$vuetify.theme.dark = true
    }
  };
</script>
<style>
  .theme--light.v-divider {
    border-color: rgba(0,0,0,0.12) !important;
  }
  body {
    overflow: hidden;
    margin: 0;
  }
  html {
    overflow: hidden !important;
  }

  .v-content {
    background-color: #363636;
  }
</style>
