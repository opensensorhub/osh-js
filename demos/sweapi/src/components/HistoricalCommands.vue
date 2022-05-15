<template>
  <div>
    <RightHeader
        pagination="1"
        @onPageChanged="setPage"
        :selected1="currentFormat"
        :listboxValues1="control.properties.formats"
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
import CommandFilter from "../../../../source/core/sweapi/command/CommandFilter";

export default {
  name: "HistoricalCommands",
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
      currentFormat: 'application/om+json',
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
          contentType: this.currentFormat
        });
      }
    },
    onChangeFormat(value) {
      this.currentFormat = value;
      this.cache = {};
      this.connect(new CommandFilter({
        format: value
      }));
    },
    connect(commandFilter = new CommandFilter({})) {
      this.control.searchCommands(commandFilter, 10).then((collection) => {
        this.collection = collection;
        this.setPage(1);
      });
    }
  }
}
</script>

<style scoped>


</style>
