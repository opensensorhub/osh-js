<template>
  <v-app>
    <div id="app">
      <v-card height="100%">
        <v-card-title class="blue accent-3 white--text text-h5">
          SensorWebAPI: https://ogct17.georobotix.io:8443/
        </v-card-title>
        <v-row
            class="pa-4 full"
            justify="space-between"
        >
          <v-col cols="5" class="full">
            <v-treeview
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
              <NoSelectedContent v-if="!selected"></NoSelectedContent>
              <Details v-else-if="!datastream && details"
                :details="details"
              ></Details>
              <StreamObservationsContent v-else-if="datastream"
                 :datastream="datastream"
                 :key="datastreamNodeId"
              ></StreamObservationsContent>
            <SearchObservationsContent v-else-if="datastreamSearch"
                                       :datastream="datastreamSearch"
                                       :key="datastreamNodeId"
            ></SearchObservationsContent>
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
import SearchObservationsContent from "./components/SearchObservationsContent.vue";

import DataStreamFilter from "../../../source/core/sweapi/datastream/DataStreamFilter";
import FeatureOfInterestFilter from "../../../source/core/sweapi/featureofinterest/FeatureOfInterestFilter";
import SweApiFetchGenericJson from "../../../source/core/datasource/sweapi/parser/json/SweApiFetchGenericJson.parser";
import {isDefined} from "../../../source/core/utils/Utils";

export default {
  components: {
    Details,
    NoSelectedContent,
    ContentLoading,
    VueJsonPretty,
    StreamObservationsContent,
    SearchObservationsContent
  },
  data() {
    return {
      active: [],
      open: [],
      systems: [],
      nodes: {},
      details: undefined,
      count: 0,
      datastream: undefined,
      datastreamSearch: undefined,
      datastreamNodeId: undefined,
      prettyJson: true
    }
  },
  beforeMount() {
  },
  mounted() {
    // if you are intending to use Prism functions manually, you will need to set:
    Prism.manual = true;
    Prism.highlightAll();

    this.systemsUtility = new Systems({
      protocol: 'http',
      tls: true,
      endpointUrl: 'ogct17.georobotix.io:8443/sensorhub'
    });
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

      this.datastream = undefined;
      this.datastreamSearch = undefined;
      this.details = undefined;
      if (!this.active.length) return undefined

      const id = this.active[0]
      if(!isDefined(id)) return undefined;

      const node = this.nodes[id];
      this.datastreamNodeId = node.id;
      const jsonParser = new SweApiFetchGenericJson();
      let node;
      if (id.startsWith('system-details')) {
        node = this.nodes[id];
        node.system.getDetails().then(details => {
          that.details = jsonParser.parseData(details);
        });
      } else if(id.startsWith('system-')) {
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
        this.datastreamNodeId = node.id;
        this.datastream = node.datastream;
      } else if(id.startsWith('datastream-search-observation')) {
        node = this.nodes[id];
        this.datastreamNodeId = node.id;
        this.datastreamSearch = node.datastream;
      } else if(id.startsWith('datastream-')) {
        node = this.nodes[id];
        this.details = node.datastream.properties;
      }
      return node;
    },
  },
  methods: {
    async fetchData(item) {
      if (item.name === 'Systems') {
        await this.fetchSystem(item);
      } else if (item.name.startsWith('DataStreams')) {
        await this.fetchDataStream(item);
      } else if (item.name.startsWith('Fois')) {
        await this.fetchFoi(item);
      }
    },
    async fetchSystem(item) {
      const systemFilter = new SystemFilter({});

      const systemCollection = await this.systemsUtility.searchSystems(systemFilter, 10);
      while (systemCollection.hasNext()) {
        const page = await systemCollection.nextPage();
        for (let i = 0; i < page.length; i++) {
          const system = page[i];

          const datastreamsNode = {
            id: `datastreams-${this.count++}`,
            name: 'DataStreams',
            system: system,
            children: []
          };

          const foisNode = {
            id: `fois-${this.count++}`,
            name: 'Fois',
            system: system,
            children: []
          };

          const systemDetailsNode = {
            id: `system-details-${this.count++}`,
            name: 'SensorML',
            system: system,
          };
          this.nodes[systemDetailsNode.id] = systemDetailsNode;

          const nodeId = `system-${this.count++}`;
          this.nodes[nodeId] = {
            id: nodeId,
            name: system.properties.name,
            system: system,
            children: [
              datastreamsNode,
              foisNode,
              systemDetailsNode
            ]
          };
          item.children.push(this.nodes[nodeId]);
        }
      }
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
            name: 'schema',
            system: system,
            datastream: datastream
          };

          const datastreamStreamObservationNode = {
            id: `datastream-stream-observation-${this.count++}`,
            name: 'streamObservations',
            system: system,
            datastream: datastream
          };

          const datastreamSearchObservationNode = {
            id: `datastream-search-observation-${this.count++}`,
            name: 'searchObservations (http)',
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


