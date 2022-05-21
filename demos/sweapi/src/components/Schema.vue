<template>
  <div>
    <RightHeader
      :selected1="currentFormat"
      :listboxValues1="formats"
      @change1="displaySchema"
    >
    </RightHeader>
    <v-divider></v-divider>
    <RightContent></RightContent>
  </div>
</template>

<script>
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
      formats: this.objCompliantSchema.properties.formats,
      currentFormat: this.objCompliantSchema.properties.formats[0]
    }
  },
  mounted() {
    this.formats = this.objCompliantSchema.properties.formats;
    this.displaySchema(this.currentFormat);
  },
  methods: {
    ...mapActions(['updateRightContent']),
    displaySchema(format) {
      const that = this;

      let filter;
      //TODO: better way to do this??
      if(this.objCompliantSchema instanceof DataStream) {
        filter = new DataStreamFilter({
          obsFormat: format
        });
      } else if(this.objCompliantSchema instanceof Control) {
        filter = new ControlFilter({
          commandFormat: format
        });
      }
      this.objCompliantSchema.getSchema(filter).then(schema => {
        that.updateRightContent({
          content: schema,
          contentType: 'application/json'
        });
      });
    }
  }
}
</script>

<style scoped>
</style>
