<template>
  <v-app>
    <div id="app">
      <v-card height="100%">
        <v-alert
            v-model="alert"
            color="red lighten-0"
            dark
            dense
            dark
            dismissible
        >{{ alertContent }}
        </v-alert>
        <v-card-title class="blue accent-3 white--text text-h5">
          <v-btn
              class="mx-4"
              fab
              dark
              small
              color="green"
              @click="refresh"
          >
            <v-icon dark>
              mdi-autorenew
            </v-icon>
          </v-btn>
          <UrlEditComponentDialog
              :fetch-url="fetchUrl"
              :mqtt-url="mqttUrl"
              :tls-url="tls"
              :mqtt-prefix="mqttPrefix"
              @updated-url="changeUrl"
          ></UrlEditComponentDialog>
          SensorWebAPI: {{ fetchUrl }}
        </v-card-title>
        <v-row
            class="pa-4 full"
            justify="space-between"
        >
          <v-col cols="4" class="full">
            <v-treeview
                :key="kk"
                dense
                class="treeview"
                :active.sync="active"
                :items="items"
                :load-children="fetchData"
                :open.sync="open"
                activatable
                color="warning"
                transition
            >
              <template v-slot:prepend="{ item }">
                <v-icon v-if="!item.children">
                  mdi-json
                </v-icon>
              </template>
            </v-treeview>
          </v-col>

          <v-divider vertical></v-divider>

          <v-col
              class="d-flex"
          >
            <NoSelectedContent v-if="!selected || !activeNode"></NoSelectedContent>
            <Details v-else-if="!datastreamProperties && !controlStreamCommand && !controlStreamStatus && details"
                     :details="details"
            ></Details>
            <StreamObservationsContent v-else-if="datastreamProperties"
                                       :datastreamProperties="datastreamProperties"
                                       :key="nodeId + kk"
                                       :datastreamNetworkProperties="datastreamNetworkProperties"
                                       :mqtt-prefix="mqttPrefix"
                                       :mqtt-url="mqttUrl"
            ></StreamObservationsContent>
            <StreamCommandsContent v-else-if="controlStreamCommand"
                                   :control="controlStreamCommand"
                                   :key="nodeId + kk"
                                   :url="mqttUrl"
            ></StreamCommandsContent>
            <StreamControlStatusContent v-else-if="controlStreamStatus"
                                        :control="controlStreamStatus"
                                        :key="nodeId + kk"
                                        :url="mqttUrl"

            ></StreamControlStatusContent>
            <SearchContent v-else-if="collectionSearch"
                           :collection="collectionSearch"
                           :key="nodeId + kk"
                           @error="handleError"
            ></SearchContent>
            <ContentLoading v-else></ContentLoading>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-app>
</template>

<style>
@import './assets/prism-material-oceanic.css';
</style>

<script>
// yarn add prismjs
import Prism from "prismjs";
// import "prismjs/themes/prism-dark.css"; // you can change

// @ is an alias to /src
import Systems from "../../../source/core/sweapi/system/Systems";
import SystemFilter from "../../../source/core/sweapi/system/SystemFilter";

import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import ContentLoading from './components/ContentLoading.vue';
import NoSelectedContent from "./components/NoSelectedContent.vue";
import Details from "./components/Details.vue";
import StreamObservationsContent from "./components/StreamObservationsContent.vue";
import StreamCommandsContent from "./components/StreamCommandsContent.vue";
import StreamControlStatusContent from './components/StreamControlStatusContent.vue';
import SearchContent from "./components/SearchContent.vue";
import UrlEditComponentDialog from "./components/UrlEditComponentDialog.vue";

import DataStreamFilter from "../../../source/core/sweapi/datastream/DataStreamFilter";
import FeatureOfInterestFilter from "../../../source/core/sweapi/featureofinterest/FeatureOfInterestFilter";
import SweApiFetchGenericJson from "../../../source/core/datasource/sweapi/parser/json/SweApiFetchGenericJson.parser";
import {isDefined} from "../../../source/core/utils/Utils";
import ControlFilter from "../../../source/core/sweapi/control/ControlFilter";
import ObservationFilter from "../../../source/core/sweapi/observation/ObservationFilter";
import CommandFilter from "../../../source/core/sweapi/command/CommandFilter";
import EventFilter from "../../../source/core/sweapi/event/EventFilter";
import HistoryFilter from "../../../source/core/sweapi/history/HistoryFilter";

