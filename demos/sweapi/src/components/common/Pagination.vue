<template>
  <v-pagination
      v-model="pagination.page"
      :length="pagination.total / 5"
      :total-visible="pagination.visible"
      class="pagination"
      @input="setPage"
  ></v-pagination>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      pagination: {
        page: 1,
        total: 1000,
        visible: 10
      },
    }
  },
  methods: {
    setPage(newValue) {
      this.$emit('change', newValue);
    }
  }
}
</script>

<style scoped>
.pagination {
  padding: 8px !important;
}
</style>
