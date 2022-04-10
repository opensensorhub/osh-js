<template>
  <div class="header" :id="headerId">
    <v-container>
      <v-switch
          v-model="prettyJson"
          label="Pretty JSON"
      ></v-switch>
    </v-container>
    <v-container
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
      <slot v-if="pagination">
        <Pagination
            @change="onChange"
        >
        </Pagination>
      </slot>
    </v-container>
  </div>
</template>

<script>
import ListBox from "./ListBox.vue";
import {randomUUID} from "../../../../../source/core/utils/Utils";
import { mapActions } from 'vuex'
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
      headerId: randomUUID(),
      prettyJson: true
    }
  },
  mounted() {
    this.updateHeader({
      height: document.getElementById(this.headerId).offsetHeight
    });
  },
  watch: {
    prettyJson(newValue) {
      this.updateHeader({
        prettyJson: newValue
      });
    }
  },
  methods: {
    ...mapActions(['updateHeader']),
    onChange1(value) {
      this.$emit('change1', value);
    },
    onChange2(value) {
      this.$emit('change2', value);
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
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

</style>
