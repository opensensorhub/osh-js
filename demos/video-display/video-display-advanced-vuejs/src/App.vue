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
                selected-color="#ef7245"
                selectable
                item-disabled="locked"
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
      <v-app-bar-nav-icon @click.stop="left = !left"/>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="right = !right"/>
    </v-app-bar>

    <v-content app>
      <div style="display: flex; flex-flow: column wrap;align-items: stretch;height:100%">
        <Map :location-data-source="locationDataSource"
             :heading-data-source="headingDataSource"
             style="flex-grow:1"></Map>
        <time-line
                 class="range"></time-line>
      </div>
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
              <chart-v-card v-if="item.type == 'chart-vcard'"
                            :data-source="item.dataSource"
              ></chart-v-card>
              <mjpeg-video-v-card v-if="item.type == 'mjpeg-vcard'"
                                  :data-source="item.dataSource"
              ></mjpeg-video-v-card>
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
  import Map from './components/Map';
  import TimeLine from './components/TimeLine';
  import ChartVCard from "./components/vcards/ChartVCard";
  import MjpegVideoVCard from "./components/vcards/MjpegVideoVCard";
  import SweJson from "osh/datareceiver/SweJson.js";
  import VideoMjpeg from "osh/datareceiver/VideoMjpeg.js";
  import {randomUUID} from "osh/utils/Utils.js";
  import DataReceiverController from "osh/datareceiver/DataReceiverController.js";
  import EventManager from "osh/events/EventManager.js";
  import Entity from "osh/entity/Entity.js";

  export default {
    components: {
      Map,
      MjpegVideoVCard,
      ChartVCard,
      TimeLine
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
        locationDataSource: new SweJson("android-GPS", {
          protocol: "ws",
          service: "SOS",
          endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
          offeringID: "urn:android:device:060693280a28e015-sos",
          observedProperty: "http://sensorml.com/ont/swe/property/Location",
          startTime: "2015-02-16T07:58:32Z",
          endTime: "2015-02-16T08:09:00Z",
          syncMasterTime: true,
          bufferingTime: 0,
          timeShift: -16000,
          replaySpeed: 2
        }),
        headingDataSource: new SweJson("android-Att", {
          protocol: "ws",
          service: "SOS",
          endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
          offeringID: "urn:android:device:060693280a28e015-sos",
          observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
          startTime: "2015-02-16T07:58:35Z",
          endTime: "2015-02-16T08:09:00Z",
          syncMasterTime: true,
          bufferingTime: 0,
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
          syncMasterTime: true,
          bufferingTime: 0,
          replaySpeed: 2
        }),
        weatherDataSource: new SweJson("weather", {
          protocol: "ws",
          service: "SOS",
          endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
          offeringID: "urn:mysos:offering03",
          observedProperty: "http://sensorml.com/ont/swe/property/Weather",
          startTime: "now",
          endTime: "2055-01-01Z",
          syncMasterTime: false,
          bufferingTime: 0
        }),
        dataProviderController: new DataReceiverController({
          replayFactor: 2
        })
      }
    },
    computed: {},
    mounted() {
      this.items.push({
        id: 1,
        name: 'Android Phone',
        locked: false,
        children: [
          {id: 2, name: 'GPS', dataSource: this.locationDataSource, type: 'center', locked: true},
          {id: 3, name: 'Video', type: 'mjpeg-vcard', dataSource: this.videoDataSource, locked: true},
          {id: 4, name: 'Heading', dataSource: this.headingDataSource, type: 'center', locked: true},
        ],
      });
      this.items.push({id: 5, name: 'Weather', type: 'chart-vcard', dataSource: this.weatherDataSource, locked: false});

      this.dataSources['2'] = this.locationDataSource;
      this.dataSources['3'] = this.videoDataSource;
      this.dataSources['4'] = this.headingDataSource;
      this.dataSources['5'] = this.weatherDataSource;

      const entity = new Entity("Android phone",  [this.locationDataSource, this.videoDataSource, this.headingDataSource] );
      // We can add a group of dataSources and set the options
      this.dataProviderController.addEntity(entity);
      this.dataProviderController.addDataSource(this.weatherDataSource, {});
    },
    methods: {
      onSelect(nodes) {
        let bIds = [];
        if (Array.isArray(nodes)) {
          for (let i = 0; i < nodes.length; i++) {
            bIds.push(nodes[i].dataSource.id);
          }
        } else {
          bIds.push(nodes.dataSource.id);
        }

        EventManager.fire(EventManager.EVENT.CONNECT_DATASOURCE, {
          dataSourcesId: bIds.filter(x => !this.selectionIds.includes(x))
        });

        EventManager.fire(EventManager.EVENT.DISCONNECT_DATASOURCE, {
          dataSourcesId: this.selectionIds.filter(x => !bIds.includes(x))
        });

        this.selectionIds = bIds;
      }
    },
    created() {
      this.$vuetify.theme.dark = true
    }
  };
</script>
<style>
  .theme--light.v-divider {
    border-color: rgba(0, 0, 0, 0.12) !important;
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

  .v-application .headline, .v-application .title {
    line-height: 1px;
    font-family: Roboto,sans-serif!important;
    border-bottom: solid 1px #69696982;
  }

  .v-application .headline {
    font-size: 1.0rem!important;
    font-weight: 400;
    letter-spacing: normal!important;
  }

</style>

<style scoped>
  .range {
    flex-shrink: 1;
    padding-bottom: 15px;
  }
</style>
