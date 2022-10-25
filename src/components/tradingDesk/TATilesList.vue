<template>
  <ul class="tiles-list">
    <li v-for="tile in tiles" :key="tile.id">
      <button
        class="tiles-list-tile"
        type="button"
        @click="() => onClick(tile)"
      >{{tile.title}}</button>
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
    onClick(tile) {
      this.$emit('tile-click', tile);
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