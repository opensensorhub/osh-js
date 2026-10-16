<template>
  <v-card class="clock">
    {{ time }}
  </v-card>
</template>

<script>
export default {
  name: "DroneClock",
  data() {
    return {
      time: '',
    }
  },
  mounted() {
    const that = this;
    function updateTime() {
      const cd = new Date();
      that.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
    }

    setInterval(() => updateTime(),1000);
    function zeroPadding(num, digit) {
      let zero = '';
      for(let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }
  }
}
</script>

<style scoped>
.clock {
  color: #daf6ff;
  text-shadow: 0 0 8px rgba(10, 175, 230, 1),  0 0 8px rgba(10, 175, 230, 0);
  letter-spacing: 0.1em;
  font-size: 18px;
  padding: 5px 0;
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;
}
</style>
