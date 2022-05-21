<template>
  <div>
    <RightHeader
        pagination="1"
        @onPageChanged="setPage"
        :selected1="currentFormat"
        :listboxValues1="datastream.properties.formats"
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
  name: "HistoricalObservations",
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
    for(let format of this.datastream.properties.formats) {
      this.cache[format] = {};
    }
    this.connect();
  },
  methods: {
    ...mapActions(['updateRightContent']),
    setPage(value) {
      this.currentPage = value;
      if (!(value in this.cache[this.currentFormat])) {
        this.collection.page(value - 1).then(async page => {
          this.updateRightContent({
            content: page,
            contentType: this.currentFormat
          });
          this.cache[this.currentFormat][value] = page;
        }).catch((error) => {
          this.$emit('error', error);
        });
      } else {
        this.updateRightContent({
          content: this.cache[this.currentFormat][value],
          contentType: 'application/json'
        });
      }
    },
    onChangeFormat(value) {
      this.currentFormat = value;
      this.connect(new ObservationFilter({
        format: value
      }));
    },
    connect(observationFilter = new ObservationFilter({
      format: this.currentFormat
    })) {
      this.datastream.searchObservations(observationFilter, 200).then((collection) => {
        this.collection = collection;
        this.setPage(this.currentPage);
      });
    }
  }
}
</script>

<style scoped>


</style>
