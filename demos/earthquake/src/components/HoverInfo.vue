<template>
  <div
      id="hoverInfo"
      class="hoverInfo">
    <div class="hoverInfo-title">Infos</div>
    <hr>
    <div class="content">
      <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          class="elevation-1"
          height="205"
          dark
          dense
      >
        <template v-slot:item.mag="{ item }">
          <v-chip
              :color="getColor(item.mag)"
              dark
              small
          >
            {{ item.mag }}
          </v-chip>
        </template>
        <template v-slot:item.time="{ item }">
            {{ dateFormat(item.time) }}
        </template>

      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HoverInfo",
  props:['infos'],
  data() {
    return {
      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Magnitude', value: 'mag' },
        { text: 'Depth', value: 'depth' },
        { text: 'Time', value: 'time' },
      ],
      items: []
    }
  },
  watch: {
    infos(newValue, oldValue) {
      this.items = newValue;
    }
 },
  mounted() {
  },
  methods: {
    dateFormat(date) {
      return new Date(Date.parse(date)).toISOString();
    },
    getColor (eq) {
      if (eq.mag > 7.5) return 'red'
      else if (eq > 5.0) return 'orange'
      else return 'green'
    }
  }
}
</script>

<style scoped>
.content {
  height: 280px;
  font-size: 16px;
}

.hoverInfo-title{
  font-size: 16px;
}
</style>
<style lang="scss">
$data-table-border-radius :  0px !default;
</style>
<style>
</style>
