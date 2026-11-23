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
                 :dataSynchronizer="dataSynchronizer"
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
  import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";
  import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer.js";
  import {isDefined} from "osh-js/core/utils/Utils";
  import {Mode} from "osh-js/core/datasource/Mode";
  import {EventType} from "../../../../source/core/event/EventType";

  const START_TIME = '2023-06-06T14:29:17Z';
  const END_TIME = '2023-06-06T22:29:13Z';
  const MODE = Mode.REPLAY;
  const MIN_TIME = '2023-06-06T14:29:17Z';
  const MAX_TIME = '2023-06-06T22:29:13Z';
  const tls = true;
  const dsReplaySpeed = 1;

  const commonDatasourceOpts = {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    protocol: 'mqtt',
    mqttOpts: {
      shared: true,
      prefix: '/api',
      endpointUrl: 'api.georobotix.io:443/ogc/t18'
    },
    tls: tls,
    startTime: START_TIME,
    endTime: END_TIME,
    minTime: MIN_TIME,
    maxTime: MAX_TIME,
    mode: MODE,
    replaySpeed: dsReplaySpeed,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250
  };

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
        locationDataSource: new ConSysApi("android-GPS", {
          ...commonDatasourceOpts,
          resource: '/datastreams/ltr9mqaqrorj6/observations',
          responseFormat: 'application/swe+json',
        }),
        headingDataSource: new ConSysApi("android-Att", {
          ...commonDatasourceOpts,
          resource: '/datastreams/kegun78tu174a/observations',
          responseFormat: 'application/swe+json',
        }),
        videoDataSource: new ConSysApi("android-Video", {
          ...commonDatasourceOpts,
          resource: '/datastreams/a3if48eqn8dha/observations',
          responseFormat: 'application/swe+binary',
        }),
        weatherDataSource: new ConSysApi("weather", {
          ...commonDatasourceOpts,
          resource: '/datastreams/0tsop3f16nvp8/observations',
          responseFormat: 'application/swe+json',
          mode: Mode.REAL_TIME,
          startTime: undefined,
          endTime: undefined,
          minTime: undefined,
          maxTime: undefined,
        }),
        dataSynchronizer:null
      }
    },
    beforeMount() {
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

      // this.dataSources = [this.locationDataSource, this.videoDataSource, this.headingDataSource, this.weatherDataSource];

      this.dataSynchronizer = new DataSynchronizer({
        replaySpeed: dsReplaySpeed,
        startTime: START_TIME,
        endTime: END_TIME,
        dataSources: [this.locationDataSource, this.videoDataSource, this.headingDataSource]
      });
    },
    methods: {
      async onSelect(nodes) {
        let bIds = [];
        if (Array.isArray(nodes)) {
          for (let i = 0; i < nodes.length; i++) {
            bIds.push(nodes[i].dataSource.id);
          }
        } else {
          bIds.push(nodes.dataSource.id);
        }

        const isConnected = await this.dataSynchronizer.isConnected();

        const dsToConnect = bIds.filter(x => !this.selectionIds.includes(x));
        const dsToDisconnect = this.selectionIds.filter(x => !bIds.includes(x));
        const synchronizedDataSources = this.dataSynchronizer.getDataSources();

        for(let dsId in this.dataSources) {
          const currentDs = this.dataSources[dsId];
          if(dsToConnect.includes(currentDs.id)) {
            if(!isConnected && synchronizedDataSources.includes(currentDs)) {
              await this.dataSynchronizer.connect();
            } else {
              await currentDs.connect();
            }
          } else if(dsToDisconnect.includes(currentDs.id)){
            currentDs.disconnect();
          }
        }
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

</style>

<style scoped>
  .range {
    flex-shrink: 1;
    padding-bottom: 15px;
  }
</style>
