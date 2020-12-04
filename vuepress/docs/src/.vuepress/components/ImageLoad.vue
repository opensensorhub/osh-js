<template>
    <img
      :src="$withBase(src)"
    />
</template>

<script>
export default {
  name: 'ImageLoad',
  props: ['src'],
}
</script>
