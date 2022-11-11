<template>
  <v-app id="app">
    <v-system-bar
        app
        class=" accent-3 white--text text-h5 app-alert disableCaret"
        v-if="alert"
        height="60px"
    >
      <v-alert
          v-model="alert"
          color="red lighten-0"
          dense
          dark
          dismissible
          width="100%"
          class="disableCaret"
      >{{ alertContent }}
      </v-alert>
    </v-system-bar>
    <v-app-bar
        app
        class="blue accent-3 white--text text-h5 app-title disableCaret"
        height="60px"
    >
      <v-btn
          class="mx-4 disableCaret"
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
      <v-divider vertical class="disableCaret"></v-divider>
      <UrlEditComponentDialog
          @updated-url="changeUrl"
          class="disableCaret"
      ></UrlEditComponentDialog>
      SensorWebAPI: {{ fetchUrl }}
    </v-app-bar>

    <v-main
        :key="sizeKey"
    >
      <div class="main">
        <div class="left disableCaret">
          <v-treeview
              :key="kk"
              dense
              class="treeview disableCaret"
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
            <template v-slot:label="{ item }">
              <span :title="item.name">{{ item.name }}</span>
            </template>
          </v-treeview>
        </div>
        <v-divider vertical class="divider disableCaret"></v-divider>
        <div class="right">
            <NoSelectedContent v-if="!selected || !activeNode"></NoSelectedContent>
            <Details v-else-if="details" :key="panelKey"></Details>
            <Schema
                v-else-if="isSchemaPanel"
                :objCompliantSchema="objCompliantSchema"
                :key="panelKey"
            ></Schema>
            <LiveObservations
                v-else-if="isLiveDataStreamPanel"
                :datastream="dataStream"
                :key="panelKey"
            ></LiveObservations>
            <LiveCommands
                v-else-if="isLiveCommandStatusPanel"
                :control="control"
                :key="panelKey"
            ></LiveCommands>
            <LiveControlStatus
                v-else-if="isLiveControlStatusPanel"
                :control="control"
                :key="panelKey"
            ></LiveControlStatus>
            <HistoricalObservations
                v-else-if="isHistoricalObservationPanel"
                :datastream="dataStream"
                @error="handleError"
                :key="panelKey"
            ></HistoricalObservations>
            <HistoricalCommands
              v-else-if="isHistoricalCommandsPanel"
              :control="control"
              @error="handleError"
              :key="panelKey"
            ></HistoricalCommands>
            <HistoricalStatus
              v-else-if="isHistoricalStatusPanel"
              :control="control"
              @error="handleError"
              :key="panelKey"
            ></HistoricalStatus>
            <ContentLoading  v-else></ContentLoading>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import ContentLoading from './components/common/ContentLoading.vue';
import NoSelectedContent from "./components/common/NoSelectedContent.vue";
import Details from "./components/Details.vue";
import LiveObservations from "./components/LiveObservations.vue";
import LiveCommands from "./components/LiveCommands.vue";
import LiveControlStatus from './components/LiveControlStatus.vue';
import HistoricalObservations from "./components/HistoricalObservations.vue";
import HistoricalCommands from "./components/HistoricalCommands.vue";
import HistoricalStatus from "./components/HistoricalStatus.vue";
import UrlEditComponentDialog from "./components/UrlEditComponentDialog.vue";
import Schema from "./components/Schema.vue";

import Systems from "osh-js/core/sweapi/system/Systems";
import SystemFilter from "osh-js/core/sweapi/system/SystemFilter";
import DataStreamFilter from "osh-js/core/sweapi/datastream/DataStreamFilter";
import FeatureOfInterestFilter from "osh-js/core/sweapi/featureofinterest/FeatureOfInterestFilter";
import {isDefined} from "osh-js/core/utils/Utils";
import ControlFilter from "osh-js/core/sweapi/control/ControlFilter";
import EventFilter from "osh-js/core/sweapi/event/EventFilter";
import SystemHistoryFilter from "osh-js/core/sweapi/history/SystemHistoryFilter";
import { mapActions } from 'vuex'
import {randomUUID} from "osh-js/core/utils/Utils";
import SweCollectionDataParser from "osh-js/core/parsers/sweapi/collection/SweCollectionDataParser";

