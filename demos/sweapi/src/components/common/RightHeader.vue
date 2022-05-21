<template>
  <div class="header" :id="headerId">
    <v-container fluid>
      <v-switch
          v-model="prettyJson"
          label="Pretty JSON"
          :disabled="!isJson"
          class="vswtich"
      ></v-switch>
    </v-container>
    <v-container fluid>
      <slot v-if="pagination">
        <Pagination
            @change="onPageChanged"
        >
        </Pagination>
      </slot>
    </v-container>
    <v-container
        fluid
        class="select"
    >
      <slot v-if="listboxValues1">
        <ListBox
            :selected="selected1"
            :label="label"
            :content="listboxValues1"
            @change="onChange1"
        >
        </ListBox>
      </slot>
      <slot v-if="listboxValues2">
        <ListBox
            :selected="selected2"
            :label="label"
            :content="listboxValues2"
            @change="onChange2"
        >
        </ListBox>
      </slot>
    </v-container>
  </div>
</template>

<script>
import ListBox from "./ListBox.vue";
import {randomUUID} from "../../../../../source/core/utils/Utils";
import {mapActions, mapState} from 'vuex'
import Pagination from "./Pagination.vue";

export default {
  name: "RightHeader.vue",
  components: {
    Pagination,
    ListBox
  },
  props: [
    'listboxValues1', 'listboxValues2', 'selected1', 'selected2', 'label', 'pagination'
  ],
  data() {
    return {
      headerId: randomUUID()
    }
  },
  computed: {
    prettyJson: {
      get() {
        return this.$store.state.right.header.prettyJson;
      },
      set(newValue) {
        this.updateHeader({
          prettyJson: newValue
        });
      }
    },
    ...mapState({
      isJson: state => {
        return state.right.contentType === 'application/json'
        // return state.right.contentType === 'application/json' || state.right.contentType === 'application/swe+json'
        //     || state.right.contentType === 'application/om+json'
      }
    })
  },
  mounted() {
    this.updateHeader({
      height: document.getElementById(this.headerId).offsetHeight
    });
  },
  methods: {
    ...mapActions(['updateHeader']),
    onChange1(value) {
      this.$emit('change1', value);
    },
    onChange2(value) {
      this.$emit('change2', value);
    },
    onPageChanged(value) {
      this.$emit('onPageChanged', value);
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
}

.select {
  max-width: 400px;
  display: flex;
  justify-content: end;
  vertical-align: middle;
  align-self: center;
}

.pagination-container {
  display: flex;
  align-self: center;
  justify-content: end;
}

.vswtich {

}
</style>
