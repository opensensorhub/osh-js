<template>
  <v-app>
    <div id="app">
      <v-card height="100%">
        <v-card-title class="indigo white--text text-h5">
          SensorWebAPI: https://ogct17.georobotix.io:8443/
        </v-card-title>
        <v-row
            class="pa-4"
            justify="space-between"
        >
          <v-col cols="5">
            <v-treeview
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
              class="d-flex text-center"
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
              <div class="blue--text font-weight-bold jsonpre" v-else>
                <vue-json-pretty :path="'res'" :data="details"></vue-json-pretty>
              </div>
            </v-scroll-y-transition>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-app>
</template>
<script>
// @ is an alias to /src
import Systems from "../../../source/core/sensorwebapi/api/system/Systems";
import SystemFilter from "../../../source/core/sensorwebapi/api/system/SystemFilter";

import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import DataStreamFilter from "../../../source/core/sensorwebapi/api/datastream/DataStreamFilter";
import FeatureOfInterestFilter from "../../../source/core/sensorwebapi/api/featureofinterest/FeatureOfInterestFilter";

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
      count: 0
    }
  },
  beforeMount() {
  },
  mounted() {
    this.systemsUtility = new Systems({
      info: {
        protocol: 'https',
        endpoint: 'ogct17.georobotix.io:8443/sensorhub/api'
      },
      stream: {
        protocol: 'wss',
        endpoint: 'ogct17.georobotix.io:8443/sensorhub/api'
      }
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

      const id = this.active[0]
      this.details = undefined;

      const node = this.nodes[id];
      if (id.startsWith('system-details')) {
        node.system.getDetails().then(details => {
          that.details = details;
        });
      } else if (id.startsWith('datastream-')) {
        this.details = node.datastream.properties;
      } else if (id.startsWith('foi-')) {
        this.details = node.foi.properties;
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
            name: 'System details',
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
          const nodeId = `datastream-${this.count++}`;
          this.nodes[nodeId] = {
            id: nodeId,
            name: datastream.properties.name,
            system: system,
            datastream: datastream,
          };
          item.children.push(this.nodes[nodeId]);
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

.treeview {
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
}
</style>

