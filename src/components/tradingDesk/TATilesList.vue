<template>
  <ul class="tiles-list">
    <li v-for="{id, title} in tiles" :key="id">
      <button
        class="tiles-list-tile"
        type="button"
        @click="() => onClick(id)"
      >{{title}}</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TATileList',
  props: {
    tiles: {
      type: Array,
      required: true
    }
  },
  emits: ['tile-click'],
  methods: {
    onClick(id) {
      this.$emit('tile-click', id);
    }
  }
}
</script>

<style scoped>
.tiles-list {
  list-style: none;
}
.tiles-list-tile {
  width: 100px;
}
</style>