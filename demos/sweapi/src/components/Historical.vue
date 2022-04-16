<template>
  <div>
    <RightHeader
        pagination="1"
        @onPageChanged="setPage"
        selected1="application/om+json"
        :listboxValues1="this.objCompliantSchema.properties.formats"
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

export default {
  name: "Historical",
  props: [
    'collection','nodeId', 'objCompliantSchema'
  ],
  components: {
    RightContent,
    RightHeader
  },
  data() {
    return {
      cache: {}
    }
  },
  mounted() {
    console.log(this.objCompliantSchema)
    this.connect();
  },
  methods: {
    ...mapActions(['updateRightContent']),
    setPage(value) {
      if(!(value in this.cache)) {
         this.collection.nextPage(value - 1).then(page => {
            this.updateRightContent(page);
            this.cache[value]= page;
         }).catch((error) => {
           this.$emit('error', error);
         });
      } else {
        this.updateRightContent(this.cache[value]);
      }
    },
    onChangeFormat(value) {

    },
    connect() {
        this.collection.nextPage().then(page => {
          this.updateRightContent(page);
          this.cache[1] = page;
        }).catch((error) => {
          this.$emit('error', error);
        });
    },
  }
}
</script>

<style scoped>


</style>
