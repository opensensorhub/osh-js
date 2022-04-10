<template>
  <div>
    <RightHeader
        pagination="1"
        @change1="setPage"
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
    'collection','nodeId'
  ],
  components: {
    RightContent,
    RightHeader
  },
  data() {
    return {
      cache: {},
    }
  },
  mounted() {
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
