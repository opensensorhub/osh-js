<template>
  <div>
    <div class="header" :id="headerId">
      <v-container>
        <v-switch
            v-model="prettyJson"
            label="Pretty JSON"
        ></v-switch>
      </v-container>
      <v-container
          class="pagination-container"
      >
        <v-pagination
            v-model="pagination.page"
            :length="pagination.total / 5"
            :total-visible="pagination.visible"
            @input="setPage"
        ></v-pagination>
      </v-container>
    </div>
    <v-divider></v-divider>
    <slot v-if="content">
      <vue-json-pretty :path="'res'" :data="content" v-if="prettyJson" class="prettyjson" :style="heightVar"></vue-json-pretty>
      <div class="noprettyjson" :style="heightVar" v-else>
        <pre> {{ content }} </pre>
      </div>
    </slot>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {randomUUID} from "../../../../source/core/utils/Utils";

export default {
  name: "SearchContent",
  props: [
    'collection','nodeId', 'maxHeight'
  ],
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      headerId: randomUUID(),
      prettyJson: true,
      content: undefined,
      active: true,
      pagination: {
        page: 1,
        total: 1000,
        visible: 10
      },
      cache: {},
      heightVar: 0
    }
  },
  mounted() {
    this.heightVar = this.heightVars();
    this.connect();
  },
  async destroyed(){
    // make it async
    const that = this;
    new Promise((resolve, reject) => {
      that.disconnect();
    });
  },
  methods: {
    heightVars() {
      const headerHeight = document.getElementById(this.headerId).offsetHeight;
      this.height = this.maxHeight - headerHeight;
      return {
        '--height': this.height + 'px'
      }
    },
    setPage(value) {
      if(!(value in this.cache)) {
         this.collection.nextPage(value - 1).then(page => {
            this.content = page;
            this.cache[value]= page;
         }).catch((error) => {
           this.$emit('error', error);
         });
      } else {
        this.content = this.cache[value];
      }
    },
    connect() {
        this.collection.nextPage().then(page => {
          this.content = page;
          this.cache[1] = page;
        }).catch((error) => {
          this.$emit('error', error);
        });
    },
    disconnect() {
      this.active = false;
    },
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}

.header > div {
  margin-left: 0;
}

.pagination-container {
  display: flex;
  align-self: center;
  justify-content: end;
}
.prettyjson, .noprettyjson {
  overflow: auto;
  height: var(--height);
}
</style>
