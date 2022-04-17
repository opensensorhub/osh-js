<template>
  <div>
    <RightHeader
        pagination="1"
        @onPageChanged="setPage"
        :selected1="currentFormat"
        :listboxValues1="datastream.properties.format"
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
import ObservationFilter from "../../../../source/core/sweapi/observation/ObservationFilter";

export default {
  name: "Historical",
  props: [
    'datastream'
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
      this.connect(new ObservationFilter({
        format: value
      }));
    },
    connect(observationFilter = new ObservationFilter({})) {
      this.datastream.searchObservations(observationFilter, 10).then((collection) => {
        this.collection = collection;
        this.setPage(1);
      });
    }
  }
}
</script>

<style scoped>


</style>