export default {
  components: {
    Details,
    NoSelectedContent,
    ContentLoading,
    VueJsonPretty,
    StreamObservationsContent,
    StreamCommandsContent,
    StreamControlStatusContent,
    SearchContent,
    UrlEditComponentDialog
  },
  data() {
    return {
      active: [],
      activeNode: true,
      open: [],
      systems: [],
      nodes: {},
      details: undefined,
      count: 0,
      datastreamProperties: undefined,
      datastreamNetworkProperties: undefined,
      controlStreamCommand: undefined,
      controlStreamStatus: undefined,
      collectionSearch: undefined,
      nodeId: undefined,
      prettyJson: true,
      fetchUrl: 'ogct17.georobotix.io:8443/sensorhub/api',
      mqttUrl: 'ogct17.georobotix.io:8483',
      mqttPrefix: '/api',
      kk: 0,
      alert: false,
      alertContent: undefined,
      tls: true
    }
  },
  beforeMount() {
  },
  mounted() {
    // if you are intending to use Prism functions manually, you will need to set:
    Prism.manual = true;
    Prism.highlightAll();

    this.init();
  },
  computed: {
    items() {
      return [
        {
          name: 'Systems',
          children: this.systems,
        },
      ]
    },
    selected(n) {
      const that = this;

      this.resetSelected();
      if (!this.active.length) return undefined

      const id = this.active[0]
      if (!isDefined(id)) return undefined;

      const jsonParser = new SweApiFetchGenericJson();
      let node;
      if (id.startsWith('system-details')) {
        node = this.nodes[id];
        node.system.getDetails().then(details => {
          that.details = jsonParser.parseData(details);
        });
      } else if (id.startsWith('system-events')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        node.system.searchEvents(new EventFilter(), 10).then((collection) => this.collectionSearch = collection);
      } else if (id.startsWith('system-history')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        node.system.searchHistory(new HistoryFilter(), 10).then((collection) => this.collectionSearch = collection);
      } else if (id.startsWith('system-')) {
        node = this.nodes[id];
        this.details = node.system.properties;
      } else if (id.startsWith('datastream-schema')) {
        node = this.nodes[id];
        node.datastream.getSchema().then(schema => {
          that.details = jsonParser.parseData(schema);
        });
      } else if (id.startsWith('foi-')) {
        node = this.nodes[id];
        this.details = node.foi.properties;
      } else if (id.startsWith('datastream-stream-observation')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        this.datastreamProperties = node.datastream.properties;
        this.datastreamNetworkProperties = node.datastream.networkProperties;
      } else if (id.startsWith('datastream-search-observation')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        node.datastream.searchObservations(new ObservationFilter(), 10).then((collection) => this.collectionSearch = collection);
      } else if (id.startsWith('datastream-')) {
        node = this.nodes[id];
        this.details = node.datastream.properties;
      } else if (id.startsWith('control-stream-command')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        this.controlStreamCommand = node.control;
      } else if (id.startsWith('control-search-command')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        node.control.searchCommands(new CommandFilter(), 10).then((collection) => this.collectionSearch = collection);
      } else if (id.startsWith('control-stream-status')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        this.controlStreamStatus = node.control;
      } else if (id.startsWith('control-search-status')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        node.control.searchStatus(new ControlFilter(), 10).then((collection) => this.collectionSearch = collection);
      } else if (id.startsWith('control-schema')) {
        node = this.nodes[id];
        node.control.getSchema().then(schema => {
          that.details = jsonParser.parseData(schema);
        });
      } else if (id.startsWith('control-')) {
        node = this.nodes[id];
        this.details = node.control.properties;
      }
      this.activeNode = true;
      return node;
    },
  },
  methods: {
    handleError(error) {
      console.error(error)
      this.alertContent = error;
      this.alert = true;
    },
    refresh() {
      this.resetSelected();
      this.init();
      this.kk++;
    },
    changeUrl(event) {
      this.fetchUrl = event.fetch;
      this.mqttUrl = event.mqtt;
      this.tls = event.tls;
      this.mqttPrefix = event.mqttPrefix;
      this.refresh();
    },
    init() {
      this.systemsUtility = new Systems({
        protocol: 'http',
        tls: this.tls,
        endpointUrl: this.fetchUrl,
        mqttPrefix: this.mqttPrefix,
        mqttUrl: this.mqttUrl
      });
      this.systems = [];
    },
    resetSelected() {
      this.datastreamProperties = undefined;
      this.datastreamNetworkProperties = undefined;
      this.controlStreamCommand = undefined;
      this.controlStreamStatus = undefined;
      this.collectionSearch = undefined;
      this.details = undefined;
      this.activeNode = false;
      this.alert = false;
    },
    async fetchData(item) {
      try {
        if (item.name === 'Systems') {
          await this.fetchSystem(item);
        } else if (item.name.startsWith('DataStreams')) {
          await this.fetchDataStream(item);
        } else if (item.name.startsWith('Controls')) {
          await this.fetchControl(item);
        } else if (item.name.startsWith('Fois')) {
          await this.fetchFoi(item);
        } else if (item.name.startsWith('Members')) {
          await this.fetchMembers(item);
        }
        this.alert = false;
      } catch (error) {
        console.log(error);
        this.alertContent = error;
        this.alert = true;
      }
    },
    async fetchSystem(item) {
      const systemFilter = new SystemFilter({});

      const systemCollection = await this.systemsUtility.searchSystems(systemFilter, 10);
      while (systemCollection.hasNext()) {
        const page = await systemCollection.nextPage();
        for (let i = 0; i < page.length; i++) {
          const system = page[i];
          this.addSystem(item, system);
        }
      }
    },
    addSystem(item, system) {
      const datastreamsNode = {
        id: `datastreams-${this.count++}`,
        name: 'DataStreams',
        system: system,
        children: []
      };

      const controlsNode = {
        id: `controls-${this.count++}`,
        name: 'Controls',
        system: system,
        children: []
      };

      const membersNode = {
        id: `members-${this.count++}`,
        name: 'Members',
        system: system,
        children: []
      };

      const foisNode = {
        id: `fois-${this.count++}`,
        name: 'Fois',
        system: system,
        children: []
      };

      const eventsNode = {
        id: `system-events-${this.count++}`,
        name: 'Events',
        system: system,
      };

      this.nodes[eventsNode.id] = eventsNode;

      const historyNode = {
        id: `system-history-${this.count++}`,
        name: 'History',
        system: system,
      };

      this.nodes[historyNode.id] = historyNode;

      const systemDetailsNode = {
        id: `system-details-${this.count++}`,
        name: 'SensorML',
        system: system,
      };
      this.nodes[systemDetailsNode.id] = systemDetailsNode;

      const nodeId = `system-${this.count++}`;
      this.nodes[nodeId] = {
        id: nodeId,
        name: system.properties.properties.name,
        system: system,
        children: [
          datastreamsNode,
          controlsNode,
          membersNode,
          foisNode,
          eventsNode,
          historyNode,
          systemDetailsNode
        ]
      };
      item.children.push(this.nodes[nodeId]);
    },
    async fetchDataStream(item) {
      const system = item.system;
      const dataStreamFilter = new DataStreamFilter({});
      const datastreams = await system.searchDataStreams(dataStreamFilter, 100);
      while (datastreams.hasNext()) {
        const page = await datastreams.nextPage();
        for (let i = 0; i < page.length; i++) {
          const datastream = page[i];

          const datastreamDetailsNode = {
            id: `datastream-schema-${this.count++}`,
            name: 'Schema',
            system: system,
            datastream: datastream
          };

          const datastreamStreamObservationNode = {
            id: `datastream-stream-observation-${this.count++}`,
            name: 'Live Observations',
            system: system,
            datastream: datastream
          };

          const datastreamSearchObservationNode = {
            id: `datastream-search-observation-${this.count++}`,
            name: 'Historical Observations',
            system: system,
            datastream: datastream
          };

          const datastreamNode = {
            id: `datastream-${this.count++}`,
            name: datastream.properties.name,
            system: system,
            datastream: datastream,
            children: [
              datastreamDetailsNode,
              datastreamStreamObservationNode,
              datastreamSearchObservationNode
            ]
          };

          this.nodes[datastreamDetailsNode.id] = datastreamDetailsNode;
          this.nodes[datastreamStreamObservationNode.id] = datastreamStreamObservationNode;
          this.nodes[datastreamSearchObservationNode.id] = datastreamSearchObservationNode;
          this.nodes[datastreamNode.id] = datastreamNode;

          item.children.push(datastreamNode);
        }
      }
    },
    async fetchFoi(item) {
      const system = item.system;
      const featureOfInterestFiltlter = new FeatureOfInterestFilter({});
      const fois = await system.searchFeaturesOfInterest(featureOfInterestFiltlter, 10);
      while (fois.hasNext()) {
        const page = await fois.nextPage();

        for (let i = 0; i < page.length; i++) {
          const foi = page[i];
          const nodeId = `foi-${this.count++}`;
          this.nodes[nodeId] = {
            id: nodeId,
            name: foi.properties.properties.name,
            system: system,
            foi: foi,
          };
          item.children.push(this.nodes[nodeId]);
        }
      }
    },
    async fetchControl(item) {
      const system = item.system;
      const controlFilter = new ControlFilter({});
      const controls = await system.searchControls(controlFilter, 100);
      while (controls.hasNext()) {
        const page = await controls.nextPage();
        for (let i = 0; i < page.length; i++) {
          const control = page[i];

          const controlDetailsNode = {
            id: `control-schema-${this.count++}`,
            name: 'Schema',
            system: system,
            control: control
          };

          const controlStreamCommandNode = {
            id: `control-stream-command-${this.count++}`,
            name: 'Live Commands',
            system: system,
            control: control
          };

          const controlSearchCommandNode = {
            id: `control-search-command-${this.count++}`,
            name: 'Historical Commands',
            system: system,
            control: control
          };

          const controlStreamStatusNode = {
            id: `control-stream-status-${this.count++}`,
            name: 'Live Status messages',
            system: system,
            control: control
          };

          const controlSearchStatusNode = {
            id: `control-search-status-${this.count++}`,
            name: 'Historical Status',
            system: system,
            control: control
          };


          const controlNode = {
            id: `control-${this.count++}`,
            name: control.properties.name,
            system: system,
            control: control,
            children: [
              controlDetailsNode,
              controlStreamCommandNode,
              controlSearchCommandNode,
              controlStreamStatusNode,
              controlSearchStatusNode
            ]
          };

          this.nodes[controlDetailsNode.id] = controlDetailsNode;
          this.nodes[controlStreamCommandNode.id] = controlStreamCommandNode;
          this.nodes[controlSearchCommandNode.id] = controlSearchCommandNode;
          this.nodes[controlStreamStatusNode.id] = controlStreamStatusNode;
          this.nodes[controlSearchStatusNode.id] = controlSearchStatusNode;
          this.nodes[controlNode.id] = controlNode;

          item.children.push(controlNode);
        }
      }
    },
    async fetchMembers(item) {
      const system = item.system;
      const systemFilter = new SystemFilter({});
      const members = await system.searchMembers(systemFilter, 100);
      while (members.hasNext()) {
        const page = await members.nextPage();
        for (let i = 0; i < page.length; i++) {
          const member = page[i];
          this.addSystem(item, member);
        }
      }
    }
  }
};
</script>
<style>
html, body {
  overflow-y: hidden !important;
  margin: 0;
  padding: 0
}

