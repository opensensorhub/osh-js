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
                open-on-click
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
            <v-scroll-y-transition mode="out-in">
              <div
                  v-if="!selected"
                  class="text-h6 grey--text text--lighten-1 font-weight-light"
                  style="align-self: center;"
              >
                Select a Component
              </div>
              <div
                  v-else-if="details === undefined"
                  class="text-h6 grey--text text--lighten-1 font-weight-light progress"
                  style="align-self: center;"
              >
                <v-progress-circular
                    indeterminate
                    :size="100"
                    color="primary"
                ></v-progress-circular>
              </div>
              <div class="white--text jsonpre" v-else>
                <v-row align="center">
                  <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                  >
                    <v-switch
                        v-model="prettyJson"
                        label="Pretty JSON"
                    ></v-switch>
                  </v-col>

                  <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                  >

                    <v-select
                        :items='["ws", "http", "mqtt"]'
                        label="Protocol"
                        dense
                        read-only
                        v-model="dataStreamProtocol"
                        @change="changeStreamProtocol"
                    ></v-select>
                  </v-col>
                </v-row>
                <!--vue-json-pretty :path="'res'" :data="details"></vue-json-pretty-->
                <!--                <pre>{{ details }}</pre>-->
                <vue-json-pretty :path="'res'" :data="details" v-if="prettyJson"></vue-json-pretty>
                <div class="noprettyjson" v-else-if="stream">
                  <pre> {{ details }}</pre>
                </div>
                <div class="noprettyjson" v-else="stream">
                  <pre><code class="language-json" v-html="highlight(details)"></code></pre>
                </div>
              </div>
            </v-scroll-y-transition>
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
import Systems from "../../../source/core/sensorwebapi/api/system/Systems";
import SystemFilter from "../../../source/core/sensorwebapi/api/system/SystemFilter";

import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import DataStreamFilter from "../../../source/core/sensorwebapi/api/datastream/DataStreamFilter";
import FeatureOfInterestFilter from "../../../source/core/sensorwebapi/api/featureofinterest/FeatureOfInterestFilter";
import ObservationFilter from "../../../source/core/sensorwebapi/api/observation/ObservationFilter";
import SensorWebApiFetchJson from "../../../source/core/datasource/parsers/sensorwebapi/SensorWebApiFetchJson.parser";
import {isDefined} from "../../../source/core/utils/Utils";
import SensorWebApiFetchStreamJsonParser
  from "../../../source/core/datasource/parsers/sensorwebapi/SensorWebApiFetchStreamJson.parser";

export default {
  components: {
    VueJsonPretty
  },
  data() {
    return {
      active: [],
      open: [],
      systems: [],
      nodes: {},
      details: undefined,
      count: 0,
      stream: false,
      prettyJson: true,
      currentDataStream: undefined,
      dataStreamProtocol: 'ws'
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
    selected() {
      const that = this;
      if (!this.active.length) return undefined

      this.stream = false;
      const id = this.active[0]
      this.details = undefined;

      const node = this.nodes[id];
      if (id.startsWith('system-details')) {
        node.system.getDetails().then(details => {
          that.details = details;
        });
      } else if (id.startsWith('datastream-details')) {
        this.details = node.datastream.properties;
      } else if (id.startsWith('foi-')) {
        this.details = node.foi.properties;
      } else if (id.startsWith('datastream-observation')) {
        this.stream = true;
        const datastream = node.datastream;
        const parser = new SensorWebApiFetchStreamJsonParser();
        this.details = [];
        const nodeId = node.id;
        if(this.dataStreamProtocol === 'ws') {
          datastream.streamObservations(new ObservationFilter(), function (obs) {
            if (that.active[0] !== nodeId) {
              // node is different, disconnect
              console.warn('node is different, disconnect from previous one');
              datastream._network.stream.connector.disconnect();
            } else {
              that.details = parser.parseData(obs);
            }
          });
        } else if(this.dataStreamProtocol === 'http') {
          if (that.active[0] !== nodeId) {
            // node is different, disconnect
            console.warn('node is different, disconnect from previous one');
            datastream._network.stream.connector.disconnect();
          }

          let collection = datastream.searchObservations(new ObservationFilter());
          let asyncCollection = async () => {
            outer: while(collection.hasNext()) {
              const page = await collection.nextPage();
              for(let pageElement of page) {
                that.details = pageElement;
                if (that.active[0] !== nodeId || this.dataStreamProtocol !== 'http') {
                  // node is different, disconnect
                  console.warn('node is different, disconnect from previous one');
                  break outer;
                }
              }
            }
            console.warn('end of HTTP stream');
          };
          asyncCollection();
        }
        this.currentDataStream = datastream;
      }
      return node;
    },
  },
  methods: {
    changeStreamProtocol(value) {
      if(isDefined(this.currentDataStream)) {
        this.currentDataStream.setStreamProtocol(value, 'arraybuffer');
      }
    },
    highlight(details) {
      return Prism.highlight(JSON.stringify(details, null, 1), Prism.languages.json);
    },
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
            id: `datastream-details-${this.count++}`,
            name: 'details',
            system: system,
            datastream: datastream
          };

          const datastreamObservationNode = {
            id: `datastream-observation-${this.count++}`,
            name: 'observation',
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
              datastreamObservationNode
            ]
          };

          this.nodes[datastreamDetailsNode.id] = datastreamDetailsNode;
          this.nodes[datastreamObservationNode.id] = datastreamObservationNode;
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
</style>


