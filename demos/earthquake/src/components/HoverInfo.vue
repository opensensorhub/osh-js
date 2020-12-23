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
          :items-per-page="1"
          class="elevation-1"
          hide-default-footer
          disable-pagination
          disable-filtering
          disable-sort
          height="65"
          dark
          dense
      >
        <template v-slot:item.mag="{ item }">
          <v-chip
              :color="getColor(item.mag)"
              dark
              x-small
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
      items: [],
      colorMap: [
          '#ffc300',
          '#ffa900',
          '#ff9400',
          '#ff8b00',
          '#ff7a00',
          '#ff4900',
          '#ff2c00',
          '#cd1200',
          '#7d0000'
      ]
    }
  },
  watch: {
    infos(newValue, oldValue) {
      if(newValue === null) {
        this.items = [];
      } else {
        this.items = [newValue];
      }
    }
 },
  mounted() {},
  methods: {
    dateFormat(date) { return new Date(Date.parse(date)).toISOString() },
    getColor(eq) { return this.colorMap[parseInt(eq)] }
  }
}
</script>

<style scoped>
.content {
  height: 75px;
}

.hoverInfo-title{
  font-size: 14px;
}
</style>
<style lang="scss">
$data-table-border-radius :  0px !default;
</style>
<style>

.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th,
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
  font-size: 10px !important;
}
.v-data-table {
  border-radius: 0px !important;
}
</style>
