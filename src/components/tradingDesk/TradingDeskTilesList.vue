<template>
  <ul class="tiles-list">
    <li v-for="tile in tiles" :key="tile.id">
      <button
        class="tiles-list-tile"
        type="button"
        @click="() => onClick(tile.id)"
      >{{tile.title}}</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TradingDeskTileList',
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
  text-align: center;
  padding: 0;
}
.tiles-list-tile {
  width: 100px;
  padding: 10px;
  margin-bottom: 15px;
}
</style>