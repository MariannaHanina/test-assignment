<template>
  <div
    class="tile"
    :class="{ 'tile--active': tile.isActive }"
    :style="styles"
    @mousedown="activateTile"
    v-resize="resizeTile"
    draggable
  >
    <div class="tile-title">
      <span>{{ tile.title }}</span>
      <button type="button" class="tile-remove-button" @click="hideTile">-</button>
    </div>
    <div class="tile-body" />
  </div>
</template>

<script>
import { setTileParams } from '@/utils/tiles';

export default {
  name:'TATile',
  props: ['tile'],
  model: {
    prop: 'tile'
  },
  data() {
    return {
      newWidth: null,
      newHeight: null,
      initCoordinats: {},
      newCoordinats: null
    };
  },
  computed: {
    styles: (vm) => {
      const { width, height, x, y, zIndex } = vm.tile;
      return {
        width: `${width}px`,
        height: `${height}px`,
        left: `${x}px`,
        top: `${y}px`,
        'z-index': zIndex
      };
    }
  },
  emits: ['inactivate-other-tiles', 'increase-z-index', 'tile-resized'],
  methods: {
    activateTile() {
      setTileParams(this.tile, {
        isActive: true
      });
      this.$emit('inactivate-other-tiles', this.tile);
      this.$emit('increase-z-index', this.tile);
    },
    hideTile() {
      setTileParams(this.tile, {
        isActive: false,
        isShown: false
      });
    },
    resizeTile({ width, height }) {
      setTileParams(this.tile, {
        width,
        height
      });
      this.$emit('tile-resized');
    }
  }
}
</script>

<style scoped>
.tile {
  display: inline-block;
  background: white;
  border: 2px solid gray;

  position: absolute;

  cursor: pointer;

  resize: both;
  overflow: auto;
}
.tile-title {
  position: relative;
  border-bottom: 2px solid gray;
  padding: 10px;

  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
}

.tile-remove-button {
  position: absolute;
  left: 10px;
}
.tile-body {
  padding: 10px;
}

.tile--active{
  border-color: steelblue;
}

.tile--active .tile-title{
  background-color: lightskyblue;
  border-color: steelblue;
}

.tile-resize-y {
  position: absolute;
  bottom: 0;

  height: 2px;
  width: 100%;
}
.tile-resize-y:hover {
  background-color: lightgray;

  cursor: row-resize;
}
</style>