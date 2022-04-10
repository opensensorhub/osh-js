<template>
  <div>
    <RightHeader
      selected1="application/om+json"
      :listboxValues1="formats"
      @change1="displaySchema"
    >
    </RightHeader>
    <v-divider></v-divider>
    <RightContent></RightContent>
  </div>
</template>

<script>
import SweApiFetchGenericJson
  from "../../../../source/core/datasource/sweapi/parser/json/SweApiFetchGenericJson.parser";
import DataStreamFilter from "../../../../source/core/sweapi/datastream/DataStreamFilter";
import Control from "../../../../source/core/sweapi/control/Control";
import ControlFilter from "../../../../source/core/sweapi/control/ControlFilter";
import DataStream from "../../../../source/core/sweapi/datastream/DataStream";
import RightHeader from "./common/RightHeader.vue";
import RightContent from "./common/RightContent.vue";
import { mapActions, mapState } from 'vuex'

export default {
  name: "Schema",
  components: {
    RightHeader,
    RightContent
  },
  props: [
    'objCompliantSchema'
  ],
  data() {
    return {
      formats: ['application/om+json'],
      jsonParser: new SweApiFetchGenericJson(),
    }
  },
  mounted() {
    this.formats = this.objCompliantSchema.properties.formats;
    this.displaySchema();
  },
  methods: {
    ...mapActions(['updateRightContent']),
    displaySchema(format) {
      console.log(format)
      const that = this;
      let filter;
      //TODO: better way to do this??
      if(this.objCompliantSchema instanceof DataStream) {
        filter = new DataStreamFilter({
          obsFormat: format
        });
      } else if(this.objCompliantSchema instanceof Control) {
        filter = new ControlFilter({
          format: format
        });
      }
      this.objCompliantSchema.getSchema(filter).then(schema => {
        that.updateRightContent(that.jsonParser.parseData(schema));
      });
    }
  }
}
</script>

<style scoped>
</style>
