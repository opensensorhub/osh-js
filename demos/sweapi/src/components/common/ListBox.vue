<template>
  <v-select
      :items=content
      label="label"
      dense
      full-width
      read-only
      v-model="selectedValue"
      @change="onChange"
      class="disableCaret listbox"
  ></v-select>
</template>

<script>
export default {
  name: "ListBox",
  props: [
    'content', 'selected', 'label'
  ],
  data() {
    return {
      selectedValue: this.selected
    }
  },
  methods: {
    onChange() {
      this.$emit('change', this.selectedValue);
    }
  }
}
</script>

<style scoped>
.v-select__selections input {
  width: 0 !important;
  min-width: 0 !important;
}

.disableCaret {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}
.listbox {
  min-width: 200px;
  margin-right: 10px;
  margin-left: 10px;
}

</style>