.v-toolbar__content, .v-toolbar__extension {
  padding: 4px 4px;
  font-family: sans-serif;
}

.v-toolbar__title {
  margin-left: 10px;
}

.v-treeview-node__prepend {
  margin-right: 12px;
}

.vjs-tree {
  max-height: 800px;
  overflow: auto !important;
}

.progress {
  align-self: center;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  vertical-align: middle;
  margin: auto;
  justify-content: center;
}

.jsonpre {
  width: 100%;
  text-align: unset !important;
  overflow: auto !important;
  padding-left: 12px;
}

.treeview {
  height: 100%;
  display: flex;
  flex-direction: column;
}

::v-deep .v-window.v-item-group {
  flex-grow: 1;
}

::v-deep .v-window__container {
  height: 100%;
}

.v-treeview {
  height: 100% !important;
  max-height: 800px;
  overflow: auto;
}

.full {
  height: 100%;
}

#app {
  height: 100%;
  width: 100%;
}

.v-treeview--dense .v-treeview-node__root {
  min-height: 30px !important;
}

.row {
  flex-wrap: unset !important;
}

code {
  background: none !important;
  text-shadow: unset !important;
}

.vjs-tree__node.is-highlight, .vjs-tree__node:hover {
  background-color: rgba(41, 161, 217, 0.19)
}

.noprettyjson {
  overflow: auto !important;
  max-height: 800px;
}

.col {
  overflow: auto !important;
}

.theme--dark.v-card {
  background-color: #2f2f2f !important;
}

.v-treeview-node__content {
  cursor: pointer;
}
</style>