export default {
  components: {
    Details,
    NoSelectedContent,
    ContentLoading,
    HistoricalObservations,
    HistoricalCommands,
    HistoricalStatus,
    LiveCommands,
    LiveControlStatus,
    LiveObservations,
    UrlEditComponentDialog,
    Schema
  },
  data() {
    return {
      sizeKey: 0,
      treeMaxHeight: 800,
      drawer: true,
      active: [],
      activeNode: true,
      open: [],
      systems: [],
      nodes: {},
      count: 0,
      dataStream: undefined,
      controlProperties: undefined,
      control: undefined,
      objCompliantSchema: undefined,
      collectionSearch: undefined,
      nodeId: undefined,
      kk: 0,
      alert: false,
      alertContent: undefined,
      details: false, // panel
      isSchemaPanel: false, // panel
      isLiveDataStreamPanel: false, // panel
      isLiveControlStatusPanel: false, // panel
      isLiveCommandStatusPanel: false, // panel
      isHistoricalObservationPanel: false, // panel
      isHistoricalCommandsPanel: false, // panel
      isHistoricalStatusPanel: false, //panel
      panelKey: randomUUID(),
    }
  },
  beforeMount() {
  },
  mounted() {
    this.computeMaxHeight();
    this.init();
  },
  computed: {
    fetchUrl() {
      return this.$store.state.server.url
    },
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

      const jsonParser = new SweCollectionDataParser('application/json');
      let node;
      if (id.startsWith('system-details')) {
        node = this.nodes[id];
        node.system.getDetails().then(details => {
          that.details = true;
          that.updateRightContent({
            content: details,
            contentType: 'application/json'
          });
        });
      } else if (!id.startsWith('system-history') && id.startsWith('system-')) {
        node = this.nodes[id];
        that.details = true;
        this.updateRightContent({
          content: node.system.properties,
          contentType: 'application/json'
        });
      } else if (id.startsWith('datastream-schema')) {
        node = this.nodes[id];
        this.objCompliantSchema = node.datastream;
        this.isSchemaPanel = true;
      } else if (id.startsWith('foi-')) {
        node = this.nodes[id];
        that.details = true;
        this.updateRightContent({
          content: node.foi.properties,
          contentType: 'application/json'
        });
      } else if (id.startsWith('event-')) {
        node = this.nodes[id];
        that.details = true;
        this.updateRightContent({
          content: node.event.properties,
          contentType: 'application/json'
        });
      } else if (id.startsWith('datastream-stream-observation')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        this.dataStream = node.datastream;
        this.isLiveDataStreamPanel = true;
      } else if (id.startsWith('datastream-search-observation')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        this.dataStream = node.datastream;
        this.isHistoricalObservationPanel = true;
      } else if (id.startsWith('datastream-')) {
        node = this.nodes[id];
        this.details = true;
        this.updateRightContent({
          content: node.datastream.properties,
          contentType: 'application/json'
        });
      } else if (id.startsWith('control-stream-command')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        this.control = node.control;
        this.isLiveCommandStatusPanel = true;
      } else if (id.startsWith('control-search-command')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        this.control = node.control;
        this.isHistoricalCommandsPanel = true;
      } else if (id.startsWith('control-stream-status')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        this.networkProperties = node.control.networkProperties;
        this.control = node.control;
        this.isLiveControlStatusPanel = true;
      } else if (id.startsWith('control-search-status')) {
        node = this.nodes[id];
        this.nodeId = node.id;
        this.control = node.control;
        this.isHistoricalStatusPanel = true;
      } else if (id.startsWith('control-schema')) {
        node = this.nodes[id];
        this.objCompliantSchema = node.control;
        this.isSchemaPanel = true;
      } else if (id.startsWith('control-')) {
        node = this.nodes[id];
        this.details = true;
        this.updateRightContent({
          content: node.control.properties,
          contentType: 'application/json'
        });
      }
      this.activeNode = true;
      return node;
    },
  },
  methods: {
    ...mapActions(['updateRightContent','updateMaxHeight', 'reset', 'updateServer']),
    onResize({width, height}) {
      this.computeMaxHeight();
      this.sizeKey = '' + width + height // invalidate resizable components
    },
    computeMaxHeight() {
      const that = this;
      setTimeout(() => {
        const offsetHeight = document.querySelector(".main").offsetHeight;
        that.updateMaxHeight(offsetHeight);
        document.querySelector(".left").style.maxHeight = offsetHeight + 'px';
        document.querySelector(".right").style.maxHeight = offsetHeight + 'px';
        document.querySelector(".right").style.height = offsetHeight + 'px';
      }, 500);
    },
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
      this.refresh();
    },
    init() {
      this.systemsUtility = new Systems({
        protocol: 'http',
        tls: this.$store.state.server.tls,
        endpointUrl: this.$store.state.server.url,
        mqttOpts: {
          prefix: this.$store.state.server.mqtt.prefix,
          endpointUrl: this.$store.state.server.mqtt.url
        }
      });
      this.systems = [];
    },
    resetSelected() {
      // this.reset();
      this.datastreamProperties = undefined;
      this.networkProperties = undefined;
      this.control = undefined;
      this.collectionSearch = undefined;
      this.objCompliantSchema = undefined;
      this.activeNode = false;
      this.alert = false;
      this.details = false;
      this.isSchemaPanel = false;
      this.isLiveDataStreamPanel = false;
      this.isLiveControlStatusPanel = false;
      this.isLiveCommandStatusPanel = false;
      this.isHistoricalStatusPanel = false;
      this.isHistoricalCommandsPanel = false;
      this.isHistoricalObservationPanel = false;
      this.panelKey = randomUUID(); // force re-render schema panel
      this.updateRightContent({
        content: '',
        contentType: 'plain/text'
      });
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
        } else if (item.name.startsWith('History')) {
          await this.fetchHistory(item);
        } else if (item.name.startsWith('Events')) {
          await this.fetchEvents(item);
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
    addSystem(item, system, isHistory = false) {
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
        children: []
      };

      this.nodes[eventsNode.id] = eventsNode;

      const historyNode = {
        id: `system-history-${this.count++}`,
        name: 'History',
        system: system,
        children: []
      };

      this.nodes[historyNode.id] = historyNode;

      const systemDetailsNode = {
        id: `system-details-${this.count++}`,
        name: 'SensorML',
        system: system,
      };
      this.nodes[systemDetailsNode.id] = systemDetailsNode;

      const nodeId = `system-${this.count++}`;

      let children = [];
      if (!isHistory) {
        children = [
          datastreamsNode,
          controlsNode,
          membersNode,
          historyNode,
          foisNode,
          eventsNode,
          systemDetailsNode
        ]
      } else {
        children = [
          datastreamsNode,
          controlsNode,
          membersNode,
          foisNode,
          eventsNode,
          systemDetailsNode
        ]
      }
      this.nodes[nodeId] = {
        id: nodeId,
        name: system.properties.properties.name,
        system: system,
        children: children
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
    },
    async fetchHistory(item) {
      const system = item.system;
      const systemHistoryFilter = new SystemHistoryFilter({});
      const systemsHistory = await system.searchHistory(systemHistoryFilter, 100);
      while (systemsHistory.hasNext()) {
        const page = await systemsHistory.nextPage();
        for (let i = 0; i < page.length; i++) {
          const system = page[i];
          this.addSystem(item, system, true);
        }
      }
    },
    async fetchEvents(item) {
      const system = item.system;
      const eventFilter = new EventFilter({});
      const events = await system.searchEvents(eventFilter, 100);
      while (events.hasNext()) {
        const page = await events.nextPage();
        for (let i = 0; i < page.length; i++) {
          const event = page[i];
          const nodeId = `event-${this.count++}`;
          this.nodes[nodeId] = {
            id: `event-${this.count++}`,
            name: event.id,
            system: system,
            event: event,
          };
          item.children.push(this.nodes[nodeId]);
        }
      }
    }
  }
};
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden !important;
}

#app {
  height: 100%;
  width: 100%;
}

.app-alert {
  background-color: #313131 !important;
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

.theme--dark.v-card {
  background-color: #2f2f2f !important;
}

.v-treeview-node__content {
  cursor: pointer;
}

.disableCaret {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}

.treeview {
  height: 100%;
  overflow: auto;
  max-width: 500px;
  width: 500px;
}

.left {
  display: block;
  overflow: auto;
  height: 100%;
}

.main {
  background-color: #313131;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.right {
  width: 100%;
  height: 100%;
  background-color: #313131;
  overflow: hidden;
}

.divider {
  border: solid 1px hsl(0deg 0% 100% / 12%) !important;
}

.vjs-tree__node.is-highlight, .vjs-tree__node:hover {
  background-color: rgba(41, 161, 217, 0.19)
}

</style>


