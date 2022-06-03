<template>
  <div>
    <RightHeader
        pagination="1"
        @onPageChanged="setPage"
        @change1="onChangeFormat"
    >
    </RightHeader>
    <v-divider></v-divider>
    <RightContent></RightContent>
  </div>
</template>

<script>
import RightHeader from "./common/RightHeader.vue";
import RightContent from "./common/RightContent.vue";
import { mapActions, mapState } from 'vuex'
import ControlFilter from "../../../../source/core/sweapi/control/ControlFilter";
import CommandFilter from "../../../../source/core/sweapi/command/CommandFilter";

export default {
  name: "HistoricalStatus",
  props: [
    'control', 'formats'
  ],
  components: {
    RightContent,
    RightHeader
  },
  data() {
    return {
      cache: {},
      currentPage: 1,
      collection: undefined
    }
  },
  mounted() {
    this.connect();
  },
  methods: {
    ...mapActions(['updateRightContent']),
    setPage(value) {
      this.currentPage = value;
      if (!(value in this.cache)) {
        this.collection.nextPage(value - 1).then(page => {
          this.updateRightContent({
            content: page,
            contentType: this.currentFormat
          });
          this.cache[value] = page;
        }).catch((error) => {
          this.$emit('error', error);
        });
      } else {
        this.updateRightContent({
          content: this.cache[value],
          contentType: 'application/json'
        });
      }
    },
    onChangeFormat(value) {
      this.currentFormat = value;
      this.connect(new ControlFilter());
    },
    connect(controlFilter = new ControlFilter()) {
      this.control.searchStatus(controlFilter, 10).then((collection) => {
        this.collection = collection;
        this.setPage(this.currentPage);
      });
    }
  }
}
</script>

<style scoped>


</style>
